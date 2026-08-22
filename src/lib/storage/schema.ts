import { z } from "zod";
import { AGE_BANDS, ALLERGEN_IDS } from "@/content-schema/food";
import { SYMPTOM_IDS } from "./types";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const babyProfileSchema = z.object({
  id: z.string().min(1),
  nickname: z.string().min(1),
  birthDate: isoDate,
  dueDate: isoDate.optional(),
  feedingStyle: z.enum(["purees", "baby-led", "mixed"]),
  allergyRisk: z.object({
    eczema: z.enum(["none", "mild-moderate", "severe"]),
    existingFoodAllergy: z.boolean(),
    familyHistoryAtopy: z.boolean(),
  }),
  knownAllergies: z.array(z.enum(ALLERGEN_IDS)),
  doctorAvoidList: z.array(z.string()),
  doctorClearances: z.array(z.enum(ALLERGEN_IDS)),
  conditions: z.array(z.enum(["reflux", "fpies-dx", "cmpa", "premature"])),
  startedSolidsOn: isoDate.optional(),
  textureStage: z.enum(["S1", "S2", "S3", "S4"]),
  allergenOrder: z.array(z.enum(ALLERGEN_IDS)).optional(),
  readiness: z.object({
    confirmedAt: isoDate.optional(),
    earlyStartApproved: z.boolean().optional(),
  }),
  disclaimerAcknowledgedAt: z.string().optional(),
});

export const exposureLogSchema = z.object({
  id: z.string().min(1),
  babyId: z.string().min(1),
  foodSlug: z.string().min(1),
  date: isoDate,
  mealSlot: z.enum(["breakfast", "lunch", "dinner", "snack"]).optional(),
  prepBandUsed: z.enum(AGE_BANDS),
  amountEaten: z.enum(["none", "taste", "some", "lots"]),
  enjoyment: z.enum(["loved", "neutral", "disliked", "refused"]),
  gagging: z.boolean(),
  symptoms: z.array(z.enum(SYMPTOM_IDS)),
  symptomOnset: z.enum(["immediate", "within-2h", "2-6h", "next-day"]).optional(),
  notes: z.string().optional(),
});

export const allergenOverrideSchema = z.object({
  allergenId: z.enum(ALLERGEN_IDS),
  status: z.enum(["not-started", "introducing", "maintaining", "reacted-paused", "avoid-per-doctor"]),
  note: z.string().optional(),
  setOn: isoDate,
});

export const exportEnvelopeSchema = z.object({
  schemaVersion: z.literal(1),
  exportedAt: z.string(),
  baby: babyProfileSchema.nullable(),
  logs: z.array(z.unknown()),
  overrides: z.array(z.unknown()),
});
