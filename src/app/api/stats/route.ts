import { count, countDistinct, desc, gte, sql } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";

/**
 * Owner-only aggregate usage stats, gated by the same CRON_SECRET the
 * reminder cron uses. Counts only rows that already exist for sync — no
 * per-user tracking, no events, nothing new collected, which keeps the
 * "no analytics, no tracking" promise intact. Guests (local-only users)
 * are invisible by design: their data never leaves the device.
 *
 *   curl -H "x-cron-secret: $CRON_SECRET" <site>/api/stats
 */
export async function GET(req: Request) {
  if (!process.env.CRON_SECRET || req.headers.get("x-cron-secret") !== process.env.CRON_SECRET) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return Response.json({ error: "No database configured." }, { status: 503 });
  }

  const db = getDb();
  const since = (days: number) => new Date(Date.now() - days * 86400000);

  const [users] = await db.select({ n: count() }).from(schema.user);
  const [babies] = await db.select({ n: count() }).from(schema.babies);
  const [logs] = await db.select({ n: count() }).from(schema.exposureLogs);
  const [checkIns] = await db.select({ n: count() }).from(schema.checkIns);
  const [plans] = await db.select({ n: count() }).from(schema.plans);
  const [pushSubs] = await db.select({ n: count() }).from(schema.pushSubscriptions);
  const [activeBabies7d] = await db
    .select({ n: countDistinct(schema.babies.userId) })
    .from(schema.babies)
    .where(gte(schema.babies.updatedAt, since(7)));
  const [activeLogs7d] = await db
    .select({ n: countDistinct(schema.exposureLogs.babyId) })
    .from(schema.exposureLogs)
    .where(gte(schema.exposureLogs.updatedAt, since(7)));
  const [activeLogs30d] = await db
    .select({ n: countDistinct(schema.exposureLogs.babyId) })
    .from(schema.exposureLogs)
    .where(gte(schema.exposureLogs.updatedAt, since(30)));
  const [newUsers7d] = await db
    .select({ n: count() })
    .from(schema.user)
    .where(gte(schema.user.createdAt, since(7)));
  const [verifiedUsers] = await db
    .select({ n: count() })
    .from(schema.user)
    .where(sql`${schema.user.emailVerified} = true`);

  // D5 option 2 — aggregate page views (path + UTC day, nothing else).
  const sinceDay = (days: number) => since(days).toISOString().slice(0, 10);
  const viewSum = sql<number>`coalesce(sum(${schema.pageViews.n}), 0)::int`;
  const [views7d] = await db
    .select({ n: viewSum })
    .from(schema.pageViews)
    .where(gte(schema.pageViews.day, sinceDay(7)));
  const [views30d] = await db
    .select({ n: viewSum })
    .from(schema.pageViews)
    .where(gte(schema.pageViews.day, sinceDay(30)));
  const topPaths7d = await db
    .select({ path: schema.pageViews.path, n: viewSum })
    .from(schema.pageViews)
    .where(gte(schema.pageViews.day, sinceDay(7)))
    .groupBy(schema.pageViews.path)
    .orderBy(desc(viewSum))
    .limit(15);

  return Response.json({
    note: "Signed-in accounts only — guests are local-first and never touch the server. Page views are aggregate (path + day), guests included, nothing individual.",
    pageViews7d: views7d.n,
    pageViews30d: views30d.n,
    topPaths7d,
    users: users.n,
    newUsers7d: newUsers7d.n,
    verifiedUsers: verifiedUsers.n,
    babies: babies.n,
    exposureLogs: logs.n,
    checkIns: checkIns.n,
    plans: plans.n,
    pushSubscriptions: pushSubs.n,
    usersSynced7d: activeBabies7d.n,
    babiesWithNewLogs7d: activeLogs7d.n,
    babiesWithNewLogs30d: activeLogs30d.n,
  });
}
