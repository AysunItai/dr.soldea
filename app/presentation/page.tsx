import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { breadcrumbJsonLd, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Présentation",
  description:
    "Parcours de la Dr. Alexandra Soldea, gynécologue-obstétricienne et échographiste agréée Aurore à Lyon et Miribel, praticien hospitalier à Sainte-Foy.",
  alternates: { canonical: canonicalUrl("/presentation") },
};

export default function PresentationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", path: "/" },
              { name: "Présentation", path: "/presentation" },
            ]),
          ),
        }}
      />
      <Header />
      <Bio />
      <CredentialsGrid />
      <Experience />
      <Publications />
      <BookCTA />
    </>
  );
}

function Header() {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft opacity-50" />
      <div
        aria-hidden
        className="absolute -top-32 right-1/3 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(58,141,150,0.18), transparent 70%)",
        }}
      />
      <div className="container-page relative pt-24 pb-20 md:pt-32 md:pb-24 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur ring-1 ring-line px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary-deep">
            Présentation
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.01em] text-ink text-balance">
            Une médecine attentive,
            <br />
            <span className="italic text-primary-deep">
              ancrée dans la rigueur scientifique.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft text-pretty">
            Le Dr. Soldea vous reçoit dans son cabinet à Miribel et exerce
            également comme praticien hospitalier au CH de Sainte-Foy-lès-Lyon.
          </p>
        </div>

        {/*
         * Wrapper centers the portrait on stacked layouts and lets it span
         * the right column edge-to-edge on desktop. max-w prevents the
         * 3:4 container from blowing up to >1000px tall on mobile.
         */}
        <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0">
          <div
            aria-hidden
            className="absolute -inset-4 sm:-inset-6 rounded-[2rem] bg-gradient-to-br from-primary-soft via-cream to-cream-deep -z-10"
          />
          <div className="relative rounded-[1.75rem] overflow-hidden ring-1 ring-line shadow-[0_40px_80px_-30px_rgba(11,31,61,0.30)]">
            <Image
              src="/alexandra.webp"
              alt="Dr. Alexandra Soldea — gynécologue obstétricienne et échographiste agréée à Lyon et Miribel"
              width={567}
              height={600}
              preload
              fetchPriority="high"
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 24rem"
              className="h-auto w-full object-cover object-center"
            />
          </div>

          {/* Small "signature" caption floating bottom-right. */}
          <div className="absolute -right-3 md:-right-5 bottom-6 hidden sm:flex flex-col items-start gap-0.5 rounded-2xl bg-white px-4 py-3 ring-1 ring-line shadow-[0_24px_50px_-24px_rgba(11,31,61,0.30)] max-w-[210px]">
            <span className="text-[10px] tracking-[0.28em] uppercase text-primary">
              Dr. Alexandra Soldea
            </span>
            <span className="text-xs text-muted leading-snug">
              Gynécologue · Obstétricienne
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bio() {
  const paragraphs = [
    "Le Dr. Soldea vous reçoit dans son cabinet à Miribel. Les patientes déjà prises en charge à Jons continueront à être suivies dans son nouveau cabinet à Miribel.",
    "Elle est également praticien hospitalier à la maternité du Centre Hospitalier de Sainte-Foy-lès-Lyon, où elle pratique des accouchements, des interventions chirurgicales et assure des consultations de suivi gynécologique, de dépistage, d'endométriose, de suivi de grossesse, de contraception et de ménopause.",
    "Elle est spécialisée en échographie gynécologique et obstétricale, avec une compétence particulière dans le suivi des grossesses pathologiques.",
    "Le Dr. Soldea réalise les échographies fœtales de dépistage prénatal en tant qu'échographiste agréée auprès du réseau de périnatalité Aurore pour le dépistage de la T21 au 1er trimestre, et les échographies des 2e et 3e trimestres.",
    "Son activité de recherche sur les lésions satellites microscopiques d'endométriose colorectale dans le service du CHU de Rouen (Rouendométriose — centre expert de diagnostic et prise en charge multidisciplinaire de l'endométriose de Rouen) a été concrétisée par la publication d'articles scientifiques en tant que premier auteur dans des revues internationales (Fertility & Sterility, Journal of Minimally Invasive Gynecology).",
  ];
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container-page grid lg:grid-cols-[1fr_2fr] gap-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-4">
            Le parcours
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight text-balance">
            Du cabinet à la maternité, une présence continue.
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Gynécologie",
              "Obstétrique",
              "Échographie",
              "Endométriose",
              "Recherche clinique",
            ].map((b) => (
              <span
                key={b}
                className="rounded-full bg-cream ring-1 ring-line px-3 py-1 text-xs text-ink-soft"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-5 text-lg text-ink-soft leading-relaxed max-w-2xl">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-pretty">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function CredentialsGrid() {
  const items = [
    {
      label: "Langues parlées",
      values: ["Français", "Anglais"],
    },
    {
      label: "Diplômes",
      values: ["DIU Échographie gynécologique et obstétricale — Paris Descartes (2020)"],
    },
    {
      label: "Associations",
      values: [
        "Aurore — Réseau périnatal",
        "CFEF — Collège Français d'Échographie Fœtale",
        "CNGOF — Collège National des Gynécologues et Obstétriciens Français",
      ],
    },
  ];

  return (
    <section
      aria-labelledby="credentials-heading"
      className="bg-cream py-20 md:py-24"
    >
      <div className="container-page">
        {/* Visually hidden — restores h2 between the page h1 and the h3
         * labels below so heading order doesn't skip a level. */}
        <h2 id="credentials-heading" className="sr-only">
          Diplômes, langues et affiliations
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {items.map((item) => (
            <div key={item.label}>
              <h3 className="text-[11px] tracking-[0.3em] uppercase text-primary mb-5">
                {item.label}
              </h3>
              <ul className="space-y-3">
                {item.values.map((v) => (
                  <li
                    key={v}
                    className="text-ink-soft text-[15px] leading-relaxed border-l-2 border-primary/40 pl-4"
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    {
      period: "Depuis 2023",
      role: "Praticien hospitalier",
      place: "Centre Hospitalier de Sainte-Foy-lès-Lyon",
      detail: "Obstétrique · Gynécologie",
    },
    {
      period: "Depuis 2022",
      role: "Cabinet libéral",
      place: "Jons puis Miribel",
      detail: "Consultations & échographies",
    },
    {
      period: "2021 — 2023",
      role: "Praticienne hospitalière",
      place: "Hôpital du Gier — Saint-Chamond",
      detail: "Gynécologie · Obstétrique",
    },
    {
      period: "2019 — 2021",
      role: "Assistante spécialiste",
      place: "Centre hospitalier d'Annecy-Genevois — Epagny-Metz-Tessy",
      detail: "Gynécologie obstétrique",
    },
    {
      period: "2018 — 2019",
      role: "Interne",
      place: "Centre Hospitalier Saint-Joseph Saint-Luc — Lyon",
      detail: "Gynécologie-obstétrique",
    },
    {
      period: "2017 — 2018",
      role: "Interne",
      place: "Centre Hospitalier de Dieppe",
      detail: "Gynécologie-obstétrique",
    },
    {
      period: "2017",
      role: "Fellow",
      place: "Maternité de l'hôpital Fribourgeois HFR — Fribourg",
      detail: "Gynécologie-obstétrique",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container-page max-w-4xl">
        <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-4">
          Expériences
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight text-balance">
          Un parcours hospitalier et libéral.
        </h2>

        <ol className="mt-12 space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="relative grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-5 border-t border-line"
            >
              <p className="text-sm font-medium text-primary-deep tracking-wider whitespace-nowrap">
                {item.period}
              </p>
              <div>
                <p className="font-display text-xl text-ink leading-snug">
                  {item.role} · {item.place}
                </p>
                <p className="text-sm text-muted mt-1">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Publications() {
  const items = [
    {
      year: "2018",
      title:
        "Patterns of Bowel Invisible Microscopic Endometriosis Reveal the Goal of Surgery: Removal of Visual Lesions Only.",
      journal: "Journal of Minimally Invasive Gynecology — Article",
    },
    {
      year: "2016",
      title:
        "Mapping of bowel occult microscopic endometriosis implants surrounding deep endometriosis nodules infiltrating the bowel.",
      journal: "Fertility & Sterility — Article",
    },
    {
      year: "2016",
      title:
        "Bowel occult microscopic endometriosis in resection margins in deep colorectal endometriosis specimens has no impact on short-term postoperative outcomes.",
      journal: "Fertility & Sterility — Article",
    },
  ];

  return (
    <section className="bg-cream py-20 md:py-24">
      <div className="container-page max-w-4xl">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-10">
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-4">
              Travaux & publications
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              Recherche clinique.
            </h2>
          </div>
          <p className="text-lg text-ink-soft text-pretty self-end">
            Premier auteur de publications dans des revues internationales sur
            l&apos;endométriose colorectale, en collaboration avec le CHU de
            Rouen.
          </p>
        </div>

        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="grid md:grid-cols-[80px_1fr] gap-4 py-6 border-t border-line"
            >
              <span className="text-sm font-medium text-primary-deep">
                {item.year}
              </span>
              <div>
                <p className="text-ink text-pretty leading-snug">
                  {item.title}
                </p>
                <p className="text-sm text-muted mt-1.5">{item.journal}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl bg-white ring-1 ring-line p-7 flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-primary">
              Prix & distinctions
            </p>
            <p className="font-display text-xl text-ink mt-1">
              1er prix · Best abstract video
            </p>
            <p className="text-sm text-muted mt-1">
              European Society for Gynaecological Endoscopy (ESGE) — 2016
            </p>
          </div>
          <span className="rounded-full bg-cream-deep px-4 py-2 text-xs tracking-wider uppercase text-primary-deep">
            ESGE 2016
          </span>
        </div>
      </div>
    </section>
  );
}

function BookCTA() {
  return (
    <section className="container-page py-20">
      <div className="rounded-[2rem] bg-ink text-white p-12 md:p-16 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl leading-tight text-balance">
            Prêt·e à prendre rendez-vous ?
          </h2>
          <p className="mt-3 text-white/75 max-w-md text-pretty">
            Choisissez le type de consultation et trouvez le créneau qui vous
            convient — en ligne.
          </p>
        </div>
        <div className="flex flex-col md:items-end gap-3">
          <Link
            href="/services"
            className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-white text-ink text-sm font-medium hover:bg-primary-soft transition-colors"
          >
            Voir les services
          </Link>
          <Link
            href="/contact"
            className="text-sm text-white/80 hover:text-white"
          >
            Nous contacter →
          </Link>
        </div>
      </div>
    </section>
  );
}
