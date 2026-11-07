import { describe, expect, it } from "vitest";
import {
  DEFAULT_TODAY_LAYOUT,
  layoutBlocks,
  moveWidget,
  normalizeTodayLayout,
  toggleWidget,
  TODAY_WIDGET_IDS,
  type TodayLayout,
} from "./today-layout";

describe("normalizeTodayLayout", () => {
  it("gives the default layout when nothing is saved", () => {
    expect(normalizeTodayLayout(undefined)).toEqual(DEFAULT_TODAY_LAYOUT);
    expect(normalizeTodayLayout(null)).toEqual(DEFAULT_TODAY_LAYOUT);
    expect(normalizeTodayLayout({ order: "junk", hidden: 3 })).toEqual(DEFAULT_TODAY_LAYOUT);
  });

  it("keeps a saved order and drops unknown and repeated ids", () => {
    const saved = { order: ["sleep", "reading", "sleep", "todo", "progress", "solids", "feeding", "diapers", "activities"], hidden: ["diapers", "nope"] };
    expect(normalizeTodayLayout(saved)).toEqual({
      order: ["sleep", "todo", "progress", "solids", "feeding", "diapers", "activities"],
      hidden: ["diapers"],
    });
  });

  it("puts a card the saved order lacks after its default neighbor", () => {
    const { order } = normalizeTodayLayout({ order: ["sleep", "todo", "solids", "feeding", "diapers"] });
    expect(order).toEqual(["progress", "sleep", "todo", "solids", "feeding", "diapers", "activities"]);
    expect([...order].sort()).toEqual([...TODAY_WIDGET_IDS].sort());
  });
});

describe("moveWidget and toggleWidget", () => {
  it("swaps a card with its neighbor and ignores a move past either end", () => {
    const up = moveWidget(DEFAULT_TODAY_LAYOUT, "sleep", -1);
    expect(up.order.slice(0, 4)).toEqual(["progress", "todo", "sleep", "solids"]);
    expect(moveWidget(DEFAULT_TODAY_LAYOUT, "progress", -1)).toBe(DEFAULT_TODAY_LAYOUT);
    expect(moveWidget(DEFAULT_TODAY_LAYOUT, "activities", 1)).toBe(DEFAULT_TODAY_LAYOUT);
  });

  it("hides and shows a card", () => {
    const hidden = toggleWidget(toggleWidget(DEFAULT_TODAY_LAYOUT, "diapers"), "progress");
    expect(hidden.hidden).toEqual(["progress", "diapers"]);
    expect(toggleWidget(hidden, "diapers").hidden).toEqual(["progress"]);
  });
});

describe("layoutBlocks", () => {
  it("groups neighboring stat cards into one grid and marks the first grid", () => {
    expect(layoutBlocks(DEFAULT_TODAY_LAYOUT)).toEqual([
      { kind: "card", id: "progress" },
      { kind: "card", id: "todo" },
      { kind: "stats", ids: ["solids", "sleep", "feeding", "diapers", "activities"], first: true },
    ]);
  });

  it("splits stat cards around a full-width card and skips hidden cards", () => {
    const moved: TodayLayout = {
      order: ["sleep", "feeding", "todo", "solids", "progress", "diapers", "activities"],
      hidden: ["diapers"],
    };
    expect(layoutBlocks(moved)).toEqual([
      { kind: "stats", ids: ["sleep", "feeding"], first: true },
      { kind: "card", id: "todo" },
      { kind: "stats", ids: ["solids"], first: false },
      { kind: "card", id: "progress" },
      { kind: "stats", ids: ["activities"], first: false },
    ]);
  });

  it("returns no blocks when every card is hidden", () => {
    expect(layoutBlocks({ order: [...TODAY_WIDGET_IDS], hidden: [...TODAY_WIDGET_IDS] })).toEqual([]);
  });
});
