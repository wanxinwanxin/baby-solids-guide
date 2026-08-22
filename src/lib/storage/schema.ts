import { z } from "zod";
import { AGE_BANDS, ALLERGEN_IDS } from "@/content-schema/food";
import { SYMPTOM_IDS } from "./types";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const isoDateTime = z.string().min(10);

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
  updatedAt: isoDateTime.optional(),
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
  updatedAt: isoDateTime.optional(),
});

export const allergenOverrideSchema = z.object({
  babyId: z.string().min(1).optional(),
  allergenId: z.enum(ALLERGEN_IDS),
  status: z.enum(["not-started", "introducing", "maintaining", "reacted-paused", "avoid-per-doctor"]),
  note: z.string().optional(),
  setOn: isoDate,
  updatedAt: isoDateTime.optional(),
});

export const checkInSchema = z.object({
  id: z.string().min(1),
  babyId: z.string().min(1),
  foodSlug: z.string().min(1),
  logId: z.string().min(1),
  createdAt: isoDateTime.optional(),
  dueAt: isoDateTime,
  status: z.enum(["pending", "done", "dismissed"]),
  updatedAt: isoDateTime.optional(),
});

export const planSchema = z.object({
  babyId: z.string().min(1),
  anchorMonday: isoDate,
  entries: z.array(
    z.object({ id: z.string().min(1), foodSlug: z.string().min(1), weekIndex: z.number().int().min(0).max(51) }),
  ),
  updatedAt: isoDateTime.optional(),
});

export const exportEnvelopeV1Schema = z.object({
  schemaVersion: z.literal(1),
  exportedAt: z.string(),
  baby: babyProfileSchema.nullable(),
  logs: z.array(z.unknown()),
  overrides: z.array(z.unknown()),
});

export const exportEnvelopeV2Schema = z.object({
  schemaVersion: z.literal(2),
  exportedAt: z.string(),
  babies: z.array(babyProfileSchema),
  activeBabyId: z.string().nullable(),
  logs: z.array(z.unknown()),
  overrides: z.array(z.unknown()),
  checkIns: z.array(z.unknown()),
  plans: z.array(z.unknown()),
  deletedLogIds: z.array(z.string()),
});
