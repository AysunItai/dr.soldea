import Image from "next/image";
import Link from "next/link";
import { Section } from "@/app/_components/Section";
import { ServiceCard } from "@/app/_components/ServiceCard";
import { ServiceIcon } from "@/app/_components/ServiceIcon";
import {
  OperaArch,
  OrnateCorners,
} from "@/app/_components/OperaMotifs";
import {
  NAV_SERVICES,
  PREGNANCY_ULTRASOUND_EXAMS,
  getObstetricTrimesters,
  type Service,
} from "@/lib/services";
import { CLINIC_GALLERY_PHOTOS } from "@/lib/clinic";
import { EQUIPMENT_INTRO } from "@/lib/equipment";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PregnancyExamsSection />
      <ServicesSection />
      <UltrasoundFocus />
      <TechnologyTeaser />
      <TeamTeaser />
      <ClinicGalleryTeaser />
      <ContactCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="hero-above-fold relative overflow-hidden pb-28 md:pb-36 bg-ink-deep text-white">
      {/* Consultation-room photo — editorial ken-burns behind a navy wash. */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <Image
          src="/hero1.webp"
          alt=""
          fill
          sizes="100vw"
          quality={65}
          fetchPriority="low"
          className="animate-ken-burns object-cover object-[62%_42%] opacity-[0.42] sm:opacity-[0.5] lg:opacity-[0.58]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(6,21,43,0.84) 0%, rgba(7,26,51,0.74) 42%, rgba(7,26,51,0.55) 100%), linear-gradient(168deg, rgba(10,34,64,0.32) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* Warm gold light, upper-right. */}
      <div
        aria-hidden
        className="absolute -top-44 -right-40 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.22), transparent 72%)",
        }}
      />
      {/* Burgundy glow, lower-left. */}
      <div
        aria-hidden
        className="absolute top-1/3 -left-44 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(163,76,99,0.16), transparent 72%)",
        }}
      />
      {/* Gold wash behind the medallion column. */}
      <div
        aria-hidden
        className="absolute right-0 top-0 h-full w-1/2 hidden lg:block"
        style={{
          background:
            "radial-gradient(60% 55% at 70% 42%, rgba(212,175,55,0.16), transparent 70%)",
        }}
      />
      {/* Hairline gold rule pinned to the very top of the page. */}
      <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-px gold-rule" />

      <div className="container-page relative z-10 pt-20 md:pt-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <HeroCopy />
        <HeroMedallion />
      </div>

      {/* Soft fade into the cream section below. */}
      <div
        aria-hidden
        className="hero-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 md:h-40"
      />
    </section>
  );
}

