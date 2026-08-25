"use client";

import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { printMsgs } from "@/lib/i18n/messages/print";

export function PrintButton() {
  const t = useMsgs(printMsgs);
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md border px-3 py-1.5 text-sm hover:border-primary/60 print:hidden"
    >
      {t.print}
    </button>
  );
}
