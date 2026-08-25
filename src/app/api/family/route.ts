import { eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { authEnabled, getAuth } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";
import type { BabyProfile } from "@/lib/storage/types";

/** D4 — the signed-in user's babies with their member lists and roles. */
export async function GET() {
  if (!authEnabled) return Response.json({ error: "Auth is not configured." }, { status: 404 });
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) return Response.json({ error: "Sign in required." }, { status: 401 });

  const db = getDb();
  const myMemberships = await db
    .select()
    .from(schema.babyMembers)
    .where(eq(schema.babyMembers.userId, session.user.id));
  if (myMemberships.length === 0) return Response.json({ babies: [] });

  const babyIds = myMemberships.map((m) => m.babyId);
  const babyRows = await db.select().from(schema.babies).where(inArray(schema.babies.id, babyIds));
  const allMembers = await db
    .select({
      babyId: schema.babyMembers.babyId,
      userId: schema.babyMembers.userId,
      role: schema.babyMembers.role,
      email: schema.user.email,
      name: schema.user.name,
    })
    .from(schema.babyMembers)
    .innerJoin(schema.user, eq(schema.user.id, schema.babyMembers.userId))
    .where(inArray(schema.babyMembers.babyId, babyIds));

  return Response.json({
    babies: babyRows.map((b) => ({
      babyId: b.id,
      nickname: (b.payload as BabyProfile).nickname,
      myRole: myMemberships.find((m) => m.babyId === b.id)?.role ?? "member",
      members: allMembers
        .filter((m) => m.babyId === b.id)
        .map((m) => ({ userId: m.userId, email: m.email, name: m.name, role: m.role })),
    })),
  });
}
