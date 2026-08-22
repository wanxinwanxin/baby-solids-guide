import { describe, expect, it } from "vitest";
import type { AllergenId, Food } from "@/content-schema/food";
import type { AllergenStateView } from "@/lib/engine";
import type { AllergenStatus, Enjoyment, ExposureLog } from "@/lib/storage/types";
import {
  acceptance,
  acceptanceForAll,
  allergenCoverage,
  categoryVariety,
  ironExposuresPerWeek,
  nutrientCoverage,
  persistentRefusals,
  textureTimeline,
  type AcceptanceState,
} from "./index";

/** Fixed clock — the selectors never read Date.now(). */
const TODAY = new Date("2026-08-22T12:00:00Z");
const DAY = 86400000;

function daysAgo(n: number): string {
  return new Date(TODAY.getTime() - n * DAY).toISOString().slice(0, 10);
}

function makeFood(partial: Partial<Food> & { slug: string }): Food {
  return {
    name: partial.slug,
    aliases: [],
    category: "vegetable",
    minAgeMonths: 6,
    ironRich: false,
    commonAllergen: null,
    chokingRisk: "low",
    nutritionHighlights: [],
    prepSpecs: [
      {
        band: "6-8m",
        form: "A soft stick about the length and width of two adult fingers, cooked fully soft.",
        passFailTest: "Squish test: flattens between two fingers.",
        whyThisForm: "Palmar grasp.",
        prepSteps: ["Cook until soft."],
        commonMistakes: [],
        media: [],
      },
    ],
    firstFoodPick: false,
    flavorPairings: [],
    tips: ["Cook it until fully soft.", "Batch prep and freeze."],
    sources: [{ label: "Test source", url: "https://example.com", retrievedOn: "2026-08-22" }],
    ...partial,
  };
}

let logSeq = 0;
function makeLog(partial: Partial<ExposureLog> & { foodSlug: string }): ExposureLog {
  return {
    id: `log-${++logSeq}`,
    babyId: "baby-1",
    date: daysAgo(1),
    prepBandUsed: "6-8m",
    amountEaten: "some",
    enjoyment: "neutral",
    gagging: false,
    symptoms: [],
    ...partial,
  };
}

const FOODS: Food[] = [
  makeFood({ slug: "beef", name: "Beef", category: "protein", ironRich: true, nutrients: ["iron", "zinc", "protein"] }),
  makeFood({ slug: "lentils", name: "Lentils", category: "legume", ironRich: true, nutrients: ["iron", "fiber", "folate"] }),
  makeFood({ slug: "apple", name: "Apple", category: "fruit", nutrients: ["vitaminC", "fiber"] }),
  makeFood({ slug: "banana", name: "Banana", category: "fruit", nutrients: ["potassium"] }),
  makeFood({ slug: "broccoli", name: "Broccoli", nutrients: ["vitaminC", "folate"] }),
  makeFood({ slug: "yogurt", name: "Yogurt", category: "dairy", commonAllergen: "milk", nutrients: ["calcium", "protein"] }),
  makeFood({ slug: "egg", name: "Egg", category: "protein", commonAllergen: "egg", ironRich: true }),
  makeFood({ slug: "oatmeal", name: "Oatmeal", category: "grain" }), // no nutrients field
];

// ——— categoryVariety ———

describe("categoryVariety", () => {
  it("returns all 8 categories with 0 for empty logs", () => {
    const result = categoryVariety([], FOODS, TODAY);
    expect(result).toHaveLength(8);
    expect(result.every((r) => r.distinctFoods === 0)).toBe(true);
    expect(result.find((r) => r.category === "legume")?.label).toBe("Legumes");
  });

  it("counts a single eaten log", () => {
    const result = categoryVariety([makeLog({ foodSlug: "beef" })], FOODS, TODAY);
    expect(result.find((r) => r.category === "protein")?.distinctFoods).toBe(1);
    expect(result.find((r) => r.category === "fruit")?.distinctFoods).toBe(0);
  });

  const table: [string, ExposureLog[], Partial<Record<string, number>>][] = [
    [
      "distinct foods, not raw log count",
      [makeLog({ foodSlug: "beef", date: daysAgo(1) }), makeLog({ foodSlug: "beef", date: daysAgo(3) })],
      { protein: 1 },
    ],
    [
      "two distinct foods in one category",
      [makeLog({ foodSlug: "beef" }), makeLog({ foodSlug: "egg" })],
      { protein: 2 },
    ],
    [
      "amountEaten none is not eaten",
      [makeLog({ foodSlug: "lentils", amountEaten: "none" })],
      { legume: 0 },
    ],
    [
      "logs outside the 14-day window are excluded",
      [makeLog({ foodSlug: "apple", date: daysAgo(14) }), makeLog({ foodSlug: "banana", date: daysAgo(13) })],
      { fruit: 1 },
    ],
    ["unknown food slugs are ignored", [makeLog({ foodSlug: "mystery" })], { vegetable: 0 }],
  ];
  it.each(table)("%s", (_name, logs, expected) => {
    const result = categoryVariety(logs, FOODS, TODAY);
    for (const [category, n] of Object.entries(expected)) {
      expect(result.find((r) => r.category === category)?.distinctFoods).toBe(n);
    }
  });
});

