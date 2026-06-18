/**
 * Shared clinic location and gallery assets for the OPÉRA centre pages.
 */

export const CLINIC_NAME = "Centre d'Échographie de la Femme OPÉRA";

export const CLINIC_STREET = "9 rue du Président Édouard Herriot";
export const CLINIC_POSTAL = "69001 Lyon";
export const CLINIC_ADDRESS = `${CLINIC_STREET}, ${CLINIC_POSTAL}`;
export const CLINIC_QUARTER = "La Presqu'île";

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps?q=9+rue+du+Pr%C3%A9sident+%C3%89douard+Herriot+69001+Lyon";

export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=9+rue+du+Pr%C3%A9sident+%C3%89douard+Herriot+69001+Lyon&output=embed";

/**
 * Optional Google Street View embed URL for the clinic entrance.
 * Paste the iframe `src` from Google Maps → Street View → Share → Embed a map.
 * Leave empty until the client provides the exact embed URL.
 */
export const GOOGLE_STREET_VIEW_EMBED_URL = "";

export type ClinicGalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  description: string;
  priority?: boolean;
};

export const CLINIC_GALLERY_PHOTOS: ClinicGalleryPhoto[] = [
  {
    src: "/clinic1.jpeg",
    width: 1170,
    height: 754,
    alt: "Espace d'accueil du Centre d'Échographie de la Femme OPÉRA à Lyon",
    caption: "Espace d'accueil",
    description:
      "Un espace calme et lumineux pour accueillir les patientes avant leur consultation.",
    priority: true,
  },
  {
    src: "/clinic2.jpeg",
    width: 1086,
    height: 1448,
    alt: "Salle d'échographie du Centre d'Échographie de la Femme OPÉRA à Lyon",
    caption: "Salle d'échographie",
    description:
      "Une salle dédiée aux examens gynécologiques et obstétricaux, dans un cadre confidentiel et apaisant.",
  },
];
