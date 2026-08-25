"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useActiveBaby, useActiveLogs, useHydrated } from "@/lib/hooks";
import { fmt, msg } from "@/lib/i18n/config";
import { useL10nFoods } from "@/lib/i18n/content-client";
import { symptomLabel } from "@/lib/i18n/labels";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { AMOUNT_MSGS, BAND_ID_MSGS, historyMsgs } from "@/lib/i18n/messages/history";
import { useGuideStore } from "@/lib/storage/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ENJOYMENT_EMOJI = { loved: "😍", neutral: "😐", disliked: "😖", refused: "🙅" } as const;

export default function HistoryPage() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const logs = useActiveLogs();
  const { deleteLog, exportJson, importJson, reset } = useGuideStore();
  const locale = useLocale();
  const t = useMsgs(historyMsgs);
  const { foodBySlug } = useL10nFoods();
  const fileRef = useRef<HTMLInputElement>(null);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const byDate = useMemo(() => {
    const groups = new Map<string, typeof logs>();
    for (const log of [...logs].sort((a, b) => b.date.localeCompare(a.date))) {
      groups.set(log.date, [...(groups.get(log.date) ?? []), log]);
    }
    return [...groups.entries()];
  }, [logs]);

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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={downloadExport} disabled={!baby && logs.length === 0}>
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

      {importMessage && (
        <Alert>
          <AlertDescription>{importMessage}</AlertDescription>
        </Alert>
      )}

      {baby && (
        <p className="text-sm text-muted-foreground">
          {fmt(t.nameLogs, { name: baby.nickname, n: logs.length })} ·{" "}
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
          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground">{t.mostLogged}</h2>
            <div className="flex flex-wrap gap-2">
              {foodCounts.map(([slug, n]) => (
                <Badge key={slug} variant="outline">
                  {foodBySlug.get(slug)?.name ?? slug} × {n}
                </Badge>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            {byDate.map(([date, dayLogs]) => (
              <div key={date}>
                <h2 className="mb-2 text-sm font-semibold">{date}</h2>
                <ul className="space-y-2">
                  {dayLogs.map((log) => (
                    <li key={log.id} className="flex items-start justify-between gap-3 rounded-lg border p-3">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {ENJOYMENT_EMOJI[log.enjoyment]}{" "}
                          <Link href={`/foods/${log.foodSlug}`} className="underline-offset-2 hover:underline">
                            {foodBySlug.get(log.foodSlug)?.name ?? log.foodSlug}
                          </Link>{" "}
                          <span className="text-muted-foreground">
                            {fmt(t.ateLine, {
                              amount: msg(AMOUNT_MSGS[log.amountEaten], locale),
                              band: msg(BAND_ID_MSGS[log.prepBandUsed], locale),
                            })}
                          </span>
                        </div>
                        {(log.symptoms.length > 0 || log.gagging) && (
                          <div className="flex flex-wrap gap-1">
                            {log.gagging && <Badge variant="outline">{t.gagging}</Badge>}
                            {log.symptoms.map((s) => (
                              <Badge key={s} variant="outline" className="border-red-300 text-red-700 dark:text-red-400">
                                {symptomLabel(s, locale)}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteLog(log.id)}
                        className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                        aria-label={fmt(t.deleteLogAria, { food: log.foodSlug, date: log.date })}
                      >
                        {t.deleteBtn}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