// ——— ironExposuresPerWeek ———

describe("ironExposuresPerWeek", () => {
  it("returns 4 zero weeks with oldest→newest labels for empty logs", () => {
    expect(ironExposuresPerWeek([], FOODS, TODAY)).toEqual([
      { weekLabel: "08-01", count: 0 },
      { weekLabel: "08-08", count: 0 },
      { weekLabel: "08-15", count: 0 },
      { weekLabel: "08-22", count: 0 },
    ]);
  });

  it("counts a single iron log in the newest week", () => {
    const result = ironExposuresPerWeek([makeLog({ foodSlug: "beef", date: daysAgo(2) })], FOODS, TODAY);
    expect(result.map((w) => w.count)).toEqual([0, 0, 0, 1]);
  });

  const table: [string, ExposureLog[], number[]][] = [
    ["10 days ago lands in the second-newest week", [makeLog({ foodSlug: "beef", date: daysAgo(10) })], [0, 0, 1, 0]],
    ["27 days ago lands in the oldest week", [makeLog({ foodSlug: "lentils", date: daysAgo(27) })], [1, 0, 0, 0]],
    ["28 days ago falls outside the window", [makeLog({ foodSlug: "beef", date: daysAgo(28) })], [0, 0, 0, 0]],
    ["non-iron foods are not counted", [makeLog({ foodSlug: "apple", date: daysAgo(1) })], [0, 0, 0, 0]],
    ["amountEaten none is not counted", [makeLog({ foodSlug: "beef", amountEaten: "none" })], [0, 0, 0, 0]],
    [
      "logs in the same week accumulate",
      [makeLog({ foodSlug: "beef", date: daysAgo(1) }), makeLog({ foodSlug: "egg", date: daysAgo(3) })],
      [0, 0, 0, 2],
    ],
  ];
  it.each(table)("%s", (_name, logs, expected) => {
    expect(ironExposuresPerWeek(logs, FOODS, TODAY).map((w) => w.count)).toEqual(expected);
  });
});

// ——— allergenCoverage ———

describe("allergenCoverage", () => {
  function state(status: AllergenStatus, allergenId: AllergenId = "peanut"): AllergenStateView {
    return { allergenId, status, exposureCount: 0 };
  }

  const table: [string, AllergenStateView[], ReturnType<typeof allergenCoverage>][] = [
    ["empty states", [], { introduced: 0, maintaining: 0, paused: 0, notStarted: 0 }],
    ["single not-started", [state("not-started")], { introduced: 0, maintaining: 0, paused: 0, notStarted: 1 }],
    [
      "one of each status",
      [
        state("not-started", "peanut"),
        state("introducing", "egg"),
        state("maintaining", "milk"),
        state("reacted-paused", "wheat"),
        state("avoid-per-doctor", "soy"),
      ],
      { introduced: 1, maintaining: 1, paused: 2, notStarted: 1 },
    ],
    [
      "multiple in the same bucket",
      [state("maintaining", "peanut"), state("maintaining", "egg"), state("introducing", "milk")],
      { introduced: 1, maintaining: 2, paused: 0, notStarted: 0 },
    ],
  ];
  it.each(table)("%s", (_name, states, expected) => {
    expect(allergenCoverage(states)).toEqual(expected);
  });
});

// ——— textureTimeline ———

