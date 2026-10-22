import type { ServiceSlug } from "./services";

/** Exact, manually confirmed Lyon category selection supplied by the clinic. */
export const DOCTOLIB_BOOKING_URL =
  "https://www.doctolib.fr/gynecologue-obstetricien/lyon/alexandra-soldea/booking/motive-categories?specialityId=102&telehealth=false&placeId=practice-806420&source=profile";

/**
 * Only the distinct Category 1 motives are eligible for ultrasound mappings.
 * URLs are kept verbatim. All 19 supplied records (including shared/malformed
 * URLs) are preserved separately in docs/doctolib-categories.json.
 */
export const DOCTOLIB_ULTRASOUND_MOTIVES = {
  datation: {
    consultation: "Échographie de datation",
    categoryId: "171273",
    motiveId: "6400728",
    url: "https://www.doctolib.fr/gynecologue-obstetricien/lyon/alexandra-soldea/booking/availabilities?specialityId=102&telehealth=false&placeId=practice-806420&motiveCategoryIds%5B%5D=171273&motiveIds%5B%5D=6400728&source=profile",
  },
  gynecologique: {
    consultation: "Échographie gynécologique",
    categoryId: "171273",
    motiveId: "6400729",
    url: "https://www.doctolib.fr/gynecologue-obstetricien/lyon/alexandra-soldea/booking/availabilities?specialityId=102&telehealth=false&placeId=practice-806420&motiveCategoryIds%5B%5D=171273&motiveIds%5B%5D=6400729&source=profile",
  },
  croissance: {
    consultation: "Échographie de contrôle de croissance",
    categoryId: "171273",
    motiveId: "6683280",
    url: "https://www.doctolib.fr/gynecologue-obstetricien/lyon/alexandra-soldea/booking/availabilities?specialityId=102&telehealth=false&placeId=practice-806420&motiveCategoryIds%5B%5D=171273&motiveIds%5B%5D=6683280&source=profile",
  },
  t1: {
    consultation: "Échographie obstétricale — 1er trimestre",
    categoryId: "171273",
    motiveId: "6622462",
    url: "https://www.doctolib.fr/gynecologue-obstetricien/lyon/alexandra-soldea/booking/availabilities?specialityId=102&telehealth=false&placeId=practice-806420&motiveCategoryIds%5B%5D=171273&motiveIds%5B%5D=6622462&source=profile",
  },
  t2: {
    consultation: "Échographie obstétricale — 2e trimestre",
    categoryId: "171273",
    motiveId: "6622463",
    url: "https://www.doctolib.fr/gynecologue-obstetricien/lyon/alexandra-soldea/booking/availabilities?specialityId=102&telehealth=false&placeId=practice-806420&motiveCategoryIds%5B%5D=171273&motiveIds%5B%5D=6622463&source=profile",
  },
  t3: {
    consultation: "Échographie obstétricale — 3e trimestre",
    categoryId: "171273",
    motiveId: "6622464",
    url: "https://www.doctolib.fr/gynecologue-obstetricien/lyon/alexandra-soldea/booking/availabilities?specialityId=102&telehealth=false&placeId=practice-806420&motiveCategoryIds%5B%5D=171273&motiveIds%5B%5D=6622464&source=profile",
  },
  secondAvis: {
    consultation: "Échographie de grossesse — 2e avis",
    categoryId: "171273",
    motiveId: "16054610",
    url: "https://www.doctolib.fr/gynecologue-obstetricien/lyon/alexandra-soldea/booking/availabilities?specialityId=102&telehealth=false&placeId=practice-806420&motiveCategoryIds%5B%5D=171273&motiveIds%5B%5D=16054610&source=profile",
  },
} as const;

type UltrasoundMotive = (typeof DOCTOLIB_ULTRASOUND_MOTIVES)[keyof typeof DOCTOLIB_ULTRASOUND_MOTIVES];
type ConsultationType = "ultrasound" | "consultation" | "ultrasound-and-consultation" | "ultrasound-overview";

type BookingContext = {
  serviceSlug: string;
  consultationType: ConsultationType;
  /** Website appointment intent, not a claim that Doctolib has selected it. */
  intendedConsultation: string;
  reason: string;
};

type LyonBooking = {
  bookingMode: "in-person";
  location: "Lyon";
  practiceId: "practice-806420";
};

export type BookingDestination = BookingContext & (
  | (LyonBooking & UltrasoundMotive & {
      status: "verified-direct";
      specificity: "exact";
      isFallback: false;
    })
  | (LyonBooking & {
      status: "verified-category-fallback";
      specificity: "category-selection";
      isFallback: true;
      url: typeof DOCTOLIB_BOOKING_URL;
      consultation: null;
      categoryId: null;
      motiveId: null;
    })
  | {
      status: "requires-manual-confirmation";
      bookingMode: "remote";
      location: "En ligne";
      practiceId: null;
      specificity: "unconfirmed";
      isFallback: true;
      url: null;
      consultation: null;
      categoryId: null;
      motiveId: null;
      contactUrl: "tel:+33428295516";
    }
);

