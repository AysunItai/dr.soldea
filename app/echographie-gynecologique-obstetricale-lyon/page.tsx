import type { Metadata } from "next";
import Link from "next/link";
import {
  breadcrumbJsonLd,
  buildAbsoluteUrl,
  canonicalUrl,
  CABINETS,
  faqPageJsonLd,
  lyonLandingPageJsonLd,
  medicalClinicJsonLd,
} from "@/lib/seo";

const LYON_CABINET = CABINETS.find((c) => c.id === "lyon")!;
const PAGE_PATH = "/echographie-gynecologique-obstetricale-lyon";

const META_DESCRIPTION =
  "Échographies gynécologiques et obstétricales à Lyon, au Centre d'Échographie de la Femme OPÉRA avec Dr Alexandra Soldea. Suivi de grossesse et consultations sur rendez-vous, La Presqu'île (1er).";

const FAQS = [
  {
    question: "Où se situe le centre d'échographie à Lyon ?",
    answer:
      "Le Centre d'Échographie de la Femme OPÉRA est situé au 9 rue du Président Édouard Herriot, 69001 Lyon, en plein cœur de la Presqu'île, à proximité de l'Opéra de Lyon et des Cordeliers. Dr Alexandra Soldea et son équipe y reçoivent sur rendez-vous pour les consultations gynécologiques et les échographies gynécologiques et obstétricales.",
  },
  {
    question: "Quels types d'échographies sont réalisés au centre de Lyon ?",
    answer:
      "Au Centre d'Échographie de la Femme OPÉRA, Dr Soldea réalise les échographies gynécologiques pelviennes (utérus, ovaires, pelvis) et les échographies obstétricales de suivi de grossesse : 1er trimestre, morphologique du 2e trimestre et échographie du 3e trimestre. Elle est échographiste agréée du réseau de périnatalité Aurore.",
  },
  {
    question: "Faut-il un rendez-vous pour une échographie à Lyon ?",
    answer:
      "Oui, toutes les consultations et échographies sont réalisées exclusivement sur rendez-vous. Vous pouvez réserver votre créneau en ligne sur ce site, en choisissant le service souhaité. Une confirmation vous est envoyée par e-mail.",
  },
  {
    question: "Le centre est-il accessible en transports en commun ?",
    answer:
      "Oui. Le centre se trouve au cœur de Lyon (1er arrondissement, La Presqu'île), facilement accessible en métro (ligne A, arrêts Cordeliers ou Hôtel de Ville–Louis Pradel), ainsi qu'en bus. Plusieurs parkings publics sont disponibles à proximité pour les patientes venant en voiture.",
  },
  {
    question: "Le centre propose-t-il toutes les échographies de la femme ?",
    answer:
      "Oui. Le Centre d'Échographie de la Femme OPÉRA est dédié à l'échographie de la femme : échographies gynécologiques pelviennes, échographies obstétricales des 1er, 2e et 3e trimestres, échographie de datation, suivi de grossesse, contrôle de stérilet (DIU) et consultations gynécologiques, le tout au même endroit à Lyon.",
  },
  {
    question: "Comment prendre rendez-vous à Lyon ?",
    answer:
      "La prise de rendez-vous s'effectue en ligne sur la page Services de ce site. Sélectionnez le type de consultation ou d'échographie souhaité, puis choisissez un créneau disponible. Pour toute question, vous pouvez également contacter le secrétariat au 04 28 29 55 16 ou via le formulaire de contact.",
  },
] as const;

const SERVICES = [
  {
    title: "Échographie gynécologique",
    description:
      "Exploration pelvienne par voie sus-pubienne et endo-vaginale pour le bilan et le suivi des pathologies gynécologiques.",
    href: "/services/echographie-gynecologique",
  },
  {
    title: "Échographie obstétricale",
    description:
      "Les trois échographies de dépistage prénatal recommandées — 1er, 2e et 3e trimestre — réalisées par une échographiste agréée Aurore.",
    href: "/services/echographie-obstetricale",
  },
  {
    title: "Suivi de grossesse",
    description:
      "Consultations mensuelles de suivi obstétrical, prescriptions et coordination avec la maternité.",
    href: "/services/suivi-grossesse",
  },
] as const;

export const metadata: Metadata = {
  title: "Échographie à Lyon",
  description: META_DESCRIPTION,
  alternates: { canonical: canonicalUrl(PAGE_PATH) },
  openGraph: {
    title: "Échographie à Lyon | Dr Alexandra Soldea",
    description: META_DESCRIPTION,
    url: buildAbsoluteUrl(PAGE_PATH),
    type: "website",
    locale: "fr_FR",
  },
};

export default function LyonLandingPage() {
  const mapsUrl =
    "https://www.google.com/maps?q=9+rue+du+Pr%C3%A9sident+%C3%89douard+Herriot+69001+Lyon";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(lyonLandingPageJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalClinicJsonLd(LYON_CABINET)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", path: "/" },
              {
                name: "Échographie à Lyon",
                path: PAGE_PATH,
              },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd([...FAQS])),
        }}
      />

      <Header />
      <Intro />
      <Services />
      <Location mapsUrl={mapsUrl} />
      <FaqSection />
      <Cta />
    </>
  );
}

