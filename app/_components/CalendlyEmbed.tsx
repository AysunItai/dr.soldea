"use client";

import { useEffect, useRef, useState } from "react";

type CalendlyEmbedProps = {
  url: string;
  height?: number;
  minWidth?: number;
};

type CalendlyGlobal = {
  initInlineWidget: (opts: {
    url: string;
    parentElement: HTMLElement;
    prefill?: Record<string, unknown>;
    utm?: Record<string, unknown>;
  }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyGlobal;
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

/**
 * Compose the final Calendly URL: keep the caller's primary_color
 * (the brand burgundy accent, passed via `lib/services.ts`) and add
 * `hide_gdpr_banner=1` if not already present.
 */
function buildCalendlyUrl(raw: string): string {
  try {
    const u = new URL(raw);
    if (!u.searchParams.has("hide_gdpr_banner")) {
      u.searchParams.set("hide_gdpr_banner", "1");
    }
    return u.toString();
  } catch {
    return raw;
  }
}

/**
 * Inline Calendly widget. Mounted programmatically via
 * `window.Calendly.initInlineWidget` so we can swap the URL at runtime —
 * essential for the obstetric ultrasound page where the user toggles
 * between T1 / T2 / T3 calendars.
 *
 * State transitions:
 *   - Script + CSS are injected once and reused across embeds.
 *   - On URL change we wipe the container, status snaps back to "loading"
 *     (via the "adjust state during render" pattern to keep the
 *     `react-hooks/set-state-in-effect` linter happy), then re-init.
 *   - A MutationObserver flips status to "ready" the moment Calendly
 *     inserts its iframe.
 *   - Graceful fallback to an "open in new tab" CTA if the script errors.
 */
export function CalendlyEmbed({
  url,
  height = 720,
  minWidth = 320,
}: CalendlyEmbedProps) {
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [activeUrl, setActiveUrl] = useState(url);

  // Adjust state during render when the URL prop changes — preferred over
  // setState-in-effect per React 19 guidance.
  if (url !== activeUrl) {
    setActiveUrl(url);
    setStatus("loading");
  }

  useEffect(() => {
    const target = widgetRef.current;
    if (!target) return;

    const finalUrl = buildCalendlyUrl(url);

    // Inject Calendly stylesheet once.
    if (!document.querySelector('link[data-calendly="widget-css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_HREF;
      link.dataset.calendly = "widget-css";
      document.head.appendChild(link);
    }

    const mount = () => {
      const cal = window.Calendly;
      if (!cal || !widgetRef.current) return;
      // Wipe any previous widget so we never stack iframes when the URL changes.
      widgetRef.current.innerHTML = "";
      cal.initInlineWidget({ url: finalUrl, parentElement: widgetRef.current });
    };

    // Watch for the iframe insertion → flip to "ready".
    const observer = new MutationObserver(() => {
      if (target.querySelector("iframe")) {
        setStatus("ready");
        observer.disconnect();
      }
    });
    observer.observe(target, { childList: true, subtree: true });

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-calendly="widget"]',
    );

    if (existing) {
      if (window.Calendly) {
        mount();
      } else {
        const onLoad = () => mount();
        existing.addEventListener("load", onLoad, { once: true });
        return () => {
          existing.removeEventListener("load", onLoad);
          observer.disconnect();
        };
      }
    } else {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.dataset.calendly = "widget";
      script.addEventListener("load", () => mount());
      script.addEventListener("error", () => setStatus("error"));
      document.body.appendChild(script);
    }

    return () => observer.disconnect();
  }, [url]);

  return (
    <div className="relative rounded-2xl overflow-hidden ring-1 ring-line bg-cream">
      <div ref={widgetRef} style={{ minWidth, height }} />

      {status !== "ready" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-cream">
          {status === "loading" ? (
            <>
              <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="mt-4 text-sm text-muted">
                Chargement du calendrier…
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-2xl text-ink">
                Le calendrier ne s&apos;est pas affiché.
              </p>
              <p className="mt-2 text-sm text-muted max-w-md">
                Le bloqueur de publicités ou la connexion internet semble
                interférer avec Calendly. Vous pouvez ouvrir la prise de
                rendez-vous dans un nouvel onglet.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center h-11 px-6 rounded-full bg-ink text-white text-sm font-medium hover:bg-primary-deep transition-colors"
              >
                Ouvrir Calendly ↗
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
