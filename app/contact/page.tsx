import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { LazyMapEmbed } from "@/app/_components/LazyMapEmbed";
import { breadcrumbJsonLd } from "@/lib/seo";

const ContactForm = dynamic(
  () =>
    import("@/app/contact/ContactForm").then((m) => ({
      default: m.ContactForm,
    })),
  {
    loading: () => (
      <div className="h-48 flex items-center justify-center text-sm text-muted">
        Chargement du formulaire…
      </div>
    ),
  },
);

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez le cabinet du Dr. Alexandra Soldea — adresses à Miribel et Lyon, téléphone, formulaire et plan d'accès.",
  alternates: { canonical: "/contact" },
};

const ADDRESSES = [
  {
    city: "Miribel",
    title: "Cabinet principal",
    address: "63 place de la République, 01700 Miribel",
    detail: null as string | null,
    mapsUrl:
      "https://www.google.com/maps?q=63+place+de+la+République+01700+Miribel",
    embed:
      "https://www.google.com/maps?q=63+place+de+la+R%C3%A9publique+01700+Miribel&output=embed",
  },
  {
    city: "Lyon",
    title: "Cabinet d'échographie à Lyon",
    address: "4 rue du Président Carnot, 69002 Lyon",
    detail: "Consultations gynécologiques et échographies sur rendez-vous.",
    mapsUrl:
      "https://www.google.com/maps?q=4+rue+du+Président+Carnot+69002+Lyon",
    embed:
      "https://www.google.com/maps?q=4+rue+du+Pr%C3%A9sident+Carnot+69002+Lyon&output=embed",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ),
        }}
      />
      <Header />
      <InfoStrip />
      <FormSection />
      <Maps />
    </>
  );
}

function Header() {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft opacity-50" />
      <div className="container-page relative pt-24 pb-16 md:pt-32 md:pb-20 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur ring-1 ring-line px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary-deep">
          Contact
        </div>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.01em] text-ink text-balance">
          Parlons de votre suivi.
        </h1>
        <p className="mt-6 text-lg text-ink-soft text-pretty">
          Une question administrative, un imprévu ou un retard ? Envoyez-nous un
          message ou appelez directement le secrétariat. Pour prendre
          rendez-vous, utilisez la prise de rendez-vous en ligne.
        </p>
        <p className="mt-4 text-lg text-ink-soft text-pretty">
          Dr Alexandra Soldea vous accueille à Lyon et Miribel pour les
          échographies gynécologiques et obstétricales, le suivi de grossesse et
          les consultations spécialisées.
        </p>
      </div>
    </section>
  );
}

