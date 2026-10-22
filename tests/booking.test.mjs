import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Exercise the actual TypeScript modules with isolated browser/storage doubles.
function loadModule(file, globals = {}, dependencies = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const code = ts.transpileModule(source, {
    fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    require(name) {
      assert(name in dependencies, `Unexpected import: ${name}`);
      return dependencies[name];
    },
    ...globals,
  }, { filename: file });
  return exports;
}

const expectedUrl = 'https://www.doctolib.fr/gynecologue-obstetricien/lyon/alexandra-soldea/booking/motive-categories?specialityId=102&telehealth=false&placeId=practice-806420&source=profile';
const booking = loadModule('lib/booking.ts');
const services = loadModule('lib/services.ts').SERVICES;

test('every website service has an explicit mapping with consistent mode and location', () => {
  assert.equal(booking.DOCTOLIB_BOOKING_URL, expectedUrl);
  assert.equal(Object.keys(booking.SERVICE_BOOKINGS).length, services.length);
  for (const service of services) {
    assert(Object.hasOwn(booking.SERVICE_BOOKINGS, service.slug), service.slug);
    const destination = booking.getServiceBooking(service.slug);
    assert.equal(destination.serviceSlug, service.slug);
    assert.equal(destination.location, service.location);
    assert(destination.reason);
    if (service.slug === 'teleconsultation') continue;
    assert.equal(destination.bookingMode, 'in-person');
    assert.equal(destination.practiceId, 'practice-806420');
    const url = new URL(destination.url);
    assert.equal(url.protocol, 'https:');
    assert.equal(url.hostname, 'www.doctolib.fr');
    assert.equal(url.searchParams.get('specialityId'), '102');
    assert.equal(url.searchParams.get('telehealth'), 'false');
    assert.equal(url.searchParams.get('placeId'), 'practice-806420');
    assert.equal(url.searchParams.get('source'), 'profile');
    assert(!destination.url.includes('609894'));
  }
});

test('only the five matching ultrasound services select the exact supplied motives', () => {
  const expected = {
    'echographie-datation': '6400728',
    'echographie-gynecologique': '6400729',
    'echographie-1er-trimestre': '6622462',
    'echographie-2e-trimestre': '6622463',
    'echographie-3e-trimestre': '6622464',
  };
  assert.equal(Object.values(booking.SERVICE_BOOKINGS).filter(d => d.status === 'verified-direct').length, 5);
  for (const [slug, motiveId] of Object.entries(expected)) {
    const d = booking.getServiceBooking(slug);
    assert.equal(d.status, 'verified-direct');
    assert.equal(d.specificity, 'exact');
    assert.equal(d.isFallback, false);
    assert.equal(d.consultationType, 'ultrasound');
    assert.equal(d.categoryId, '171273');
    assert.equal(d.motiveId, motiveId);
    assert.equal(d.url, `https://www.doctolib.fr/gynecologue-obstetricien/lyon/alexandra-soldea/booking/availabilities?specialityId=102&telehealth=false&placeId=practice-806420&motiveCategoryIds%5B%5D=171273&motiveIds%5B%5D=${motiveId}&source=profile`);
  }
});

test('ambiguous consultation reasons and the trimester overview never claim a selected motive', () => {
  for (const slug of ['suivi-grossesse', 'suivi-gynecologie', 'controle-sterilet', 'echographie-obstetricale']) {
    const d = booking.getServiceBooking(slug);
    assert.equal(d.status, 'verified-category-fallback');
    assert.equal(d.specificity, 'category-selection');
    assert.equal(d.isFallback, true);
    assert.equal(d.url, expectedUrl);
    assert.equal(d.consultation, null);
    assert.equal(d.categoryId, null);
    assert.equal(d.motiveId, null);
  }
});

test('all supplied evidence is retained, including duplicated and malformed destinations', () => {
  const data = JSON.parse(fs.readFileSync(path.join(root, 'docs/doctolib-categories.json'), 'utf8'));
  const [ultrasound, pregnancy, gyn, other] = data.categories;
  assert.equal(data.fallbackUrl, expectedUrl);
  assert.deepEqual(data.categories.map(c => c.records.length), [7, 5, 6, 1]);
  assert.deepEqual(pregnancy.records.map(r => new URL(r.recordedUrl).searchParams.get('motiveIds[]')), ['6668678', '7188953', '7188954', '7188954', '7188954']);
  const shared = pregnancy.records[2].recordedUrl;
  for (const r of [...pregnancy.records.slice(2), ...gyn.records]) {
    assert.equal(r.recordedUrl, shared);
    assert.equal(r.urlUnambiguous, false);
  }
  assert.equal(gyn.categoryId, null); // Not inferred from the conflicting URL.
  assert.equal(other.categoryId, null);
  assert.equal(other.records[0].recordedUrl, 'https://www.doctolib.fr/gynecologue-obstetricien/lyon/alexandra-soldea/booking/availabilities?specialityId=102&yIds%5B%5D=171275&motiveIds%5B%5D=7188954&source=profile');
  assert.equal(other.records[0].urlUnambiguous, false);
  assert.deepEqual(ultrasound.records.map(r => r.recordedUrl), Object.values(booking.DOCTOLIB_ULTRASOUND_MOTIVES).map(m => m.url));
  for (const destination of Object.values(booking.SERVICE_BOOKINGS)) {
    if (destination.status !== 'verified-direct') continue;
    assert(ultrasound.records.some(r => r.recordedUrl === destination.url && r.urlUnambiguous));
  }
  // The website's general T3 service must not become a targeted growth-control exam.
  assert.equal(booking.getServiceBooking('echographie-3e-trimestre').motiveId, '6622464');
  assert(!Object.values(booking.SERVICE_BOOKINGS).some(d => ['6683280', '16054610'].includes(d.motiveId)));
});

