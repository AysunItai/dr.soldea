import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClinicAccessMaps } from "@/app/_components/ClinicAccessMaps";
import { OperaDivider, OrnateCorners } from "@/app/_components/OperaMotifs";
import {
  CLINIC_ADDRESS,
  CLINIC_GALLERY_PHOTOS,
  CLINIC_NAME,
  CLINIC_QUARTER,
} from "@/lib/clinic";
import { breadcrumbJsonLd, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Galerie photo du centre d'échographie OPÉRA à Lyon",
  description:
    "Découvrez le Centre d'Échographie de la Femme OPÉRA à Lyon : espace d'accueil, salle d'échographie et accès au centre. Échographie gynécologique et obstétricale avec Dr Alexandra Soldea.",
  alternates: { canonical: canonicalUrl("/galerie") },
  openGraph: {
    title: "Galerie photo du centre d'échographie OPÉRA à Lyon",
    description:
      "Visitez le Centre d'Échographie de la Femme OPÉRA à Lyon : espace d'accueil, salle d'échographie et accès au centre.",
    images: [
      {
        url: "/clinic1.jpeg",
        width: 1170,
        height: 754,
        alt: "Espace d'accueil du Centre d'Échographie de la Femme OPÉRA à Lyon",
      },
    ],
  },
};

export default function GaleriePage() {
  const [reception, examRoom] = CLINIC_GALLERY_PHOTOS;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", path: "/" },
              { name: "Galerie", path: "/galerie" },
            ]),
          ),
        }}
      />
      <Hero />
      <Intro />
      <PhotoGallery reception={reception} examRoom={examRoom} />
      <AccessSection />
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
            "radial-gradient(closest-side, rgba(201,162,74,0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 -left-40 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(143,61,86,0.08), transparent 70%)",
        }}
      />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px gold-rule" />

      <div className="container-page relative pt-24 pb-16 md:pt-32 md:pb-20 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur ring-1 ring-accent/40 px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary-deep shadow-[0_10px_30px_-18px_rgba(122,38,61,0.5)]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Le centre
        </div>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.01em] text-ink text-balance">
          Visite du{" "}
          <span className="italic text-primary-deep">centre</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-ink-soft text-pretty leading-relaxed">
          Découvrez le {CLINIC_NAME}, un lieu médical au cœur de Lyon pensé pour
          accueillir les patientes dans un cadre calme, confidentiel et
          professionnel.
        </p>
        <OperaDivider className="mt-8" />
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="bg-white py-16 md:py-20 border-t border-line"
    >
      <div className="container-page grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
        <div>
          <h2
            id="intro-heading"
            className="text-[11px] tracking-[0.3em] uppercase text-accent-deep font-medium mb-4"
          >
            Bienvenue au centre
          </h2>
          <p className="font-display text-3xl md:text-4xl text-ink leading-[1.06] text-balance">
            Un environnement{" "}
            <span className="italic text-primary-deep">rassurant</span> et
            soigné.
          </p>
        </div>
        <p className="text-lg text-ink-soft leading-relaxed text-pretty">
          Le centre a été pensé pour offrir aux patientes un cadre calme,
          confidentiel et attentif. Chaque espace contribue à une prise en charge
          médicale rigoureuse, dans une atmosphère apaisante.
        </p>
      </div>
    </section>
  );
}

