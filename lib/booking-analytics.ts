import { readConsent } from "./analytics-consent";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters: Record<string, string>,
    ) => void;
  }
}

/** UI positions only: never add medical service names, slugs or destinations. */
export const BOOKING_BUTTON_LOCATIONS = [
  "header", "mobile_menu", "footer", "home", "contact",
  "gallery", "technology", "lyon_page", "service_detail",
] as const;

export type BookingButtonLocation = (typeof BOOKING_BUTTON_LOCATIONS)[number];

/** An outbound click only, never an appointment confirmation. */
export function trackDoctolibBookingClick(buttonLocation: BookingButtonLocation): void {
  if (
    readConsent() !== "granted" ||
    !BOOKING_BUTTON_LOCATIONS.includes(buttonLocation)
  ) return;

  try {
    window.gtag?.("event", "doctolib_booking_click", {
      booking_provider: "doctolib",
      button_location: buttonLocation,
      // Do not let GA attach medical page paths/titles or query/referrer data
      // to this event. CookieConsent also gates loading on verified GA settings.
      page_location: "https://www.echographielyon.fr/",
      page_referrer: "",
      page_title: "Prise de rendez-vous",
    });
  } catch {
    // Analytics failure must never prevent navigation to Doctolib.
  }
}
