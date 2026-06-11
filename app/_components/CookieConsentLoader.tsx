"use client";

import dynamic from "next/dynamic";

const CookieConsent = dynamic(
  () =>
    import("@/app/_components/CookieConsent").then((m) => ({
      default: m.CookieConsent,
    })),
  { ssr: false },
);

/** Client boundary required for `dynamic(..., { ssr: false })` in Next.js 16+. */
export function CookieConsentLoader() {
  return <CookieConsent />;
}
