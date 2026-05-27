import type { ServiceIconName } from "@/app/_components/ServiceIcon";

/**
 * Canonical list of services offered by the cabinet.
 *
 * Each entry powers:
 *   - the dropdown in the main navigation
 *   - the cards on the home & /services pages
 *   - the per-service detail page at /services/[slug]
 *   - the Calendly widget on each booking page
 *
 * Why each obstetric trimester is its own service
 * ------------------------------------------------
 * The doctor sent rich, distinct medical content for the 1er, 2e and 3e
 * trimester ultrasounds (Écho T1 / T2 / T3) and asked us to surface them
 * separately for SEO — each trimester targets its own search intent
 * (e.g. "échographie 1er trimestre Lyon" vs "échographie morphologique
 * Lyon"). They are modelled as three independent indexable services here.
 *
 * `echographie-obstetricale` is kept as a *category hub* page that ranks
 * for the broader "échographie obstétricale Lyon" query and funnels users
 * to the right trimester via `children`.
 */
export type ServiceVariant = {
  /** Short tab label, e.g. "1er trimestre (T1)". */
  label: string;
  /** Optional sub-line shown beneath the tab title. */
  sublabel?: string;
  /** Full Calendly URL for this trimester / sub-flow. */
  calendlyUrl: string;
};

export type ServiceSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type Service = {
  slug: string;
  title: string;
  shortTitle?: string;
  /** Ultra-short label for badges, e.g. "T1". */
  shortLabel?: string;
  tagline: string;
  /** Short pregnancy week range, e.g. "11–13 SA + 6 j". */
  weeks?: string;
  description: string;
  durationMinutes: number;
  /** Free-form duration string when the duration varies, e.g. "30 – 45 min". */
  durationLabel?: string;
  priceEUR?: number;
  location: "Miribel" | "Lyon" | "En ligne";
  /** Single-flow booking URL. Undefined for hub pages with `children`. */
  calendlyUrl?: string;
  /** Legacy multi-flow services. Kept for backward-compatibility (unused). */
  variants?: ServiceVariant[];
  /** Slug list of child services for a category-hub page. */
  children?: string[];
  category: "consultation" | "echographie" | "suivi";
  /** Higher-level grouping used for nav grouping & on-page grouping. */
  group?: "obstetrical";
  icon: ServiceIconName;
  details?: string[];
  /** Long-form SEO content: rendered as <h2>+<p>+<ul> on the detail page. */
  sections?: ServiceSection[];
  /** SEO meta description (≤160 chars). Falls back to `tagline`. */
  metaDescription?: string;
  /** Comma-separated SEO keywords. */
  keywords?: string[];
};

const PRIMARY_COLOR = "45bfcc";

const calendly = (eventSlug: string) =>
  `https://calendly.com/dralexandrasoldea/${eventSlug}?primary_color=${PRIMARY_COLOR}`;

/**
 * Geographic keywords reused across obstetric ultrasound pages. They
 * target the doctor's catchment: Miribel (where the cabinet is) and the
 * neighbouring Lyon agglomeration.
 */
const OBSTETRIC_GEO_KEYWORDS = [
  "Lyon",
  "Miribel",
  "Villeurbanne",
  "Saint-Maurice-de-Beynost",
  "Ain",
  "Rhône",
];

