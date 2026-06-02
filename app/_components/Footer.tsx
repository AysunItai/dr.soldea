import Image from "next/image";
import Link from "next/link";
import { NAV_SERVICES, getObstetricTrimesters } from "@/lib/services";

export function Footer() {
  const year = new Date().getFullYear();
  const trimesters = getObstetricTrimesters();
  return (
    <footer className="bg-ink text-white/85 mt-24">
      <div className="container-page py-16 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-1">
          {/*
           * The logo PNG uses dark teal/navy ink which is invisible on the
           * dark footer background. `brightness(0) invert(1)` flattens it to
           * pure white — a single asset works for both light and dark contexts.
           */}
          <Image
            src="/logo.png"
            alt="Dr. Alexandra Soldea — Gynécologue Obstétricienne à Lyon & Miribel"
            width={366}
            height={85}
            className="h-12 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="text-sm text-white/60 mt-6 max-w-sm">
            Suivi gynécologique et obstétrical à Lyon et Miribel. Échographies
            agréées du réseau de périnatalité Aurore (T1, T2, T3),
            téléconsultation et accompagnement de la grossesse.
          </p>
        </div>

        <div>
          {/*
           * The Footer's column titles were `<h4>` for visual weight, but
           * Lighthouse flagged a heading-order skip (main content's
           * trailing h2 → footer h4). Promoting them to `<h2>` (kept
           * visually identical via the same Tailwind classes) restores a
           * legal hierarchy without altering the design.
           */}
          <h2 className="text-xs tracking-[0.25em] uppercase text-primary-soft/80 mb-4">
            Services
          </h2>
          <ul className="space-y-2">
            {NAV_SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-white/75 hover:text-white transition-colors"
                >
                  {s.shortTitle ?? s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="text-sm text-primary-soft hover:text-white"
              >
                Tous les services →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs tracking-[0.25em] uppercase text-primary-soft/80 mb-4">
            Échographies obstétricales
          </h2>
          <ul className="space-y-2">
            {trimesters.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/services/${t.slug}`}
                  className="text-sm text-white/75 hover:text-white transition-colors"
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

        <div>
          <h2 className="text-xs tracking-[0.25em] uppercase text-primary-soft/80 mb-4">
            Cabinet Miribel
          </h2>
          <p className="text-sm text-white/75 leading-relaxed">
            63 place de la République
            <br />
            01700 Miribel
          </p>
          <p className="text-sm text-white/75 mt-4">
            <a href="tel:+33428295516" className="hover:text-white">
              04 28 29 55 16
            </a>
          </p>

          <h2 className="text-xs tracking-[0.25em] uppercase text-primary-soft/80 mt-8 mb-4">
            Cabinet Lyon
          </h2>
          <p className="text-sm text-white/75 leading-relaxed">
            4 rue du Président Carnot
            <br />
            69002 Lyon
          </p>
        </div>

        <div>
          <h2 className="text-xs tracking-[0.25em] uppercase text-primary-soft/80 mb-4">
            Liens
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/presentation"
                className="text-sm text-white/75 hover:text-white"
              >
                Présentation
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm text-white/75 hover:text-white"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-sm text-white/75 hover:text-white"
              >
                Prendre rendez-vous
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <p>© {year} Dr. Alexandra Soldea — Tous droits réservés.</p>
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
          </p>
        </div>
      </div>
    </footer>
  );
}
