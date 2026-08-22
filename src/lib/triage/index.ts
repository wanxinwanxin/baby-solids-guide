import type { SymptomId } from "@/lib/storage/types";

/**
 * Reaction triage decision table (ROADMAP §8.4). Pure lookup — the symptom
 * vocabulary maps 1:1 onto severity rows, checked in strict priority order.
 */
export type TriageSeverity =
  | "emergency"
  | "same-day"
  | "monitor"
  | "fpies-pattern"
  | "educate"
  | "none";

export type TriageResult = {
  severity: TriageSeverity;
  headline: string;
  actions: string[];
  /** Whether the food's allergen group should be paused pending clearance. */
  pausesAllergen: boolean;
};

const EMERGENCY: SymptomId[] = [
  "trouble-breathing",
  "swelling-tongue-lips-drooling",
  "vomiting-repetitive",
  "lethargy-floppy",
];

const SAME_DAY: SymptomId[] = ["hives-widespread", "swelling-face", "vomiting-shortly-after"];

const MONITOR: SymptomId[] = ["hives-few-near-mouth", "redness-resolving", "diarrhea"];

export function triage(symptoms: SymptomId[]): TriageResult {
  const has = (id: SymptomId) => symptoms.includes(id);

  // Emergency: any single red-flag sign, or widespread hives WITH vomiting.
  if (
    EMERGENCY.some(has) ||
    (has("hives-widespread") && (has("vomiting-shortly-after") || has("vomiting-delayed-1-4h")))
  ) {
    return {
      severity: "emergency",
      headline: "Call 911 now.",
      actions: [
        "Call 911 (or your local emergency number) immediately.",
        "Do not wait to see if it improves, and do not drive alone with the baby.",
        "If you have been prescribed infant epinephrine, use it as directed while waiting.",
        "Keep the baby upright or lying on their side; stay with them.",
      ],
      pausesAllergen: true,
    };
  }

  // FPIES pattern: profuse delayed vomiting without the acute red flags above.
  if (has("vomiting-delayed-1-4h")) {
    return {
      severity: "fpies-pattern",
      headline: "This pattern can be FPIES — get urgent medical advice.",
      actions: [
        "Profuse vomiting 1–4 hours after a food can be FPIES (food protein-induced enterocolitis syndrome).",
        "If the baby is pale, floppy, or can't keep fluids down, go to urgent care or the ER now.",
        "Avoid the trigger food until you've spoken with your pediatrician; ask about an allergist referral.",
      ],
      pausesAllergen: true,
    };
  }

  if (SAME_DAY.some(has)) {
    return {
      severity: "same-day",
      headline: "Contact your pediatrician today.",
      actions: [
        "Call your pediatrician's office today and describe exactly what was eaten and what you saw.",
        "Pause this food (and its allergen group) until they advise you.",
        "Take photos of any rash or swelling — they help the clinician.",
        "If symptoms worsen — breathing trouble, tongue/lip swelling, floppiness — call 911.",
      ],
      pausesAllergen: true,
    };
  }

  if (MONITOR.some(has)) {
    return {
      severity: "monitor",
      headline: "Note it, and check with your pediatrician before offering this again.",
      actions: [
        "Mild, localized, resolving symptoms are usually not dangerous, but they can be an early signal.",
        "Pause this allergen and mention it at (or before) your next pediatrician contact.",
        "Watch for anything more with the next feeds; photograph any rash.",
      ],
      pausesAllergen: true,
    };
  }

  if (symptoms.includes("gagging-only") || symptoms.includes("contact-redness-acidic")) {
    return {
      severity: "educate",
      headline: "That's normal — not an allergic reaction.",
      actions: [
        "Gagging is a protective reflex that moves food forward — noisy and red-faced is normal; silent and unable to cry is choking (see the Safety guide).",
        "Redness only where acidic food (tomato, citrus, strawberry) touched the skin is contact irritation, not an allergy.",
        "No need to pause the food; a smear of barrier cream around the mouth prevents contact redness.",
      ],
      pausesAllergen: false,
    };
  }

  return {
    severity: "none",
    headline: "",
    actions: [],
    pausesAllergen: false,
  };
}
