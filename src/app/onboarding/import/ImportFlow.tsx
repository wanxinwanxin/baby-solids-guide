"use client";

import Link from"next/link";
import { useRouter } from"next/navigation";
import { useRef, useState } from"react";
import { ALLERGEN_IDS } from"@/content-schema/food";
import type { FoodCategory } from"@/content-schema/food";
import { todayIso } from"@/lib/food-utils";
import { fmt, msg } from"@/lib/i18n/config";
import { useL10nFoods } from"@/lib/i18n/content-client";
import { allergenLabel, CATEGORY_MSGS, categoryLabel, textureStageLabel, textureStageTypicalAge } from"@/lib/i18n/labels";
import { useLocale, useMsgs } from"@/lib/i18n/LocaleProvider";
import { IMPORT_STATUS_MSGS, importFlowMsgs } from"@/lib/i18n/messages/import-flow";
import { useActiveBaby, useHydrated } from"@/lib/hooks";
import { newId, useGuideStore } from"@/lib/storage/store";
import type { AllergenStatus, TextureStage } from"@/lib/storage/types";
import { TEXTURE_STAGES } from"@/lib/storage/types";
import { Alert, AlertDescription, AlertTitle } from"@/components/ui/alert";
import { Button } from"@/components/ui/button";
import { cn } from"@/lib/utils";

export function ImportFlow() {
  const hydrated = useHydrated();
  const locale = useLocale();
  const t = useMsgs(importFlowMsgs);
  const router = useRouter();
  const baby = useActiveBaby();
  const { foods: allFoods, foodBySlug } = useL10nFoods();
  const { addLog, setOverride, importJson } = useGuideStore();
  const [tried, setTried] = useState<Set<string>>(new Set());
  const [allergenStatuses, setAllergenStatuses] = useState<Record<string, AllergenStatus | "auto">>({});
  const [stage, setStage] = useState<TextureStage>(baby?.textureStage ?? "S1");
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!hydrated) return null;

  if (!baby) {
    return (
      <Alert>
        <AlertTitle>{t.noProfileTitle}</AlertTitle>
        <AlertDescription>
          {t.noProfileBefore}{" "}
          <Link href="/onboarding"className="underline underline-offset-2">
            {t.noProfileLink}
          </Link>{" "}
          {t.noProfileAfter}
        </AlertDescription>
      </Alert>
    );
  }

  const byCategory = (Object.keys(CATEGORY_MSGS) as FoodCategory[]).map((cat) => ({
    label: categoryLabel(cat, locale),
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
        prepBandUsed: foodBySlug.get(slug)?.prepSpecs[0].band ?? "6-8m",
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
          babyId: baby.id,
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
        <h1 className="text-2xl font-bold">{t.h1}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          {fmt(t.lede, { name: baby.nickname })}
        </p>
      </div>

      <section className="rounded-lg border p-4">
        <h2 className="text-sm font-semibold">{t.backupTitle}</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {t.backupDesc}
        </p>
        <Button variant="outline"size="sm"className="mt-2"onClick={() => fileRef.current?.click()}>
          {t.restoreBtn}
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          aria-label={t.restoreAria}
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
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:border-primary/60",
                )}
              >
                {f.name}
              </button>
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">{t.allergenTitle}</h2>
        <p className="text-xs text-muted-foreground">
          {t.allergenDesc}
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ALLERGEN_IDS.map((id) => (
            <label key={id} className="flex items-center justify-between gap-2 rounded-lg border p-2.5 text-sm">
              {allergenLabel(id, locale)}
              <select
                className="rounded-md border bg-background px-2 py-1 text-xs"
                value={allergenStatuses[id] ?? "auto"}
                onChange={(e) =>
                  setAllergenStatuses({ ...allergenStatuses, [id]: e.target.value as AllergenStatus | "auto" })
                }
              >
                {IMPORT_STATUS_MSGS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {msg(s.label, locale)}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">{t.textureTitle}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {TEXTURE_STAGES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStage(s.id)}
              className={cn(
                "rounded-lg border p-3 text-left text-sm transition-colors",
                stage === s.id ? "border-primary bg-secondary" : "hover:border-primary/60",
              )}
            >
              <span className="font-medium">
                {s.id}: {textureStageLabel(s.id, locale)}
              </span>
              <span className="block text-xs text-muted-foreground">{textureStageTypicalAge(s.id, locale)}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-4">
        <Button size="lg"className="bg-primary text-primary-foreground hover:bg-primary/85"onClick={finish}>
          {fmt(t.doneBtn, { count: tried.size })}
        </Button>
        <Link href="/today"className="text-sm text-muted-foreground underline underline-offset-2">
          {t.skip}
        </Link>
      </div>
    </div>
  );
}
