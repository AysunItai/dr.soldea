import Image from "next/image";
import Link from "next/link";
import { Section } from "@/app/_components/Section";
import { ServiceCard } from "@/app/_components/ServiceCard";
import { ServiceIcon } from "@/app/_components/ServiceIcon";
import {
  OperaArch,
  OperaDivider,
  OrnateCorners,
} from "@/app/_components/OperaMotifs";
import {
  NAV_SERVICES,
  getObstetricTrimesters,
  type Service,
} from "@/lib/services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <ServicesSection />
      <UltrasoundFocus />
      <DoctorTeaser />
      <ContactCTA />
    </>
  );
}

function Hero() {
  return (
    <section
      className="hero-above-fold relative overflow-hidden pb-32 md:pb-44"
      style={{
        background:
          "linear-gradient(168deg, #f7eede 0%, #f4e9d8 38%, #fbf7f0 100%)",
      }}
    >
      <div className="absolute inset-0 bg-grid-soft opacity-40" />
      {/* Strong warm gold light, upper-right — the premium glow. */}
      <div
        aria-hidden
        className="absolute -top-44 -right-40 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.30), transparent 72%)",
        }}
      />
      {/* Deep burgundy glow, lower-left — the luxury accent. */}
      <div
        aria-hidden
        className="absolute top-1/3 -left-44 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(122,38,61,0.18), transparent 72%)",
        }}
      />
      {/* Champagne wash directly behind the medallion column. */}
      <div
        aria-hidden
        className="absolute right-0 top-0 h-full w-1/2 hidden lg:block"
        style={{
          background:
            "radial-gradient(60% 55% at 70% 42%, rgba(212,175,55,0.14), transparent 70%)",
        }}
      />
      {/* Hairline gold rule pinned to the very top of the page. */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px gold-rule opacity-70" />

      <div className="container-page relative pt-20 md:pt-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <HeroCopy />
        <HeroMedallion />
      </div>

      {/* Editorial credential ticker — sits along the hero baseline. */}
      <CredentialTicker />
    </section>
  );
}

