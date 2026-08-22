import { describe, expect, it } from "vitest";
import { chronologicalAgeMonths, correctedAgeMonths } from "./age";

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
