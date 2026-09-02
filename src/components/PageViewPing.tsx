"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fires one beacon per navigation with the pathname and nothing else —
 * D5 option 2 aggregate counting. No cookies, no IDs, no query strings.
 * Production only, so local development never pollutes the table.
 */
export function PageViewPing() {
  const pathname = usePathname();
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !pathname) return;
    const body = JSON.stringify({ path: pathname });
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon("/api/views", body);
    } else {
      fetch("/api/views", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  }, [pathname]);
  return null;
}
