import type { Service } from "@/lib/services";

/**
 * Canonical absolute URL of the live site. The production canonical is
 * the www form `https://www.echographielyon.fr` — configure your DNS so
 * that the apex `echographielyon.fr` 301-redirects to the www subdomain
 * to avoid duplicate-content signals. Override via NEXT_PUBLIC_SITE_URL
 * if you ever move to a different domain.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.echographielyon.fr";

export function buildAbsoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/* -------------------------------------------------------------------------
 * Core identity reused across JSON-LD blocks
 * -----------------------------------------------------------------------*/

/** Practitioner identity reused across JSON-LD blocks. */
export const PRACTITIONER = {
  name: "Dr. Alexandra Soldea",
  givenName: "Alexandra",
  familyName: "Soldea",
  honorificPrefix: "Dr.",
  jobTitle: "Gynécologue obstétricienne",
  medicalSpecialty: ["Obstetric", "Gynecologic"] as const,
  knowsLanguage: ["fr", "en"] as const,
  affiliations: [
    "Réseau de périnatalité Aurore",
    "Collège National des Gynécologues et Obstétriciens Français (CNGOF)",
    "Collège Français d'Échographie Fœtale (CFEF)",
  ],
  /**
   * External profiles that reinforce identity for search engines.
   * Add a new line each time a verified profile is published. Empty
   * strings are filtered out so it is safe to leave placeholders here.
   */
  sameAs: [
    "https://www.doctolib.fr/gynecologue-obstetricien/lyon/alexandra-soldea",
  ].filter(Boolean),
};

/** Cabinet locations. The first entry is the primary practice address. */
export const CABINETS = [
  {
    id: "miribel",
    name: "Cabinet Miribel — Dr. Alexandra Soldea",
    streetAddress: "63 place de la République",
    postalCode: "01700",
    addressLocality: "Miribel",
    addressRegion: "Ain",
    addressCountry: "FR",
    telephone: "+33-4-28-29-55-16",
    geo: { latitude: 45.8265, longitude: 4.9572 },
    primary: true,
  },
  {
    id: "lyon",
    name: "Cabinet Lyon — Dr. Alexandra Soldea",
    streetAddress: "4 rue du Président Carnot",
    postalCode: "69002",
    addressLocality: "Lyon",
    addressRegion: "Rhône",
    addressCountry: "FR",
    telephone: "+33-4-28-29-55-16",
    geo: { latitude: 45.7607, longitude: 4.8350 },
    primary: false,
  },
] as const;

/* -------------------------------------------------------------------------
 * Single-entity JSON-LD builders
 *
 * Each builder returns a *plain object* (not stringified). We string-ify at
 * the call-site so we keep one consistent encoding pass (and so multiple
 * blocks can be merged into a single `@graph` if desired).
 * -----------------------------------------------------------------------*/

/** @id of the canonical Physician node (Dr. Alexandra Soldea). */
export const PHYSICIAN_ID = `${SITE_URL}#physician`;
/** @id of the canonical Person node — the human identity behind the practice. */
export const PERSON_ID = `${SITE_URL}#person`;
/** @id of the WebSite node. */
export const WEBSITE_ID = `${SITE_URL}#website`;

const cabinetId = (id: string) => `${SITE_URL}#cabinet-${id}`;

/**
 * `WebSite` node — declares the canonical URL and brand name. Helps Google
 * decide which URL to surface for site-name queries.
 */
export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Dr. Alexandra Soldea — Gynécologue & Échographe à Lyon",
    inLanguage: "fr-FR",
    publisher: { "@id": PHYSICIAN_ID },
  };
}

/**
 * `Person` node — the human identity. Carries credentials, `sameAs` links
 * (Doctolib, etc.) and an explicit affiliation to the practice.
 */
export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PRACTITIONER.name,
    givenName: PRACTITIONER.givenName,
    familyName: PRACTITIONER.familyName,
    honorificPrefix: PRACTITIONER.honorificPrefix,
    jobTitle: PRACTITIONER.jobTitle,
    knowsLanguage: [...PRACTITIONER.knowsLanguage],
    image: `${SITE_URL}/alexandra.png`,
    url: `${SITE_URL}/presentation`,
    worksFor: { "@id": PHYSICIAN_ID },
    sameAs: PRACTITIONER.sameAs.length > 0 ? PRACTITIONER.sameAs : undefined,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Université Paris Descartes",
    },
    memberOf: PRACTITIONER.affiliations.map((name) => ({
      "@type": "Organization",
      name,
    })),
  };
}

/**
 * `Physician` node — the practice-level entity. Links to the Person via
 * `founder` and to each MedicalClinic via `location`.
 */
export function physicianJsonLd() {
  return {
    "@type": "Physician",
    "@id": PHYSICIAN_ID,
    name: PRACTITIONER.name,
    url: SITE_URL,
    image: `${SITE_URL}/alexandra.png`,
    jobTitle: PRACTITIONER.jobTitle,
    medicalSpecialty: [...PRACTITIONER.medicalSpecialty],
    knowsLanguage: [...PRACTITIONER.knowsLanguage],
    telephone: CABINETS[0].telephone,
    priceRange: "€€",
    founder: { "@id": PERSON_ID },
    memberOf: PRACTITIONER.affiliations.map((name) => ({
      "@type": "Organization",
      name,
    })),
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Échographie obstétricale (1er, 2e et 3e trimestre)",
      },
      {
        "@type": "MedicalProcedure",
        name: "Échographie gynécologique pelvienne",
      },
      {
        "@type": "MedicalProcedure",
        name: "Échographie de datation",
      },
      {
        "@type": "MedicalProcedure",
        name: "Suivi de grossesse",
      },
      {
        "@type": "MedicalProcedure",
        name: "Contrôle de stérilet (DIU)",
      },
      {
        "@type": "MedicalProcedure",
        name: "Téléconsultation",
      },
    ],
    address: CABINETS.map((c) => ({
      "@type": "PostalAddress",
      streetAddress: c.streetAddress,
      postalCode: c.postalCode,
      addressLocality: c.addressLocality,
      addressRegion: c.addressRegion,
      addressCountry: c.addressCountry,
    })),
    location: CABINETS.map((c) => ({ "@id": cabinetId(c.id) })),
  };
}

