import Link from "next/link";
import type { Service } from "@/lib/services";

// Gradient placeholders per service category — replaces the photos for now.
const GRADIENT: Record<Service["category"], string> = {
  echographie:
    "from-primary-soft via-white to-cream-deep",
  consultation:
    "from-cream via-white to-primary-soft",
  suivi:
    "from-cream-deep via-cream to-primary-soft",
};

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col rounded-[var(--radius-card)] bg-white ring-1 ring-line ring-soft overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_80px_-30px_rgba(11,31,61,0.25)]"
    >
      <div
        className={`relative aspect-[4/3] bg-gradient-to-br ${GRADIENT[service.category]}`}
      >
        <div className="absolute inset-0 bg-grid-soft opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ServiceIcon category={service.category} />
        </div>
        <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-[11px] tracking-wider uppercase text-primary-deep ring-1 ring-line">
          {service.location}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6">
        <h3 className="font-display text-2xl text-ink leading-snug">
          {service.shortTitle ?? service.title}
        </h3>
        <p className="mt-2 text-sm text-ink-soft text-pretty line-clamp-3">
          {service.tagline}
        </p>

        <div className="mt-6 flex items-center justify-between text-xs text-muted">
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
            {service.durationMinutes} min
          </span>
          {service.priceEUR && <span>€{service.priceEUR}</span>}
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-deep">
          Prendre rendez-vous
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

function ServiceIcon({ category }: { category: Service["category"] }) {
  const stroke = "rgba(11, 31, 61, 0.45)";
  if (category === "echographie") {
    return (
      <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden>
        <circle cx="40" cy="40" r="26" fill="white" stroke={stroke} strokeWidth="1" />
        <path
          d="M28 44c4-8 12-12 22-12"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="46" cy="34" r="2" fill={stroke} />
      </svg>
    );
  }
  if (category === "consultation") {
    return (
      <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden>
        <rect
          x="20"
          y="22"
          width="40"
          height="32"
          rx="6"
          fill="white"
          stroke={stroke}
          strokeWidth="1"
        />
        <path
          d="M28 32h24M28 40h18"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M40 54v6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden>
      <path
        d="M40 18c-12 0-22 8-22 22 0 14 22 22 22 22s22-8 22-22c0-14-10-22-22-22Z"
        fill="white"
        stroke={stroke}
        strokeWidth="1"
      />
      <path
        d="M32 40c2-4 6-6 8-6s6 2 8 6"
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
