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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Échographie & gynécologue à Lyon — Dr. Soldea",
    template: "%s · Dr. Alexandra Soldea",
  },
  description:
    "Gynécologue et échographiste à Lyon et Miribel. Échographies de grossesse agréées Aurore (T1, T2, T3), suivi gynécologique et rendez-vous en ligne.",
  applicationName: "Dr. Alexandra Soldea",
  authors: [{ name: "Dr. Alexandra Soldea" }],
  creator: "ITAI Web Solutions",
  publisher: "ITAI Web Solutions",
  keywords: [
    "échographie Lyon",
    "échographie gynécologique Lyon",
    "échographie pelvienne Lyon",
    "échographie grossesse Lyon",
    "échographie obstétricale Lyon",
    "échographie 1er trimestre Lyon",
    "échographie morphologique Lyon",
    "écho T1 Lyon",
    "écho T2 Lyon",
    "écho T3 Lyon",
    "gynécologue Lyon",
    "gynécologue obstétricienne Lyon",
    "endométriose Lyon",
    "Dr Alexandra Soldea",
    "cabinet gynécologue Miribel",
    "téléconsultation gynécologue",
    "réseau Aurore",
  ],
  alternates: {
    canonical: canonicalUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: canonicalUrl("/"),
    title: "Échographie & gynécologue à Lyon — Dr. Soldea",
    description:
      "Gynécologue et échographiste à Lyon et Miribel. Échographies de grossesse agréées Aurore (T1, T2, T3), suivi gynécologique et rendez-vous en ligne.",
    siteName: "Dr. Alexandra Soldea",
    // Facebook / LinkedIn social card. The hero image is reused so we
    // ship a single optimised asset; replace with a dedicated 1200×630
    // export later if you want richer share previews.
    images: [
      {
        url: "/hero1.webp",
        width: 680,
        height: 453,
        alt: "Cabinet du Dr. Alexandra Soldea — gynécologue obstétricienne à Lyon et Miribel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Échographie & gynécologue à Lyon — Dr. Soldea",
    description:
      "Gynécologue et échographiste à Lyon et Miribel. Échographies de grossesse agréées Aurore (T1, T2, T3), suivi gynécologique et rendez-vous en ligne.",
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
  themeColor: "#0b1f3d",
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
