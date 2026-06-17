"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Articles", exact: true },
  { href: "/admin/posts/new", label: "Nouvel article" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-background/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="font-display text-lg text-ink tracking-tight"
          >
            Administration
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            {links.map((link) => {
              const active = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "px-3 py-2 text-sm rounded-full transition-colors",
                    active
                      ? "bg-cream text-ink font-medium ring-1 ring-line"
                      : "text-ink-soft hover:text-ink",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/blog"
            className="text-ink-soft hover:text-ink transition-colors"
            target="_blank"
          >
            Voir le blog
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="text-primary-deep hover:text-primary transition-colors"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
