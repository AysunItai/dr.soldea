import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth-session";
import { verifyPassword } from "@/lib/auth-password";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = RATE_LIMIT.get(ip);
  if (!bucket || now > bucket.resetAt) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (bucket.count >= 8) return false;
  bucket.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  let password: string;
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!password) {
    return NextResponse.json({ error: "Mot de passe requis." }, { status: 400 });
  }

  try {
    const ok = await verifyPassword(password);
    if (!ok) {
      return NextResponse.json(
        { error: "Mot de passe incorrect." },
        { status: 401 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Authentification non configurée sur le serveur." },
      { status: 500 },
    );
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions());
  return response;
}
