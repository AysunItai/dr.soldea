/**
 * Ultrasound equipment copy — shared by /technologie and the homepage teaser.
 * Wording is informational; avoid marketing claims or brochure language.
 */

import { CLINIC_NAME } from "@/lib/clinic";

export const ULTRASOUND_SYSTEM = "Samsung V8";

export type EquipmentFeature = {
  title: string;
  description: string;
};

export const EQUIPMENT_INTRO = {
  eyebrow: "Technologie & équipement",
  title: "Une technologie d'échographie avancée",
  paragraphs: [
    `Le ${CLINIC_NAME} est équipé d'un échographe ${ULTRASOUND_SYSTEM}, une plateforme d'imagerie conçue pour les examens gynécologiques et obstétricaux.`,
    "Cette technologie permet une imagerie précise, des mesures assistées et des modes avancés d'exploration, utilisés selon le contexte médical et l'indication de chaque examen.",
    "L'objectif reste le même : offrir aux patientes un suivi rigoureux, dans un environnement calme, confidentiel et professionnel.",
  ],
  teaser:
    "Le centre dispose d'un échographe Samsung V8 pour les examens gynécologiques et obstétricaux, dans un cadre médical adapté à chaque consultation.",
} as const;

export const EQUIPMENT_FEATURES: EquipmentFeature[] = [
  {
    title: "Imagerie gynécologique et obstétricale",
    description:
      "Un équipement adapté aux examens de suivi gynécologique, d'échographie de grossesse et d'exploration obstétricale.",
  },
  {
    title: "Aide aux mesures médicales",
    description:
      "Des outils d'aide à la mesure peuvent accompagner certains examens, toujours sous l'interprétation du médecin.",
  },
  {
    title: "Modes avancés d'imagerie",
    description:
      "Selon l'indication médicale, l'échographe permet l'utilisation de modes avancés, notamment l'imagerie volumique et certaines visualisations 3D/4D.",
  },
  {
    title: "Confort et confidentialité",
    description:
      "L'équipement s'intègre dans une salle d'examen pensée pour le confort, la confidentialité et la qualité du suivi.",
  },
];
