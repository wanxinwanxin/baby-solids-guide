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
  /**
   * Intervention mode (2026-09-18): a family-set schedule the app instructs
   * from, with the usual prediction kept alongside as reference. Lives on
   * the profile because it is one-per-baby and must reach every member —
   * the profile already syncs that way with no new tables.
   */
  intervention?: Intervention;
  updatedAt?: string; // ISO datetime — LWW sync ordering (Phase 6)
};

export type InterventionGoal =
  | "consolidate-feeds"
  | "cap-day-sleep"
  | "shift-bedtime"
  | "night-wean"
  | "self-settle";
export const INTERVENTION_GOALS: InterventionGoal[] = [
  "consolidate-feeds",
  "cap-day-sleep",
  "shift-bedtime",
  "night-wean",
  "self-settle",
];

/** One planned bottle: local clock "HH:MM" and the target amount in ml. */
export type FeedWindow = { at: string; ml: number };
/**
 * One planned nap: when to put the baby down, the longest it may run, and an
 * optional wall-clock hard stop that wins over the cap (the afternoon nap
 * ends at 16:15 however short it was).
 */
export type NapTarget = { startAt: string; capMin: number; hardStopAt?: string };

export type Intervention = {
  enabled: boolean;
  goals: InterventionGoal[];
  /** ISO date the family started this plan. */
  startedOn: string;
  /** Which rung of the ramp the family is on; informational. */
  step: number;
  /** How many minutes early hunger may open a bottle window. */
  flexMin: number;
  feedWindows: FeedWindow[];
  naps: NapTarget[];
  /** Target "into the crib" time, local clock. */
  bedtimeAt?: string;
  /** Night-wean goal: before this clock time, resettle first; after it, feed. */
  nightCutoffAt?: string;
  nightFeedMl?: number;
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
  /**
   * A content food slug, or a user food as `custom:<normalized-name>`. Custom
   * foods carry their own display name in `customFoodName` so they resolve
   * everywhere without a content entry — they are loggable but have no food
   * page, prep specs, or planner/insights coverage.
   */
  foodSlug: string;
  /** Set only for a `custom:` foodSlug — the name the parent typed. */
  customFoodName?: string;
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

/**
 * One sleep (nap or night), synced per family like exposure logs. Times are
 * ISO datetimes from the device clock. An absent `end` means the baby is
 * asleep right now — the open session travels through sync too, so a second
 * device can close it.
 */
export type FellAsleepHow = "fed" | "rocked" | "patted" | "alone";
export type WhereSlept = "crib" | "arms" | "stroller" | "bed";

export type SleepSession = {
  id: string;
  babyId: string;
  start: string;
  end?: string;
  /**
   * Intervention-mode detail (2026-09-18), all optional. `inBedAt` is when
   * the baby went into the crib — distinct from `start`, which is when they
   * fell asleep; the gap is sleep latency, which the predictor cannot see
   * from `start` alone. `plan` freezes what the plan asked for at the time,
   * so "did they wake him at the cap" can be judged later.
   */
  inBedAt?: string;
  fellAsleepHow?: FellAsleepHow;
  whereSlept?: WhereSlept;
  plan?: { startAt: string; wakeBy: string };
  updatedAt?: string; // ISO datetime — LWW sync ordering
};

export type DiaperKind = "wet" | "dirty" | "mixed" | "dry";
export type FormulaUnit = "ml" | "oz";

/**
 * A non-food care event — a formula bottle or a diaper change — so the
 * whole family sees the day in one app. `amount` is set for kind "formula",
 * `diaper` for kind "diaper".
 */
/**
 * A moment in intervention mode that is neither a bottle nor a diaper but
 * that the plan needs to know about. Stored as a CareLog `kind: "event"` so
 * it rides the existing sync tables instead of a new one — a deliberate
 * shortcut while one family trials the mode.
 */
export type PlanEventKind = "fussy" | "nap_skipped" | "night_resettled" | "off_day";

export type CareLog = {
  id: string;
  babyId: string;
  kind: "formula" | "diaper" | "event";
  /** ISO datetime, device clock. */
  at: string;
  amount?: { value: number; unit: FormulaUnit };
  diaper?: DiaperKind;
  /** Set for kind "event". */
  event?: PlanEventKind;
  /**
   * Intervention-mode stamp on a bottle: which planned window it belongs to
   * and the target it was measured against, frozen at log time so the
   * outcome (took it / partial / refused) stays stable if the plan changes.
   */
  plan?: { windowAt: string; targetMl: number };
  /** Minutes from a night wake to resolution — a bottle or resettling. */
  settleMinutes?: number;
  notes?: string;
  updatedAt?: string; // ISO datetime — LWW sync ordering
};

/**
 * Activities done with the baby (2026-09-10; itemized 2026-09-11). Synced
 * per family like the other logs. Two shapes share one collection:
 *
 * - Daily habit ticks (the Full-day "read to baby" swipe) keep the
 *   deterministic id `<babyId>:<activity>:<date>`, so both devices agree
 *   and toggling is idempotent.
 * - Itemized logs (a specific poem read, one round of singing) use random
 *   ids so a day can hold many, and may carry `itemId`/`itemTitle`/`notes`.
 *
 * `date` is a local calendar date, YYYY-MM-DD. The zod schema accepts any
 * activity string so a newer client's activities never strand on an older
 * one; ACTIVITY_IDS is the registry this build knows how to label.
 */
export const ACTIVITY_IDS = [
  "read",
  "sing",
  "music",
  "exercise",
  "tummy-time",
  "outdoors",
  "play",
] as const;
export type ActivityId = (typeof ACTIVITY_IDS)[number];
export type ActivityLog = {
  id: string;
  babyId: string;
  /**
   * Usually one of ACTIVITY_IDS, but typed open so rows written by a newer
   * client survive here (the UI falls back to a generic label for them).
   * The `string & {}` keeps editor autocomplete for the known ids.
   */
  activity: ActivityId | (string & {});
  date: string;
  /** Stable key of the specific item (a read-aloud piece's slug). */
  itemId?: string;
  /** Display title of the item, denormalized so it renders everywhere. */
  itemTitle?: string;
  notes?: string;
  updatedAt?: string;
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
  /** Present since 2026-09-08; older exports simply lack them. */
  sleepSessions?: SleepSession[];
  careLogs?: CareLog[];
  deletedSleepIds?: string[];
  deletedCareLogIds?: string[];
  /** Present since 2026-09-10 (reading-habit sync). */
  activityLogs?: ActivityLog[];
  deletedActivityIds?: string[];
};

export type ImportResult =
  | { ok: true; logsImported: number; skipped: string[] }
  | { ok: false; error: string };
