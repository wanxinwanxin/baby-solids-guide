"use client";

import Link from"next/link";
import { useMemo } from"react";
import { allFoods } from"../../../content/foods";
import type { FoodCategory } from"@/content-schema/food";
import { deriveAllergenStates } from"@/lib/engine";
import { BAND_LABELS } from"@/lib/food-utils";
import { useActiveBaby, useActiveLogs, useActiveOverrides, useHydrated } from"@/lib/hooks";
import {
  allergenCoverage,
  categoryVariety,
  ironExposuresPerWeek,
  nutrientCoverage,
  persistentRefusals,
  textureTimeline,
} from"@/lib/insights";
import { Alert, AlertDescription, AlertTitle } from"@/components/ui/alert";
import { Badge } from"@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { SparkBars } from"@/components/charts/Spark";
import { cn } from"@/lib/utils";

/** Descriptive gap nudges — suggestions, never judgments. */
const GAP_SUGGESTIONS: Record<FoodCategory, string> = {
  vegetable: "soft-steamed veg sticks are an easy add",
  fruit: "a ripe banana needs no prep",
  protein: "shredded chicken folds into most meals",
  grain: "oatmeal is a five-minute serve",
  dairy: "plain whole-milk yogurt is a one-spoon serve",
  legume: "lentils reheat well",
  "herb-spice": "a pinch of cinnamon on a familiar food counts",
  "fat-other": "a drizzle of olive oil on veg counts",
};

function HistoryLink() {
  return (
    <Link href="/history"className="text-xs text-muted-foreground underline underline-offset-2">
      See the logs behind this →
    </Link>
  );
}

export default function InsightsPage() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const logs = useActiveLogs();
  const overrides = useActiveOverrides();

  const today = useMemo(() => new Date(), []);
  const insights = useMemo(() => {
    if (!baby) return null;
    const states = [...deriveAllergenStates({ baby, logs, overrides, foods: allFoods }).values()];
    return {
      variety: categoryVariety(logs, allFoods, today),
      iron: ironExposuresPerWeek(logs, allFoods, today),
      coverage: allergenCoverage(states),
      texture: textureTimeline(logs, today),
      refusals: persistentRefusals(logs, allFoods),
      nutrients: nutrientCoverage(logs, allFoods, today),
    };
  }, [baby, logs, overrides, today]);

  if (!hydrated) return null;

  if (!baby || !insights) {
    return (
      <div className="mx-auto max-w-md pt-10">
        <Alert>
          <AlertTitle>Set up a profile to see insights</AlertTitle>
          <AlertDescription>
            Insights are built from your own logs.{" "}
            <Link href="/onboarding"className="underline underline-offset-2">
              Start onboarding →
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Insights</h1>
        <Alert>
          <AlertTitle>Nothing to chart yet</AlertTitle>
          <AlertDescription>
            Insights grow out of your logs — variety, iron, allergens, textures. Log a meal or two
            and this page fills in.{" "}
            <Link href="/log"className="underline underline-offset-2">
              Log a food →
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const gaps = insights.variety.filter((v) => v.distinctFoods === 0).slice(0, 3);
  const textureWeeks = insights.texture.filter(
    (w) => w.bands["6-8m"] + w.bands["9-12m"] + w.bands["12-24m"] > 0,
  );
  const coverageStats = [
    { label: "Introduced", value: insights.coverage.introduced },
    { label: "Maintaining", value: insights.coverage.maintaining },
    { label: "Paused", value: insights.coverage.paused },
    { label: "Not started", value: insights.coverage.notStarted },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold">Insights</h1>
        <span className="text-sm text-muted-foreground">
          {baby.nickname} · {logs.length} logs
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Variety, last 14 days</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="text-primary">
              <SparkBars
                values={insights.variety.map((v) => v.distinctFoods)}
                labels={insights.variety.map((v) => v.label)}
                ariaLabel="Distinct foods eaten per category in the last 14 days"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {insights.variety.map((v) => (
                <Badge key={v.category} variant="outline"className={cn(v.distinctFoods === 0 && "opacity-50")}>
                  {v.label} · {v.distinctFoods}
                </Badge>
              ))}
            </div>
            {gaps.map((g) => (
              <p key={g.category} className="text-muted-foreground">
                Nothing from {g.label.toLowerCase()} in 2 weeks — {GAP_SUGGESTIONS[g.category]}.
              </p>
            ))}
            <HistoryLink />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Iron-rich exposures per week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="text-primary">
              <SparkBars
                values={insights.iron.map((w) => w.count)}
                labels={insights.iron.map((w) => `week ending ${w.weekLabel}`)}
                ariaLabel="Iron-rich foods eaten per week over the last 4 weeks"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {insights.iron.map((w) => (
                <Badge key={w.weekLabel} variant="outline"className={cn(w.count === 0 && "opacity-50")}>
                  {w.weekLabel} · {w.count}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground">
              Iron stores dip around 6 months — iron-rich foods are the priority.
            </p>
            <HistoryLink />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Allergen coverage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {coverageStats.map((s) => (
                <div key={s.label} className="rounded-md border p-3 text-center">
                  <div className="text-2xl font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground">
              Of the 9 common allergens.{" "}
              <Link href="/allergens"className="underline underline-offset-2">
                Manage in the tracker →
              </Link>
            </p>
            <HistoryLink />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Texture practice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {textureWeeks.length === 0 ? (
              <p className="text-muted-foreground">No logs in the last 8 weeks yet.</p>
            ) : (
              <ul className="space-y-2">
                {textureWeeks.map((w) => (
                  <li key={w.weekLabel} className="flex flex-wrap items-center gap-2">
                    <span className="w-14 text-xs text-muted-foreground">{w.weekLabel}</span>
                    {(Object.entries(w.bands) as [keyof typeof BAND_LABELS, number][])
                      .filter(([, n]) => n > 0)
                      .map(([band, n]) => (
                        <Badge key={band} variant="outline">
                          {BAND_LABELS[band]} × {n}
                        </Badge>
                      ))}
                  </li>
                ))}
              </ul>
            )}
            <p className="text-muted-foreground">Which prep bands you practiced, week by week.</p>
            <HistoryLink />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Worth another relaxed try</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {insights.refusals.length === 0 ? (
              <p className="text-muted-foreground">
                No stuck refusals right now — everything offered lately landed okay.
              </p>
            ) : (
              <>
                <p className="text-muted-foreground">It can take 8–15 relaxed offers.</p>
                <div className="flex flex-wrap gap-2">
                  {insights.refusals.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/foods/${r.slug}`}
                      className="rounded-full border px-3 py-1.5 hover:border-primary/60"
                    >
                      {r.name} <span className="text-muted-foreground">· {r.attempts} tries</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
            <HistoryLink />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Nutrient variety, last 7 days</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex flex-wrap gap-2">
              {insights.nutrients.map((n) => (
                <Badge key={n.tag} variant="outline"className={cn(n.count === 0 && "opacity-50")}>
                  {n.label} · {n.count}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground">
              How many eaten foods this week carried each nutrient — a rough picture of the mix, not
              a target.
            </p>
            <HistoryLink />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
