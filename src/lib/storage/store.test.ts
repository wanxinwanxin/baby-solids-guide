import { beforeEach, describe, expect, it } from "vitest";
import type { BabyProfile, ExposureLog } from "./types";
import { migrateV1ToV2, newId, selectPlanForActive, useGuideStore } from "./store";

const makeBaby = (id = "b1", nickname = "Testling"): BabyProfile => ({
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
  readiness: { confirmedAt: "2026-08-01" },
});

const log = (foodSlug: string, date: string, babyId = "b1"): ExposureLog => ({
  id: newId(),
  babyId,
  foodSlug,
  date,
  prepBandUsed: "6-8m",
  amountEaten: "some",
  enjoyment: "loved",
  gagging: false,
  symptoms: [],
});

const active = () => {
  const s = useGuideStore.getState();
  return s.babies.find((b) => b.id === s.activeBabyId) ?? null;
};

beforeEach(() => {
  useGuideStore.getState().reset();
});

describe("GuideStore v2 (multi-baby, local-first)", () => {
  it("saves a baby, sets it active, and logs exposures", () => {
    const s = useGuideStore.getState();
    s.saveBaby(makeBaby());
    s.addLog(log("carrot", "2026-08-20"));
    expect(active()?.nickname).toBe("Testling");
    expect(useGuideStore.getState().logs).toHaveLength(1);
    expect(useGuideStore.getState().logs[0].updatedAt).toBeDefined();
  });

  it("supports two babies with isolated logs/overrides/plans", () => {
    const s = useGuideStore.getState();
    s.saveBaby(makeBaby("b1", "A"));
    s.saveBaby(makeBaby("b2", "B"));
    s.addLog(log("carrot", "2026-08-20", "b1"));
    s.addLog(log("banana", "2026-08-20", "b2"));
    s.setOverride({ babyId: "b2", allergenId: "peanut", status: "maintaining", setOn: "2026-08-20" });
    s.setPlan({ babyId: "b1", anchorMonday: "2026-08-17", entries: [{ id: "e1", foodSlug: "beef", weekIndex: 0 }] });

    const st = useGuideStore.getState();
    expect(st.logs.filter((l) => l.babyId === "b1")).toHaveLength(1);
    expect(st.overrides.filter((o) => o.babyId === "b1")).toHaveLength(0);
    expect(st.plans.find((p) => p.babyId === "b1")?.entries).toHaveLength(1);

    st.removeBaby("b1");
    const after = useGuideStore.getState();
    expect(after.babies.map((b) => b.id)).toEqual(["b2"]);
    expect(after.logs.every((l) => l.babyId === "b2")).toBe(true);
    expect(after.plans).toHaveLength(0);
    expect(after.activeBabyId).toBe("b2");
  });

  it("deleteLog records a tombstone and removes linked check-ins", () => {
    const s = useGuideStore.getState();
    s.saveBaby(makeBaby());
    const l = log("peanut-butter", "2026-08-20");
    s.addLog(l);
    s.addCheckIns([
      { id: "c1", babyId: "b1", foodSlug: "peanut-butter", logId: l.id, dueAt: "2026-08-20T14:00:00.000Z", status: "pending" },
    ]);
    useGuideStore.getState().deleteLog(l.id);
    const st = useGuideStore.getState();
    expect(st.logs).toHaveLength(0);
    expect(st.deletedLogIds).toContain(l.id);
    expect(st.checkIns).toHaveLength(0);
  });

  it("clearPlan leaves a stamped, entries-less plan that reads as no plan", () => {
    const s = useGuideStore.getState();
    s.saveBaby(makeBaby());
    s.setPlan({ babyId: "b1", anchorMonday: "2026-08-17", entries: [{ id: "e1", foodSlug: "beef", weekIndex: 0 }] });
    useGuideStore.getState().clearPlan("b1");

    const st = useGuideStore.getState();
    // The row survives so the clear can win last-write-wins on the other
    // parent's device — but every reader sees "no plan".
    expect(st.plans).toHaveLength(1);
    expect(st.plans[0].entries).toEqual([]);
    expect(st.plans[0].updatedAt).toBeDefined();
    expect(selectPlanForActive(st)).toBeNull();
  });

  it("resolveCheckIn flips status", () => {
    const s = useGuideStore.getState();
    s.saveBaby(makeBaby());
    s.addCheckIns([
      { id: "c1", babyId: "b1", foodSlug: "egg", logId: "l1", dueAt: "2026-08-20T14:00:00.000Z", status: "pending" },
    ]);
    useGuideStore.getState().resolveCheckIn("c1", "done");
    expect(useGuideStore.getState().checkIns[0].status).toBe("done");
  });

  it("export (v2) → reset → import roundtrip preserves everything", () => {
    const s = useGuideStore.getState();
    s.saveBaby(makeBaby());
    s.addLog(log("carrot", "2026-08-20"));
    s.setOverride({ babyId: "b1", allergenId: "peanut", status: "maintaining", setOn: "2026-08-21" });
    s.setPlan({ babyId: "b1", anchorMonday: "2026-08-17", entries: [{ id: "e1", foodSlug: "beef", weekIndex: 1 }] });

    const json = useGuideStore.getState().exportJson();
    expect(useGuideStore.getState().lastExportAt).toBeDefined();
    useGuideStore.getState().reset();

    const result = useGuideStore.getState().importJson(json);
    expect(result.ok).toBe(true);
    const st = useGuideStore.getState();
    expect(st.babies[0]?.id).toBe("b1");
    expect(st.logs).toHaveLength(1);
    expect(st.overrides[0]?.allergenId).toBe("peanut");
    expect(st.plans[0]?.entries[0]?.foodSlug).toBe("beef");
  });

  it("still imports a v1 (single-baby) envelope", () => {
    const v1 = {
      schemaVersion: 1,
      exportedAt: "2026-08-20T00:00:00.000Z",
      baby: makeBaby(),
      logs: [log("carrot", "2026-08-20")],
      overrides: [{ allergenId: "milk", status: "reacted-paused", setOn: "2026-08-19" }],
    };
    const result = useGuideStore.getState().importJson(JSON.stringify(v1));
    expect(result.ok).toBe(true);
    const st = useGuideStore.getState();
    expect(st.babies).toHaveLength(1);
    expect(st.activeBabyId).toBe("b1");
    expect(st.overrides[0]?.babyId).toBe("b1"); // stamped during import
  });

  it("rejects non-JSON and foreign shapes with a friendly error", () => {
    expect(useGuideStore.getState().importJson("not json {{{").ok).toBe(false);
    const bad = useGuideStore.getState().importJson(JSON.stringify({ hello: "world" }));
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.error).toMatch(/export from this app/);
  });

  it("skips invalid rows but imports the valid ones", () => {
    const s = useGuideStore.getState();
    s.saveBaby(makeBaby());
    s.addLog(log("carrot", "2026-08-20"));
    const envelope = JSON.parse(useGuideStore.getState().exportJson());
    envelope.logs.push({ nonsense: true });
    const result = useGuideStore.getState().importJson(JSON.stringify(envelope));
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.logsImported).toBe(1);
      expect(result.skipped).toHaveLength(1);
    }
  });

  it("setOverride replaces only the same (baby, allergen) pair", () => {
    const s = useGuideStore.getState();
    s.setOverride({ babyId: "b1", allergenId: "milk", status: "reacted-paused", setOn: "2026-08-01" });
    s.setOverride({ babyId: "b1", allergenId: "milk", status: "maintaining", setOn: "2026-08-21" });
    s.setOverride({ babyId: "b2", allergenId: "milk", status: "avoid-per-doctor", setOn: "2026-08-21" });
    const st = useGuideStore.getState();
    expect(st.overrides).toHaveLength(2);
    expect(st.overrides.find((o) => o.babyId === "b1")?.status).toBe("maintaining");
  });

  it("migrateV1ToV2 wraps a single-baby persisted blob", () => {
    const old = {
      baby: makeBaby(),
      logs: [log("carrot", "2026-08-20")],
      overrides: [{ allergenId: "egg", status: "introducing", setOn: "2026-08-19" }],
    };
    const migrated = migrateV1ToV2(old);
    expect(migrated.babies).toHaveLength(1);
    expect(migrated.activeBabyId).toBe("b1");
    expect(migrated.overrides[0].babyId).toBe("b1");
    expect(migrated.logs[0].updatedAt).toBeDefined();
    expect(migrated.checkIns).toEqual([]);
    expect(migrated.plans).toEqual([]);
  });

  it("setTextureStage updates the active baby", () => {
    useGuideStore.getState().saveBaby(makeBaby());
    useGuideStore.getState().setTextureStage("S2");
    expect(active()?.textureStage).toBe("S2");
  });
});

