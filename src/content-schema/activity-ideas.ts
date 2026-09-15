import { z } from "zod";

/**
 * Movement ideas (/activities) — things to DO with a baby, next to the
 * one-tap activity log. The read-aloud shelf answers "what do I recite?".
 * This collection answers "what do I do with the baby right now?".
 *
 * Every word here is ours. The entries describe ordinary physical play that
 * no one owns, so nothing in this file carries a licensing question, and it
 * needs no source citation. A song list is a separate problem, because the
 * songs a parent of this generation knows are mostly still in copyright.
 *
 * A movement idea is the same idea in both languages, so each field carries
 * both at once (see `bilingualSchema`). The type makes an English-only entry
 * impossible, which is a stronger guarantee than the overlay files give the
 * food corpus — there is no index-aligned second file that can drift.
 */

/** One string in both languages. Mirrors `Msg` in src/lib/i18n/config.ts. */
export const bilingualSchema = z.object({ en: z.string().min(1), zh: z.string().min(1) });
export type Bilingual = z.infer<typeof bilingualSchema>;

/**
 * Which activity a movement idea logs as. These are ids from ACTIVITY_IDS
 * (src/lib/storage/types.ts), so one tap on an idea lands in the same
 * per-day counts as the quick-log buttons above it.
 */
export const MOVEMENT_ACTIVITIES = ["tummy-time", "exercise", "play", "outdoors"] as const;
export type MovementActivity = (typeof MOVEMENT_ACTIVITIES)[number];

export const movementIdeaSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab-case slug"),
    title: bilingualSchema,
    activity: z.enum(MOVEMENT_ACTIVITIES),
    /** Age window in months. `fromMonths` is inclusive, `toMonths` is not. */
    fromMonths: z.number().int().min(0).max(36),
    toMonths: z.number().int().min(1).max(36),
    /** What to do, one action per step. */
    steps: z.array(bilingualSchema).min(2),
    /** What the movement builds — the reason to bother with it. */
    why: bilingualSchema,
    /**
     * When to stop, and what makes this unsafe. Required on every entry,
     * because a parent moving a baby's body needs the limit in front of
     * them, next to the instruction, and not on some other page.
     */
    watchFor: bilingualSchema,
  })
  .refine((m) => m.toMonths > m.fromMonths, {
    message: "toMonths must be greater than fromMonths",
    path: ["toMonths"],
  });
export type MovementIdea = z.infer<typeof movementIdeaSchema>;
