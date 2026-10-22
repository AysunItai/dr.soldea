# Dr. Alexandra Soldea — Cabinet (Next.js 16)

Site marketing du cabinet du Dr. Alexandra Soldea, gynécologue obstétricienne
(Lyon · Miribel). Construit avec Next.js 16 (App Router), React 19,
Tailwind v4 et TypeScript.

## Stack

- **Next.js 16.2** App Router + Turbopack
- **React 19**
- **Tailwind CSS v4** avec design tokens (`app/globals.css`)
- **TypeScript strict**
- **next/font** — Fraunces (display) + Inter (sans)
- **Doctolib** — lien externe pour la prise de rendez-vous

## Démarrer

> Next.js 16 requiert **Node.js ≥ 20.9**.

```bash
npm install
npm run dev   # http://localhost:3000
npm run build # build de production
npm run lint  # ESLint
```

## Structure

```
app/
  layout.tsx              # Root layout (Navbar, Footer, fonts, metadata)
  globals.css             # Design tokens + Tailwind theme
  page.tsx                # Accueil
  presentation/page.tsx   # Présentation (parcours, publications, etc.)
  contact/                # Contact + formulaire (client)
  services/
    page.tsx              # Vue d'ensemble des services
    [slug]/page.tsx       # Détail + lien Doctolib par service (SSG)
  _components/            # UI partagée (Navbar, Footer, ServiceCard, …)
lib/
  services.ts             # Source unique des services
public/                   # Assets statiques
```

## Personnalisation

### Services & Doctolib

Les données médicales, tarifs et durées restent dans [`lib/services.ts`](./lib/services.ts).
Le registre typé [`lib/booking.ts`](./lib/booking.ts) couvre les dix services :
cinq liens directs (datation, échographie gynécologique, T1, T2, T3), quatre
sélections de catégories à Lyon (dont le hub obstétrical), et un contact
téléphonique pour la téléconsultation. Le type `ServiceSlug` rend l'association
obligatoire pour chaque nouveau service. Aucun nouveau service n'a été créé.

`DOCTOLIB_BOOKING_URL` conserve exactement la sélection Lyon fournie, avec
`placeId=practice-806420`, sans ajout de `pid`. Toutes les destinations actives
en présentiel concernent Lyon. Le profil général du praticien n'est pas un
substitut à cette URL. Les liens de réservation s'ouvrent dans un nouvel
onglet avec `noopener noreferrer`, `no-referrer` et une indication accessible.
Ils fonctionnent sans JavaScript ; aucune disponibilité ni confirmation de
rendez-vous n'est produite par le site.

Le [tableau de correspondance](./docs/doctolib-booking-audit.csv) détaille pour
chaque service le type médical, le mode, le lieu, l'intention, la sélection
réelle, les identifiants, l'URL, la spécificité et la justification. Les champs
de sélection sont vides pour les replis : ils ne prétendent pas présélectionner
un motif. Le [relevé des 19 destinations fournies](./docs/doctolib-categories.json)
conserve les doublons et l'URL incomplète de la catégorie 4 sans les corriger.
Ce relevé manuel fourni le 22 octobre 2026 remplace les anciennes observations
et leur limitation HTTP 429. Aucune requête Doctolib n'a été effectuée pour ce travail.

Décisions nécessitant une distinction :

- Le suivi de grossesse est une consultation mensuelle, pas automatiquement
  un suivi pathologique ni un rendez-vous combiné échographie/consultation.
  Les trois lignes 3–5 de la catégorie 2 partagent `7188954` : repli Lyon.
- Le suivi gynécologique correspond sémantiquement à une consultation de
  gynécologie, mais les six URL fournies sélectionnent toutes `171275/7188954`,
  également utilisé pour la grossesse : repli Lyon, sans inventer de motif.
- Le contrôle de DIU comprend imagerie, fils, tolérance et conseils. Ni une
  pose/retrait ni une simple échographie ne garantit tout ce rendez-vous :
  repli Lyon jusqu'à confirmation du cabinet.
- Le hub obstétrical conserve ses liens informatifs T1/T2/T3 et n'a pas de
  panneau de réservation propre. Son entrée de registre est un repli.
- Croissance (`6683280`) et deuxième avis (`16054610`) sont conservés, sans
  affectation à un autre service. Il n'existe pas de service autonome pour
  ces examens dans `SERVICES`. La liste descriptive d'examens sur l'accueil
  conserve ses liens informatifs ; le service T3 reste un T3 (`6622464`).
- La téléconsultation conserve le contact du secrétariat au 04 28 29 55 16.
  Aucun parcours à distance vérifié n'a été fourni ; ne jamais fabriquer un
  lien `telehealth=true` ni utiliser `telehealth=false` pour cette consultation.

L'événement `doctolib_booking_click` est conservé, soumis au consentement lu à
chaque clic. Il transmet uniquement le prestataire et l'emplacement générique
du bouton, avec un contexte de page neutre. Aucun motif, slug, URL Doctolib,
champ de formulaire ou donnée patiente n'est ajouté. Un clic n'est jamais
compté comme un rendez-vous confirmé.

