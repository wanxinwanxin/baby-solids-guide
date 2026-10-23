"use client";

import { useEffect, useMemo } from "react";
import { customLogsToRelink, uniqueTermIndex } from "@/lib/custom-food-merge";
import { useHydrated } from "@/lib/hooks";
import { useGuideStore } from "@/lib/storage/store";

/**
 * Keeps custom foods from doubling up with catalog foods. When a custom
 * food's name now matches a catalog food (the catalog gained it, or a
 * second device synced an old log), its logs move onto the catalog slug.
 * The move re-stamps the logs, so sync carries it to the rest of the family.
 */
export function CustomFoodRelink() {
  const hydrated = useHydrated();
  const logs = useGuideStore((s) => s.logs);
  const relink = useGuideStore((s) => s.relinkCustomFoods);
  const index = useMemo(() => uniqueTermIndex(), []);

  useEffect(() => {
    if (!hydrated) return;
    const byId = customLogsToRelink(logs, index);
    if (Object.keys(byId).length > 0) relink(byId);
  }, [hydrated, logs, index, relink]);

  return null;
}
