import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OperaDivider, OrnateCorners } from "@/app/_components/OperaMotifs";
import { breadcrumbJsonLd, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Équipe médicale",
  description:
    "L'équipe médicale du Centre d'Échographie de la Femme OPÉRA à Lyon, dédiée au suivi gynécologique, obstétrical et échographique des patientes, avec Dr Alexandra Soldea.",
  alternates: { canonical: canonicalUrl("/equipe") },
};

/**
 * Équipe — the clinic's medical team page. The centre is presented as a
 * team-led practice (clinic branding) while Dr Alexandra Soldea stays the
 * named, verifiable practitioner. No fictional doctors are invented: future
 * members are shown as neutral "à venir" placeholders so the layout already
 * reads as a centre that can grow.
 */
export default function EquipePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", path: "/" },
              { name: "Équipe", path: "/equipe" },
            ]),
          ),
        }}
      />
      <Header />
      <TeamGrid />
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
        className="absolute -top-32 right-1/4 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.18), transparent 70%)",
        }}
      />
      <div className="container-page relative pt-24 pb-16 md:pt-32 md:pb-20 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur ring-1 ring-accent/40 px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary-deep shadow-[0_10px_30px_-18px_rgba(122,38,61,0.5)]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Centre d&apos;Échographie de la Femme OPÉRA
        </div>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.01em] text-ink text-balance">
          L&apos;équipe <span className="italic text-primary-deep">médicale</span>
        </h1>
        <p className="mt-6 text-lg text-ink-soft text-pretty">
          Le Centre d&apos;Échographie de la Femme OPÉRA réunit une équipe
          médicale dédiée au suivi gynécologique, obstétrical et échographique
          des patientes, au cœur de Lyon.
        </p>
      </div>
    </section>
  );
}

function TeamGrid() {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-line">
      <div className="container-page">
        <OperaDivider className="mb-12 md:mb-16" />
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
          <DoctorCard />
          <PlaceholderCard index={2} />
          <PlaceholderCard index={3} />
        </div>
      </div>
    </section>
  );
}

function DoctorCard() {
  return (
    <article className="card-gold-top group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-ink-deep text-white ring-1 ring-accent/30 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_55px_100px_-40px_rgba(0,0,0,0.8)] hover:ring-accent/55">
      <OrnateCorners />
      <div className="relative aspect-[4/5] overflow-hidden bg-ink">
        <Image
          src="/alexandra.webp"
          alt="Dr. Alexandra Soldea — gynécologue obstétricienne au Centre d'Échographie de la Femme OPÉRA à Lyon"
          width={567}
          height={600}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover object-center"
        />
        {/* Soft gradient so the navy card and the portrait meet seamlessly. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-deep to-transparent"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="text-[11px] tracking-[0.28em] uppercase text-accent font-medium">
          Fondatrice du centre
        </p>
        <h2 className="mt-2 font-display text-2xl text-white leading-snug">
          Dr Alexandra Soldea
        </h2>
        <p className="mt-1 text-sm font-medium text-white/70">
          Gynécologue obstétricienne
        </p>
        <p className="mt-3 text-sm text-white/70 leading-relaxed text-pretty">
          Échographie gynécologique et obstétricale. Échographiste agréée du
          réseau de périnatalité Aurore et titulaire du DIU d&apos;échographie
          gynécologique et obstétricale (Paris Descartes).
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Gynécologie", "Obstétrique", "Échographie", "Réseau Aurore"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.06] ring-1 ring-accent/30 px-3 py-1 text-xs text-white/80"
              >
                {tag}
              </span>
            ),
          )}
        </div>
        <Link
          href="/presentation"
          className="group/link mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          <span className="border-b border-accent/40 pb-px group-hover/link:border-accent transition-colors">
            Voir le parcours complet
          </span>
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1"
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
        </Link>
      </div>
    </article>
  );
}

function PlaceholderCard({ index }: { index: number }) {
  return (
    <article className="relative flex flex-col rounded-[1.5rem] bg-ink-deep/95 text-white ring-1 ring-accent/20 p-6 md:p-7 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.6)]">
      <OrnateCorners />
      <div className="flex aspect-[4/5] items-center justify-center rounded-[1.1rem] bg-white/[0.03] ring-1 ring-accent/15">
        <span className="relative grid h-16 w-16 place-content-center rounded-full bg-white/[0.05] text-accent ring-1 ring-accent/40 shadow-[0_14px_30px_-18px_rgba(0,0,0,0.6)]">
          <span aria-hidden className="absolute inset-1.5 rounded-full ring-1 ring-accent/25" />
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
            <circle cx="12" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M5 19.5a7 7 0 0 1 14 0"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
      <p className="mt-6 text-[11px] tracking-[0.28em] uppercase text-accent font-medium">
        Praticien·ne {String(index).padStart(2, "0")}
      </p>
      <h2 className="mt-2 font-display text-xl text-white/90 leading-snug">
        Médecin à venir
      </h2>
      <p className="mt-3 text-sm text-white/55 leading-relaxed text-pretty">
        Le Centre d&apos;Échographie de la Femme OPÉRA s&apos;agrandit et
        accueillera prochainement de nouveaux praticiens dédiés à
        l&apos;échographie de la femme à Lyon.
      </p>
    </article>
  );
}

function Cta() {
  return (
    <section className="container-page py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink-deep text-white p-12 md:p-16 ring-1 ring-accent/25 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <span aria-hidden className="absolute inset-x-10 top-0 h-px gold-rule" />
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span aria-hidden className="gold-tick" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-accent font-medium">
              Prendre rendez-vous
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl leading-tight text-balance">
            Un suivi assuré par une équipe dédiée.
          </h2>
          <p className="mt-3 text-white/75 max-w-md text-pretty">
            Réservez votre consultation ou votre échographie en ligne, au cœur
            de Lyon.
          </p>
        </div>
        <div className="flex flex-col md:items-end gap-3">
          <Link
            href="/services"
            className="shine inline-flex items-center justify-center h-12 px-7 rounded-full bg-gradient-to-b from-[#dab85f] to-accent text-ink-deep text-sm font-semibold ring-1 ring-accent/60 shadow-[0_18px_40px_-18px_rgba(201,162,74,0.7)] hover:from-[#e3c479] hover:to-[#cfa850] transition-colors"
          >
            Voir les services
          </Link>
          <Link href="/contact" className="text-sm text-white/80 hover:text-white">
            Nous contacter →
          </Link>
        </div>
      </div>
    </section>
  );
}
