"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Minimal client island: only tracks scroll position to toggle the header
 * glass background. Everything inside (logo, links) stays server-rendered.
 * On the homepage hero, the bar stays translucent until the user scrolls.
 */
export function NavScrollShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const overlay = isHome && !scrolled;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-overlay={overlay ? "true" : undefined}
      className={[
        "sticky top-0 z-50 backdrop-blur-md border-b transition-[background-color,border-color,box-shadow] duration-300",
        overlay
          ? "bg-ink-deep/30 border-white/10 shadow-none"
          : scrolled
            ? "bg-background/92 border-line shadow-[0_10px_30px_-22px_rgba(7,26,51,0.4)]"
            : "bg-background/80 border-line/60",
      ].join(" ")}
    >
      {children}
    </header>
  );
}
