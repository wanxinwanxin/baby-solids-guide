"use client";

import { useMemo } from "react";
import { useActiveSleepSessions } from "@/lib/hooks";
import { fmt, type Locale } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { sleepMsgs } from "@/lib/i18n/messages/sleep";
import { dailySleep, DAY_MINUTES, summarizeHistory, type DaySleep } from "@/lib/sleep/history";
import { formatDuration } from "@/lib/sleep/model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparkBars } from "@/components/charts/Spark";

const DAYS = 14;

/** Compact 24-hour tick label: "12a / 6a / 12p / 6p" in en, "0 / 6 / 12 / 18" in zh. */
function hourTick(h: number, locale: string): string {
  if (locale === "zh") return `${h}`;
  if (h === 0) return "12a";
  if (h < 12) return `${h}a`;
  if (h === 12) return "12p";
  return `${h - 12}p`;
}

/** Short weekday + day-of-month for a row label. */
function rowLabel(dateIso: string, locale: string): string {
  const [y, m, d] = dateIso.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    weekday: "short",
    day: "numeric",
  }).format(new Date(y, m - 1, d));
}

function DayRow({ day, locale }: { day: DaySleep; locale: Locale }) {
  const t = useMsgs(sleepMsgs);
  return (
    <div className="flex items-center gap-3">
      <div className="w-20 shrink-0">
        <span className="block text-xs font-semibold">{rowLabel(day.dateIso, locale)}</span>
        <span className="font-data block text-[11px] text-muted-foreground">
          {formatDuration(day.totalMinutes, locale)}
        </span>
      </div>
      <div
        className="relative h-6 flex-1 overflow-hidden rounded-md bg-muted"
        role="img"
        aria-label={fmt(t.historyRowAria, {
          date: rowLabel(day.dateIso, locale),
          dur: formatDuration(day.totalMinutes, locale),
          n: day.count,
        })}
      >
        {/* Faint gridlines at 6h / 12h / 18h anchor the eye to times of day. */}
        {[6, 12, 18].map((h) => (
          <span
            key={h}
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-px bg-border"
            style={{ left: `${((h * 60) / DAY_MINUTES) * 100}%` }}
          />
        ))}
        {day.blocks.map((b, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`absolute top-0.5 bottom-0.5 rounded-sm ${b.night ? "bg-primary/85" : "bg-primary/45"}`}
            style={{
              left: `${(b.startMin / DAY_MINUTES) * 100}%`,
              width: `${Math.max(0.8, ((b.endMin - b.startMin) / DAY_MINUTES) * 100)}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function SleepHistory() {
  const sessions = useActiveSleepSessions();
  const locale = useLocale();
  const t = useMsgs(sleepMsgs);

  const days = useMemo(() => dailySleep(sessions, new Date(), DAYS), [sessions]);
  const summary = useMemo(() => summarizeHistory(days), [days]);

  if (days.length === 0) return null;

  // The literal bar plot: hours of sleep per day, oldest → newest left to right.
  const chrono = [...days].reverse();
  const totals = chrono.map((d) => Math.round((d.totalMinutes / 60) * 10) / 10);
  const totalLabels = chrono.map((d) => rowLabel(d.dateIso, locale));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.historyTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {summary && (
          <p className="text-sm text-muted-foreground">
            {fmt(t.historySummary, {
              n: summary.dayCount,
              dur: formatDuration(summary.avgTotalMinutes, locale),
              naps: Math.round(summary.avgSleeps * 10) / 10,
            })}
          </p>
        )}

        <div className="space-y-1.5">
          <p className="font-data text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            {t.historyPerDayTotals}
          </p>
          <div className="text-primary">
            <SparkBars values={totals} labels={totalLabels} ariaLabel={t.historyChartAria} />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="font-data text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              {t.historyTimeline}
            </p>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="inline-block size-2.5 rounded-sm bg-primary/45" aria-hidden="true" />
                {t.legendNap}
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block size-2.5 rounded-sm bg-primary/85" aria-hidden="true" />
                {t.legendNight}
              </span>
            </div>
          </div>
          {/* Hour axis, aligned with the tracks below (matches the w-20 label gutter). */}
          <div className="flex items-center gap-3">
            <div className="w-20 shrink-0" aria-hidden="true" />
            <div className="relative h-3 flex-1">
              {[0, 6, 12, 18, 24].map((h) => (
                <span
                  key={h}
                  aria-hidden="true"
                  className="font-data absolute top-0 -translate-x-1/2 text-[10px] text-muted-foreground"
                  style={{ left: `${((h * 60) / DAY_MINUTES) * 100}%` }}
                >
                  {hourTick(h === 24 ? 0 : h, locale)}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            {days.map((d) => (
              <DayRow key={d.dateIso} day={d} locale={locale} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
