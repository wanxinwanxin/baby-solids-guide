"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, signUp, useSession } from "@/lib/auth-client";
import { useAuthEnabled, useSyncStatus } from "@/components/SyncProvider";
import { useHydrated } from "@/lib/hooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const STATUS_LABEL = {
  off: "",
  idle: "",
  syncing: "syncing…",
  synced: "synced ✓",
  error: "sync error — will retry",
} as const;

export default function AccountPage() {
  const hydrated = useHydrated();
  const enabled = useAuthEnabled();
  const { data: session, isPending } = useSession();
  const syncState = useSyncStatus((s) => s.state);

  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!hydrated) return null;

  if (!enabled) {
    return (
      <div className="mx-auto max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Account</h1>
        <Alert>
          <AlertTitle>Sync isn&apos;t configured in this deployment</AlertTitle>
          <AlertDescription>
            Your data still lives safely on this device, and you can{" "}
            <Link href="/history" className="underline underline-offset-2">
              export a backup
            </Link>{" "}
            any time.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  async function submit() {
    setBusy(true);
    setError(null);
    const action =
      mode === "sign-in"
        ? signIn.email({ email, password })
        : signUp.email({ email, password, name: email.split("@")[0] });
    const { error: err } = await action;
    if (err) setError(err.message ?? "Something went wrong — try again.");
    setBusy(false);
  }

  async function downloadServerData() {
    const res = await fetch("/api/sync");
    if (!res.ok) return;
    const { snapshot } = await res.json();
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `opensolids-server-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function deleteAccount() {
    const res = await fetch("/api/account", { method: "DELETE" });
    if (res.ok) {
      await signOut();
      setConfirmDelete(false);
    }
  }

  if (session?.user) {
    return (
      <div className="mx-auto max-w-md space-y-5">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-bold">Account</h1>
          <span className="text-xs text-emerald-700 dark:text-emerald-400">{STATUS_LABEL[syncState]}</span>
        </div>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{session.user.email}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Your babies&apos; profiles and logs sync to this account and follow you to any
              device. Nothing else is stored — no analytics, no tracking.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={downloadServerData}>
                Download my data from the server
              </Button>
              <Button variant="outline" size="sm" onClick={() => void signOut()}>
                Sign out
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="border-t pt-4">
          {confirmDelete ? (
            <div className="space-y-2 text-sm">
              <p>
                Delete the account and ALL server-side data? Data on this device stays until you
                clear it from History.
              </p>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm" onClick={deleteAccount}>
                  Yes, delete my account
                </Button>
                <Button variant="outline" size="sm" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              Delete account and server data
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="text-2xl font-bold">Save your data</h1>
      <p className="text-sm text-muted-foreground">
        An account keeps {`your baby's`} history safe across devices and browser cleanups. Free,
        no ads, no tracking — and guest mode keeps working if you skip this.
      </p>

      <div className="flex gap-1 rounded-lg border p-1" role="tablist">
        {(["sign-in", "sign-up"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium",
              mode === m ? "bg-emerald-700 text-white" : "text-muted-foreground",
            )}
          >
            {m === "sign-in" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <label className="block space-y-1 text-sm">
          <span className="font-medium">Email</span>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-medium">Password</span>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
          />
        </label>
        {error && <p className="text-sm text-red-700 dark:text-red-400">{error}</p>}
        <Button
          type="submit"
          disabled={busy || isPending}
          className="w-full bg-emerald-700 text-white hover:bg-emerald-800"
        >
          {mode === "sign-in" ? "Sign in" : "Create account"}
        </Button>
      </form>

      <GoogleButton />

      <p className="text-xs text-muted-foreground">
        On first sign-in, everything on this device is uploaded and merged with anything already
        in the account — nothing is lost in either direction.
      </p>
    </div>
  );
}

function GoogleButton() {
  const [google, setGoogle] = useState(false);
  useState(() => {
    fetch("/api/auth/status")
      .then((r) => r.json())
      .then((d) => setGoogle(!!d.google))
      .catch(() => {});
  });
  if (!google) return null;
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => void signIn.social({ provider: "google" })}
    >
      Continue with Google
    </Button>
  );
}
