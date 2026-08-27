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
  updatedAt?: string; // ISO datetime — LWW sync ordering (Phase 6)
};

export type MealSlot = "breakfast" | "lunch" | "dinner" | "snack";
export const MEAL_SLOTS: MealSlot[] = ["breakfast", "lunch", "dinner", "snack"];
export type AmountEaten = "none" | "taste" | "some" | "lots";
export type Enjoyment = "loved" | "neutral" | "disliked" | "refused";

/**
 * Units offered for a measured serving. Deliberately small: the volume/weight
 * pair parents actually read off a bottle or scale, plus spoons for purees.
 */
export const AMOUNT_UNITS = ["ml", "g", "oz", "tbsp", "tsp"] as const;
export type AmountUnit = (typeof AMOUNT_UNITS)[number];

/**
 * An optional measured serving ("20 ml"), for parents who track precisely.
 * It never replaces `amountEaten` — that coarse enum stays required because
 * the planner, insights, and combo ranking all key off it, and most logs are
 * still one-tap. Think of this as the detail layer on top.
 */
export type FeedQuantity = { value: number; unit: AmountUnit };

export type ExposureLog = {
  id: string;
  babyId: string;
  foodSlug: string;
  date: string; // ISO date
  /**
   * Local wall-clock time the food was served, "HH:MM" (24h). Stored as a
   * plain clock string rather than folded into an ISO datetime on purpose:
   * "7pm" means the same thing to both parents regardless of the device
   * timezone, and `date` stays the stable grouping key for the journal.
   */
  time?: string;
  mealSlot?: MealSlot;
  /** Optional measured serving, shown alongside the coarse amountEaten. */
  quantity?: FeedQuantity;
  /**
   * Key of a photo held in this device's IndexedDB (see lib/media/photos).
   * The id syncs so other devices can say "there's a photo elsewhere", but
   * the image bytes never leave the device that added them.
   */
  photoId?: string;
  prepBandUsed: AgeBand;
  amountEaten: AmountEaten;
  enjoyment: Enjoyment;
  gagging: boolean;
  symptoms: SymptomId[];
  symptomOnset?: "immediate" | "within-2h" | "2-6h" | "next-day";
  notes?: string;
  updatedAt?: string; // ISO datetime — LWW sync ordering (Phase 6)
};

export type AllergenStatus =
  | "not-started"
  | "introducing"
  | "maintaining"
  | "reacted-paused"
  | "avoid-per-doctor";

export type AllergenOverride = {
  /** Present from schema v2 on; absent in legacy v1 data (stamped on migrate). */
  babyId?: string;
  allergenId: AllergenId;
  status: AllergenStatus;
  note?: string;
  setOn: string; // ISO date
  updatedAt?: string; // ISO datetime — LWW sync ordering (Phase 6)
};

/** Post-allergen "check for symptoms" reminder (Phase 8A). */
export type CheckIn = {
  id: string;
  babyId: string;
  foodSlug: string;
  logId: string;
  /** When the food was served (check-in creation time) — drives onset mapping. */
  createdAt?: string;
  dueAt: string; // ISO datetime
  status: "pending" | "done" | "dismissed";
  updatedAt?: string;
};

export type CheckInPreset = "15m" | "1h" | "2h" | "2d" | "1w";

/** 12-week introduction plan (Phase 11). */
/**
 * `dayIndex` (days from anchorMonday) is the real schedule slot — new foods
 * are spaced by an observation window so a reaction is traceable to one
 * food. `weekIndex` is derived from it and kept for the board UI and for
 * plans written before day-level scheduling existed.
 */
export type PlanEntry = { id: string; foodSlug: string; weekIndex: number; dayIndex?: number };
export type Plan = {
  babyId: string;
  anchorMonday: string; // ISO date of week 0's Monday
  entries: PlanEntry[];
  updatedAt?: string;
};

/** v1 envelope (single baby) — still accepted by the importer. */
export type ExportEnvelopeV1 = {
  schemaVersion: 1;
  exportedAt: string;
  baby: BabyProfile | null;
  logs: ExposureLog[];
  overrides: AllergenOverride[];
};

/** v2 envelope — multi-baby, check-ins, plans, tombstones. */
export type ExportEnvelope = {
  schemaVersion: 2;
  exportedAt: string;
  babies: BabyProfile[];
  activeBabyId: string | null;
  logs: ExposureLog[];
  overrides: AllergenOverride[];
  checkIns: CheckIn[];
  plans: Plan[];
  deletedLogIds: string[];
};

export type ImportResult =
  | { ok: true; logsImported: number; skipped: string[] }
  | { ok: false; error: string };
