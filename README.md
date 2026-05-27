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
- **Calendly** — widget inline pour la prise de rendez-vous

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
    [slug]/page.tsx       # Détail + Calendly par service (SSG)
  _components/            # UI partagée (Navbar, Footer, ServiceCard, …)
lib/
  services.ts             # Source unique des services
public/                   # Assets statiques
```

## Personnalisation

### Services & Calendly

Toute la liste des services (titre, description, durée, tarif, URL Calendly) est
dans [`lib/services.ts`](./lib/services.ts). Remplacez les URLs Calendly par les
vrais liens de votre compte :

```ts
calendlyUrl: "https://calendly.com/dr-soldea/echographie-obstetricale",
```

Toutes les pages — navigation, dropdown, accueil, détail — se mettent à jour
automatiquement à partir de ce fichier.

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
| `/services/[slug]`           | Détail + Calendly pour chaque service (SSG)       |
