import type { SyncSnapshot } from "@/lib/storage/store";
import type { AllergenOverride, BabyProfile, CheckIn, ExposureLog, Plan } from "@/lib/storage/types";

/**
 * Phase 6 — snapshot merge with entity-level last-write-wins.
 *
 * Rules (ROADMAP Part II §6):
 * - babies + logs: per-id LWW on updatedAt (missing updatedAt = epoch);
 *   tombstones (deleted ids) always win — a delete is final.
 * - overrides / plans / check-ins: per-baby client-authoritative when the
 *   client snapshot contains that baby (these are user-set toggles and
 *   ephemera where "resurrection" is worse than last-client-wins); server
 *   rows survive for babies the client doesn't know about.
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

  const plans = perBabyClientAuthoritative<Plan>(
    server.plans,
    client.plans,
    clientBabyIds,
    deletedBabies,
  ).filter((p) => babyIds.has(p.babyId));

  return { babies, logs, overrides, checkIns, plans, deletedLogIds, deletedBabyIds };
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
