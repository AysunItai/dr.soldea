"use client";

import { useEffect, useRef, useState } from "react";

type LazyMapEmbedProps = {
  src: string;
  title: string;
  className?: string;
};

/**
 * Defers Google Maps iframe injection until the embed scrolls near the
 * viewport. Keeps contact-page main-thread work and network requests off
 * the critical path for mobile LCP/TBT.
 */
export function LazyMapEmbed({ src, title, className }: LazyMapEmbedProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (!("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className={className ?? "block w-full h-72 bg-cream"}
      aria-label={active ? undefined : title}
    >
      {active ? (
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          className="block w-full h-full"
        />
      ) : (
        <div
          className="flex h-full items-center justify-center text-sm text-muted"
          aria-hidden
        >
          Carte en cours de chargement…
        </div>
      )}
    </div>
  );
}
