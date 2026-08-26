import type { SyncSnapshot } from "@/lib/storage/store";
import type { AllergenOverride, BabyProfile, CheckIn, ExposureLog, Plan } from "@/lib/storage/types";

/**
 * Phase 6 — snapshot merge with entity-level last-write-wins.
 *
 * Rules (ROADMAP Part II §6):
 * - babies + logs: per-id LWW on updatedAt (missing updatedAt = epoch);
 *   tombstones (deleted ids) always win — a delete is final.
 * - plans: per-baby LWW on Plan.updatedAt. Two parents share one baby and
 *   both keep /plan open; "the client that pushed last wins" let a device
 *   holding an hour-old plan silently overwrite an edit made a minute ago.
 *   A cleared plan is an empty-entries plan (store.clearPlan), so clearing
 *   propagates through LWW instead of needing a tombstone list.
 * - overrides / check-ins: per-baby client-authoritative when the client
 *   snapshot contains that baby (these are user-set toggles and ephemera
 *   where "resurrection" is worse than last-client-wins); server rows
 *   survive for babies the client doesn't know about.
 */

const ts = (v?: string) => (v ? new Date(v).getTime() : 0);

function lwwById<T extends { updatedAt?: string }>(
  server: T[],
  client: T[],
  idOf: (t: T) => string,
  deleted: Set<string>,
): T[] {
  const merged = new Map<string, T>();
  for (const row of server) merged.set(idOf(row), row);
  for (const row of client) {
    const id = idOf(row);
    const existing = merged.get(id);
    if (!existing || ts(row.updatedAt) >= ts(existing.updatedAt)) merged.set(id, row);
  }
  return [...merged.values()].filter((row) => !deleted.has(idOf(row)));
}

function perBabyClientAuthoritative<T extends { babyId?: string }>(
  server: T[],
  client: T[],
  clientBabyIds: Set<string>,
  deletedBabies: Set<string>,
): T[] {
  const keptServer = server.filter(
    (r) => !!r.babyId && !clientBabyIds.has(r.babyId) && !deletedBabies.has(r.babyId),
  );
  return [...keptServer, ...client.filter((r) => !!r.babyId && !deletedBabies.has(r.babyId!))];
}

/**
 * Per-baby last-write-wins (one row per baby, keyed by babyId). Ties go to
 * the client, matching lwwById. Rows for babies the client has never seen
 * survive untouched.
 */
function lwwByBaby<T extends { babyId: string; updatedAt?: string }>(
  server: T[],
  client: T[],
  deletedBabies: Set<string>,
): T[] {
  const merged = new Map<string, T>();
  for (const row of server) merged.set(row.babyId, row);
  for (const row of client) {
    const existing = merged.get(row.babyId);
    if (!existing || ts(row.updatedAt) >= ts(existing.updatedAt)) merged.set(row.babyId, row);
  }
  return [...merged.values()].filter((row) => !deletedBabies.has(row.babyId));
}

export function mergeSnapshots(server: SyncSnapshot, client: SyncSnapshot): SyncSnapshot {
  const deletedLogIds = [...new Set([...server.deletedLogIds, ...client.deletedLogIds])];
  const deletedBabyIds = [...new Set([...server.deletedBabyIds, ...client.deletedBabyIds])];
  const deletedLogs = new Set(deletedLogIds);
  const deletedBabies = new Set(deletedBabyIds);

  const babies = lwwById<BabyProfile>(server.babies, client.babies, (b) => b.id, deletedBabies);
  const babyIds = new Set(babies.map((b) => b.id));
  const clientBabyIds = new Set(client.babies.map((b) => b.id));

  const logs = lwwById<ExposureLog>(server.logs, client.logs, (l) => l.id, deletedLogs).filter((l) =>
    babyIds.has(l.babyId),
  );

  const overrides = perBabyClientAuthoritative<AllergenOverride>(
    server.overrides,
    client.overrides,
    clientBabyIds,
    deletedBabies,
  ).filter((o) => !!o.babyId && babyIds.has(o.babyId));

  const checkIns = perBabyClientAuthoritative<CheckIn>(
    server.checkIns,
    client.checkIns,
    clientBabyIds,
    deletedBabies,
  ).filter((c) => babyIds.has(c.babyId));

  const plans = lwwByBaby<Plan>(server.plans, client.plans, deletedBabies).filter((p) =>
    babyIds.has(p.babyId),
  );

  return { babies, logs, overrides, checkIns, plans, deletedLogIds, deletedBabyIds };
}

/**
 * Order-insensitive identity of a snapshot (ids + updatedAt), used to decide
 * whether a reconciliation push is needed. Deliberately ignores payload key
 * order, which differs between local objects and jsonb roundtrips.
 */
export function snapshotFingerprint(s: SyncSnapshot): string {
  const sorted = (rows: string[]) => [...rows].sort().join("|");
  return [
    sorted(s.babies.map((b) => `${b.id}@${b.updatedAt ?? ""}`)),
    sorted(s.logs.map((l) => `${l.id}@${l.updatedAt ?? ""}`)),
    sorted(s.overrides.map((o) => `${o.babyId}:${o.allergenId}@${o.status}`)),
    sorted(s.checkIns.map((c) => `${c.id}@${c.status}`)),
    sorted(s.plans.map((p) => `${p.babyId}@${p.updatedAt ?? ""}:${p.entries.length}`)),
    sorted(s.deletedLogIds),
    sorted(s.deletedBabyIds),
  ].join("||");
}

/**
 * Short hash of the fingerprint. `GET /api/sync?probe=1` returns just this,
 * so a polling tab can ask "did anything change?" in ~60 bytes instead of
 * downloading the whole snapshot every time.
 */
export function snapshotVersion(s: SyncSnapshot): string {
  const str = snapshotFingerprint(s);
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export const EMPTY_SNAPSHOT: SyncSnapshot = {
  babies: [],
  logs: [],
  overrides: [],
  checkIns: [],
  plans: [],
  deletedLogIds: [],
  deletedBabyIds: [],
};
