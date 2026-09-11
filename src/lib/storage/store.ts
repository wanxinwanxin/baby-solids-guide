import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AllergenId } from "@/content-schema/food";
import type {
  ActivityId,
  ActivityLog,
  AllergenOverride,
  BabyProfile,
  CareLog,
  CheckIn,
  ExportEnvelope,
  ExposureLog,
  ImportResult,
  Plan,
  SleepSession,
  TextureStage,
} from "./types";
import {
  activityLogSchema,
  allergenOverrideSchema,
  careLogSchema,
  checkInSchema,
  exportEnvelopeV1Schema,
  exportEnvelopeV2Schema,
  exposureLogSchema,
  planSchema,
  sleepSessionSchema,
} from "./schema";
import { migrateLegacyPlan } from "@/lib/planner";
import { mergeSnapshots } from "@/lib/sync/merge";
import { deletePhoto } from "@/lib/media/photos";

/**
 * GuideStore (ROADMAP §5.6, Part II) — the only module allowed to touch
 * persistence. Multi-baby from schema v2: all rows are scoped by babyId and
 * the UI reads through the active-baby selectors below.
 */

export type GuideState = {
  babies: BabyProfile[];
  activeBabyId: string | null;
  logs: ExposureLog[];
  overrides: AllergenOverride[];
  checkIns: CheckIn[];
  plans: Plan[];
  /** Sleep + care (2026-09-08): synced per family, same LWW rules as logs. */
  sleepSessions: SleepSession[];
  careLogs: CareLog[];
  /** Daily activities (2026-09-10, e.g. "read to baby"), synced per family. */
  activityLogs: ActivityLog[];
  deletedLogIds: string[];
  deletedBabyIds: string[];
  deletedSleepIds: string[];
  deletedCareLogIds: string[];
  deletedActivityIds: string[];
  lastExportAt?: string;
  backupNudgeSnoozedUntil?: string;
  /**
   * Notes the parent has hidden on this device, by dismiss key (see
   * engine Warning.dismissKey). Device-local on purpose: it is a reading
   * preference, not shared family data, so it stays out of the sync
   * snapshot. The state that raised a note is baked into its key, so a new
   * reaction or a fresh lapse brings the note back on its own.
   */
  dismissedNotices: string[];
  /**
   * This device belongs to a caregiver who feeds but does not plan (Phase
   * 16). Device-local like dismissedNotices — it describes who holds this
   * phone, so it never enters the sync snapshot. When true, Today shows only
   * the day's foods with their prep, and the nav hides the planning surfaces.
   */
  caregiverMode: boolean;
  /**
   * The "Full day" view (2026-09-10) — the inverse of caregiver mode. When on,
   * this device treats the whole baby's day equally (solids, formula, diapers,
   * sleep, reading) instead of a solids-first app. Device-local like
   * caregiverMode; the two are mutually exclusive.
   */
  fullDayMode: boolean;

  saveBaby: (b: BabyProfile) => void;
  setActiveBaby: (id: string) => void;
  removeBaby: (id: string) => void;
  addLog: (l: ExposureLog) => void;
  /** Patch one entry in place (journal edits); re-stamps updatedAt for LWW. */
  updateLog: (id: string, patch: Partial<Omit<ExposureLog, "id" | "babyId">>) => void;
  deleteLog: (id: string) => void;
  setOverride: (o: AllergenOverride) => void;
  clearOverride: (babyId: string, allergenId: AllergenId) => void;
  setTextureStage: (s: TextureStage) => void;
  addCheckIns: (items: CheckIn[]) => void;
  resolveCheckIn: (id: string, status: "done" | "dismissed") => void;
  setPlan: (plan: Plan) => void;
  clearPlan: (babyId: string) => void;
  addSleepSession: (s: SleepSession) => void;
  /** Patch one session in place; id and babyId stay pinned. */
  updateSleepSession: (id: string, patch: Partial<Omit<SleepSession, "id" | "babyId">>) => void;
  deleteSleepSession: (id: string) => void;
  addCareLog: (l: CareLog) => void;
  updateCareLog: (id: string, patch: Partial<Omit<CareLog, "id" | "babyId">>) => void;
  deleteCareLog: (id: string) => void;
  /** Tick or untick a daily activity (idempotent, deterministic id). */
  setActivityDone: (babyId: string, activity: ActivityId, date: string, done: boolean) => void;
  snoozeBackupNudge: (untilIso: string) => void;
  /** Hide one note. The condition behind it stays in force. */
  dismissNotice: (key: string) => void;
  /** Bring every hidden note back. */
  restoreNotices: () => void;
  setCaregiverMode: (on: boolean) => void;
  setFullDayMode: (on: boolean) => void;
  /** Replace local state with a server-merged snapshot (Phase 6 sync). */
  applySnapshot: (s: SyncSnapshot) => void;
  reset: () => void;
  exportJson: () => string;
  importJson: (json: string) => ImportResult;
};

