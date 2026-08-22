"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { foodBySlug } from "../../../content/foods";
import { useHydrated } from "@/lib/hooks";
import { useGuideStore } from "@/lib/storage/store";
import { SYMPTOM_LABELS } from "@/lib/storage/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ENJOYMENT_EMOJI = { loved: "😍", neutral: "😐", disliked: "😖", refused: "🙅" } as const;

export default function HistoryPage() {
  const hydrated = useHydrated();
  const { baby, logs, deleteLog, exportJson, importJson, reset } = useGuideStore();
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
        ? `Imported ${result.logsImported} log(s)${result.skipped.length ? ` — skipped ${result.skipped.length} invalid row(s)` : ""}.`
        : result.error,
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">History</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={downloadExport} disabled={!baby && logs.length === 0}>
            Export JSON
          </Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            Import JSON
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            aria-label="Import backup file"
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
          {baby.nickname} · {logs.length} logs ·{" "}
          <Link href="/onboarding?edit=1" className="underline underline-offset-2">
            edit profile
          </Link>
        </p>
      )}

      {logs.length === 0 ? (
        <Alert>
          <AlertTitle>No logs yet</AlertTitle>
          <AlertDescription>
            <Link href="/log" className="underline underline-offset-2">
              Log your first food →
            </Link>{" "}
            Or import a backup with the button above.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground">Most-logged foods</h2>
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
                            · ate {log.amountEaten} · {log.prepBandUsed}
                          </span>
                        </div>
                        {(log.symptoms.length > 0 || log.gagging) && (
                          <div className="flex flex-wrap gap-1">
                            {log.gagging && <Badge variant="outline">gagging</Badge>}
                            {log.symptoms.map((s) => (
                              <Badge key={s} variant="outline" className="border-red-300 text-red-700 dark:text-red-400">
                                {SYMPTOM_LABELS[s]}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteLog(log.id)}
                        className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                        aria-label={`Delete log of ${log.foodSlug} on ${log.date}`}
                      >
                        delete
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
            <span>Delete the profile and all logs from this device?</span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                reset();
                setConfirmReset(false);
              }}
            >
              Yes, delete everything
            </Button>
            <Button variant="outline" size="sm" onClick={() => setConfirmReset(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="text-xs text-muted-foreground underline-offset-2 hover:underline"
          >
            Delete all data on this device
          </button>
        )}
      </section>
    </div>
  );
}
