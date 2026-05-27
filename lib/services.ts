/**
 * Canonical list of services offered by the cabinet.
 *
 * Each entry powers:
 *   - the dropdown in the main navigation
 *   - the cards on the home & /services pages
 *   - the per-service detail page at /services/[slug]
 *   - the Calendly widget on each detail page
 *
 * Replace the `calendlyUrl` values with real booking links when ready.
 */
export type Service = {
  slug: string;
  title: string;
  shortTitle?: string;
  tagline: string;
  description: string;
  durationMinutes: number;
  priceEUR?: number;
  location: "Miribel" | "Lyon" | "En ligne";
  calendlyUrl: string;
  category: "consultation" | "echographie" | "suivi";
  details?: string[];
};

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
    calendlyUrl: "https://calendly.com/dr-soldea/teleconsultation",
    details: [
      "Échange par appel téléphonique",
      "Renouvellement d'ordonnance",
      "Interprétation de résultats",
      "Confirmation par e-mail à la fin du rendez-vous",
    ],
  },
  {
    slug: "echographie-gynecologique",
    title: "Échographie gynécologique (pelvienne)",
    shortTitle: "Échographie gynécologique",
    tagline:
      "Exploration pelvienne par voie sus-pubienne et endo-vaginale.",
    description:
      "Examen approfondi de l'utérus, des ovaires et du pelvis pour le diagnostic et le suivi des pathologies gynécologiques (kystes, fibromes, endométriose, suivi DIU, bilan douleurs).",
    durationMinutes: 20,
    location: "Miribel",
    category: "echographie",
    calendlyUrl: "https://calendly.com/dr-soldea/echographie-gynecologique",
    details: [
      "Voie sus-pubienne et endo-vaginale",
      "Bilan de douleurs ou saignements",
      "Suivi de fibromes, kystes, endométriose",
      "Compte-rendu remis en fin de consultation",
    ],
  },
  {
    slug: "echographie-obstetricale",
    title: "Échographie obstétricale (T1 / T2 / T3)",
    shortTitle: "Échographie obstétricale",
    tagline:
      "Échographies de dépistage prénatal des 1er, 2e et 3e trimestres.",
    description:
      "Échographies agréées du réseau de périnatalité Aurore. Mesure de la clarté nucale, étude morphologique fœtale, croissance et bien-être fœtal — selon le trimestre de la grossesse.",
    durationMinutes: 30,
    location: "Miribel",
    category: "echographie",
    calendlyUrl: "https://calendly.com/dr-soldea/echographie-obstetricale",
    details: [
      "T1 — mesure de la clarté nucale & dépistage précoce (11-13 SA)",
      "T2 — échographie morphologique (22 SA)",
      "T3 — étude de la croissance et du bien-être fœtal (32 SA)",
      "Membre du réseau de périnatalité Aurore",
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
    calendlyUrl: "https://calendly.com/dr-soldea/suivi-grossesse",
    details: [
      "Examen clinique mensuel",
      "Prescription des examens biologiques",
      "Conseils & préparation à la naissance",
      "Coordination avec la maternité du CH Sainte-Foy-lès-Lyon",
    ],
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
    calendlyUrl: "https://calendly.com/dr-soldea/controle-sterilet",
    details: [
      "Contrôle échographique de la position",
      "Vérification des fils du stérilet",
      "Discussion de la tolérance",
      "Conseils de suivi",
    ],
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
    calendlyUrl: "https://calendly.com/dr-soldea/echographie-datation",
    details: [
      "Confirmation de la grossesse",
      "Datation précise du terme",
      "Détection précoce d'une grossesse multiple",
      "Calendrier des examens à venir",
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
    calendlyUrl: "https://calendly.com/dr-soldea/suivi-gynecologie",
    details: [
      "Examen gynécologique annuel",
      "Frottis & dépistages",
      "Conseils en contraception",
      "Accompagnement de la ménopause",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((service) => service.slug);
}
