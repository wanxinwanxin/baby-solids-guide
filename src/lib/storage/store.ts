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
  lastExportAt?: string;
  backupNudgeSnoozedUntil?: string;

  saveBaby: (b: BabyProfile) => void;
  setActiveBaby: (id: string) => void;
  removeBaby: (id: string) => void;
  addLog: (l: ExposureLog) => void;
  deleteLog: (id: string) => void;
  setOverride: (o: AllergenOverride) => void;
  clearOverride: (babyId: string, allergenId: AllergenId) => void;
  setTextureStage: (s: TextureStage) => void;
  addCheckIns: (items: CheckIn[]) => void;
  resolveCheckIn: (id: string, status: "done" | "dismissed") => void;
  setPlan: (plan: Plan) => void;
  clearPlan: (babyId: string) => void;
  snoozeBackupNudge: (untilIso: string) => void;
  reset: () => void;
  exportJson: () => string;
  importJson: (json: string) => ImportResult;
};

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
export const selectPlanForActive = (s: GuideState): Plan | null => {
  const baby = selectActiveBaby(s);
  return baby ? (s.plans.find((p) => p.babyId === baby.id) ?? null) : null;
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
  lastExportAt: undefined as string | undefined,
  backupNudgeSnoozedUntil: undefined as string | undefined,
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
        set({
          babies,
          activeBabyId: get().activeBabyId === id ? (babies[0]?.id ?? null) : get().activeBabyId,
          logs: get().logs.filter((l) => l.babyId !== id),
          overrides: get().overrides.filter((o) => o.babyId !== id),
          checkIns: get().checkIns.filter((c) => c.babyId !== id),
          plans: get().plans.filter((p) => p.babyId !== id),
        });
      },

      addLog: (log) => set({ logs: [...get().logs, { ...log, updatedAt: now() }] }),

      deleteLog: (id) =>
        set({
          logs: get().logs.filter((l) => l.id !== id),
          deletedLogIds: [...new Set([...get().deletedLogIds, id])],
          checkIns: get().checkIns.filter((c) => c.logId !== id),
        }),

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

      clearPlan: (babyId) => set({ plans: get().plans.filter((p) => p.babyId !== babyId) }),

      snoozeBackupNudge: (untilIso) => set({ backupNudgeSnoozedUntil: untilIso }),

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
      version: 2,
      migrate: (persisted, version) => {
        if (version < 2) return migrateV1ToV2(persisted) as unknown as GuideState;
        return persisted as GuideState;
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
        lastExportAt,
        backupNudgeSnoozedUntil,
      }) => ({
        babies,
        activeBabyId,
        logs,
        overrides,
        checkIns,
        plans,
        deletedLogIds,
        lastExportAt,
        backupNudgeSnoozedUntil,
      }),
    },
  ),
);

export function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}`;
}