/**
 * One `MedicalClinic` node per cabinet — emitted as a top-level entity
 * (not nested under Physician) so each cabinet has its own distinct local
 * presence. This is what powers the Google "local pack" (map results) for
 * queries like "échographie lyon" / "gynécologue miribel".
 *
 * `openingHoursSpecification` is intentionally omitted: the practice is
 * "by appointment only" via Calendly. Wrong opening hours are worse than
 * none — Google will downrank if hours conflict with reality.
 */
export function medicalClinicJsonLd(cabinet: (typeof CABINETS)[number]) {
  return {
    "@type": "MedicalClinic",
    "@id": cabinetId(cabinet.id),
    name: cabinet.name,
    url:
      cabinet.id === "lyon"
        ? `${SITE_URL}/contact#cabinet-lyon`
        : `${SITE_URL}/contact#cabinet-miribel`,
    image: `${SITE_URL}/hero1.webp`,
    telephone: cabinet.telephone,
    priceRange: "€€",
    paymentAccepted: "Carte Vitale, Carte bancaire, Espèces, Chèque",
    currenciesAccepted: "EUR",
    medicalSpecialty: ["Obstetric", "Gynecologic"],
    availableService: [
      "Échographie obstétricale (T1, T2, T3)",
      "Échographie gynécologique pelvienne",
      "Échographie de datation",
      "Suivi de grossesse",
      "Suivi de gynécologie",
      "Contrôle de stérilet (DIU)",
    ].map((name) => ({ "@type": "MedicalProcedure", name })),
    address: {
      "@type": "PostalAddress",
      streetAddress: cabinet.streetAddress,
      postalCode: cabinet.postalCode,
      addressLocality: cabinet.addressLocality,
      addressRegion: cabinet.addressRegion,
      addressCountry: cabinet.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: cabinet.geo.latitude,
      longitude: cabinet.geo.longitude,
    },
    areaServed: [
      {
        "@type": "City",
        name: cabinet.addressLocality,
      },
      {
        "@type": "AdministrativeArea",
        name: cabinet.addressRegion,
      },
    ],
    physician: { "@id": PHYSICIAN_ID },
    isAcceptingNewPatients: true,
  };
}

/* -------------------------------------------------------------------------
 * Site-wide @graph
 *
 * Combining every site-level entity into a single `@graph` block lets
 * Google build a richer knowledge model: it sees that the Person founded
 * the Physician practice, which operates two MedicalClinics, all under one
 * WebSite. This produces stronger local-pack and knowledge-panel signals
 * than the same entities emitted as disconnected JSON-LD blocks.
 *
 * Mounted once on every page via the root layout.
 * -----------------------------------------------------------------------*/
export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteJsonLd(),
      personJsonLd(),
      physicianJsonLd(),
      ...CABINETS.map(medicalClinicJsonLd),
    ],
  };
}

/* -------------------------------------------------------------------------
 * Per-page builders
 * -----------------------------------------------------------------------*/

/**
 * Breadcrumb structured data. Google renders breadcrumb trails in SERPs
 * which materially improves click-through versus a raw URL.
 *
 * Pass items in order, root → leaf. The last item is the current page.
 */
export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  };
}

/**
 * `MedicalWebPage` wrapper for a service detail page. Tells Google the
 * content is medical, who reviewed it, and who the audience is — central
 * to E-E-A-T scoring on YMYL queries.
 */
export function medicalWebPageJsonLd(service: Service) {
  const url = buildAbsoluteUrl(`/services/${service.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#webpage`,
    url,
    name: service.title,
    description: service.metaDescription ?? service.tagline,
    inLanguage: "fr-FR",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PHYSICIAN_ID },
    reviewedBy: { "@id": PERSON_ID },
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
      healthCondition:
        service.group === "obstetrical"
          ? "Pregnancy"
          : service.category === "echographie"
            ? "Gynecologic"
            : undefined,
    },
    lastReviewed: new Date().toISOString().slice(0, 10),
  };
}

/**
 * Schema.org `MedicalProcedure` JSON-LD for a single service detail page.
 * Designed to enable rich snippets on Google for queries like "échographie
 * morphologique Lyon".
 */
export function medicalProcedureJsonLd(service: Service) {
  const url = buildAbsoluteUrl(`/services/${service.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title,
    alternateName: service.shortTitle,
    description: service.metaDescription ?? service.description,
    procedureType:
      service.category === "echographie"
        ? "DiagnosticProcedure"
        : "TherapeuticProcedure",
    url,
    performer: { "@id": PHYSICIAN_ID },
    bodyLocation: service.category === "echographie" ? "Pelvis" : undefined,
    preparation: service.weeks
      ? `À réaliser entre ${service.weeks} d'aménorrhée.`
      : undefined,
    howPerformed: service.description,
  };
}

/**
 * `FAQPage` JSON-LD. Powers expandable Q&A rich results in Google mobile
 * SERPs — one of the highest-CTR rich result types for medical queries.
 */
export function faqPageJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
