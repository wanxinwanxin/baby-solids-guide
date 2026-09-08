"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Device-local sleep leftovers. Sessions moved into the synced GuideStore on
 * 2026-09-08 (persist v4 imports them from the old "os-sleep" key). What
 * stays here is the wake anchor: "when did the baby last wake" as told to
 * THIS device before any session existed — transient bootstrap state, not
 * family data, so it never enters the sync snapshot.
 */

type SleepAnchorState = {
  /** babyId → ISO datetime of the last known wake-up. */
  wakeAnchors: Record<string, string>;
  setWakeAnchor: (babyId: string, atIso: string) => void;
};

export const useSleepStore = create<SleepAnchorState>()(
  persist(
    (set, get) => ({
      wakeAnchors: {},
      setWakeAnchor: (babyId, atIso) => {
        set({ wakeAnchors: { ...get().wakeAnchors, [babyId]: atIso } });
      },
    }),
    {
      name: "os-sleep-anchors",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
