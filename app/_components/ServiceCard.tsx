import Link from "next/link";
import type { Service } from "@/lib/services";
import { ServiceIcon } from "@/app/_components/ServiceIcon";
import { OrnateCorners } from "@/app/_components/OperaMotifs";

type ServiceCardProps = {
  service: Service;
};

/**
 * Royal navy service card — deep navy ground with a gold icon medallion,
 * gold hairlines and engraved corners. Designed to sit on a light/champagne
 * section so the dark, gold-trimmed card reads like a jewel box.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const hasVariants = !!service.variants?.length;
  const isHub = !!service.children?.length;
  const trimesterLabel = service.shortLabel; // "T1" | "T2" | "T3" | undefined

  return (
    <Link
      href={`/services/${service.slug}`}
      className="card-gold-top group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-ink-deep text-white ring-1 ring-accent/25 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1.5 hover:ring-accent/55 hover:shadow-[0_55px_100px_-40px_rgba(0,0,0,0.8)]"
    >
      <OrnateCorners />

      {/* Icon medallion panel — gold light on navy. */}
      <div className="relative flex aspect-[4/3] items-center justify-center">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 45%, rgba(201,162,74,0.18), transparent 70%)",
          }}
        />
        <div className="relative grid h-20 w-20 place-content-center rounded-full bg-white/[0.05] text-accent ring-1 ring-accent/45 transition-transform duration-500 group-hover:scale-[1.05]">
          <span
            aria-hidden
            className="absolute inset-2 rounded-full ring-1 ring-accent/25"
          />
          <ServiceIcon name={service.icon} className="h-9 w-9" />
        </div>

        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-[10px] tracking-[0.18em] uppercase text-cream ring-1 ring-accent/30">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {service.location}
        </div>

        {(hasVariants || isHub) && (
          <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase text-ink-deep font-semibold">
            T1 · T2 · T3
          </div>
        )}
        {trimesterLabel && (
          <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-accent text-ink-deep px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase font-semibold">
            Écho {trimesterLabel}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col p-6 sm:p-7">
        <h3 className="font-display text-2xl text-white leading-snug text-balance">
          {service.shortTitle ?? service.title}
        </h3>
        <p className="mt-2 text-sm text-white/70 text-pretty line-clamp-3">
          {service.tagline}
        </p>

        <div className="mt-6 flex items-center justify-between text-xs text-white/55 border-t border-white/10 pt-4">
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
            <span className="text-white/80 font-medium">€{service.priceEUR}</span>
          ) : service.weeks ? (
            <span className="text-white/80 font-medium">{service.weeks}</span>
          ) : (
            <span className="text-white/45">Sur consultation</span>
          )}
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
          {isHub || hasVariants
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