describe("textureTimeline", () => {
  it("returns 8 zeroed weeks with labels for empty logs", () => {
    const result = textureTimeline([], TODAY);
    expect(result).toHaveLength(8);
    expect(result[0].weekLabel).toBe("07-04");
    expect(result[7].weekLabel).toBe("08-22");
    expect(result.every((w) => w.bands["6-8m"] === 0 && w.bands["9-12m"] === 0 && w.bands["12-24m"] === 0)).toBe(true);
  });

  it("counts a single log's band in the newest week", () => {
    const result = textureTimeline([makeLog({ foodSlug: "beef", prepBandUsed: "6-8m", date: daysAgo(1) })], TODAY);
    expect(result[7].bands["6-8m"]).toBe(1);
    expect(result[7].bands["9-12m"]).toBe(0);
  });

  it("buckets bands into the right weeks and drops logs outside the window", () => {
    const result = textureTimeline(
      [
        makeLog({ foodSlug: "beef", prepBandUsed: "9-12m", date: daysAgo(8) }),
        makeLog({ foodSlug: "apple", prepBandUsed: "6-8m", date: daysAgo(8) }),
        makeLog({ foodSlug: "apple", prepBandUsed: "12-24m", date: daysAgo(56) }),
      ],
      TODAY,
    );
    expect(result[6].bands).toEqual({ "6-8m": 1, "9-12m": 1, "12-24m": 0 });
    expect(result.every((w) => w.bands["12-24m"] === 0)).toBe(true);
  });
});

// ——— persistentRefusals ———

describe("persistentRefusals", () => {
  it("returns [] for empty logs", () => {
    expect(persistentRefusals([], FOODS)).toEqual([]);
  });

  it("includes a food after a single refused log", () => {
    const result = persistentRefusals([makeLog({ foodSlug: "broccoli", enjoyment: "refused", date: daysAgo(2) })], FOODS);
    expect(result).toEqual([{ slug: "broccoli", name: "Broccoli", attempts: 1, lastDate: daysAgo(2) }]);
  });

  const table: [string, ExposureLog[], string[]][] = [
    [
      "latest log wins: refused then loved drops out",
      [
        makeLog({ foodSlug: "apple", enjoyment: "refused", date: daysAgo(5) }),
        makeLog({ foodSlug: "apple", enjoyment: "loved", date: daysAgo(1) }),
      ],
      [],
    ],
    [
      "latest disliked counts too",
      [
        makeLog({ foodSlug: "apple", enjoyment: "loved", date: daysAgo(5) }),
        makeLog({ foodSlug: "apple", enjoyment: "disliked", date: daysAgo(1) }),
      ],
      ["apple"],
    ],
    [
      "sorted by attempts descending",
      [
        makeLog({ foodSlug: "apple", enjoyment: "refused", date: daysAgo(1) }),
        makeLog({ foodSlug: "broccoli", enjoyment: "neutral", date: daysAgo(6) }),
        makeLog({ foodSlug: "broccoli", enjoyment: "neutral", date: daysAgo(4) }),
        makeLog({ foodSlug: "broccoli", enjoyment: "refused", date: daysAgo(1) }),
      ],
      ["broccoli", "apple"],
    ],
  ];
  it.each(table)("%s", (_name, logs, expectedSlugs) => {
    expect(persistentRefusals(logs, FOODS).map((r) => r.slug)).toEqual(expectedSlugs);
  });

  it("counts attempts including non-refused earlier logs", () => {
    const result = persistentRefusals(
      [
        makeLog({ foodSlug: "broccoli", enjoyment: "neutral", date: daysAgo(6) }),
        makeLog({ foodSlug: "broccoli", enjoyment: "refused", date: daysAgo(2) }),
      ],
      FOODS,
    );
    expect(result[0]).toMatchObject({ attempts: 2, lastDate: daysAgo(2) });
  });

  it("caps the list at 8", () => {
    const nineFoods = Array.from({ length: 9 }, (_, i) => makeFood({ slug: `veg-${i}`, name: `Veg ${i}` }));
    const logs = nineFoods.map((f) => makeLog({ foodSlug: f.slug, enjoyment: "refused" }));
    const result = persistentRefusals(logs, nineFoods);
    expect(result).toHaveLength(8);
    expect(result.map((r) => r.slug)).toEqual(Array.from({ length: 8 }, (_, i) => `veg-${i}`));
  });
});

// ——— acceptance state machine ———

