"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

/**
 * Language toggle: shows the language you would switch TO (the convention
 * bilingual users expect — "中文" while reading English, "EN" while reading
 * Chinese). Writes the locale cookie then refreshes so server components
 * re-render in the new language.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next = locale === "en" ? "zh" : "en";
  return (
    <button
      type="button"
      lang={next}
      aria-label={next === "zh" ? "切换到中文" : "Switch to English"}
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
        startTransition(() => router.refresh());
      }}
      className={cn(
        "shrink-0 rounded-full border px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground",
        pending && "opacity-60",
        className,
      )}
    >
      {next === "zh" ? "中文" : "EN"}
    </button>
  );
}
