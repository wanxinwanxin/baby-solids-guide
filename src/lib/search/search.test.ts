import { describe, expect, it } from "vitest";
import { buildSearchIndex, featureEntries, searchEntries } from "./index";
import { ZH_FOODS } from "../../../content/i18n/zh/foods";
import { ZH_RECIPES } from "../../../content/i18n/zh/recipes";
import { ZH_GUIDES } from "../../../content/i18n/zh/guides";
import { ZH_ALLERGENS } from "../../../content/i18n/zh/allergens";

const zh = { foods: ZH_FOODS, recipes: ZH_RECIPES, guides: ZH_GUIDES, allergens: ZH_ALLERGENS };

describe("app-wide search", () => {
  const en = buildSearchIndex("en", null);
  const zhIndex = buildSearchIndex("zh", zh);

  it("finds a food by its English name, ranked first", () => {
    const hits = searchEntries(en, "banana");
    expect(hits[0].href).toBe("/foods/banana");
  });

  it("finds features through synonyms people actually type", () => {
    expect(searchEntries(en, "food menu")[0].href).toBe("/foods");
    expect(searchEntries(en, "diary")[0].href).toBe("/history");
    expect(searchEntries(en, "choking")[0].href).toBe("/safety");
    expect(searchEntries(en, "poem").some((h) => h.href === "/read")).toBe(true);
  });

  it("matches Chinese synonyms even in the English locale", () => {
    expect(searchEntries(en, "菜单")[0].href).toBe("/foods");
    expect(searchEntries(en, "古诗")[0].href).toBe("/read");
  });

  it("finds content by Chinese name once the overlays load", () => {
    const hits = searchEntries(zhIndex, "香蕉");
    expect(hits[0].href).toBe("/foods/banana");
    expect(hits[0].name).toBe(ZH_FOODS["banana"].name);
  });

  it("an exact feature name beats content whose name merely starts with it", () => {
    // "plan" must rank the Plan page above plantain.
    expect(searchEntries(en, "plan")[0].href).toBe("/plan");
  });

  it("returns nothing for a blank query and caps the result count", () => {
    expect(searchEntries(en, "  ")).toHaveLength(0);
    expect(searchEntries(en, "a", 10).length).toBeLessThanOrEqual(10);
  });

  it("every feature href is unique and starts with a slash", () => {
    const features = featureEntries("en");
    const hrefs = features.map((f) => f.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const h of hrefs) expect(h.startsWith("/")).toBe(true);
  });
});