export const SERVICES: Service[] = [
  {
    slug: "teleconsultation",
    title: "Téléconsultation — en ligne",
    shortTitle: "Téléconsultation",
    tagline:
      "Une consultation à distance pour vos questions, prescriptions et résultats.",
    description:
      "Une consultation à distance de 15 minutes par appel téléphonique. Idéale pour le renouvellement d'ordonnance, l'interprétation de résultats ou un échange avec le docteur Soldea avant un rendez-vous en cabinet.",
    durationMinutes: 15,
    priceEUR: 65,
    location: "En ligne",
    category: "consultation",
    icon: "video",
    calendlyUrl: calendly("teleconsultation-en-ligne"),
    details: [
      "Échange par appel téléphonique",
      "Renouvellement d'ordonnance",
      "Interprétation de résultats",
      "Confirmation par e-mail à la fin du rendez-vous",
    ],
    keywords: ["téléconsultation gynécologue", "consultation à distance Lyon"],
  },
  {
    slug: "echographie-gynecologique",
    title: "Échographie gynécologique (pelvienne)",
    shortTitle: "Échographie gynécologique",
    tagline: "Exploration pelvienne par voie sus-pubienne et endo-vaginale.",
    description:
      "Examen approfondi de l'utérus, des ovaires et du pelvis pour le diagnostic et le suivi des pathologies gynécologiques (kystes, fibromes, endométriose, suivi DIU, bilan douleurs).",
    durationMinutes: 20,
    location: "Miribel",
    category: "echographie",
    icon: "sonogram",
    calendlyUrl: calendly("echographie-gynecologique-pelvienne"),
    details: [
      "Voie sus-pubienne et endo-vaginale",
      "Bilan de douleurs ou saignements",
      "Suivi de fibromes, kystes, endométriose",
      "Compte-rendu remis en fin de consultation",
    ],
    keywords: [
      "échographie pelvienne Lyon",
      "échographie gynécologique Miribel",
      "endométriose",
    ],
  },
  {
    slug: "echographie-obstetricale",
    title: "Échographies obstétricales à Lyon & Miribel",
    shortTitle: "Échographie obstétricale",
    tagline:
      "Les trois échographies obligatoires du suivi de grossesse — T1, T2, T3.",
    description:
      "Échographiste agréée du réseau de périnatalité Aurore, le Dr. Alexandra Soldea réalise les trois échographies de dépistage prénatal recommandées : 1er trimestre (clarté nucale), 2e trimestre (morphologique) et 3e trimestre (croissance). Examens réalisés au cabinet de Miribel — à 15 minutes du centre de Lyon.",
    durationMinutes: 30,
    location: "Miribel",
    category: "echographie",
    group: "obstetrical",
    icon: "fetus",
    children: [
      "echographie-1er-trimestre",
      "echographie-2e-trimestre",
      "echographie-3e-trimestre",
    ],
    details: [
      "Échographiste agréée du réseau de périnatalité Aurore",
      "Trois trimestres : T1 (clarté nucale), T2 (morphologique), T3 (croissance)",
      "Compte-rendu remis en main propre à l'issue de l'examen",
      "Cabinet à Miribel — facilement accessible depuis Lyon et l'Ain",
    ],
    metaDescription:
      "Échographies obstétricales à Lyon & Miribel — 1er, 2e et 3e trimestre. Dr. Alexandra Soldea, échographiste agréée du réseau de périnatalité Aurore.",
    keywords: [
      "échographie obstétricale Lyon",
      "échographie grossesse Lyon",
      "échographiste agréée Aurore",
      ...OBSTETRIC_GEO_KEYWORDS,
    ],
  },
  {
    slug: "echographie-1er-trimestre",
    title: "Échographie du 1er trimestre (Écho T1) à Lyon",
    shortTitle: "Échographie 1er trimestre",
    shortLabel: "T1",
    tagline:
      "Datation, vitalité fœtale et mesure de la clarté nucale pour le dépistage de la trisomie 21.",
    weeks: "11 – 13 SA + 6 j",
    durationLabel: "20 – 30 min",
    description:
      "L'échographie du 1er trimestre, ou écho T1, est un examen essentiel du suivi de grossesse. Réalisée entre 11 et 13 semaines + 6 jours d'aménorrhée, elle confirme l'évolution normale de la grossesse, mesure la clarté nucale dans le cadre du dépistage de la trisomie 21 et permet de dater précisément le terme.",
    durationMinutes: 25,
    location: "Miribel",
    category: "echographie",
    group: "obstetrical",
    icon: "fetus",
    calendlyUrl: calendly("echographie-obstetricale-1er-trimestre"),
    details: [
      "Réalisée entre 11 SA et 13 SA + 6 jours",
      "Voie abdominale, parfois complétée par voie endo-vaginale",
      "Examen indolore de 20 à 30 minutes",
      "Compte-rendu remis en main propre",
    ],
    sections: [
      {
        heading: "À quoi sert l'échographie du 1er trimestre ?",
        body: "L'écho T1 est le premier rendez-vous d'imagerie de votre grossesse. Elle est réalisée par voie abdominale, parfois complétée par une échographie endo-vaginale, et permet en particulier de :",
        bullets: [
          "Confirmer l'évolution normale de la grossesse",
          "Vérifier la vitalité embryonnaire et le nombre de bébés",
          "Mesurer la clarté nucale dans le cadre du dépistage de la trisomie 21",
          "Contrôler la croissance et l'anatomie précoce du fœtus",
          "Déterminer la date prévue d'accouchement",
          "Dépister certaines anomalies dès le début de la grossesse",
        ],
      },
      {
        heading: "Comment se déroule l'examen ?",
        body: "L'échographie est réalisée par voie abdominale, en position allongée, à l'aide d'une sonde appliquée sur le ventre avec un gel transparent. Une voie endo-vaginale peut être proposée si nécessaire pour mieux visualiser le fœtus en début de grossesse. L'examen est indolore et dure généralement entre 20 et 30 minutes.",
      },
      {
        heading: "Quand prendre rendez-vous ?",
        body: "L'écho T1 doit être planifiée entre 11 SA et 13 SA + 6 jours d'aménorrhée. Idéalement, prenez rendez-vous dès la confirmation de votre grossesse pour vous garantir un créneau dans cette fenêtre.",
      },
    ],
    metaDescription:
      "Échographie du 1er trimestre (Écho T1) à Lyon & Miribel — entre 11 et 13 SA + 6 j. Datation, vitalité fœtale, mesure de la clarté nucale. Réseau Aurore.",
    keywords: [
      "échographie 1er trimestre Lyon",
      "écho T1 Lyon",
      "clarté nucale",
      "datation grossesse",
      "dépistage trisomie 21",
      ...OBSTETRIC_GEO_KEYWORDS,
    ],
  },
  {
    slug: "echographie-2e-trimestre",
    title: "Échographie du 2e trimestre (Écho T2) à Lyon",
    shortTitle: "Échographie 2e trimestre",
    shortLabel: "T2",
    tagline:
      "Échographie morphologique : étude détaillée du cerveau, du cœur, des reins, de la colonne et des membres du bébé.",
    weeks: "22 – 24 SA",
    durationLabel: "30 – 45 min",
    description:
      "L'échographie du 2e trimestre, aussi appelée écho T2 ou échographie morphologique, est un examen clé du suivi de grossesse. Réalisée entre 22 et 24 semaines d'aménorrhée, elle étudie en détail l'anatomie du bébé et permet de dépister d'éventuelles malformations.",
    durationMinutes: 35,
    location: "Miribel",
    category: "echographie",
    group: "obstetrical",
    icon: "fetus",
    calendlyUrl: calendly("echographie-obstetricale-2e-trimestre"),
    details: [
      "Réalisée entre 22 et 24 SA",
      "Voie abdominale uniquement",
      "Examen indolore de 30 à 45 minutes",
      "Étude morphologique complète et compte-rendu détaillé",
    ],
    sections: [
      {
        heading: "À quoi sert l'échographie du 2e trimestre ?",
        body: "L'échographie morphologique du 2e trimestre est l'examen le plus complet du suivi de grossesse. Elle permet de :",
        bullets: [
          "Vérifier la croissance du fœtus",
          "Étudier l'anatomie du bébé de manière approfondie",
          "Contrôler le cerveau, le cœur, les reins, la colonne vertébrale et les membres",
          "Examiner le placenta et la quantité de liquide amniotique",
          "Dépister certaines malformations ou anomalies morphologiques",
          "Suivre le bon déroulement de la grossesse",
        ],
      },
      {
        heading: "Un moment important pour les futurs parents",
        body: "Au-delà de sa portée médicale, l'écho T2 est un moment fort pour les futurs parents : les images sont plus précises, et la morphologie du bébé est désormais bien visible.",
      },
      {
        heading: "Comment se déroule l'examen ?",
        body: "L'examen est réalisé par voie abdominale, à l'aide d'une sonde d'échographie. Il est indolore et dure en moyenne entre 30 et 45 minutes, selon la position du bébé. Un compte-rendu détaillé vous est remis à l'issue de la consultation.",
      },
    ],
    metaDescription:
      "Échographie morphologique du 2e trimestre (Écho T2) à Lyon & Miribel — entre 22 et 24 SA. Étude anatomique détaillée du bébé. Réseau Aurore.",
    keywords: [
      "échographie morphologique Lyon",
      "écho T2 Lyon",
      "échographie 2e trimestre",
      "échographie morphologique Miribel",
      ...OBSTETRIC_GEO_KEYWORDS,
    ],
  },
  {
    slug: "echographie-3e-trimestre",
    title: "Échographie du 3e trimestre (Écho T3) à Lyon",
    shortTitle: "Échographie 3e trimestre",
    shortLabel: "T3",
    tagline:
      "Croissance fœtale, position avant l'accouchement, placenta — images 3D/4D possibles.",
    weeks: "31 – 34 SA",
    durationLabel: "20 – 40 min",
    description:
      "L'échographie du 3e trimestre, ou écho T3, est réalisée entre 31 et 34 semaines d'aménorrhée. Elle permet de contrôler la croissance du bébé, sa position et son bien-être, afin de préparer la fin de grossesse dans les meilleures conditions.",
    durationMinutes: 30,
    location: "Miribel",
    category: "echographie",
    group: "obstetrical",
    icon: "fetus",
    calendlyUrl: calendly("echographie-obstetricale-3e-trimestre"),
    details: [
      "Réalisée entre 31 et 34 SA",
      "Voie abdominale",
      "Examen indolore de 20 à 40 minutes",
      "Images 3D/4D possibles selon les conditions",
    ],
    sections: [
      {
        heading: "À quoi sert l'échographie du 3e trimestre ?",
        body: "L'écho T3 est l'échographie de la fin de grossesse. Elle permet en particulier de :",
        bullets: [
          "Vérifier la croissance et le poids estimé du bébé",
          "Contrôler la position fœtale avant l'accouchement",
          "Évaluer le placenta et la quantité de liquide amniotique",
          "Étudier le fonctionnement du cœur et les mouvements du bébé",
          "Contrôler le cerveau, la colonne vertébrale et les organes principaux",
          "Dépister certaines anomalies tardives de croissance ou de circulation",
        ],
      },
      {
        heading: "Images 3D / 4D pendant l'écho T3",
        body: "Lors de l'échographie du 3e trimestre, des images 3D ou 4D peuvent être réalisées pour obtenir des vues détaillées du visage, du profil et des mouvements du bébé — un complément précieux à l'examen médical.",
      },
      {
        heading: "Comment se déroule l'examen ?",
        body: "L'écho T3 est réalisée par voie abdominale et dure généralement entre 20 et 40 minutes selon la position du bébé. L'examen est indolore et fait partie du suivi obstétrical recommandé.",
      },
    ],
    metaDescription:
      "Échographie du 3e trimestre (Écho T3) à Lyon & Miribel — entre 31 et 34 SA. Croissance, position, placenta, images 3D/4D possibles. Réseau Aurore.",
    keywords: [
      "échographie 3e trimestre Lyon",
      "écho T3 Lyon",
      "échographie 3D 4D Lyon",
      "échographie de croissance",
      ...OBSTETRIC_GEO_KEYWORDS,
    ],
  },
  {
    slug: "suivi-grossesse",
    title: "RDV de suivi de grossesse",
    shortTitle: "Suivi de grossesse",
    tagline:
      "Un accompagnement personnalisé tout au long de votre grossesse.",
    description:
      "Consultation mensuelle de suivi obstétrical : examen clinique, surveillance biologique, conseils, préparation à l'accouchement et coordination avec la maternité.",
    durationMinutes: 30,
    location: "Miribel",
    category: "suivi",
    icon: "calendar-heart",
    // Note: the Calendly slug has 3 'sss' in `grossessse` — kept verbatim.
    calendlyUrl: calendly("rdv-de-suivi-de-grossessse"),
    details: [
      "Examen clinique mensuel",
      "Prescription des examens biologiques",
      "Conseils & préparation à la naissance",
      "Coordination avec la maternité du CH Sainte-Foy-lès-Lyon",
    ],
    keywords: ["suivi grossesse Lyon", "obstétricienne Lyon", "gynécologue Miribel"],
  },
  {
    slug: "controle-sterilet",
    title: "Contrôle de stérilet (DIU)",
    shortTitle: "Contrôle de DIU",
    tagline: "Vérification du positionnement et du bon état de votre DIU.",
    description:
      "Consultation dédiée au contrôle échographique de votre stérilet (cuivre ou hormonal) : vérification de la position, état des fils, tolérance et conseils.",
    durationMinutes: 20,
    location: "Miribel",
    category: "suivi",
    icon: "iud",
    calendlyUrl: calendly("controle-de-sterilet-diu"),
    details: [
      "Contrôle échographique de la position",
      "Vérification des fils du stérilet",
      "Discussion de la tolérance",
      "Conseils de suivi",
    ],
    keywords: ["contrôle stérilet Lyon", "DIU Lyon", "stérilet gynécologue"],
  },
  {
    slug: "echographie-datation",
    title: "Échographie de datation",
    shortTitle: "Échographie de datation",
    tagline: "Confirmer et dater précisément votre grossesse débutante.",
    description:
      "Échographie précoce (entre 6 et 10 SA) pour confirmer la viabilité de la grossesse, dater son début et préparer le calendrier des examens à venir.",
    durationMinutes: 20,
    location: "Miribel",
    category: "echographie",
    icon: "date",
    calendlyUrl: calendly("echographie-de-datation"),
    details: [
      "Confirmation de la grossesse",
      "Datation précise du terme",
      "Détection précoce d'une grossesse multiple",
      "Calendrier des examens à venir",
    ],
    keywords: [
      "échographie datation Lyon",
      "échographie précoce grossesse",
      "confirmation grossesse Miribel",
    ],
  },
  {
    slug: "suivi-gynecologie",
    title: "RDV de suivi de gynécologie",
    shortTitle: "Suivi de gynécologie",
    tagline:
      "Consultation annuelle, contraception, dépistage et ménopause.",
    description:
      "Consultation gynécologique générale : suivi annuel, contraception, frottis et dépistages, ménopause, contraception d'urgence, prévention.",
    durationMinutes: 30,
    location: "Miribel",
    category: "consultation",
    icon: "feminine",
    calendlyUrl: calendly("rdv-de-suivi-de-gynecologie"),
    details: [
      "Examen gynécologique annuel",
      "Frottis & dépistages",
      "Conseils en contraception",
      "Accompagnement de la ménopause",
    ],
    keywords: [
      "gynécologue Lyon",
      "consultation gynécologique Miribel",
      "contraception",
      "ménopause",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((service) => service.slug);
}

/** Services that appear directly in the primary navigation dropdown. */
export const NAV_SERVICES: Service[] = SERVICES.filter(
  // Hide individual trimester pages from the top-level dropdown — they are
  // surfaced via the obstetric hub page and the dedicated home section.
  (s) => s.slug !== "echographie-1er-trimestre"
    && s.slug !== "echographie-2e-trimestre"
    && s.slug !== "echographie-3e-trimestre",
);

/** Resolve a list of child services by slug, preserving order. */
export function getChildServices(parent: Service): Service[] {
  if (!parent.children) return [];
  return parent.children
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => Boolean(s));
}

/** Returns the three obstetric trimester services in order T1 → T2 → T3. */
export function getObstetricTrimesters(): Service[] {
  const hub = getServiceBySlug("echographie-obstetricale");
  if (!hub) return [];
  return getChildServices(hub);
}
