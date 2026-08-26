import { describe, expect, it } from "vitest";
import type { BabyProfile, ExposureLog, Plan } from "@/lib/storage/types";
import type { SyncSnapshot } from "@/lib/storage/store";
import { EMPTY_SNAPSHOT, mergeSnapshots, snapshotVersion } from "./merge";

const baby = (id: string, nickname: string, updatedAt?: string): BabyProfile => ({
  id,
  nickname,
  birthDate: "2026-02-01",
  feedingStyle: "mixed",
  allergyRisk: { eczema: "none", existingFoodAllergy: false, familyHistoryAtopy: false },
  knownAllergies: [],
  doctorAvoidList: [],
  doctorClearances: [],
  conditions: [],
  textureStage: "S1",
  readiness: {},
  updatedAt,
});

const log = (id: string, babyId: string, updatedAt?: string, foodSlug = "carrot"): ExposureLog => ({
  id,
  babyId,
  foodSlug,
  date: "2026-08-20",
  prepBandUsed: "6-8m",
  amountEaten: "some",
  enjoyment: "loved",
  gagging: false,
  symptoms: [],
  updatedAt,
});

const plan = (babyId: string, foodSlug: string, updatedAt?: string): Plan => ({
  babyId,
  anchorMonday: "2026-08-17",
  entries: [{ id: `e-${foodSlug}`, foodSlug, weekIndex: 0 }],
  updatedAt,
});

const snap = (partial: Partial<SyncSnapshot>): SyncSnapshot => ({ ...EMPTY_SNAPSHOT, ...partial });