/** The entity payload exchanged with /api/sync. */
export type SyncSnapshot = {
  babies: BabyProfile[];
  logs: ExposureLog[];
  overrides: AllergenOverride[];
  checkIns: CheckIn[];
  plans: Plan[];
  sleepSessions: SleepSession[];
  careLogs: CareLog[];
  activityLogs: ActivityLog[];
  deletedLogIds: string[];
  deletedBabyIds: string[];
  deletedSleepIds: string[];
  deletedCareLogIds: string[];
  deletedActivityIds: string[];
};

export function snapshotOf(s: GuideState): SyncSnapshot {
  const {
    babies,
    logs,
    overrides,
    checkIns,
    plans,
    sleepSessions,
    careLogs,
    activityLogs,
    deletedLogIds,
    deletedBabyIds,
    deletedSleepIds,
    deletedCareLogIds,
    deletedActivityIds,
  } = s;
  return {
    babies,
    logs,
    overrides,
    checkIns,
    plans,
    sleepSessions,
    careLogs,
    activityLogs,
    deletedLogIds,
    deletedBabyIds,
    deletedSleepIds,
    deletedCareLogIds,
    deletedActivityIds,
  };
}

/** Deterministic id so both devices agree on one row per baby/activity/day. */
export function activityLogId(babyId: string, activity: ActivityId, date: string): string {
  return `${babyId}:${activity}:${date}`;
}

// ——— Selectors (pure; usable with useGuideStore(selector)) ———
export const selectActiveBaby = (s: GuideState): BabyProfile | null =>
  s.babies.find((b) => b.id === s.activeBabyId) ?? s.babies[0] ?? null;
export const selectLogsForActive = (s: GuideState): ExposureLog[] => {
  const baby = selectActiveBaby(s);
  return baby ? s.logs.filter((l) => l.babyId === baby.id) : [];
};
export const selectOverridesForActive = (s: GuideState): AllergenOverride[] => {
  const baby = selectActiveBaby(s);
  return baby ? s.overrides.filter((o) => o.babyId === baby.id) : [];
};
export const selectCheckInsForActive = (s: GuideState): CheckIn[] => {
  const baby = selectActiveBaby(s);
  return baby ? s.checkIns.filter((c) => c.babyId === baby.id) : [];
};
/** An entries-less plan is how a cleared plan travels between devices (see
 *  clearPlan) — to every reader it means "no plan". */
export const isEmptyPlan = (p: Plan | undefined | null): boolean => !p || p.entries.length === 0;
export const selectPlanForActive = (s: GuideState): Plan | null => {
  const baby = selectActiveBaby(s);
  if (!baby) return null;
  const plan = s.plans.find((p) => p.babyId === baby.id);
  return isEmptyPlan(plan) ? null : (plan ?? null);
};

const now = () => new Date().toISOString();

/** In-memory fallback so the store is usable during SSR and in node tests. */
const memoryStorage = (() => {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
  };
})();

export const STORAGE_KEY = "opensolids-v1";
/** Pre-v4 device-local sleep store (zustand persist envelope). */
export const LEGACY_SLEEP_KEY = "os-sleep";

/**
 * Parse the old device-local sleep store's raw localStorage value into
 * sessions for the synced store. Exported for tests; tolerant of anything —
 * a broken value imports as an empty list, never a crash during hydration.
 */
