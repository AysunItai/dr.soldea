"use client";

import { useEffect, useRef, useState } from "react";

type CalendlyEmbedProps = {
  url: string;
  height?: number;
  minWidth?: number;
};

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

/**
 * Inline Calendly widget. The Calendly script auto-mounts any
 * `.calendly-inline-widget` it finds on the page once loaded. We:
 *   - Lazily inject the script & stylesheet on the client (once).
 *   - Watch the widget container with a MutationObserver — when Calendly
 *     inserts its iframe, we mark the widget as ready and hide the skeleton.
 *   - Fall back to an "open in new tab" CTA if the script fails to load.
 *
 * setState calls all happen inside async callbacks (script events,
 * MutationObserver) — not in the body of an effect — to comply with the
 * `react-hooks/set-state-in-effect` rule.
 */
export function CalendlyEmbed({
  url,
  height = 720,
  minWidth = 320,
}: CalendlyEmbedProps) {
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const target = widgetRef.current;
    if (!target) return;

    if (!document.querySelector('script[data-calendly="widget"]')) {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.dataset.calendly = "widget";
      script.addEventListener("error", () => setStatus("error"));
      document.body.appendChild(script);
    }

    if (!document.querySelector('link[data-calendly="widget-css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_HREF;
      link.dataset.calendly = "widget-css";
      document.head.appendChild(link);
    }

    // If Calendly's script has already mounted an iframe (e.g. fast nav),
    // surface it on the next paint.
    const existingIframe = target.querySelector("iframe");
    if (existingIframe) {
      const raf = requestAnimationFrame(() => setStatus("ready"));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new MutationObserver(() => {
      if (target.querySelector("iframe")) {
        setStatus("ready");
        observer.disconnect();
      }
    });
    observer.observe(target, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden ring-1 ring-line bg-cream">
      <div
        ref={widgetRef}
        className="calendly-inline-widget"
        data-url={`${url}?hide_gdpr_banner=1&primary_color=3a8d96`}
        style={{ minWidth, height }}
      />

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