describe("acceptance", () => {
  function enjoymentLogs(slug: string, enjoyments: Enjoyment[]): ExposureLog[] {
    return enjoyments.map((enjoyment, i) =>
      makeLog({ foodSlug: slug, enjoyment, date: daysAgo(enjoyments.length - i) }),
    );
  }

  const table: [string, Enjoyment[], AcceptanceState][] = [
    ["not-tried when no logs for the slug", [], "not-tried"],
    ["one loved log → loved (100% ≥ 60%)", ["loved"], "loved"],
    [
      "latest refused after loves (50% loved) → needs-retries",
      ["loved", "loved", "refused", "refused"],
      "needs-retries",
    ],
    ["2 latest loved → loved even at 50% overall", ["refused", "refused", "loved", "loved"], "loved"],
    [
      "≥60% loved → loved even when the latest is a refusal",
      ["loved", "loved", "loved", "neutral", "refused"],
      "loved",
    ],
    ["single neutral log → warming-up", ["neutral"], "warming-up"],
    ["latest disliked → needs-retries", ["neutral", "disliked"], "needs-retries"],
    ["neutral after a refusal → warming-up", ["refused", "neutral"], "warming-up"],
  ];
  it.each(table)("%s", (_name, enjoyments, expected) => {
    expect(acceptance(enjoymentLogs("apple", enjoyments), "apple")).toBe(expected);
  });

  it("only considers logs for the requested slug", () => {
    const logs = [
      ...enjoymentLogs("apple", ["loved"]),
      ...enjoymentLogs("banana", ["refused"]),
    ];
    expect(acceptance(logs, "apple")).toBe("loved");
    expect(acceptance(logs, "banana")).toBe("needs-retries");
    expect(acceptance(logs, "broccoli")).toBe("not-tried");
  });

  it("acceptanceForAll maps every logged slug to its state", () => {
    const logs = [
      makeLog({ foodSlug: "apple", enjoyment: "loved", date: daysAgo(2) }),
      makeLog({ foodSlug: "banana", enjoyment: "refused", date: daysAgo(1) }),
      makeLog({ foodSlug: "broccoli", enjoyment: "neutral", date: daysAgo(1) }),
    ];
    const result = acceptanceForAll(logs);
    expect(result.get("apple")).toBe("loved");
    expect(result.get("banana")).toBe("needs-retries");
    expect(result.get("broccoli")).toBe("warming-up");
    expect(result.size).toBe(3);
  });

  it("acceptanceForAll returns an empty map for empty logs", () => {
    expect(acceptanceForAll([]).size).toBe(0);
  });
});

// ——— nutrientCoverage ———

describe("nutrientCoverage", () => {
  it("returns all 12 tags with 0 for empty logs", () => {
    const result = nutrientCoverage([], FOODS, TODAY);
    expect(result).toHaveLength(12);
    expect(result.every((r) => r.count === 0)).toBe(true);
    expect(result.find((r) => r.tag === "iron")?.label).toBe("Iron");
  });

  it("counts every tag on a single eaten log", () => {
    const result = nutrientCoverage([makeLog({ foodSlug: "beef" })], FOODS, TODAY);
    expect(result.find((r) => r.tag === "iron")?.count).toBe(1);
    expect(result.find((r) => r.tag === "zinc")?.count).toBe(1);
    expect(result.find((r) => r.tag === "protein")?.count).toBe(1);
    expect(result.find((r) => r.tag === "vitaminC")?.count).toBe(0);
  });

  const table: [string, ExposureLog[], Partial<Record<string, number>>][] = [
    [
      "tags accumulate across foods",
      [makeLog({ foodSlug: "beef", date: daysAgo(1) }), makeLog({ foodSlug: "lentils", date: daysAgo(2) })],
      { iron: 2, fiber: 1, zinc: 1 },
    ],
    ["a log 7 days ago falls outside the 7-day window", [makeLog({ foodSlug: "apple", date: daysAgo(7) })], { vitaminC: 0 }],
    ["a log 6 days ago is inside the window", [makeLog({ foodSlug: "apple", date: daysAgo(6) })], { vitaminC: 1 }],
    ["amountEaten none contributes nothing", [makeLog({ foodSlug: "beef", amountEaten: "none" })], { iron: 0 }],
    ["foods without a nutrients field contribute nothing", [makeLog({ foodSlug: "oatmeal" })], { fiber: 0, iron: 0 }],
    ["unknown food slugs are ignored", [makeLog({ foodSlug: "mystery" })], { iron: 0 }],
  ];
  it.each(table)("%s", (_name, logs, expected) => {
    const result = nutrientCoverage(logs, FOODS, TODAY);
    for (const [tag, n] of Object.entries(expected)) {
      expect(result.find((r) => r.tag === tag)?.count).toBe(n);
    }
  });
});
