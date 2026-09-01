import { calendarDaysBetween } from "@/lib/age";
import type { ExposureLog, Plan, PlanEntry } from "@/lib/storage/types";

/**
 * Where a plan actually stands today.
 *
 * The plan on disk is a list of foods in an order, each holding a reserved
 * day. Real life moves that: a family skips a week, a food gets eaten early,
 * an allergen is paused after a reaction. This module is the one place that
 * reconciles the written plan with the logs, so Today and the plan board can
 * never disagree about which food is being introduced or when the next one
 * arrives.
 *
 * Pure: no I/O, no Date.now(). The clock is `today` and the block list comes
 * in through `isBlocked`, which keeps this module free of the engine (the
 * engine and the planner both import it).
 */

/**
 * The observation window a new food owns before the next one starts, so a
 * reaction points at exactly one food. Three days is what the allergen
 * guidance asks for, and applying it to every new food is what keeps a
 * seven-day week to two or three introductions.
 */
export const INTRO_SPACING_DAYS = 3;

/** Schedule slot of an entry; pre-day-level plans fall back to their week. */
export function entryDay(entry: PlanEntry): number {
  return entry.dayIndex ?? entry.weekIndex * 7;
}

export type PlanStepStatus =
  /** Eaten at least once — this introduction happened. */
  | "introduced"
  /** Offered but not eaten yet. It had its turn; the retry queue brings it back. */
  | "offered"
  /** Its turn is today: the one new food the plan wants on the tray. */
  | "now"
  /** Cannot be served right now (paused allergen, doctor-avoid, age gate). */
  | "blocked"
  /** Still ahead, with a projected date. */
  | "upcoming";

export type PlanStep = {
  entry: PlanEntry;
  foodSlug: string;
  status: PlanStepStatus;
  /** Day the plan reserved for this food, counted from anchorMonday. */
  scheduledDay: number;
  /** ISO date of scheduledDay — what the board was written to say. */
  scheduledDate: string;
  /** Day it is really expected on. Blocked steps have none — they are parked. */
  projectedDay?: number;
  /** ISO date of projectedDay. An introduced step carries the date it happened. */
  projectedDate?: string;
  /** Whole days from today to projectedDate; negative once it is past. */
  daysAway?: number;
  /** Why this food is blocked, in the caller's own words. */
  blockedReason?: string;
  /** Times this food was offered, from every log rather than the plan. */
  attempts: number;
  /** First date the food was put in front of the baby, eaten or not. */
  offeredOn?: string;
  /** First date the food was actually eaten. */
  startedOn?: string;
};

export type PlanProgress = {
  /** Every entry, in plan order. */
  steps: PlanStep[];
  /** The food whose turn is today, if one is due and nothing blocks it. */
  now: PlanStep | null;
  /**
   * A food first offered inside the last observation window. While one
   * exists the plan wants it offered again rather than a new food on top of
   * it — a refusal is normal and worth repeating, not a reason to move on.
   */
  watching: PlanStep | null;
  /** Steps still ahead, earliest first. */
  upcoming: PlanStep[];
  /** Steps parked until something is lifted, in plan order. */
  blocked: PlanStep[];
  introducedCount: number;
  total: number;
  /**
   * Days between the written schedule and the projection for the next food.
   * 0 when the plan is on time; positive once the family runs behind.
   */
  slipDays: number;
};

const EMPTY: PlanProgress = {
  steps: [],
  now: null,
  watching: null,
  upcoming: [],
  blocked: [],
  introducedCount: 0,
  total: 0,
  slipDays: 0,
};

export type PlanProgressInput = {
  plan: Plan | null | undefined;
  logs: ExposureLog[];
  today: Date;
  /** A sentence saying why this food cannot be served now, or undefined. */
  isBlocked?: (foodSlug: string) => string | undefined;
  spacingDays?: number;
};

