import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { authEnabled, getAuth } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";

/** D4 — owner removes a co-parent (never themselves; ownership transfers
 * only via account deletion hand-off). */
export async function DELETE(req: Request, ctx: { params: Promise<{ babyId: string }> }) {
  if (!authEnabled) return Response.json({ error: "Auth is not configured." }, { status: 404 });
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) return Response.json({ error: "Sign in required." }, { status: 401 });
  const { babyId } = await ctx.params;
  const targetUserId = new URL(req.url).searchParams.get("userId");
  if (!targetUserId) return Response.json({ error: "userId is required." }, { status: 400 });
  if (targetUserId === session.user.id) {
    return Response.json({ error: "Owners can't remove themselves." }, { status: 400 });
  }

  const db = getDb();
  const [membership] = await db
    .select()
    .from(schema.babyMembers)
    .where(
      and(eq(schema.babyMembers.babyId, babyId), eq(schema.babyMembers.userId, session.user.id)),
    )
    .limit(1);
  if (membership?.role !== "owner") {
    return Response.json({ error: "Only the baby's owner can remove members." }, { status: 403 });
  }

  await db
    .delete(schema.babyMembers)
    .where(and(eq(schema.babyMembers.babyId, babyId), eq(schema.babyMembers.userId, targetUserId)));
  return Response.json({ ok: true });
}