const LYON = {
  bookingMode: "in-person",
  location: "Lyon",
  practiceId: "practice-806420",
} as const;

function direct<S extends ServiceSlug>(serviceSlug: S, motive: UltrasoundMotive) {
  return {
    ...LYON,
    ...motive,
    serviceSlug,
    consultationType: "ultrasound",
    intendedConsultation: motive.consultation,
    status: "verified-direct",
    specificity: "exact",
    isFallback: false,
    reason: "Correspondance explicite entre l’examen décrit sur le site et le motif distinct fourni dans la catégorie 1.",
  } as const;
}

function fallback<S extends string>(
  serviceSlug: S,
  consultationType: ConsultationType,
  intendedConsultation: string,
  reason: string,
) {
  return {
    ...LYON,
    serviceSlug,
    consultationType,
    intendedConsultation,
    reason,
    status: "verified-category-fallback",
    specificity: "category-selection",
    isFallback: true,
    url: DOCTOLIB_BOOKING_URL,
    consultation: null,
    categoryId: null,
    motiveId: null,
  } as const;
}

/** Exhaustive by website slug; a new service must have an explicit decision. */
export const SERVICE_BOOKINGS = {
  "echographie-gynecologique": direct("echographie-gynecologique", DOCTOLIB_ULTRASOUND_MOTIVES.gynecologique),
  "echographie-datation": direct("echographie-datation", DOCTOLIB_ULTRASOUND_MOTIVES.datation),
  "echographie-1er-trimestre": direct("echographie-1er-trimestre", DOCTOLIB_ULTRASOUND_MOTIVES.t1),
  "echographie-2e-trimestre": direct("echographie-2e-trimestre", DOCTOLIB_ULTRASOUND_MOTIVES.t2),
  "echographie-3e-trimestre": direct("echographie-3e-trimestre", DOCTOLIB_ULTRASOUND_MOTIVES.t3),
  "echographie-obstetricale": fallback(
    "echographie-obstetricale", "ultrasound-overview", "Échographies obstétricales T1, T2, T3",
    "Page générale regroupant trois trimestres, sans motif unique. Les liens vers les pages T1/T2/T3 sont conservés ; aucun panneau de réservation propre au hub.",
  ),
  "suivi-grossesse": fallback(
    "suivi-grossesse", "consultation", "Consultation de suivi de grossesse",
    "Suivi mensuel, sans indication de grossesse pathologique ni échographie combinée. L’URL fournie pour le suivi partage le motif 7188954 avec plusieurs autres libellés ; sélection non univoque.",
  ),
  "suivi-gynecologie": fallback(
    "suivi-gynecologie", "consultation", "Consultation de gynécologie",
    "Consultation générale, et non échographie. Les six libellés gynécologiques partagent l’URL 171275/7188954 également fournie pour le suivi de grossesse ; aucun motif gynécologique n’est sélectionné de façon certaine.",
  ),
  "controle-sterilet": fallback(
    "controle-sterilet", "ultrasound-and-consultation", "Contrôle échographique du DIU, fils, tolérance et conseils",
    "Le contrôle de DIU n’est pas une pose ou un retrait. L’échographie gynécologique couvre l’imagerie mais ne garantit pas la consultation complète décrite (fils, tolérance, conseils) ; correspondance à confirmer avec le cabinet.",
  ),
  teleconsultation: {
    serviceSlug: "teleconsultation",
    consultationType: "consultation",
    intendedConsultation: "Téléconsultation par appel téléphonique",
    reason: "Aucune destination de téléconsultation vérifiée fournie. Contacter le cabinet ; ne pas transformer un lien telehealth=false en lien à distance.",
    bookingMode: "remote",
    location: "En ligne",
    practiceId: null,
    status: "requires-manual-confirmation",
    specificity: "unconfirmed",
    isFallback: true,
    url: null,
    consultation: null,
    categoryId: null,
    motiveId: null,
    contactUrl: "tel:+33428295516",
  },
} satisfies { [S in ServiceSlug]: BookingDestination & { serviceSlug: S } };

export function getServiceBooking(serviceSlug: string): BookingDestination {
  if (Object.hasOwn(SERVICE_BOOKINGS, serviceSlug)) {
    return SERVICE_BOOKINGS[serviceSlug as ServiceSlug];
  }
  return fallback(serviceSlug, "consultation", "Motif à choisir sur Doctolib", "Service inconnu : sélection des catégories du cabinet de Lyon.");
}
