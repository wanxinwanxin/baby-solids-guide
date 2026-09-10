"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Daily habits (2026-09-10) — lightweight "did we do this today?" markers for
 * the Full day view (currently just "read to baby"). Device-local on purpose:
 * this is a nascent, per-caregiver checklist, not yet worth a synced table.
 * Keyed by local calendar date; pruned so it never grows without bound.
 */

const KEEP_DAYS = 45;

export type HabitId = "read";

type HabitState = {
  /** dateIso -> list of habit ids done that day. */
  done: Record<string, HabitId[]>;
  toggle: (dateIso: string, habit: HabitId) => void;
};

function prune(done: Record<string, HabitId[]>): Record<string, HabitId[]> {
  const cutoff = new Date(Date.now() - KEEP_DAYS * 86400000).toISOString().slice(0, 10);
  const out: Record<string, HabitId[]> = {};
  for (const [day, habits] of Object.entries(done)) if (day >= cutoff) out[day] = habits;
  return out;
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      done: {},
      toggle: (dateIso, habit) => {
        const current = get().done[dateIso] ?? [];
        const next = current.includes(habit)
          ? current.filter((h) => h !== habit)
          : [...current, habit];
        set({ done: prune({ ...get().done, [dateIso]: next }) });
      },
    }),
    {
      name: "os-habits",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/** Whether a habit is marked done for the given local date. */
export function habitDone(
  done: Record<string, HabitId[]>,
  dateIso: string,
  habit: HabitId,
): boolean {
  return (done[dateIso] ?? []).includes(habit);
}
