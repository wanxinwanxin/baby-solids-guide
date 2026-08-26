import { describe, expect, it } from "vitest";
import { chronologicalAgeMonths, correctedAgeMonths, dateAtCorrectedAge } from "./age";

const TODAY = new Date("2026-08-22T12:00:00Z");

describe("age math (ROADMAP §5.1)", () => {
  it("chronological age: born ~6 months ago → ≈6 months", () => {
    expect(chronologicalAgeMonths("2026-02-22", TODAY)).toBeCloseTo(5.98, 1);
  });

  it("term baby (no dueDate) → corrected equals chronological", () => {
    expect(correctedAgeMonths({ birthDate: "2026-02-22" }, TODAY)).toBeCloseTo(
      chronologicalAgeMonths("2026-02-22", TODAY),
      5,
    );
  });

  it("8-weeks-early preemie at 6 months chronological → ≈4.2 months corrected", () => {
    const corrected = correctedAgeMonths(
      { birthDate: "2026-02-22", dueDate: "2026-04-19" }, // 56 days early
      TODAY,
    );
    expect(corrected).toBeGreaterThan(4);
    expect(corrected).toBeLessThan(4.5);
  });

  it("dueDate before birthDate (post-term) never inflates age", () => {
    const corrected = correctedAgeMonths({ birthDate: "2026-02-22", dueDate: "2026-02-10" }, TODAY);
    expect(corrected).toBeCloseTo(chronologicalAgeMonths("2026-02-22", TODAY), 5);
  });

  it("correction stops at 24 months chronological", () => {
    const corrected = correctedAgeMonths({ birthDate: "2024-06-01", dueDate: "2024-08-01" }, TODAY);
    expect(corrected).toBeCloseTo(chronologicalAgeMonths("2024-06-01", TODAY), 5);
  });
});

describe("dateAtCorrectedAge — telling a family what they're waiting for", () => {
  it("inverts correctedAgeMonths for a term baby", () => {
    const at6 = dateAtCorrectedAge({ birthDate: "2026-07-27" }, 6);
    expect(correctedAgeMonths({ birthDate: "2026-07-27" }, at6)).toBeCloseTo(6, 5);
  });

  it("inverts correctedAgeMonths for a preemie (later than the term date)", () => {
    const baby = { birthDate: "2026-02-22", dueDate: "2026-04-19" };
    const at6 = dateAtCorrectedAge(baby, 6);
    expect(correctedAgeMonths(baby, at6)).toBeCloseTo(6, 5);
    expect(at6.getTime()).toBeGreaterThan(dateAtCorrectedAge({ birthDate: baby.birthDate }, 6).getTime());
  });

  it("ignores a due date that precedes the birth date", () => {
    const post = dateAtCorrectedAge({ birthDate: "2026-02-22", dueDate: "2026-02-10" }, 6);
    expect(post.getTime()).toBe(dateAtCorrectedAge({ birthDate: "2026-02-22" }, 6).getTime());
  });
});
