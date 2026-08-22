import { headers } from "next/headers";
import { z } from "zod";
import { authEnabled, getAuth } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";

const createSchema = z.object({
  reminders: z
    .array(
      z.object({
        kind: z.enum(["check-in", "maintenance"]),
        title: z.string().min(3).max(120),
        body: z.string().min(3).max(500),
        url: z.string().max(200).optional(),
        dueAt: z.string().datetime(),
      }),
    )
    .min(1)
    .max(20),
});

/** Phase 8B — queue server-delivered reminders for the signed-in user. */
export async function POST(req: Request) {
  if (!authEnabled) return Response.json({ error: "Not configured." }, { status: 404 });
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) return Response.json({ error: "Sign in required." }, { status: 401 });

  const parsed = createSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid reminders." }, { status: 400 });

  const db = getDb();
  for (const r of parsed.data.reminders) {
    await db.insert(schema.reminders).values({
      userId: session.user.id,
      kind: r.kind,
      payload: { title: r.title, body: r.body, url: r.url ?? "/today" },
      dueAt: new Date(r.dueAt),
    });
  }
  return Response.json({ queued: parsed.data.reminders.length });
}
