import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

// Use a local Playwright installation or an existing cached package; no downloads.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const base = process.env.BOOKING_BASE_URL ?? 'http://127.0.0.1:3001';
const artifactDir = process.env.BOOKING_ARTIFACT_DIR ?? '/tmp/dr-soldea-booking-validation';
fs.mkdirSync(artifactDir, { recursive: true });
const root = fileURLToPath(new URL('../', import.meta.url));
function loadModule(file) {
 const exports = {};
 const code = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
 }).outputText;
 vm.runInNewContext(code, { exports });
 return exports;
}
const services = loadModule('lib/services.ts').SERVICES;
const { SERVICE_BOOKINGS: bookings, DOCTOLIB_BOOKING_URL: fallback } = loadModule('lib/booking.ts');
const results={viewports:[],screenshots:[],externalRequestsIntercepted:0};
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try {
  const context=await browser.newContext(),outbound=[],errors=[];
  await context.route('**/*',route=>{
   if(route.request().url().startsWith(base+'/'))return route.continue();
   outbound.push({url:route.request().url(),referer:route.request().headers().referer});
   return route.fulfill({status:200,contentType:route.request().url().includes('googletagmanager')?'application/javascript':'text/html',body:''});
  });
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.getByRole('button',{name:'Refuser',exact:true}).click();
  const publicPages=['/','/services','/contact','/galerie','/technologie','/echographie-gynecologique-obstetricale-lyon','/presentation','/equipe','/mentions-legales'];
  const localLinks=new Set();
  async function clickOut(link,expected,keyboard=false){
   const promise=page.waitForEvent('popup');
   if(keyboard){await link.focus();await link.press('Enter');}else await link.click();
   const popup=await promise;await popup.waitForLoadState('domcontentloaded');
   assert.equal(popup.url(),expected);assert.equal(await popup.evaluate(()=>window.opener),null);await popup.close();
  }
  async function inspectLink(link,width,route){
   const box=await link.boundingBox();assert(box.x>=-1&&box.x+box.width<=width+1,`link overflow ${route} ${width}`);
   assert(await link.evaluate(el=>el.scrollWidth<=el.clientWidth+1),`label clipping ${route} ${width}`);
   const clipped=await link.evaluate(el=>{
    const box=el.getBoundingClientRect();
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    let node;
    while(node=walker.nextNode()) {
     if(!node.textContent.trim()||node.parentElement.closest('.sr-only')||!node.parentElement.checkVisibility())continue;
     const range=document.createRange();range.selectNodeContents(node);
     if([...range.getClientRects()].some(r=>r.width>2&&(r.left<box.left-1||r.right>box.right+1||r.top<box.top-1||r.bottom>box.bottom+1)))return node.textContent;
    }
    return false;
   });
   assert(!clipped,`text clipped ${route} ${width}: ${clipped}`);
  }
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:1000});let checked=0;
   for(const route of [...publicPages,...services.map(s=>'/services/'+s.slug)]){
    const response=await page.goto(base+route);assert.equal(response.status(),200,route);
    await page.evaluate(()=>document.fonts.ready);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`page overflow ${route} ${width}`);
    const service=services.find(s=>route==='/services/'+s.slug);
    const d=service&&bookings[service.slug];
    const links=page.locator('a[href^="https://www.doctolib.fr/"]');
    for(let i=0;i<await links.count();i++){
     const link=links.nth(i);
     const isPanel=await link.evaluate(el=>!!el.closest('section[aria-labelledby="booking-heading"]'));
     const expected=isPanel?d.url:fallback;
     assert.equal(await link.getAttribute('href'),expected);
     assert.equal(await link.getAttribute('target'),'_blank');assert.equal(await link.getAttribute('rel'),'noopener noreferrer');
     assert.equal(await link.getAttribute('referrerpolicy'),'no-referrer');
     assert((await link.textContent()).includes('nouvel onglet'));
     if(await link.isVisible() && await link.evaluate(el=>{
      for(let p=el;p;p=p.parentElement){const css=getComputedStyle(p);if(css.opacity==='0'||css.pointerEvents==='none')return false;}return true;
     })){
      await inspectLink(link,width,route);await clickOut(link,expected);checked++;
     }
    }
    for(const href of await page.locator('a[href^="/"]').evaluateAll(els=>els.map(el=>el.getAttribute('href'))))localLinks.add(href.split('#')[0]);
    const internal=await page.locator('a[href="/services"]').allTextContents();
    assert(!internal.some(text=>/^\s*Prendre rendez-vous/.test(text)),`booking left internal ${route}`);
    if(service){
     assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://www.echographielyon.fr'+route);
     const panel=page.locator('section[aria-labelledby="booking-heading"]');
     if(service.slug==='echographie-obstetricale')assert.equal(await panel.count(),0);
     else {
      const link=panel.locator('a');
      assert((await link.boundingBox()).height>=48);await inspectLink(link,width,route);
      if(service.slug==='teleconsultation'){
       assert.equal(await panel.locator('a[href*="doctolib"]').count(),0);
       assert.equal(await link.getAttribute('href'),'tel:+33428295516');
       assert((await panel.innerText()).includes('confirmer la disponibilité'));
      }else if(d.status==='verified-direct')assert((await panel.innerText()).includes('pour cet examen'));
      else assert((await panel.innerText()).includes('Choisissez le motif adapté'));
     }
    }
   }
   await page.goto(base+'/services/echographie-1er-trimestre');
   if(width>=1024)await clickOut(page.locator('header a[href*="doctolib"]'),fallback,true);
   else {
    await page.getByRole('button',{name:'Ouvrir le menu',exact:true}).click();
    const mobile=page.locator('body > div.fixed a[href*="doctolib"]');
    await inspectLink(mobile,width,'mobile menu');await clickOut(mobile,fallback);
    assert.equal(await page.getByRole('button',{name:'Ouvrir le menu',exact:true}).getAttribute('aria-expanded'),'false');
    await page.waitForFunction(()=>{const el=document.querySelector('body > div.fixed');return el&&getComputedStyle(el).opacity==='0'&&getComputedStyle(el).pointerEvents==='none';});
   }
   for(const slug of ['echographie-1er-trimestre','suivi-grossesse','teleconsultation']){
    await page.goto(base+'/services/'+slug);
    await page.locator('section[aria-labelledby="booking-heading"]').evaluate(el=>el.scrollIntoView({block:'center'}));
    const image=`${artifactDir}/${slug}-${width}.png`;
    await page.screenshot({path:image});results.screenshots.push(image);
   }
   results.viewports.push({width,pages:19,bookingClicks:checked});
   console.log(`PASS ${width}px: 19 pages, ${checked} outbound CTA clicks, mobile/desktop nav, footer, correct destinations, no overflow or clipped booking buttons`);
  }
  assert(!outbound.some(r=>/google-analytics|googletagmanager/.test(r.url)),'GA must stay unloaded before consent');
  assert(outbound.filter(r=>r.url.startsWith('https://www.doctolib.fr')).every(r=>!r.referer));
  const detailPath='/services/echographie-1er-trimestre';
  await page.goto(base+detailPath+'?email=private@example.test#symptoms');
  await page.evaluate(()=>{localStorage.removeItem('dr-soldea:ga-consent');dispatchEvent(new Event('dr-soldea:consent-change'));});
  const booking=page.locator('section[aria-labelledby="booking-heading"] a');
  await clickOut(booking,bookings['echographie-1er-trimestre'].url);assert.equal(await page.evaluate(()=>typeof window.gtag),'undefined');
  await page.getByRole('button',{name:'Accepter',exact:true}).click();
  assert.equal(await page.evaluate(()=>typeof window.gtag),'undefined','Unverified GA must stay unloaded even after consent');
  assert.equal(await page.locator('script[src*="googletagmanager"]').count(),0);
  // Exercise the retained click handler with a local recording double; no GA is loaded.
  await page.evaluate(()=>{window.dataLayer=[];window.gtag=(...args)=>window.dataLayer.push(args);});
  await page.evaluate(()=>{window.dataLayer=[];});await clickOut(booking,bookings['echographie-1er-trimestre'].url,true);
  const events=await page.evaluate(()=>window.dataLayer.map(e=>Array.from(e)).filter(e=>e[1]==='doctolib_booking_click'));
  assert.deepEqual(events,[['event','doctolib_booking_click',{booking_provider:'doctolib',button_location:'service_detail',page_location:'https://www.echographielyon.fr/',page_referrer:'',page_title:'Prise de rendez-vous'}]]);
  await booking.dispatchEvent('auxclick',{button:1});
  await page.evaluate(()=>dispatchEvent(new Event('dr-soldea:open-cookie-settings')));
  await page.getByRole('button',{name:'Refuser',exact:true}).click();await clickOut(booking,bookings['echographie-1er-trimestre'].url);
  assert.equal(await page.evaluate(()=>window.dataLayer.filter(e=>e[1]==='doctolib_booking_click').length),2);
  for(const href of localLinks){if(!href||href.startsWith('//'))continue;const response=await context.request.get(base+href);assert(response.status()<400,`broken internal link ${href}: ${response.status()}`);}
  assert.equal((await context.request.get(base+'/services/not-a-service')).status(),404);
  const nojs=await browser.newContext({javaScriptEnabled:false});
  await nojs.route('**/*',r=>r.request().url().startsWith(base+'/')?r.continue():r.fulfill({status:200,body:''}));
  const nojsPage=await nojs.newPage();await nojsPage.goto(base+detailPath);
  assert.equal(await nojsPage.locator('section[aria-labelledby="booking-heading"] a').getAttribute('href'),bookings['echographie-1er-trimestre'].url);await nojs.close();
  assert.deepEqual(errors,[]);
  results.externalRequestsIntercepted=outbound.length;results.internalLinksChecked=localLinks.size;
  fs.writeFileSync(path.join(artifactDir, 'browser-results.json'),JSON.stringify(results,null,2));
  console.log(`PASS consent states, keyboard/middle clicks, privacy-safe custom event, no referrer, ${localLinks.size} internal links, unknown-service 404, no-JS booking, no browser exceptions. All external requests intercepted.`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
