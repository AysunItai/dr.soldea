import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceIcon } from "@/app/_components/ServiceIcon";
import {
  SERVICES,
  getAllServiceSlugs,
  getChildServices,
  getServiceBySlug,
  type Service,
} from "@/lib/services";
import {
  breadcrumbJsonLd,
  buildAbsoluteUrl,
  faqPageJsonLd,
  medicalProcedureJsonLd,
  medicalWebPageJsonLd,
} from "@/lib/seo";

const BookingPanel = dynamic(
  () =>
    import("@/app/_components/BookingPanel").then((m) => ({
      default: m.BookingPanel,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl bg-white ring-1 ring-line p-3 md:p-4">
        <div className="h-[720px] flex flex-col items-center justify-center gap-3 text-sm text-muted bg-cream rounded-2xl">
          <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          Chargement du calendrier…
        </div>
      </div>
    ),
  },
);

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service introuvable" };
  }
  const description = service.metaDescription ?? service.tagline;
  const url = buildAbsoluteUrl(`/services/${service.slug}`);
  return {
    title: service.title,
    description,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: service.title,
      description,
      url,
      type: "article",
      locale: "fr_FR",
    },
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

  const isHub = !!service.children?.length;
  const children = isHub ? getChildServices(service) : [];

  /* Build the breadcrumb trail. Trimester pages get an extra hop through
   * the obstetric hub so the SERP shows the full taxonomy. */
  const breadcrumbItems: { name: string; path: string }[] = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
  ];
  if (
    service.group === "obstetrical" &&
    service.slug !== "echographie-obstetricale"
  ) {
    breadcrumbItems.push({
      name: "Échographie obstétricale",
      path: "/services/echographie-obstetricale",
    });
  }
  breadcrumbItems.push({
    name: service.shortTitle ?? service.title,
    path: `/services/${service.slug}`,
  });

  return (
    <>
      {/* MedicalProcedure structured data — only for actual procedures,
          not the obstetric hub which is more of a category. */}
      {!isHub && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(medicalProcedureJsonLd(service)),
          }}
        />
      )}
      {/* MedicalWebPage — flags this as medical content reviewed by the
       * practitioner. Strong E-E-A-T signal for YMYL queries. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalWebPageJsonLd(service)),
        }}
      />
      {/* Breadcrumb — Google renders the trail in SERPs in place of the
       * raw URL when present, materially improving CTR. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)),
        }}
      />
      {/* FAQPage — emitted only when faqs are present AND visible on the
       * page (the <FaqSection> below renders them). Google policy requires
       * visible Q&A content matching the structured data. */}
      {service.faqs && service.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageJsonLd(service.faqs)),
          }}
        />
      )}
      <Header service={service} />
      {isHub ? (
        <HubBody service={service} childServices={children} />
      ) : (
        <BookingBody service={service} />
      )}
      {service.faqs && service.faqs.length > 0 && (
        <FaqSection service={service} />
      )}
      <RelatedServices service={service} />
    </>
  );
}

