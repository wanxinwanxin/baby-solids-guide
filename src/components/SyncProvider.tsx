"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { useSession } from "@/lib/auth-client";
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
 * Signed out: does nothing. Signed in: pushes the local snapshot (debounced
 * 2.5s after any change), pulls/merges on login and window focus. The server
 * merges LWW and returns the authoritative snapshot, which replaces local
 * state without re-triggering a push.
 */
export function SyncProvider() {
  const enabled = useAuthEnabled();
  const { data: session } = useSession();
  const applying = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const setStatus = useSyncStatus((s) => s.set);
  const userId = session?.user?.id;

  const push = useCallback(async () => {
    try {
      setStatus("syncing");
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(snapshotOf(useGuideStore.getState())),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const { snapshot } = await res.json();
      applying.current = true;
      useGuideStore.getState().applySnapshot(snapshot);
      applying.current = false;
      setStatus("synced");
    } catch {
      setStatus("error");
    }
  }, [setStatus]);

  useEffect(() => {
    if (!enabled || !userId) {
      setStatus(enabled ? "idle" : "off");
      return;
    }
    void push();
    const unsubscribe = useGuideStore.subscribe(() => {
      if (applying.current) return;
      clearTimeout(timer.current);
      timer.current = setTimeout(() => void push(), 2500);
    });
    const onFocus = () => void push();
    window.addEventListener("focus", onFocus);
    return () => {
      unsubscribe();
      window.removeEventListener("focus", onFocus);
      clearTimeout(timer.current);
    };
  }, [enabled, userId, push, setStatus]);

  return null;
}