function PhotoGallery({
  reception,
  examRoom,
}: {
  reception: (typeof CLINIC_GALLERY_PHOTOS)[number];
  examRoom: (typeof CLINIC_GALLERY_PHOTOS)[number];
}) {
  return (
    <section
      aria-labelledby="gallery-heading"
      className="relative bg-cream py-20 md:py-28 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.12), transparent 70%)",
        }}
      />

      <div className="container-page relative">
        <div className="max-w-2xl mb-12 md:mb-16">
          <h2
            id="gallery-heading"
            className="text-[11px] tracking-[0.34em] uppercase text-accent-deep font-medium"
          >
            Espaces du centre
          </h2>
          <p className="mt-4 font-display text-3xl md:text-4xl text-ink leading-[1.08] text-balance">
            Visite du {CLINIC_NAME}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <GalleryCard
            photo={reception}
            className="lg:col-span-8"
            aspectClass="aspect-[1170/754]"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
          <GalleryCard
            photo={examRoom}
            className="lg:col-span-4 lg:mt-12"
            aspectClass="aspect-[3/4]"
            sizes="(min-width: 1024px) 28vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  photo,
  className,
  aspectClass,
  sizes,
}: {
  photo: (typeof CLINIC_GALLERY_PHOTOS)[number];
  className?: string;
  aspectClass: string;
  sizes: string;
}) {
  return (
    <figure
      className={`card-gold-top group relative overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-white to-champagne/80 ring-1 ring-accent/35 shadow-[0_28px_70px_-32px_rgba(11,31,58,0.18)] transition-shadow duration-500 hover:shadow-[0_40px_90px_-28px_rgba(201,162,74,0.22)] hover:ring-accent/50 ${className ?? ""}`}
    >
      <OrnateCorners />
      <div className={`relative overflow-hidden ${aspectClass}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          priority={photo.priority}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-deep/35 to-transparent"
        />
      </div>
      <figcaption className="p-6 md:p-7">
        <p className="text-[11px] tracking-[0.28em] uppercase text-accent-deep font-medium">
          {photo.caption}
        </p>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed text-pretty">
          {photo.description}
        </p>
      </figcaption>
    </figure>
  );
}

function AccessSection() {
  return (
    <section
      aria-labelledby="access-heading"
      className="bg-white py-20 md:py-24 border-t border-line"
    >
      <div className="container-page">
        <div className="max-w-2xl mb-10 md:mb-12">
          <h2
            id="access-heading"
            className="text-[11px] tracking-[0.3em] uppercase text-accent-deep font-medium mb-4"
          >
            Accès au centre
          </h2>
          <p className="font-display text-3xl md:text-4xl text-ink leading-[1.06] text-balance">
            Au cœur de Lyon, quartier{" "}
            <span className="italic text-primary-deep">Opéra</span>.
          </p>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed text-pretty">
            Le centre est situé au {CLINIC_ADDRESS}, dans le quartier Opéra
            ({CLINIC_QUARTER}). Accès facile en métro (Cordeliers, Hôtel de
            Ville) et à proximité des parkings publics.
          </p>
        </div>

        <ClinicAccessMaps />

        <p className="mt-8 text-center text-sm text-muted">
          Besoin d&apos;informations avant votre venue ?{" "}
          <Link
            href="/contact"
            className="text-primary-deep hover:text-ink transition-colors"
          >
            Contactez le centre
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function BookCTA() {
  return (
    <section className="container-page py-20 md:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink-deep text-white p-12 md:p-16 ring-1 ring-accent/25 reveal">
        <span aria-hidden className="absolute inset-x-10 top-0 h-px gold-rule" />
        <OrnateCorners />
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(201,162,74,0.32), transparent 70%)",
          }}
        />
        <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span aria-hidden className="gold-tick" />
              <span className="text-[11px] tracking-[0.32em] uppercase text-accent font-medium">
                Prendre rendez-vous
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-balance">
              Prendre rendez-vous au centre
            </h2>
            <p className="mt-5 text-white/75 text-lg max-w-lg text-pretty">
              Choisissez votre consultation et accédez à la prise de rendez-vous
              en ligne du {CLINIC_NAME}.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link
              href="/services"
              className="shine inline-flex items-center justify-center h-12 px-7 rounded-full bg-gradient-to-b from-[#dab85f] to-accent text-ink-deep text-sm font-semibold ring-1 ring-accent/60 shadow-[0_18px_40px_-18px_rgba(201,162,74,0.7)] hover:from-[#e3c479] hover:to-[#cfa850] transition-colors"
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
