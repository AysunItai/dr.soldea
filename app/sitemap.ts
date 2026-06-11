import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

/**
 * Manually-bumped content version. Update this date string when there is
 * a real content change (new service, new long-form section, new FAQ).
 *
 * Why not `new Date()` ?
 * ---------------------
 * `new Date()` runs at build time, so every deploy stamps every URL with
 * "today" — even when nothing actually changed. Google detects this and
 * stops trusting freshness signals from the sitemap. A stable, intentional
 * timestamp is a stronger SEO signal than a noisy one.
 */
const CONTENT_LAST_MODIFIED = new Date("2026-06-11T00:00:00Z");

/**
 * Site map for search engine crawlers. Every static route + every
 * service detail page is enumerated so freshly added trimester pages
 * are discovered immediately on the next crawl.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/presentation`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/echographie-gynecologique-obstetricale-lyon`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "yearly",
      // Legal page — indexed but low SEO priority vs. service pages.
      priority: 0.3,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly",
    // Trimester pages are the SEO focus → highest priority among services.
    priority: service.group === "obstetrical" ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
