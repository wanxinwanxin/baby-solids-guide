"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { AgeBand } from "@/content-schema/food";
import { deriveAllergenStates } from "@/lib/engine";
import { useActiveBaby, useActiveLogs, useActiveOverrides, useHydrated } from "@/lib/hooks";
import { fmt, msg } from "@/lib/i18n/config";
import { useL10nFoods } from "@/lib/i18n/content-client";
import { bandLabel } from "@/lib/i18n/labels";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { GAP_SUGGESTION_MSGS, insightsMsgs } from "@/lib/i18n/messages/insights";
import {
  allergenCoverage,
  categoryVariety,
  ironExposuresPerWeek,
  nutrientCoverage,
  persistentRefusals,
  textureTimeline,
} from "@/lib/insights";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparkBars } from "@/components/charts/Spark";
import { cn } from "@/lib/utils";

function HistoryLink() {
  const t = useMsgs(insightsMsgs);
  return (
    <Link href="/history" className="text-xs text-muted-foreground underline underline-offset-2">
      {t.historyLink}
    </Link>
  );
}

export default function InsightsPage() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const logs = useActiveLogs();
  const overrides = useActiveOverrides();
  const locale = useLocale();
  const t = useMsgs(insightsMsgs);
  const { foods } = useL10nFoods();

  const today = useMemo(() => new Date(), []);
  const insights = useMemo(() => {
    if (!baby) return null;
    const states = [...deriveAllergenStates({ baby, logs, overrides, foods }).values()];
    return {
      variety: categoryVariety(logs, foods, today, undefined, locale),
      iron: ironExposuresPerWeek(logs, foods, today),
      coverage: allergenCoverage(states),
      texture: textureTimeline(logs, today),
      refusals: persistentRefusals(logs, foods),
      nutrients: nutrientCoverage(logs, foods, today, undefined, locale),
    };
  }, [baby, logs, overrides, foods, today, locale]);

  if (!hydrated) return null;

  if (!baby || !insights) {
    return (
      <div className="mx-auto max-w-md pt-10">
        <Alert>
          <AlertTitle>{t.setupTitle}</AlertTitle>
          <AlertDescription>
            {t.setupBody}{" "}
            <Link href="/onboarding" className="underline underline-offset-2">
              {t.startOnboarding}
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <Alert>
          <AlertTitle>{t.nothingTitle}</AlertTitle>
          <AlertDescription>
            {t.nothingBody}{" "}
            <Link href="/log" className="underline underline-offset-2">
              {t.logAFood}
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
    { label: t.statIntroduced, value: insights.coverage.introduced },
    { label: t.statMaintaining, value: insights.coverage.maintaining },
    { label: t.statPaused, value: insights.coverage.paused },
    { label: t.statNotStarted, value: insights.coverage.notStarted },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <span className="text-sm text-muted-foreground">
          {fmt(t.nameLogs, { name: baby.nickname, n: logs.length })}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t.varietyTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="text-primary">
              <SparkBars
                values={insights.variety.map((v) => v.distinctFoods)}
                labels={insights.variety.map((v) => v.label)}
                ariaLabel={t.varietyAria}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {insights.variety.map((v) => (
                <Badge key={v.category} variant="outline" className={cn(v.distinctFoods === 0 && "opacity-50")}>
                  {v.label} · {v.distinctFoods}
                </Badge>
              ))}
            </div>
            {gaps.map((g) => (
              <p key={g.category} className="text-muted-foreground">
                {fmt(t.gapSentence, {
                  label: g.label.toLowerCase(),
                  suggestion: msg(GAP_SUGGESTION_MSGS[g.category], locale),
                })}
              </p>
            ))}
            <HistoryLink />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t.ironTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="text-primary">
              <SparkBars
                values={insights.iron.map((w) => w.count)}
                labels={insights.iron.map((w) => fmt(t.weekEnding, { date: w.weekLabel }))}
                ariaLabel={t.ironAria}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {insights.iron.map((w) => (
                <Badge key={w.weekLabel} variant="outline" className={cn(w.count === 0 && "opacity-50")}>
                  {w.weekLabel} · {w.count}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground">{t.ironNote}</p>
            <HistoryLink />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t.allergenTitle}</CardTitle>
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
              {t.ofNine}{" "}
              <Link href="/allergens" className="underline underline-offset-2">
                {t.manageTracker}
              </Link>
            </p>
            <HistoryLink />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t.textureTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {textureWeeks.length === 0 ? (
              <p className="text-muted-foreground">{t.noRecentLogs}</p>
            ) : (
              <ul className="space-y-2">
                {textureWeeks.map((w) => (
                  <li key={w.weekLabel} className="flex flex-wrap items-center gap-2">
                    <span className="w-14 text-xs text-muted-foreground">{w.weekLabel}</span>
                    {(Object.entries(w.bands) as [AgeBand, number][])
                      .filter(([, n]) => n > 0)
                      .map(([band, n]) => (
                        <Badge key={band} variant="outline">
                          {bandLabel(band, locale)} × {n}
                        </Badge>
                      ))}
                  </li>
                ))}
              </ul>
            )}
            <p className="text-muted-foreground">{t.textureNote}</p>
            <HistoryLink />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t.refusalsTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {insights.refusals.length === 0 ? (
              <p className="text-muted-foreground">{t.noRefusals}</p>
            ) : (
              <>
                <p className="text-muted-foreground">{t.offersNote}</p>
                <div className="flex flex-wrap gap-2">
                  {insights.refusals.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/foods/${r.slug}`}
                      className="rounded-full border px-3 py-1.5 hover:border-primary/60"
                    >
                      {r.name}{" "}
                      <span className="text-muted-foreground">{fmt(t.tries, { n: r.attempts })}</span>
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
            <CardTitle className="text-base">{t.nutrientTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex flex-wrap gap-2">
              {insights.nutrients.map((n) => (
                <Badge key={n.tag} variant="outline" className={cn(n.count === 0 && "opacity-50")}>
                  {n.label} · {n.count}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground">{t.nutrientNote}</p>
            <HistoryLink />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
