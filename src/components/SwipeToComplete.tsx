"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A row you complete by swiping it to the right — the "swipe when it's done"
 * gesture from the Full day view. Swipe is an enhancement: an always-present
 * Done button does the same thing, so the row is fully usable by keyboard and
 * screen readers (and passes the a11y gate). `touch-action: pan-y` keeps the
 * page scrollable while horizontal drags are ours.
 */
export function SwipeToComplete({
  onComplete,
  completeLabel,
  children,
  className,
}: {
  onComplete: () => void;
  completeLabel: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);

  const width = () => ref.current?.offsetWidth ?? 240;
  const threshold = () => Math.min(140, width() * 0.4);

  const end = () => {
    if (startX.current === null) return;
    startX.current = null;
    setDragging(false);
    if (dx >= threshold()) {
      setDx(0);
      onComplete();
    } else {
      setDx(0);
    }
  };

  return (
    <div ref={ref} className={cn("relative overflow-hidden rounded-xl", className)}>
      {/* Revealed as the row slides right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
        style={{ opacity: dx > 8 ? 1 : 0 }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        {completeLabel}
      </div>
      <div
        className="relative flex items-center gap-2 rounded-xl border bg-card"
        style={{
          transform: `translateX(${dx}px)`,
          transition: dragging ? "none" : "transform 160ms ease-out",
          touchAction: "pan-y",
        }}
        onPointerDown={(e) => {
          startX.current = e.clientX;
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (startX.current === null) return;
          setDx(Math.max(0, e.clientX - startX.current));
        }}
        onPointerUp={end}
        onPointerCancel={end}
        onPointerLeave={() => dragging && end()}
      >
        <div className="min-w-0 flex-1">{children}</div>
        <button
          type="button"
          onClick={onComplete}
          aria-label={completeLabel}
          className="mr-2 flex size-8 shrink-0 items-center justify-center rounded-full border text-muted-foreground hover:border-primary hover:text-primary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
