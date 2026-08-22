"use client";

import Link from "next/link";
import { useMemo } from "react";
import { allFoods } from "../../../content/foods";
import { correctedAgeMonths } from "@/lib/age";
import { ALLERGEN_LABELS, BAND_LABELS } from "@/lib/food-utils";
import {
  useActiveBaby,
  useActiveCheckIns,
  useActiveLogs,
  useActiveOverrides,
  useActivePlan,
  useHydrated,
} from "@/lib/hooks";
import { recommend } from "@/lib/engine";
import { shouldNudgeBackup, snoozeUntil } from "@/lib/backup-nudge";
import { pendingCheckIns } from "@/lib/checkins";
import { foodBySlug } from "../../../content/foods";
import { PushOptIn } from "@/components/PushOptIn";
import { useAuthEnabled, useSyncStatus } from "@/components/SyncProvider";
import { useSession } from "@/lib/auth-client";
import { useGuideStore } from "@/lib/storage/store";
import { TEXTURE_STAGES } from "@/lib/storage/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function TodayPage() {
  const hydrated = useHydrated();
  const baby = useActiveBaby();
  const logs = useActiveLogs();
  const overrides = useActiveOverrides();
  const plan = useActivePlan();
  const checkIns = useActiveCheckIns();
  const setTextureStage = useGuideStore((s) => s.setTextureStage);
  const resolveCheckIn = useGuideStore((s) => s.resolveCheckIn);
  const snoozeBackupNudge = useGuideStore((s) => s.snoozeBackupNudge);
  const lastExportAt = useGuideStore((s) => s.lastExportAt);
  const backupNudgeSnoozedUntil = useGuideStore((s) => s.backupNudgeSnoozedUntil);

  const authEnabled = useAuthEnabled();
  const { data: session } = useSession();
  const syncState = useSyncStatus((s) => s.state);
  const now = useMemo(() => new Date(), []);
  const rec = useMemo(() => {
    if (!baby) return null;
    return recommend({ baby, logs, overrides, foods: allFoods, today: now, plan });
  }, [baby, logs, overrides, plan, now]);
  const { due: dueCheckIns, upcoming: upcomingCheckIns } = useMemo(
    () => pendingCheckIns(checkIns, now),
    [checkIns, now],
  );
  const showAccountCard = authEnabled && !session && logs.length >= 5;
  const showBackupNudge =
    !showAccountCard &&
    !session &&
    shouldNudgeBackup({
      logCount: logs.length,
      lastExportAt,
      snoozedUntil: backupNudgeSnoozedUntil,
      today: now,
    });

  if (!hydrated) return null;

  if (!baby || !rec) {
    return (
      <div className="mx-auto max-w-md space-y-4 pt-10 text-center">
        <h1 className="text-2xl font-bold">Welcome!</h1>
        <p className="text-muted-foreground">
          Tell us about your baby and we&apos;ll build a day-by-day plan — whether you&apos;re
          starting from scratch or already mid-journey.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/onboarding" className={cn(buttonVariants(), "bg-emerald-700 text-white hover:bg-emerald-800")}>
            Start fresh
          </Link>
          <Link href="/onboarding/import" className={buttonVariants({ variant: "outline" })}>
            We&apos;ve already started
          </Link>
        </div>
      </div>
    );
  }

  const age = correctedAgeMonths(baby, new Date());

  if (rec.gate === "not-ready") {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <h1 className="text-2xl font-bold">Almost there</h1>
        <Alert>
          <AlertTitle>
            {baby.nickname} is {age.toFixed(1)} months (corrected) — not quite solids time yet.
          </AlertTitle>
          <AlertDescription>
            <ul className="mt-2 space-y-2">
              {rec.gateReasons.map((r) => (
                <li key={r}>• {r}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
        <p className="text-sm text-muted-foreground">
          Meanwhile, browse the{" "}
          <Link href="/foods" className="underline underline-offset-2">
            food library
          </Link>{" "}
          or update the{" "}
          <Link href="/onboarding?edit=1" className="underline underline-offset-2">
            readiness checklist
          </Link>
          .
        </p>
      </div>
    );
  }

  const currentStage = TEXTURE_STAGES.find((s) => s.id === rec.textureStage.current);
  const nextStage = TEXTURE_STAGES[TEXTURE_STAGES.findIndex((s) => s.id === rec.textureStage.current) + 1];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold">Today for {baby.nickname}</h1>
        <span className="text-sm text-muted-foreground">
          {age.toFixed(1)} months{baby.dueDate ? " (corrected)" : ""} · stage {rec.textureStage.current}
          {session && (
            <span className="ml-2 text-xs text-emerald-700 dark:text-emerald-400">
              {syncState === "syncing" ? "syncing…" : syncState === "error" ? "sync retrying" : "synced ✓"}
            </span>
          )}
        </span>
      </div>

      {showAccountCard && (
        <Alert className="border-emerald-300">
          <AlertTitle>Save {baby.nickname}&apos;s data</AlertTitle>
          <AlertDescription>
            {logs.length} logs live only on this device. Sign in once and everything follows you
            to any phone or laptop — free, no tracking.{" "}
            <Link href="/account" className="font-medium underline underline-offset-2">
              Sign in with Google or email →
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {showBackupNudge && (
        <Alert className="border-amber-400">
          <AlertTitle>Back up {baby.nickname}&apos;s history</AlertTitle>
          <AlertDescription className="flex flex-wrap items-center gap-3">
            <span>
              {logs.length} logs live only on this device. A one-tap export keeps them safe if the
              browser clears its storage.
            </span>
            <Link href="/history" className="font-medium underline underline-offset-2">
              Export now →
            </Link>
            <button
              type="button"
              className="text-xs text-muted-foreground underline underline-offset-2"
              onClick={() => snoozeBackupNudge(snoozeUntil(new Date()))}
            >
              remind me next week
            </button>
          </AlertDescription>
        </Alert>
      )}

      {(dueCheckIns.length > 0 || upcomingCheckIns.length > 0) && (
        <Card className={dueCheckIns.length > 0 ? "border-amber-400" : undefined}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Check-ins</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {dueCheckIns.map((c) => (
              <div key={c.id} className="flex flex-wrap items-center gap-2 rounded-md border border-amber-300 p-2">
                <span className="font-medium">
                  Check for a reaction to {foodBySlug.get(c.foodSlug)?.name ?? c.foodSlug}
                </span>
                <span className="text-xs text-muted-foreground">
                  due {new Date(c.dueAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                </span>
                <span className="ml-auto flex gap-2">
                  <Link
                    href={`/log?checkin=${c.id}`}
                    className="rounded-md bg-emerald-700 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-800"
                  >
                    Log what you see
                  </Link>
                  <button
                    type="button"
                    onClick={() => resolveCheckIn(c.id, "done")}
                    className="rounded-md border px-2.5 py-1 text-xs hover:border-emerald-400"
                  >
                    All clear ✓
                  </button>
                </span>
              </div>
            ))}
            <PushOptIn />
            {upcomingCheckIns.slice(0, 3).map((c) => (
              <p key={c.id} className="text-xs text-muted-foreground">
                Upcoming: {foodBySlug.get(c.foodSlug)?.name ?? c.foodSlug} check at{" "}
                {new Date(c.dueAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                <button
                  type="button"
                  onClick={() => resolveCheckIn(c.id, "dismissed")}
                  className="ml-2 underline underline-offset-2"
                >
                  dismiss
                </button>
              </p>
            ))}
          </CardContent>
        </Card>
      )}

      {rec.warnings.length > 0 && (
        <div className="space-y-2">
          {rec.warnings.map((w) => (
            <Alert key={`${w.kind}-${w.allergenId ?? w.foodSlug}`} className="border-red-300">
              <AlertDescription>
                {w.message}{" "}
                {w.allergenId && (
                  <Link href={`/allergens/${w.allergenId}`} className="underline underline-offset-2">
                    Playbook →
                  </Link>
                )}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Today&apos;s picks</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {rec.todaysPicks.map((p) => (
            <Card key={p.slug} className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link href={`/foods/${p.slug}`} className="underline-offset-2 hover:underline">
                    {p.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                <p className="flex-1 text-sm text-muted-foreground">{p.reason}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{BAND_LABELS[p.suggestedBand]}</Badge>
                  <Link href={`/log?food=${p.slug}`} className="text-sm text-emerald-700 underline underline-offset-2 dark:text-emerald-400">
                    Log it
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Allergen plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {rec.allergenRail.next ? (
              <div>
                <p className="font-medium">
                  Next up: {ALLERGEN_LABELS[rec.allergenRail.next.allergenId]}
                  {rec.allergenRail.next.gated && (
                    <Badge variant="outline" className="ml-2 border-amber-400 text-amber-700 dark:text-amber-400">
                      on hold
                    </Badge>
                  )}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {rec.allergenRail.next.gated
                    ? rec.allergenRail.next.gateReason
                    : rec.allergenRail.next.guidance}
                </p>
                {!rec.allergenRail.next.gated &&
                  rec.allergenRail.next.foodSlugs.map((slug) => (
                    <Link
                      key={slug}
                      href={`/foods/${slug}`}
                      className="mr-3 mt-1 inline-block text-emerald-700 underline underline-offset-2 dark:text-emerald-400"
                    >
                      How to serve →
                    </Link>
                  ))}
                {rec.allergenRail.next.gated && (
                  <Link href="/allergens" className="mt-1 inline-block underline underline-offset-2">
                    Manage in the allergen tracker →
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">
                All nine common allergens are underway or done — keep them in rotation.
              </p>
            )}
            {rec.allergenRail.maintenance.map((m) => (
              <p key={m.allergenId} className={cn("rounded-md border p-2", m.urgent && "border-amber-400")}>
                {m.message}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Texture stage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <span className="font-medium">{rec.textureStage.current}:</span>{" "}
              {currentStage?.label} <span className="text-muted-foreground">({currentStage?.typicalAge})</span>
            </p>
            {rec.textureStage.nudge ? (
              <div className="space-y-2 rounded-md border border-emerald-300 p-3">
                <p>{rec.textureStage.nudge}</p>
                {nextStage && (
                  <Button
                    size="sm"
                    className="bg-emerald-700 text-white hover:bg-emerald-800"
                    onClick={() => setTextureStage(nextStage.id)}
                  >
                    Move to {nextStage.id}
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Keep practicing at this stage — the app will suggest moving up when the logs show
                consistent, confident eating.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {rec.retryQueue.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Worth another try</h2>
          <p className="text-sm text-muted-foreground">
            Refusals are normal — it can take 8–15 relaxed offers before a food clicks.
          </p>
          <div className="flex flex-wrap gap-2">
            {rec.retryQueue.map((r) => (
              <Link
                key={r.slug}
                href={`/foods/${r.slug}`}
                className="rounded-full border px-3 py-1.5 text-sm hover:border-emerald-400"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="flex justify-center pt-2">
        <Link
          href="/log"
          className={cn(buttonVariants({ size: "lg" }), "h-12 bg-emerald-700 px-8 text-white hover:bg-emerald-800")}
        >
          + Quick log
        </Link>
      </div>
    </div>
  );
}
