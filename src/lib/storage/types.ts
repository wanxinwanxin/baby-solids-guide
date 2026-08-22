import type { AgeBand, AllergenId } from "@/content-schema/food";

export type TextureStage = "S1" | "S2" | "S3" | "S4";

export const TEXTURE_STAGES: { id: TextureStage; label: string; typicalAge: string; minAgeMonths: number }[] = [
  { id: "S1", label: "Smooth mash + soft graspable strips", typicalAge: "≈6–7 months", minAgeMonths: 6 },
  { id: "S2", label: "Lumpy mash + soft bite-size pieces", typicalAge: "≈8–9 months", minAgeMonths: 8 },
  { id: "S3", label: "Chopped soft table food", typicalAge: "≈10–12 months", minAgeMonths: 10 },
  { id: "S4", label: "Safely-cut family meals", typicalAge: "12 months +", minAgeMonths: 12 },
];

/** Controlled symptom vocabulary — maps 1:1 onto the triage table (ROADMAP §8.4). */
export const SYMPTOM_IDS = [
  "hives-few-near-mouth",
  "hives-widespread",
  "redness-resolving",
  "swelling-face",
  "swelling-tongue-lips-drooling",
  "trouble-breathing",
  "vomiting-shortly-after",
  "vomiting-repetitive",
  "vomiting-delayed-1-4h",
  "lethargy-floppy",
  "diarrhea",
  "gagging-only",
  "contact-redness-acidic",
] as const;
export type SymptomId = (typeof SYMPTOM_IDS)[number];

export const SYMPTOM_LABELS: Record<SymptomId, string> = {
  "hives-few-near-mouth": "A few hives near the mouth",
  "hives-widespread": "Widespread hives (body/limbs)",
  "redness-resolving": "Mild redness or rash that faded",
  "swelling-face": "Swelling of the face or eyes",
  "swelling-tongue-lips-drooling": "Swelling of tongue/lips, drooling, or trouble swallowing",
  "trouble-breathing": "Trouble breathing, wheezing, or persistent cough",
  "vomiting-shortly-after": "Vomiting shortly after eating",
  "vomiting-repetitive": "Repeated, forceful vomiting",
  "vomiting-delayed-1-4h": "Profuse vomiting 1–4 hours after eating",
  "lethargy-floppy": "Unusually pale, floppy, or hard to rouse",
  diarrhea: "Diarrhea",
  "gagging-only": "Gagging (worked it out on their own)",
  "contact-redness-acidic": "Red skin only where food touched (acidic food)",
};

export type FeedingStyle = "purees" | "baby-led" | "mixed";
export type EczemaSeverity = "none" | "mild-moderate" | "severe";

export type BabyProfile = {
  id: string;
  nickname: string;
  birthDate: string; // ISO date
  dueDate?: string; // ISO date — enables corrected age
  feedingStyle: FeedingStyle;
  allergyRisk: {
    eczema: EczemaSeverity;
    existingFoodAllergy: boolean;
    familyHistoryAtopy: boolean;
  };
  /** Confirmed/diagnosed allergies — engine excludes these entirely. */
  knownAllergies: AllergenId[];
  /** Food slugs excluded per medical advice. */
  doctorAvoidList: string[];
  /** "My doctor cleared us" confirmations for risk-gated allergens. */
  doctorClearances: AllergenId[];
  conditions: ("reflux" | "fpies-dx" | "cmpa" | "premature")[];
  startedSolidsOn?: string;
  textureStage: TextureStage;
  /** Custom allergen introduction order; defaults to DEFAULT_ALLERGEN_ORDER. */
  allergenOrder?: AllergenId[];
  readiness: {
    confirmedAt?: string;
    /** Pediatrician advised starting between 4–6 months. */
    earlyStartApproved?: boolean;
  };
  disclaimerAcknowledgedAt?: string;
};

export type MealSlot = "breakfast" | "lunch" | "dinner" | "snack";
export type AmountEaten = "none" | "taste" | "some" | "lots";
export type Enjoyment = "loved" | "neutral" | "disliked" | "refused";

export type ExposureLog = {
  id: string;
  babyId: string;
  foodSlug: string;
  date: string; // ISO date
  mealSlot?: MealSlot;
  prepBandUsed: AgeBand;
  amountEaten: AmountEaten;
  enjoyment: Enjoyment;
  gagging: boolean;
  symptoms: SymptomId[];
  symptomOnset?: "immediate" | "within-2h" | "2-6h" | "next-day";
  notes?: string;
};

export type AllergenStatus =
  | "not-started"
  | "introducing"
  | "maintaining"
  | "reacted-paused"
  | "avoid-per-doctor";

export type AllergenOverride = {
  allergenId: AllergenId;
  status: AllergenStatus;
  note?: string;
  setOn: string; // ISO date
};

export type ExportEnvelope = {
  schemaVersion: 1;
  exportedAt: string;
  baby: BabyProfile | null;
  logs: ExposureLog[];
  overrides: AllergenOverride[];
};

export type ImportResult =
  | { ok: true; logsImported: number; skipped: string[] }
  | { ok: false; error: string };
