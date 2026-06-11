"use client";

const OPEN_EVENT = "dr-soldea:open-cookie-settings";

/**
 * Tiny client island — re-opens the consent banner from the footer without
 * pulling the full CookieConsent bundle into unrelated routes.
 */
export function CookieSettingsTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new Event(OPEN_EVENT));
      }}
      className={className}
    >
      {children}
    </button>
  );
}
