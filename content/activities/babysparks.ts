import { z } from "zod";
import { bilingualSchema, IDEA_AREAS, MOVEMENT_ACTIVITIES } from "@/content-schema/activity-ideas";
import data from "./babysparks.json";

/** Transcribed/translated summary supplied by the user, not original OpenSolids copy. */
export const babySparksSchema = z.object({
  slug: z.string().regex(/^babysparks-\d{3}$/),
  catalogId: z.number().int().min(1).max(193),
  title: bilingualSchema,
  area: z.enum(IDEA_AREAS),
  activity: z.enum(MOVEMENT_ACTIVITIES),
  ageBand: z.enum(["4-6", "7-9"]),
  goal: bilingualSchema,
  instructions: bilingualSchema,
  materials: bilingualSchema,
  duration: bilingualSchema,
  milestone: bilingualSchema.optional(),
  reminder: bilingualSchema.optional(),
  reminderBasis: z.string().min(1).optional(),
}).refine((entry) => Boolean(entry.reminder) === Boolean(entry.reminderBasis), {
  message: "An added reminder must retain its basis",
});

export const babySparksActivities = data.map((entry) => babySparksSchema.parse(entry));

export function filterBabySparks(area: string | null, age: string | null, query: string) {
  const search = query.trim().normalize("NFKC").toLocaleLowerCase();
  return babySparksActivities.filter((entry) =>
    (!area || entry.area === area) &&
    (!age || entry.ageBand === age) &&
    (!search || [entry.title, entry.goal, entry.instructions, entry.materials]
      .some((field) => [field.en, field.zh].some((value) =>
        value.normalize("NFKC").toLocaleLowerCase().includes(search)))),
  );
}
