import { LazyMapEmbed } from "@/app/_components/LazyMapEmbed";
import { OrnateCorners } from "@/app/_components/OperaMotifs";
import {
  CLINIC_NAME,
  CLINIC_POSTAL,
  CLINIC_STREET,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_URL,
  GOOGLE_STREET_VIEW_EMBED_URL,
} from "@/lib/clinic";

type ClinicAccessMapsProps = {
  className?: string;
  mapsButtonLabel?: string;
};

/**
 * Side-by-side Google Maps + Street View (or entrance placeholder).
 * Shared by /galerie and /contact.
 */
export function ClinicAccessMaps({
  className,
  mapsButtonLabel = "Voir l'entrée sur Google Maps",
}: ClinicAccessMapsProps) {
  const hasStreetView = Boolean(GOOGLE_STREET_VIEW_EMBED_URL.trim());

  return (
    <div
      className={[
        "grid lg:grid-cols-2 gap-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="rounded-[1.25rem] overflow-hidden ring-1 ring-line bg-cream shadow-[0_20px_50px_-28px_rgba(11,31,58,0.12)]">
        <LazyMapEmbed
          src={GOOGLE_MAPS_EMBED_URL}
          title={`Plan d'accès — ${CLINIC_NAME}`}
          className="block w-full h-72 md:h-80 bg-cream"
        />
        <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-accent-deep font-medium">
              Adresse
            </p>
            <p className="font-display text-lg text-ink mt-1">{CLINIC_STREET}</p>
            <p className="text-sm text-muted">{CLINIC_POSTAL}</p>
          </div>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-ink text-white text-sm font-medium hover:bg-ink-deep transition-colors shrink-0"
          >
            {mapsButtonLabel}
          </a>
        </div>
      </div>

      {hasStreetView ? (
        <div className="rounded-[1.25rem] overflow-hidden ring-1 ring-line bg-cream shadow-[0_20px_50px_-28px_rgba(11,31,58,0.12)]">
          <LazyMapEmbed
            src={GOOGLE_STREET_VIEW_EMBED_URL}
            title={`Vue Street View — ${CLINIC_NAME}`}
            className="block w-full h-72 md:h-80 bg-cream"
          />
          <div className="p-5 md:p-6">
            <p className="text-xs tracking-[0.25em] uppercase text-accent-deep font-medium">
              Entrée du centre
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Vue de la rue du Président Édouard Herriot.
            </p>
          </div>
        </div>
      ) : (
        <div className="card-gold-top relative rounded-[1.25rem] bg-gradient-to-b from-white to-champagne/70 ring-1 ring-accent/30 p-8 md:p-10 flex flex-col justify-center shadow-[0_20px_50px_-28px_rgba(11,31,58,0.12)]">
          <OrnateCorners />
          <p className="text-[11px] tracking-[0.28em] uppercase text-accent-deep font-medium">
            Entrée du centre
          </p>
          <p className="mt-4 font-display text-2xl text-ink leading-snug text-balance">
            Préparer votre venue au centre
          </p>
          <p className="mt-3 text-sm text-ink-soft leading-relaxed text-pretty">
            Consultez l&apos;itinéraire et l&apos;entrée du centre sur Google Maps
            afin de préparer votre venue sereinement.
          </p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-deep w-fit"
          >
            <span className="border-b border-primary-deep/30 pb-px hover:border-primary-deep transition-colors">
              Voir l&apos;entrée sur Google Maps
            </span>
            <span aria-hidden>↗</span>
          </a>
        </div>
      )}
    </div>
  );
}
