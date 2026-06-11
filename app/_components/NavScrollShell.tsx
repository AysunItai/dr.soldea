"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Minimal client island: only tracks scroll position to toggle the header
 * glass background. Everything inside (logo, links) stays server-rendered.
 */
export function NavScrollShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

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
      className={[
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "backdrop-blur-md bg-white/85 border-b border-line"
          : "bg-transparent",
      ].join(" ")}
    >
      {children}
    </header>
  );
}
