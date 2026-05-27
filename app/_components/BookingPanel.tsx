"use client";

import { useState } from "react";
import { CalendlyEmbed } from "@/app/_components/CalendlyEmbed";
import type { Service } from "@/lib/services";

type BookingPanelProps = {
  service: Service;
};

/**
 * Handles the booking widget for a service page.
 *
 * - Single Calendly URL → renders the embed directly.
 * - Multiple variants (e.g. obstetric ultrasound T1 / T2 / T3) →
 *   renders a segmented control and swaps the embedded calendar when the
 *   active variant changes.
 *
 * Lives as a `"use client"` island so the surrounding service detail page
 * can remain a server component.
 */
export function BookingPanel({ service }: BookingPanelProps) {
  const variants = service.variants ?? [];
  const hasVariants = variants.length > 0;
  const [activeIndex, setActiveIndex] = useState(0);

  const activeUrl = hasVariants
    ? variants[activeIndex]?.calendlyUrl
    : service.calendlyUrl;

  return (
    <div className="rounded-2xl bg-white ring-1 ring-line p-3 md:p-4">
      <div className="px-3 py-2 mb-1">
        <p className="text-[11px] tracking-[0.25em] uppercase text-primary">
          Prendre rendez-vous
        </p>
        <p className="font-display text-xl text-ink mt-1">
          {hasVariants
            ? "Choisissez votre trimestre"
            : "Sélectionnez votre créneau"}
        </p>
      </div>

      {hasVariants && (
        <div
          role="tablist"
          aria-label="Trimestre de grossesse"
          className="mb-3 grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-cream ring-1 ring-line"
        >
          {variants.map((variant, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={variant.label}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex flex-col items-center justify-center text-center px-3 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-ink text-white shadow-[0_10px_30px_-12px_rgba(11,31,61,0.45)]"
                    : "bg-transparent text-ink-soft hover:bg-white hover:text-ink"
                }`}
              >
                <span
                  className={`text-[11px] tracking-[0.16em] uppercase ${
                    isActive ? "text-cream/80" : "text-primary"
                  }`}
                >
                  {variant.label}
                </span>
                {variant.sublabel && (
                  <span
                    className={`mt-1 text-[11px] leading-snug ${
                      isActive ? "text-white/85" : "text-muted"
                    }`}
                  >
                    {variant.sublabel}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {activeUrl ? (
        <CalendlyEmbed url={activeUrl} />
      ) : (
        <div className="h-[720px] flex items-center justify-center text-sm text-muted">
          Aucun calendrier configuré pour ce service.
        </div>
      )}
    </div>
  );
}
