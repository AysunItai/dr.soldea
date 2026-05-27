import type { Metadata } from "next";
import { Section } from "@/app/_components/Section";
import { ServiceCard } from "@/app/_components/ServiceCard";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services & prise de rendez-vous",
  description:
    "Tous les services du Dr. Alexandra Soldea : téléconsultation, échographies gynécologique et obstétricale, suivi de grossesse, contrôle de stérilet, échographie de datation et suivi de gynécologie.",
};

const CATEGORIES = [
  { key: "consultation", label: "Consultations" },
  { key: "echographie", label: "Échographies" },
  { key: "suivi", label: "Suivi" },
] as const;

export default function ServicesPage() {
  return (
    <>
      <Header />

      {CATEGORIES.map((cat, index) => {
        const services = SERVICES.filter((s) => s.category === cat.key);
        if (services.length === 0) return null;
        return (
          <Section
            key={cat.key}
            eyebrow={cat.label}
            title={categoryTitle(cat.key)}
            description={categoryDescription(cat.key)}
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
          Cliquez sur un service pour découvrir son contenu et accéder
          directement à la prise de rendez-vous en ligne.
        </p>
      </div>
    </section>
  );
}

function categoryTitle(key: (typeof CATEGORIES)[number]["key"]): string {
  switch (key) {
    case "consultation":
      return "Consultations & téléconsultation";
    case "echographie":
      return "Échographies";
    case "suivi":
      return "Suivi & contrôle";
  }
}

function categoryDescription(
  key: (typeof CATEGORIES)[number]["key"],
): string {
  switch (key) {
    case "consultation":
      return "Pour vos questions, prescriptions et suivi gynécologique général.";
    case "echographie":
      return "Échographies gynécologique et obstétricales — réseau Aurore.";
    case "suivi":
      return "Suivi de grossesse, contrôle de stérilet et accompagnement.";
  }
}
