import { and, eq, ne } from "drizzle-orm";
import type { Db } from "@/lib/db";
import { schema } from "@/lib/db";

/**
 * D4 — account deletion with family hand-off. Babies created by this user
 * that still have co-parents are reassigned (creator FK moved, co-parent
 * promoted to owner) so the user-row cascade only removes babies nobody
 * else can access.
 */
export async function deleteUserWithHandoff(db: Db, userId: string): Promise<void> {
  await db.transaction(async (tx) => {
    const created = await tx
      .select({ id: schema.babies.id })
      .from(schema.babies)
      .where(eq(schema.babies.userId, userId));
    for (const baby of created) {
      const [heir] = await tx
        .select({ userId: schema.babyMembers.userId })
        .from(schema.babyMembers)
        .where(and(eq(schema.babyMembers.babyId, baby.id), ne(schema.babyMembers.userId, userId)))
        .limit(1);
      if (heir) {
        await tx.update(schema.babies).set({ userId: heir.userId }).where(eq(schema.babies.id, baby.id));
        await tx
          .update(schema.babyMembers)
          .set({ role: "owner" })
          .where(
            and(eq(schema.babyMembers.babyId, baby.id), eq(schema.babyMembers.userId, heir.userId)),
          );
      }
    }
    await tx.delete(schema.user).where(eq(schema.user.id, userId));
  });
}
