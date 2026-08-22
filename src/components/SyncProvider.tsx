"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { create } from "zustand";
import { useSession } from "@/lib/auth-client";
import { snapshotFingerprint } from "@/lib/sync/merge";
import { snapshotOf, useGuideStore } from "@/lib/storage/store";

/** Tiny status store so any page can render a sync indicator. */
export const useSyncStatus = create<{
  state: "off" | "idle" | "syncing" | "synced" | "error";
  set: (s: "off" | "idle" | "syncing" | "synced" | "error") => void;
}>((set) => ({ state: "off", set: (state) => set({ state }) }));

let authEnabledCache: boolean | null = null;

export function useAuthEnabled(): boolean {
  const [enabled, setEnabled] = useState(authEnabledCache ?? false);
  useEffect(() => {
    if (authEnabledCache !== null) return;
    fetch("/api/auth/status")
      .then((r) => r.json())
      .then((d) => {
        authEnabledCache = !!d.enabled;
        setEnabled(authEnabledCache);
      })
      .catch(() => {
        authEnabledCache = false;
      });
  }, []);
  return enabled;
}

/**
 * Phase 6 — background sync loop. Mounted once in the root layout.
 *
 * Safety properties:
 * - never pushes before the persisted store has hydrated (a pre-hydration
 *   push would upload an empty snapshot);
 * - the server response is MERGED into local state (store.applySnapshot is
 *   LWW + tombstones), never blind-applied — a raced response can't destroy
 *   local data;
 * - if local state still differs after applying (we had newer rows the push
 *   didn't carry), one reconciliation push is scheduled.
 */
export function SyncProvider() {
  const enabled = useAuthEnabled();
  const { data: session } = useSession();
  const applying = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const setStatus = useSyncStatus((s) => s.set);
  const userId = session?.user?.id;

  const storeHydrated = useSyncExternalStore(
    (cb) => useGuideStore.persist.onFinishHydration(cb),
    () => useGuideStore.persist.hasHydrated(),
    () => false,
  );

  const pushRef = useRef<(() => Promise<void>) | null>(null);
  const schedulePush = useCallback((delayMs: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => void pushRef.current?.(), delayMs);
  }, []);

  const push = useCallback(async () => {
    try {
      setStatus("syncing");
      const local = snapshotOf(useGuideStore.getState());
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(local),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const { snapshot } = await res.json();
      applying.current = true;
      try {
        useGuideStore.getState().applySnapshot(snapshot);
      } finally {
        applying.current = false;
      }
      // Reconcile: if local still has rows the server hasn't seen, push again.
      const after = snapshotOf(useGuideStore.getState());
      if (snapshotFingerprint(after) !== snapshotFingerprint(snapshot)) {
        schedulePush(1500);
      }
      setStatus("synced");
    } catch {
      setStatus("error");
    }
  }, [setStatus, schedulePush]);

  useEffect(() => {
    pushRef.current = push;
  }, [push]);

  useEffect(() => {
    if (!enabled || !userId || !storeHydrated) {
      setStatus(enabled ? "idle" : "off");
      return;
    }
    void push();
    const unsubscribe = useGuideStore.subscribe(() => {
      if (applying.current) return;
      schedulePush(2500);
    });
    const onFocus = () => void push();
    window.addEventListener("focus", onFocus);
    return () => {
      unsubscribe();
      window.removeEventListener("focus", onFocus);
      clearTimeout(timer.current);
    };
  }, [enabled, userId, storeHydrated, push, schedulePush, setStatus]);

  return null;
}
