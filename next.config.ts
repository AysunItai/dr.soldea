import type { NextConfig } from "next";

/**
 * Safe baseline security headers — applied to every route.
 *
 * Intentionally conservative:
 *  - No Content-Security-Policy: Calendly, Google Fonts and any future
 *    analytics inject inline/eval code; CSP must be tested route-by-route
 *    before turning it on.
 *  - No Strict-Transport-Security: HSTS should only be enabled once HTTPS
 *    is verified stable on the production custom domain; misconfiguration
 *    can lock a domain out of HTTP for the max-age window.
 */
const securityHeaders = [
  // Stop the site being framed by third parties (clickjacking defence).
  { key: "X-Frame-Options", value: "DENY" },
  // Disable MIME-type sniffing — the browser must respect Content-Type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the full URL only on same-origin navigations.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Explicitly disable powerful browser APIs the site does not use.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  /**
   * Permanent redirects from the legacy domain to the new production
   * domain. `permanent: true` issues a 308 (the HTTP-method-preserving
   * equivalent of a 301) so search engines and browsers update their
   * cached canonical URL. The `has: [{ type: "host", ... }]` matchers
   * ensure these only fire when the request actually hits the old
   * hostname. Apex `echographielyon.fr` 308s to `www.echographielyon.fr`
   * so crawlers never see split canonicals between apex and www.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "echographielyon.fr" }],
        destination: "https://www.echographielyon.fr/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "gynecologuelyon.fr" }],
        destination: "https://www.echographielyon.fr/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.gynecologuelyon.fr" }],
        destination: "https://www.echographielyon.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
