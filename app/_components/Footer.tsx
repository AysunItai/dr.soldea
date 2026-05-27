import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white/85 mt-24">
      <div className="container-page py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          {/*
           * The logo PNG uses dark teal/navy ink which is invisible on the
           * dark footer background. `brightness(0) invert(1)` flattens it to
           * pure white — a single asset works for both light and dark contexts.
           */}
          <Image
            src="/logo.png"
            alt="Dr. Alexandra Soldea — Gynécologue Obstétricienne"
            width={366}
            height={85}
            className="h-12 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="text-sm text-white/60 mt-6 max-w-xs">
            Suivi gynécologique et obstétrical, échographies de la grossesse et
            téléconsultation. Cabinet à Miribel & Lyon.
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-primary-soft/80 mb-4">
            Services
          </h4>
          <ul className="space-y-2">
            {SERVICES.slice(0, 5).map((s) => (
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
          <h4 className="text-xs tracking-[0.25em] uppercase text-primary-soft/80 mb-4">
            Cabinet Miribel
          </h4>
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

          <h4 className="text-xs tracking-[0.25em] uppercase text-primary-soft/80 mt-8 mb-4">
            Cabinet Lyon
          </h4>
          <p className="text-sm text-white/75 leading-relaxed">
            4 rue du Président Carnot
            <br />
            69002 Lyon
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-primary-soft/80 mb-4">
            Liens
          </h4>
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
          <p>
            Site conçu avec soin · Next.js · {" "}
            <Link href="/contact" className="underline-offset-4 hover:underline">
              Mentions légales
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
