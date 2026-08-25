"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FamilyBaby = {
  babyId: string;
  nickname: string;
  myRole: "owner" | "member";
  members: { userId: string; email: string; name: string | null; role: string }[];
};

/**
 * D4 — family sharing controls on the account page: see who shares each
 * baby, invite a co-parent (owner only), remove a member (owner only).
 */
export function FamilyCard({ myUserId }: { myUserId: string }) {
  const [babies, setBabies] = useState<FamilyBaby[] | null>(null);
  const [inviteUrls, setInviteUrls] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(() => {
    fetch("/api/family")
      .then((r) => (r.ok ? r.json() : { babies: [] }))
      .then((d) => setBabies(d.babies ?? []))
      .catch(() => setBabies([]));
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);

  async function invite(babyId: string) {
    setBusy(true);
    const res = await fetch(`/api/babies/${babyId}/invites`, { method: "POST" });
    if (res.ok) {
      const { url } = await res.json();
      setInviteUrls((m) => ({ ...m, [babyId]: url }));
    }
    setBusy(false);
  }

  async function copy(babyId: string) {
    try {
      await navigator.clipboard.writeText(inviteUrls[babyId]);
      setCopied(babyId);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // The URL stays visible for manual copying.
    }
  }

  async function removeMember(babyId: string, userId: string) {
    setBusy(true);
    await fetch(`/api/babies/${babyId}/members?userId=${encodeURIComponent(userId)}`, {
      method: "DELETE",
    });
    refresh();
    setBusy(false);
  }

  if (!babies || babies.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Family</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p className="text-muted-foreground">
          Co-parents sign in with their own account and see the same baby — every log flows both
          ways. Co-parents have full access, including editing and deleting.
        </p>
        {babies.map((b) => (
          <div key={b.babyId} className="space-y-2.5 rounded-xl border p-3.5">
            <p className="font-semibold">{b.nickname}</p>
            <ul className="space-y-1.5">
              {b.members.map((m) => (
                <li key={m.userId} className="flex flex-wrap items-center gap-2">
                  <span className="min-w-0 break-all">{m.email}</span>
                  <Badge variant={m.role === "owner" ? "secondary" : "outline"}>{m.role}</Badge>
                  {m.userId === myUserId && <Badge variant="outline">you</Badge>}
                  {b.myRole === "owner" && m.userId !== myUserId && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void removeMember(b.babyId, m.userId)}
                      className="text-xs text-muted-foreground underline underline-offset-2 hover:text-destructive"
                    >
                      remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {b.myRole === "owner" &&
              (inviteUrls[b.babyId] ? (
                <div className="space-y-1.5">
                  <p className="text-xs text-muted-foreground">
                    Send this link to your co-parent — it works for 72 hours:
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <code className="min-w-0 flex-1 break-all rounded-lg bg-muted px-2.5 py-1.5 text-xs">
                      {inviteUrls[b.babyId]}
                    </code>
                    <Button variant="outline" size="sm" onClick={() => void copy(b.babyId)}>
                      {copied === b.babyId ? "Copied ✓" : "Copy"}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button variant="outline" size="sm" disabled={busy} onClick={() => void invite(b.babyId)}>
                  Invite a co-parent
                </Button>
              ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
