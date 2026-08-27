/**
 * Device-local photo storage for journal entries.
 *
 * Photos live in IndexedDB, deliberately *outside* the persisted zustand blob
 * and outside the sync snapshot:
 * - localStorage (where the store persists) is a ~5MB budget shared with every
 *   log, plan, and profile. A handful of camera images would evict the data
 *   the app actually needs to function.
 * - The sync snapshot is a single JSON payload pushed on every change. Putting
 *   image bytes in it would multiply the payload by orders of magnitude for a
 *   feature that is pure garnish.
 *
 * The trade-off is explicit and surfaced in the UI: an ExposureLog carries the
 * photo *id* (which does sync), so a second device knows a photo exists and
 * says so, but the bytes stay on the device that took it.
 */

const DB_NAME = "opensolids-media";
const DB_VERSION = 1;
const STORE = "photos";

/** Longest edge kept after downscaling. Plenty for a thumbnail + lightbox. */
export const MAX_EDGE = 1280;
const JPEG_QUALITY = 0.82;

export function photosSupported(): boolean {
  return typeof indexedDB !== "undefined";
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(STORE, mode);
        const req = run(t.objectStore(STORE));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
        t.oncomplete = () => db.close();
      }),
  );
}

/**
 * Scale a photo down so the longest edge is at most `maxEdge`, preserving
 * aspect ratio. Images already small enough are left alone (returns the same
 * dimensions) so we never upscale.
 */
export function targetSize(
  width: number,
  height: number,
  maxEdge = MAX_EDGE,
): { width: number; height: number } {
  const longest = Math.max(width, height);
  if (longest <= maxEdge || longest === 0) return { width, height };
  const scale = maxEdge / longest;
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

/**
 * Decode, downscale, and re-encode a picked image as JPEG. A 12MP phone photo
 * lands around 150–300KB, which keeps a year of daily logging well inside a
 * normal IndexedDB allowance.
 */
async function downscale(file: Blob): Promise<Blob> {
  // `from-image` applies EXIF orientation, so portrait phone shots aren't
  // stored sideways.
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const { width, height } = targetSize(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
  );
  // If the browser refuses to encode, keeping the original beats losing the
  // photo — it is only ever a size optimisation.
  return blob ?? file;
}

/**
 * Store a picked image and return its id, or null if this device can't hold
 * it (private mode, quota exhausted, no IndexedDB). Callers treat null as
 * "save the log without a photo" rather than failing the whole entry.
 */
export async function putPhoto(id: string, file: Blob): Promise<string | null> {
  if (!photosSupported()) return null;
  try {
    const stored = await downscale(file).catch(() => file);
    await tx("readwrite", (s) => s.put(stored, id) as IDBRequest<IDBValidKey>);
    return id;
  } catch {
    return null;
  }
}

export async function getPhoto(id: string): Promise<Blob | null> {
  if (!photosSupported()) return null;
  try {
    const blob = await tx<Blob | undefined>("readonly", (s) => s.get(id) as IDBRequest<Blob | undefined>);
    return blob ?? null;
  } catch {
    return null;
  }
}

export async function deletePhoto(id: string): Promise<void> {
  if (!photosSupported()) return;
  try {
    await tx("readwrite", (s) => s.delete(id) as IDBRequest<undefined>);
  } catch {
    // A photo we can't delete is a leaked blob, not a broken journal.
  }
}
