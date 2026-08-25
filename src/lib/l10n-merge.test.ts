import { describe, expect, it } from "vitest";
import type { Food } from "@/content-schema/food";
import type { FoodL10n } from "@/content-schema/l10n";
import { mergeFood, mergeRecipe } from "./l10n-merge";

const baseFood: Food = {
  slug: "apple",
  name: "Apple",
  aliases: ["pomme"],
  category: "fruit",
  minAgeMonths: 6,
  ironRich: false,
  commonAllergen: null,
  chokingRisk: "high",
  chokingNotes: "Raw apple is a top hazard.",
  nutritionHighlights: ["Pectin fiber", "Vitamin C"],
  prepSpecs: [
    {
      band: "6-8m",
      form: "A steamed-soft peeled wedge about two adult fingers long.",
      passFailTest: "Flattens under gentle finger pressure.",
      whyThisForm: "Palmar grasp needs a graspable stick.",
      prepSteps: ["Peel and core.", "Steam 8–10 minutes.", "Squish test."],
      commonMistakes: ["Serving raw wedges."],
      media: [],
    },
  ],
  firstFoodPick: false,
  flavorPairings: [],
  tips: ["Microwave shortcut works.", "Softer varieties steam faster."],
  sources: [{ label: "WIC guide", url: "https://example.gov/wic", retrievedOn: "2025-01-01" }],
};

const overlay: FoodL10n = {
  slug: "apple",
  name: "苹果",
  aliases: ["苹果泥"],
  chokingNotes: "生苹果是最常见的窒息风险之一。",
  nutritionHighlights: ["果胶膳食纤维", "维生素C"],
  prepSpecs: [
    {
      form: "蒸软去皮的苹果角块，约两根成人手指长。",
      passFailTest: "指腹轻压即扁。",
      whyThisForm: "全掌抓握需要能握住的条状。",
      prepSteps: ["去皮去核。", "蒸8–10分钟。", "做一压就扁测试。"],
      commonMistakes: ["直接给生苹果块。"],
    },
  ],
  tips: ["微波炉更快。", "偏软的品种更容易蒸软。"],
};

describe("mergeFood", () => {
  it("returns the base food untouched when there is no overlay", () => {
    expect(mergeFood(baseFood, undefined)).toBe(baseFood);
  });

  it("swaps prose fields and keeps structured data", () => {
    const zh = mergeFood(baseFood, overlay);
    expect(zh.name).toBe("苹果");
    expect(zh.prepSpecs[0].form).toBe("蒸软去皮的苹果角块，约两根成人手指长。");
    expect(zh.prepSpecs[0].band).toBe("6-8m");
    expect(zh.prepSpecs[0].cutDiagram).toBe(baseFood.prepSpecs[0].cutDiagram);
    expect(zh.chokingRisk).toBe("high");
    expect(zh.sources).toEqual(baseFood.sources);
    expect(zh.slug).toBe("apple");
  });

  it("keeps the English name and aliases searchable", () => {
    const zh = mergeFood(baseFood, overlay);
    expect(zh.aliases).toEqual(["苹果泥", "Apple", "pomme"]);
  });

  it("falls back to English item-by-item when an overlay array runs short", () => {
    const short: FoodL10n = { ...overlay, tips: ["微波炉更快。"] };
    const zh = mergeFood(baseFood, short);
    expect(zh.tips).toEqual(["微波炉更快。", "Softer varieties steam faster."]);
  });

  it("does not mutate the base food", () => {
    const before = JSON.stringify(baseFood);
    mergeFood(baseFood, overlay);
    expect(JSON.stringify(baseFood)).toBe(before);
  });
});

describe("mergeRecipe", () => {
  it("swaps prose and keeps slugs/enums", () => {
    const zh = mergeRecipe(
      {
        slug: "apple-cinnamon-oatmeal",
        name: "Apple cinnamon oatmeal",
        foods: ["apple", "cinnamon", "oatmeal"],
        bands: ["6-8m"],
        method: "stir",
        steps: ["Stir applesauce into oatmeal.", "Add cinnamon.", "Cool and serve."],
        whyItWorks: "Applesauce sweetens the oats naturally.",
        ironPairing: false,
        storage: "Keeps 2 days covered in the fridge.",
      },
      {
        slug: "apple-cinnamon-oatmeal",
        name: "苹果肉桂燕麦粥",
        steps: ["把苹果泥拌入燕麦粥。", "加一小撮肉桂粉。", "放至温热后喂食。"],
        whyItWorks: "苹果泥带来天然甜味。",
        storage: "盖好冷藏可存2天。",
      },
    );
    expect(zh.name).toBe("苹果肉桂燕麦粥");
    expect(zh.foods).toEqual(["apple", "cinnamon", "oatmeal"]);
    expect(zh.method).toBe("stir");
    expect(zh.steps).toHaveLength(3);
  });
});
