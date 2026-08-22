import { describe, expect, it } from "vitest";
import type { SymptomId } from "@/lib/storage/types";
import { SYMPTOM_IDS } from "@/lib/storage/types";
import { triage } from "./index";

describe("triage decision table (ROADMAP §8.4) — full branch coverage", () => {
  const cases: { symptoms: SymptomId[]; severity: string; pauses: boolean }[] = [
    // Emergency rows
    { symptoms: ["trouble-breathing"], severity: "emergency", pauses: true },
    { symptoms: ["swelling-tongue-lips-drooling"], severity: "emergency", pauses: true },
    { symptoms: ["vomiting-repetitive"], severity: "emergency", pauses: true },
    { symptoms: ["lethargy-floppy"], severity: "emergency", pauses: true },
    { symptoms: ["hives-widespread", "vomiting-shortly-after"], severity: "emergency", pauses: true },
    { symptoms: ["hives-widespread", "vomiting-delayed-1-4h"], severity: "emergency", pauses: true },
    // Emergency outranks everything
    { symptoms: ["trouble-breathing", "gagging-only"], severity: "emergency", pauses: true },
    { symptoms: ["vomiting-delayed-1-4h", "lethargy-floppy"], severity: "emergency", pauses: true },
    // FPIES pattern
    { symptoms: ["vomiting-delayed-1-4h"], severity: "fpies-pattern", pauses: true },
    { symptoms: ["vomiting-delayed-1-4h", "diarrhea"], severity: "fpies-pattern", pauses: true },
    // Same-day
    { symptoms: ["hives-widespread"], severity: "same-day", pauses: true },
    { symptoms: ["swelling-face"], severity: "same-day", pauses: true },
    { symptoms: ["vomiting-shortly-after"], severity: "same-day", pauses: true },
    { symptoms: ["swelling-face", "redness-resolving"], severity: "same-day", pauses: true },
    // Monitor
    { symptoms: ["hives-few-near-mouth"], severity: "monitor", pauses: true },
    { symptoms: ["redness-resolving"], severity: "monitor", pauses: true },
    { symptoms: ["diarrhea"], severity: "monitor", pauses: true },
    // Educate — never pauses
    { symptoms: ["gagging-only"], severity: "educate", pauses: false },
    { symptoms: ["contact-redness-acidic"], severity: "educate", pauses: false },
    { symptoms: ["gagging-only", "contact-redness-acidic"], severity: "educate", pauses: false },
    // None
    { symptoms: [], severity: "none", pauses: false },
  ];

  it.each(cases)("$symptoms → $severity", ({ symptoms, severity, pauses }) => {
    const result = triage(symptoms);
    expect(result.severity).toBe(severity);
    expect(result.pausesAllergen).toBe(pauses);
    if (severity !== "none") {
      expect(result.headline.length).toBeGreaterThan(0);
      expect(result.actions.length).toBeGreaterThan(0);
    }
  });

  it("every symptom in the vocabulary reaches a non-'none' row on its own", () => {
    for (const id of SYMPTOM_IDS) {
      expect(triage([id]).severity).not.toBe("none");
    }
  });

  it("emergency copy tells the caregiver to call 911", () => {
    expect(triage(["trouble-breathing"]).headline).toMatch(/911/);
  });
});
