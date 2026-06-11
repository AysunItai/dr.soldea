"use client";

import Script from "next/script";
import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * GDPR/CNIL-compliant Google Analytics 4 loader.
 *
 * - GA4 is NEVER loaded until the visitor explicitly clicks "Accepter".
 * - "Refuser" leaves no analytics cookies on the device.
 * - The choice is persisted in localStorage and can be changed at any time
 *   from the footer ("Gestion des cookies") or the mentions-légales page.
 *
 * This is stricter than Google's Consent Mode v2 — we don't even ship the
 * gtag stub before consent — which matches the cautious CNIL guidance for
 * medical / healthcare sites.
 */

const GA_ID = "G-0C18XKTFXB";
const STORAGE_KEY = "dr-soldea:ga-consent";
const OPEN_EVENT = "dr-soldea:open-cookie-settings";

type ConsentState = "unset" | "granted" | "denied";

function readConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === "granted" || raw === "denied" ? raw : "unset";
  } catch {
    // Private mode / disabled storage: behave as if no choice has been made.
    return "unset";
  }
}

/**
 * Custom event used to notify our `useSyncExternalStore` subscribers when
 * consent changes within the same tab (the native "storage" event only
 * fires across tabs).
 */
const CONSENT_CHANGE_EVENT = "dr-soldea:consent-change";

function writeConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  } catch {
    /* ignore */
  }
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
  };
}

const getServerConsent = (): ConsentState => "unset";

export function CookieConsent() {
  // `useSyncExternalStore` is the React 19 idiomatic way to read mutable
  // external state (localStorage) without tripping the `set-state-in-effect`
  // rule. SSR/initial-client render always returns "unset", then hydration
  // settles on the real persisted value.
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    getServerConsent,
  );

  // Banner open/closed is derived from `consent` + an explicit user
  // override, so we never set state inside an effect. Defaults:
  //   - no choice yet ("unset")  →  banner open
  //   - granted/denied           →  banner closed
  // The override is only mutated by event handlers (Accept, Refuse,
  // "Gestion des cookies"), which keeps the React 19 / `set-state-in-effect`
  // lint rule happy.
  const [override, setOverride] = useState<"open" | "closed" | null>(null);
  const bannerOpen =
    override === "open" || (override === null && consent === "unset");

  // Allow any "Gestion des cookies" trigger anywhere in the app to re-open
  // the banner via a custom window event.
  useEffect(() => {
    const open = () => setOverride("open");
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const accept = useCallback(() => {
    writeConsent("granted");
    setOverride("closed");
  }, []);

  const refuse = useCallback(() => {
    writeConsent("denied");
    setOverride("closed");
    // If consent was previously granted in this session, best-effort cleanup:
    // remove the known GA cookies so a "Refuser" click takes effect without
    // requiring a hard refresh. Cookies are domain-wide; we don't know the
    // exact eTLD+1, so we attempt both the bare hostname and a leading-dot
    // variant.
    if (typeof document !== "undefined") {
      const past = "Thu, 01 Jan 1970 00:00:00 GMT";
      const host = window.location.hostname;
      const domains = [host, `.${host}`];
      for (const name of ["_ga", `_ga_${GA_ID.replace(/^G-/, "")}`, "_gid"]) {
        for (const domain of domains) {
          document.cookie = `${name}=; expires=${past}; path=/; domain=${domain}`;
        }
        document.cookie = `${name}=; expires=${past}; path=/`;
      }
    }
  }, []);

  return (
    <>
      {/* GA4 is mounted only after explicit grant. next/script dedupes by id,
          so toggling consent multiple times in a session won't double-load. */}
      {consent === "granted" && (
        <>
          <Script
            id="ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga4-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {bannerOpen && (
        <Banner
          onAccept={accept}
          onRefuse={refuse}
          currentChoice={consent}
        />
      )}
    </>
  );
}

function Banner({
  onAccept,
  onRefuse,
  currentChoice,
}: {
  onAccept: () => void;
  onRefuse: () => void;
  currentChoice: ConsentState;
}) {
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Préférences cookies"
      className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-md"
    >
      <div className="rounded-2xl bg-white ring-1 ring-line shadow-[0_30px_60px_-20px_rgba(11,31,61,0.30)] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="shrink-0 h-9 w-9 rounded-full bg-primary-soft text-primary-deep grid place-content-center"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
              <path
                d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-5-5 4 4 0 0 1-4-4Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="13" r="1" fill="currentColor" />
              <circle cx="14" cy="16" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-[11px] tracking-[0.2em] uppercase text-primary-deep">
              Mesure d&apos;audience
            </p>
            <h2 className="mt-1 font-display text-lg text-ink leading-snug">
              Cookies et confidentialité
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm text-ink-soft leading-relaxed">
          Nous utilisons des cookies de mesure d&apos;audience afin de
          comprendre l&apos;utilisation du site et d&apos;améliorer son
          contenu. Vous pouvez accepter ou refuser ces cookies. Votre choix
          peut être modifié à tout moment depuis la page{" "}
          <a
            href="/mentions-legales#cookies"
            className="text-ink underline-offset-4 underline hover:text-primary-deep"
          >
            Mentions légales
          </a>
          .
        </p>

        <div className="mt-5 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onRefuse}
            className="inline-flex h-10 items-center justify-center rounded-full bg-white ring-1 ring-line px-5 text-sm font-medium text-ink hover:ring-primary/40 transition-colors"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="inline-flex h-10 items-center justify-center rounded-full bg-ink text-white px-5 text-sm font-medium hover:bg-primary-deep transition-colors"
          >
            Accepter
          </button>
        </div>

        {currentChoice !== "unset" && (
          <p className="mt-3 text-[11px] text-muted">
            Choix actuel&nbsp;:{" "}
            {currentChoice === "granted"
              ? "cookies de mesure d'audience acceptés."
              : "cookies de mesure d'audience refusés."}
          </p>
        )}
      </div>
    </div>
  );
}

