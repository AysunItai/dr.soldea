"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type SiteChromeProps = {
  navbar: ReactNode;
  footer: ReactNode;
  cookieConsent: ReactNode;
  children: ReactNode;
};

export function SiteChrome({
  navbar,
  footer,
  cookieConsent,
  children,
}: SiteChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main className="flex-1">{children}</main>
      {footer}
      {cookieConsent}
    </>
  );
}
