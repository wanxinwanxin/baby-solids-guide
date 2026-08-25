import { headers } from "next/headers";
import { authEnabled, getAuth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { deleteUserWithHandoff } from "@/lib/family";

/**
 * Hard-cascade account deletion — user row plus everything referencing it.
 * Family-sharing exception (D4): babies with co-parents are handed off
 * instead of destroyed (see src/lib/family.ts).
 */
export async function DELETE() {
  if (!authEnabled) return Response.json({ error: "Auth is not configured." }, { status: 404 });
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session?.user) return Response.json({ error: "Sign in required." }, { status: 401 });

  await deleteUserWithHandoff(getDb(), session.user.id);
  return Response.json({ ok: true });
}
