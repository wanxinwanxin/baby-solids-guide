import { beforeEach, describe, expect, it } from "vitest";
import type { BabyProfile, ExposureLog } from "./types";
import { newId, useGuideStore } from "./store";

const baby: BabyProfile = {
  id: "b1",
  nickname: "Testling",
  birthDate: "2026-02-01",
  feedingStyle: "mixed",
  allergyRisk: { eczema: "none", existingFoodAllergy: false, familyHistoryAtopy: false },
  knownAllergies: [],
  doctorAvoidList: [],
  doctorClearances: [],
  conditions: [],
  textureStage: "S1",
  readiness: { confirmedAt: "2026-08-01" },
};

const log = (foodSlug: string, date: string): ExposureLog => ({
  id: newId(),
  babyId: "b1",
  foodSlug,
  date,
  prepBandUsed: "6-8m",
  amountEaten: "some",
  enjoyment: "loved",
  gagging: false,
  symptoms: [],
});

beforeEach(() => {
  useGuideStore.getState().reset();
});

describe("GuideStore (local-first, ROADMAP §5.6)", () => {
  it("saves a baby and logs exposures", () => {
    const s = useGuideStore.getState();
    s.saveBaby(baby);
    s.addLog(log("carrot", "2026-08-20"));
    s.addLog(log("banana", "2026-08-21"));
    expect(useGuideStore.getState().baby?.nickname).toBe("Testling");
    expect(useGuideStore.getState().logs).toHaveLength(2);
  });

  it("export → reset → import roundtrip preserves everything", () => {
    const s = useGuideStore.getState();
    s.saveBaby(baby);
    s.addLog(log("carrot", "2026-08-20"));
    s.setOverride({ allergenId: "peanut", status: "maintaining", setOn: "2026-08-21" });

    const json = useGuideStore.getState().exportJson();
    useGuideStore.getState().reset();
    expect(useGuideStore.getState().baby).toBeNull();

    const result = useGuideStore.getState().importJson(json);
    expect(result.ok).toBe(true);
    expect(useGuideStore.getState().baby?.id).toBe("b1");
    expect(useGuideStore.getState().logs).toHaveLength(1);
    expect(useGuideStore.getState().overrides[0]?.allergenId).toBe("peanut");
  });

  it("rejects non-JSON and foreign shapes with a friendly error", () => {
    expect(useGuideStore.getState().importJson("not json {{{").ok).toBe(false);
    const bad = useGuideStore.getState().importJson(JSON.stringify({ hello: "world" }));
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.error).toMatch(/export from this app/);
  });

  it("skips invalid rows but imports the valid ones", () => {
    const s = useGuideStore.getState();
    s.saveBaby(baby);
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

  it("setOverride replaces an existing override for the same allergen", () => {
    const s = useGuideStore.getState();
    s.setOverride({ allergenId: "milk", status: "reacted-paused", setOn: "2026-08-01" });
    s.setOverride({ allergenId: "milk", status: "maintaining", setOn: "2026-08-21" });
    expect(useGuideStore.getState().overrides).toHaveLength(1);
    expect(useGuideStore.getState().overrides[0].status).toBe("maintaining");
  });

  it("setTextureStage updates the profile", () => {
    useGuideStore.getState().saveBaby(baby);
    useGuideStore.getState().setTextureStage("S2");
    expect(useGuideStore.getState().baby?.textureStage).toBe("S2");
  });
});