function Header() {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft opacity-50" />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.18), transparent 70%)",
        }}
      />
      <div className="container-page relative pt-24 pb-16 md:pt-32 md:pb-20 max-w-3xl">
        <nav className="text-sm text-muted" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-ink">
            Accueil
          </Link>
          <span aria-hidden> / </span>
          <span className="text-ink-soft">Échographie à Lyon</span>
        </nav>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur ring-1 ring-line px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary-deep mt-8">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Centre d&apos;Échographie de la Femme OPÉRA
        </div>
        <h1 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.01em] text-ink text-balance">
          Échographie gynécologique et obstétricale à Lyon
        </h1>
        <p className="mt-6 text-lg text-ink-soft text-pretty">
          {META_DESCRIPTION}
        </p>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-page grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start max-w-5xl">
        <div>
          <div className="text-[11px] tracking-[0.3em] uppercase text-accent-deep font-medium mb-4">
            Le Dr Alexandra Soldea
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight text-balance">
            Une praticienne spécialisée au cœur de Lyon
          </h2>
          <p className="mt-5 text-ink-soft text-pretty leading-relaxed">
            Gynécologue obstétricienne et échographiste agréée du réseau de
            périnatalité Aurore, le Dr Alexandra Soldea dirige le Centre
            d&apos;Échographie de la Femme OPÉRA à Lyon. Titulaire du DIU
            d&apos;échographie gynécologique et obstétricale, elle accompagne,
            avec son équipe, les patientes pour les échographies de grossesse,
            les bilans gynécologiques et le suivi obstétrical.
          </p>
          <p className="mt-4 text-ink-soft text-pretty leading-relaxed">
            Le centre, situé 9 rue du Président Édouard Herriot dans le 1er
            arrondissement (La Presqu'île), offre un accès direct aux
            consultations et échographies pour les patientes de la métropole
            lyonnaise.
          </p>
          <Link
            href="/presentation"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-deep"
          >
            Découvrir le parcours du Dr Soldea <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="card-gold-top relative rounded-2xl bg-ink-deep text-white ring-1 ring-accent/25 p-6 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.7)]">
          <p className="text-xs tracking-[0.25em] uppercase text-accent font-medium">
            Adresse
          </p>
          <p className="font-display text-xl text-white mt-2 leading-snug">
            9 rue du Président Édouard Herriot
          </p>
          <p className="text-white/70 mt-1">69001 Lyon</p>
          <p className="text-sm text-white/60 mt-4">
            <a href="tel:+33428295516" className="hover:text-accent transition-colors">
              04 28 29 55 16
            </a>
          </p>
          <Link
            href="/contact#cabinet-lyon"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-white transition-colors"
          >
            Voir le plan d&apos;accès <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="container-page max-w-5xl">
        <div className="text-[11px] tracking-[0.3em] uppercase text-accent-deep font-medium mb-4">
          Prestations
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight text-balance">
          Services disponibles au centre de Lyon
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="card-gold-top relative group rounded-2xl bg-ink-deep text-white ring-1 ring-accent/25 p-6 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.7)] hover:ring-accent/55 hover:-translate-y-1 transition-all"
            >
              <h3 className="font-display text-lg text-white leading-snug group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {service.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                En savoir plus <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location({ mapsUrl }: { mapsUrl: string }) {
  return (
    <section className="bg-white py-16 md:py-20 border-t border-line">
      <div className="container-page max-w-5xl">
        <div className="text-[11px] tracking-[0.3em] uppercase text-accent-deep font-medium mb-4">
          Accès
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
          Comment venir au centre de Lyon
        </h2>
        <p className="mt-5 text-ink-soft text-pretty leading-relaxed max-w-2xl">
          Le centre se trouve au 9 rue du Président Édouard Herriot, en plein
          cœur de Lyon (La Presqu'île). Métro ligne A (Cordeliers ou Hôtel de
          Ville–Louis Pradel) et parkings publics à proximité.
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center h-11 px-6 rounded-full bg-ink text-white text-sm hover:bg-primary-deep transition-colors"
        >
          Ouvrir dans Google Maps
        </a>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-cream py-16 md:py-20 border-t border-line"
    >
      <div className="container-page grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start max-w-5xl">
        <div className="lg:sticky lg:top-28">
          <div className="text-[11px] tracking-[0.3em] uppercase text-accent-deep font-medium mb-3">
            Questions fréquentes
          </div>
          <h2
            id="faq-heading"
            className="font-display text-3xl md:text-4xl text-ink leading-tight text-balance"
          >
            Échographie et consultations{" "}
            <span className="italic text-primary-deep">à Lyon</span>
          </h2>
          <p className="mt-4 text-ink-soft text-sm leading-relaxed text-pretty max-w-sm">
            Une question ?{" "}
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
          {FAQS.map((faq) => (
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

function Cta() {
  return (
    <section className="bg-white py-16 md:py-20 border-t border-line">
      <div className="container-page max-w-3xl text-center">
        <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight text-balance">
          Prendre rendez-vous à Lyon
        </h2>
        <p className="mt-5 text-ink-soft text-pretty leading-relaxed">
          Réservez votre consultation ou votre échographie en ligne, ou
          contactez le secrétariat pour toute question.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-ink text-white text-sm font-medium hover:bg-primary-deep transition-colors"
          >
            Prendre rendez-vous à Lyon
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-white text-ink text-sm font-medium ring-1 ring-line hover:ring-primary/40 transition-colors"
          >
            Contacter le cabinet
          </Link>
        </div>
      </div>
    </section>
  );
}
