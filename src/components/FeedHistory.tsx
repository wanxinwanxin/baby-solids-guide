"use client";

import { useMemo } from "react";
import { useActiveCareLogs, useActiveSleepSessions, useIntervention } from "@/lib/hooks";
import { fmt, type Locale } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { careMsgs } from "@/lib/i18n/messages/care";
import { todayIso } from "@/lib/food-utils";
import {
  dailyBottles,
  DAY_MINUTES,
  FULL_ML,
  SIP_ML,
  summarizeBottles,
  type DayBottles,
} from "@/lib/care/history";
import { planClockMin } from "@/lib/plan/derive";
import { dailySleep, type SleepBlock } from "@/lib/sleep/history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparkBars } from "@/components/charts/Spark";
import { cn } from "@/lib/utils";

/**
 * Bottle history, drawn like sleep history: one 24-hour track per day. Each
 * bottle is a dot at the minute it was fed, sized by volume, so a day of
 * sips reads as a scatter of small dots and a day of real meals reads as a
 * few large dots in columns. Night sleep sits behind the dots as a faint
 * band, so a bottle during the night is visibly a night bottle. When
 * intervention mode is on, the plan's feed windows show as shaded bands:
 * the picture the family is steering toward.
 */

const DAYS = 14;
const DOT_MIN_PX = 6;
const DOT_MAX_PX = 20;
const DOT_FULL_SCALE_ML = 220;

function hourTick(h: number, locale: string): string {
  if (locale === "zh") return `${h}`;
  if (h === 0) return "12a";
  if (h < 12) return `${h}a`;
  if (h === 12) return "12p";
  return `${h - 12}p`;
}

function rowLabel(dateIso: string, locale: string): string {
  const [y, m, d] = dateIso.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    weekday: "short",
    day: "numeric",
  }).format(new Date(y, m - 1, d));
}

function dotPx(ml: number): number {
  const t = Math.min(1, ml / DOT_FULL_SCALE_ML);
  return Math.round(DOT_MIN_PX + t * (DOT_MAX_PX - DOT_MIN_PX));
}

function dotClass(ml: number): string {
  if (ml >= FULL_ML) return "bg-primary";
  if (ml >= SIP_ML) return "bg-primary/65";
  return "bg-primary/35 ring-1 ring-primary/50";
}

function pct(min: number): string {
  return `${(min / DAY_MINUTES) * 100}%`;
}

function DayRow({
  day,
  nights,
  windows,
  locale,
}: {
  day: DayBottles;
  nights: SleepBlock[];
  windows: { startMin: number; endMin: number }[];
  locale: Locale;
}) {
  const t = useMsgs(careMsgs);
  return (
    <div className="flex items-center gap-3">
      <div className="w-20 shrink-0">
        <span className="block text-xs font-semibold">{rowLabel(day.dateIso, locale)}</span>
        <span className="font-data block text-[11px] text-muted-foreground">
          {fmt(t.feedHistoryRowStat, { ml: day.totalMl, n: day.count })}
        </span>
      </div>
      <div
        className="relative h-6 flex-1 overflow-hidden rounded-md bg-muted"
        role="img"
        aria-label={fmt(t.feedHistoryRowAria, {
          date: rowLabel(day.dateIso, locale),
          ml: day.totalMl,
          n: day.count,
          sips: day.sips,
        })}
      >
        {nights.map((b, i) => (
          <span
            key={`n${i}`}
            aria-hidden="true"
            className="absolute top-0 bottom-0 bg-foreground/10"
            style={{ left: pct(b.startMin), width: pct(Math.max(1, b.endMin - b.startMin)) }}
          />
        ))}
        {windows.map((w, i) => (
          <span
            key={`w${i}`}
            aria-hidden="true"
            className="absolute top-0 bottom-0 bg-primary/15"
            style={{ left: pct(w.startMin), width: pct(w.endMin - w.startMin) }}
          />
        ))}
        {[6, 12, 18].map((h) => (
          <span
            key={h}
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-px bg-border"
            style={{ left: pct(h * 60) }}
          />
        ))}
        {day.marks.map((m, i) => {
          const size = dotPx(m.ml);
          return (
            <span
              key={i}
              aria-hidden="true"
              title={`${Math.round(m.ml)} ml${m.notes ? ` · ${m.notes}` : ""}`}
              className={cn("absolute top-1/2 rounded-full", dotClass(m.ml))}
              style={{
                left: pct(m.min),
                width: size,
                height: size,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function FeedHistory() {
  const careLogs = useActiveCareLogs();
  const sessions = useActiveSleepSessions();
  const plan = useIntervention();
  const locale = useLocale();
  const t = useMsgs(careMsgs);
  const today = todayIso();

  const days = useMemo(() => dailyBottles(careLogs, new Date(), DAYS), [careLogs]);
  const nightsByDay = useMemo(() => {
    const m = new Map<string, SleepBlock[]>();
    for (const d of dailySleep(sessions, new Date(), DAYS + 1)) {
      m.set(
        d.dateIso,
        d.blocks.filter((b) => b.night),
      );
    }
    return m;
  }, [sessions]);
  const windows = useMemo(() => {
    if (!plan) return [];
    const flex = plan.flexMin ?? 30;
    return plan.feedWindows
      .map((w) => planClockMin(w.at))
      .filter((min): min is number => min !== null)
      .map((min) => ({ startMin: Math.max(0, min - flex), endMin: Math.min(DAY_MINUTES, min + flex) }));
  }, [plan]);
  const summary = useMemo(() => summarizeBottles(days, today), [days, today]);

  if (days.length === 0) return null;

  const chrono = [...days].reverse();
  const totals = chrono.map((d) => d.totalMl);
  const totalLabels = chrono.map((d) => rowLabel(d.dateIso, locale));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.feedHistoryTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {summary && (
          <p className="text-sm text-muted-foreground">
            {fmt(t.feedHistorySummary, {
              n: summary.dayCount,
              ml: summary.avgMl,
              count: summary.avgCount,
              sips: Math.round(summary.sipShare * 100),
            })}
          </p>
        )}

        <div className="space-y-1.5">
          <p className="font-data text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            {t.feedHistoryPerDay}
          </p>
          <div className="text-primary">
            <SparkBars values={totals} labels={totalLabels} ariaLabel={t.feedHistoryChartAria} />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-data text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              {t.feedHistoryTimeline}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="inline-block size-3 rounded-full bg-primary" aria-hidden="true" />
                {fmt(t.feedLegendFull, { ml: FULL_ML })}
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="inline-block size-2 rounded-full bg-primary/35 ring-1 ring-primary/50"
                  aria-hidden="true"
                />
                {fmt(t.feedLegendSip, { ml: SIP_ML })}
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-3 w-4 rounded-sm bg-foreground/10" aria-hidden="true" />
                {t.feedLegendNight}
              </span>
              {windows.length > 0 && (
                <span className="flex items-center gap-1">
                  <span className="inline-block h-3 w-4 rounded-sm bg-primary/15" aria-hidden="true" />
                  {t.feedLegendWindow}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-20 shrink-0" aria-hidden="true" />
            <div className="relative h-3 flex-1">
              {[0, 6, 12, 18, 24].map((h) => (
                <span
                  key={h}
                  aria-hidden="true"
                  className="font-data absolute top-0 -translate-x-1/2 text-[10px] text-muted-foreground"
                  style={{ left: pct(h * 60) }}
                >
                  {hourTick(h === 24 ? 0 : h, locale)}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            {days.map((d) => (
              <DayRow
                key={d.dateIso}
                day={d}
                nights={nightsByDay.get(d.dateIso) ?? []}
                windows={windows}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
