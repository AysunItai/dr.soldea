import Link from "next/link";
import type { Service } from "@/lib/services";
import { ServiceIcon } from "@/app/_components/ServiceIcon";
import { OrnateCorners } from "@/app/_components/OperaMotifs";

type ServiceCardProps = {
  service: Service;
};

/**
 * Ivory jewel-box service card — champagne ground, engraved gold corners,
 * and a navy icon medallion. Sits on cream sections like a royal appointment
 * card; lifts on hover with a warm gold halo.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const hasVariants = !!service.variants?.length;
  const isHub = !!service.children?.length;
  const trimesterLabel = service.shortLabel;
  const ctaLabel =
    isHub || hasVariants
      ? "Voir & choisir le trimestre"
      : "Voir & réserver";
  const ctaLabelMobile =
    isHub || hasVariants ? "Choisir le trimestre" : "Voir & réserver";

  return (
    <Link
      href={`/services/${service.slug}`}
      className="card-gold-top group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-b from-white via-[#fbf7f0] to-champagne text-ink ring-1 ring-accent/35 shadow-[0_24px_60px_-32px_rgba(11,31,58,0.18)] transition-all duration-500 hover:-translate-y-1.5 hover:ring-accent/65 hover:shadow-[0_40px_80px_-28px_rgba(201,162,74,0.28)]"
    >
      <OrnateCorners />

      {/* Icon medallion panel */}
      <div className="relative flex aspect-[4/3] items-center justify-center border-b border-accent/15">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 55% at 50% 40%, rgba(201,162,74,0.14), transparent 72%)",
          }}
        />
        <div className="relative grid h-16 w-16 sm:h-20 sm:w-20 place-content-center rounded-full bg-ink-deep text-accent ring-1 ring-accent/50 shadow-[0_16px_40px_-20px_rgba(7,26,51,0.5)] transition-transform duration-500 group-hover:scale-[1.05]">
          <span
            aria-hidden
            className="absolute inset-2 rounded-full ring-1 ring-accent/30"
          />
          <ServiceIcon name={service.icon} className="h-8 w-8 sm:h-9 sm:w-9" />
        </div>

        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-3 sm:p-4">
          <div className="inline-flex max-w-[58%] items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-accent-deep ring-1 ring-accent/25">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span className="truncate">{service.location}</span>
          </div>

          {(hasVariants || isHub) && (
            <div className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2 py-1 text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.16em] uppercase text-ink-deep font-semibold ring-1 ring-accent/40">
              T1 · T2 · T3
            </div>
          )}
          {trimesterLabel && (
            <div className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2 py-1 text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.16em] uppercase font-semibold text-ink-deep ring-1 ring-accent/40">
              Écho {trimesterLabel}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
        <h3 className="font-display text-xl sm:text-2xl text-ink leading-snug text-balance">
          {service.shortTitle ?? service.title}
        </h3>
        <p className="mt-2 text-sm text-ink-soft text-pretty line-clamp-3 leading-relaxed">
          {service.tagline}
        </p>

        <div className="mt-auto pt-5 sm:pt-6">
          <div className="flex flex-col gap-2 border-t border-accent/20 pt-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-accent-deep" aria-hidden>
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M6 3v3l2 1"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              {service.durationLabel ?? `${service.durationMinutes} min`}
            </span>
            {service.priceEUR ? (
              <span className="text-ink font-medium">€{service.priceEUR}</span>
            ) : service.weeks ? (
              <span className="text-ink font-medium">{service.weeks}</span>
            ) : (
              <span className="text-muted">Sur consultation</span>
            )}
          </div>

          <div className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary-deep group-hover:text-primary transition-colors">
            <span className="sm:hidden">{ctaLabelMobile}</span>
            <span className="hidden sm:inline">{ctaLabel}</span>
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 8h10m0 0L9 4m4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
