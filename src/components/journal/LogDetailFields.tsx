"use client";

import { useEffect, useMemo, useState } from "react";
import { msg } from "@/lib/i18n/config";
import { useLocale, useMsgs } from "@/lib/i18n/LocaleProvider";
import { logDetailMsgs, MEAL_SLOT_MSGS, UNIT_MSGS } from "@/lib/i18n/messages/journal";
import { getPhoto, putPhoto } from "@/lib/media/photos";
import { newId } from "@/lib/storage/store";
import { AMOUNT_UNITS, MEAL_SLOTS } from "@/lib/storage/types";
import type { AmountUnit, FeedQuantity, MealSlot } from "@/lib/storage/types";
import { Button } from "@/components/ui/button";

/** The optional half of an entry — everything a hurried parent can skip. */
export type LogDetails = {
  time?: string;
  mealSlot?: MealSlot;
  quantity?: FeedQuantity;
  notes?: string;
};

/**
 * A photo is only written to IndexedDB when the entry is saved, so abandoning
 * a form never leaks an orphan blob. Until then a picked file is held in
 * memory as `new`.
 */
export type PhotoState =
  | { kind: "none" }
  | { kind: "existing"; id: string }
  | { kind: "new"; file: File };

/**
 * Persist whatever the user picked and return the photo id to store on the
 * log. Returns `failed` when the device refused the write so the caller can
 * still save the entry and say the photo didn't stick.
 */
export async function commitPhoto(
  photo: PhotoState,
): Promise<{ photoId?: string; failed: boolean }> {
  if (photo.kind === "none") return { photoId: undefined, failed: false };
  if (photo.kind === "existing") return { photoId: photo.id, failed: false };
  const id = await putPhoto(newId(), photo.file);
  return id ? { photoId: id, failed: false } : { photoId: undefined, failed: true };
}

function PhotoPreview({ photo, alt }: { photo: PhotoState; alt: string }) {
  // A freshly picked file resolves synchronously, so it can be derived rather
  // than pushed through state; only the IndexedDB read needs an effect.
  const fileUrl = useMemo(
    () => (photo.kind === "new" ? URL.createObjectURL(photo.file) : null),
    [photo],
  );
  useEffect(() => () => void (fileUrl && URL.revokeObjectURL(fileUrl)), [fileUrl]);

  const [stored, setStored] = useState<{ id: string; url: string } | null>(null);
  useEffect(() => {
    if (photo.kind !== "existing") return;
    const id = photo.id;
    let cancelled = false;
    let objectUrl: string | null = null;
    void getPhoto(id).then((blob) => {
      if (cancelled || !blob) return;
      objectUrl = URL.createObjectURL(blob);
      setStored({ id, url: objectUrl });
    });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [photo]);

  // Keyed by id so a stale resolution never paints over a newer selection.
  const url =
    photo.kind === "new"
      ? fileUrl
      : photo.kind === "existing" && stored?.id === photo.id
        ? stored.url
        : null;

  if (!url) return null;
  // eslint-disable-next-line @next/next/no-img-element -- blob: URL from IndexedDB, not an optimizable asset
  return <img src={url} alt={alt} className="size-20 rounded-lg border object-cover" />;
}

export function LogDetailFields({
  value,
  onChange,
  photo,
  onPhotoChange,
}: {
  value: LogDetails;
  onChange: (next: LogDetails) => void;
  photo: PhotoState;
  onPhotoChange: (next: PhotoState) => void;
}) {
  const locale = useLocale();
  const t = useMsgs(logDetailMsgs);
  const patch = (p: Partial<LogDetails>) => onChange({ ...value, ...p });

  // The number lives in local state so a half-typed value ("2" on the way to
  // "20", or a cleared box) doesn't get coerced into the log on every keypress.
  const [qty, setQty] = useState(value.quantity ? String(value.quantity.value) : "");
  const [unit, setUnit] = useState<AmountUnit>(value.quantity?.unit ?? "ml");

  function commitQuantity(raw: string, nextUnit: AmountUnit) {
    const n = Number.parseFloat(raw);
    patch(
      raw.trim() === "" || !Number.isFinite(n) || n <= 0
        ? { quantity: undefined }
        : { quantity: { value: n, unit: nextUnit } },
    );
  }

  return (
    <div className="space-y-4 rounded-lg border p-3">
      <p className="text-xs text-muted-foreground">{t.detailsHint}</p>

      <div className="flex flex-wrap gap-4">
        <label className="text-sm">
          <span className="mb-1 block font-medium">{t.timeLabel}</span>
          <input
            type="time"
            value={value.time ?? ""}
            onChange={(e) => patch({ time: e.target.value || undefined })}
            className="min-h-11 rounded-md border bg-background px-2 py-1.5 text-sm"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium">{t.mealLabel}</span>
          <select
            value={value.mealSlot ?? ""}
            onChange={(e) => patch({ mealSlot: (e.target.value || undefined) as MealSlot | undefined })}
            className="min-h-11 rounded-md border bg-background px-2 py-1.5 text-sm"
          >
            <option value="">{t.mealNone}</option>
            {MEAL_SLOTS.map((m) => (
              <option key={m} value={m}>
                {msg(MEAL_SLOT_MSGS[m], locale)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="text-sm">
        <span className="mb-1 block font-medium">{t.quantityLabel}</span>
        <div className="flex gap-2">
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={qty}
            aria-label={t.quantityAria}
            placeholder={t.quantityPlaceholder}
            onChange={(e) => {
              setQty(e.target.value);
              commitQuantity(e.target.value, unit);
            }}
            className="min-h-11 w-28 rounded-md border bg-background px-2 py-1.5 text-sm"
          />
          <select
            value={unit}
            aria-label={t.unitAria}
            onChange={(e) => {
              const u = e.target.value as AmountUnit;
              setUnit(u);
              commitQuantity(qty, u);
            }}
            className="min-h-11 rounded-md border bg-background px-2 py-1.5 text-sm"
          >
            {AMOUNT_UNITS.map((u) => (
              <option key={u} value={u}>
                {msg(UNIT_MSGS[u], locale)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium">{t.notesLabel}</span>
        <textarea
          rows={2}
          value={value.notes ?? ""}
          placeholder={t.notesPlaceholder}
          onChange={(e) => patch({ notes: e.target.value || undefined })}
          className="w-full rounded-md border bg-background px-2 py-1.5 text-sm"
        />
      </label>

      <div className="text-sm">
        <span className="mb-1 block font-medium">{t.photoLabel}</span>
        <div className="flex items-center gap-3">
          <PhotoPreview photo={photo} alt={t.photoLabel} />
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border px-3 py-2 text-sm font-medium hover:border-primary/60">
              {photo.kind === "none" ? t.addPhoto : t.replacePhoto}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onPhotoChange({ kind: "new", file: f });
                  e.target.value = "";
                }}
              />
            </label>
            {photo.kind !== "none" && (
              <Button type="button" variant="outline" size="sm" onClick={() => onPhotoChange({ kind: "none" })}>
                {t.removePhoto}
              </Button>
            )}
          </div>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">{t.photoLocalOnly}</p>
      </div>
    </div>
  );
}
