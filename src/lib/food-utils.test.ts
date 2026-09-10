import { describe, expect, it } from "vitest";
import {
  CUSTOM_FOOD_PREFIX,
  customFoodSlug,
  foodDisplayName,
  isCustomFoodSlug,
} from "./food-utils";

describe("custom food helpers", () => {
  it("builds a stable, normalized slug so the same name groups together", () => {
    expect(customFoodSlug("山药")).toBe(`${CUSTOM_FOOD_PREFIX}山药`);
    expect(customFoodSlug("  Dragon Fruit ")).toBe(customFoodSlug("dragon fruit"));
    expect(customFoodSlug("dragon   fruit")).toBe(customFoodSlug("dragon fruit"));
  });

  it("detects custom slugs", () => {
    expect(isCustomFoodSlug(customFoodSlug("okra"))).toBe(true);
    expect(isCustomFoodSlug("carrot")).toBe(false);
  });

  it("resolves the display name: custom name, else content name, else slug", () => {
    const bySlug = new Map([["carrot", { name: "Carrot" }]]);
    expect(foodDisplayName({ foodSlug: "carrot" }, bySlug)).toBe("Carrot");
    expect(
      foodDisplayName({ foodSlug: "custom:山药", customFoodName: "山药" }, bySlug),
    ).toBe("山药");
    expect(foodDisplayName({ foodSlug: "mystery" }, bySlug)).toBe("mystery");
  });
});
