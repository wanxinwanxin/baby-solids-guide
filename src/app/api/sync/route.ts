import { headers } from "next/headers";
import { z } from "zod";
import { authEnabled, getAuth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import {
  activityLogSchema,
  allergenOverrideSchema,
  babyProfileSchema,
  careLogSchema,
  checkInSchema,
  exposureLogSchema,
  planSchema,
  sleepSessionSchema,
} from "@/lib/storage/schema";
import type { SyncSnapshot } from "@/lib/storage/store";
import { mergeSnapshots, snapshotVersion } from "@/lib/sync/merge";
import { loadSnapshot, saveSnapshot } from "@/lib/sync/server";

const snapshotSchema = z.object({
  babies: z.array(babyProfileSchema).max(20),
  logs: z.array(exposureLogSchema).max(20000),
  overrides: z.array(allergenOverrideSchema).max(500),
  checkIns: z.array(checkInSchema).max(2000),
  plans: z.array(planSchema).max(20),
  deletedLogIds: z.array(z.string()).max(20000),
  deletedBabyIds: z.array(z.string()).max(100),
  // Sleep + care sync (2026-09-08): defaults keep pushes from older client
  // bundles valid — their empty arrays merge as "no local rows", so the
  // server copies survive untouched.
  sleepSessions: z.array(sleepSessionSchema).max(20000).default([]),
  careLogs: z.array(careLogSchema).max(20000).default([]),
  deletedSleepIds: z.array(z.string()).max(20000).default([]),
  deletedCareLogIds: z.array(z.string()).max(20000).default([]),
  // Reading-habit sync (2026-09-10); defaults keep older-client pushes valid.
  activityLogs: z.array(activityLogSchema).max(20000).default([]),
  deletedActivityIds: z.array(z.string()).max(20000).default([]),
});

async function requireUser() {
  if (!authEnabled) return null;
  const session = await getAuth().api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

export async function GET(req: Request) {
  const user = await requireUser();
  if (!user) return Response.json({ error: "Sign in required." }, { status: 401 });
  const snapshot = await loadSnapshot(getDb(), user.id);
  const version = snapshotVersion(snapshot);
  // ?probe=1 — "has anything changed?" for the visible-tab poll. Same DB read,
  // but the response is a hash instead of the whole snapshot.
  if (new URL(req.url).searchParams.get("probe") === "1") return Response.json({ version });
  return Response.json({ snapshot, version });
}

export async function POST(req: Request) {
  const user = await requireUser();
  if (!user) return Response.json({ error: "Sign in required." }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const parsed = snapshotSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: `Invalid snapshot: ${parsed.error.issues[0]?.message ?? "shape mismatch"}` },
      { status: 400 },
    );
  }

  const db = getDb();
  const server = await loadSnapshot(db, user.id);
  const merged = mergeSnapshots(server, parsed.data as SyncSnapshot);
  await saveSnapshot(db, user.id, merged);
  return Response.json({ snapshot: merged, version: snapshotVersion(merged) });
}
