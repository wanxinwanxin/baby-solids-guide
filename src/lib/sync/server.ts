import { and, eq, inArray } from "drizzle-orm";
import type { Db } from "@/lib/db";
import { schema } from "@/lib/db";
import type { SyncSnapshot } from "@/lib/storage/store";
import type { AllergenOverride, BabyProfile, CheckIn, ExposureLog, Plan } from "@/lib/storage/types";

const { babies, exposureLogs, allergenOverrides, checkIns, plans } = schema;

const ts = (v?: string) => (v ? new Date(v) : new Date(0));

export async function loadSnapshot(db: Db, userId: string): Promise<SyncSnapshot> {
  const babyRows = await db.select().from(babies).where(eq(babies.userId, userId));
  const babyIds = babyRows.map((b) => b.id);
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
    if (snap.deletedBabyIds.length > 0) {
      await tx
        .delete(babies)
        .where(and(eq(babies.userId, userId), inArray(babies.id, snap.deletedBabyIds)));
    }

    for (const baby of snap.babies) {
      await tx
        .insert(babies)
        .values({ id: baby.id, userId, payload: baby, updatedAt: ts(baby.updatedAt) })
        .onConflictDoUpdate({
          target: babies.id,
          set: { payload: baby, updatedAt: ts(baby.updatedAt) },
          setWhere: eq(babies.userId, userId),
        });
    }

    const babyIds = snap.babies.map((b) => b.id);
    if (babyIds.length === 0) return;

    for (const log of snap.logs) {
      if (!babyIds.includes(log.babyId)) continue;
      await tx
        .insert(exposureLogs)
        .values({ id: log.id, babyId: log.babyId, payload: log, updatedAt: ts(log.updatedAt) })
        .onConflictDoUpdate({
          target: exposureLogs.id,
          set: { payload: log, updatedAt: ts(log.updatedAt), deletedAt: null },
        });
    }
    if (snap.deletedLogIds.length > 0) {
      await tx
        .update(exposureLogs)
        .set({ deletedAt: new Date() })
        .where(inArray(exposureLogs.id, snap.deletedLogIds));
    }

    // Overrides / check-ins / plans: the merged snapshot is authoritative —
    // replace per baby (tiny row counts).
    await tx.delete(allergenOverrides).where(inArray(allergenOverrides.babyId, babyIds));
    for (const o of snap.overrides) {
      if (!o.babyId || !babyIds.includes(o.babyId)) continue;
      await tx.insert(allergenOverrides).values({
        babyId: o.babyId,
        allergenId: o.allergenId,
        payload: o,
        updatedAt: ts(o.updatedAt),
      });
    }
    await tx.delete(checkIns).where(inArray(checkIns.babyId, babyIds));
    for (const c of snap.checkIns) {
      if (!babyIds.includes(c.babyId)) continue;
      await tx.insert(checkIns).values({ id: c.id, babyId: c.babyId, payload: c, updatedAt: ts(c.updatedAt) });
    }
    await tx.delete(plans).where(inArray(plans.babyId, babyIds));
    for (const p of snap.plans) {
      if (!babyIds.includes(p.babyId)) continue;
      await tx.insert(plans).values({ babyId: p.babyId, payload: p, updatedAt: ts(p.updatedAt) });
    }
  });
}
