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
        // A consistent ivory glass bar — readable over both the dark homepage
        // hero and the light inner-page headers, with a fine gold hairline.
        "sticky top-0 z-50 backdrop-blur-md border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "bg-background/92 border-line shadow-[0_10px_30px_-22px_rgba(7,26,51,0.4)]"
          : "bg-background/80 border-line/60",
      ].join(" ")}
    >
      {children}
    </header>
  );
}
