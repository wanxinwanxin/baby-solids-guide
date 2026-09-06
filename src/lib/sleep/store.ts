"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { SleepSession } from "./model";

/**
 * Sleep log — device-local on purpose (like photos and dismissedNotices).
 * Sessions never enter the sync snapshot or the export envelope: the sleep
 * predictor is an Extra, and syncing a high-frequency log deserves its own
 * migration plan. The store prunes itself to the prediction lookback plus a
 * generous margin, so localStorage stays small.
 */

const MIN = 60 * 1000;
const KEEP_DAYS = 60;

type SleepState = {
  sessions: SleepSession[];
  /**
   * Last known wake-up per baby (ISO datetime) — the anchor used when no
   * completed session tells us. Set on first run ("baby just woke up") and
   * by wokeUp() when nothing was marked asleep.
   */
  wakeAnchors: Record<string, string>;

  /** Open a session now (or at the given time). No-op while one is open. */
  fellAsleep: (babyId: string, atIso: string) => void;
  /** Close the open session, or record a wake anchor when none is open. */
  wokeUp: (babyId: string, atIso: string) => void;
  addSession: (s: SleepSession) => void;
  /** Patch one session in place (edits); id and babyId stay pinned. */
  updateSession: (id: string, patch: Partial<Omit<SleepSession, "id" | "babyId">>) => void;
  deleteSession: (id: string) => void;
  setWakeAnchor: (babyId: string, atIso: string) => void;
};

const now = () => new Date().toISOString();

function prune(sessions: SleepSession[]): SleepSession[] {
  const cutoff = Date.now() - KEEP_DAYS * 24 * 60 * MIN;
  return sessions.filter((s) => !s.end || new Date(s.start).getTime() >= cutoff);
}

export const useSleepStore = create<SleepState>()(
  persist(
    (set, get) => ({
      sessions: [],
      wakeAnchors: {},

      fellAsleep: (babyId, atIso) => {
        if (get().sessions.some((s) => s.babyId === babyId && !s.end)) return;
        const session: SleepSession = {
          id: crypto.randomUUID(),
          babyId,
          start: atIso,
          updatedAt: now(),
        };
        set({ sessions: prune([...get().sessions, session]) });
      },

      wokeUp: (babyId, atIso) => {
        const open = get().sessions.find((s) => s.babyId === babyId && !s.end);
        if (!open) {
          get().setWakeAnchor(babyId, atIso);
          return;
        }
        // A wake before the sleep start is a mis-tap: keep 1 minute of sleep.
        const end =
          new Date(atIso).getTime() > new Date(open.start).getTime()
            ? atIso
            : new Date(new Date(open.start).getTime() + MIN).toISOString();
        set({
          sessions: get().sessions.map((s) =>
            s.id === open.id ? { ...s, end, updatedAt: now() } : s,
          ),
        });
      },

      addSession: (session) => {
        set({ sessions: prune([...get().sessions.filter((s) => s.id !== session.id), session]) });
      },

      updateSession: (id, patch) => {
        set({
          sessions: get().sessions.map((s) =>
            s.id === id ? { ...s, ...patch, id: s.id, babyId: s.babyId, updatedAt: now() } : s,
          ),
        });
      },

      deleteSession: (id) => {
        set({ sessions: get().sessions.filter((s) => s.id !== id) });
      },

      setWakeAnchor: (babyId, atIso) => {
        set({ wakeAnchors: { ...get().wakeAnchors, [babyId]: atIso } });
      },
    }),
    {
      name: "os-sleep",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
