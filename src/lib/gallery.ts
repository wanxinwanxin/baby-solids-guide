import type { Food, FoodCategory } from "@/content-schema/food";
import type { ExposureLog } from "@/lib/storage/types";
import { triage } from "@/lib/triage";

/**
 * Food gallery (2026-09-11, from user feedback): every catalog food is a
 * collectible tile. A food unlocks after it was eaten on UNLOCK_EXPOSURES
 * distinct days with no reaction — the same "three clean exposures" idea
 * parents already use for allergen clearing (排敏). A food with a
 * reaction-grade log moves to the reactions shelf instead.
 *
 * Pure module: no I/O, no store access — callers pass logs and foods in.
 * Custom foods (`custom:` slugs) have no catalog tile and are skipped,
 * matching the insights selectors.
 */

export const UNLOCK_EXPOSURES = 3;

export type UnlockState = "not-tried" | "in-progress" | "unlocked" | "reacted";

export type FoodUnlock = {
  slug: string;
  name: string;
  emoji?: string;
  category: FoodCategory;
  /** Distinct days with an eaten (amountEaten !== "none") log. */
  eatenDays: number;
  state: UnlockState;
};

export type GallerySummary = {
  foods: FoodUnlock[];
  unlockedCount: number;
  /** Foods with at least one eaten day that have not unlocked yet. */
  inProgressCount: number;
  reactedCount: number;
  totalFoods: number;
};

/** True when any log for the food carries allergen-pausing symptoms. */
function hasReaction(own: ExposureLog[]): boolean {
  return own.some((log) => triage(log.symptoms).pausesAllergen);
}

export function foodGallery(logs: ExposureLog[], foods: Food[]): GallerySummary {
  const bySlug = new Map<string, ExposureLog[]>();
  for (const log of logs) {
    bySlug.set(log.foodSlug, [...(bySlug.get(log.foodSlug) ?? []), log]);
  }

  let unlockedCount = 0;
  let inProgressCount = 0;
  let reactedCount = 0;

  const entries: FoodUnlock[] = foods.map((food) => {
    const own = bySlug.get(food.slug) ?? [];
    const eatenDays = new Set(own.filter((l) => l.amountEaten !== "none").map((l) => l.date)).size;
    let state: UnlockState;
    if (hasReaction(own)) {
      state = "reacted";
      reactedCount += 1;
    } else if (eatenDays >= UNLOCK_EXPOSURES) {
      state = "unlocked";
      unlockedCount += 1;
    } else if (eatenDays > 0) {
      state = "in-progress";
      inProgressCount += 1;
    } else {
      state = "not-tried";
    }
    return {
      slug: food.slug,
      name: food.name,
      emoji: food.emoji,
      category: food.category,
      eatenDays,
      state,
    };
  });

  return {
    foods: entries,
    unlockedCount,
    inProgressCount,
    reactedCount,
    totalFoods: foods.length,
  };
}

// ——— Achievements ———

/**
 * Tiers are keyed by id; display names live in messages/gallery.ts so both
 * locales render from one source. Thresholds count unlocked foods.
 */
export const ACHIEVEMENT_IDS = [
  "first-bite",
  "first-forays",
  "little-snacker",
  "brave-taster",
  "food-explorer",
  "little-gourmet",
  "table-legend",
] as const;
export type AchievementId = (typeof ACHIEVEMENT_IDS)[number];

export type AchievementTier = { id: AchievementId; threshold: number };

export const ACHIEVEMENT_TIERS: AchievementTier[] = [
  { id: "first-bite", threshold: 1 },
  { id: "first-forays", threshold: 5 },
  { id: "little-snacker", threshold: 15 },
  { id: "brave-taster", threshold: 30 },
  { id: "food-explorer", threshold: 50 },
  { id: "little-gourmet", threshold: 80 },
  { id: "table-legend", threshold: 120 },
];

export type AchievementProgress = {
  /** Highest tier reached, or null before the first unlock. */
  current: AchievementTier | null;
  /** Next tier to reach, or null when every tier is earned. */
  next: AchievementTier | null;
};

export function achievementProgress(unlockedCount: number): AchievementProgress {
  let current: AchievementTier | null = null;
  for (const tier of ACHIEVEMENT_TIERS) {
    if (unlockedCount >= tier.threshold) current = tier;
  }
  const next = ACHIEVEMENT_TIERS.find((t) => unlockedCount < t.threshold) ?? null;
  return { current, next };
}
