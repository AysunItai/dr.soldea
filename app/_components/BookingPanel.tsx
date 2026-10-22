import { getServiceBooking } from "@/lib/booking";
import { DoctolibLink } from "@/app/_components/DoctolibLink";

/** Server-rendered link with optional, consent-gated click tracking. */
export function BookingPanel({ serviceSlug }: { serviceSlug: string }) {
  const destination = getServiceBooking(serviceSlug);
  const needsConfirmation = destination.status === "requires-manual-confirmation";
  const buttonClassName = "mt-6 flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-center text-sm font-medium text-white ring-1 ring-accent/40 transition-colors hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-deep";
  return (
    <section
      aria-labelledby="booking-heading"
      className="min-w-0 rounded-2xl bg-champagne ring-1 ring-accent/30 p-5 sm:p-8"
    >
      <p className="text-[11px] tracking-[0.25em] uppercase text-primary-deep font-medium">
        Prendre rendez-vous
      </p>
      <h2 id="booking-heading" className="font-display text-2xl sm:text-3xl text-ink mt-3 leading-tight">
        Réserver votre consultation
      </h2>
      <p className="mt-4 text-sm text-ink-soft leading-relaxed">
        {needsConfirmation
          ? "Pour une téléconsultation, contactez le cabinet afin de confirmer la disponibilité et les modalités de réservation."
          : destination.status === "verified-direct"
            ? "Consultez les disponibilités pour cet examen au cabinet de Lyon et poursuivez votre réservation sur Doctolib."
            : "Choisissez le motif adapté à votre consultation au cabinet de Lyon, puis consultez les disponibilités sur Doctolib."}
      </p>
      {needsConfirmation ? (
        <a href={destination.contactUrl} className={buttonClassName} aria-describedby="doctolib-booking-note">
          Contacter le cabinet
        </a>
      ) : (
        <DoctolibLink
          href={destination.url}
          buttonLocation="service_detail"
          aria-describedby="doctolib-booking-note"
          className={buttonClassName}
        >
          <span className="min-w-0">Prendre rendez-vous sur Doctolib</span>
          <span aria-hidden="true" className="shrink-0">↗</span>
        </DoctolibLink>
      )}
      <p id="doctolib-booking-note" className="mt-4 text-center text-xs text-muted leading-relaxed">
        {needsConfirmation ? "Secrétariat : 04 28 29 55 16." : (
          <>
            La réservation s&apos;effectue sur Doctolib.
            <span className="block">Ouverture dans un nouvel onglet.</span>
          </>
        )}
      </p>
    </section>
  );
}
