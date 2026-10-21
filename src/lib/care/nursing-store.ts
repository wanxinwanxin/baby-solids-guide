"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { NursingTimer } from "./nursing";

/**
 * The breastfeed timer that is running on THIS device. It stays outside the
 * sync snapshot: the parent who nurses holds the phone, and the family sees
 * the feed when it is saved as a CareLog. Persisted so a reload, a locked
 * phone, or a trip to another page does not lose a feed in progress.
 */

type NursingTimerState = {
  /** babyId → the feed being timed. */
  timers: Record<string, NursingTimer>;
  setTimer: (babyId: string, t: NursingTimer | null) => void;
};

export const useNursingTimerStore = create<NursingTimerState>()(
  persist(
    (set, get) => ({
      timers: {},
      setTimer: (babyId, t) => {
        const timers = { ...get().timers };
        if (t) timers[babyId] = t;
        else delete timers[babyId];
        set({ timers });
      },
    }),
    {
      name: "os-nursing-timer",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
