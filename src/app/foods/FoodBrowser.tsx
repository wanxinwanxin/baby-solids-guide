"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FoodCategory } from "@/content-schema/food";
import { ALLERGEN_LABELS, CATEGORY_LABELS, type SlimFood } from "@/lib/food-utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Filter = "all" | "iron" | "allergen" | "first-picks" | FoodCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "first-picks", label: "Great first foods" },
  { id: "iron", label: "Iron-rich" },
  { id: "allergen", label: "Common allergens" },
  ...(Object.entries(CATEGORY_LABELS) as [FoodCategory, string][]).map(([id, label]) => ({
    id: id as Filter,
    label,
  })),
];

export function FoodBrowser({ foods }: { foods: SlimFood[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return foods
      .filter((f) => {
        if (q && !f.name.toLowerCase().includes(q) && !f.slug.includes(q)) return false;
        if (filter === "all") return true;
        if (filter === "iron") return f.ironRich;
        if (filter === "allergen") return f.commonAllergen !== null;
        if (filter === "first-picks") return f.firstFoodPick;
        return f.category === filter;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [foods, query, filter]);

  return (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search foods…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search foods"
        className="max-w-sm"
      />
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filters">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              filter === f.id
                ? "border-emerald-700 bg-emerald-700 text-white"
                : "text-muted-foreground hover:border-emerald-400",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{visible.length} foods</p>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((f) => (
          <li key={f.slug}>
            <Link
              href={`/foods/${f.slug}`}
              className="flex h-full flex-col gap-2 rounded-lg border p-4 transition-colors hover:border-emerald-400"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{f.name}</span>
                <span className="text-xs text-muted-foreground">{f.minAgeMonths}m+</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {f.ironRich && (
                  <Badge variant="outline" className="border-amber-400 text-amber-700 dark:text-amber-400">
                    Iron-rich
                  </Badge>
                )}
                {f.commonAllergen && (
                  <Badge variant="outline" className="border-violet-400 text-violet-700 dark:text-violet-400">
                    {ALLERGEN_LABELS[f.commonAllergen]}
                  </Badge>
                )}
                {f.chokingRisk !== "low" && (
                  <Badge variant="outline" className="border-red-400 text-red-700 dark:text-red-400">
                    {f.chokingRisk === "high" ? "High choking risk" : "Choking care"}
                  </Badge>
                )}
                {f.firstFoodPick && (
                  <Badge variant="outline" className="border-emerald-400 text-emerald-700 dark:text-emerald-400">
                    Great first food
                  </Badge>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
