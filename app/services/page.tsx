import type { Metadata } from "next";
import { Section } from "@/app/_components/Section";
import { ServiceCard } from "@/app/_components/ServiceCard";
import { SERVICES, type Service } from "@/lib/services";
import { breadcrumbJsonLd, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services & rendez-vous en ligne",
  description:
    "Échographies T1, T2, T3, écho gynécologique, suivi de grossesse et consultations à Lyon et Miribel. Réseau Aurore. RDV en ligne 24 h/24.",
  keywords: [
    "échographie Lyon",
    "échographie gynécologique Lyon",
    "échographie pelvienne Lyon",
    "échographie grossesse Lyon",
    "gynécologue Lyon",
    "rendez-vous gynécologue Lyon",
  ],
  alternates: { canonical: canonicalUrl("/services") },
};

type Group = {
  key: string;
  label: string;
  title: string;
  description: string;
  filter: (s: Service) => boolean;
};

const GROUPS: Group[] = [
  {
    key: "consultations",
    label: "Consultations",
    title: "Consultations & téléconsultation",
    description:
      "Pour vos questions, prescriptions et suivi gynécologique général.",
    filter: (s) => s.category === "consultation",
  },
  {
    key: "obstetric",
    label: "Échographies obstétricales · Réseau Aurore",
    title: "Échographies obstétricales — T1, T2, T3",
    description:
      "Les trois échographies de dépistage prénatal recommandées pendant la grossesse, réalisées par un échographiste agréé du réseau de périnatalité Aurore.",
    filter: (s) => s.group === "obstetrical" && !s.children,
  },
  {
    key: "other-echo",
    label: "Autres échographies",
    title: "Échographie gynécologique & échographie de datation",
    description:
      "Examens d'imagerie hors suivi obstétrical : exploration pelvienne et confirmation précoce de grossesse.",
    filter: (s) =>
      s.category === "echographie" && s.group !== "obstetrical",
  },
  {
    key: "suivi",
    label: "Suivi",
    title: "Suivi & contrôle",
    description:
      "Suivi de grossesse, contrôle de stérilet et accompagnement.",
    filter: (s) => s.category === "suivi",
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", path: "/" },
              { name: "Services", path: "/services" },
            ]),
          ),
        }}
      />
      <Header />

      {GROUPS.map((group, index) => {
        const services = SERVICES.filter(group.filter);
        if (services.length === 0) return null;
        return (
          <Section
            key={group.key}
            eyebrow={group.label}
            title={group.title}
            description={group.description}
            align="left"
            className={index % 2 === 1 ? "bg-cream" : "bg-white"}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}

function Header() {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft opacity-50" />
      <div className="container-page relative pt-24 pb-16 md:pt-32 md:pb-20 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur ring-1 ring-line px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary-deep">
          Services & prise de rendez-vous
        </div>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.01em] text-ink text-balance">
          Choisissez votre <span className="italic text-primary-deep">consultation</span>.
        </h1>
        <p className="mt-6 text-lg text-ink-soft text-pretty">
          Échographies de grossesse à Lyon et Miribel, suivi gynécologique,
          téléconsultation — cliquez sur un service pour découvrir son contenu
          et réserver en ligne.
        </p>
      </div>
    </section>
  );
}