function HeroCopy() {
  return (
    <div className="relative lg:pt-8">
      {/* Editorial index marker — a thin vertical accent on the left. */}
      <div className="absolute -left-3 top-2 hidden lg:flex flex-col items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-muted">
        <span>01</span>
        <span aria-hidden className="h-16 w-px bg-line" />
        <span className="[writing-mode:vertical-rl] rotate-180">
          Accueil
        </span>
      </div>

      <div className="animate-rise inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur ring-1 ring-accent/40 px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary-deep shadow-[0_10px_30px_-18px_rgba(122,38,61,0.5)]">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Au cœur de Lyon · Quartier Opéra
      </div>

      <h1 className="hero-lcp-headline animate-rise animate-rise-delay-1 mt-6 sm:mt-7 font-display text-[clamp(2.25rem,6.5vw,4.5rem)] leading-[0.98] tracking-[-0.015em] text-ink text-balance">
        Centre d&apos;Échographie
        <br />
        de la Femme{" "}
        <span className="italic text-primary-deep">OPÉRA</span>
      </h1>
      <p className="animate-rise animate-rise-delay-2 mt-4 text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.32em] uppercase text-accent-deep font-medium">
        Échographie gynécologique &amp; obstétricale · Lyon
      </p>

      <p className="animate-rise animate-rise-delay-3 mt-7 sm:mt-9 max-w-lg text-base sm:text-lg leading-relaxed text-ink-soft text-pretty">
        Échographies gynécologiques et obstétricales au cœur de Lyon, avec{" "}
        <span className="text-ink underline decoration-accent/50 underline-offset-4 decoration-2">
          Dr Alexandra Soldea
        </span>{" "}
        et son équipe. Un centre dédié au suivi des femmes, dans un cadre
        médical élégant, humain et rigoureux.
      </p>

      <div className="animate-rise animate-rise-delay-4 mt-8 sm:mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
        <Link
          href="/services"
          className="shine group inline-flex items-center justify-center h-12 pl-6 sm:pl-7 pr-3 rounded-full bg-ink text-white text-sm font-medium hover:bg-primary-deep transition-colors"
        >
          <span>Prendre rendez-vous</span>
          <span
            aria-hidden
            className="ml-3 grid place-content-center h-8 w-8 rounded-full bg-white text-ink transition-transform group-hover:translate-x-0.5"
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
          className="inline-flex items-center gap-2 h-12 px-1 sm:px-2 text-sm font-medium text-ink hover:text-primary-deep transition-colors"
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
          { k: "10+", v: "Années d'exercice" },
          { k: "Aurore", v: "Réseau de périnatalité" },
          { k: "FR · EN", v: "Langues parlées" },
        ].map((s) => (
          <div key={s.v} className="border-t border-line pt-3 sm:pt-4">
            <dt className="font-display text-lg sm:text-2xl text-ink leading-none">
              {s.k}
            </dt>
            <dd className="text-[11px] sm:text-xs text-muted mt-1 leading-tight">
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
      {/* Strong warm gold halo behind the medallion. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.32), transparent 72%)",
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
        <div className="relative rounded-full bg-gradient-to-b from-white via-[#fbf3e3] to-champagne p-4 sm:p-5 ring-1 ring-accent/50 shadow-[0_60px_120px_-40px_rgba(122,38,61,0.45),0_28px_60px_-30px_rgba(7,26,51,0.35)]">
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
            Lyon 1ᵉʳ · Quartier Opéra
          </span>
        </figcaption>

        {/* Réseau Aurore credential pill — gentle floating accent. */}
        <div className="absolute -right-2 md:-right-6 top-6 z-20 hidden md:flex flex-col items-start gap-1 rounded-2xl bg-white px-4 py-3 ring-1 ring-accent/30 shadow-[0_24px_50px_-24px_rgba(7,26,51,0.4)] max-w-[200px] animate-float">
          <span className="text-[10px] tracking-[0.25em] uppercase text-accent-deep font-medium">
            Échographiste agréée
          </span>
          <span className="font-display text-base text-ink leading-snug">
            Réseau Aurore
          </span>
          <span className="text-[11px] text-muted">
            Dépistage prénatal · T1 / T2 / T3
          </span>
        </div>
      </figure>
    </div>
  );
}

function CredentialTicker() {
  const items = [
    "Réseau Aurore",
    "CFEF",
    "CNGOF",
    "DIU Échographie · Paris Descartes",
    "Praticien hospitalier · Sainte-Foy-lès-Lyon",
    "ESGE 2016 — Best abstract",
  ];
  return (
    <div className="container-page relative mt-20 sm:mt-24 md:mt-32 lg:mt-40">
      <div className="flex items-center gap-3 mb-5">
        <span aria-hidden className="gold-tick" />
        <span className="text-[10px] tracking-[0.28em] sm:tracking-[0.32em] uppercase text-accent-deep font-medium whitespace-nowrap">
          Affiliations &amp; reconnaissance
        </span>
        <span aria-hidden className="h-px flex-1 gold-rule" />
      </div>
      <ul className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 md:gap-x-10 gap-y-2.5 text-[13px] sm:text-sm text-ink-soft">
        {items.map((item) => (
          <li key={item} className="inline-flex items-center gap-2">
            <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Highlights() {
  const items = [
    {
      title: "Réseau Aurore",
      desc: "Échographiste agréée pour le dépistage de la T21 (réseau périnatal Aurore).",
    },
    {
      title: "Hôpital Sainte-Foy",
      desc: "Praticien hospitalier au CH de Sainte-Foy-lès-Lyon — accouchements et chirurgie.",
    },
    {
      title: "Recherche & publications",
      desc: "Travaux sur l'endométriose (Journal of Minimally Invasive Gynecology, Fertility & Sterility).",
    },
  ];
  return (
    <section
      aria-labelledby="highlights-heading"
      className="relative overflow-hidden bg-ink-deep text-white py-16 md:py-20"
    >
      {/* Gold top hairline + a soft warm glow give the dark band depth. */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px gold-rule" />
      <div
        aria-hidden
        className="absolute -top-24 right-0 h-[360px] w-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.18), transparent 70%)",
        }}
      />
      <div className="container-page relative">
        <div className="flex flex-col items-center text-center mb-10 md:mb-12">
          <h2
            id="highlights-heading"
            className="text-[11px] tracking-[0.34em] uppercase text-accent font-medium"
          >
            Affiliations &amp; reconnaissance
          </h2>
          <OperaDivider className="mt-4" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 reveal-stagger">
          {items.map((item) => (
            <div key={item.title} className="flex gap-4 reveal">
              <span
                aria-hidden
                className="mt-1 inline-block h-10 w-px bg-gradient-to-b from-accent to-transparent"
              />
              <div>
                <h3 className="font-display text-xl text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <Section
      eyebrow="Services"
      title={
        <>
          Choisissez votre <span className="italic">consultation</span>
        </>
      }
      description="Cliquez sur un service pour prendre rendez-vous en ligne. Chaque créneau est confirmé immédiatement."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
        {NAV_SERVICES.map((service) => (
          <ServiceCard key={service.slug} service={service} />
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
            Au Centre d&apos;Échographie de la Femme OPÉRA, le{" "}
            <strong className="font-medium text-ink">Dr. Alexandra Soldea</strong>,
            échographiste agréée du réseau de périnatalité{" "}
            <strong className="font-medium text-ink">Aurore</strong>, réalise les
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
        <div className="card-gold-top relative mt-14 md:mt-16 rounded-3xl bg-white ring-1 ring-line p-6 md:p-8 grid gap-6 md:grid-cols-[1.4fr_1fr] items-center shadow-[0_30px_70px_-40px_rgba(7,26,51,0.25)]">
          <OrnateCorners />
          <ul className="grid sm:grid-cols-3 gap-x-6 gap-y-3 text-sm text-ink-soft">
            {[
              "Échographiste agréée Réseau Aurore",
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
          <div className="flex md:justify-end">
            <Link
              href="/services/echographie-obstetricale"
              className="group inline-flex items-center justify-center h-12 pl-6 pr-3 rounded-full bg-ink text-white text-sm font-medium hover:bg-primary-deep transition-colors"
            >
              Tout savoir sur l&apos;échographie obstétricale
              <span
                aria-hidden
                className="ml-3 grid place-content-center h-8 w-8 rounded-full bg-white text-ink transition-transform group-hover:translate-x-0.5"
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
        className="card-gold-top group relative block h-full rounded-[1.5rem] bg-white ring-1 ring-line p-7 md:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_50px_90px_-35px_rgba(7,26,51,0.32)] hover:ring-accent/50"
      >
        <OrnateCorners />
        {/* Big number marker — gives each card a strong identity */}
        <div className="flex items-start justify-between">
          <span className="font-display text-[3.5rem] md:text-[4rem] leading-none text-primary-deep">
            <span className="opacity-25 text-accent">0</span>
            {index + 1}
          </span>
          <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary-deep ring-1 ring-accent/40">
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

        <div className="mt-6 pt-5 border-t border-line flex items-center justify-between">
          <span className="text-xs text-muted">{service.durationLabel}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-deep">
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

function DoctorTeaser() {
  // Editorial credentials grid that replaces the portrait. Each card is a
  // tight, scannable signal of the doctor's expertise — diploma, hospital,
  // network, research focus — laid out like an editorial spread.
  const credentials: {
    n: string;
    eyebrow: string;
    title: string;
    sub: string;
  }[] = [
    {
      n: "01",
      eyebrow: "Diplôme",
      title: "DIU Échographie gynécologique & obstétricale",
      sub: "Université Paris Descartes — 2020",
    },
    {
      n: "02",
      eyebrow: "Hôpital",
      title: "Praticien hospitalier",
      sub: "Maternité du CH de Sainte-Foy-lès-Lyon",
    },
    {
      n: "03",
      eyebrow: "Réseau",
      title: "Réseau de périnatalité Aurore",
      sub: "Échographiste agréée — dépistage prénatal",
    },
    {
      n: "04",
      eyebrow: "Recherche",
      title: "Endométriose",
      sub: "Collaboration centre expert ENDOMETRIOSE — CHU de Rouen",
    },
  ];

  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Subtle ambient glow — frames the section without competing with type. */}
      <div
        aria-hidden
        className="absolute top-1/3 -left-32 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,162,74,0.12), transparent 70%)",
        }}
      />

      <div className="container-page relative grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-20 items-start reveal">
        {/* Left column — editorial copy + monogram */}
        <div className="relative">
          {/* Decorative monogram floating behind the headline. */}
          <span
            aria-hidden
            className="absolute -top-10 -left-3 md:-top-14 md:-left-6 font-display text-[10rem] md:text-[14rem] leading-none text-primary/[0.06] select-none pointer-events-none"
          >
            AS
          </span>

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-accent/40 px-4 py-1.5 text-[11px] tracking-[0.22em] uppercase text-primary-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Présentation
            </div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] text-ink leading-[1.04] tracking-[-0.01em] text-balance">
              Une médecine{" "}
              <span className="italic text-primary-deep">humaine</span>,
              <br className="hidden md:block" /> rigoureuse et continue.
            </h2>

            <p className="mt-6 text-lg text-ink-soft text-pretty leading-relaxed max-w-xl">
              Le Dr. Soldea exerce également comme praticien hospitalier à la
              maternité du Centre Hospitalier de Sainte-Foy-lès-Lyon —
              accouchements, chirurgie et consultations spécialisées. Son
              activité de recherche porte sur l&apos;endométriose, en
              collaboration avec le centre expert ENDOMETRIOSE du CHU de
              Rouen.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {[
                "Aurore — Réseau périnatal",
                "CFEF",
                "CNGOF",
                "Langues : FR · EN",
              ].map((b) => (
                <span
                  key={b}
                  className="rounded-full bg-cream ring-1 ring-line px-4 py-1.5 text-xs text-ink-soft"
                >
                  {b}
                </span>
              ))}
            </div>

            <Link
              href="/presentation"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-primary-deep"
            >
              <span className="border-b border-primary-deep/30 pb-px group-hover:border-primary-deep transition-colors">
                Lire la présentation complète
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
        </div>

        {/* Right column — credentials wall (2×2). */}
        <ol className="grid sm:grid-cols-2 gap-4 lg:gap-5 reveal-stagger">
          {credentials.map((c, i) => (
            <li
              key={c.n}
              className={`group relative rounded-[1.25rem] bg-white ring-1 ring-line p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-35px_rgba(7,26,51,0.28)] hover:ring-accent/50 ${
                i % 2 === 1 ? "sm:mt-6" : ""
              }`}
            >
              {/* Gold top accent line — intensifies on hover. */}
              <span
                aria-hidden
                className="absolute top-0 left-6 right-6 h-px bg-accent/50 group-hover:bg-accent transition-colors"
              />
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-2xl text-primary-deep leading-none">
                  <span className="opacity-30 text-accent">0</span>
                  {c.n.slice(1)}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-accent-deep font-medium">
                  {c.eyebrow}
                </span>
              </div>
              <p className="mt-5 font-display text-lg text-ink leading-snug text-balance">
                {c.title}
              </p>
              <p className="mt-2 text-xs text-muted leading-relaxed">{c.sub}</p>
            </li>
          ))}
        </ol>
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
        <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
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
          <div className="flex flex-col gap-3 md:items-end">
            <Link
              href="/services"
              className="shine inline-flex items-center justify-center h-12 px-7 rounded-full bg-gradient-to-b from-[#dab85f] to-accent text-ink-deep text-sm font-semibold ring-1 ring-accent/60 shadow-[0_18px_40px_-18px_rgba(201,162,74,0.7)] hover:from-[#e3c479] hover:to-[#cfa850] transition-colors"
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
