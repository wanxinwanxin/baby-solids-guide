import { headers } from "next/headers";
import { z } from "zod";
import { authEnabled, getAuth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import {
  allergenOverrideSchema,
  babyProfileSchema,
  checkInSchema,
  exposureLogSchema,
  planSchema,
} from "@/lib/storage/schema";
import type { SyncSnapshot } from "@/lib/storage/store";
import { mergeSnapshots } from "@/lib/sync/merge";
import { loadSnapshot, saveSnapshot } from "@/lib/sync/server";

const snapshotSchema = z.object({
  babies: z.array(babyProfileSchema).max(20),
  logs: z.array(exposureLogSchema).max(20000),
  overrides: z.array(allergenOverrideSchema).max(500),
  checkIns: z.array(checkInSchema).max(2000),
  plans: z.array(planSchema).max(20),
  deletedLogIds: z.array(z.string()).max(20000),
  deletedBabyIds: z.array(z.string()).max(100),
});

async function requireUser() {
  if (!authEnabled) return null;
  const session = await getAuth().api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

export async function GET() {
  const user = await requireUser();
  if (!user) return Response.json({ error: "Sign in required." }, { status: 401 });
  const snapshot = await loadSnapshot(getDb(), user.id);
  return Response.json({ snapshot });
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
  return Response.json({ snapshot: merged });
}
