import { sql } from "drizzle-orm";
import { dbConfigured, getDb, schema } from "@/lib/db";

/**
 * ROADMAP D5 option 2 — aggregate page counting. Receives a beacon with a
 * pathname and increments (UTC day, path). Stores nothing else: no cookies,
 * no IP, no user agent, no user linkage. The client sends only real
 * navigations (prefetches never fire the beacon).
 */

/** Pathnames only: absolute, short, no query, no dots, no percent-escapes. */
const PATH_RE = /^\/[a-zA-Z0-9\-_/]{0,199}$/;

/**
 * Collapse token-bearing routes so secrets can never land in the table.
 * /join/<inviteToken> is the only public route that carries one.
 */
function normalize(path: string): string {
  if (path.startsWith("/join/") || path === "/join") return "/join";
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

export async function POST(req: Request) {
  if (!dbConfigured()) return new Response(null, { status: 204 });

  let path: string;
  try {
    const body = (await req.json()) as { path?: unknown };
    if (typeof body.path !== "string" || !PATH_RE.test(body.path)) {
      return Response.json({ error: "Bad path." }, { status: 400 });
    }
    path = normalize(body.path);
  } catch {
    return Response.json({ error: "Bad body." }, { status: 400 });
  }

  const day = new Date().toISOString().slice(0, 10);
  const db = getDb();
  await db
    .insert(schema.pageViews)
    .values({ day, path, n: 1 })
    .onConflictDoUpdate({
      target: [schema.pageViews.day, schema.pageViews.path],
      set: { n: sql`${schema.pageViews.n} + 1` },
    });

  return new Response(null, { status: 204 });
}
