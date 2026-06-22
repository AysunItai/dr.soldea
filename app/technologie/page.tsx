import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OrnateCorners } from "@/app/_components/OperaMotifs";
import { CLINIC_GALLERY_PHOTOS, CLINIC_NAME } from "@/lib/clinic";
import {
  EQUIPMENT_FEATURES,
  EQUIPMENT_INTRO,
  ULTRASOUND_SYSTEM,
} from "@/lib/equipment";
import { breadcrumbJsonLd, canonicalUrl } from "@/lib/seo";

const examRoom = CLINIC_GALLERY_PHOTOS[1];

export const metadata: Metadata = {
  title: "Technologie & équipement d'échographie à Lyon",
  description:
    "Échographe Samsung V8 au Centre d'Échographie de la Femme OPÉRA à Lyon : technologie d'imagerie pour les examens gynécologiques et obstétricaux, dans un cadre médical professionnel.",
  alternates: { canonical: canonicalUrl("/technologie") },
  openGraph: {
    title: "Technologie & équipement — Centre d'Échographie OPÉRA Lyon",
    description:
      "Découvrez l'équipement d'échographie du centre : échographe Samsung V8 pour le suivi gynécologique et obstétrical à Lyon.",
    images: [
      {
        url: examRoom.src,
        width: examRoom.width,
        height: examRoom.height,
        alt: examRoom.alt,
      },
    ],
  },
};

export default function TechnologiePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", path: "/" },
              { name: "Technologie & équipement", path: "/technologie" },
            ]),
          ),
        }}
      />
      <Hero />
      <Intro />
      <FeatureGrid />
      <ExamRoomVisual />
      <BookCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft opacity-50" />
      <div
        aria-hidden
        className="absolute -top-32 right-1/4 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.16), transparent 70%)",
        }}
      />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px gold-rule" />

      <div className="container-page relative pt-24 pb-16 md:pt-32 md:pb-20 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur ring-1 ring-accent/40 px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary-deep shadow-[0_10px_30px_-18px_rgba(122,38,61,0.5)]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {EQUIPMENT_INTRO.eyebrow}
        </div>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.01em] text-ink text-balance">
          {EQUIPMENT_INTRO.title}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-ink-soft text-pretty leading-relaxed">
          {EQUIPMENT_INTRO.paragraphs[0]}
        </p>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section
      aria-labelledby="equipment-intro-heading"
      className="bg-white py-16 md:py-20 border-t border-line"
    >
      <div className="container-page grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div className="card-gold-top relative rounded-[1.5rem] bg-gradient-to-b from-ink-deep to-ink text-white ring-1 ring-accent/30 p-8 md:p-10 shadow-[0_30px_70px_-40px_rgba(11,31,58,0.35)]">
          <OrnateCorners />
          <p className="text-[11px] tracking-[0.28em] uppercase text-accent font-medium">
            Plateforme d&apos;imagerie
          </p>
          <p className="mt-4 font-display text-3xl md:text-4xl text-white leading-tight">
            Échographe {ULTRASOUND_SYSTEM}
          </p>
          <p className="mt-4 text-sm text-white/70 leading-relaxed text-pretty">
            Système dédié aux examens gynécologiques et obstétricaux réalisés au
            centre, selon les indications médicales de chaque patiente.
          </p>
          <p className="mt-6 text-xs text-white/50 leading-relaxed">
            L&apos;interprétation des images et des mesures relève toujours du
            médecin ou de l&apos;échographiste en charge de l&apos;examen.
          </p>
        </div>

        <div>
          <h2 id="equipment-intro-heading" className="sr-only">
            Présentation de l&apos;équipement
          </h2>
          <div className="space-y-5 text-lg text-ink-soft leading-relaxed text-pretty">
            {EQUIPMENT_INTRO.paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section
      aria-labelledby="equipment-features-heading"
      className="relative bg-cream py-20 md:py-28 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(143,61,86,0.08), transparent 70%)",
        }}
      />

      <div className="container-page relative">
        <div className="max-w-2xl mb-12 md:mb-14">
          <h2
            id="equipment-features-heading"
            className="text-[11px] tracking-[0.34em] uppercase text-accent-deep font-medium"
          >
            Au service du suivi médical
          </h2>
          <p className="mt-4 font-display text-3xl md:text-4xl text-ink leading-[1.08] text-balance">
            Un équipement au service de chaque examen
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {EQUIPMENT_FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="royal-panel rounded-[1.25rem] bg-gradient-to-b from-white to-champagne/75 ring-1 ring-accent/30 p-7 shadow-[0_20px_50px_-28px_rgba(11,31,58,0.12)]"
            >
              <span
                aria-hidden
                className="inline-block h-1 w-8 bg-gradient-to-r from-accent/70 to-accent/20 mb-5"
              />
              <h3 className="font-display text-xl text-ink leading-snug text-balance">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed text-pretty">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ExamRoomVisual() {
  return (
    <section className="bg-white py-20 md:py-24 border-t border-line">
      <div className="container-page grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <figure className="card-gold-top relative overflow-hidden rounded-[1.5rem] ring-1 ring-accent/35 shadow-[0_28px_70px_-32px_rgba(11,31,58,0.14)]">
          <OrnateCorners />
          <div className="relative aspect-[3/4] max-h-[520px] overflow-hidden">
            <Image
              src={examRoom.src}
              alt={examRoom.alt}
              width={examRoom.width}
              height={examRoom.height}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <figcaption className="p-6 md:p-7 border-t border-accent/15">
            <p className="text-[11px] tracking-[0.28em] uppercase text-accent-deep font-medium">
              {examRoom.caption}
            </p>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed text-pretty">
              {examRoom.description}
            </p>
          </figcaption>
        </figure>

        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent-deep font-medium mb-4">
            Cadre d&apos;examen
          </p>
          <p className="font-display text-3xl md:text-4xl text-ink leading-[1.06] text-balance">
            Technologie et environnement de soin
          </p>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed text-pretty">
            L&apos;échographe s&apos;inscrit dans une salle d&apos;examen
            conçue pour la confidentialité et le confort des patientes. Chaque
            consultation d&apos;échographie gynécologique ou obstétricale est
            réalisée dans ce cadre, au {CLINIC_NAME}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/galerie"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white text-sm font-medium text-ink ring-1 ring-line hover:ring-accent/40 transition-colors"
            >
              Visite du centre
            </Link>
            <Link
              href="/services/echographie-obstetricale"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-ink text-white text-sm font-medium hover:bg-ink-deep transition-colors"
            >
              Nos échographies
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookCTA() {
  return (
    <section className="container-page py-20 md:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink-deep text-white p-12 md:p-16 ring-1 ring-accent/25">
        <span aria-hidden className="absolute inset-x-10 top-0 h-px gold-rule" />
        <OrnateCorners />
        <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-accent font-medium">
              Prendre rendez-vous
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl leading-[1.05] text-balance">
              Réserver votre échographie à Lyon
            </h2>
            <p className="mt-4 text-white/75 text-lg max-w-lg text-pretty">
              Consultations gynécologiques et obstétricales sur rendez-vous au{" "}
              {CLINIC_NAME}.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link
              href="/services"
              className="shine inline-flex items-center justify-center h-12 px-7 rounded-full bg-gradient-to-b from-[#dab85f] to-accent text-ink-deep text-sm font-semibold ring-1 ring-accent/60 hover:from-[#e3c479] hover:to-[#cfa850] transition-colors"
            >
              Prendre rendez-vous
            </Link>
            <Link
              href="/contact"
              className="text-sm text-white/80 hover:text-white"
            >
              Nous contacter →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
