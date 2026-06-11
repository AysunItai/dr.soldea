import type { NextRequest } from "next/server";
import { sendContactFormEmail } from "@/lib/resend";

/**
 * Contact form submission endpoint.
 *
 * Flow
 * ----
 *  1. Patient fills the form on /contact
 *  2. ContactForm POSTs JSON to this route
 *  3. We validate (required fields, email shape, honeypot) and rate-limit
 *  4. We send the message via Resend to `CONTACT_TO_EMAIL`
 *     - `from`     : contact@echographielyon.fr (verified domain)
 *     - `replyTo`  : the patient's email when provided
 *     - `subject`  : Nouveau message depuis echographielyon.fr
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD = 200;
const MAX_MESSAGE = 4000;

const GENERIC_ERROR =
  "Une erreur est survenue. Veuillez réessayer ou contacter le cabinet directement.";

type Body = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  botField?: unknown;
};

function rateLimit(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { ok: true };
}

function asString(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  if (trimmed.length > max) return null;
  return trimmed;
}

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return Response.json({ ok: false, error: GENERIC_ERROR }, { status: 500 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 },
    );
  }

  if (typeof body.botField === "string" && body.botField.trim() !== "") {
    return Response.json({ ok: true });
  }

  const firstName = asString(body.firstName, MAX_FIELD);
  const lastName = asString(body.lastName, MAX_FIELD) ?? "";
  const email = asString(body.email, MAX_FIELD);
  const phone = asString(body.phone, MAX_FIELD);
  const subject = asString(body.subject, MAX_FIELD);
  const message = asString(body.message, MAX_MESSAGE);

  if (!firstName) {
    return Response.json(
      { ok: false, error: "Merci d'indiquer votre nom." },
      { status: 400 },
    );
  }

  if (!email && !phone) {
    return Response.json(
      {
        ok: false,
        error: "Merci d'indiquer un e-mail ou un numéro de téléphone.",
      },
      { status: 400 },
    );
  }

  if (!message) {
    return Response.json(
      { ok: false, error: "Merci de rédiger votre message." },
      { status: 400 },
    );
  }

  if (email && !EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "Adresse e-mail invalide." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limit = rateLimit(ip);
  if (!limit.ok) {
    return Response.json(
      {
        ok: false,
        error:
          "Trop de demandes. Merci de patienter quelques minutes avant de réessayer.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  try {
    const result = await sendContactFormEmail({
      firstName,
      lastName,
      email: email ?? undefined,
      phone: phone ?? undefined,
      subject: subject ?? undefined,
      message,
    });

    if (!result.ok) {
      return Response.json({ ok: false, error: GENERIC_ERROR }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[contact] unexpected error",
        e instanceof Error ? e.message : "unknown",
      );
    } else {
      console.error("[contact] unexpected error");
    }
    return Response.json({ ok: false, error: GENERIC_ERROR }, { status: 500 });
  }
}
