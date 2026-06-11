"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const SUCCESS_MESSAGE =
  "Votre message a bien été envoyé. Le cabinet vous recontactera prochainement.";
const GENERIC_ERROR =
  "Une erreur est survenue. Veuillez réessayer ou contacter le cabinet directement.";

/**
 * Patient-facing contact form. Submits as JSON to /api/contact (see
 * `app/api/contact/route.ts`) which validates, rate-limits, and forwards
 * the message to the clinic inbox via Resend.
 */
export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");
    setErrorMessage("");

    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    const email = data.email?.trim() ?? "";
    const phone = data.phone?.trim() ?? "";

    if (!email && !phone) {
      setErrorMessage(
        "Merci d'indiquer un e-mail ou un numéro de téléphone.",
      );
      setState("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: { ok: boolean; error?: string } = await res.json().catch(
        () => ({ ok: false }),
      );

      if (!res.ok || !json.ok) {
        setErrorMessage(
          res.status === 400 && json.error ? json.error : GENERIC_ERROR,
        );
        setState("error");
        return;
      }

      form.reset();
      setState("success");
    } catch {
      setErrorMessage(GENERIC_ERROR);
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field id="firstName" label="Prénom" autoComplete="given-name" required />
        <Field id="lastName" label="Nom" autoComplete="family-name" />
      </div>
      <Field
        id="email"
        label="E-mail"
        type="email"
        autoComplete="email"
        hint="E-mail ou téléphone requis"
      />
      <Field id="phone" label="Téléphone" type="tel" autoComplete="tel" />
      <Field id="subject" label="Objet" />
      <div>
        <label
          htmlFor="message"
          className="block text-xs tracking-[0.2em] uppercase text-muted mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={4000}
          className="block w-full rounded-2xl bg-white ring-1 ring-line focus:ring-2 focus:ring-primary focus:outline-none px-5 py-4 text-ink placeholder:text-muted transition"
          placeholder="Décrivez votre demande…"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="botField">Ne pas remplir</label>
        <input
          id="botField"
          name="botField"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-ink text-white text-sm font-medium hover:bg-primary-deep disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {state === "submitting" ? "Envoi en cours…" : "Envoyer le message"}
      </button>

      <p aria-live="polite" className="min-h-[1.25rem] text-sm">
        {state === "success" && (
          <span className="text-primary-deep">{SUCCESS_MESSAGE}</span>
        )}
        {state === "error" && (
          <span className="text-red-600">{errorMessage}</span>
        )}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  autoComplete,
  hint,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs tracking-[0.2em] uppercase text-muted mb-2"
      >
        {label}
        {required && " *"}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={200}
        className="block w-full rounded-full bg-white ring-1 ring-line focus:ring-2 focus:ring-primary focus:outline-none h-12 px-5 text-ink placeholder:text-muted transition"
      />
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}
