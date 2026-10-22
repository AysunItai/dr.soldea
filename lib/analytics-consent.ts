export const GA_CONSENT_STORAGE_KEY = "dr-soldea:ga-consent";

export type ConsentState = "unset" | "granted" | "denied";

export function readConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  try {
    const raw = window.localStorage.getItem(GA_CONSENT_STORAGE_KEY);
    return raw === "granted" || raw === "denied" ? raw : "unset";
  } catch {
    // Disabled storage is not consent.
    return "unset";
  }
}
