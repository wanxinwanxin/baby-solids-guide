"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { allFoods } from "../../../../content/foods";
import { ALLERGEN_IDS } from "@/content-schema/food";
import { ALLERGEN_LABELS, CATEGORY_LABELS, todayIso } from "@/lib/food-utils";
import { useHydrated } from "@/lib/hooks";
import { newId, useGuideStore } from "@/lib/storage/store";
import type { AllergenStatus, TextureStage } from "@/lib/storage/types";
import { TEXTURE_STAGES } from "@/lib/storage/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const IMPORT_STATUSES: { id: AllergenStatus | "auto"; label: string }[] = [
  { id: "auto", label: "From the checklist" },
  { id: "introducing", label: "Started (1–2 tries)" },
  { id: "maintaining", label: "Going well (3+ tries)" },
  { id: "reacted-paused", label: "Reacted — paused" },
  { id: "avoid-per-doctor", label: "Avoiding per doctor" },
];

export function ImportFlow() {
  const hydrated = useHydrated();
  const router = useRouter();
  const { baby, addLog, setOverride, importJson } = useGuideStore();
  const [tried, setTried] = useState<Set<string>>(new Set());
  const [allergenStatuses, setAllergenStatuses] = useState<Record<string, AllergenStatus | "auto">>({});
  const [stage, setStage] = useState<TextureStage>(baby?.textureStage ?? "S1");
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!hydrated) return null;

  if (!baby) {
    return (
      <Alert>
        <AlertTitle>First, a 2-minute profile</AlertTitle>
        <AlertDescription>
          The import needs a baby profile to attach to.{" "}
          <Link href="/onboarding" className="underline underline-offset-2">
            Set it up →
          </Link>{" "}
          (the last step brings you right back here).
        </AlertDescription>
      </Alert>
    );
  }

  const byCategory = Object.entries(CATEGORY_LABELS).map(([cat, label]) => ({
    label,
    foods: allFoods.filter((f) => f.category === cat).sort((a, b) => a.name.localeCompare(b.name)),
  }));

  function toggle(slug: string) {
    const next = new Set(tried);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setTried(next);
  }

  function finish() {
    if (!baby) return;
    const date = todayIso();
    // One backfill log per tried food — enough for the engine to know
    // "introduced", without inventing a fake history.
    for (const slug of tried) {
      addLog({
        id: newId(),
        babyId: baby.id,
        foodSlug: slug,
        date,
        prepBandUsed: allFoods.find((f) => f.slug === slug)?.prepSpecs[0].band ?? "6-8m",
        amountEaten: "some",
        enjoyment: "neutral",
        gagging: false,
        symptoms: [],
        notes: "Imported: tried before joining OpenSolids",
      });
    }
    for (const [allergenId, status] of Object.entries(allergenStatuses)) {
      if (status !== "auto") {
        setOverride({
          allergenId: allergenId as (typeof ALLERGEN_IDS)[number],
          status,
          setOn: date,
          note: "Set during import",
        });
      }
    }
    useGuideStore.getState().saveBaby({ ...baby, textureStage: stage, startedSolidsOn: baby.startedSolidsOn ?? date });
    router.push("/today?imported=1");
  }

  async function handleRestore(file: File) {
    const result = importJson(await file.text());
    if (result.ok) {
      router.push("/today?imported=1");
    } else {
      setImportMessage(result.error);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Where are you already?</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Tap everything {baby.nickname} has tried. The plan picks up from exactly here — no
          starting over.
        </p>
      </div>

      <section className="rounded-lg border p-4">
        <h2 className="text-sm font-semibold">Have a backup file?</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Restore a full OpenSolids export instead of ticking boxes.
        </p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => fileRef.current?.click()}>
          Restore from JSON
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          aria-label="Restore backup file"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleRestore(f);
            e.target.value = "";
          }}
        />
        {importMessage && <p className="mt-2 text-xs text-red-700">{importMessage}</p>}
      </section>

      {byCategory.map(({ label, foods }) => (
        <section key={label} className="space-y-2">
          <h2 className="text-sm font-semibold">{label}</h2>
          <div className="flex flex-wrap gap-2">
            {foods.map((f) => (
              <button
                key={f.slug}
                type="button"
                onClick={() => toggle(f.slug)}
                aria-pressed={tried.has(f.slug)}
                className={cn(
                  "min-h-10 rounded-full border px-3 py-1.5 text-sm transition-colors",
                  tried.has(f.slug)
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "hover:border-emerald-400",
                )}
              >
                {f.name}
              </button>
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Allergen status (where the checklist isn&apos;t enough)</h2>
        <p className="text-xs text-muted-foreground">
          One try vs. an established routine matters for allergens. Adjust any that need it.
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ALLERGEN_IDS.map((id) => (
            <label key={id} className="flex items-center justify-between gap-2 rounded-lg border p-2.5 text-sm">
              {ALLERGEN_LABELS[id]}
              <select
                className="rounded-md border bg-background px-2 py-1 text-xs"
                value={allergenStatuses[id] ?? "auto"}
                onChange={(e) =>
                  setAllergenStatuses({ ...allergenStatuses, [id]: e.target.value as AllergenStatus | "auto" })
                }
              >
                {IMPORT_STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Current texture stage</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {TEXTURE_STAGES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStage(s.id)}
              className={cn(
                "rounded-lg border p-3 text-left text-sm transition-colors",
                stage === s.id ? "border-emerald-700 bg-emerald-50 dark:bg-emerald-950" : "hover:border-emerald-400",
              )}
            >
              <span className="font-medium">
                {s.id}: {s.label}
              </span>
              <span className="block text-xs text-muted-foreground">{s.typicalAge}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-4">
        <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800" onClick={finish}>
          Done — build my plan ({tried.size} foods)
        </Button>
        <Link href="/today" className="text-sm text-muted-foreground underline underline-offset-2">
          Skip for now
        </Link>
      </div>
    </div>
  );
}
