import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { LazyMapEmbed } from "@/app/_components/LazyMapEmbed";
import { OperaDivider, OrnateCorners } from "@/app/_components/OperaMotifs";
import { breadcrumbJsonLd, canonicalUrl } from "@/lib/seo";

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
  title: "Contact & rendez-vous",
  description:
    "Contactez le Centre d'Échographie de la Femme OPÉRA à Lyon : téléphone, formulaire de contact et plan d'accès. 9 rue du Président Édouard Herriot, 69001 Lyon.",
  alternates: { canonical: canonicalUrl("/contact") },
};

const ADDRESSES = [
  {
    city: "Lyon",
    title: "Centre d'Échographie de la Femme OPÉRA",
    address: "9 rue du Président Édouard Herriot, 69001 Lyon",
    detail: "Consultations gynécologiques et échographies sur rendez-vous.",
    mapsUrl:
      "https://www.google.com/maps?q=9+rue+du+Pr%C3%A9sident+%C3%89douard+Herriot+69001+Lyon",
    embed:
      "https://www.google.com/maps?q=9+rue+du+Pr%C3%A9sident+%C3%89douard+Herriot+69001+Lyon&output=embed",
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
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur ring-1 ring-accent/40 px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary-deep shadow-[0_10px_30px_-18px_rgba(122,38,61,0.5)]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Contact
        </div>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.01em] text-ink text-balance">
          Contact &amp; <span className="italic text-primary-deep">rendez-vous</span>.
        </h1>
        <p className="mt-6 text-lg text-ink-soft text-pretty">
          Pour toute demande administrative ou question relative à votre suivi,
          vous pouvez contacter le Centre d&apos;Échographie de la Femme OPÉRA à
          Lyon. Pour prendre rendez-vous, utilisez la prise de rendez-vous en
          ligne.
        </p>
        <p className="mt-4 text-lg text-ink-soft text-pretty">
          Dr Alexandra Soldea et son équipe vous accueillent au cœur de Lyon
          pour les échographies gynécologiques et obstétricales, le suivi de
          grossesse et les consultations spécialisées.
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
      label: "Le centre",
      value: "9 rue du Président Édouard Herriot",
      detail: "69001 Lyon · La Presqu'île",
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
      label: "Rendez-vous",
      value: "Réservation en ligne",
      detail:
        "Échographies et consultations sur rendez-vous, confirmation immédiate.",
      href: "/services",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <rect x="3.5" y="5" width="17" height="15" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 3.5v3M16 3.5v3M3.5 10h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
            className="card-gold-top relative group rounded-2xl bg-ink-deep text-white ring-1 ring-accent/25 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.7)] p-6 flex gap-4 hover:ring-accent/55 hover:-translate-y-1 transition-all"
          >
            <OrnateCorners />
            <span className="shrink-0 h-12 w-12 rounded-full bg-white/[0.05] text-accent ring-1 ring-accent/45 grid place-content-center">
              {item.icon}
            </span>
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-accent font-medium mb-1">
                {item.label}
              </p>
              <p className="font-display text-lg text-white leading-tight">
                {item.value}
              </p>
              <p className="text-sm text-white/55 mt-1">{item.detail}</p>
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
          <div className="text-[11px] tracking-[0.3em] uppercase text-accent-deep font-medium mb-4">
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

          <div className="card-gold-top relative mt-8 rounded-2xl bg-ink-deep text-white ring-1 ring-accent/25 p-5 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.7)]">
            <OrnateCorners />
            <p className="text-xs tracking-[0.25em] uppercase text-accent font-medium">
              Prendre rendez-vous
            </p>
            <p className="text-sm text-white/70 mt-2 text-pretty">
              Pour un rendez-vous, utilisez la prise de rendez-vous en ligne par
              service.
            </p>
            <Link
              href="/services"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-white transition-colors"
            >
              Prendre rendez-vous à Lyon <span aria-hidden>→</span>
            </Link>
          </div>

          <nav
            aria-label="Services à Lyon"
            className="relative mt-6 rounded-2xl bg-ink-deep text-white ring-1 ring-accent/25 p-5 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.7)]"
          >
            <OrnateCorners />
            <p className="text-xs tracking-[0.25em] uppercase text-accent font-medium">
              À Lyon
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/services/echographie-gynecologique"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  Échographie gynécologique à Lyon
                </Link>
              </li>
              <li>
                <Link
                  href="/services/echographie-obstetricale"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  Échographie obstétricale à Lyon
                </Link>
              </li>
              <li>
                <Link
                  href="/echographie-gynecologique-obstetricale-lyon"
                  className="text-white/80 hover:text-accent transition-colors"
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
          <div className="text-[11px] tracking-[0.3em] uppercase text-accent-deep font-medium mb-4">
            Plan d&apos;accès
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
            Au cœur de Lyon.
          </h2>
          <OperaDivider className="mt-6" />
        </div>

        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h3 className="font-display text-2xl text-ink leading-tight">
            Consultations et échographies à Lyon
          </h3>
          <p className="mt-4 text-ink-soft text-pretty leading-relaxed">
            Le Centre d&apos;Échographie de la Femme OPÉRA accueille les
            patientes au cœur de Lyon pour les consultations de gynécologie, le
            suivi de grossesse et les échographies gynécologiques et
            obstétricales avec Dr Alexandra Soldea et son équipe.{" "}
            <Link
              href="/echographie-gynecologique-obstetricale-lyon"
              className="text-primary-deep hover:text-ink transition-colors"
            >
              En savoir plus sur le centre de Lyon
            </Link>
            .
          </p>
        </div>

        <div className="grid gap-6 max-w-3xl mx-auto">
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
                  <p className="text-xs tracking-[0.25em] uppercase text-accent-deep font-medium">
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
