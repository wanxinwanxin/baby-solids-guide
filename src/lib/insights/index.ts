import type { AgeBand, Food, FoodCategory, NutrientTag } from "@/content-schema/food";
import { AGE_BANDS, FOOD_CATEGORIES, NUTRIENT_TAGS } from "@/content-schema/food";
import { daysBetween } from "@/lib/age";
import type { AllergenStateView } from "@/lib/engine";
import type { Locale } from "@/lib/i18n/config";
import { categoryLabel, nutrientLabel } from "@/lib/i18n/labels";
import type { ExposureLog } from "@/lib/storage/types";

/**
 * Insights selectors (Phase 14). Pure: no I/O, no Date.now() — the clock is
 * injected via `today`, so the same input always yields the same output.
 * Every selector handles empty logs gracefully.
 */

const DAY = 86400000;

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Whole days between the log's date and `today` (0 = logged today). */
function dayIndex(dateIso: string, today: Date): number {
  return Math.floor(daysBetween(dateIso, today));
}

function ate(log: ExposureLog): boolean {
  return log.amountEaten !== "none";
}

/** "MM-DD" labels for 7-day windows ending today, oldest → newest. */
function weekLabels(today: Date, weeks: number): string[] {
  return Array.from({ length: weeks }, (_, i) =>
    isoDay(new Date(today.getTime() - (weeks - 1 - i) * 7 * DAY)).slice(5),
  );
}

/** Slot in an oldest→newest array of 7-day buckets, or null when outside. */
function weekSlot(dateIso: string, today: Date, weeks: number): number | null {
  const d = dayIndex(dateIso, today);
  if (d < 0 || d >= weeks * 7) return null;
  return weeks - 1 - Math.floor(d / 7);
}

/** Logs for one food, oldest → newest (stable for same-day logs). */
function sortedBySlug(logs: ExposureLog[]): Map<string, ExposureLog[]> {
  const bySlug = new Map<string, ExposureLog[]>();
  for (const log of [...logs].sort((a, b) => a.date.localeCompare(b.date))) {
    bySlug.set(log.foodSlug, [...(bySlug.get(log.foodSlug) ?? []), log]);
  }
  return bySlug;
}

// ——— Category variety ———

export type CategoryVariety = {
  category: FoodCategory;
  label: string;
  distinctFoods: number;
};

/** Distinct foods eaten per category in the trailing `days`-day window. */
export function categoryVariety(
  logs: ExposureLog[],
  foods: Food[],
  today: Date,
  days = 14,
  locale: Locale = "en",
): CategoryVariety[] {
  const categoryOf = new Map(foods.map((f) => [f.slug, f.category]));
  const eaten = new Map<FoodCategory, Set<string>>();
  for (const log of logs) {
    if (!ate(log)) continue;
    const d = dayIndex(log.date, today);
    if (d < 0 || d >= days) continue;
    const category = categoryOf.get(log.foodSlug);
    if (!category) continue;
    const set = eaten.get(category) ?? new Set<string>();
    set.add(log.foodSlug);
    eaten.set(category, set);
  }
  return FOOD_CATEGORIES.map((category) => ({
    category,
    label: categoryLabel(category, locale),
    distinctFoods: eaten.get(category)?.size ?? 0,
  }));
}

// ——— Iron exposures per week ———

export type WeeklyCount = { weekLabel: string; count: number };

/** Iron-rich foods eaten, bucketed into 7-day windows ending today, oldest → newest. */
export function ironExposuresPerWeek(
  logs: ExposureLog[],
  foods: Food[],
  today: Date,
  weeks = 4,
): WeeklyCount[] {
  const ironSlugs = new Set(foods.filter((f) => f.ironRich).map((f) => f.slug));
  const counts = new Array<number>(weeks).fill(0);
  for (const log of logs) {
    if (!ate(log) || !ironSlugs.has(log.foodSlug)) continue;
    const slot = weekSlot(log.date, today, weeks);
    if (slot !== null) counts[slot] += 1;
  }
  const labels = weekLabels(today, weeks);
  return counts.map((count, i) => ({ weekLabel: labels[i], count }));
}

// ——— Allergen coverage ———

export type AllergenCoverage = {
  introduced: number;
  maintaining: number;
  paused: number;
  notStarted: number;
};

