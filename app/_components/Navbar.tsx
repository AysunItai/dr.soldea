import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/app/_components/MobileNav";
import { NavScrollShell } from "@/app/_components/NavScrollShell";
import { ServiceIcon } from "@/app/_components/ServiceIcon";
import { NAV_SERVICES } from "@/lib/services";

/**
 * Site header — server-rendered shell with two small client islands:
 * `NavScrollShell` (scroll styling) and `MobileNav` (drawer).
 * Desktop services dropdown uses CSS hover/focus-within (no JS).
 */
export function Navbar() {
  return (
    <NavScrollShell>
      <div className="container-page flex items-center justify-between h-20">
        <Link
          href="/"
          aria-label="Dr. Alexandra Soldea — Accueil"
          className="flex items-center group"
        >
          <Image
            src="/logo.png"
            alt="Dr. Alexandra Soldea — Gynécologue Obstétricienne"
            width={366}
            height={85}
            loading="eager"
            fetchPriority="low"
            className="h-11 w-auto md:h-12"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-2" aria-label="Principal">
          <DesktopLink href="/">Accueil</DesktopLink>

          <div className="relative group">
            <button
              type="button"
              aria-haspopup="menu"
              className="px-4 py-2 text-sm font-medium rounded-full inline-flex items-center gap-1.5 text-ink-soft hover:text-ink transition-colors group-hover:text-ink"
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
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft/50 text-primary-deep ring-1 ring-line/70 group-hover/item:bg-white">
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

          <DesktopLink href="/presentation">Présentation</DesktopLink>
          <DesktopLink href="/contact">Contact</DesktopLink>

          <Link
            href="/services"
            className="ml-3 inline-flex items-center justify-center rounded-full bg-ink text-white text-sm font-medium h-10 px-5 hover:bg-primary-deep transition-colors"
          >
            Prendre rendez-vous
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
      className="px-4 py-2 text-sm font-medium rounded-full text-ink-soft hover:text-ink transition-colors"
    >
      {children}
    </Link>
  );
}