**GA4 est désactivé par défaut tant que sa configuration de confidentialité
n'est pas vérifiée.** La lecture du script public `G-0C18XKTFXB` le 22 octobre
2026 montre le suivi automatique des liens sortants, des formulaires, des
pages et la collecte automatique de données utilisateur activés. Ces
mécanismes peuvent transmettre des données indépendamment de notre événement.
La configuration du compte n'a pas été modifiée. Le chargement du script exige
à la fois le consentement habituel et `NEXT_PUBLIC_GA4_PRIVACY_VERIFIED=true`.
Le parcours de réservation et les choix de cookies fonctionnent sans GA4.

Pour réactiver la mesure, désactiver **toutes les mesures améliorées**, y
compris les changements d'historique, ainsi que la **collecte automatique de
données fournies par les utilisateurs** dans le compte Google. Vérifier les
requêtes avec consentement, navigation, formulaire et clics sortants avant
rétablissement ; ensuite seulement définir le drapeau ci-dessus à `true` et
reconstruire l'application. L'initialisation supprime les pages vues par
défaut, impose un contexte neutre et désactive les signaux Google et la
personnalisation publicitaire. `send_page_view: false` ne désactive pas à lui
seul les mesures améliorées, comme le précise la
[documentation Google](https://developers.google.com/analytics/devguides/collection/ga4/views).
Les [mesures améliorées](https://support.google.com/analytics/answer/9216061)
peuvent collecter l'URL des liens sortants ; elles doivent rester désactivées.

Vérifications (Node.js 22) :

```bash
node --test tests/booking.test.mjs
npm run build
npx tsc --noEmit
npm run lint
```

Le test [`tests/booking-browser.mjs`](./tests/booking-browser.mjs) utilise Chrome
et une installation Playwright existante (option `PLAYWRIGHT_MODULE` pour
indiquer son fichier `index.mjs`, sans ajouter de dépendance applicative).
Démarrer le build avec `npm run start -- --hostname 127.0.0.1 --port 3001`, puis
exécuter `node tests/booking-browser.mjs`. Le test valide le mode de protection
GA4 par défaut et simule localement `gtag` pour vérifier le clic après consentement.
Il intercepte **toutes** les requêtes externes et n'envoie rien à Doctolib ou
Google. Les captures et résultats sont écrits dans
`/tmp/dr-soldea-booking-validation` (modifiable via `BOOKING_ARTIFACT_DIR`).

Résultats du 22 octobre 2026 : build de production sous Node.js 22.21.0 réussi,
TypeScript et lint des fichiers modifiés réussis, 11 tests de registre et de
confidentialité réussis. Contrôle Chrome de 19 pages à chacune des largeurs
320, 390, 768 et 1440 px : aucun débordement horizontal ni bouton de réservation
tronqué, destinations conformes, liens internes accessibles, navigation sans
JavaScript et contrôles clavier validés. Les captures T1, suivi de grossesse
et téléconsultation conservent le dessin existant. La comparaison des données
`SERVICES` avant/après confirme le maintien intégral du contenu médical, des
prix et des durées.

Le lint global reste en échec sur six erreurs préexistantes hors des fichiers
modifiés pour ce travail : `LazyMapEmbed.tsx` (1), `MobileNav.tsx` (2),
`admin/Editor.tsx` (1), page SEO Lyon (2), plus un import inutilisé dans la
page de détail de service. Le build signale aussi la convention `middleware`
dépréciée ; cette migration n'a pas été incluse dans le périmètre réservation.
Les destinations Doctolib n'ont pas été revalidées sur le réseau : la vérification
porte sur les liens manuellement fournis et leur ouverture interceptée.

### Images

Les pages utilisent pour l'instant des placeholders SVG (portrait, cartes
services). Pour ajouter de vraies photos :

1. Déposez les images dans `public/images/…`.
2. Remplacez les blocs SVG dans `app/page.tsx`, `app/presentation/page.tsx`
   par `<Image src="/images/…" … />` (`next/image`).

### Formulaire de contact

`app/contact/ContactForm.tsx` simule l'envoi. Branchez votre backend (Resend,
Formspree, server action, etc.) dans `handleSubmit`.

### Couleurs & typographie

Tous les tokens sont centralisés dans `app/globals.css` :

- `--color-primary`, `--color-primary-deep`, `--color-primary-soft`
- `--color-ink`, `--color-ink-soft`, `--color-muted`
- `--color-cream`, `--color-cream-deep`, `--color-accent`

Les polices sont chargées via `next/font/google` dans `app/layout.tsx`.

## Pages

| Route                        | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| `/`                          | Accueil — hero, services, échographies, CTA       |
| `/presentation`              | Parcours, diplômes, expériences, publications     |
| `/contact`                   | Coordonnées, formulaire, plans Google Maps        |
| `/services`                  | Vue d'ensemble des services par catégorie         |
| `/services/[slug]`           | Détail + lien Doctolib pour chaque service (SSG)  |
