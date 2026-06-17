import { Resend } from "resend";

export type ContactEmailPayload = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
};

const DEFAULT_TO = "cabinett.gynecologielyon@gmail.com";
const DEFAULT_FROM = "contact@echographielyon.fr";
const EMAIL_SUBJECT = "Nouveau message depuis echographielyon.fr";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

function getToEmail(): string {
  return process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO;
}

function getFromEmail(): string {
  return process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM;
}

function buildEmailBodies(payload: ContactEmailPayload) {
  const fullName = [payload.firstName, payload.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const text = [
    "Nouveau message depuis le site echographielyon.fr",
    "",
    `Nom        : ${fullName}`,
    payload.email ? `E-mail     : ${payload.email}` : null,
    payload.phone ? `Téléphone  : ${payload.phone}` : null,
    payload.subject ? `Objet      : ${payload.subject}` : null,
    "",
    "Message",
    "-------",
    payload.message,
    "",
    payload.email
      ? `— Répondre à ce message renverra directement à ${payload.email}.`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
<!doctype html>
<html lang="fr"><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0b1f3d;background:#f6efe6;padding:24px;line-height:1.55">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e6ddd0;border-radius:16px;padding:28px">
    <p style="margin:0 0 16px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#8f3d56">
      Nouveau message — Centre d'Échographie de la Femme OPÉRA
    </p>
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.25">${escapeHtml(fullName)}</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${
        payload.email
          ? `<tr><td style="padding:6px 0;color:#5a6577;width:120px">E-mail</td>
          <td style="padding:6px 0"><a href="mailto:${escapeHtml(payload.email)}" style="color:#0b1f3d">${escapeHtml(payload.email)}</a></td></tr>`
          : ""
      }
      ${
        payload.phone
          ? `<tr><td style="padding:6px 0;color:#5a6577">Téléphone</td><td style="padding:6px 0">${escapeHtml(payload.phone)}</td></tr>`
          : ""
      }
      ${
        payload.subject
          ? `<tr><td style="padding:6px 0;color:#5a6577">Objet</td><td style="padding:6px 0">${escapeHtml(payload.subject)}</td></tr>`
          : ""
      }
    </table>
    <hr style="border:none;border-top:1px solid #e6ddd0;margin:20px 0"/>
    <p style="margin:0 0 8px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#5a6577">Message</p>
    <p style="white-space:pre-wrap;margin:0;font-size:15px">${escapeHtml(payload.message)}</p>
    ${
      payload.email
        ? `<hr style="border:none;border-top:1px solid #e6ddd0;margin:20px 0"/>
    <p style="margin:0;font-size:12px;color:#5a6577">
      Répondre à ce message renverra directement à <strong>${escapeHtml(payload.email)}</strong>.
    </p>`
        : ""
    }
  </div>
</body></html>`.trim();

  return { fullName, text, html };
}

export async function sendContactFormEmail(
  payload: ContactEmailPayload,
): Promise<{ ok: true } | { ok: false }> {
  const { text, html } = buildEmailBodies(payload);
  const from = `Centre d'Échographie OPÉRA <${getFromEmail()}>`;

  const resend = getResendClient();
  const { error } = await resend.emails.send({
    from,
    to: [getToEmail()],
    ...(payload.email ? { replyTo: payload.email } : {}),
    subject: EMAIL_SUBJECT,
    text,
    html,
  });

  if (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[contact] Resend delivery failed:", error.name ?? "unknown");
    } else {
      console.error("[contact] Resend delivery failed");
    }
    return { ok: false };
  }

  return { ok: true };
}
