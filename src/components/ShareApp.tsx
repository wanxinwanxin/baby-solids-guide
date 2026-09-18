"use client";

import { useState } from "react";
import { CheckIcon, Share2Icon } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { fmt } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { chromeMsgs } from "@/lib/i18n/messages/chrome";
import { cn } from "@/lib/utils";

/**
 * Hand the whole app to another parent.
 *
 * ShareButton sends one page's URL. This sends the app with a sentence that
 * says what it is, because a bare link in a chat thread explains nothing.
 * The link carries `?lang=` so a friend who reads Chinese opens the app in
 * Chinese on the first screen (see src/proxy.ts) — the language lives in a
 * cookie the recipient does not have yet.
 */
export function ShareApp({
  variant = "row",
  className,
}: {
  /** "row" is the card on /more. "inline" is the text link in the footer. */
  variant?: "row" | "inline";
  className?: string;
}) {
  const t = useMsgs(chromeMsgs);
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `${window.location.origin}/?lang=${locale}`;
    const text = fmt(t.shareAppMessage, { brand: BRAND });
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: BRAND, text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // The share sheet was dismissed, or the clipboard was refused. Either
      // way the parent knows what they did — a thrown error here is noise.
    }
  }

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={share}
        className={cn("underline underline-offset-2 hover:text-foreground", className)}
      >
        {copied ? t.shareAppCopied : t.shareAppTitle}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={share}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-2xl border bg-card px-5 py-4 text-left hover:border-primary/60",
        className,
      )}
    >
      <span>
        <span className="block text-[15px] font-bold">{t.shareAppTitle}</span>
        <span className="block text-sm text-muted-foreground">
          {copied ? t.shareAppCopied : t.shareAppBody}
        </span>
      </span>
      {copied ? (
        <CheckIcon aria-hidden className="size-4 shrink-0 text-primary" />
      ) : (
        <Share2Icon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
      )}
    </button>
  );
}
