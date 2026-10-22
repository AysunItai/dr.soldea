"use client";

import type { ComponentProps } from "react";
import { DOCTOLIB_BOOKING_URL } from "@/lib/booking";
import {
  trackDoctolibBookingClick,
  type BookingButtonLocation,
} from "@/lib/booking-analytics";

type Props = Omit<ComponentProps<"a">, "target" | "rel" | "referrerPolicy" | "onAuxClick"> & {
  buttonLocation: BookingButtonLocation;
};

/** One small client boundary for secure links and consent-aware click events. */
export function DoctolibLink({
  buttonLocation,
  href = DOCTOLIB_BOOKING_URL,
  onClick,
  children,
  ...props
}: Props) {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="no-referrer"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) trackDoctolibBookingClick(buttonLocation);
      }}
      onAuxClick={(event) => {
        if (event.button === 1) trackDoctolibBookingClick(buttonLocation);
      }}
    >
      {children}
      <span className="sr-only"> — Doctolib, nouvel onglet</span>
    </a>
  );
}
