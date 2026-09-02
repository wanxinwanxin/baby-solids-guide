"use client";

import { useState } from "react";
import { Share2Icon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { chromeMsgs } from "@/lib/i18n/messages/chrome";

/**
 * Guest-friendly share control for public content pages. Uses the native
 * share sheet where one exists (most phones) and falls back to copying the
 * page URL. Shares the canonical URL so pasted links stay stable.
 */
export function ShareButton({ title, path }: { title: string; path: string }) {
  const t = useMsgs(chromeMsgs);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}${path}`;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // The user closed the share sheet — nothing to do.
    }
  };

  return (
    <Button type="button" variant="outline" size="sm" className="min-h-9 gap-1.5" onClick={share}>
      {copied ? <CheckIcon aria-hidden className="size-3.5" /> : <Share2Icon aria-hidden className="size-3.5" />}
      {copied ? t.shareCopied : t.share}
    </Button>
  );
}
