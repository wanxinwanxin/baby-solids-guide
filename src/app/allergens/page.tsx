"use client";

import Link from"next/link";
import { useMemo } from"react";
import { DEFAULT_ALLERGEN_ORDER, deriveAllergenStates, riskTier } from"@/lib/engine";
import { icsForMaintenance } from"@/lib/checkins";
import { useActivePlan } from"@/lib/hooks";
import type { AllergenId } from"@/content-schema/food";
import { todayIso } from"@/lib/food-utils";
import { useActiveBaby, useActiveLogs, useActiveOverrides, useHydrated } from"@/lib/hooks";
import { fmt, msg } from"@/lib/i18n/config";
import { useL10nAllergens, useL10nFoods } from"@/lib/i18n/content-client";
import { allergenLabel } from"@/lib/i18n/labels";
import { useLocale, useMsgs } from"@/lib/i18n/LocaleProvider";
import { ALLERGEN_STATUS_MSGS, allergensMsgs } from"@/lib/i18n/messages/allergens";
import { useGuideStore } from"@/lib/storage/store";
import type { AllergenStatus } from"@/lib/storage/types";
import { Alert, AlertDescription, AlertTitle } from"@/components/ui/alert";
import { Badge } from"@/components/ui/badge";
import { Button } from"@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";

const STATUS_STYLE: Record<AllergenStatus, string> = {
  "not-started": "",
  introducing: "border-primary/60 text-primary",
  maintaining: "border-primary text-primary-deep",
  "reacted-paused": "border-red-400 text-red-700 dark:text-red-400",
  "avoid-per-doctor": "border-red-400 text-red-700 dark:text-red-400",
};

export default function AllergensPage() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const logs = useActiveLogs();
  const overrides = useActiveOverrides();
  const plan = useActivePlan();
  const hasPlan = !!plan && plan.entries.length > 0;
  const { setOverride, clearOverride, saveBaby } = useGuideStore();
  const t = useMsgs(allergensMsgs);
  const locale = useLocale();
  const { foods } = useL10nFoods();
  const programs = useL10nAllergens();

  const states = useMemo(() => {
    if (!baby) return null;
    return deriveAllergenStates({ baby, logs, overrides, foods });
  }, [baby, logs, overrides, foods]);

  if (!hydrated) return null;

  const tier = baby ? riskTier(baby) : null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p className="max-w-2xl text-sm text-muted-foreground">{t.intro}</p>

      {tier === "high" && (
        <Alert className="border-amber-400">
          <AlertTitle>{t.higherRiskTitle}</AlertTitle>
          <AlertDescription>{t.higherRiskBody}</AlertDescription>
        </Alert>
      )}

      {!baby && (
        <Alert>
          <AlertDescription>
            {t.setupBefore}
            <Link href="/onboarding"className="underline underline-offset-2">
              {t.setupLink}
            </Link>
            {t.setupAfter}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => {
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
                    {program.name}
                  </Link>
                  <Badge variant="outline"className={STATUS_STYLE[status]}>
                    {msg(ALLERGEN_STATUS_MSGS[status], locale)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {state && (
                  <p className="text-muted-foreground">
                    {fmt(state.exposureCount === 1 ? t.exposureOne : t.exposureOther, {
                      n: state.exposureCount,
                    })}
                    {state.lastExposureDate
                      ? fmt(t.lastExposure, { date: state.lastExposureDate })
                      : ""}
                  </p>
                )}
                {gatedPeanut && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => saveBaby({ ...baby, doctorClearances: [...baby.doctorClearances, "peanut"] })}
                  >
                    {t.doctorCleared}
                  </Button>
                )}
                {baby && (
                  <div className="flex items-center gap-2">
                    <label htmlFor={`status-${program.id}`} className="text-xs text-muted-foreground">
                      {t.setStatus}
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
                      <option value="">{t.autoFromLogs}</option>
                      {(Object.keys(ALLERGEN_STATUS_MSGS) as AllergenStatus[]).map((s) => (
                        <option key={s} value={s}>
                          {msg(ALLERGEN_STATUS_MSGS[s], locale)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <Link
                  href={`/allergens/${program.id}`}
                  className="inline-block text-primary underline underline-offset-2"
                >
                  {t.programLink}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">{t.overrideHint}</p>

      {baby && states && (
        <OrderAndReminders
          babyOrder={baby.allergenOrder}
          hasPlan={hasPlan}
          onReorder={(order) => saveBaby({ ...baby, allergenOrder: order })}
          states={[...states.values()]}
        />
      )}
    </div>
  );
}

function OrderAndReminders({
  babyOrder,
  hasPlan,
  onReorder,
  states,
}: {
  babyOrder?: AllergenId[];
  hasPlan: boolean;
  onReorder: (order: AllergenId[]) => void;
  states: { allergenId: AllergenId; status: string; exposureCount: number }[];
}) {
  const t = useMsgs(allergensMsgs);
  const locale = useLocale();
  const order = babyOrder ?? DEFAULT_ALLERGEN_ORDER;
  const anyMaintaining = states.some((s) => s.status === "maintaining");

  function move(index: number, delta: -1 | 1) {
    const next = [...order];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onReorder(next);
  }

  function downloadMaintenanceIcs() {
    const ics = icsForMaintenance(
      states.map((s) => ({ ...s, status: s.status as never })),
      new Date(),
      locale,
    );
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "allergen-maintenance-reminders.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{t.orderTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {hasPlan && (
            <p className="rounded-md border border-primary/40 p-2 text-xs text-muted-foreground">
              {t.orderPlanNote}
            </p>
          )}
          <ol className="space-y-1">
            {order.map((id, i) => (
              <li key={id} className="flex items-center gap-2 rounded-md border px-2 py-1.5">
                <span className="w-5 text-xs text-muted-foreground">{i + 1}.</span>
                <span className="flex-1">{allergenLabel(id, locale)}</span>
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label={fmt(t.moveEarlier, { name: allergenLabel(id, locale) })}
                  className="rounded border px-2 py-0.5 text-xs disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === order.length - 1}
                  aria-label={fmt(t.moveLater, { name: allergenLabel(id, locale) })}
                  className="rounded border px-2 py-0.5 text-xs disabled:opacity-30"
                >
                  ▼
                </button>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{t.remindersTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground">{t.remindersBody}</p>
          <Button variant="outline"size="sm"onClick={downloadMaintenanceIcs} disabled={!anyMaintaining}>
            {t.downloadIcs}
          </Button>
          {!anyMaintaining && (
            <p className="text-xs text-muted-foreground">{t.icsUnavailable}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
