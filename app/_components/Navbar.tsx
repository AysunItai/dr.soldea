import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/app/_components/MobileNav";
import { NavScrollShell } from "@/app/_components/NavScrollShell";
import { ServiceIcon } from "@/app/_components/ServiceIcon";
import { NAV_SERVICES } from "@/lib/services";

const CENTRE_LINKS = [
  { href: "/equipe", label: "Équipe" },
  { href: "/galerie", label: "Galerie" },
  { href: "/technologie", label: "Technologie" },
  { href: "/presentation", label: "Présentation" },
] as const;

/**
 * Site header — server-rendered shell with two small client islands:
 * `NavScrollShell` (scroll styling) and `MobileNav` (drawer).
 * Desktop dropdowns use CSS hover/focus-within (no JS).
 */
export function Navbar() {
  return (
    <NavScrollShell>
      <div className="container-page flex items-center justify-between h-20">
        <Link
          href="/"
          aria-label="Centre d'Échographie de la Femme OPÉRA — Accueil"
          className="flex items-center gap-3 group"
        >
          <Image
            src="/logo.png"
            alt="Logo du Centre d'Échographie de la Femme OPÉRA"
            width={1254}
            height={1254}
            loading="eager"
            fetchPriority="low"
            sizes="48px"
            className="h-10 w-10 md:h-11 md:w-11 rounded-full ring-1 ring-accent/40 shadow-[0_6px_16px_-8px_rgba(11,31,58,0.4)]"
          />
          <span className="hidden xl:flex flex-col leading-none">
            <span className="nav-brand-title font-display text-[15px] md:text-base text-ink tracking-tight">
              Centre d&apos;Échographie de la Femme
            </span>
            <span className="nav-brand-sub mt-1 text-[10px] md:text-[11px] tracking-[0.34em] uppercase text-accent-deep font-medium">
              OPÉRA · Lyon
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0" aria-label="Principal">
          <DesktopLink href="/">Accueil</DesktopLink>

          <div className="relative group">
            <button
              type="button"
              aria-haspopup="menu"
              className="nav-services-btn px-2.5 xl:px-3.5 py-2 text-sm font-medium rounded-full inline-flex items-center gap-1 text-ink-soft hover:text-ink transition-colors group-hover:text-ink"
            >
              Services
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 4.5 6 7.5 9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              role="menu"
              className="absolute right-0 top-full pt-3 w-[380px] invisible opacity-0 pointer-events-none transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
            >
              <div className="rounded-2xl bg-white ring-1 ring-line shadow-[0_30px_60px_-30px_rgba(11,31,61,0.25)] p-2">
                {NAV_SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    role="menuitem"
                    className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-primary-soft/60 transition-colors group/item"
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-deep text-accent ring-1 ring-accent/30">
                      <ServiceIcon name={service.icon} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-[15px] font-medium text-ink group-hover/item:text-primary-deep">
                          {service.shortTitle ?? service.title}
                        </span>
                        <span className="text-xs text-muted whitespace-nowrap">
                          {service.durationMinutes} min
                        </span>
                      </span>
                      <span className="block text-xs text-muted mt-0.5 line-clamp-1">
                        {service.tagline}
                      </span>
                    </span>
                  </Link>
                ))}
                <Link
                  href="/services"
                  role="menuitem"
                  className="block text-center text-xs text-primary-deep font-medium px-4 py-3 border-t border-line mt-1"
                >
                  Voir tous les services →
                </Link>
              </div>
            </div>
          </div>

          <NavDropdown label="Le centre" links={CENTRE_LINKS} />

          <DesktopLink href="/blog">Actualités</DesktopLink>
          <DesktopLink href="/contact">Contact</DesktopLink>

          <Link
            href="/services"
            className="ml-1.5 xl:ml-3 inline-flex shrink-0 items-center justify-center rounded-full bg-ink text-white text-sm font-medium h-10 px-4 xl:px-5 whitespace-nowrap ring-1 ring-accent/40 hover:bg-ink-deep hover:ring-accent/70 transition-colors"
          >
            <span className="xl:hidden">Rendez-vous</span>
            <span className="hidden xl:inline">Prendre rendez-vous</span>
          </Link>
        </nav>

        <MobileNav />
      </div>
    </NavScrollShell>
  );
}

function DesktopLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="nav-link px-2.5 xl:px-3.5 py-2 text-sm font-medium rounded-full text-ink-soft hover:text-ink transition-colors whitespace-nowrap"
    >
      {children}
    </Link>
  );
}

function NavDropdown({
  label,
  links,
}: {
  label: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div className="relative group">
      <button
        type="button"
        aria-haspopup="menu"
        className="px-2.5 xl:px-3.5 py-2 text-sm font-medium rounded-full inline-flex items-center gap-1 text-ink-soft hover:text-ink transition-colors group-hover:text-ink whitespace-nowrap"
      >
        {label}
        <svg
          className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
        >
          <path
            d="M3 4.5 6 7.5 9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        role="menu"
        className="absolute left-0 top-full pt-3 w-52 invisible opacity-0 pointer-events-none transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
      >
        <div className="rounded-xl bg-white ring-1 ring-line shadow-[0_20px_40px_-24px_rgba(11,31,61,0.25)] p-1.5">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:text-ink hover:bg-primary-soft/60 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
