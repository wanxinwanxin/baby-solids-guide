"use client";

import { useEffect, useState } from "react";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { journalMsgs } from "@/lib/i18n/messages/journal";
import { getPhoto } from "@/lib/media/photos";
import { cn } from "@/lib/utils";

/**
 * Renders a journal photo from this device's IndexedDB.
 *
 * A log can carry a photo id whose bytes live on another device (the id syncs,
 * the image doesn't). That case renders an explicit note rather than a broken
 * frame or silent nothing, so the absence is explained instead of looking like
 * a bug.
 */
export function PhotoThumb({ photoId, alt }: { photoId: string; alt: string }) {
  const t = useMsgs(journalMsgs);
  // Tagged with the id it resolved for, so switching photos shows the skeleton
  // again instead of briefly painting the previous image.
  const [resolved, setResolved] = useState<{ id: string; url: string | null } | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;
    void getPhoto(photoId).then((blob) => {
      if (cancelled) return;
      objectUrl = blob ? URL.createObjectURL(blob) : null;
      setResolved({ id: photoId, url: objectUrl });
    });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [photoId]);

  const ready = resolved?.id === photoId ? resolved : null;
  if (!ready) return <div className="size-16 shrink-0 animate-pulse rounded-lg bg-muted" />;
  if (!ready.url) return <p className="text-xs text-muted-foreground">{t.photoElsewhere}</p>;

  return (
    <button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      aria-expanded={expanded}
      className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- blob: URL from IndexedDB, not an optimizable asset */}
      <img
        src={ready.url}
        alt={alt}
        className={cn(
          "rounded-lg border object-cover transition-all",
          expanded ? "max-h-72 w-auto" : "size-16",
        )}
      />
    </button>
  );
}
