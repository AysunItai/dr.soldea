import type { Service } from "@/lib/services";

/**
 * Canonical absolute URL of the live site. Falls back to a sensible
 * default when the env var is missing. Update via NEXT_PUBLIC_SITE_URL
 * once the production domain is finalised.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.gynecologuelyon.fr";

export function buildAbsoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Practitioner identity reused across JSON-LD blocks. */
export const PRACTITIONER = {
  name: "Dr. Alexandra Soldea",
  jobTitle: "Gynécologue obstétricienne",
  medicalSpecialty: ["Obstetric", "Gynecologic"],
  knowsLanguage: ["fr", "en"],
  affiliations: [
    "Réseau de périnatalité Aurore",
    "Collège National des Gynécologues et Obstétriciens Français (CNGOF)",
    "Collège Français d'Échographie Fœtale (CFEF)",
  ],
};

/** Cabinet locations. The first entry is the primary practice address. */
export const CABINETS = [
  {
    name: "Cabinet Miribel — Dr. Alexandra Soldea",
    streetAddress: "63 place de la République",
    postalCode: "01700",
    addressLocality: "Miribel",
    addressRegion: "Ain",
    addressCountry: "FR",
    telephone: "+33-4-28-29-55-16",
    geo: { latitude: 45.8265, longitude: 4.9572 },
  },
  {
    name: "Cabinet Lyon — Dr. Alexandra Soldea",
    streetAddress: "4 rue du Président Carnot",
    postalCode: "69002",
    addressLocality: "Lyon",
    addressRegion: "Rhône",
    addressCountry: "FR",
    telephone: "+33-4-28-29-55-16",
    geo: { latitude: 45.7607, longitude: 4.8350 },
  },
];

/**
 * Schema.org `Physician` JSON-LD describing the practitioner and her
 * cabinets. Mounted once on every page via the root layout so Google
 * always has access to it.
 */
export function physicianJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}#physician`,
    name: PRACTITIONER.name,
    url: SITE_URL,
    image: `${SITE_URL}/alexandra.png`,
    jobTitle: PRACTITIONER.jobTitle,
    medicalSpecialty: PRACTITIONER.medicalSpecialty,
    knowsLanguage: PRACTITIONER.knowsLanguage,
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
        name: "Suivi de grossesse",
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
    location: CABINETS.map((c) => ({
      "@type": "MedicalClinic",
      name: c.name,
      telephone: c.telephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: c.streetAddress,
        postalCode: c.postalCode,
        addressLocality: c.addressLocality,
        addressRegion: c.addressRegion,
        addressCountry: c.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: c.geo.latitude,
        longitude: c.geo.longitude,
      },
    })),
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
    procedureType: service.category === "echographie"
      ? "DiagnosticProcedure"
      : "TherapeuticProcedure",
    url,
    performer: {
      "@type": "Physician",
      "@id": `${SITE_URL}#physician`,
      name: PRACTITIONER.name,
    },
    bodyLocation: service.category === "echographie" ? "Pelvis" : undefined,
    preparation: service.weeks
      ? `À réaliser entre ${service.weeks} d'aménorrhée.`
      : undefined,
    howPerformed: service.description,
  };
}
