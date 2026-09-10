import { desc } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";
import { authEnabled, getAuth } from "@/lib/auth";
import { dbConfigured, getDb, schema } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { getLocale } from "@/lib/i18n/server";
import { newId } from "@/lib/storage/store";

/**
 * Feedback + food requests. POST is open to anyone (guests included) so a
 * parent can send a note in one tap; each submission is stored and emailed to
 * the owner for daily review. GET is owner-only (same CRON_SECRET as /stats)
 * for batch review.
 */

const bodySchema = z.object({
  category: z.enum(["general", "idea", "bug", "food-request"]),
  message: z.string().trim().min(1).max(4000),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  page: z.string().max(200).optional(),
});

const FEEDBACK_EMAIL = process.env.FEEDBACK_EMAIL ?? "hello@opensolids.org";

const CATEGORY_LABEL: Record<string, string> = {
  general: "general",
  idea: "idea",
  bug: "bug",
  "food-request": "food request",
};

export async function POST(req: Request) {
  if (!dbConfigured()) return Response.json({ ok: false, error: "Not available." }, { status: 503 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Invalid feedback." }, { status: 400 });
  }
  const { category, message, page } = parsed.data;
  const email = parsed.data.email || undefined;

  // Sign-in is optional — attach the user id only when there is a session.
  let userId: string | null = null;
  if (authEnabled) {
    try {
      const session = await getAuth().api.getSession({ headers: await headers() });
      userId = session?.user?.id ?? null;
    } catch {
      userId = null;
    }
  }
  const locale = await getLocale();

  await getDb()
    .insert(schema.feedback)
    .values({ id: newId(), category, message, page: page ?? null, locale, userId, email: email ?? null });

  // Best-effort: a failed notification never fails the submission.
  const label = CATEGORY_LABEL[category] ?? category;
  void sendEmail({
    to: FEEDBACK_EMAIL,
    subject: `[OpenSolids feedback] ${label}: ${message.slice(0, 50)}`,
    text: [
      `Category: ${label}`,
      `Message: ${message}`,
      `Page: ${page ?? "—"}`,
      `Locale: ${locale}`,
      `Signed in: ${userId ? "yes" : "no"}`,
      email ? `Reply-to: ${email}` : "Reply-to: (not provided)",
    ].join("\n"),
  });

  return Response.json({ ok: true });
}

export async function GET(req: Request) {
  if (!process.env.CRON_SECRET || req.headers.get("x-cron-secret") !== process.env.CRON_SECRET) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!dbConfigured()) return Response.json({ error: "No database." }, { status: 503 });

  const rows = await getDb()
    .select()
    .from(schema.feedback)
    .orderBy(desc(schema.feedback.createdAt))
    .limit(200);
  return Response.json({ count: rows.length, feedback: rows });
}
