import { and, eq, inArray } from "drizzle-orm";
import type { Db } from "@/lib/db";
import { schema } from "@/lib/db";
import type { SyncSnapshot } from "@/lib/storage/store";
import type { AllergenOverride, BabyProfile, CheckIn, ExposureLog, Plan } from "@/lib/storage/types";

const { babies, babyMembers, exposureLogs, allergenOverrides, checkIns, plans } = schema;

const ts = (v?: string) => (v ? new Date(v) : new Date(0));

/**
 * Part III D4 — access is defined by membership, not creation. Every baby
 * the user is a member of (owner or invited co-parent) is in their
 * snapshot; writes are equal-trust between members. babies.userId remains
 * "created by" and is reassigned before account deletion when co-parents
 * remain (see /api/account).
 */
export async function memberBabyIds(db: Db, userId: string): Promise<string[]> {
  const rows = await db
    .select({ babyId: babyMembers.babyId })
    .from(babyMembers)
    .where(eq(babyMembers.userId, userId));
  return rows.map((r) => r.babyId);
}

export async function loadSnapshot(db: Db, userId: string): Promise<SyncSnapshot> {
  const babyIds = await memberBabyIds(db, userId);
  const babyRows =
    babyIds.length === 0 ? [] : await db.select().from(babies).where(inArray(babies.id, babyIds));
  const children =
    babyIds.length === 0
      ? { logRows: [], overrideRows: [], checkInRows: [], planRows: [] }
      : {
          logRows: await db.select().from(exposureLogs).where(inArray(exposureLogs.babyId, babyIds)),
          overrideRows: await db
            .select()
            .from(allergenOverrides)
            .where(inArray(allergenOverrides.babyId, babyIds)),
          checkInRows: await db.select().from(checkIns).where(inArray(checkIns.babyId, babyIds)),
          planRows: await db.select().from(plans).where(inArray(plans.babyId, babyIds)),
        };

  return {
    babies: babyRows.map((r) => r.payload as BabyProfile),
    logs: children.logRows.filter((r) => !r.deletedAt).map((r) => r.payload as ExposureLog),
    overrides: children.overrideRows.map((r) => r.payload as AllergenOverride),
    checkIns: children.checkInRows.map((r) => r.payload as CheckIn),
    plans: children.planRows.map((r) => r.payload as Plan),
    deletedLogIds: children.logRows.filter((r) => !!r.deletedAt).map((r) => r.id),
    deletedBabyIds: [],
  };
}

export async function saveSnapshot(db: Db, userId: string, snap: SyncSnapshot): Promise<void> {
  await db.transaction(async (tx) => {
    const memberIds = new Set(
      (
        await tx
          .select({ babyId: babyMembers.babyId })
          .from(babyMembers)
          .where(eq(babyMembers.userId, userId))
      ).map((r) => r.babyId),
    );

    // Equal-trust delete: any member can tombstone a shared baby — co-parents
    // are equal guardians. Non-members can't touch anything.
    const deletable = snap.deletedBabyIds.filter((id) => memberIds.has(id));
    if (deletable.length > 0) {
      await tx.delete(babies).where(inArray(babies.id, deletable));
      for (const id of deletable) memberIds.delete(id);
    }

    for (const baby of snap.babies) {
      if (memberIds.has(baby.id)) {
        await tx
          .update(babies)
          .set({ payload: baby, updatedAt: ts(baby.updatedAt) })
          .where(eq(babies.id, baby.id));
        continue;
      }
      // Not a member: only ever INSERT (a brand-new baby from this device).
      // If the id already exists it belongs to someone else — refuse quietly.
      const inserted = await tx
        .insert(babies)
        .values({ id: baby.id, userId, payload: baby, updatedAt: ts(baby.updatedAt) })
        .onConflictDoNothing()
        .returning({ id: babies.id });
      if (inserted.length > 0) {
        await tx
          .insert(babyMembers)
          .values({ babyId: baby.id, userId, role: "owner" })
          .onConflictDoNothing();
        memberIds.add(baby.id);
      }
    }

    // Children may only land on babies this user can access — and only the
    // ones present in this snapshot get their replace-style tables rewritten.
    const snapBabyIds = snap.babies.map((b) => b.id).filter((id) => memberIds.has(id));
    if (snapBabyIds.length === 0) return;

    for (const log of snap.logs) {
      if (!snapBabyIds.includes(log.babyId)) continue;
      await tx
        .insert(exposureLogs)
        .values({ id: log.id, babyId: log.babyId, payload: log, updatedAt: ts(log.updatedAt) })
        .onConflictDoUpdate({
          target: exposureLogs.id,
          set: { payload: log, updatedAt: ts(log.updatedAt), deletedAt: null },
          setWhere: inArray(exposureLogs.babyId, snapBabyIds),
        });
    }
    if (snap.deletedLogIds.length > 0) {
      await tx
        .update(exposureLogs)
        .set({ deletedAt: new Date() })
        .where(
          and(
            inArray(exposureLogs.id, snap.deletedLogIds),
            inArray(exposureLogs.babyId, snapBabyIds),
          ),
        );
    }

    // Overrides / check-ins / plans: the merged snapshot is authoritative —
    // replace per accessible baby (tiny row counts).
    await tx.delete(allergenOverrides).where(inArray(allergenOverrides.babyId, snapBabyIds));
    for (const o of snap.overrides) {
      if (!o.babyId || !snapBabyIds.includes(o.babyId)) continue;
      await tx.insert(allergenOverrides).values({
        babyId: o.babyId,
        allergenId: o.allergenId,
        payload: o,
        updatedAt: ts(o.updatedAt),
      });
    }
    await tx.delete(checkIns).where(inArray(checkIns.babyId, snapBabyIds));
    for (const c of snap.checkIns) {
      if (!snapBabyIds.includes(c.babyId)) continue;
      await tx.insert(checkIns).values({ id: c.id, babyId: c.babyId, payload: c, updatedAt: ts(c.updatedAt) });
    }
    await tx.delete(plans).where(inArray(plans.babyId, snapBabyIds));
    for (const p of snap.plans) {
      if (!snapBabyIds.includes(p.babyId)) continue;
      await tx.insert(plans).values({ babyId: p.babyId, payload: p, updatedAt: ts(p.updatedAt) });
    }
  });
}
