import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CookieConsentLoader } from "@/app/_components/CookieConsentLoader";
import { Navbar } from "@/app/_components/Navbar";
import { Footer } from "@/app/_components/Footer";
import { canonicalUrl, SITE_URL, siteGraphJsonLd } from "@/lib/seo";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  adjustFontFallback: true,
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT"],
  adjustFontFallback: true,
});

const HOME_TITLE =
  "Centre d'Échographie de la Femme OPÉRA — Échographie à Lyon";
const HOME_DESCRIPTION =
  "Centre d'Échographie de la Femme OPÉRA : échographies gynécologiques et obstétricales au cœur de Lyon, avec Dr Alexandra Soldea et son équipe. Suivi de grossesse, échographies T1, T2, T3 et consultations sur rendez-vous.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s · Centre d'Échographie de la Femme OPÉRA",
  },
  description: HOME_DESCRIPTION,
  applicationName: "Centre d'Échographie de la Femme OPÉRA",
  authors: [{ name: "Dr. Alexandra Soldea" }],
  creator: "ITAI Web Solutions",
  publisher: "Centre d'Échographie de la Femme OPÉRA",
  keywords: [
    "Centre d'Échographie de la Femme OPÉRA",
    "centre d'échographie à Lyon",
    "échographie de la femme à Lyon",
    "échographie gynécologique à Lyon",
    "échographie obstétricale à Lyon",
    "échographie grossesse Lyon",
    "échographie 1er trimestre Lyon",
    "échographie morphologique Lyon",
    "écho T1 Lyon",
    "écho T2 Lyon",
    "écho T3 Lyon",
    "gynécologue Lyon",
    "gynécologue obstétricienne Lyon",
    "suivi de grossesse Lyon",
    "Dr Alexandra Soldea",
    "réseau Aurore",
  ],
  alternates: {
    canonical: canonicalUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: canonicalUrl("/"),
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    siteName: "Centre d'Échographie de la Femme OPÉRA",
    // Facebook / LinkedIn social card. The brand medallion is shown first
    // (recognisable square mark), with the consultation-room photo as a
    // richer secondary preview where the platform supports it.
    images: [
      {
        url: "/logo.png",
        width: 1254,
        height: 1254,
        alt: "Logo du Centre d'Échographie de la Femme OPÉRA",
      },
      {
        url: "/hero1.webp",
        width: 680,
        height: 453,
        alt: "Centre d'Échographie de la Femme OPÉRA — salle de consultation à Lyon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/hero1.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1f3a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${sans.variable} ${display.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-ink">
        {/* Site-wide JSON-LD `@graph` — emits WebSite, Person (the doctor),
            Physician (the practice), and one MedicalClinic per cabinet,
            all cross-referenced via `@id`. Strongest possible signal for
            Google's knowledge graph and the local pack (map results) on
            "échographie lyon" / "gynécologue miribel" type queries. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteGraphJsonLd()),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* GDPR/CNIL consent banner. GA4 only loads after explicit grant. */}
        <CookieConsentLoader />
      </body>
    </html>
  );
}