export function importLegacySleep(raw: string | null): SleepSession[] {
  if (!raw) return [];
  try {
    const rows: unknown = JSON.parse(raw)?.state?.sessions;
    if (!Array.isArray(rows)) return [];
    return rows.flatMap((r) => {
      const p = sleepSessionSchema.safeParse(r);
      return p.success ? [p.data as SleepSession] : [];
    });
  } catch {
    return [];
  }
}

/** Pre-v5 device-local habits store (zustand persist envelope). */
export const LEGACY_HABITS_KEY = "os-habits";

/**
 * Adopt the old device-local reading habit (`done: {dateIso: ["read"]}`) into
 * synced activity logs for the given baby. Tolerant of anything; no baby →
 * nothing to attach the marks to.
 */
export function importLegacyHabits(raw: string | null, babyId: string | null): ActivityLog[] {
  if (!raw || !babyId) return [];
  try {
    const done: unknown = JSON.parse(raw)?.state?.done;
    if (!done || typeof done !== "object") return [];
    const out: ActivityLog[] = [];
    for (const [date, habits] of Object.entries(done as Record<string, unknown>)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Array.isArray(habits)) continue;
      if (habits.includes("read")) {
        out.push({ id: activityLogId(babyId, "read", date), babyId, activity: "read", date });
      }
    }
    return out;
  } catch {
    return [];
  }
}

const EMPTY = {
  babies: [] as BabyProfile[],
  activeBabyId: null as string | null,
  logs: [] as ExposureLog[],
  overrides: [] as AllergenOverride[],
  checkIns: [] as CheckIn[],
  plans: [] as Plan[],
  sleepSessions: [] as SleepSession[],
  careLogs: [] as CareLog[],
  activityLogs: [] as ActivityLog[],
  deletedLogIds: [] as string[],
  deletedBabyIds: [] as string[],
  deletedSleepIds: [] as string[],
  deletedCareLogIds: [] as string[],
  deletedActivityIds: [] as string[],
  lastExportAt: undefined as string | undefined,
  backupNudgeSnoozedUntil: undefined as string | undefined,
  dismissedNotices: [] as string[],
  caregiverMode: false,
  fullDayMode: false,
};

