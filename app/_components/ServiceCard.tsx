import Link from "next/link";
import type { Service } from "@/lib/services";
import { ServiceIcon } from "@/app/_components/ServiceIcon";

/**
 * Tonal gradient per category — keeps cards visually clustered when the
 * services grid mixes consultations, ultrasounds and follow-ups.
 */
const GRADIENT: Record<Service["category"], string> = {
  echographie: "from-primary-soft via-white to-cream-deep",
  consultation: "from-cream via-white to-primary-soft",
  suivi: "from-cream-deep via-cream to-primary-soft",
};

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const hasVariants = !!service.variants?.length;
  const isHub = !!service.children?.length;
  const trimesterLabel = service.shortLabel; // "T1" | "T2" | "T3" | undefined

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col rounded-[var(--radius-card)] bg-white ring-1 ring-line ring-soft overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_80px_-30px_rgba(11,31,61,0.25)] hover:ring-primary/30"
    >
      <div
        className={`relative aspect-[4/3] bg-gradient-to-br ${GRADIENT[service.category]}`}
      >
        <div className="absolute inset-0 bg-grid-soft opacity-50" />

        {/* Soft radial halo behind the icon for depth */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full bg-white/60 blur-2xl"
            />
            <div className="relative h-20 w-20 rounded-full bg-white shadow-[0_18px_40px_-20px_rgba(11,31,61,0.35)] ring-1 ring-line flex items-center justify-center text-primary-deep transition-transform duration-500 group-hover:scale-[1.04] group-hover:rotate-[-2deg]">
              <ServiceIcon name={service.icon} className="h-9 w-9" />
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-[10px] tracking-[0.18em] uppercase text-primary-deep ring-1 ring-line">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
          {service.location}
        </div>

        {(hasVariants || isHub) && (
          <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-ink/85 backdrop-blur px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase text-cream">
            T1 · T2 · T3
          </div>
        )}
        {trimesterLabel && (
          <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-ink text-cream px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase">
            Écho {trimesterLabel}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col p-6 sm:p-7">
        <h3 className="font-display text-2xl text-ink leading-snug text-balance">
          {service.shortTitle ?? service.title}
        </h3>
        <p className="mt-2 text-sm text-ink-soft text-pretty line-clamp-3">
          {service.tagline}
        </p>

        <div className="mt-6 flex items-center justify-between text-xs text-muted border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
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
            <span className="text-ink-soft font-medium">€{service.priceEUR}</span>
          ) : service.weeks ? (
            <span className="text-ink-soft font-medium">{service.weeks}</span>
          ) : (
            <span className="text-muted/80">Sur consultation</span>
          )}
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-deep">
          {isHub
            ? "Voir & choisir le trimestre"
            : hasVariants
              ? "Voir & choisir le trimestre"
              : "Voir & réserver"}
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
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
    </Link>
  );
}