export function planProgress(input: PlanProgressInput): PlanProgress {
  const { plan, logs, today, isBlocked, spacingDays = INTRO_SPACING_DAYS } = input;
  if (!plan || plan.entries.length === 0) return EMPTY;

  const anchorMs = Date.parse(`${plan.anchorMonday}T00:00:00Z`);
  const dayOfDate = (iso: string) =>
    Math.round((Date.parse(`${iso}T00:00:00Z`) - anchorMs) / 86400000);
  const dateOfDay = (day: number) =>
    new Date(anchorMs + day * 86400000).toISOString().slice(0, 10);
  const todayDay = calendarDaysBetween(plan.anchorMonday, today);

  // Counted over every log, not just planned foods, so a food eaten off-plan
  // still reads as introduced when the plan reaches it.
  const attempts = new Map<string, number>();
  const firstOffered = new Map<string, string>();
  const firstEaten = new Map<string, string>();
  const earliest = (m: Map<string, string>, slug: string, date: string) => {
    const prev = m.get(slug);
    if (!prev || date < prev) m.set(slug, date);
  };
  for (const log of logs) {
    attempts.set(log.foodSlug, (attempts.get(log.foodSlug) ?? 0) + 1);
    earliest(firstOffered, log.foodSlug, log.date);
    if (log.amountEaten !== "none") earliest(firstEaten, log.foodSlug, log.date);
  }

  const ordered = [...plan.entries].sort(
    (a, b) => entryDay(a) - entryDay(b) || a.foodSlug.localeCompare(b.foodSlug),
  );

  const steps: PlanStep[] = [];
  /** Earliest day the next introduction may begin. */
  let cursor = -Infinity;
  let slipDays = 0;

  for (const entry of ordered) {
    const foodSlug = entry.foodSlug;
    const scheduledDay = entryDay(entry);
    const offeredOn = firstOffered.get(foodSlug);
    const startedOn = firstEaten.get(foodSlug);
    const base = {
      entry,
      foodSlug,
      scheduledDay,
      scheduledDate: dateOfDay(scheduledDay),
      attempts: attempts.get(foodSlug) ?? 0,
      offeredOn,
      startedOn,
    };

    // The turn belongs to the first offer, not the first bite. A baby who
    // refuses a food has still had that food introduced — the plan moves on
    // after its window and the retry queue brings the food back. Dating the
    // window from the first offer also stops a food that gets served every
    // day from holding the queue open indefinitely.
    if (offeredOn) cursor = Math.max(cursor, dayOfDate(offeredOn) + spacingDays);

    const blockedReason = isBlocked?.(foodSlug);
    if (blockedReason) {
      // A blocked food is parked, not dropped: it holds its place in the
      // order and takes its turn again the day the block lifts. Until then
      // it reserves no date, so everything behind it moves up.
      steps.push({ ...base, status: "blocked", blockedReason });
      continue;
    }

    if (offeredOn) {
      const day = dayOfDate(offeredOn);
      steps.push({
        ...base,
        status: startedOn ? "introduced" : "offered",
        projectedDay: day,
        projectedDate: offeredOn,
        daysAway: day - todayDay,
      });
      continue;
    }

    // Nothing still to come can sit in the past, so the whole tail slides
    // forward together on the day a family falls behind. The written day
    // stays a floor: the planner put it there to clear an age gate.
    const day = Math.max(scheduledDay, cursor, todayDay);
    if (steps.every((s) => s.status !== "now" && s.status !== "upcoming")) {
      slipDays = Math.max(0, day - scheduledDay);
    }
    cursor = day + spacingDays;
    steps.push({
      ...base,
      status: day <= todayDay ? "now" : "upcoming",
      projectedDay: day,
      projectedDate: dateOfDay(day),
      daysAway: day - todayDay,
    });
  }

  const watching =
    steps
      .filter(
        (s) =>
          (s.status === "introduced" || s.status === "offered") &&
          s.projectedDay !== undefined &&
          s.projectedDay <= todayDay &&
          todayDay - s.projectedDay < spacingDays,
      )
      .sort((a, b) => b.projectedDay! - a.projectedDay!)[0] ?? null;

  return {
    steps,
    now: steps.find((s) => s.status === "now") ?? null,
    watching,
    upcoming: steps.filter((s) => s.status === "upcoming"),
    blocked: steps.filter((s) => s.status === "blocked"),
    introducedCount: steps.filter((s) => s.status === "introduced").length,
    total: steps.length,
    slipDays,
  };
}