function InfoStrip() {
  const items = [
    {
      label: "Téléphone",
      value: "04 28 29 55 16",
      href: "tel:+33428295516",
      detail: "Du lundi au vendredi",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M5 4h4l2 5-3 1.5c1.5 3.5 3.5 5.5 7 7L16 14l5 2v4c-9 0-16-7-16-16Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Miribel",
      value: "63 place de la République",
      detail: "01700 Miribel",
      href: ADDRESSES[0].mapsUrl,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      label: "Lyon",
      value: "Cabinet d'échographie à Lyon",
      detail:
        "4 rue du Président Carnot, 69002 Lyon · Consultations gynécologiques et échographies sur rendez-vous.",
      href: "/echographie-gynecologique-obstetricale-lyon",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M3 21V8l9-5 9 5v13M9 21v-7h6v7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-10 border-t border-line">
      <div className="container-page grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={
              item.href.startsWith("http") ? "_blank" : undefined
            }
            rel={
              item.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            className="group rounded-2xl bg-white ring-1 ring-line p-6 flex gap-4 hover:ring-primary/40 hover:-translate-y-0.5 transition-all"
          >
            <span className="shrink-0 h-12 w-12 rounded-full bg-primary-soft text-primary-deep grid place-content-center">
              {item.icon}
            </span>
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-primary mb-1">
                {item.label}
              </p>
              <p className="font-display text-lg text-ink leading-tight">
                {item.value}
              </p>
              <p className="text-sm text-muted mt-1">{item.detail}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function FormSection() {
  return (
    <section className="bg-cream py-20 md:py-24">
      <div className="container-page grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start max-w-6xl">
        <div className="lg:sticky lg:top-28">
          <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-4">
            Envoyer un message
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight text-balance">
            Comment pouvons-nous vous aider ?
          </h2>
          <p className="mt-5 text-base text-ink-soft text-pretty">
            Ce formulaire est destiné aux demandes administratives ou aux
            questions générales. Les urgences médicales doivent être adressées
            au 15 ou aux services d&apos;urgence.
          </p>

          <div className="mt-8 rounded-2xl bg-white ring-1 ring-line p-5">
            <p className="text-xs tracking-[0.25em] uppercase text-primary">
              Prendre rendez-vous
            </p>
            <p className="text-sm text-ink-soft mt-2 text-pretty">
              Pour un rendez-vous, utilisez la prise de rendez-vous en ligne par
              service.
            </p>
            <Link
              href="/services"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-deep"
            >
              Prendre rendez-vous à Lyon <span aria-hidden>→</span>
            </Link>
          </div>

          <nav
            aria-label="Services à Lyon"
            className="mt-6 rounded-2xl bg-white ring-1 ring-line p-5"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-primary">
              À Lyon
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/services/echographie-gynecologique"
                  className="text-primary-deep hover:text-ink transition-colors"
                >
                  Échographie gynécologique à Lyon
                </Link>
              </li>
              <li>
                <Link
                  href="/services/echographie-obstetricale"
                  className="text-primary-deep hover:text-ink transition-colors"
                >
                  Échographie obstétricale à Lyon
                </Link>
              </li>
              <li>
                <Link
                  href="/echographie-gynecologique-obstetricale-lyon"
                  className="text-primary-deep hover:text-ink transition-colors"
                >
                  Cabinet de Lyon
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="rounded-[var(--radius-card)] bg-white ring-1 ring-line p-7 md:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Maps() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container-page">
        <div className="text-center mb-12">
          <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-4">
            Plan d&apos;accès
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
            Deux adresses pour vous accueillir.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h3 className="font-display text-2xl text-ink leading-tight">
            Consultations et échographies à Lyon
          </h3>
          <p className="mt-4 text-ink-soft text-pretty leading-relaxed">
            Le cabinet de Lyon permet aux patientes du centre de Lyon
            d&apos;accéder aux consultations de gynécologie, au suivi de
            grossesse et aux échographies gynécologiques et obstétricales avec
            Dr Alexandra Soldea.{" "}
            <Link
              href="/echographie-gynecologique-obstetricale-lyon"
              className="text-primary-deep hover:text-ink transition-colors"
            >
              En savoir plus sur le cabinet de Lyon
            </Link>
            .
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {ADDRESSES.map((a) => (
            <div
              key={a.city}
              id={`cabinet-${a.city.toLowerCase()}`}
              className="scroll-mt-28 rounded-2xl overflow-hidden ring-1 ring-line bg-cream"
            >
              <LazyMapEmbed
                src={a.embed}
                title={`Plan d'accès — ${a.city}`}
              />
              <div className="p-5 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-primary">
                    {a.city}
                  </p>
                  <p className="font-display text-lg text-ink mt-1 leading-snug">
                    {a.title}
                  </p>
                  <p className="text-sm text-muted mt-1">{a.address}</p>
                  {a.detail && (
                    <p className="text-sm text-ink-soft mt-2">{a.detail}</p>
                  )}
                </div>
                <a
                  href={a.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center justify-center h-10 px-4 rounded-full bg-ink text-white text-sm hover:bg-primary-deep transition-colors"
                >
                  Itinéraire
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
