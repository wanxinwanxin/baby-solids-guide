import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "./db";

/**
 * Phase 6 auth. Providers light up from env:
 * - email + password always (verification skipped until RESEND_API_KEY exists)
 * - Google OAuth when GOOGLE_CLIENT_ID/SECRET are set
 * - Sign in with Apple: add here after Apple Developer enrollment (Phase 6.1)
 */

export const authEnabled = !!process.env.DATABASE_URL && !!process.env.BETTER_AUTH_SECRET;

export const googleEnabled = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

function buildAuth() {
  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(getDb(), { provider: "pg" }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    socialProviders: googleEnabled
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          },
        }
      : undefined,
  });
}

let _auth: ReturnType<typeof buildAuth> | null = null;

export function getAuth() {
  if (!_auth) _auth = buildAuth();
  return _auth;
}

/** better-auth CLI entrypoint (schema generation) — must be named `auth`. */
export const auth = authEnabled ? getAuth() : (null as unknown as ReturnType<typeof buildAuth>);
