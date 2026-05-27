import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/_components/Navbar";
import { Footer } from "@/app/_components/Footer";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gynecologuelyon.fr"),
  title: {
    default: "Dr. Alexandra Soldea — Gynécologue Obstétricienne à Lyon & Miribel",
    template: "%s · Dr. Alexandra Soldea",
  },
  description:
    "Cabinet du Dr. Alexandra Soldea, gynécologue obstétricienne à Lyon et Miribel. Suivi de grossesse, échographies, consultations, téléconsultation et prise de rendez-vous en ligne.",
  applicationName: "Dr. Alexandra Soldea",
  authors: [{ name: "Dr. Alexandra Soldea" }],
  keywords: [
    "gynécologue Lyon",
    "obstétricienne",
    "échographie grossesse",
    "Dr Soldea",
    "Miribel",
    "téléconsultation gynécologue",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Dr. Alexandra Soldea — Gynécologue Obstétricienne",
    description:
      "Cabinet à Lyon & Miribel. Suivi de grossesse, échographies, consultations et téléconsultation.",
    siteName: "Dr. Alexandra Soldea",
  },
  robots: {
    index: true,
    follow: true,
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
