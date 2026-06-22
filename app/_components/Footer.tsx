import Image from "next/image";
import Link from "next/link";
import { NAV_SERVICES, getObstetricTrimesters } from "@/lib/services";
import { CookieSettingsTrigger } from "@/app/_components/CookieSettingsTrigger";

export function Footer() {
  const year = new Date().getFullYear();
  const trimesters = getObstetricTrimesters();
  return (
    <footer className="relative bg-ink-deep text-white/85 mt-12 sm:mt-20 overflow-hidden">
      {/* Gold top hairline — frames the luxury footer. */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px gold-rule" />
      <div className="container-page min-w-0 py-12 sm:py-16 md:py-20 grid gap-12 sm:gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          {/*
           * The circular gold medallion logo reads beautifully on the dark
           * navy footer — no colour filter needed (gold on navy is the
           * brand's strongest pairing).
           */}
          <Image
            src="/logo.png"
            alt="Logo du Centre d'Échographie de la Femme OPÉRA"
            width={1254}
            height={1254}
            sizes="64px"
            className="h-16 w-16 rounded-full ring-1 ring-accent/40"
          />
          <p className="mt-5 font-display text-lg text-white leading-snug">
            Centre d&apos;Échographie de la Femme OPÉRA
          </p>
          <p className="mt-1 text-xs tracking-[0.28em] uppercase text-accent">
            Avec Dr Alexandra Soldea
          </p>
          <p className="text-sm text-white/60 mt-4 sm:mt-5 max-w-sm text-pretty leading-relaxed">
            Centre dédié à l&apos;échographie de la femme au cœur de Lyon :
            échographies gynécologiques et obstétricales, suivi de grossesse
            (T1, T2, T3 — réseau Aurore) et consultations sur rendez-vous.
          </p>
        </div>

        <div className="border-t border-white/10 pt-10 sm:border-0 sm:pt-0">
          {/*
           * The Footer's column titles were `<h4>` for visual weight, but
           * Lighthouse flagged a heading-order skip (main content's
           * trailing h2 → footer h4). Promoting them to `<h2>` (kept
           * visually identical via the same Tailwind classes) restores a
           * legal hierarchy without altering the design.
           */}
          <h2 className="text-xs tracking-[0.22em] sm:tracking-[0.25em] uppercase text-accent mb-3 sm:mb-4">
            Services
          </h2>
          <ul className="space-y-0.5">
            {NAV_SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="footer-link"
                >
                  {s.shortTitle ?? s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="footer-link text-primary-soft hover:text-white"
              >
                Tous les services →
              </Link>
            </li>
          </ul>
        </div>

        <div className="border-t border-white/10 pt-10 sm:border-0 sm:pt-0">
          <h2 className="text-xs tracking-[0.22em] sm:tracking-[0.25em] uppercase text-accent mb-3 sm:mb-4">
            Échographies obstétricales
          </h2>
          <ul className="space-y-2">
            {trimesters.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/services/${t.slug}`}
                  className="footer-link"
                >
                  <span className="font-medium text-white/90">
                    {t.shortLabel}
                  </span>
                  <span className="text-white/55"> · </span>
                  Échographie du {t.shortLabel === "T1" ? "1er" : t.shortLabel === "T2" ? "2e" : "3e"} trimestre
                </Link>
                {t.weeks && (
                  <span className="block text-[11px] text-white/65 mt-0.5">
                    {t.weeks}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-white/10 pt-10 sm:border-0 sm:pt-0">
          <h2 className="text-xs tracking-[0.22em] sm:tracking-[0.25em] uppercase text-accent mb-3 sm:mb-4">
            Le centre
          </h2>
          <p className="text-sm text-white/75 leading-relaxed">
            9 rue du Président Édouard Herriot
            <br />
            69001 Lyon
          </p>
          <p className="text-sm text-white/75 mt-4">
            <a href="tel:+33428295516" className="footer-link hover:text-white">
              04 28 29 55 16
            </a>
          </p>
          <ul className="mt-5 space-y-2">
            <li>
              <Link
                href="/echographie-gynecologique-obstetricale-lyon"
                className="text-sm text-white/75 hover:text-white transition-colors"
              >
                Échographie à Lyon
              </Link>
            </li>
            <li>
              <Link
                href="/services/echographie-gynecologique"
                className="text-sm text-white/75 hover:text-white transition-colors"
              >
                Échographie gynécologique à Lyon
              </Link>
            </li>
            <li>
              <Link
                href="/services/echographie-obstetricale"
                className="text-sm text-white/75 hover:text-white transition-colors"
              >
                Échographie obstétricale à Lyon
              </Link>
            </li>
          </ul>
        </div>

        <div className="border-t border-white/10 pt-10 sm:border-0 sm:pt-0">
          <h2 className="text-xs tracking-[0.22em] sm:tracking-[0.25em] uppercase text-accent mb-3 sm:mb-4">
            Liens
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/equipe"
                className="footer-link"
              >
                Équipe
              </Link>
            </li>
            <li>
              <Link
                href="/galerie"
                className="footer-link"
              >
                Galerie
              </Link>
            </li>
            <li>
              <Link
                href="/technologie"
                className="footer-link"
              >
                Technologie &amp; équipement
              </Link>
            </li>
            <li>
              <Link
                href="/presentation"
                className="footer-link"
              >
                Présentation
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="footer-link"
              >
                Actualités
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="footer-link"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="footer-link"
              >
                Prendre rendez-vous
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page min-w-0 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/55 text-center md:text-left">
          <p className="text-pretty max-w-prose">
            © {year} Centre d&apos;Échographie de la Femme OPÉRA — Dr. Alexandra
            Soldea. Tous droits réservés.
          </p>
          <p className="flex items-center gap-2 flex-wrap justify-center">
            <span>Site conçu &amp; développé par</span>
            <a
              href="https://www.itaiwebsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-white/90 hover:text-white transition-colors"
              aria-label="ITAI Web Solutions — ouvre dans un nouvel onglet"
            >
              <span className="font-medium tracking-[0.08em] border-b border-white/30 group-hover:border-primary-soft pb-px transition-colors">
                ITAI Web Solutions
              </span>
              <svg
                viewBox="0 0 12 12"
                className="h-2.5 w-2.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3.5 8.5 8.5 3.5M4 3.5h4.5V8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <span aria-hidden className="text-white/30">·</span>
            <Link
              href="/mentions-legales"
              className="underline-offset-4 hover:underline"
            >
              Mentions légales
            </Link>
            <span aria-hidden className="text-white/30">·</span>
            <CookieSettingsTrigger className="underline-offset-4 hover:underline text-white/70 hover:text-white transition-colors">
              Gestion des cookies
            </CookieSettingsTrigger>
          </p>
        </div>
      </div>
    </footer>
  );
}
