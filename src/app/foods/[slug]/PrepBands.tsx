"use client";

import { useRef, useState } from "react";
import type { AgeBand, Food, PrepSpec } from "@/content-schema/food";
import { BAND_LABELS } from "@/lib/food-utils";
import { CutDiagram, isDiagramVariant } from "@/components/diagrams/CutDiagram";
import { cn } from "@/lib/utils";

const TAB_LABELS: Record<AgeBand, string> = {
  "6-8m": "6–8 MO",
  "9-12m": "9–12 MO",
  "12-24m": "12–24 MO",
};

/**
 * Band tabs for the "How do I serve it at each age?" section. Hand-rolled
 * (roving tabindex + arrow keys) so the triggers can be the mono pill chips
 * from the mockup; only the active panel is rendered.
 */
export function PrepBands({
  prepSpecs,
  servingGuidance,
}: {
  prepSpecs: PrepSpec[];
  servingGuidance: Food["servingGuidance"];
}) {
  const [active, setActive] = useState<AgeBand>(prepSpecs[0].band);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const spec = prepSpecs.find((s) => s.band === active) ?? prepSpecs[0];
  const serving = servingGuidance?.find((sg) => sg.band === spec.band);
  const activeIndex = prepSpecs.findIndex((s) => s.band === spec.band);

  function moveTo(index: number) {
    const next = (index + prepSpecs.length) % prepSpecs.length;
    setActive(prepSpecs[next].band);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") moveTo(activeIndex + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") moveTo(activeIndex - 1);
    else if (e.key === "Home") moveTo(0);
    else if (e.key === "End") moveTo(prepSpecs.length - 1);
    else return;
    e.preventDefault();
  }

  return (
    <div className="space-y-5">
      <div role="tablist" aria-label="Age bands" className="flex flex-wrap gap-2">
        {prepSpecs.map((s, i) => {
          const selected = s.band === spec.band;
          return (
            <button
              key={s.band}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`band-tab-${s.band}`}
              aria-selected={selected}
              aria-controls={selected ? `band-panel-${s.band}` : undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(s.band)}
              onKeyDown={onKeyDown}
              className={cn(
                "font-data rounded-full px-5 py-2.5 text-xs tracking-[0.1em] whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                selected
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {TAB_LABELS[s.band]}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`band-panel-${spec.band}`}
        aria-labelledby={`band-tab-${spec.band}`}
        className="grid gap-5 lg:grid-cols-[1.1fr_1fr]"
      >
        <div className="flex flex-col gap-4 rounded-2xl border-[1.5px] border-primary bg-card p-5 sm:p-6">
          <h3 className="sr-only">Safe form at {BAND_LABELS[spec.band]}</h3>
          {isDiagramVariant(spec.cutDiagram) && (
            <div className="rounded-xl bg-muted p-4">
              <CutDiagram
                variant={spec.cutDiagram}
                className="mx-auto flex max-w-xs flex-col items-center gap-1.5 text-center [&_svg]:w-full [&_svg]:max-w-[280px]"
              />
            </div>
          )}
          <p className="text-pretty text-base leading-relaxed font-semibold">{spec.form}</p>
          <div className="flex items-start gap-3 rounded-xl bg-secondary px-4 py-3.5">
            <span
              aria-hidden="true"
              className="font-data mt-0.5 shrink-0 rounded-full bg-card px-2.5 py-1 text-[10px] tracking-[0.12em] text-secondary-foreground whitespace-nowrap"
            >
              PASS / FAIL
            </span>
            <p className="text-sm leading-relaxed text-secondary-foreground">
              <span className="sr-only">Pass/fail test: </span>
              {spec.passFailTest}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Why this form: </span>
            {spec.whyThisForm}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-base font-bold">How to prepare</h3>
            <ol className="mt-3 space-y-3">
              {spec.prepSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80">
                  <span aria-hidden="true" className="font-data mt-0.5 shrink-0 text-[11px] text-secondary-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          {spec.commonMistakes.length > 0 && (
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="text-base font-bold">Common mistakes</h3>
              <ul className="mt-3 space-y-2.5">
                {spec.commonMistakes.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/80">
                    <span aria-hidden="true" className="shrink-0 font-bold text-destructive">
                      ✕
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {serving && (
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="text-base font-bold">How much?</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{serving.typicalAmount}</p>
              {serving.frequency && <p className="mt-1.5 text-sm text-muted-foreground">{serving.frequency}</p>}
              {serving.note && <p className="mt-1.5 text-sm text-muted-foreground">{serving.note}</p>}
              <p className="mt-2.5 text-xs text-muted-foreground">
                Amounts are starting points, not targets — watch the baby, not the numbers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
