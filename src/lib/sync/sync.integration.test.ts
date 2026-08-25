import { beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { eq } from "drizzle-orm";
import { schema, type Db } from "@/lib/db";
import type { BabyProfile, ExposureLog } from "@/lib/storage/types";
import type { SyncSnapshot } from "@/lib/storage/store";
import { EMPTY_SNAPSHOT, mergeSnapshots } from "./merge";
import { loadSnapshot, saveSnapshot } from "./server";

/** Integration tests on pglite — real Postgres semantics, zero services. */

let db: Db;

const UUID_A = "11111111-1111-4111-8111-111111111111";
const UUID_LOG1 = "22222222-2222-4222-8222-222222222221";
const UUID_LOG2 = "22222222-2222-4222-8222-222222222222";

const baby = (id: string): BabyProfile => ({
  id,
  nickname: "Testling",
  birthDate: "2026-02-01",
  feedingStyle: "mixed",
  allergyRisk: { eczema: "none", existingFoodAllergy: false, familyHistoryAtopy: false },
  knownAllergies: [],
  doctorAvoidList: [],
  doctorClearances: [],
  conditions: [],
  textureStage: "S1",
  readiness: {},
  updatedAt: "2026-08-20T00:00:00.000Z",
});

const log = (id: string, babyId: string): ExposureLog => ({
  id,
  babyId,
  foodSlug: "carrot",
  date: "2026-08-20",
  prepBandUsed: "6-8m",
  amountEaten: "some",
  enjoyment: "loved",
  gagging: false,
  symptoms: [],
  updatedAt: "2026-08-20T00:00:00.000Z",
});

const snapWith = (partial: Partial<SyncSnapshot>): SyncSnapshot => ({ ...EMPTY_SNAPSHOT, ...partial });

async function createUser(id: string, email: string) {
  await db.insert(schema.user).values({
    id,
    name: email.split("@")[0],
    email,
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

beforeAll(async () => {
  const client = new PGlite();
  db = drizzle(client, { schema }) as unknown as Db;
  await migrate(db as never, { migrationsFolder: "./drizzle" });
  await createUser("user-a", "a@example.com");
  await createUser("user-b", "b@example.com");
});

describe("sync server persistence (pglite)", () => {
  it("push → pull roundtrip preserves the snapshot", async () => {
    const client = snapWith({
      babies: [baby(UUID_A)],
      logs: [log(UUID_LOG1, UUID_A), log(UUID_LOG2, UUID_A)],
      overrides: [
        {
          babyId: UUID_A,
          allergenId: "peanut",
          status: "maintaining",
          setOn: "2026-08-20",
          updatedAt: "2026-08-20T00:00:00.000Z",
        },
      ],
      plans: [
        {
          babyId: UUID_A,
          anchorMonday: "2026-08-17",
          entries: [{ id: "e1", foodSlug: "beef", weekIndex: 0 }],
          updatedAt: "2026-08-20T00:00:00.000Z",
        },
      ],
    });
    const merged = mergeSnapshots(await loadSnapshot(db, "user-a"), client);
    await saveSnapshot(db, "user-a", merged);

    const pulled = await loadSnapshot(db, "user-a");
    expect(pulled.babies).toHaveLength(1);
    expect(pulled.logs.map((l) => l.id).sort()).toEqual([UUID_LOG1, UUID_LOG2]);
    expect(pulled.overrides[0].allergenId).toBe("peanut");
    expect(pulled.plans[0].entries[0].foodSlug).toBe("beef");
  });

  it("authorization isolation: user B sees nothing of user A's data", async () => {
    const forB = await loadSnapshot(db, "user-b");
    expect(forB.babies).toEqual([]);
    expect(forB.logs).toEqual([]);
  });

  it("tombstoned logs stay dead across pushes", async () => {
    const withDelete = snapWith({
      babies: [baby(UUID_A)],
      logs: [log(UUID_LOG2, UUID_A)],
      deletedLogIds: [UUID_LOG1],
    });
    const merged = mergeSnapshots(await loadSnapshot(db, "user-a"), withDelete);
    await saveSnapshot(db, "user-a", merged);

    const pulled = await loadSnapshot(db, "user-a");
    expect(pulled.logs.map((l) => l.id)).toEqual([UUID_LOG2]);
    expect(pulled.deletedLogIds).toContain(UUID_LOG1);

    // A stale client re-pushing the deleted log cannot resurrect it.
    const stale = snapWith({ babies: [baby(UUID_A)], logs: [log(UUID_LOG1, UUID_A)] });
    const merged2 = mergeSnapshots(await loadSnapshot(db, "user-a"), stale);
    await saveSnapshot(db, "user-a", merged2);
    const pulled2 = await loadSnapshot(db, "user-a");
    expect(pulled2.logs.map((l) => l.id)).toEqual([UUID_LOG2]);
  });

  it("deleting the user cascades every table", async () => {
    await db.delete(schema.user).where(eq(schema.user.id, "user-a"));
    const babies = await db.select().from(schema.babies);
    const logs = await db.select().from(schema.exposureLogs);
    const overrides = await db.select().from(schema.allergenOverrides);
    expect(babies).toEqual([]);
    expect(logs).toEqual([]);
    expect(overrides).toEqual([]);
  });
});

describe("family sharing (D4, pglite)", () => {
  const SHARED = "33333333-3333-4333-8333-333333333333";
  const LOG_C = "44444444-4444-4444-8444-444444444441";
  const LOG_D = "44444444-4444-4444-8444-444444444442";
  const LOG_EVIL = "44444444-4444-4444-8444-444444444443";

  it("creator's first push makes them owner; invited co-parent sees everything", async () => {
    await createUser("parent-a", "mom@example.com");
    await createUser("parent-b", "dad@example.com");
    await createUser("stranger", "stranger@example.com");

    const merged = mergeSnapshots(
      await loadSnapshot(db, "parent-a"),
      snapWith({ babies: [baby(SHARED)], logs: [log(LOG_C, SHARED)] }),
    );
    await saveSnapshot(db, "parent-a", merged);
    const memberships = await db
      .select()
      .from(schema.babyMembers)
      .where(eq(schema.babyMembers.babyId, SHARED));
    expect(memberships).toHaveLength(1);
    expect(memberships[0]).toMatchObject({ userId: "parent-a", role: "owner" });

    // Simulate invite acceptance (the route inserts exactly this row).
    await db.insert(schema.babyMembers).values({ babyId: SHARED, userId: "parent-b", role: "member" });
    const forB = await loadSnapshot(db, "parent-b");
    expect(forB.babies.map((b) => b.id)).toEqual([SHARED]);
    expect(forB.logs.map((l) => l.id)).toEqual([LOG_C]);
  });

  it("co-parent's log flows back to the creator; a stranger's write is refused", async () => {
    const fromB = mergeSnapshots(
      await loadSnapshot(db, "parent-b"),
      snapWith({ babies: [baby(SHARED)], logs: [log(LOG_D, SHARED)] }),
    );
    await saveSnapshot(db, "parent-b", fromB);
    const forA = await loadSnapshot(db, "parent-a");
    expect(forA.logs.map((l) => l.id).sort()).toEqual([LOG_C, LOG_D]);

    // A stranger pushing the same babyId cannot write anything.
    await saveSnapshot(
      db,
      "stranger",
      snapWith({ babies: [baby(SHARED)], logs: [log(LOG_EVIL, SHARED)] }),
    );
    const after = await loadSnapshot(db, "parent-a");
    expect(after.logs.map((l) => l.id).sort()).toEqual([LOG_C, LOG_D]);
    expect((await loadSnapshot(db, "stranger")).babies).toEqual([]);
  });

  it("creator deletes their account → baby hands off to the co-parent", async () => {
    const { deleteUserWithHandoff } = await import("@/lib/family");
    await deleteUserWithHandoff(db, "parent-a");

    const rows = await db.select().from(schema.babies).where(eq(schema.babies.id, SHARED));
    expect(rows).toHaveLength(1);
    expect(rows[0].userId).toBe("parent-b");
    const forB = await loadSnapshot(db, "parent-b");
    expect(forB.babies.map((b) => b.id)).toEqual([SHARED]);
    expect(forB.logs.map((l) => l.id).sort()).toEqual([LOG_C, LOG_D]);
    const membership = await db
      .select()
      .from(schema.babyMembers)
      .where(eq(schema.babyMembers.babyId, SHARED));
    expect(membership).toHaveLength(1);
    expect(membership[0]).toMatchObject({ userId: "parent-b", role: "owner" });

    // Last member deletes → the baby finally cascades away.
    await deleteUserWithHandoff(db, "parent-b");
    expect(await db.select().from(schema.babies).where(eq(schema.babies.id, SHARED))).toEqual([]);
  });
});
