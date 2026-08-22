"use client";

import Link from "next/link";
import { useMemo } from "react";
import { allFoods } from "../../../content/foods";
import { allergenPrograms } from "../../../content/allergens";
import { deriveAllergenStates, riskTier } from "@/lib/engine";
import { ALLERGEN_LABELS, todayIso } from "@/lib/food-utils";
import { useActiveBaby, useActiveLogs, useActiveOverrides, useHydrated } from "@/lib/hooks";
import { useGuideStore } from "@/lib/storage/store";
import type { AllergenStatus } from "@/lib/storage/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATUS_LABELS: Record<AllergenStatus, string> = {
  "not-started": "Not started",
  introducing: "Introducing",
  maintaining: "Maintaining",
  "reacted-paused": "Paused after a reaction",
  "avoid-per-doctor": "Avoiding per doctor",
};

const STATUS_STYLE: Record<AllergenStatus, string> = {
  "not-started": "",
  introducing: "border-emerald-400 text-emerald-700 dark:text-emerald-400",
  maintaining: "border-emerald-600 text-emerald-800 dark:text-emerald-300",
  "reacted-paused": "border-red-400 text-red-700 dark:text-red-400",
  "avoid-per-doctor": "border-red-400 text-red-700 dark:text-red-400",
};

export default function AllergensPage() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const logs = useActiveLogs();
  const overrides = useActiveOverrides();
  const { setOverride, clearOverride, saveBaby } = useGuideStore();

  const states = useMemo(() => {
    if (!baby) return null;
    return deriveAllergenStates({ baby, logs, overrides, foods: allFoods });
  }, [baby, logs, overrides]);

  if (!hydrated) return null;

  const tier = baby ? riskTier(baby) : null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Allergen tracker</h1>
      <p className="max-w-2xl text-sm text-muted-foreground">
        The nine common allergens, one at a time, early in the day, with ~3 days between new ones.
        Once a food is tolerated, keeping it in the diet (about twice a week) is what maintains
        tolerance.
      </p>

      {tier === "high" && (
        <Alert className="border-amber-400">
          <AlertTitle>Higher-risk profile</AlertTitle>
          <AlertDescription>
            Severe eczema or an existing food allergy means peanut should wait for your
            pediatrician or allergist&apos;s go-ahead (ideally discussed around 4–6 months). When
            they clear you, record it below.
          </AlertDescription>
        </Alert>
      )}

      {!baby && (
        <Alert>
          <AlertDescription>
            <Link href="/onboarding" className="underline underline-offset-2">
              Set up a profile
            </Link>{" "}
            to track allergen progress. You can still read each program below.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allergenPrograms.map((program) => {
          const state = states?.get(program.id);
          const status = state?.status ?? "not-started";
          const gatedPeanut =
            program.id === "peanut" &&
            tier === "high" &&
            baby &&
            !baby.doctorClearances.includes("peanut");
          return (
            <Card key={program.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                  <Link href={`/allergens/${program.id}`} className="underline-offset-2 hover:underline">
                    {ALLERGEN_LABELS[program.id]}
                  </Link>
                  <Badge variant="outline" className={STATUS_STYLE[status]}>
                    {STATUS_LABELS[status]}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {state && (
                  <p className="text-muted-foreground">
                    {state.exposureCount} exposure{state.exposureCount === 1 ? "" : "s"}
                    {state.lastExposureDate ? ` · last ${state.lastExposureDate}` : ""}
                  </p>
                )}
                {gatedPeanut && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => saveBaby({ ...baby, doctorClearances: [...baby.doctorClearances, "peanut"] })}
                  >
                    My doctor cleared us ✓
                  </Button>
                )}
                {baby && (
                  <div className="flex items-center gap-2">
                    <label htmlFor={`status-${program.id}`} className="text-xs text-muted-foreground">
                      Set status
                    </label>
                    <select
                      id={`status-${program.id}`}
                      className="rounded-md border bg-background px-2 py-1 text-xs"
                      value={overrides.find((o) => o.allergenId === program.id)?.status ?? ""}
                      onChange={(e) => {
                        const v = e.target.value as AllergenStatus | "";
                        if (v === "") clearOverride(baby.id, program.id);
                        else setOverride({ babyId: baby.id, allergenId: program.id, status: v, setOn: todayIso() });
                      }}
                    >
                      <option value="">auto (from logs)</option>
                      {(Object.keys(STATUS_LABELS) as AllergenStatus[]).map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <Link
                  href={`/allergens/${program.id}`}
                  className="inline-block text-emerald-700 underline underline-offset-2 dark:text-emerald-400"
                >
                  Introduction program →
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Use &quot;set status&quot; when your reality differs from the logs — e.g. your allergist
        said to avoid a food, or a reaction was later ruled out. Overrides always win.
      </p>
    </div>
  );
}
