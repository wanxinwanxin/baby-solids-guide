"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { searchMsgs } from "@/lib/i18n/messages/search";

// The dialog drags the whole content corpus with it, so it stays in its own
// chunk and only loads on first open.
const SearchDialog = dynamic(() => import("@/components/SearchDialog"));

/** Top-bar search trigger: the magnifier icon everyone looks for, plus ⌘K/Ctrl+K. */
export function SearchButton() {
  const t = useMsgs(searchMsgs);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={t.open}
        title={`${t.open} (⌘K)`}
        data-tour="search"
        onClick={() => setOpen(true)}
        className="flex size-9 shrink-0 items-center justify-center rounded-full border text-muted-foreground hover:border-primary/60 hover:text-foreground"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.8-3.8" />
        </svg>
      </button>
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </>
  );
}
