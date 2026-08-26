"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { create } from "zustand";
import { useSession } from "@/lib/auth-client";
import { snapshotFingerprint } from "@/lib/sync/merge";
import { snapshotOf, useGuideStore, type SyncSnapshot } from "@/lib/storage/store";

/** Tiny status store so any page can render a sync indicator. */
export const useSyncStatus = create<{
  state: "off" | "idle" | "syncing" | "synced" | "error";
  /** epoch ms of the last successful sync, or null if we've never synced. */
  lastSyncedAt: number | null;
  set: (s: "off" | "idle" | "syncing" | "synced" | "error") => void;
  markSynced: (at: number) => void;
}>((set) => ({
  state: "off",
  lastSyncedAt: null,
  set: (state) => set({ state }),
  markSynced: (lastSyncedAt) => set({ state: "synced", lastSyncedAt }),
}));

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

/** How often a VISIBLE tab checks the server for the other parent's edits. */
const POLL_MS = 25_000;
/** Floor between opportunistic syncs (focus/visibility/poll), so a flapping
 *  tab or a fast tab-switcher can't hammer the API. */
const MIN_GAP_MS = 3_000;
/** Consecutive failures back off from POLL_MS up to this ceiling. */
const MAX_BACKOFF_MS = 5 * 60_000;

/**
 * Phase 6 — background sync loop. Mounted once in the root layout.
 *
 * Triggers:
 * - once after the persisted store hydrates;
 * - debounced after any local mutation (push — carries the new data up);
 * - window focus and document visibilitychange→visible (push; visibility is
 *   what catches an iOS PWA resumed from the background, where `focus`
 *   often doesn't fire);
 * - every POLL_MS while the document is VISIBLE (cheap probe → full pull
 *   only when the server's version actually changed). Never while hidden.
 *
 * Safety properties:
 * - never pushes before the persisted store has hydrated (a pre-hydration
 *   push would upload an empty snapshot);
 * - the server response is MERGED into local state (store.applySnapshot is
 *   LWW + tombstones), never blind-applied — a raced response can't destroy
 *   local data;
 * - if local state still differs after applying (we had newer rows the push
 *   didn't carry), one reconciliation push is scheduled;
 * - one request at a time (`inFlight`); a trigger that lands mid-flight
 *   reschedules instead of racing, and failures back off exponentially
 *   instead of retrying every tick.
 */
export function SyncProvider() {
  const enabled = useAuthEnabled();
  const { data: session } = useSession();
  const applying = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const inFlight = useRef(false);
  const lastSyncAt = useRef(0);
  const failures = useRef(0);
  const backoffUntil = useRef(0);
  /** Server snapshot version last seen — the poll's cheap change detector. */
  const serverVersion = useRef<string | null>(null);
  const setStatus = useSyncStatus((s) => s.set);
  const markSynced = useSyncStatus((s) => s.markSynced);
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

  /** Merge a server snapshot into local state; schedule a push if we still
   *  hold rows the server hasn't seen. */
  const applyServer = useCallback(
    (snapshot: SyncSnapshot) => {
      applying.current = true;
      try {
        useGuideStore.getState().applySnapshot(snapshot);
      } finally {
        applying.current = false;
      }
      const after = snapshotOf(useGuideStore.getState());
      if (snapshotFingerprint(after) !== snapshotFingerprint(snapshot)) schedulePush(1500);
    },
    [schedulePush],
  );

  const onSuccess = useCallback(() => {
    failures.current = 0;
    backoffUntil.current = 0;
    lastSyncAt.current = Date.now();
    markSynced(lastSyncAt.current);
  }, [markSynced]);

  const onFailure = useCallback(() => {
    failures.current += 1;
    lastSyncAt.current = Date.now();
    backoffUntil.current =
      Date.now() + Math.min(POLL_MS * 2 ** (failures.current - 1), MAX_BACKOFF_MS);
    setStatus("error");
  }, [setStatus]);

  /** Full sync: upload the local snapshot, merge the server's answer back. */
  const push = useCallback(async () => {
    if (inFlight.current) {
      // Never overlap: retry shortly instead of racing the in-flight request.
      schedulePush(1000);
      return;
    }
    inFlight.current = true;
    try {
      setStatus("syncing");
      const local = snapshotOf(useGuideStore.getState());
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(local),
      });
      if (!res.ok) {
        onFailure();
        return;
      }
      const { snapshot, version } = await res.json();
      serverVersion.current = version ?? null;
      applyServer(snapshot);
      onSuccess();
    } catch {
      onFailure();
    } finally {
      inFlight.current = false;
    }
  }, [setStatus, schedulePush, applyServer, onSuccess, onFailure]);

  /**
   * Freshness check for an open tab: ask for the server's version hash
   * (~60 bytes) and download the snapshot only if it moved. This is what
   * lets one parent see the other's plan edit without touching the app.
   */
  const poll = useCallback(async () => {
    if (inFlight.current) return;
    if (Date.now() < backoffUntil.current) return;
    if (Date.now() - lastSyncAt.current < MIN_GAP_MS) return;
    inFlight.current = true;
    try {
      const probe = await fetch("/api/sync?probe=1");
      if (!probe.ok) {
        onFailure();
        return;
      }
      const { version } = await probe.json();
      if (version && version === serverVersion.current) {
        // Nothing changed remotely — no snapshot download at all.
        onSuccess();
        return;
      }
      const res = await fetch("/api/sync");
      if (!res.ok) {
        onFailure();
        return;
      }
      const { snapshot, version: pulled } = await res.json();
      serverVersion.current = pulled ?? null;
      setStatus("syncing");
      applyServer(snapshot);
      onSuccess();
    } catch {
      onFailure();
    } finally {
      inFlight.current = false;
    }
  }, [setStatus, applyServer, onSuccess, onFailure]);

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

    /** A user-visible resume: full sync, but not more often than MIN_GAP_MS. */
    const resume = () => {
      if (inFlight.current) return;
      if (Date.now() - lastSyncAt.current < MIN_GAP_MS) return;
      void push();
    };

    let interval: ReturnType<typeof setInterval> | undefined;
    const startPolling = () => {
      if (interval) return;
      interval = setInterval(() => void poll(), POLL_MS);
    };
    const stopPolling = () => {
      clearInterval(interval);
      interval = undefined;
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        startPolling();
        resume();
      } else {
        // Hidden tabs cost nothing: no polling, no timers firing into the void.
        stopPolling();
      }
    };

    if (document.visibilityState === "visible") startPolling();
    window.addEventListener("focus", resume);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      unsubscribe();
      window.removeEventListener("focus", resume);
      document.removeEventListener("visibilitychange", onVisibility);
      stopPolling();
      clearTimeout(timer.current);
    };
  }, [enabled, userId, storeHydrated, push, poll, schedulePush, setStatus]);

  return null;
}