describe("mergeSnapshots — LWW matrix (ROADMAP Part II §6)", () => {
  it("client newer wins; server newer wins; missing updatedAt loses to any stamp", () => {
    const server = snap({ babies: [baby("b1", "ServerName", "2026-08-20T00:00:00Z")] });
    const clientNewer = snap({ babies: [baby("b1", "ClientName", "2026-08-21T00:00:00Z")] });
    expect(mergeSnapshots(server, clientNewer).babies[0].nickname).toBe("ClientName");

    const clientOlder = snap({ babies: [baby("b1", "ClientName", "2026-08-19T00:00:00Z")] });
    expect(mergeSnapshots(server, clientOlder).babies[0].nickname).toBe("ServerName");

    const clientUnstamped = snap({ babies: [baby("b1", "ClientName")] });
    expect(mergeSnapshots(server, clientUnstamped).babies[0].nickname).toBe("ServerName");
  });

  it("union of distinct babies — first-login 'conflict' becomes coexistence", () => {
    const server = snap({ babies: [baby("b1", "AccountBaby", "2026-08-01T00:00:00Z")] });
    const client = snap({ babies: [baby("b2", "DeviceBaby", "2026-08-02T00:00:00Z")] });
    const merged = mergeSnapshots(server, client);
    expect(merged.babies.map((b) => b.nickname).sort()).toEqual(["AccountBaby", "DeviceBaby"]);
  });

  it("log tombstones always win, both directions, and unions persist", () => {
    const server = snap({
      babies: [baby("b1", "A", "2026-08-01T00:00:00Z")],
      logs: [log("l1", "b1", "2026-08-20T00:00:00Z"), log("l2", "b1", "2026-08-20T00:00:00Z")],
    });
    const client = snap({
      babies: [baby("b1", "A", "2026-08-01T00:00:00Z")],
      logs: [log("l1", "b1", "2026-08-22T00:00:00Z")], // newer edit…
      deletedLogIds: ["l1"], // …but also deleted — delete is final
    });
    const merged = mergeSnapshots(server, client);
    expect(merged.logs.map((l) => l.id)).toEqual(["l2"]);
    expect(merged.deletedLogIds).toContain("l1");
  });

  it("deleted babies drop the baby and all its children everywhere", () => {
    const server = snap({
      babies: [baby("b1", "A", "2026-08-01T00:00:00Z"), baby("b2", "B", "2026-08-01T00:00:00Z")],
      logs: [log("l1", "b1"), log("l2", "b2")],
      overrides: [{ babyId: "b1", allergenId: "peanut", status: "maintaining", setOn: "2026-08-01" }],
    });
    const client = snap({ deletedBabyIds: ["b1"] });
    const merged = mergeSnapshots(server, client);
    expect(merged.babies.map((b) => b.id)).toEqual(["b2"]);
    expect(merged.logs.map((l) => l.id)).toEqual(["l2"]);
    expect(merged.overrides).toEqual([]);
  });

  it("overrides are client-authoritative for babies the client knows", () => {
    const b1 = baby("b1", "A", "2026-08-01T00:00:00Z");
    const server = snap({
      babies: [b1],
      overrides: [
        { babyId: "b1", allergenId: "peanut", status: "reacted-paused", setOn: "2026-08-01" },
        { babyId: "b1", allergenId: "egg", status: "maintaining", setOn: "2026-08-01" },
      ],
    });
    // client cleared the peanut override entirely and kept only egg
    const client = snap({
      babies: [b1],
      overrides: [{ babyId: "b1", allergenId: "egg", status: "maintaining", setOn: "2026-08-01" }],
    });
    const merged = mergeSnapshots(server, client);
    expect(merged.overrides).toHaveLength(1);
    expect(merged.overrides[0].allergenId).toBe("egg");
  });

  it("server rows survive for babies the client has never seen", () => {
    const server = snap({
      babies: [baby("b9", "OtherDeviceBaby", "2026-08-01T00:00:00Z")],
      overrides: [{ babyId: "b9", allergenId: "milk", status: "avoid-per-doctor", setOn: "2026-08-01" }],
      logs: [log("l9", "b9")],
    });
    const merged = mergeSnapshots(server, EMPTY_SNAPSHOT);
    expect(merged.babies).toHaveLength(1);
    expect(merged.overrides).toHaveLength(1);
    expect(merged.logs).toHaveLength(1);
  });

  it("plans: the newer plan wins, whichever side holds it", () => {
    const b1 = baby("b1", "A", "2026-08-01T00:00:00Z");
    // Two parents, one baby: the client edited a minute ago, the server copy
    // is an hour old → the client's edit is the survivor.
    const server = snap({ babies: [b1], plans: [plan("b1", "beef", "2026-08-20T09:00:00Z")] });
    const clientNewer = snap({ babies: [b1], plans: [plan("b1", "tofu", "2026-08-20T09:59:00Z")] });
    const merged = mergeSnapshots(server, clientNewer);
    expect(merged.plans).toHaveLength(1);
    expect(merged.plans[0].entries[0].foodSlug).toBe("tofu");
  });

  it("plans: a stale client cannot clobber the other parent's newer plan", () => {
    const b1 = baby("b1", "A", "2026-08-01T00:00:00Z");
    // THE BUG THIS PINS: the other parent just edited (server, 09:59); this
    // device has an hour-old plan it hasn't touched. Pushing must not win.
    const server = snap({ babies: [b1], plans: [plan("b1", "tofu", "2026-08-20T09:59:00Z")] });
    const clientOlder = snap({ babies: [b1], plans: [plan("b1", "beef", "2026-08-20T09:00:00Z")] });
    const merged = mergeSnapshots(server, clientOlder);
    expect(merged.plans[0].entries[0].foodSlug).toBe("tofu");

    // An unstamped plan (pre-updatedAt device) counts as epoch and loses too.
    const clientUnstamped = snap({ babies: [b1], plans: [plan("b1", "beef")] });
    expect(mergeSnapshots(server, clientUnstamped).plans[0].entries[0].foodSlug).toBe("tofu");
  });

  it("plans: a plan for a baby the client has never seen survives", () => {
    const server = snap({
      babies: [baby("b9", "OtherDeviceBaby", "2026-08-01T00:00:00Z")],
      plans: [plan("b9", "beef", "2026-08-20T09:00:00Z")],
    });
    const client = snap({ babies: [baby("b1", "MyBaby", "2026-08-02T00:00:00Z")] });
    const merged = mergeSnapshots(server, client);
    expect(merged.plans.map((p) => p.babyId)).toEqual(["b9"]);
    // …and an entirely empty client snapshot leaves it alone as well.
    expect(mergeSnapshots(server, EMPTY_SNAPSHOT).plans).toHaveLength(1);
  });

  it("plans: clearing (entries-less, freshly stamped) propagates, not resurrects", () => {
    const b1 = baby("b1", "A", "2026-08-01T00:00:00Z");
    const server = snap({ babies: [b1], plans: [plan("b1", "beef", "2026-08-20T09:00:00Z")] });
    const cleared: Plan = {
      babyId: "b1",
      anchorMonday: "2026-08-17",
      entries: [],
      updatedAt: "2026-08-20T10:00:00Z",
    };
    const merged = mergeSnapshots(server, snap({ babies: [b1], plans: [cleared] }));
    expect(merged.plans[0].entries).toEqual([]);
  });

  it("plans: deleting the baby drops its plan", () => {
    const server = snap({
      babies: [baby("b1", "A", "2026-08-01T00:00:00Z")],
      plans: [plan("b1", "beef", "2026-08-20T09:00:00Z")],
    });
    expect(mergeSnapshots(server, snap({ deletedBabyIds: ["b1"] })).plans).toEqual([]);
  });

  it("snapshotVersion is stable, order-insensitive, and moves when a plan changes", () => {
    const b1 = baby("b1", "A", "2026-08-01T00:00:00Z");
    const a = snap({ babies: [b1], logs: [log("l1", "b1", "2026-08-20T00:00:00Z")] });
    const reordered = snap({ babies: [b1], logs: [log("l1", "b1", "2026-08-20T00:00:00Z")] });
    expect(snapshotVersion(a)).toBe(snapshotVersion(reordered));
    const withPlan = snap({ ...a, plans: [plan("b1", "beef", "2026-08-20T09:00:00Z")] });
    expect(snapshotVersion(withPlan)).not.toBe(snapshotVersion(a));
    const edited = snap({ ...a, plans: [plan("b1", "beef", "2026-08-20T10:00:00Z")] });
    expect(snapshotVersion(edited)).not.toBe(snapshotVersion(withPlan));
  });

  it("empty ⊕ empty = empty; merge is idempotent", () => {
    expect(mergeSnapshots(EMPTY_SNAPSHOT, EMPTY_SNAPSHOT)).toEqual(EMPTY_SNAPSHOT);
    const server = snap({
      babies: [baby("b1", "A", "2026-08-01T00:00:00Z")],
      logs: [log("l1", "b1", "2026-08-02T00:00:00Z")],
    });
    const once = mergeSnapshots(server, EMPTY_SNAPSHOT);
    const twice = mergeSnapshots(once, once);
    expect(twice).toEqual(once);
  });
});
