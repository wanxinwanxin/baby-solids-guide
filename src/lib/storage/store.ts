import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AllergenId } from "@/content-schema/food";
import type {
  AllergenOverride,
  BabyProfile,
  CheckIn,
  ExportEnvelope,
  ExposureLog,
  ImportResult,
  Plan,
  TextureStage,
} from "./types";
import {
  allergenOverrideSchema,
  checkInSchema,
  exportEnvelopeV1Schema,
  exportEnvelopeV2Schema,
  exposureLogSchema,
  planSchema,
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
  deletedLogIds: string[];
  deletedBabyIds: string[];
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
  snoozeBackupNudge: (untilIso: string) => void;
  /** Hide one note. The condition behind it stays in force. */
  dismissNotice: (key: string) => void;
  /** Bring every hidden note back. */
  restoreNotices: () => void;
  setCaregiverMode: (on: boolean) => void;
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
  deletedLogIds: string[];
  deletedBabyIds: string[];
};

export function snapshotOf(s: GuideState): SyncSnapshot {
  const { babies, logs, overrides, checkIns, plans, deletedLogIds, deletedBabyIds } = s;
  return { babies, logs, overrides, checkIns, plans, deletedLogIds, deletedBabyIds };
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

const EMPTY = {
  babies: [] as BabyProfile[],
  activeBabyId: null as string | null,
  logs: [] as ExposureLog[],
  overrides: [] as AllergenOverride[],
  checkIns: [] as CheckIn[],
  plans: [] as Plan[],
  deletedLogIds: [] as string[],
  deletedBabyIds: [] as string[],
  lastExportAt: undefined as string | undefined,
  backupNudgeSnoozedUntil: undefined as string | undefined,
  dismissedNotices: [] as string[],
  caregiverMode: false,
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

      snoozeBackupNudge: (untilIso) => set({ backupNudgeSnoozedUntil: untilIso }),

      dismissNotice: (key) =>
        set({ dismissedNotices: [...new Set([...get().dismissedNotices, key])] }),

      restoreNotices: () => set({ dismissedNotices: [] }),

      setCaregiverMode: (caregiverMode) => set({ caregiverMode }),

      reset: () => set({ ...EMPTY }),

      exportJson: () => {
        const { babies, activeBabyId, logs, overrides, checkIns, plans, deletedLogIds } = get();
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
          set({
            babies: d.babies,
            activeBabyId: d.activeBabyId ?? d.babies[0]?.id ?? null,
            logs,
            overrides,
            checkIns,
            plans,
            deletedLogIds: d.deletedLogIds,
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
      version: 3,
      migrate: (persisted, version) => {
        const state = (
          version < 2 ? migrateV1ToV2(persisted) : persisted
        ) as unknown as GuideState;
        if (version < 3) {
          // v3 gave plan entries a dayIndex. Without one, every food in a
          // week reads as starting on the same day and the board keeps the
          // old four-a-week packing.
          return { ...state, plans: (state.plans ?? []).map(migrateLegacyPlan) };
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
        deletedLogIds,
        deletedBabyIds,
        lastExportAt,
        backupNudgeSnoozedUntil,
        dismissedNotices,
        caregiverMode,
      }) => ({
        babies,
        activeBabyId,
        logs,
        overrides,
        checkIns,
        plans,
        deletedLogIds,
        deletedBabyIds,
        lastExportAt,
        backupNudgeSnoozedUntil,
        dismissedNotices,
        caregiverMode,
      }),
    },
  ),
);

export function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}`;
}
