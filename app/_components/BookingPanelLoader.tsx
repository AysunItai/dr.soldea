"use client";

import dynamic from "next/dynamic";
import type { Service } from "@/lib/services";

const BookingPanel = dynamic(
  () =>
    import("@/app/_components/BookingPanel").then((m) => ({
      default: m.BookingPanel,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl bg-white ring-1 ring-line p-3 md:p-4">
        <div className="h-[720px] flex flex-col items-center justify-center gap-3 text-sm text-muted bg-cream rounded-2xl">
          <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          Chargement du calendrier…
        </div>
      </div>
    ),
  },
);

/** Client boundary required for `dynamic(..., { ssr: false })` in Next.js 16+. */
export function BookingPanelLoader({ service }: { service: Service }) {
  return <BookingPanel service={service} />;
}
