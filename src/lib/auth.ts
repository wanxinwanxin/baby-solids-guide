import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "./db";
import { emailEnabled, sendEmail } from "./email";

/**
 * Phase 6 auth. Providers light up from env:
 * - email + password always (verification + password reset once RESEND_API_KEY exists)
 * - Google OAuth when GOOGLE_CLIENT_ID/SECRET are set
 * - Sign in with Apple: add here after Apple Developer enrollment (Phase 6.1)
 */

export const authEnabled = !!process.env.DATABASE_URL && !!process.env.BETTER_AUTH_SECRET;

export const googleEnabled = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

function buildAuth() {
  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins:
      process.env.NODE_ENV === "production"
        ? undefined
        : ["http://localhost:3000", "http://localhost:3100"],
    database: drizzleAdapter(getDb(), { provider: "pg" }),
    emailAndPassword: {
      enabled: true,
      // Stays false so pre-verification accounts keep working; flip once a
      // verified sending domain is configured (EMAIL_FROM).
      requireEmailVerification: false,
      ...(emailEnabled
        ? {
            sendResetPassword: async ({ user, url }: { user: { email: string }; url: string }) => {
              await sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: "Someone (hopefully you) asked to reset the password for this account. The link is good for one hour — if this wasn't you, you can ignore this email.",
                actionUrl: url,
                actionLabel: "Reset password",
              });
            },
          }
        : {}),
    },
    ...(emailEnabled
      ? {
          emailVerification: {
            sendOnSignUp: true,
            sendVerificationEmail: async ({ user, url }: { user: { email: string }; url: string }) => {
              await sendEmail({
                to: user.email,
                subject: "Confirm your email",
                text: "Confirm this address so your baby's food history can be recovered if you ever lose access.",
                actionUrl: url,
                actionLabel: "Confirm email",
              });
            },
          },
        }
      : {}),
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