describe("updateLog (journal edits)", () => {
  beforeEach(() => {
    useGuideStore.getState().reset();
    useGuideStore.getState().saveBaby(makeBaby());
  });

  const seed = () => {
    const l = log("carrot", "2026-08-20");
    useGuideStore.getState().addLog(l);
    return l.id;
  };
  const find = (id: string) => useGuideStore.getState().logs.find((l) => l.id === id);

  it("patches the detail fields in place", () => {
    const id = seed();
    useGuideStore.getState().updateLog(id, {
      time: "19:00",
      mealSlot: "dinner",
      quantity: { value: 20, unit: "ml" },
      notes: "loved the spoon",
    });
    const updated = find(id);
    expect(updated?.time).toBe("19:00");
    expect(updated?.mealSlot).toBe("dinner");
    expect(updated?.quantity).toEqual({ value: 20, unit: "ml" });
    expect(updated?.notes).toBe("loved the spoon");
    // Untouched fields survive the patch.
    expect(updated?.foodSlug).toBe("carrot");
    expect(updated?.amountEaten).toBe("some");
  });

  it("re-stamps updatedAt so the edit wins last-write-wins sync", async () => {
    const id = seed();
    const before = find(id)?.updatedAt;
    await new Promise((r) => setTimeout(r, 2));
    useGuideStore.getState().updateLog(id, { time: "08:00" });
    expect(new Date(find(id)!.updatedAt!).getTime()).toBeGreaterThan(
      new Date(before!).getTime(),
    );
  });

  it("refuses to let a patch rewrite identity", () => {
    const id = seed();
    // A stray id/babyId in the patch must not detach the row from its baby.
    useGuideStore
      .getState()
      .updateLog(id, { id: "hijacked", babyId: "other" } as never);
    expect(find(id)?.babyId).toBe("b1");
    expect(useGuideStore.getState().logs).toHaveLength(1);
  });

  it("clears a field when patched with undefined", () => {
    const id = seed();
    useGuideStore.getState().updateLog(id, { time: "19:00" });
    useGuideStore.getState().updateLog(id, { time: undefined });
    expect(find(id)?.time).toBeUndefined();
  });

  it("ignores an unknown id instead of appending a row", () => {
    seed();
    useGuideStore.getState().updateLog("nope", { time: "10:00" });
    expect(useGuideStore.getState().logs).toHaveLength(1);
  });
});
