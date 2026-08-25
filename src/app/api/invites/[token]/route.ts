import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { authEnabled, getAuth } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";
import type { BabyProfile } from "@/lib/storage/types";

/** D4 — invite preview (the token itself is the secret). */
export async function GET(_req: Request, ctx: { params: Promise<{ token: string }> }) {
  if (!authEnabled) return Response.json({ error: "Auth is not configured." }, { status: 404 });
  const { token } = await ctx.params;
  const db = getDb();
  const [invite] = await db.select().from(schema.invites).where(eq(schema.invites.token, token)).limit(1);
  if (!invite) return Response.json({ error: "Invite not found." }, { status: 404 });
  if (invite.expiresAt.getTime() < Date.now()) {
    return Response.json({ error: "This invite has expired — ask for a fresh link." }, { status: 410 });
  }
  const [baby] = await db.select().from(schema.babies).where(eq(schema.babies.id, invite.babyId)).limit(1);
  if (!baby) return Response.json({ error: "Invite not found." }, { status: 404 });
  const [inviter] = await db
    .select({ email: schema.user.email })
    .from(schema.user)
    .where(eq(schema.user.id, invite.createdByUserId))
    .limit(1);
  return Response.json({
    nickname: (baby.payload as BabyProfile).nickname,
    invitedBy: inviter?.email ?? "a co-parent",
  });
}

/** D4 — accept: signed-in user becomes a member (idempotent). */
export async function POST(_req: Request, ctx: { params: Promise<{ token: string }> }) {
  if (!authEnabled) return Response.json({ error: "Auth is not configured." }, { status: 404 });
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) return Response.json({ error: "Sign in required." }, { status: 401 });
  const { token } = await ctx.params;

  const db = getDb();
  const [invite] = await db.select().from(schema.invites).where(eq(schema.invites.token, token)).limit(1);
  if (!invite) return Response.json({ error: "Invite not found." }, { status: 404 });
  if (invite.expiresAt.getTime() < Date.now()) {
    return Response.json({ error: "This invite has expired — ask for a fresh link." }, { status: 410 });
  }

  await db
    .insert(schema.babyMembers)
    .values({ babyId: invite.babyId, userId: session.user.id, role: "member" })
    .onConflictDoNothing();
  await db
    .update(schema.invites)
    .set({ acceptedByUserId: session.user.id, acceptedAt: new Date() })
    .where(eq(schema.invites.id, invite.id));

  const [baby] = await db.select().from(schema.babies).where(eq(schema.babies.id, invite.babyId)).limit(1);
  return Response.json({
    ok: true,
    babyId: invite.babyId,
    nickname: baby ? (baby.payload as BabyProfile).nickname : null,
  });
}
