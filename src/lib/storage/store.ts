import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  AllergenOverride,
  BabyProfile,
  ExportEnvelope,
  ExposureLog,
  ImportResult,
  TextureStage,
} from "./types";
import { allergenOverrideSchema, exportEnvelopeSchema, exposureLogSchema } from "./schema";

/**
 * GuideStore (ROADMAP §5.6) — the only module allowed to touch persistence.
 * v1 backend: localStorage via zustand/persist. Phase 6 swaps in a synced
 * backend behind the same actions.
 */

export type GuideState = {
  baby: BabyProfile | null;
  logs: ExposureLog[];
  overrides: AllergenOverride[];
  saveBaby: (b: BabyProfile) => void;
  addLog: (l: ExposureLog) => void;
  deleteLog: (id: string) => void;
  setOverride: (o: AllergenOverride) => void;
  clearOverride: (allergenId: AllergenOverride["allergenId"]) => void;
  setTextureStage: (s: TextureStage) => void;
  reset: () => void;
  exportJson: () => string;
  importJson: (json: string) => ImportResult;
};

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

export const useGuideStore = create<GuideState>()(
  persist(
    (set, get) => ({
      baby: null,
      logs: [],
      overrides: [],

      saveBaby: (baby) => set({ baby }),

      addLog: (log) => set({ logs: [...get().logs, log] }),

      deleteLog: (id) => set({ logs: get().logs.filter((l) => l.id !== id) }),

      setOverride: (o) =>
        set({
          overrides: [...get().overrides.filter((x) => x.allergenId !== o.allergenId), o],
        }),

      clearOverride: (allergenId) =>
        set({ overrides: get().overrides.filter((x) => x.allergenId !== allergenId) }),

      setTextureStage: (textureStage) => {
        const baby = get().baby;
        if (baby) set({ baby: { ...baby, textureStage } });
      },

      reset: () => set({ baby: null, logs: [], overrides: [] }),

      exportJson: () => {
        const { baby, logs, overrides } = get();
        const envelope: ExportEnvelope = {
          schemaVersion: 1,
          exportedAt: new Date().toISOString(),
          baby,
          logs,
          overrides,
        };
        return JSON.stringify(envelope, null, 2);
      },

      importJson: (json) => {
        let raw: unknown;
        try {
          raw = JSON.parse(json);
        } catch {
          return { ok: false, error: "That file isn't valid JSON." };
        }
        const parsed = exportEnvelopeSchema.safeParse(raw);
        if (!parsed.success) {
          return {
            ok: false,
            error: "That file doesn't look like an export from this app (schemaVersion 1 expected).",
          };
        }
        const skipped: string[] = [];
        const logs: ExposureLog[] = [];
        for (const [i, l] of parsed.data.logs.entries()) {
          const p = exposureLogSchema.safeParse(l);
          if (p.success) logs.push(p.data);
          else skipped.push(`log #${i + 1}: ${p.error.issues[0]?.message ?? "invalid"}`);
        }
        const overrides: AllergenOverride[] = [];
        for (const [i, o] of parsed.data.overrides.entries()) {
          const p = allergenOverrideSchema.safeParse(o);
          if (p.success) overrides.push(p.data);
          else skipped.push(`override #${i + 1}: ${p.error.issues[0]?.message ?? "invalid"}`);
        }
        set({ baby: parsed.data.baby, logs, overrides });
        return { ok: true, logsImported: logs.length, skipped };
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : memoryStorage,
      ),
      partialize: ({ baby, logs, overrides }) => ({ baby, logs, overrides }),
    },
  ),
);

export function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}`;
}
