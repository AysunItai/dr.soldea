#!/usr/bin/env node
/**
 * Generate a bcrypt hash for ADMIN_PASSWORD_HASH.
 * Usage: npm run admin:hash -- "your-secure-password"
 */
import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Usage: npm run admin:hash -- \"your-password\"");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
const escaped = hash.replace(/\$/g, "\\$");

console.log("\n1) Vercel (Environment Variables) — paste RAW hash, no quotes, no backslashes:\n");
console.log(hash);
console.log("\n2) .env.local — escape every $ as \\$ (Next.js expands $VAR in .env files):\n");
console.log(`ADMIN_PASSWORD_HASH='${escaped}'`);
console.log("\nAlso set ADMIN_JWT_SECRET to a random string (32+ chars) on Vercel and in .env.local.\n");
