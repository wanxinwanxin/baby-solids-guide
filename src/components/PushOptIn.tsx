"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + padding).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

/**
 * Phase 8B — push opt-in for signed-in users. Never prompts unasked: the
 * browser permission dialog only appears after an explicit tap.
 */
export function PushOptIn() {
  const { data: session } = useSession();
  const [state, setState] = useState<"unknown" | "unsupported" | "off" | "on" | "denied">("unknown");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await Promise.resolve(); // defer past the synchronous effect body
      if (cancelled) return;
      if (
        !("serviceWorker" in navigator) ||
        !("PushManager" in window) ||
        !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      ) {
        setState("unsupported");
        return;
      }
      if (Notification.permission === "denied") {
        setState("denied");
        return;
      }
      try {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        if (!cancelled) setState(sub ? "on" : "off");
      } catch {
        if (!cancelled) setState("unsupported");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!session || state === "unknown" || state === "unsupported" || state === "denied") return null;
  if (state === "on") {
    return <p className="text-xs text-muted-foreground">📳 Phone notifications are on for check-ins.</p>;
  }

  async function enable() {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setState(permission === "denied" ? "denied" : "off");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!) as unknown as BufferSource,
      });
      const json = sub.toJSON();
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ endpoint: json.endpoint, keys: json.keys }),
      });
      setState("on");
    } catch {
      setState("off");
    }
  }

  return (
    <button
      type="button"
      onClick={() => void enable()}
      className="text-xs text-emerald-700 underline underline-offset-2 dark:text-emerald-400"
    >
      📳 Get check-ins as phone notifications, even with the app closed →
    </button>
  );
}
