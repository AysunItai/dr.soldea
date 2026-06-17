"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ServiceIcon } from "@/app/_components/ServiceIcon";
import { NAV_SERVICES } from "@/lib/services";

const PRIMARY_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/equipe", label: "Équipe" },
  { href: "/presentation", label: "Présentation" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Mobile-only navigation drawer. Desktop nav is server-rendered with a
 * CSS hover dropdown — this island hydrates only the hamburger + drawer.
 */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <button
        type="button"
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-line bg-white/80 backdrop-blur"
      >
        <span className="sr-only">Ouvrir le menu</span>
        <div className="relative h-3.5 w-5">
          <span
            className={`absolute inset-x-0 top-0 h-[1.5px] bg-ink transition-transform ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute inset-x-0 bottom-0 h-[1.5px] bg-ink transition-transform ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={[
          "lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-white origin-top transition-all duration-300",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <nav className="container-page py-6 flex flex-col gap-1 overflow-y-auto h-full">
          <MobileLink href="/" active={isActive("/")} onNavigate={() => setOpen(false)}>
            Accueil
          </MobileLink>

          <button
            type="button"
            onClick={() => setServicesOpen((v) => !v)}
            aria-expanded={servicesOpen}
            className="flex items-center justify-between text-left px-4 py-4 text-lg font-medium border-b border-line text-ink"
          >
            Services
            <svg
              className={`h-4 w-4 transition-transform ${
                servicesOpen ? "rotate-180" : ""
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
          {servicesOpen && (
            <div className="pl-2 pb-2 border-b border-line">
              {NAV_SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
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
              onNavigate={() => setOpen(false)}
            >
              {link.label}
            </MobileLink>
          ))}

          <Link
            href="/services"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-ink text-white text-base font-medium h-12 px-6"
          >
            Prendre rendez-vous
          </Link>
        </nav>
      </div>
    </>
  );
}

function MobileLink({
  href,
  active,
  children,
  onNavigate,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={[
        "px-4 py-4 text-lg font-medium border-b border-line transition-colors",
        active ? "text-primary-deep" : "text-ink",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
