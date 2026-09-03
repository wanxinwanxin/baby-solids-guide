"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { fmt } from "@/lib/i18n/config";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { tourMsgs } from "@/lib/i18n/messages/tour";

/**
 * Spotlight walkthrough: dims the page, highlights one control at a time,
 * and explains it. Steps anchor to `data-tour` attributes in the chrome, so
 * the same list serves mobile and desktop — a step whose target is not
 * visible at the current breakpoint is simply skipped.
 *
 * Entry points: the one-time <TourOffer/> on Today, "Show me around" in the
 * More menu, and the search dialog footer. All of them call startTour().
 */

const SEEN_KEY = "os-tour-seen";
const START_EVENT = "os:start-tour";

type Step = { sel: string; title: keyof typeof tourMsgs; body: keyof typeof tourMsgs };

const STEPS: Step[] = [
  { sel: '[data-tour="tabbar"], [data-tour="primary-nav"]', title: "navTitle", body: "navBody" },
  { sel: '[data-tour="log"]', title: "logTitle", body: "logBody" },
  { sel: '[data-tour="foods"]', title: "foodsTitle", body: "foodsBody" },
  { sel: '[data-tour="more"]', title: "moreTitle", body: "moreBody" },
  { sel: '[data-tour="emergency"]', title: "emergencyTitle", body: "emergencyBody" },
  { sel: '[data-tour="search"]', title: "searchTitle", body: "searchBody" },
  { sel: '[data-tour="language"]', title: "languageTitle", body: "languageBody" },
];

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Storage can be unavailable (private mode); the tour still runs.
  }
}

/** Begin the walkthrough on the current page. Safe to call from any client component. */
export function startTour() {
  markSeen();
  window.dispatchEvent(new Event(START_EVENT));
}

function firstVisible(sel: string): HTMLElement | null {
  for (const el of document.querySelectorAll<HTMLElement>(sel)) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) return el;
  }
  return null;
}

function TourOverlay({ onClose }: { onClose: () => void }) {
  const t = useMsgs(tourMsgs);
  // Resolve once at start: which steps have a visible anchor right now.
  const [steps] = useState(() => STEPS.filter((s) => firstVisible(s.sel)));
  const [i, setI] = useState(0);
  const [, setTick] = useState(0);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("resize", bump);
    window.addEventListener("scroll", bump, true);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", bump);
      window.removeEventListener("scroll", bump, true);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  useEffect(() => {
    nextRef.current?.focus();
  }, [i]);

  const step = steps[i];
  const el = step ? firstVisible(step.sel) : null;

  // If the chrome changed under us (breakpoint flip, nav re-render), bail out
  // instead of spotlighting a stale rectangle.
  useEffect(() => {
    if (!el) onClose();
  }, [el, onClose]);
  if (!el) return null;

  const r = el.getBoundingClientRect();
  const pad = 6;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cardW = Math.min(340, vw - 16);
  const below = r.bottom + pad + 16;
  const placeBelow = below + 200 < vh;
  const cardStyle: React.CSSProperties = {
    width: cardW,
    left: Math.min(Math.max(8, r.left), vw - cardW - 8),
    ...(placeBelow ? { top: below } : { bottom: vh - r.top + pad + 16 }),
  };

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Click-catcher: the page underneath stays inert during the tour. */}
      <div className="absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed rounded-2xl ring-2 ring-primary shadow-[0_0_0_200vmax_rgba(20,26,24,0.55)] motion-safe:transition-all motion-safe:duration-300"
        style={{ top: r.top - pad, left: r.left - pad, width: r.width + pad * 2, height: r.height + pad * 2 }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t[step.title]}
        className="fixed space-y-2 rounded-2xl border bg-popover p-5 shadow-xl"
        style={cardStyle}
      >
        <p className="font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {fmt(t.stepLabel, { n: i + 1, total: steps.length })}
        </p>
        <h2 className="text-base font-bold">{t[step.title]}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{t[step.body]}</p>
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            {t.skip}
          </button>
          <div className="ml-auto flex gap-2">
            {i > 0 && (
              <button
                type="button"
                onClick={() => setI((n) => n - 1)}
                className="rounded-full border px-3.5 py-1.5 text-sm font-semibold text-foreground hover:border-primary/60"
              >
                {t.back}
              </button>
            )}
            <button
              ref={nextRef}
              type="button"
              onClick={() => (i + 1 < steps.length ? setI((n) => n + 1) : onClose())}
              className="rounded-full bg-primary px-3.5 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary-deep dark:hover:bg-primary/80"
            >
              {i + 1 < steps.length ? t.next : t.done}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Mounted once in the root layout; renders nothing until startTour() fires. */
export function TourController() {
  const [active, setActive] = useState(false);
  const close = useCallback(() => setActive(false), []);
  useEffect(() => {
    const on = () => setActive(true);
    window.addEventListener(START_EVENT, on);
    return () => window.removeEventListener(START_EVENT, on);
  }, []);
  return active ? <TourOverlay onClose={close} /> : null;
}

const neverChanges = () => () => {};
const alwaysTrue = () => true;
function readSeen(): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) !== null;
  } catch {
    return true; // no storage → no way to remember a dismissal; stay quiet
  }
}

/**
 * One-time inline card on Today: offers the walkthrough to a fresh profile.
 * Inline (never floating) so it can't cover a control someone is tapping.
 */
export function TourOffer() {
  const t = useMsgs(tourMsgs);
  // Same idiom as InstallPrompt: a browser fact read through
  // useSyncExternalStore, with a server snapshot that hides the card.
  const seen = useSyncExternalStore(neverChanges, readSeen, alwaysTrue);
  const [hidden, setHidden] = useState(false);
  if (seen || hidden) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-primary/30 bg-secondary/60 px-5 py-4">
      <div className="min-w-0 flex-1 basis-52">
        <p className="text-sm font-bold">{t.offerTitle}</p>
        <p className="text-sm text-muted-foreground">{t.offerBody}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => {
            setHidden(true);
            startTour();
          }}
          className="rounded-full bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-deep dark:hover:bg-primary/80"
        >
          {t.showMeAround}
        </button>
        <button
          type="button"
          onClick={() => {
            markSeen();
            setHidden(true);
          }}
          className="rounded-full border px-3.5 py-2 text-sm font-semibold text-foreground hover:border-primary/60"
        >
          {t.offerDismiss}
        </button>
      </div>
    </div>
  );
}