/** v1 persisted shape → v2 (single `baby` becomes `babies[]`; overrides stamped). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function migrateV1ToV2(old: any) {
  const baby: BabyProfile | null = old?.baby ?? null;
  const stamped = now();
  return {
    ...EMPTY,
    babies: baby ? [{ ...baby, updatedAt: baby.updatedAt ?? stamped }] : [],
    activeBabyId: baby?.id ?? null,
    logs: (old?.logs ?? []).map((l: ExposureLog) => ({ ...l, updatedAt: l.updatedAt ?? stamped })),
    overrides: (old?.overrides ?? []).map((o: AllergenOverride) => ({
      ...o,
      babyId: o.babyId ?? baby?.id ?? "unknown",
      updatedAt: o.updatedAt ?? stamped,
    })),
  };
}

export const useGuideStore = create<GuideState>()(
  persist(
    (set, get) => ({
      ...EMPTY,

      saveBaby: (baby) => {
        const stamped = { ...baby, updatedAt: now() };
        const babies = get().babies.some((b) => b.id === baby.id)
          ? get().babies.map((b) => (b.id === baby.id ? stamped : b))
          : [...get().babies, stamped];
        set({ babies, activeBabyId: get().activeBabyId ?? baby.id });
      },

      setActiveBaby: (id) => {
        if (get().babies.some((b) => b.id === id)) set({ activeBabyId: id });
      },

      removeBaby: (id) => {
        const babies = get().babies.filter((b) => b.id !== id);
        for (const l of get().logs) if (l.babyId === id && l.photoId) void deletePhoto(l.photoId);
        set({
          babies,
          activeBabyId: get().activeBabyId === id ? (babies[0]?.id ?? null) : get().activeBabyId,
          logs: get().logs.filter((l) => l.babyId !== id),
          overrides: get().overrides.filter((o) => o.babyId !== id),
          checkIns: get().checkIns.filter((c) => c.babyId !== id),
          plans: get().plans.filter((p) => p.babyId !== id),
          sleepSessions: get().sleepSessions.filter((s) => s.babyId !== id),
          careLogs: get().careLogs.filter((c) => c.babyId !== id),
          activityLogs: get().activityLogs.filter((a) => a.babyId !== id),
          deletedBabyIds: [...new Set([...get().deletedBabyIds, id])],
        });
      },

      applySnapshot: (serverSnap) => {
        // SAFETY: never blind-replace — merge the server snapshot into local
        // state (LWW + tombstones). A raced/stale/empty server response can
        // then never destroy local data; a follow-up push reconciles instead.
        const merged = mergeSnapshots(serverSnap, snapshotOf(get()));
        // A plan can arrive from a device still on the old week-only shape.
        merged.plans = merged.plans.map(migrateLegacyPlan);
        const activeBabyId =
          get().activeBabyId && merged.babies.some((b) => b.id === get().activeBabyId)
            ? get().activeBabyId
            : (merged.babies[0]?.id ?? null);
        set({ ...merged, activeBabyId });
      },

      addLog: (log) => set({ logs: [...get().logs, { ...log, updatedAt: now() }] }),

      updateLog: (id, patch) => {
        const existing = get().logs.find((l) => l.id === id);
        if (!existing) return;
        // Dropping or replacing a photo evicts the old blob, so an edit can't
        // leak an orphan that nothing references any more.
        if ("photoId" in patch && existing.photoId && patch.photoId !== existing.photoId) {
          void deletePhoto(existing.photoId);
        }
        set({
          logs: get().logs.map((l) =>
            l.id === id ? { ...l, ...patch, id: l.id, babyId: l.babyId, updatedAt: now() } : l,
          ),
        });
      },

      deleteLog: (id) => {
        const existing = get().logs.find((l) => l.id === id);
        if (existing?.photoId) void deletePhoto(existing.photoId);
        set({
          logs: get().logs.filter((l) => l.id !== id),
          deletedLogIds: [...new Set([...get().deletedLogIds, id])],
          checkIns: get().checkIns.filter((c) => c.logId !== id),
        });
      },

      setOverride: (o) => {
        const stamped = { ...o, updatedAt: now() };
        set({
          overrides: [
            ...get().overrides.filter((x) => !(x.allergenId === o.allergenId && x.babyId === o.babyId)),
            stamped,
          ],
        });
      },

      clearOverride: (babyId, allergenId) =>
        set({
          overrides: get().overrides.filter((x) => !(x.allergenId === allergenId && x.babyId === babyId)),
        }),

      setTextureStage: (textureStage) => {
        const baby = selectActiveBaby(get());
        if (baby) get().saveBaby({ ...baby, textureStage });
      },

      addCheckIns: (items) =>
        set({ checkIns: [...get().checkIns, ...items.map((c) => ({ ...c, updatedAt: now() }))] }),

      resolveCheckIn: (id, status) =>
        set({
          checkIns: get().checkIns.map((c) => (c.id === id ? { ...c, status, updatedAt: now() } : c)),
        }),

      setPlan: (plan) =>
        set({
          plans: [...get().plans.filter((p) => p.babyId !== plan.babyId), { ...plan, updatedAt: now() }],
        }),

      // Clearing leaves a stamped, entries-less plan rather than dropping the
      // row: plans merge by last-write-wins on updatedAt, so a bare deletion
      // would be resurrected by the other parent's copy on the next sync.
      // Readers treat an entries-less plan as no plan (selectPlanForActive).
      clearPlan: (babyId) =>
        set({
          plans: get().plans.map((p) =>
            p.babyId === babyId ? { ...p, entries: [], updatedAt: now() } : p,
          ),
        }),

      addSleepSession: (s) =>
        set({ sleepSessions: [...get().sleepSessions, { ...s, updatedAt: now() }] }),

      updateSleepSession: (id, patch) =>
        set({
          sleepSessions: get().sleepSessions.map((s) =>
            s.id === id ? { ...s, ...patch, id: s.id, babyId: s.babyId, updatedAt: now() } : s,
          ),
        }),

      deleteSleepSession: (id) =>
        set({
          sleepSessions: get().sleepSessions.filter((s) => s.id !== id),
          deletedSleepIds: [...new Set([...get().deletedSleepIds, id])],
        }),

      addCareLog: (l) => set({ careLogs: [...get().careLogs, { ...l, updatedAt: now() }] }),

      updateCareLog: (id, patch) =>
        set({
          careLogs: get().careLogs.map((l) =>
            l.id === id ? { ...l, ...patch, id: l.id, babyId: l.babyId, updatedAt: now() } : l,
          ),
        }),

      deleteCareLog: (id) =>
        set({
          careLogs: get().careLogs.filter((l) => l.id !== id),
          deletedCareLogIds: [...new Set([...get().deletedCareLogIds, id])],
        }),

      setActivityDone: (babyId, activity, date, done) => {
        const id = activityLogId(babyId, activity, date);
        if (done) {
          if (get().activityLogs.some((a) => a.id === id)) return;
          set({
            activityLogs: [...get().activityLogs, { id, babyId, activity, date, updatedAt: now() }],
            deletedActivityIds: get().deletedActivityIds.filter((d) => d !== id),
          });
        } else {
          set({
            activityLogs: get().activityLogs.filter((a) => a.id !== id),
            deletedActivityIds: [...new Set([...get().deletedActivityIds, id])],
          });
        }
      },

      snoozeBackupNudge: (untilIso) => set({ backupNudgeSnoozedUntil: untilIso }),

      dismissNotice: (key) =>
        set({ dismissedNotices: [...new Set([...get().dismissedNotices, key])] }),

      restoreNotices: () => set({ dismissedNotices: [] }),

      // The two view modes are mutually exclusive — enabling one clears the
      // other so a device is never both a stripped helper view and a widened
      // full-day view at once.
      setCaregiverMode: (caregiverMode) =>
        set({ caregiverMode, fullDayMode: caregiverMode ? false : get().fullDayMode }),

      setFullDayMode: (fullDayMode) =>
        set({ fullDayMode, caregiverMode: fullDayMode ? false : get().caregiverMode }),

      reset: () => set({ ...EMPTY }),

      exportJson: () => {
        const {
          babies,
          activeBabyId,
          logs,
          overrides,
          checkIns,
          plans,
          sleepSessions,
          careLogs,
          activityLogs,
          deletedLogIds,
          deletedSleepIds,
          deletedCareLogIds,
          deletedActivityIds,
        } = get();
        const envelope: ExportEnvelope = {
          schemaVersion: 2,
          exportedAt: now(),
          babies,
          activeBabyId,
          logs,
          overrides,
          checkIns,
          plans,
          deletedLogIds,
          sleepSessions,
          careLogs,
          deletedSleepIds,
          deletedCareLogIds,
          activityLogs,
          deletedActivityIds,
        };
        set({ lastExportAt: now() });
        return JSON.stringify(envelope, null, 2);
      },

      importJson: (json) => {
        let raw: unknown;
        try {
          raw = JSON.parse(json);
        } catch {
          return { ok: false, error: "That file isn't valid JSON." };
        }

        const v2 = exportEnvelopeV2Schema.safeParse(raw);
        const v1 = v2.success ? null : exportEnvelopeV1Schema.safeParse(raw);
        if (!v2.success && !v1?.success) {
          return {
            ok: false,
            error: "That file doesn't look like an export from this app (schemaVersion 1 or 2 expected).",
          };
        }

        const skipped: string[] = [];
        const parseRows = <T>(rows: unknown[], schema: { safeParse: (u: unknown) => { success: boolean; data?: T; error?: { issues: { message: string }[] } } }, label: string): T[] => {
          const out: T[] = [];
          for (const [i, r] of rows.entries()) {
            const p = schema.safeParse(r);
            if (p.success && p.data !== undefined) out.push(p.data);
            else skipped.push(`${label} #${i + 1}: ${p.error?.issues[0]?.message ?? "invalid"}`);
          }
          return out;
        };

        if (v2.success) {
          const d = v2.data;
          const logs = parseRows<ExposureLog>(d.logs, exposureLogSchema, "log");
          const overrides = parseRows<AllergenOverride>(d.overrides, allergenOverrideSchema, "override");
          const checkIns = parseRows<CheckIn>(d.checkIns, checkInSchema, "check-in");
          const plans = parseRows<Plan>(d.plans, planSchema, "plan");
          const sleepSessions = parseRows<SleepSession>(d.sleepSessions, sleepSessionSchema, "sleep");
          const careLogs = parseRows<CareLog>(d.careLogs, careLogSchema, "care");
          const activityLogs = parseRows<ActivityLog>(d.activityLogs, activityLogSchema, "activity");
          set({
            babies: d.babies,
            activeBabyId: d.activeBabyId ?? d.babies[0]?.id ?? null,
            logs,
            overrides,
            checkIns,
            plans,
            sleepSessions,
            careLogs,
            activityLogs,
            deletedLogIds: d.deletedLogIds,
            deletedSleepIds: d.deletedSleepIds,
            deletedCareLogIds: d.deletedCareLogIds,
            deletedActivityIds: d.deletedActivityIds,
          });
          return { ok: true, logsImported: logs.length, skipped };
        }

        // v1: single baby → wrapped
        const d = v1!.data!;
        const logs = parseRows<ExposureLog>(d.logs, exposureLogSchema, "log");
        const overrides = parseRows<AllergenOverride>(d.overrides, allergenOverrideSchema, "override").map(
          (o) => ({ ...o, babyId: o.babyId ?? d.baby?.id ?? "unknown" }),
        );
        set({
          ...EMPTY,
          babies: d.baby ? [d.baby] : [],
          activeBabyId: d.baby?.id ?? null,
          logs,
          overrides,
        });
        return { ok: true, logsImported: logs.length, skipped };
      },
    }),
    {
      name: STORAGE_KEY,
      version: 5,
      migrate: (persisted, version) => {
        let state = (
          version < 2 ? migrateV1ToV2(persisted) : persisted
        ) as unknown as GuideState;
        if (version < 3) {
          // v3 gave plan entries a dayIndex. Without one, every food in a
          // week reads as starting on the same day and the board keeps the
          // old four-a-week packing.
          state = { ...state, plans: (state.plans ?? []).map(migrateLegacyPlan) };
        }
        if (version < 4) {
          // v4 moved sleep into the synced store. Adopt whatever this device
          // logged under the old device-local key so no sleep data is lost.
          state = {
            ...state,
            sleepSessions: importLegacySleep(
              typeof window !== "undefined" ? window.localStorage.getItem(LEGACY_SLEEP_KEY) : null,
            ),
            careLogs: [],
            deletedSleepIds: [],
            deletedCareLogIds: [],
          };
          try {
            if (typeof window !== "undefined") window.localStorage.removeItem(LEGACY_SLEEP_KEY);
          } catch {
            // Removal is a cleanup, never a blocker.
          }
        }
        if (version < 5) {
          // v5 moved the reading habit into the synced store. Adopt this
          // device's old per-day "read" marks for the active baby so nothing
          // is lost, then drop the legacy key.
          state = {
            ...state,
            activityLogs: importLegacyHabits(
              typeof window !== "undefined" ? window.localStorage.getItem(LEGACY_HABITS_KEY) : null,
              state.activeBabyId ?? state.babies?.[0]?.id ?? null,
            ),
            deletedActivityIds: [],
          };
          try {
            if (typeof window !== "undefined") window.localStorage.removeItem(LEGACY_HABITS_KEY);
          } catch {
            // Removal is a cleanup, never a blocker.
          }
        }
        return state;
      },
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : memoryStorage,
      ),
      partialize: ({
        babies,
        activeBabyId,
        logs,
        overrides,
        checkIns,
        plans,
        sleepSessions,
        careLogs,
        activityLogs,
        deletedLogIds,
        deletedBabyIds,
        deletedSleepIds,
        deletedCareLogIds,
        deletedActivityIds,
        lastExportAt,
        backupNudgeSnoozedUntil,
        dismissedNotices,
        caregiverMode,
        fullDayMode,
      }) => ({
        babies,
        activeBabyId,
        logs,
        overrides,
        checkIns,
        plans,
        sleepSessions,
        careLogs,
        activityLogs,
        deletedLogIds,
        deletedBabyIds,
        deletedSleepIds,
        deletedCareLogIds,
        deletedActivityIds,
        lastExportAt,
        backupNudgeSnoozedUntil,
        dismissedNotices,
        caregiverMode,
        fullDayMode,
      }),
    },
  ),
);

export function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}`;
}
