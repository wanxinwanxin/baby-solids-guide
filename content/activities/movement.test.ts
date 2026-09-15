import { describe, expect, it } from "vitest";
import { movementIdeas } from "./index";
import { MOVEMENT_ACTIVITIES } from "@/content-schema/activity-ideas";
import { ACTIVITY_IDS } from "@/lib/storage/types";

/**
 * content-lint is the gate that fails CI on a malformed entry. These tests
 * cover the invariants the PAGE depends on, which lint does not know about:
 * the grouping the shelf prints, and the fact that a tap has to produce a
 * loggable, labelable activity row.
 */
describe("movement ideas", () => {
  it("parses the whole corpus at import time", () => {
    expect(movementIdeas.length).toBeGreaterThanOrEqual(20);
  });

  it("logs only activities the UI can label", () => {
    // A tap writes idea.activity into an ActivityLog. If it is not in
    // ACTIVITY_IDS, /activities and the full-day dashboard both fall back to
    // a generic star and the row reads as an unknown activity.
    for (const idea of movementIdeas) {
      expect(MOVEMENT_ACTIVITIES, idea.slug).toContain(idea.activity);
      expect(ACTIVITY_IDS as readonly string[], idea.slug).toContain(idea.activity);
    }
  });

  it("has a unique slug per idea, since the slug is the log's itemId", () => {
    const slugs = movementIdeas.map((i) => i.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives every starting age at least two ideas", () => {
    // The shelf prints one heading per starting age. One idea under a
    // heading looks like content went missing.
    const byStart = new Map<number, number>();
    for (const i of movementIdeas) {
      byStart.set(i.fromMonths, (byStart.get(i.fromMonths) ?? 0) + 1);
    }
    for (const [from, n] of byStart) {
      expect(n, `${from}m`).toBeGreaterThanOrEqual(2);
    }
  });

  it("closes every age window after it opens", () => {
    for (const idea of movementIdeas) {
      expect(idea.toMonths, idea.slug).toBeGreaterThan(idea.fromMonths);
    }
  });

  it("starts at birth and reaches past the second year", () => {
    expect(Math.min(...movementIdeas.map((i) => i.fromMonths))).toBe(0);
    expect(Math.max(...movementIdeas.map((i) => i.toMonths))).toBeGreaterThanOrEqual(24);
  });

  it("names a limit in both languages on every idea", () => {
    // The safety field is the one that must never ship half-done: a parent
    // moving a baby's body reads watchFor, and an empty one is worse than
    // no entry at all.
    for (const idea of movementIdeas) {
      expect(idea.watchFor.en.trim().length, idea.slug).toBeGreaterThan(40);
      expect(idea.watchFor.zh.trim().length, idea.slug).toBeGreaterThan(10);
      expect(idea.watchFor.en, idea.slug).not.toBe(idea.watchFor.zh);
    }
  });

  it("covers tummy time from birth", () => {
    const tummy = movementIdeas.filter((i) => i.activity === "tummy-time");
    expect(tummy.some((i) => i.fromMonths === 0)).toBe(true);
    // Tummy time is the one activity here with a specific pediatric rule
    // behind it, and the rule does not relax with age: awake, and watched.
    // An entry that omits it is the entry a tired parent reads at the wrong
    // moment, so assert it on every one rather than only on the newborn ones.
    for (const idea of tummy) {
      expect(idea.watchFor.en.toLowerCase(), idea.slug).toMatch(/awake|watched|unwatched/);
    }
  });
});
