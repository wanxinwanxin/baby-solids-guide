import { FOOD_SEARCH_TERMS } from "../../content/foods/search-terms";
import { CUSTOM_FOOD_PREFIX, isCustomFoodSlug } from "@/lib/food-utils";
import type { ExposureLog } from "@/lib/storage/types";

/**
 * A custom food is a name a parent typed when the catalog had no match. When
 * the catalog later gains that food (macadamia was a custom food first), the
 * old logs must join the catalog food, or the food shows twice everywhere and
 * the planner, insights, and gallery never count the early tastes.
 *
 * A name joins a catalog food only on an exact match with one of its names
 * or aliases, in either language, and only when that term belongs to exactly
 * one food. An ambiguous term stays custom.
 */

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

/** Term → slug, for terms that name exactly one catalog food. */
export function uniqueTermIndex(terms: Record<string, string[]> = FOOD_SEARCH_TERMS): Map<string, string> {
  const owners = new Map<string, Set<string>>();
  for (const [slug, list] of Object.entries(terms)) {
    for (const term of list) {
      const key = normalize(term);
      if (!owners.has(key)) owners.set(key, new Set());
      owners.get(key)!.add(slug);
    }
  }
  const out = new Map<string, string>();
  for (const [term, slugs] of owners) if (slugs.size === 1) out.set(term, [...slugs][0]);
  return out;
}

/** The catalog slug a custom food now matches, or null. */
export function catalogSlugForCustom(
  log: Pick<ExposureLog, "foodSlug" | "customFoodName">,
  index: Map<string, string>,
): string | null {
  if (!isCustomFoodSlug(log.foodSlug)) return null;
  const name = log.customFoodName ?? log.foodSlug.slice(CUSTOM_FOOD_PREFIX.length);
  return index.get(normalize(name)) ?? null;
}

/** Log id → catalog slug, for every custom-food log the catalog now covers. */
export function customLogsToRelink(
  logs: Pick<ExposureLog, "id" | "foodSlug" | "customFoodName">[],
  index: Map<string, string> = uniqueTermIndex(),
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of logs) {
    const slug = catalogSlugForCustom(l, index);
    if (slug) out[l.id] = slug;
  }
  return out;
}
