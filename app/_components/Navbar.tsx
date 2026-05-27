"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ServiceIcon } from "@/app/_components/ServiceIcon";
import { NAV_SERVICES } from "@/lib/services";

type LinkItem = { href: string; label: string };

const PRIMARY_LINKS: LinkItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/presentation", label: "Présentation" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Close any open menus when the route changes. React's "adjust state while
  // rendering" pattern: react.dev/learn/you-might-not-need-an-effect
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
    setDesktopServicesOpen(false);
    setMobileServicesOpen(false);
  }

  // Track scroll once so the navbar can lift from transparent → glass-card.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-white/85 border-b border-line"
          : "bg-transparent",
      ].join(" ")}
    >
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
            priority
            className="h-11 w-auto md:h-12"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-2">
          <DesktopLink href="/" active={isActive("/")}>
            Accueil
          </DesktopLink>

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDesktopServicesOpen(true)}
            onMouseLeave={() => setDesktopServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDesktopServicesOpen((v) => !v)}
              aria-expanded={desktopServicesOpen}
              aria-haspopup="menu"
              className={[
                "px-4 py-2 text-sm font-medium rounded-full inline-flex items-center gap-1.5 transition-colors",
                isActive("/services")
                  ? "text-primary-deep"
                  : "text-ink-soft hover:text-ink",
              ].join(" ")}
            >
              Services
              <svg
                className={`h-3.5 w-3.5 transition-transform ${
                  desktopServicesOpen ? "rotate-180" : ""
                }`}
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

            {desktopServicesOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full pt-3 w-[380px]"
              >
                <div className="rounded-2xl bg-white ring-1 ring-line shadow-[0_30px_60px_-30px_rgba(11,31,61,0.25)] p-2 animate-rise">
                  {NAV_SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      role="menuitem"
                      className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-primary-soft/60 transition-colors group"
                    >
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft/50 text-primary-deep ring-1 ring-line/70 group-hover:bg-white">
                        <ServiceIcon name={service.icon} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="text-[15px] font-medium text-ink group-hover:text-primary-deep">
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
            )}
          </div>

          <DesktopLink href="/presentation" active={isActive("/presentation")}>
            Présentation
          </DesktopLink>
          <DesktopLink href="/contact" active={isActive("/contact")}>
            Contact
          </DesktopLink>

          <Link
            href="/services"
            className="ml-3 inline-flex items-center justify-center rounded-full bg-ink text-white text-sm font-medium h-10 px-5 hover:bg-primary-deep transition-colors"
          >
            Prendre rendez-vous
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-line bg-white/80 backdrop-blur"
        >
          <span className="sr-only">Ouvrir le menu</span>
          <div className="relative h-3.5 w-5">
            <span
              className={`absolute inset-x-0 top-0 h-[1.5px] bg-ink transition-transform ${
                mobileOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-[1.5px] bg-ink transition-transform ${
                mobileOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          "lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white origin-top transition-all duration-300",
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <nav className="container-page py-6 flex flex-col gap-1 overflow-y-auto h-full">
          {PRIMARY_LINKS.slice(0, 1).map((link) => (
            <MobileLink
              key={link.href}
              href={link.href}
              active={isActive(link.href)}
            >
              {link.label}
            </MobileLink>
          ))}

          <button
            type="button"
            onClick={() => setMobileServicesOpen((v) => !v)}
            aria-expanded={mobileServicesOpen}
            className="flex items-center justify-between text-left px-4 py-4 text-lg font-medium border-b border-line text-ink"
          >
            Services
            <svg
              className={`h-4 w-4 transition-transform ${
                mobileServicesOpen ? "rotate-180" : ""
              }`}
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
          {mobileServicesOpen && (
            <div className="pl-2 pb-2 border-b border-line">
              {NAV_SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="flex items-center gap-3 px-3 py-3 text-base text-ink-soft hover:text-ink"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft/50 text-primary-deep">
                    <ServiceIcon name={service.icon} className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    {service.shortTitle ?? service.title}
                  </span>
                </Link>
              ))}
              <Link
                href="/services"
                className="block px-4 py-3 text-sm font-medium text-primary-deep"
              >
                Voir tous les services →
              </Link>
            </div>
          )}

          {PRIMARY_LINKS.slice(1).map((link) => (
            <MobileLink
              key={link.href}
              href={link.href}
              active={isActive(link.href)}
            >
              {link.label}
            </MobileLink>
          ))}

          <Link
            href="/services"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-ink text-white text-base font-medium h-12 px-6"
          >
            Prendre rendez-vous
          </Link>
        </nav>
      </div>
    </header>
  );
}

function DesktopLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "px-4 py-2 text-sm font-medium rounded-full transition-colors",
        active ? "text-primary-deep" : "text-ink-soft hover:text-ink",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "px-4 py-4 text-lg font-medium border-b border-line transition-colors",
        active ? "text-primary-deep" : "text-ink",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
