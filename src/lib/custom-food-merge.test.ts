import { beforeEach, describe, expect, it } from "vitest";
import { customLogsToRelink, uniqueTermIndex } from "./custom-food-merge";
import { useGuideStore } from "@/lib/storage/store";
import type { ExposureLog } from "@/lib/storage/types";

const TERMS = {
  macadamia: ["macadamia", "macadamia nut", "夏威夷果"],
  "quail-egg": ["quail egg", "鹌鹑蛋"],
  "almond-butter": ["almond butter", "almond"],
  almond: ["almond", "ground almond"],
};

function log(id: string, foodSlug: string, customFoodName?: string): ExposureLog {
  return {
    id,
    babyId: "b",
    foodSlug,
    ...(customFoodName ? { customFoodName } : {}),
    date: "2026-10-12",
    prepBandUsed: "6-8m",
    amountEaten: "some",
    enjoyment: "neutral",
    gagging: false,
    symptoms: [],
  };
}

describe("customLogsToRelink", () => {
  const index = uniqueTermIndex(TERMS);

  it("moves a custom food onto the catalog food whose name or alias it matches, in either language", () => {
    const logs = [
      log("a", "custom:macadamia", "Macadamia"),
      log("b", "custom:macadamia nut", " Macadamia  Nut "),
      log("c", "custom:夏威夷果", "夏威夷果"),
      log("d", "macadamia"),
    ];
    expect(customLogsToRelink(logs, index)).toEqual({ a: "macadamia", b: "macadamia", c: "macadamia" });
  });

  it("ignores spaces, so a name typed run together still joins", () => {
    expect(customLogsToRelink([log("a", "custom:quailegg", "Quailegg"), log("b", "custom:鹌鹑 蛋", "鹌鹑 蛋")], index)).toEqual({ a: "quail-egg", b: "quail-egg" });
  });

  it("leaves a name that two foods share, and a name no food has, as custom", () => {
    expect(customLogsToRelink([log("a", "custom:almond", "Almond"), log("b", "custom:zorbafruit", "Zorbafruit")], index)).toEqual({});
  });

  it("knows macadamia in the real catalog", () => {
    expect(customLogsToRelink([log("a", "custom:macadamia", "Macadamia")])).toEqual({ a: "macadamia" });
  });

  it("joins the November 2026 food requests in the real catalog", () => {
    const logs = [
      log("a", "custom:quailegg", "Quailegg"),
      log("b", "custom:大白菜", "大白菜"),
      log("c", "custom:紫薯", "紫薯"),
      log("d", "custom:小松菜", "小松菜"),
    ];
    expect(customLogsToRelink(logs)).toEqual({ a: "quail-egg", b: "napa-cabbage", c: "sweet-potato", d: "komatsuna" });
  });
});

describe("relinkCustomFoods", () => {
  beforeEach(() => useGuideStore.setState({ logs: [log("a", "custom:macadamia", "Macadamia"), log("b", "pear")] }));

  it("rewrites the slug, drops the custom name, and re-stamps only the moved log", () => {
    useGuideStore.getState().relinkCustomFoods({ a: "macadamia" });
    const [a, b] = useGuideStore.getState().logs;
    expect(a.foodSlug).toBe("macadamia");
    expect("customFoodName" in a).toBe(false);
    expect(a.updatedAt).toBeTruthy();
    expect(b.updatedAt).toBeUndefined();
  });
});
