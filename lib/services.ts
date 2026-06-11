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

/**
 * Single FAQ entry. Pages declaring `faqs` will both render them visually
 * AND emit a `FAQPage` JSON-LD block (see `lib/seo.ts → faqPageJsonLd`),
 * which Google may surface as expandable Q&A rich results in SERPs.
 *
 * Answers should be self-contained, ≈40–80 words, written in plain French
 * patient-facing language.
 */
export type ServiceFaq = {
  question: string;
  answer: string;
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
  /**
   * Patient-facing FAQs. Rendered as an accordion at the bottom of the
   * service page AND emitted as `FAQPage` JSON-LD for rich results.
   */
  faqs?: ServiceFaq[];
  /** Short `<title>` for SERPs (≤35 chars before layout template). */
  seoTitle?: string;
  /** SEO meta description (120–155 chars). Falls back to `tagline`. */
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
    seoTitle: "Téléconsultation gynécologique",
    metaDescription:
      "Téléconsultation gynécologique par téléphone : ordonnances, résultats, conseils. Dr. Alexandra Soldea, 15 min, remboursée par la Sécurité sociale.",
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
    faqs: [
      {
        question: "Dans quels cas une téléconsultation gynécologique est-elle adaptée ?",
        answer:
          "La téléconsultation est adaptée aux situations qui ne nécessitent pas d'examen clinique : renouvellement d'une contraception ou d'un traitement, interprétation de résultats biologiques ou d'imagerie, conseils en cas de symptômes simples, second avis ou échange préparatoire à une consultation en cabinet. En cas de doute, le Dr. Soldea vous orientera vers une consultation en présentiel à Miribel.",
      },
      {
        question: "La téléconsultation est-elle remboursée par la Sécurité sociale ?",
        answer:
          "Oui. Depuis 2018, les téléconsultations médicales sont remboursées par l'Assurance Maladie dans les mêmes conditions qu'une consultation en cabinet, à condition d'être réalisées par un médecin conventionné. Le règlement s'effectue à la fin du rendez-vous ; le complément éventuel est pris en charge par votre mutuelle.",
      },
      {
        question: "Comment se déroule la téléconsultation et faut-il une application ?",
        answer:
          "La téléconsultation se déroule par appel téléphonique simple à l'heure du rendez-vous — aucune application à installer. Préparez votre carte Vitale, votre ordonnance ou vos résultats si applicable, et installez-vous dans un endroit calme. Une confirmation et une ordonnance électronique (si nécessaire) vous sont envoyées par e-mail à la fin de la consultation.",
      },
      {
        question: "Puis-je obtenir une ordonnance lors d'une téléconsultation ?",
        answer:
          "Oui. Le Dr. Soldea peut établir une ordonnance médicale lors de la téléconsultation et vous l'envoyer par e-mail au format dématérialisé, accepté par toutes les pharmacies. C'est le cas notamment pour les renouvellements de contraception ou les prescriptions d'examens biologiques et d'imagerie.",
      },
    ],
    keywords: [
      "téléconsultation gynécologue Lyon",
      "consultation gynécologique à distance",
      "téléconsultation Lyon",
      "renouvellement ordonnance gynécologie",
    ],
  },
  {
    slug: "echographie-gynecologique",
    title: "Échographie gynécologique (pelvienne) à Lyon & Miribel",
    shortTitle: "Échographie gynécologique",
    seoTitle: "Échographie pelvienne à Lyon",
    tagline:
      "Exploration pelvienne par voie sus-pubienne et endo-vaginale — utérus, ovaires, pelvis.",
    description:
      "Examen d'imagerie approfondi de l'utérus, des ovaires et du pelvis pour le diagnostic et le suivi des principales pathologies gynécologiques : kystes ovariens, fibromes utérins, endométriose, polypes endométriaux, contrôle de stérilet (DIU), bilan de douleurs pelviennes et de saignements anormaux. Réalisée au cabinet du Dr. Alexandra Soldea à Miribel, à 15 minutes de Lyon, par une praticienne titulaire du DIU d'échographie gynécologique et obstétricale (Paris Descartes).",
    durationMinutes: 20,
    location: "Miribel",
    category: "echographie",
    icon: "sonogram",
    calendlyUrl: calendly("echographie-gynecologique-pelvienne"),
    details: [
      "Voie sus-pubienne et endo-vaginale",
      "Bilan de douleurs ou de saignements anormaux",
      "Suivi de fibromes, kystes, endométriose, polypes",
      "Compte-rendu remis en fin de consultation",
    ],
    sections: [
      {
        heading: "Quand faire une échographie pelvienne ?",
        body: "L'échographie gynécologique pelvienne est l'examen d'imagerie de référence pour explorer l'utérus, les ovaires et la cavité pelvienne. Elle peut être prescrite dans de nombreuses situations cliniques :",
        bullets: [
          "Douleurs pelviennes ou règles douloureuses (dysménorrhée)",
          "Saignements anormaux ou règles abondantes (ménorragies)",
          "Suspicion ou suivi d'un kyste ovarien",
          "Suivi de fibromes utérins (myomes)",
          "Bilan d'endométriose pelvienne",
          "Contrôle de stérilet (DIU cuivre ou hormonal)",
          "Bilan d'infertilité ou suivi d'ovulation",
          "Suivi de polypes endométriaux",
        ],
      },
      {
        heading: "Comment se déroule l'examen ?",
        body: "L'échographie pelvienne est généralement réalisée en deux temps. La voie sus-pubienne (sonde appliquée sur le bas-ventre avec un gel transparent, vessie modérément remplie) offre une vue d'ensemble du pelvis. La voie endo-vaginale (sonde fine introduite dans le vagin, vessie vide) permet ensuite une analyse beaucoup plus précise de l'utérus, de l'endomètre et des ovaires. L'examen dure 15 à 20 minutes, est indolore et ne nécessite pas de préparation lourde. Le compte-rendu vous est remis en main propre à la fin de la consultation.",
      },
      {
        heading: "À quel moment du cycle ?",
        body: "Pour la majorité des indications, l'échographie est idéalement réalisée en début de cycle, entre le 6e et le 10e jour, juste après les règles : l'endomètre est alors fin et la cavité utérine bien analysable. Pour un suivi d'ovulation ou un bilan d'infertilité, d'autres jours du cycle sont nécessaires. Suivez l'indication de votre prescripteur ou demandez conseil au cabinet lors de la prise de rendez-vous.",
      },
    ],
    faqs: [
      {
        question:
          "Faut-il avoir la vessie pleine pour l'échographie pelvienne ?",
        answer:
          "Oui, partiellement. La première partie de l'examen, par voie sus-pubienne, nécessite une vessie modérément remplie : buvez environ 50 cl d'eau dans l'heure qui précède le rendez-vous, sans aller aux toilettes. La seconde partie, par voie endo-vaginale, se fait au contraire vessie vide — vous pourrez donc uriner entre les deux temps de l'examen.",
      },
      {
        question:
          "À quel moment du cycle faire une échographie gynécologique ?",
        answer:
          "Pour un bilan standard, l'échographie pelvienne est idéalement réalisée entre le 6e et le 10e jour du cycle, juste après les règles. À ce moment, l'endomètre est fin et la cavité utérine est bien analysable. Pour un suivi d'ovulation ou un bilan d'infertilité, d'autres jours du cycle peuvent être indiqués — suivez la prescription de votre médecin.",
      },
      {
        question: "L'échographie endo-vaginale est-elle douloureuse ?",
        answer:
          "Non, l'échographie endo-vaginale est généralement indolore. La sonde est fine, lubrifiée et introduite délicatement. La gêne est minime et cette partie de l'examen ne dure que quelques minutes. Si vous êtes vierge ou particulièrement anxieuse, prévenez le Dr. Soldea en début de consultation : l'examen peut être adapté ou limité à la seule voie sus-pubienne.",
      },
      {
        question:
          "L'échographie gynécologique est-elle remboursée par la Sécurité sociale ?",
        answer:
          "Oui. L'échographie pelvienne est conventionnée et prise en charge par l'Assurance Maladie sur prescription médicale (médecin traitant, gynécologue ou sage-femme). Le règlement s'effectue sur place après l'examen, et votre mutuelle prend en charge le complément éventuel selon votre contrat. Pensez à apporter votre carte Vitale et votre ordonnance.",
      },
      {
        question:
          "Où est réalisée l'échographie ? Le cabinet est-il accessible depuis Lyon ?",
        answer:
          "L'échographie gynécologique est réalisée au cabinet du Dr. Alexandra Soldea, 63 place de la République à Miribel (01700), à environ 15 minutes du centre de Lyon par la D1084. Le cabinet est facilement accessible en voiture (parking à proximité) et dessert toute la métropole de Lyon (Villeurbanne, Caluire, Rillieux-la-Pape, Vaulx-en-Velin) ainsi que la Côtière de l'Ain.",
      },
      {
        question: "Faut-il une ordonnance pour une échographie pelvienne ?",
        answer:
          "Oui, une prescription médicale est nécessaire pour bénéficier du remboursement par l'Assurance Maladie. Elle est délivrée par votre médecin traitant, votre gynécologue ou votre sage-femme. Pensez à apporter l'ordonnance, votre carte Vitale et — si possible — vos précédents comptes-rendus d'échographie le jour du rendez-vous, pour comparer l'évolution.",
      },
    ],
    metaDescription:
      "Échographie pelvienne à Lyon et Miribel : utérus, ovaires, pelvis. Bilan endométriose, fibromes, kystes et contrôle de stérilet (DIU).",
    keywords: [
      "échographie gynécologique Lyon",
      "échographie pelvienne Lyon",
      "échographie pelvienne Miribel",
      "endométriose Lyon",
      "kyste ovarien",
      "fibrome utérin",
      "bilan douleur pelvienne",
      "contrôle stérilet DIU",
    ],
  },
  {
    slug: "echographie-obstetricale",
    title: "Échographies obstétricales à Lyon & Miribel",
    shortTitle: "Échographie obstétricale",
    seoTitle: "Échographie obstétricale à Lyon",
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
    faqs: [
      {
        question:
          "Combien d'échographies sont obligatoires pendant la grossesse ?",
        answer:
          "La Haute Autorité de Santé recommande trois échographies de dépistage pendant une grossesse normale : l'écho du 1er trimestre (entre 11 et 13 SA + 6 jours), l'écho du 2e trimestre dite morphologique (entre 22 et 24 SA), et l'écho du 3e trimestre (entre 31 et 34 SA). Au cabinet du Dr. Alexandra Soldea à Miribel, les trois sont réalisées par une échographiste agréée du réseau Aurore.",
      },
      {
        question:
          "Les échographies de grossesse sont-elles remboursées par la Sécurité sociale ?",
        answer:
          "Oui. Les trois échographies de dépistage prénatal recommandées (T1, T2, T3) sont remboursées par l'Assurance Maladie sur prescription médicale, dans le cadre du suivi de grossesse. La prise en charge est de 70 % jusqu'au 5e mois, puis 100 % à partir du 6e mois de grossesse.",
      },
      {
        question:
          "Pourquoi choisir une échographiste agréée du réseau Aurore ?",
        answer:
          "Le réseau de périnatalité Aurore agrée les échographistes formés au dépistage de la trisomie 21 par la mesure de la clarté nucale. L'agrément garantit le respect d'un protocole strict de qualité d'image, de mesure et de compte-rendu — exigé par l'Assurance Maladie pour la prise en charge du dépistage combiné du 1er trimestre.",
      },
      {
        question:
          "Le cabinet est à Miribel — est-ce accessible depuis Lyon ?",
        answer:
          "Oui. Le cabinet du Dr. Alexandra Soldea est situé 63 place de la République à Miribel (01700), à environ 15 minutes du centre de Lyon par la D1084. Il est facilement accessible en voiture (parking à proximité) et dessert toute la métropole de Lyon ainsi que l'Ain et la Côtière.",
      },
      {
        question: "Faut-il un rendez-vous pour une échographie obstétricale ?",
        answer:
          "Oui, les échographies de grossesse sont réalisées exclusivement sur rendez-vous. Vous pouvez réserver votre créneau en ligne 24 h/24 directement sur ce site, en choisissant le trimestre concerné. Confirmation immédiate par e-mail.",
      },
    ],
    metaDescription:
      "Échographies obstétricales T1, T2 et T3 à Lyon et Miribel. Échographiste agréée réseau Aurore. Prise de rendez-vous en ligne.",
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
    seoTitle: "Échographie T1 à Lyon",
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
    faqs: [
      {
        question:
          "À quel terme faire l'échographie du 1er trimestre à Lyon ?",
        answer:
          "L'écho T1 doit être réalisée entre 11 SA et 13 SA + 6 jours d'aménorrhée. Cette fenêtre est essentielle pour mesurer correctement la clarté nucale dans le cadre du dépistage de la trisomie 21. Il est conseillé de prendre rendez-vous dès la confirmation de votre grossesse pour vous garantir un créneau dans la fenêtre recommandée.",
      },
      {
        question: "Que mesure exactement la clarté nucale ?",
        answer:
          "La clarté nucale est une fine zone liquidienne située sous la peau de la nuque du fœtus. Sa mesure échographique entre 11 et 13 SA + 6 j, combinée à une prise de sang (dépistage combiné du 1er trimestre), permet d'évaluer le risque de trisomie 21 (syndrome de Down) et de quelques autres anomalies chromosomiques.",
      },
      {
        question: "Faut-il être à jeun pour l'écho T1 ?",
        answer:
          "Non, il n'est pas nécessaire d'être à jeun pour l'échographie du 1er trimestre. Il est en revanche utile d'avoir la vessie modérément remplie pour faciliter la visualisation par voie abdominale — il suffit de boire un verre d'eau environ 30 minutes avant le rendez-vous.",
      },
      {
        question: "L'écho T1 est-elle douloureuse ?",
        answer:
          "Non. L'échographie est un examen totalement indolore et sans danger pour la mère comme pour le bébé. Elle est réalisée par voie abdominale, parfois complétée par une voie endo-vaginale en début de grossesse pour mieux visualiser le fœtus. L'examen dure entre 20 et 30 minutes.",
      },
      {
        question: "Combien coûte l'échographie du 1er trimestre ?",
        answer:
          "Le tarif est conventionné par la Sécurité sociale et remboursé à 70 % par l'Assurance Maladie sur prescription médicale. Le complément est généralement pris en charge par la mutuelle. Le règlement s'effectue sur place après l'examen ; le compte-rendu détaillé vous est remis en main propre.",
      },
    ],
    metaDescription:
      "Échographie du 1er trimestre à Lyon et Miribel (11–13 SA). Clarté nucale, datation et vitalité fœtale. Échographiste agréée réseau Aurore.",
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
    seoTitle: "Échographie T2 à Lyon",
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
    faqs: [
      {
        question:
          "À quel terme faire l'échographie morphologique (T2) à Lyon ?",
        answer:
          "L'écho T2, dite morphologique, doit être réalisée entre 22 et 24 SA d'aménorrhée. C'est le moment où l'anatomie du bébé est suffisamment développée pour être étudiée en détail tout en restant entièrement visible à l'échographie. Prenez rendez-vous dès la confirmation de votre grossesse pour vous garantir un créneau.",
      },
      {
        question: "Que voit-on à l'échographie morphologique du 2e trimestre ?",
        answer:
          "L'écho T2 est l'examen le plus complet du suivi de grossesse. Elle permet d'étudier en détail le cerveau, le cœur, les reins, la colonne vertébrale et les membres du bébé, de vérifier sa croissance, d'examiner le placenta et la quantité de liquide amniotique, et de dépister les principales malformations morphologiques.",
      },
      {
        question: "Combien de temps dure l'échographie du 2e trimestre ?",
        answer:
          "L'écho T2 dure en moyenne 30 à 45 minutes, selon la position du bébé. Si le fœtus est dans une position défavorable à l'analyse de certains organes, il peut être nécessaire de programmer un complément d'examen. Un compte-rendu détaillé vous est remis à la fin de la consultation.",
      },
      {
        question: "Faut-il être à jeun pour l'écho T2 ?",
        answer:
          "Non. L'échographie morphologique ne nécessite ni jeûne, ni vessie pleine. Présentez-vous simplement à l'heure prévue avec votre carte Vitale, votre prescription, votre carnet de maternité et les comptes-rendus de vos échographies précédentes.",
      },
      {
        question: "Peut-on connaître le sexe du bébé à l'écho T2 ?",
        answer:
          "Oui, dans la majorité des cas le sexe du bébé est identifiable à l'échographie du 2e trimestre, sauf si sa position rend l'observation difficile. Précisez en début d'examen si vous souhaitez ou non connaître le sexe — le Dr. Soldea respecte votre choix.",
      },
    ],
    metaDescription:
      "Échographie morphologique du 2e trimestre à Lyon et Miribel (22–24 SA). Examen anatomique détaillé du bébé. Réseau Aurore.",
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
    seoTitle: "Échographie T3 à Lyon",
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
    faqs: [
      {
        question: "À quel terme faire l'échographie du 3e trimestre à Lyon ?",
        answer:
          "L'écho T3 doit être réalisée entre 31 et 34 SA d'aménorrhée. Elle complète le suivi obstétrical et permet d'évaluer la croissance du bébé et de préparer la fin de grossesse dans les meilleures conditions. Pensez à prendre rendez-vous quelques semaines à l'avance, après votre rendez-vous obstétrical du 7e mois.",
      },
      {
        question:
          "Les images 3D / 4D sont-elles systématiques lors de l'écho T3 ?",
        answer:
          "Les images 3D et 4D ne sont pas obligatoires : ce sont des vues complémentaires à l'examen médical, qui peuvent être réalisées lorsque la position du bébé et la qualité de l'imagerie le permettent. Au cabinet du Dr. Soldea à Miribel, elles sont proposées dans le cadre standard de l'écho T3, sans surcoût.",
      },
      {
        question: "Faut-il une vessie pleine pour l'échographie du 3e trimestre ?",
        answer:
          "Non, une vessie pleine n'est pas nécessaire pour l'écho T3 — le bébé est suffisamment grand pour être visualisé sans contraste vésical. L'examen est réalisé par voie abdominale, en position allongée, et dure entre 20 et 40 minutes.",
      },
      {
        question: "Que regarde-t-on à l'écho T3 ?",
        answer:
          "L'écho T3 contrôle la croissance et le poids estimé du bébé, sa position avant l'accouchement (céphalique, siège, transverse), l'état du placenta et la quantité de liquide amniotique, le fonctionnement du cœur, et les organes principaux. Elle permet aussi de dépister certaines anomalies tardives de croissance ou de circulation placentaire.",
      },
      {
        question:
          "Que faire si le bébé est mal positionné lors de l'examen ?",
        answer:
          "Si le bébé est en siège ou en transverse à l'écho T3, ne vous inquiétez pas — la majorité des bébés se positionnent en céphalique avant l'accouchement. Le compte-rendu est transmis à l'obstétricien qui suit votre grossesse, et un contrôle peut être programmé en fin de grossesse si nécessaire.",
      },
    ],
    metaDescription:
      "Échographie du 3e trimestre à Lyon et Miribel (31–34 SA). Croissance, position et placenta. Images 3D/4D possibles. Réseau Aurore.",
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
    seoTitle: "Suivi de grossesse à Lyon",
    metaDescription:
      "Suivi de grossesse avec le Dr. Alexandra Soldea à Lyon et Miribel : consultations mensuelles, examens et préparation à la naissance.",
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
    faqs: [
      {
        question: "À quelle fréquence consulter pour le suivi de grossesse ?",
        answer:
          "Le suivi de grossesse comporte une consultation mensuelle obligatoire à partir du 4e mois (4e, 5e, 6e, 7e, 8e et 9e mois). Au cabinet du Dr. Soldea à Miribel, chaque consultation comprend l'examen clinique, la prescription des examens biologiques recommandés, des conseils personnalisés et la coordination avec la maternité où aura lieu l'accouchement.",
      },
      {
        question: "Quels examens sont prescrits pendant le suivi de grossesse ?",
        answer:
          "Le suivi standard comprend : les trois échographies de dépistage (T1, T2, T3), le dépistage combiné de la trisomie 21 au 1er trimestre, les sérologies recommandées (toxoplasmose, rubéole, VIH, etc.), le test du diabète gestationnel entre 24 et 28 SA, le prélèvement vaginal du streptocoque B en fin de grossesse et l'entretien prénatal précoce.",
      },
      {
        question: "Où aura lieu l'accouchement après le suivi ?",
        answer:
          "Le Dr. Soldea exerce également comme praticien hospitalier à la maternité du Centre Hospitalier de Sainte-Foy-lès-Lyon, où elle peut assurer la continuité du suivi et pratiquer les accouchements. Vous pouvez également choisir la maternité de votre choix dans la métropole de Lyon — le suivi sera coordonné avec l'équipe obstétricale de l'établissement retenu.",
      },
      {
        question: "Le suivi de grossesse est-il remboursé à 100 % ?",
        answer:
          "Oui, à partir du 6e mois de grossesse, l'ensemble des consultations, examens et échographies prescrits dans le cadre du suivi prénatal sont pris en charge à 100 % par l'Assurance Maladie (assurance maternité). Avant le 6e mois, la prise en charge est de 70 % avec complément par votre mutuelle.",
      },
    ],
    keywords: [
      "suivi grossesse Lyon",
      "obstétricienne Lyon",
      "gynécologue Miribel",
      "accouchement Sainte-Foy-lès-Lyon",
      "suivi prénatal Lyon",
    ],
  },
  {
    slug: "controle-sterilet",
    title: "Contrôle de stérilet (DIU)",
    shortTitle: "Contrôle de DIU",
    seoTitle: "Contrôle de stérilet à Lyon",
    metaDescription:
      "Contrôle échographique du stérilet (DIU) à Lyon et Miribel : position, fils et tolérance. Cabinet Dr. Alexandra Soldea.",
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
    faqs: [
      {
        question: "À quelle fréquence faire contrôler son stérilet (DIU) ?",
        answer:
          "Un contrôle médical du DIU est recommandé après les premières règles suivant la pose, puis lors d'une consultation gynécologique annuelle. Un contrôle échographique est généralement réalisé une fois par an pour vérifier le bon positionnement du stérilet dans la cavité utérine. Une consultation supplémentaire est indiquée en cas de douleurs, de saignements anormaux ou de fils non perçus.",
      },
      {
        question: "Pourquoi un contrôle échographique du DIU est-il important ?",
        answer:
          "L'échographie est le seul examen qui permet de vérifier que le stérilet est correctement positionné dans la cavité utérine (et non descendu vers le col, ou expulsé) et d'évaluer l'épaisseur de l'endomètre. Un mauvais positionnement peut diminuer l'efficacité contraceptive du DIU et provoquer des douleurs ou saignements.",
      },
      {
        question:
          "Combien de temps un stérilet est-il efficace : cuivre ou hormonal ?",
        answer:
          "Le DIU au cuivre est efficace pendant 5 à 10 ans selon le modèle. Le DIU hormonal (lévonorgestrel) est efficace pendant 5 à 8 ans selon le dosage. Le Dr. Soldea vous indiquera lors du contrôle la date limite recommandée pour le renouvellement de votre DIU et discutera avec vous des options pour la suite.",
      },
      {
        question: "Que faire si je ne sens plus les fils de mon stérilet ?",
        answer:
          "Prenez rendez-vous rapidement pour un contrôle. Dans la grande majorité des cas, les fils sont simplement remontés contre le col de l'utérus et l'échographie confirme que le DIU est en place. Plus rarement, le stérilet a pu être expulsé ou avoir migré — dans ce cas, une autre méthode contraceptive est indispensable en attendant.",
      },
    ],
    keywords: [
      "contrôle stérilet Lyon",
      "DIU Lyon",
      "contrôle DIU Miribel",
      "stérilet cuivre hormonal",
      "échographie stérilet",
    ],
  },
  {
    slug: "echographie-datation",
    title: "Échographie de datation",
    shortTitle: "Échographie de datation",
    seoTitle: "Échographie de datation à Lyon",
    metaDescription:
      "Échographie de datation à Lyon et Miribel (6–10 SA) : confirmation de grossesse, vitalité embryonnaire et terme prévu.",
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
    faqs: [
      {
        question: "Quand faire une échographie de datation ?",
        answer:
          "L'échographie de datation est généralement réalisée entre la 6e et la 10e semaine d'aménorrhée. Elle est indiquée pour confirmer une grossesse débutante après un test positif, pour préciser le terme lorsque la date des dernières règles est incertaine, ou en cas de doute sur la viabilité (en particulier après des antécédents de fausse couche).",
      },
      {
        question:
          "L'échographie de datation remplace-t-elle l'échographie du 1er trimestre ?",
        answer:
          "Non. L'échographie de datation est un examen précoce optionnel qui ne se substitue pas à l'écho T1 obligatoire, réalisée entre 11 SA et 13 SA + 6 jours d'aménorrhée. L'écho T1 mesure la clarté nucale dans le cadre du dépistage de la trisomie 21 — elle reste indispensable même si une datation précoce a déjà été pratiquée.",
      },
      {
        question:
          "Peut-on voir le cœur du bébé à l'échographie de datation ?",
        answer:
          "Oui, à partir de 6 SA d'aménorrhée environ, l'activité cardiaque embryonnaire est généralement visible à l'échographie endo-vaginale. À 7–8 SA, le cœur est nettement perceptible. La confirmation d'une activité cardiaque est l'un des principaux objectifs de l'échographie de datation.",
      },
      {
        question:
          "L'échographie de datation est-elle remboursée par la Sécurité sociale ?",
        answer:
          "Oui, sur prescription médicale, l'échographie de datation est remboursée à 70 % par l'Assurance Maladie jusqu'au 5e mois de grossesse (taux de remboursement standard), puis à 100 % à partir du 6e mois. Apportez votre carte Vitale, votre prescription et votre test de grossesse positif si vous en disposez.",
      },
    ],
    keywords: [
      "échographie datation Lyon",
      "échographie précoce grossesse Lyon",
      "confirmation grossesse Miribel",
      "écho 6 semaines grossesse",
    ],
  },
  {
    slug: "suivi-gynecologie",
    title: "RDV de suivi de gynécologie",
    shortTitle: "Suivi de gynécologie",
    seoTitle: "Suivi gynécologique à Lyon",
    metaDescription:
      "Consultation gynécologique à Lyon et Miribel : suivi annuel, contraception, frottis, dépistage et accompagnement de la ménopause.",
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
    faqs: [
      {
        question: "À quelle fréquence faire un suivi gynécologique ?",
        answer:
          "Une consultation gynécologique annuelle est recommandée à partir des premiers rapports sexuels, puis tout au long de la vie. Elle comprend un examen clinique, le suivi de la contraception, les dépistages adaptés à l'âge (frottis cervico-utérin, dépistage du cancer du sein) et un temps d'échange sur la santé sexuelle, la fertilité, ou la ménopause.",
      },
      {
        question: "À quel rythme faire un frottis de dépistage ?",
        answer:
          "Selon les recommandations de la Haute Autorité de Santé, le frottis cervico-utérin de dépistage est réalisé tous les 3 ans entre 25 et 29 ans (après deux frottis normaux à un an d'intervalle), puis le test HPV est privilégié tous les 5 ans entre 30 et 65 ans. Le Dr. Soldea adaptera ce calendrier à votre situation personnelle.",
      },
      {
        question: "Comment se passe le suivi de la ménopause ?",
        answer:
          "Le suivi de la ménopause comprend un échange sur les symptômes (bouffées de chaleur, troubles du sommeil, sécheresse vaginale), le dépistage des complications osseuses et cardio-vasculaires, et la discussion d'un éventuel traitement hormonal substitutif (THS) adapté à votre profil. Le Dr. Soldea propose un accompagnement personnalisé pour cette transition.",
      },
      {
        question: "Puis-je consulter pour un changement de contraception ?",
        answer:
          "Bien sûr. Une consultation dédiée permet de faire le point sur votre méthode actuelle (tolérance, efficacité, projet de grossesse), d'envisager les alternatives (pilule, implant, DIU cuivre ou hormonal, anneau, patch) et de choisir ensemble la contraception la mieux adaptée à votre mode de vie et à votre santé.",
      },
    ],
    keywords: [
      "gynécologue Lyon",
      "consultation gynécologique Lyon",
      "gynécologue Miribel",
      "contraception Lyon",
      "ménopause Lyon",
      "frottis dépistage",
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
