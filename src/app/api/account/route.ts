import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { authEnabled, getAuth } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";

/** Hard-cascade account deletion — user row plus everything referencing it. */
export async function DELETE() {
  if (!authEnabled) return Response.json({ error: "Auth is not configured." }, { status: 404 });
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) return Response.json({ error: "Sign in required." }, { status: 401 });

  await getDb().delete(schema.user).where(eq(schema.user.id, session.user.id));
  return Response.json({ ok: true });
}
