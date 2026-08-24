"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle scroll-reveal (design/DESIGN-NOTES.md motion budget). Children render
 * fully visible on the server so the page works without JS; after hydration,
 * elements still below the fold fade/rise in as they enter the viewport.
 * Skipped entirely under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on (or near) screen — stay static to avoid a hide/show flash.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setPhase("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,translate] duration-700 ease-out",
        phase === "hidden" && "translate-y-6 opacity-0",
        className,
      )}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
