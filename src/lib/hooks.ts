"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { AllergenOverride, BabyProfile, CheckIn, ExposureLog, Plan } from "@/lib/storage/types";
import { isEmptyPlan, useGuideStore } from "@/lib/storage/store";

const emptySubscribe = () => () => {};

/**
 * True after hydration on the client, false during SSR — gates UI that reads
 * the persisted store so server and first client render stay identical.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/** The baby currently selected in the switcher (or the only baby). */
export function useActiveBaby(): BabyProfile | null {
  const babies = useGuideStore((s) => s.babies);
  const activeBabyId = useGuideStore((s) => s.activeBabyId);
  return useMemo(
    () => babies.find((b) => b.id === activeBabyId) ?? babies[0] ?? null,
    [babies, activeBabyId],
  );
}

export function useActiveLogs(): ExposureLog[] {
  const baby = useActiveBaby();
  const logs = useGuideStore((s) => s.logs);
  return useMemo(() => (baby ? logs.filter((l) => l.babyId === baby.id) : []), [logs, baby]);
}

export function useActiveOverrides(): AllergenOverride[] {
  const baby = useActiveBaby();
  const overrides = useGuideStore((s) => s.overrides);
  return useMemo(() => (baby ? overrides.filter((o) => o.babyId === baby.id) : []), [overrides, baby]);
}

export function useActiveCheckIns(): CheckIn[] {
  const baby = useActiveBaby();
  const checkIns = useGuideStore((s) => s.checkIns);
  return useMemo(() => (baby ? checkIns.filter((c) => c.babyId === baby.id) : []), [checkIns, baby]);
}

export function useActivePlan(): Plan | null {
  const baby = useActiveBaby();
  const plans = useGuideStore((s) => s.plans);
  return useMemo(() => {
    if (!baby) return null;
    // An entries-less plan is a cleared plan (see store.clearPlan) — no plan.
    const plan = plans.find((p) => p.babyId === baby.id);
    return isEmptyPlan(plan) ? null : (plan ?? null);
  }, [plans, baby]);
}
