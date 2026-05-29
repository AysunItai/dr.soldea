import { Resend } from "resend";
import type { NextRequest } from "next/server";

/**
 * Contact form submission endpoint.
 *
 * Flow
 * ----
 *  1. Patient fills the form on /contact
 *  2. ContactForm POSTs JSON to this route
 *  3. We validate (required fields, email shape, honeypot) and rate-limit
 *  4. We send the message via Resend to `CONTACT_RECIPIENT`
 *     - `from`     : a verified Resend sender (default fallback if no
 *                    custom domain is verified yet)
 *     - `replyTo`  : the patient's email → "Reply" goes to the patient
 *     - `subject`  : tagged so submissions are easy to filter in Gmail
 *
 * Why route handler (not server action)?
 *   - Decouples backend from the React tree, easier to call from any client
 *   - Better for adding rate limiting / IP blocking later
 *
 * Anti-spam
 *   - `botField` (honeypot): hidden input the form must leave empty.
 *     Bots blindly fill every field; humans don't see it.
 *   - In-memory IP rate limit: 5 requests / 10 min per IP. Resets on
 *     deploy. For a low-volume clinic site, this is enough. Upgrade to a
 *     Redis-backed limiter later if abuse appears.
 */

// Force Node.js runtime — Resend SDK uses Node primitives.
export const runtime = "nodejs";
// Never cache POST anyway, but be explicit so nobody flips this.
export const dynamic = "force-dynamic";

const RECIPIENT =
  process.env.CONTACT_RECIPIENT ?? "cabinett.gynecologielyon@gmail.com";

/**
 * Sender address used in the `from` header. Default is Resend's universal
 * `onboarding@resend.dev` so submissions work even before a domain has
 * been verified. Switch to `contact@gynecologuelyon.fr` (or similar)
 * via env var after verifying the domain in Resend.
 */
const SENDER =
  process.env.CONTACT_SENDER ??
  "Dr Alexandra Soldea <onboarding@resend.dev>";

/* ------------------------------------------------------------------ */
/* Rate limiting                                                       */
/* ------------------------------------------------------------------ */

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

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

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD = 200;
const MAX_MESSAGE = 4000;

type Body = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  botField?: unknown;
};

function asString(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  if (trimmed.length > max) return null;
  return trimmed;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ------------------------------------------------------------------ */
/* Handler                                                             */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  // Resolve the API key lazily so the build doesn't fail if it's missing
  // in CI / local without `.env.local`. Misconfiguration becomes a clean
  // 500 at request time instead of a build-time crash.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return Response.json(
      { ok: false, error: "Le service e-mail est mal configuré." },
      { status: 500 },
    );
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

  // Honeypot — bots fill every field; humans never see this one.
  if (typeof body.botField === "string" && body.botField.trim() !== "") {
    // Pretend it worked. Don't let bots know they were caught.
    return Response.json({ ok: true });
  }

  const firstName = asString(body.firstName, MAX_FIELD);
  const lastName = asString(body.lastName, MAX_FIELD);
  const email = asString(body.email, MAX_FIELD);
  const phone = asString(body.phone, MAX_FIELD);
  const subject = asString(body.subject, MAX_FIELD);
  const message = asString(body.message, MAX_MESSAGE);

  if (!firstName || !lastName || !email || !message) {
    return Response.json(
      { ok: false, error: "Merci de remplir les champs obligatoires." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "Adresse e-mail invalide." },
      { status: 400 },
    );
  }

  // IP for rate limiting. Vercel + most proxies set x-forwarded-for; fall
  // back to a sentinel so the limiter still functions in dev.
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

  /* ---------------- Compose & send ------------------------------- */

  const fullName = `${firstName} ${lastName}`;
  const subjectLine = subject
    ? `Nouveau message — ${fullName} — ${subject}`
    : `Nouveau message — ${fullName}`;

  // Plain text — Gmail mobile defaults to text on narrow screens.
  const text = [
    `Nouveau message depuis le site gynecologuelyon.fr`,
    ``,
    `Nom        : ${fullName}`,
    `E-mail     : ${email}`,
    phone ? `Téléphone  : ${phone}` : null,
    subject ? `Objet      : ${subject}` : null,
    ``,
    `Message`,
    `-------`,
    message,
    ``,
    `— Répondre à ce message renverra directement à ${email}.`,
  ]
    .filter(Boolean)
    .join("\n");

  // Minimal, readable HTML. Email clients hate complex CSS — keep it inline.
  const html = `
<!doctype html>
<html lang="fr"><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0b1f3d;background:#f6efe6;padding:24px;line-height:1.55">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e6ddd0;border-radius:16px;padding:28px">
    <p style="margin:0 0 16px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#3a8d96">
      Nouveau message — gynecologuelyon.fr
    </p>
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.25">${escapeHtml(fullName)}</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:6px 0;color:#5a6577;width:120px">E-mail</td>
          <td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}" style="color:#0b1f3d">${escapeHtml(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding:6px 0;color:#5a6577">Téléphone</td><td style="padding:6px 0">${escapeHtml(phone)}</td></tr>` : ""}
      ${subject ? `<tr><td style="padding:6px 0;color:#5a6577">Objet</td><td style="padding:6px 0">${escapeHtml(subject)}</td></tr>` : ""}
    </table>
    <hr style="border:none;border-top:1px solid #e6ddd0;margin:20px 0"/>
    <p style="margin:0 0 8px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#5a6577">Message</p>
    <p style="white-space:pre-wrap;margin:0;font-size:15px">${escapeHtml(message)}</p>
    <hr style="border:none;border-top:1px solid #e6ddd0;margin:20px 0"/>
    <p style="margin:0;font-size:12px;color:#5a6577">
      Répondre à ce message renverra directement à <strong>${escapeHtml(email)}</strong>.
    </p>
  </div>
</body></html>`.trim();

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: SENDER,
      to: [RECIPIENT],
      replyTo: email,
      subject: subjectLine,
      text,
      html,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return Response.json(
        { ok: false, error: "L'e-mail n'a pas pu être envoyé." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[contact] unexpected error", e);
    return Response.json(
      { ok: false, error: "L'e-mail n'a pas pu être envoyé." },
      { status: 500 },
    );
  }
}
