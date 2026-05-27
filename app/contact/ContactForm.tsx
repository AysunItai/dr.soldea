"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    // Wire this up to your preferred form backend (Resend, Formspree, a server
    // action, etc.). For now, simulate a successful submission.
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      (event.currentTarget as HTMLFormElement).reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field id="firstName" label="Prénom" required />
        <Field id="lastName" label="Nom" required />
      </div>
      <Field id="email" label="E-mail" type="email" required />
      <Field id="phone" label="Téléphone" type="tel" />
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
          className="block w-full rounded-2xl bg-white ring-1 ring-line focus:ring-2 focus:ring-primary focus:outline-none px-5 py-4 text-ink placeholder:text-muted transition"
          placeholder="Décrivez votre demande…"
        />
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-ink text-white text-sm font-medium hover:bg-primary-deep disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {state === "submitting" ? "Envoi en cours…" : "Envoyer le message"}
      </button>

      {state === "success" && (
        <p className="text-sm text-primary-deep">
          Merci, votre message a bien été envoyé. Nous reviendrons vers vous
          rapidement.
        </p>
      )}
      {state === "error" && (
        <p className="text-sm text-red-600">
          Une erreur est survenue, merci de réessayer ou de nous appeler
          directement.
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
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
        className="block w-full rounded-full bg-white ring-1 ring-line focus:ring-2 focus:ring-primary focus:outline-none h-12 px-5 text-ink placeholder:text-muted transition"
      />
    </div>
  );
}
