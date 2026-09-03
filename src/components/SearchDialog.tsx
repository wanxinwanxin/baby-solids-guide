"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildSearchIndex,
  featureEntries,
  searchEntries,
  type SearchEntry,
  type SearchGroup,
  type ZhOverlays,
} from "@/lib/search";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { searchMsgs } from "@/lib/i18n/messages/search";
import { tourMsgs } from "@/lib/i18n/messages/tour";
import { startTour } from "@/components/Tour";
import { cn } from "@/lib/utils";

/**
 * The search palette behind SearchButton. This file (and the corpus it pulls
 * in via @/lib/search) loads in its own chunk on first open — keep it out of
 * any statically-imported chrome.
 */

let cachedZh: ZhOverlays | null = null;

/** zh names load lazily, mirroring the pattern in i18n/content-client.ts. */
function useZhOverlays(): ZhOverlays | null {
  const locale = useLocale();
  const [zh, setZh] = useState<ZhOverlays | null>(cachedZh);
  useEffect(() => {
    if (locale !== "zh" || cachedZh) return;
    let alive = true;
    Promise.all([
      import("../../content/i18n/zh/foods"),
      import("../../content/i18n/zh/recipes"),
      import("../../content/i18n/zh/guides"),
      import("../../content/i18n/zh/allergens"),
    ]).then(([f, r, g, a]) => {
      cachedZh = { foods: f.ZH_FOODS, recipes: r.ZH_RECIPES, guides: g.ZH_GUIDES, allergens: a.ZH_ALLERGENS };
      if (alive) setZh(cachedZh);
    });
    return () => {
      alive = false;
    };
  }, [locale]);
  return locale === "zh" ? zh : null;
}

const GROUP_ORDER: SearchGroup[] = ["feature", "food", "recipe", "guide", "allergen"];
const GROUP_MSG = {
  feature: "groupFeatures",
  food: "groupFoods",
  recipe: "groupRecipes",
  guide: "groupGuides",
  allergen: "groupAllergens",
} as const;

export default function SearchDialog({ onClose }: { onClose: () => void }) {
  const t = useMsgs(searchMsgs);
  const tt = useMsgs(tourMsgs);
  const locale = useLocale();
  const zh = useZhOverlays();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const index = useMemo(() => buildSearchIndex(locale, zh), [locale, zh]);
  const quickLinks = useMemo(() => featureEntries(locale), [locale]);
  const q = query.trim();
  const hits = useMemo(() => (q ? searchEntries(index, q) : quickLinks), [index, quickLinks, q]);

  // Grouped for display, flat (in the same visual order) for the keyboard.
  const grouped = useMemo(
    () =>
      GROUP_ORDER.map((g) => ({ group: g, items: hits.filter((h) => h.group === g) })).filter(
        (g) => g.items.length > 0,
      ),
    [hits],
  );
  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);
  // The stored index can outlive a shrinking result list — clamp on read
  // (typing resets it via onChange, so no state-sync effect is needed).
  const cur = Math.min(active, Math.max(0, flat.length - 1));

  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const go = (entry: SearchEntry) => {
    onClose();
    router.push(entry.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(Math.min(flat.length - 1, cur + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(Math.max(0, cur - 1));
    } else if (e.key === "Enter" && flat[cur]) {
      e.preventDefault();
      go(flat[cur]);
    }
  };

  // Keep the active row in view while arrowing through a long list.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${cur}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cur]);

  return (
    <div
      className="fixed inset-0 z-[90] bg-foreground/30 p-4 backdrop-blur-[2px]"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.open}
        onKeyDown={onKeyDown}
        className="mx-auto mt-[8vh] flex max-h-[70vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border bg-popover shadow-xl"
      >
        <div className="flex items-center gap-2.5 border-b px-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-4.5 shrink-0 text-muted-foreground" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.8-3.8" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder={t.placeholder}
            aria-label={t.open}
            className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Esc"
            className="shrink-0 rounded-md border px-1.5 py-0.5 font-data text-[10px] uppercase text-muted-foreground"
          >
            esc
          </button>
        </div>
        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto p-2">
          {flat.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">{t.empty}</p>
          )}
          {grouped.map((g) => (
            <div key={g.group}>
              <p className="px-3 pb-1 pt-2.5 font-data text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {q ? t[GROUP_MSG[g.group]] : t.quickLinks}
              </p>
              {g.items.map((entry) => {
                const i = flat.indexOf(entry);
                return (
                  <button
                    key={entry.href}
                    type="button"
                    data-index={i}
                    onClick={() => go(entry)}
                    onPointerMove={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-foreground",
                      i === cur && "bg-secondary text-secondary-foreground",
                    )}
                  >
                    <span className="w-5 shrink-0 text-center" aria-hidden="true">
                      {entry.emoji ?? (entry.group === "feature" ? "→" : "·")}
                    </span>
                    <span className="truncate">{entry.name}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 border-t px-4 py-2.5">
          <span className="hidden font-data text-[11px] text-muted-foreground md:inline">
            {t.hintKeys}
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              startTour();
            }}
            className="ml-auto rounded-full border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/60 hover:text-foreground"
          >
            {tt.showMeAround}
          </button>
        </div>
      </div>
    </div>
  );
}