function Header({ service }: { service: Service }) {
  const hasPrice = !!service.priceEUR;
  const isHub = !!service.children?.length;
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
        <Breadcrumb service={service} />

        <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary-deep ring-1 ring-line shadow-[0_10px_24px_-14px_rgba(11,31,61,0.35)]">
                <ServiceIcon name={service.icon} className="h-5 w-5" />
              </span>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur ring-1 ring-line px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary-deep">
                {categoryLabel(service.category)}
              </div>
              {service.shortLabel && (
                <div className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-3.5 py-1.5 text-[11px] tracking-[0.2em] uppercase">
                  Écho {service.shortLabel}
                </div>
              )}
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.01em] text-ink text-balance">
              {service.title}
            </h1>
            <p className="mt-5 text-lg text-ink-soft text-pretty max-w-2xl">
              {service.tagline}
            </p>
          </div>

          {!isHub && (
            <dl className="grid grid-cols-3 gap-3 lg:gap-4">
              <Meta
                label={service.weeks ? "Semaines" : "Durée"}
                value={
                  service.weeks
                    ? service.weeks
                    : (service.durationLabel ?? `${service.durationMinutes} min`)
                }
              />
              <Meta label="Lieu" value={service.location} />
              <Meta
                label={hasPrice ? "Tarif" : "Durée"}
                value={
                  hasPrice
                    ? `€${service.priceEUR}`
                    : (service.durationLabel ?? `${service.durationMinutes} min`)
                }
              />
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

function Breadcrumb({ service }: { service: Service }) {
  // Trimester pages get an extra hop through the obstetric hub.
  const parent = service.children
    ? null
    : service.group === "obstetrical" && service.slug !== "echographie-obstetricale"
      ? getServiceBySlug("echographie-obstetricale")
      : null;
  return (
    <nav className="text-sm text-muted" aria-label="Fil d'Ariane">
      <Link href="/services" className="hover:text-ink">
        Services
      </Link>
      {parent && (
        <>
          <span aria-hidden> / </span>
          <Link
            href={`/services/${parent.slug}`}
            className="hover:text-ink"
          >
            {parent.shortTitle ?? parent.title}
          </Link>
        </>
      )}
      <span aria-hidden> / </span>
      <span className="text-ink-soft">
        {service.shortTitle ?? service.title}
      </span>
    </nav>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-line p-4">
      <dt className="text-[10px] tracking-[0.25em] uppercase text-primary">
        {label}
      </dt>
      <dd className="mt-1 font-display text-base lg:text-lg text-ink leading-tight">
        {value}
      </dd>
    </div>
  );
}

/* ---------------- Booking page body (single Calendly) ---------------- */

function BookingBody({ service }: { service: Service }) {
  const hasSections = !!service.sections?.length;
  return (
    <>
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
            <BookingPanel service={service} />
          </div>
        </div>
      </section>

      {hasSections && <LongFormSections service={service} />}
    </>
  );
}

/* ---------------- Hub page body (no booking, list children) ---------------- */

function HubBody({
  service,
  childServices,
}: {
  service: Service;
  childServices: Service[];
}) {
  return (
    <>
      <section className="bg-white py-16 md:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-4">
              Description
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight text-balance">
              {service.shortTitle ?? service.title}
            </h2>
            <p className="mt-5 text-lg text-ink-soft text-pretty leading-relaxed">
              {service.description}
            </p>

            {service.details && service.details.length > 0 && (
              <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3">
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
          </div>

          {/* The three indexed trimester pages */}
          <div className="mt-14 md:mt-16">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                Choisissez votre trimestre
              </h3>
              <span className="hidden md:block text-xs text-muted">
                Cliquez sur un trimestre pour découvrir l&apos;examen et réserver.
              </span>
            </div>
            <ol className="grid gap-6 md:grid-cols-3">
              {childServices.map((child, i) => (
                <li key={child.slug}>
                  <Link
                    href={`/services/${child.slug}`}
                    className="group block h-full rounded-[1.5rem] bg-cream ring-1 ring-line p-7 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,31,61,0.18)] hover:ring-primary/30"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-display text-[3rem] leading-none text-primary-deep">
                        <span className="opacity-30">0</span>
                        {i + 1}
                      </span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-deep ring-1 ring-line">
                        <ServiceIcon name={child.icon} className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-5 text-[11px] tracking-[0.22em] uppercase text-primary">
                      {child.shortLabel} · {child.weeks}
                    </p>
                    <h4 className="mt-2 font-display text-xl text-ink leading-snug text-balance">
                      {child.shortTitle}
                    </h4>
                    <p className="mt-2 text-sm text-ink-soft line-clamp-3 text-pretty">
                      {child.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-deep">
                      Découvrir l&apos;écho {child.shortLabel}
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
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- Long-form SEO sections ---------------- */

function LongFormSections({ service }: { service: Service }) {
  if (!service.sections?.length) return null;
  return (
    <section className="bg-cream py-16 md:py-20 border-t border-line">
      <div className="container-page grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-3">
            En savoir plus
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight text-balance">
            {service.shortTitle}
            {service.shortLabel && (
              <span className="block text-base text-muted font-normal mt-2">
                Écho {service.shortLabel} ·{" "}
                {service.weeks ?? `${service.durationMinutes} min`} ·{" "}
                {service.location}
              </span>
            )}
          </h2>
        </div>

        <div className="space-y-10">
          {service.sections.map((section) => (
            <article key={section.heading}>
              <h3 className="font-display text-2xl text-ink leading-snug text-balance">
                {section.heading}
              </h3>
              {section.body && (
                <p className="mt-3 text-ink-soft leading-relaxed text-pretty">
                  {section.body}
                </p>
              )}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-ink-soft"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ section (paired with FAQPage JSON-LD) ----------- */

/**
 * Visible FAQ section. MUST mirror the `service.faqs` data 1:1 because the
 * page also emits a `FAQPage` JSON-LD block — Google's policy requires the
 * structured data to match content visible to the user.
 *
 * Rendered as native <details>/<summary> so it's expandable without any
 * client-side JavaScript (perf-friendly, accessible by default, indexable).
 */
function FaqSection({ service }: { service: Service }) {
  if (!service.faqs || service.faqs.length === 0) return null;
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-white py-16 md:py-20 border-t border-line"
    >
      <div className="container-page grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-3">
            Questions fréquentes
          </div>
          <h2
            id="faq-heading"
            className="font-display text-3xl md:text-4xl text-ink leading-tight text-balance"
          >
            Vos questions sur{" "}
            <span className="italic text-primary-deep">
              {service.shortTitle ?? service.title}
            </span>
            .
          </h2>
          <p className="mt-4 text-ink-soft text-sm leading-relaxed text-pretty max-w-sm">
            Vous ne trouvez pas la réponse à votre question ?{" "}
            <Link
              href="/contact"
              className="underline decoration-primary/40 underline-offset-4 decoration-2 text-ink hover:text-primary-deep"
            >
              Contactez le cabinet
            </Link>
            .
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {service.faqs.map((faq) => (
            <li key={faq.question}>
              <details className="group py-5">
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                  <h3 className="font-display text-lg md:text-xl text-ink leading-snug text-balance">
                    {faq.question}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-deep ring-1 ring-line group-open:rotate-45 transition-transform"
                  >
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                      <path
                        d="M6 2v8M2 6h8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-ink-soft leading-relaxed text-pretty max-w-3xl">
                  {faq.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Related services ---------------- */

function RelatedServices({ service }: { service: Service }) {
  // For obstetric trimester pages, surface the sibling trimesters first.
  const obstetricSiblings =
    service.group === "obstetrical" && !service.children
      ? SERVICES.filter(
          (s) =>
            s.group === "obstetrical" &&
            s.slug !== service.slug &&
            !s.children,
        )
      : [];

  const others = SERVICES.filter(
    (s) =>
      s.slug !== service.slug &&
      !obstetricSiblings.some((o) => o.slug === s.slug) &&
      // Don't surface the hub itself or the other trimesters in random "related"
      !s.children &&
      !(service.group === "obstetrical" && s.group === "obstetrical"),
  );

  const related = [...obstetricSiblings, ...others].slice(0, 3);

  return (
    <section className="bg-white py-20 md:py-24 border-t border-line">
      <div className="container-page">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-3">
              {obstetricSiblings.length > 0
                ? "Autres trimestres"
                : "Autres services"}
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              {obstetricSiblings.length > 0
                ? "Continuer le parcours de grossesse."
                : "Découvrir d'autres consultations."}
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
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-[var(--radius-card)] bg-cream ring-1 ring-line p-7 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,31,61,0.18)] transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-deep ring-1 ring-line">
                  <ServiceIcon name={s.icon} className="h-4 w-4" />
                </span>
                <p className="text-[10px] tracking-[0.25em] uppercase text-primary">
                  {s.shortLabel ? `Écho ${s.shortLabel}` : categoryLabel(s.category)}
                </p>
              </div>
              <h3 className="font-display text-xl text-ink leading-snug">
                {s.shortTitle ?? s.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft line-clamp-2 text-pretty">
                {s.tagline}
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