function HeroCopy() {
  return (
    <div className="relative lg:pt-8">
      {/* Editorial index marker — a thin vertical accent on the left. */}
      <div className="absolute -left-3 top-2 hidden lg:flex flex-col items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/45">
        <span>01</span>
        <span aria-hidden className="h-16 w-px bg-accent/40" />
        <span className="[writing-mode:vertical-rl] rotate-180">
          Accueil
        </span>
      </div>

      <div className="animate-rise inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur ring-1 ring-accent/40 px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Au cœur de Lyon · La Presqu&apos;île
      </div>

      <h1 className="hero-lcp-headline animate-rise animate-rise-delay-1 mt-6 sm:mt-7 font-display text-[clamp(2.25rem,6.5vw,4.5rem)] leading-[0.98] tracking-[-0.015em] text-white text-balance">
        Centre d&apos;Échographie
        <br />
        de la Femme{" "}
        <span className="italic text-accent">OPÉRA</span>
      </h1>
      <p className="animate-rise animate-rise-delay-2 mt-4 text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.32em] uppercase text-accent font-medium">
        Échographie gynécologique &amp; obstétricale · Lyon
      </p>

      <p className="animate-rise animate-rise-delay-3 mt-7 sm:mt-9 max-w-lg text-base sm:text-lg leading-relaxed text-white/75 text-pretty">
        Échographies gynécologiques et obstétricales au cœur de Lyon, réalisées
        par notre équipe médicale. Consultations sur rendez-vous — suivi de
        grossesse, échographies T1, T2, T3 et examens gynécologiques.
      </p>

      <div className="animate-rise animate-rise-delay-4 mt-8 sm:mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
        <Link
          href="/services"
          className="shine group inline-flex items-center justify-center h-12 pl-6 sm:pl-7 pr-3 rounded-full bg-gradient-to-b from-[#dab85f] to-accent text-ink-deep text-sm font-semibold ring-1 ring-accent/60 shadow-[0_18px_40px_-18px_rgba(201,162,74,0.7)] hover:from-[#e3c479] hover:to-[#cfa850] transition-colors"
        >
          <span>Prendre rendez-vous</span>
          <span
            aria-hidden
            className="ml-3 grid place-content-center h-8 w-8 rounded-full bg-ink-deep text-accent transition-transform group-hover:translate-x-0.5"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
              <path
                d="M3 8h10m0 0L9 4m4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
        <Link
          href="/equipe"
          className="inline-flex items-center gap-2 h-12 px-1 sm:px-2 text-sm font-medium text-white hover:text-accent transition-colors"
        >
          Découvrir l&apos;équipe médicale
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
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

      <dl className="animate-rise animate-rise-delay-4 mt-12 sm:mt-14 grid grid-cols-3 gap-3 sm:gap-6 max-w-md">
        {[
          { k: "T1 · T2 · T3", v: "Échographies de dépistage" },
          { k: "Aurore", v: "Réseau de périnatalité" },
          { k: "En ligne", v: "Prise de rendez-vous" },
        ].map((s) => (
          <div key={s.v} className="border-t border-accent/30 pt-3 sm:pt-4">
            <dt className="font-display text-lg sm:text-2xl text-white leading-none">
              {s.k}
            </dt>
            <dd className="text-[11px] sm:text-xs text-white/55 mt-1 leading-tight">
              {s.v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function HeroMedallion() {
  return (
    <div className="hero-lcp-gallery relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none flex justify-center">
      {/* Soft gold halo behind the medallion. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.24), transparent 72%)",
        }}
      />

      <figure className="relative flex justify-center">
        {/* Engraved Belle-Époque arch framing the medallion like an alcove. */}
        <OperaArch className="absolute left-1/2 bottom-[-7%] -translate-x-1/2 w-[clamp(17rem,66vw,28rem)] -z-10" />
        {/*
         * The circular gold medallion logo is the homepage centrepiece. It is
         * matted on a champagne disc with a double gold rim and a soft
         * burgundy-tinted shadow so it feels framed and intentional rather
         * than pasted on. On desktop it becomes the LCP element, so it is
         * preloaded with a high fetch priority; next/image serves an
         * optimised AVIF/WebP at the displayed size.
         */}
        <div className="relative rounded-full bg-gradient-to-b from-white via-[#fbf3e3] to-champagne p-4 sm:p-5 ring-2 ring-accent/55 shadow-[0_60px_120px_-40px_rgba(201,162,74,0.35),0_28px_60px_-30px_rgba(7,26,51,0.35)]">
          <span
            aria-hidden
            className="absolute inset-[0.6rem] rounded-full ring-1 ring-accent/30"
          />
          <Image
            src="/logo.png"
            alt="Logo du Centre d'Échographie de la Femme OPÉRA"
            width={1254}
            height={1254}
            preload
            fetchPriority="high"
            sizes="(min-width: 1024px) 30vw, 70vw"
            className="relative w-[clamp(14rem,55vw,23rem)] h-auto rounded-full"
          />
        </div>

        {/* Location caption — anchors the brand to its address. */}
        <figcaption className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 ring-1 ring-accent/40 shadow-[0_18px_40px_-20px_rgba(7,26,51,0.6)] whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          <span className="text-[11px] tracking-[0.18em] uppercase text-cream">
            Lyon 1ᵉʳ · La Presqu&apos;île
          </span>
        </figcaption>

        {/* Réseau Aurore credential pill — gentle floating accent. */}
        <div className="absolute -right-2 md:-right-6 top-6 z-20 hidden md:flex flex-col items-start gap-1 rounded-2xl bg-ink px-4 py-3 ring-1 ring-accent/40 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.5)] max-w-[200px] animate-float">
          <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">
            Réseau Aurore
          </span>
          <span className="font-display text-base text-white leading-snug">
            Équipe agréée
          </span>
          <span className="text-[11px] text-white/55">
            Dépistage prénatal · T1 / T2 / T3
          </span>
        </div>
      </figure>
    </div>
  );
}

function PregnancyExamsSection() {
  return (
    <section
      aria-labelledby="pregnancy-exams-heading"
      className="relative overflow-hidden bg-cream text-ink -mt-16 md:-mt-20 pt-24 md:pt-28 pb-16 md:pb-20"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px gold-rule" />
      <div
        aria-hidden
        className="absolute -top-20 right-0 h-[320px] w-[320px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.14), transparent 70%)",
        }}
      />

      <div className="container-page relative">
        <div className="max-w-3xl">
          <h2
            id="pregnancy-exams-heading"
            className="text-[11px] tracking-[0.34em] uppercase text-accent-deep font-medium"
          >
            Échographies de grossesse
          </h2>
          <p className="mt-4 font-display text-3xl md:text-4xl text-ink leading-[1.08] text-balance">
            Nos examens d&apos;échographie de grossesse
          </p>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed text-pretty max-w-2xl">
            Au Centre d&apos;Échographie de la Femme OPÉRA, notre équipe réalise
            l&apos;ensemble des examens du suivi prénatal — du dépistage du 1er
            trimestre à la surveillance des grossesses à risque.
          </p>
        </div>

        <ul className="mt-10 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 reveal-stagger">
          {PREGNANCY_ULTRASOUND_EXAMS.map((exam) => (
            <li key={exam.title}>
              <Link
                href={exam.href}
                className="group flex h-full items-start gap-3 rounded-2xl bg-gradient-to-b from-white to-champagne/70 px-5 py-4 ring-1 ring-accent/25 shadow-[0_16px_40px_-28px_rgba(11,31,58,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:ring-accent/45 hover:shadow-[0_24px_50px_-24px_rgba(201,162,74,0.18)]"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span className="text-sm text-ink leading-snug group-hover:text-primary-deep transition-colors">
                  {exam.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/services/echographie-obstetricale"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-deep hover:gap-3 transition-all"
          >
            Tout sur l&apos;échographie obstétricale
            <span aria-hidden>→</span>
          </Link>
          <span aria-hidden className="hidden sm:inline h-4 w-px bg-line" />
          <Link
            href="/services"
            className="text-sm text-ink-soft hover:text-ink transition-colors"
          >
            Voir tous les services
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = NAV_SERVICES;
  const lastIndex = services.length - 1;

  return (
    <Section
      className="bg-cream pt-8 md:pt-12"
      eyebrow="Services"
      title={
        <>
          Choisissez votre <span className="italic text-primary-deep">consultation</span>
        </>
      }
      description="Consultations et examens d'imagerie réalisés sur rendez-vous, dans un cadre d'exception au cœur de Lyon."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
        {services.map((service, index) => (
          <div
            key={service.slug}
            className={
              index === lastIndex
                ? "sm:col-span-2 sm:max-w-md sm:mx-auto lg:col-span-1 lg:col-start-2 lg:max-w-none"
                : undefined
            }
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-deep hover:gap-3 transition-all"
        >
          Voir tous les services
          <span aria-hidden>→</span>
        </Link>
      </div>
    </Section>
  );
}

function UltrasoundFocus() {
  const trimesters = getObstetricTrimesters();

  return (
    <section
      id="echographies-obstetricales"
      aria-labelledby="echographies-heading"
      className="relative bg-cream py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative ambient glow — purely visual */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(143,61,86,0.10), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.16), transparent 70%)",
        }}
      />

      <div className="container-page relative">
        {/* Editorial header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-line px-4 py-1.5 text-[11px] tracking-[0.22em] uppercase text-primary-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            Échographies prénatales · Réseau Aurore
          </div>

          <h2
            id="echographies-heading"
            className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.02] tracking-[-0.01em] text-balance"
          >
            Échographies obstétricales{" "}
            <span className="italic text-primary-deep">à Lyon</span>.
          </h2>

          <p className="mt-6 text-lg md:text-xl text-ink-soft leading-relaxed text-pretty max-w-2xl">
            Au Centre d&apos;Échographie de la Femme OPÉRA, notre équipe
            d&apos;échographistes agréés du réseau de périnatalité{" "}
            <strong className="font-medium text-ink">Aurore</strong> réalise les
            trois échographies obligatoires du suivi de grossesse :
            l&apos;échographie du 1<sup>er</sup> trimestre (clarté nucale),
            l&apos;échographie morphologique du 2<sup>e</sup> trimestre et
            l&apos;échographie du 3<sup>e</sup> trimestre — au cœur de Lyon.
          </p>
        </div>

        {/* Trimester cards — three full-width SEO landing entry points */}
        <ol className="mt-14 md:mt-16 grid gap-6 md:grid-cols-3 reveal-stagger">
          {trimesters.map((t, i) => (
            <TrimesterCard key={t.slug} service={t} index={i} />
          ))}
        </ol>

        {/* Reassurance band — also a small SEO win (extra keyword density) */}
        <div className="card-gold-top relative mt-14 md:mt-16 rounded-3xl bg-ink-deep text-white ring-1 ring-accent/25 p-6 md:p-8 grid gap-6 lg:grid-cols-[1fr_auto] items-center shadow-[0_40px_90px_-45px_rgba(0,0,0,0.75)]">
          <OrnateCorners />
          <ul className="grid sm:grid-cols-3 gap-x-6 gap-y-3 text-sm text-white/75">
            {[
              "Équipe agréée Réseau Aurore",
              "Imagerie 2D · 3D · 4D possible (T3)",
              "Compte-rendu remis en main propre",
              "Centre au cœur de Lyon (1ᵉʳ)",
              "Voies abdominale & endo-vaginale",
              "Examens indolores et sécurisés",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="flex lg:justify-end">
            <Link
              href="/services/echographie-obstetricale"
              className="shine group inline-flex w-full sm:w-auto shrink-0 items-center justify-center h-12 pl-6 pr-3 rounded-full bg-gradient-to-b from-[#dab85f] to-accent text-ink-deep text-sm font-semibold ring-1 ring-accent/60 hover:from-[#e3c479] hover:to-[#cfa850] transition-colors whitespace-nowrap"
            >
              Tout savoir sur l&apos;échographie obstétricale
              <span
                aria-hidden
                className="ml-3 grid place-content-center h-8 w-8 rounded-full bg-ink-deep text-accent transition-transform group-hover:translate-x-0.5"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                  <path
                    d="M3 8h10m0 0L9 4m4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Editorial card for a single trimester ultrasound. The whole card is one
 * link — large click target — and the heading uses the full SEO title so
 * search engines pick up "Échographie du 1er trimestre (Écho T1) à Lyon".
 */
function TrimesterCard({ service, index }: { service: Service; index: number }) {
  return (
    <li>
      <Link
        href={`/services/${service.slug}`}
        className="card-gold-top group relative block h-full rounded-[1.5rem] bg-gradient-to-b from-white via-[#fbf7f0] to-champagne text-ink ring-1 ring-accent/35 p-7 md:p-8 shadow-[0_24px_60px_-32px_rgba(11,31,58,0.14)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-28px_rgba(201,162,74,0.22)] hover:ring-accent/60"
      >
        <OrnateCorners />
        <div className="flex items-start justify-between">
          <span className="font-display text-[3.5rem] md:text-[4rem] leading-none text-accent">
            <span className="opacity-35">0</span>
            {index + 1}
          </span>
          <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink-deep text-accent ring-1 ring-accent/45 shadow-[0_12px_28px_-16px_rgba(7,26,51,0.45)]">
            <ServiceIcon name={service.icon} className="h-5 w-5" />
          </span>
        </div>

        <p className="mt-6 text-[11px] tracking-[0.22em] uppercase text-accent-deep font-medium">
          {service.shortLabel} · {service.weeks}
        </p>

        <h3 className="mt-2 font-display text-2xl md:text-[26px] text-ink leading-snug text-balance">
          Échographie du{" "}
          {service.shortLabel === "T1"
            ? "1er"
            : service.shortLabel === "T2"
              ? "2e"
              : "3e"}{" "}
          trimestre
          <span className="text-muted font-normal text-base"> (Écho {service.shortLabel})</span>
        </h3>

        <p className="mt-3 text-sm text-ink-soft leading-relaxed text-pretty">
          {service.tagline}
        </p>

        <div className="mt-6 pt-5 border-t border-accent/20 flex items-center justify-between">
          <span className="text-xs text-muted">{service.durationLabel}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-deep group-hover:text-primary transition-colors">
            Découvrir l&apos;écho {service.shortLabel}
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
        </div>
      </Link>
    </li>
  );
}

function TechnologyTeaser() {
  const examRoom = CLINIC_GALLERY_PHOTOS[1];

  return (
    <section
      aria-labelledby="technology-teaser-heading"
      className="relative bg-white py-20 md:py-28 overflow-hidden border-t border-line"
    >
      <div
        aria-hidden
        className="absolute top-1/2 -right-32 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.1), transparent 70%)",
        }}
      />

      <div className="container-page relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h2
            id="technology-teaser-heading"
            className="text-[11px] tracking-[0.34em] uppercase text-accent-deep font-medium"
          >
            {EQUIPMENT_INTRO.eyebrow}
          </h2>
          <p className="mt-4 font-display text-3xl md:text-4xl text-ink leading-[1.06] text-balance">
            {EQUIPMENT_INTRO.title}
          </p>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed text-pretty">
            {EQUIPMENT_INTRO.teaser}
          </p>
          <Link
            href="/technologie"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary-deep"
          >
            <span className="border-b border-primary-deep/30 pb-px group-hover:border-primary-deep transition-colors">
              Découvrir notre équipement
            </span>
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
          </Link>
        </div>

        <Link
          href="/technologie"
          className="card-gold-top group relative order-1 lg:order-2 overflow-hidden rounded-[1.5rem] ring-1 ring-accent/35 shadow-[0_28px_70px_-32px_rgba(11,31,58,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-28px_rgba(201,162,74,0.18)] hover:ring-accent/50"
        >
          <OrnateCorners />
          <div className="relative aspect-[3/4] max-h-[420px] overflow-hidden">
            <Image
              src={examRoom.src}
              alt={examRoom.alt}
              width={examRoom.width}
              height={examRoom.height}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-deep/45 to-transparent"
            />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink-deep/90 px-4 py-1.5 text-[11px] tracking-[0.18em] uppercase text-accent ring-1 ring-accent/40">
              Salle d&apos;échographie
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function TeamTeaser() {
  const trustPoints = [
    {
      title: "Réseau Aurore",
      desc: "Échographistes agréés pour le dépistage prénatal (clarté nucale, T1 / T2 / T3).",
    },
    {
      title: "Équipe pluridisciplinaire",
      desc: "Gynécologues et échographistes au service des patientes du centre.",
    },
    {
      title: "Prise en charge sur mesure",
      desc: "Examens de routine, diagnostic prénatal et surveillance des grossesses à risque.",
    },
  ];

  return (
    <section
      aria-labelledby="team-teaser-heading"
      className="relative bg-background py-20 md:py-28 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-1/3 -left-32 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.12), transparent 70%)",
        }}
      />

      <div className="container-page relative">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-accent/40 px-4 py-1.5 text-[11px] tracking-[0.22em] uppercase text-primary-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            L&apos;équipe médicale
          </div>
          <h2
            id="team-teaser-heading"
            className="mt-6 font-display text-3xl md:text-4xl text-ink leading-[1.06] text-balance"
          >
            Une équipe à votre écoute,{" "}
            <span className="italic text-primary-deep">au cœur de Lyon</span>.
          </h2>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed text-pretty">
            Le centre réunit des praticiens expérimentés en échographie
            gynécologique et obstétricale. Retrouvez les parcours, affiliations
            et spécialités de chaque membre de l&apos;équipe.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/equipe"
              className="shine inline-flex items-center justify-center h-11 px-6 rounded-full bg-gradient-to-b from-[#dab85f] to-accent text-ink-deep text-sm font-semibold ring-1 ring-accent/60 hover:from-[#e3c479] hover:to-[#cfa850] transition-colors"
            >
              Découvrir l&apos;équipe
            </Link>
            <Link
              href="/presentation"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white text-sm font-medium text-ink ring-1 ring-line hover:ring-accent/40 transition-colors"
            >
              Présentation du centre
            </Link>
          </div>
        </div>

        <div className="mt-12 md:mt-14 grid md:grid-cols-3 gap-5 reveal-stagger">
          {trustPoints.map((item) => (
            <div
              key={item.title}
              className="royal-panel rounded-[1.25rem] bg-gradient-to-b from-white to-champagne/70 ring-1 ring-accent/30 p-6 shadow-[0_20px_50px_-28px_rgba(11,31,58,0.12)]"
            >
              <h3 className="font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClinicGalleryTeaser() {
  const preview = CLINIC_GALLERY_PHOTOS[0];

  return (
    <section
      aria-labelledby="clinic-gallery-teaser-heading"
      className="relative bg-cream py-20 md:py-28 overflow-hidden border-t border-line"
    >
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.14), transparent 70%)",
        }}
      />

      <div className="container-page relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h2
            id="clinic-gallery-teaser-heading"
            className="text-[11px] tracking-[0.34em] uppercase text-accent-deep font-medium"
          >
            Visite du centre
          </h2>
          <p className="mt-4 font-display text-3xl md:text-4xl text-ink leading-[1.06] text-balance">
            Découvrez le centre
          </p>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed text-pretty">
            Un espace médical élégant et apaisant, pensé pour accueillir les
            patientes dans un cadre professionnel, chaleureux et confidentiel.
          </p>
          <Link
            href="/galerie"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary-deep"
          >
            <span className="border-b border-primary-deep/30 pb-px group-hover:border-primary-deep transition-colors">
              Voir la galerie
            </span>
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
          </Link>
        </div>

        <Link
          href="/galerie"
          className="card-gold-top group relative order-1 lg:order-2 overflow-hidden rounded-[1.5rem] ring-1 ring-accent/35 shadow-[0_28px_70px_-32px_rgba(11,31,58,0.16)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-28px_rgba(201,162,74,0.2)] hover:ring-accent/50"
        >
          <OrnateCorners />
          <div className="relative aspect-[1170/754] overflow-hidden">
            <Image
              src={preview.src}
              alt={preview.alt}
              width={preview.width}
              height={preview.height}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-deep/40 to-transparent"
            />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink-deep/90 px-4 py-1.5 text-[11px] tracking-[0.18em] uppercase text-accent ring-1 ring-accent/40">
              {preview.caption}
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="container-page py-20 md:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink-deep text-white p-12 md:p-16 ring-1 ring-accent/25 reveal">
        {/* Gold top hairline + engraved corners — the premium frame detail. */}
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
        <div
          aria-hidden
          className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(143,61,86,0.22), transparent 70%)",
          }}
        />
        <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span aria-hidden className="gold-tick" />
              <span className="text-[11px] tracking-[0.32em] uppercase text-accent font-medium">
                Prendre rendez-vous
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-balance">
              Un rendez-vous en quelques clics.
            </h2>
            <p className="mt-5 text-white/75 text-lg max-w-lg text-pretty">
              Choisissez le type de consultation, sélectionnez votre créneau —
              confirmation immédiate.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end shrink-0">
            <Link
              href="/services"
              className="shine inline-flex w-full sm:w-auto shrink-0 items-center justify-center h-12 px-7 rounded-full bg-gradient-to-b from-[#dab85f] to-accent text-ink-deep text-sm font-semibold ring-1 ring-accent/60 shadow-[0_18px_40px_-18px_rgba(201,162,74,0.7)] hover:from-[#e3c479] hover:to-[#cfa850] transition-colors whitespace-nowrap"
            >
              <span>Voir tous les services</span>
            </Link>
            <a
              href="tel:+33428295516"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                <path
                  d="M4 3h3l1.5 3-2 1c1 2.5 2.5 4 5 5l1-2 3 1.5V14c-7 0-11-4-11-11Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              04 28 29 55 16
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
