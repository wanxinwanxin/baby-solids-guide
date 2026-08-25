import { randomBytes } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { authEnabled, getAuth } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";

const INVITE_TTL_MS = 72 * 3600 * 1000;

/** D4 — owner creates a co-parent invite link (72h, single-family trust). */
export async function POST(req: Request, ctx: { params: Promise<{ babyId: string }> }) {
  if (!authEnabled) return Response.json({ error: "Auth is not configured." }, { status: 404 });
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) return Response.json({ error: "Sign in required." }, { status: 401 });
  const { babyId } = await ctx.params;

  const db = getDb();
  const [membership] = await db
    .select()
    .from(schema.babyMembers)
    .where(
      and(eq(schema.babyMembers.babyId, babyId), eq(schema.babyMembers.userId, session.user.id)),
    )
    .limit(1);
  if (membership?.role !== "owner") {
    return Response.json({ error: "Only the baby's owner can invite." }, { status: 403 });
  }

  const token = randomBytes(24).toString("base64url");
  const expiresAt = new Date(Date.now() + INVITE_TTL_MS);
  await db.insert(schema.invites).values({
    babyId,
    token,
    createdByUserId: session.user.id,
    expiresAt,
  });

  const origin = process.env.BETTER_AUTH_URL ?? new URL(req.url).origin;
  return Response.json({ url: `${origin}/join/${token}`, expiresAt: expiresAt.toISOString() });
}
