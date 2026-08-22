import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";
import { authEnabled, getAuth } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";

const subSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({ p256dh: z.string(), auth: z.string() }),
});

export async function POST(req: Request) {
  if (!authEnabled) return Response.json({ error: "Not configured." }, { status: 404 });
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) return Response.json({ error: "Sign in required." }, { status: 401 });

  const parsed = subSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid subscription." }, { status: 400 });

  const db = getDb();
  await db
    .insert(schema.pushSubscriptions)
    .values({ endpoint: parsed.data.endpoint, userId: session.user.id, keys: parsed.data.keys })
    .onConflictDoUpdate({
      target: schema.pushSubscriptions.endpoint,
      set: { userId: session.user.id, keys: parsed.data.keys },
    });
  return Response.json({ ok: true }, { status: 201 });
}

export async function DELETE(req: Request) {
  if (!authEnabled) return Response.json({ error: "Not configured." }, { status: 404 });
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) return Response.json({ error: "Sign in required." }, { status: 401 });
  const { endpoint } = await req.json().catch(() => ({}));
  if (typeof endpoint !== "string") return Response.json({ error: "endpoint required" }, { status: 400 });
  await getDb().delete(schema.pushSubscriptions).where(eq(schema.pushSubscriptions.endpoint, endpoint));
  return Response.json({ ok: true });
}
