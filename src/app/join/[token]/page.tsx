"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

type Preview = { nickname: string; invitedBy: string } | { error: string };

/**
 * D4 — invite landing page. Signed-out visitors are pointed at sign-in
 * first (the link stays good for 72 hours); signed-in visitors accept with
 * one tap and land on Today with the shared baby synced in.
 */
export default function JoinPage() {
  const params = useParams<{ token: string }>();
  const { data: session, isPending } = useSession();
  const [preview, setPreview] = useState<Preview | null>(null);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params?.token) return;
    fetch(`/api/invites/${params.token}`)
      .then(async (r) => setPreview(await r.json()))
      .catch(() => setPreview({ error: "Couldn't load this invite — check the link." }));
  }, [params?.token]);

  async function accept() {
    setAccepting(true);
    setError(null);
    const res = await fetch(`/api/invites/${params.token}`, { method: "POST" });
    if (res.ok) {
      // Deliberate full navigation (not router.push): remounting the app
      // remounts SyncProvider, which pulls the newly shared baby right away.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/today");
      return;
    }
    const body = await res.json().catch(() => null);
    setError(body?.error ?? "Couldn't accept the invite — try again.");
    setAccepting(false);
  }

  return (
    <div className="mx-auto max-w-md space-y-5 pt-8 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight">
        Join the family<span className="text-primary">.</span>
      </h1>
      {!preview ? (
        <p className="text-sm text-muted-foreground">Checking the invite…</p>
      ) : "error" in preview ? (
        <p className="text-sm text-muted-foreground">{preview.error}</p>
      ) : (
        <>
          <p className="text-[15px] leading-relaxed text-foreground/80">
            <span className="font-semibold">{preview.invitedBy}</span> invited you to co-parent{" "}
            <span className="font-semibold">{preview.nickname}</span>&apos;s food journey — same
            baby, same logs, your own account.
          </p>
          {isPending ? null : session?.user ? (
            <div className="space-y-3">
              <Button
                className="min-h-12 px-8 text-base font-semibold"
                disabled={accepting}
                onClick={() => void accept()}
              >
                Accept as {session.user.email}
              </Button>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          ) : (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                First,{" "}
                <Link href="/account" className="font-semibold text-primary underline underline-offset-2">
                  sign in or create your own account
                </Link>
                , then reopen this link — it&apos;s good for 72 hours.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
