"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useActiveBaby, useActiveLogs, useHydrated } from "@/lib/hooks";
import { todayIso } from "@/lib/food-utils";
import { dayLabel, firstTryLogIds, groupByDay } from "@/lib/journal";
import { fmt } from "@/lib/i18n/config";
import { useL10nFoods } from "@/lib/i18n/content-client";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { historyMsgs } from "@/lib/i18n/messages/history";
import { journalMsgs } from "@/lib/i18n/messages/journal";
import { useGuideStore } from "@/lib/storage/store";
import { JournalEntry } from "@/components/journal/JournalEntry";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Filter = "all" | "firsts" | "reactions";

export default function HistoryPage() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const logs = useActiveLogs();
  const { exportJson, importJson, reset } = useGuideStore();
  const locale = useLocale();
  const t = useMsgs(historyMsgs);
  const j = useMsgs(journalMsgs);
  const { foodBySlug } = useL10nFoods();
  const fileRef = useRef<HTMLInputElement>(null);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  // Computed over every log, never the filtered view, so narrowing the list
  // can't promote a later entry into looking like a first try.
  const firstTryIds = useMemo(() => firstTryLogIds(logs), [logs]);

  const visible = useMemo(() => {
    if (filter === "firsts") return logs.filter((l) => firstTryIds.has(l.id));
    if (filter === "reactions") return logs.filter((l) => l.symptoms.length > 0 || l.gagging);
    return logs;
  }, [logs, filter, firstTryIds]);

  const days = useMemo(() => groupByDay(visible, firstTryIds), [visible, firstTryIds]);
  const today = todayIso();

  const foodCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const l of logs) counts.set(l.foodSlug, (counts.get(l.foodSlug) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
  }, [logs]);

  if (!hydrated) return null;

  function downloadExport() {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `opensolids-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImportFile(file: File) {
    const text = await file.text();
    const result = importJson(text);
    setImportMessage(
      result.ok
        ? result.skipped.length
          ? fmt(t.importedSkipped, { n: result.logsImported, m: result.skipped.length })
          : fmt(t.imported, { n: result.logsImported })
        : result.error,
    );
  }

  const nothingToExport = !baby && logs.length === 0;

  const FILTERS: { id: Filter; label: string }[] = [
    { id: "all", label: j.filterAll },
    { id: "firsts", label: j.filterFirsts },
    { id: "reactions", label: j.filterReactions },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{t.title}</h1>
          {baby && logs.length > 0 && (
            <p className="mt-0.5 text-sm text-muted-foreground">
              {fmt(logs.length === 1 ? j.oneEntryFor : j.entriesFor, {
                n: logs.length,
                name: baby.nickname,
              })}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={downloadExport}
            disabled={nothingToExport}
            title={nothingToExport ? t.exportEmpty : undefined}
          >
            {t.exportJson}
          </Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            {t.importJson}
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            aria-label={t.importFileAria}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleImportFile(f);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {nothingToExport && <p className="text-xs text-muted-foreground">{t.exportEmpty}</p>}

      {importMessage && (
        <Alert>
          <AlertDescription>{importMessage}</AlertDescription>
        </Alert>
      )}

      {baby && (
        <p className="text-sm text-muted-foreground">
          <Link href="/onboarding?edit=1" className="underline underline-offset-2">
            {t.editProfile}
          </Link>{" "}
          ·{" "}
          <Link href="/onboarding?add=1" className="underline underline-offset-2">
            {t.addAnotherBaby}
          </Link>
        </p>
      )}

      {logs.length === 0 ? (
        <Alert>
          <AlertTitle>{t.noLogsTitle}</AlertTitle>
          <AlertDescription>
            <Link href="/log" className="underline underline-offset-2">
              {t.logFirstFood}
            </Link>{" "}
            {t.orImport}
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label={j.filterLabel}>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cn(
                  "min-h-9 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  filter === f.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:border-primary/60 hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {days.length === 0 ? (
            <p className="text-sm text-muted-foreground">{j.filterEmpty}</p>
          ) : (
            <section className="space-y-5">
              {days.map((day) => (
                <div key={day.date} className="space-y-2">
                  <div className="flex items-baseline gap-2 border-b pb-1">
                    <h2 className="font-heading text-base font-bold">
                      {dayLabel(day.date, today, locale)}
                    </h2>
                    <span className="font-data text-xs text-muted-foreground">{day.date}</span>
                    {day.firstTries.length > 0 && (
                      <span className="ml-auto text-xs font-semibold text-primary">
                        {fmt(j.dayFirstTries, { n: day.firstTries.length })}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {day.logs.map((log) => (
                      <JournalEntry
                        key={log.id}
                        log={log}
                        foodName={foodBySlug.get(log.foodSlug)?.name ?? log.foodSlug}
                        isFirstTry={firstTryIds.has(log.id)}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          <section className="space-y-2 border-t pt-4">
            <h2 className="text-sm font-semibold text-muted-foreground">{t.mostLogged}</h2>
            <div className="flex flex-wrap gap-2">
              {foodCounts.map(([slug, n]) => (
                <Badge key={slug} variant="outline">
                  {foodBySlug.get(slug)?.name ?? slug} × {n}
                </Badge>
              ))}
            </div>
          </section>
        </>
      )}

      <section className="border-t pt-4">
        {confirmReset ? (
          <div className="flex items-center gap-3 text-sm">
            <span>{t.confirmDelete}</span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                reset();
                setConfirmReset(false);
              }}
            >
              {t.yesDeleteEverything}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setConfirmReset(false)}>
              {t.cancel}
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="text-xs text-muted-foreground underline-offset-2 hover:underline"
          >
            {t.deleteAllData}
          </button>
        )}
      </section>
    </div>
  );
}