test('teleconsultation is not routed into an in-person booking flow', () => {
  const destination = booking.getServiceBooking('teleconsultation');
  assert.equal(destination.status, 'requires-manual-confirmation');
  assert.equal(destination.url, null);
  assert.equal(destination.contactUrl, 'tel:+33428295516');
});

test('unknown and inherited-property slugs cannot bypass the safe fallback', () => {
  for (const slug of ['unknown', 'constructor', '__proto__']) {
    assert.equal(booking.getServiceBooking(slug).url, expectedUrl);
  }
});

function analyticsHarness(consentValue, { blockedStorage = false, missingGtag = false, failingGtag = false } = {}) {
  const calls = [];
  const window = {
    localStorage: { getItem(key) {
      assert.equal(key, 'dr-soldea:ga-consent');
      if (blockedStorage) throw new Error('Storage blocked');
      return consentValue;
    } },
    location: { href: 'https://example.invalid/services/medical-slug?email=private#symptoms' },
    gtag: missingGtag ? undefined : (...args) => {
      if (failingGtag) throw new Error('Analytics blocked');
      calls.push(JSON.parse(JSON.stringify(args)));
    },
  };
  const consent = loadModule('lib/analytics-consent.ts', { window });
  const analytics = loadModule('lib/booking-analytics.ts', { window }, { './analytics-consent': consent });
  return { calls, window, ...analytics };
}

test('unset, denied, invalid and unreadable consent never emit a booking event', () => {
  for (const value of [null, 'denied', 'invalid']) {
    const a = analyticsHarness(value);
    a.trackDoctolibBookingClick('service_detail');
    assert.equal(a.calls.length, 0);
  }
  const a = analyticsHarness('granted', { blockedStorage: true });
  a.trackDoctolibBookingClick('header');
  assert.equal(a.calls.length, 0);
});

test('only generic provider/button data and neutral page context are sent', () => {
  const a = analyticsHarness('granted');
  for (const location of a.BOOKING_BUTTON_LOCATIONS) a.trackDoctolibBookingClick(location);
  assert.equal(a.calls.length, a.BOOKING_BUTTON_LOCATIONS.length);
  for (let i = 0; i < a.calls.length; i++) {
    assert.deepEqual(a.calls[i], ['event', 'doctolib_booking_click', {
      booking_provider: 'doctolib',
      button_location: a.BOOKING_BUTTON_LOCATIONS[i],
      page_location: 'https://www.echographielyon.fr/',
      page_referrer: '',
      page_title: 'Prise de rendez-vous',
    }]);
  }
  for (const forbidden of ['teleconsultation', 'medical-slug', 'private', 'symptoms', 'service_slug', 'source_page', 'motiveId']) {
    assert(!JSON.stringify(a.calls).includes(forbidden));
  }
  a.trackDoctolibBookingClick('teleconsultation'); // Runtime guard, even if types are bypassed.
  assert.equal(a.calls.length, a.BOOKING_BUTTON_LOCATIONS.length);
});

test('consent is re-read on each click; revocation takes effect immediately', () => {
  const a = analyticsHarness('granted');
  a.trackDoctolibBookingClick('header');
  a.window.localStorage.getItem = () => 'denied';
  a.trackDoctolibBookingClick('header');
  assert.equal(a.calls.length, 1);
});

test('SSR, unloaded GA and failing GA remain safe for booking navigation', () => {
  const consent = loadModule('lib/analytics-consent.ts');
  const server = loadModule('lib/booking-analytics.ts', {}, { './analytics-consent': consent });
  assert.doesNotThrow(() => server.trackDoctolibBookingClick('header'));
  for (const options of [{ missingGtag: true }, { failingGtag: true }]) {
    const a = analyticsHarness('granted', options);
    assert.doesNotThrow(() => a.trackDoctolibBookingClick('header'));
  }
});


test('GA loader requires verified account privacy settings as well as visitor consent', () => {
  function scriptsFor(verified, consentState) {
    const jsx = (type, props) => ({ type, props });
    const { CookieConsent } = loadModule('app/_components/CookieConsent.tsx', {
      process: { env: { NEXT_PUBLIC_GA4_PRIVACY_VERIFIED: verified } },
    }, {
      'react/jsx-runtime': { jsx, jsxs: jsx },
      react: {
        useCallback: fn => fn,
        useEffect: () => {},
        useState: () => [null, () => {}],
        useSyncExternalStore: () => consentState,
      },
      'next/script': { default: 'script' },
      '@/lib/analytics-consent': {
        GA_CONSENT_STORAGE_KEY: 'dr-soldea:ga-consent',
        readConsent: () => consentState,
      },
    });
    const scripts = [];
    function visit(node) {
      if (Array.isArray(node)) return node.forEach(visit);
      if (!node || !node.props) return;
      if (node.type === 'script') scripts.push(node.props);
      visit(node.props.children);
    }
    visit(CookieConsent());
    return scripts;
  }
  for (const verified of [undefined, 'false', 'true']) {
    for (const consent of ['unset', 'denied', 'granted']) {
      const scripts = scriptsFor(verified, consent);
      assert.equal(scripts.length, verified === 'true' && consent === 'granted' ? 2 : 0);
    }
  }
  const configScript = scriptsFor('true', 'granted').find(s => s.id === 'ga4-init');
  const globals = {};
  globals.window = globals;
  vm.runInNewContext(configScript.children, globals);
  const config = JSON.parse(JSON.stringify(globals.dataLayer.find(args => args[0] === 'config')[2]));
  assert.equal(config.send_page_view, false);
  assert.equal(config.page_location, 'https://www.echographielyon.fr/');
  assert.equal(config.page_referrer, '');
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.allow_ad_personalization_signals, false);
});