/** Bucket the 9 allergen states: introducing → introduced; reacted-paused + avoid-per-doctor → paused. */
export function allergenCoverage(states: AllergenStateView[]): AllergenCoverage {
  const coverage: AllergenCoverage = { introduced: 0, maintaining: 0, paused: 0, notStarted: 0 };
  for (const state of states) {
    if (state.status === "introducing") coverage.introduced += 1;
    else if (state.status === "maintaining") coverage.maintaining += 1;
    else if (state.status === "reacted-paused" || state.status === "avoid-per-doctor") coverage.paused += 1;
    else coverage.notStarted += 1;
  }
  return coverage;
}

// ——— Texture timeline ———

export type TextureWeek = { weekLabel: string; bands: Record<AgeBand, number> };

/** Count of prepBandUsed per 7-day window ending today, oldest → newest. */
export function textureTimeline(logs: ExposureLog[], today: Date, weeks = 8): TextureWeek[] {
  const result: TextureWeek[] = weekLabels(today, weeks).map((weekLabel) => ({
    weekLabel,
    bands: Object.fromEntries(AGE_BANDS.map((b) => [b, 0])) as Record<AgeBand, number>,
  }));
  for (const log of logs) {
    const slot = weekSlot(log.date, today, weeks);
    if (slot !== null) result[slot].bands[log.prepBandUsed] += 1;
  }
  return result;
}

// ——— Persistent refusals ———

export type RefusalItem = { slug: string; name: string; attempts: number; lastDate: string };

/** Foods whose latest log was refused/disliked, most-attempted first (max 8). */
export function persistentRefusals(logs: ExposureLog[], foods: Food[]): RefusalItem[] {
  const nameOf = new Map(foods.map((f) => [f.slug, f.name]));
  const items: RefusalItem[] = [];
  for (const [slug, own] of sortedBySlug(logs)) {
    const latest = own[own.length - 1];
    if (latest.enjoyment !== "refused" && latest.enjoyment !== "disliked") continue;
    items.push({
      slug,
      name: nameOf.get(slug) ?? slug,
      attempts: own.length,
      lastDate: latest.date,
    });
  }
  return items
    .sort((a, b) => b.attempts - a.attempts || a.slug.localeCompare(b.slug))
    .slice(0, 8);
}

// ——— Acceptance state machine ———

export type AcceptanceState = "loved" | "warming-up" | "needs-retries" | "not-tried";

function acceptanceOf(own: ExposureLog[]): AcceptanceState {
  if (own.length === 0) return "not-tried";
  const latestTwoLoved = own.length >= 2 && own.slice(-2).every((l) => l.enjoyment === "loved");
  const lovedShare = own.filter((l) => l.enjoyment === "loved").length / own.length;
  if (latestTwoLoved || lovedShare >= 0.6) return "loved";
  const latest = own[own.length - 1];
  if (latest.enjoyment === "refused" || latest.enjoyment === "disliked") return "needs-retries";
  return "warming-up";
}

/**
 * How a food is landing: not-tried (no logs); loved (latest 2 logs loved, or
 * ≥60% of all its logs loved); needs-retries (latest log refused/disliked);
 * otherwise warming-up.
 */
export function acceptance(logs: ExposureLog[], foodSlug: string): AcceptanceState {
  return acceptanceOf(sortedBySlug(logs).get(foodSlug) ?? []);
}

/** Acceptance state for every food that has at least one log. */
export function acceptanceForAll(logs: ExposureLog[]): Map<string, AcceptanceState> {
  return new Map([...sortedBySlug(logs)].map(([slug, own]) => [slug, acceptanceOf(own)]));
}

// ——— Nutrient coverage ———

export type NutrientCount = { tag: NutrientTag; label: string; count: number };

/**
 * Eaten logs carrying each nutrient tag in the trailing `days`-day window.
 * All 12 tags are returned (zeros included); foods without a `nutrients`
 * field contribute nothing.
 */
export function nutrientCoverage(
  logs: ExposureLog[],
  foods: Food[],
  today: Date,
  days = 7,
  locale: Locale = "en",
): NutrientCount[] {
  const nutrientsOf = new Map(foods.map((f) => [f.slug, f.nutrients ?? []]));
  const counts = new Map<NutrientTag, number>(NUTRIENT_TAGS.map((t) => [t, 0]));
  for (const log of logs) {
    if (!ate(log)) continue;
    const d = dayIndex(log.date, today);
    if (d < 0 || d >= days) continue;
    for (const tag of nutrientsOf.get(log.foodSlug) ?? []) {
      counts.set(tag, counts.get(tag)! + 1);
    }
  }
  return NUTRIENT_TAGS.map((tag) => ({ tag, label: nutrientLabel(tag, locale), count: counts.get(tag)! }));
}
