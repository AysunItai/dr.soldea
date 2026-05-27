import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendlyEmbed } from "@/app/_components/CalendlyEmbed";
import {
  SERVICES,
  getAllServiceSlugs,
  getServiceBySlug,
  type Service,
} from "@/lib/services";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service introuvable" };
  }
  return {
    title: service.shortTitle ?? service.title,
    description: service.tagline,
  };
}

export default async function ServicePage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header service={service} />
      <Booking service={service} />
      <RelatedServices currentSlug={service.slug} />
    </>
  );
}

function Header({ service }: { service: Service }) {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft opacity-50" />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(58,141,150,0.18), transparent 70%)",
        }}
      />
      <div className="container-page relative pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="text-sm text-muted">
          <Link href="/services" className="hover:text-ink">
            Services
          </Link>
          <span aria-hidden> / </span>
          <span className="text-ink-soft">
            {service.shortTitle ?? service.title}
          </span>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur ring-1 ring-line px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary-deep">
              {categoryLabel(service.category)}
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] tracking-[-0.01em] text-ink text-balance">
              {service.title}
            </h1>
            <p className="mt-5 text-lg text-ink-soft text-pretty max-w-2xl">
              {service.tagline}
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-4 lg:gap-6">
            <Meta label="Durée" value={`${service.durationMinutes} min`} />
            <Meta label="Lieu" value={service.location} />
            <Meta
              label="Tarif"
              value={service.priceEUR ? `€${service.priceEUR}` : "—"}
            />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-line p-4">
      <dt className="text-[10px] tracking-[0.25em] uppercase text-primary">
        {label}
      </dt>
      <dd className="mt-1 font-display text-lg text-ink leading-tight">
        {value}
      </dd>
    </div>
  );
}

function Booking({ service }: { service: Service }) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-page grid lg:grid-cols-[1fr_1.5fr] gap-10 items-start">
        <div className="lg:sticky lg:top-28">
          <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-4">
            Description
          </div>
          <h2 className="font-display text-3xl text-ink leading-tight text-balance">
            {service.shortTitle ?? service.title}
          </h2>
          <p className="mt-5 text-ink-soft text-pretty leading-relaxed">
            {service.description}
          </p>

          {service.details && service.details.length > 0 && (
            <ul className="mt-8 space-y-3">
              {service.details.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 text-sm text-ink-soft"
                >
                  <span
                    aria-hidden
                    className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0"
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 rounded-2xl bg-cream ring-1 ring-line p-5">
            <p className="text-xs tracking-[0.25em] uppercase text-primary">
              Bon à savoir
            </p>
            <p className="text-sm text-ink-soft mt-2 leading-relaxed">
              En cas d&apos;empêchement, merci de prévenir le cabinet au moins
              24 heures à l&apos;avance pour permettre à une autre patiente de
              bénéficier du créneau.
            </p>
          </div>
        </div>

        <div>
          <div className="rounded-2xl bg-white ring-1 ring-line p-3 md:p-4">
            <div className="px-3 py-2 mb-1">
              <p className="text-[11px] tracking-[0.25em] uppercase text-primary">
                Prendre rendez-vous
              </p>
              <p className="font-display text-xl text-ink mt-1">
                Sélectionnez votre créneau
              </p>
            </div>
            <CalendlyEmbed url={service.calendlyUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}

function RelatedServices({ currentSlug }: { currentSlug: string }) {
  const others = SERVICES.filter((s) => s.slug !== currentSlug).slice(0, 3);
  return (
    <section className="bg-cream py-20 md:py-24">
      <div className="container-page">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-3">
              Autres services
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              Découvrir d&apos;autres consultations.
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-primary-deep"
          >
            Tous les services <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-[var(--radius-card)] bg-white ring-1 ring-line p-7 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,31,61,0.18)] transition-all"
            >
              <p className="text-[10px] tracking-[0.25em] uppercase text-primary mb-3">
                {categoryLabel(service.category)}
              </p>
              <h3 className="font-display text-xl text-ink leading-snug">
                {service.shortTitle ?? service.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft line-clamp-2 text-pretty">
                {service.tagline}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-deep">
                Découvrir
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function categoryLabel(category: Service["category"]): string {
  switch (category) {
    case "echographie":
      return "Échographie";
    case "consultation":
      return "Consultation";
    case "suivi":
      return "Suivi";
  }
}
