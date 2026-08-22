import { and, isNull, lte } from "drizzle-orm";
import webpush from "web-push";
import { getDb, schema } from "@/lib/db";

/**
 * Phase 8B — reminder delivery. Called every 5 minutes by a scheduled job
 * with the CRON_SECRET header. Sends every due, unsent reminder: web push
 * first, one attempt per subscription; marks sent regardless of partial
 * failures (at-most-once beats duplicate pings for this use case).
 */

type ReminderPayload = { title: string; body: string; url?: string };

export async function POST(req: Request) {
  if (!process.env.CRON_SECRET || req.headers.get("x-cron-secret") !== process.env.CRON_SECRET) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return Response.json({ error: "No database configured." }, { status: 503 });
  }

  const pushConfigured =
    !!process.env.VAPID_PUBLIC_KEY && !!process.env.VAPID_PRIVATE_KEY && !!process.env.VAPID_SUBJECT;
  if (pushConfigured) {
    webpush.setVapidDetails(
      process.env.VAPID_SUBJECT!,
      process.env.VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!,
    );
  }

  const db = getDb();
  const due = await db
    .select()
    .from(schema.reminders)
    .where(and(lte(schema.reminders.dueAt, new Date()), isNull(schema.reminders.sentAt)))
    .limit(200);

  let sent = 0;
  let failed = 0;
  for (const reminder of due) {
    const payload = reminder.payload as ReminderPayload;
    if (pushConfigured) {
      const subs = await db
        .select()
        .from(schema.pushSubscriptions)
        .where(and(lte(schema.pushSubscriptions.createdAt, new Date())));
      const userSubs = subs.filter((s) => s.userId === reminder.userId);
      for (const sub of userSubs) {
        try {
          await webpush.sendNotification(
            { endpoint: sub.endpoint, keys: sub.keys as { p256dh: string; auth: string } },
            JSON.stringify(payload),
          );
          sent++;
        } catch (e) {
          failed++;
          // 404/410 = dead subscription — clean it up.
          const status = (e as { statusCode?: number }).statusCode;
          if (status === 404 || status === 410) {
            const { eq } = await import("drizzle-orm");
            await db
              .delete(schema.pushSubscriptions)
              .where(eq(schema.pushSubscriptions.endpoint, sub.endpoint));
          }
        }
      }
    }
    const { eq } = await import("drizzle-orm");
    await db
      .update(schema.reminders)
      .set({ sentAt: new Date() })
      .where(eq(schema.reminders.id, reminder.id));
  }

  return Response.json({ processed: due.length, sent, failed });
}
