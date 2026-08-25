"use client";

import Link from"next/link";
import { useState } from"react";
import { authClient, signIn, signOut, signUp, useSession } from"@/lib/auth-client";
import { useAuthEnabled, useSyncStatus } from"@/components/SyncProvider";
import { useHydrated } from"@/lib/hooks";
import { FamilyCard } from"@/components/FamilyCard";
import { Alert, AlertDescription, AlertTitle } from"@/components/ui/alert";
import { Button } from"@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { cn } from"@/lib/utils";
import { msg } from"@/lib/i18n/config";
import { useLocale, useMsgs } from"@/lib/i18n/LocaleProvider";
import { accountMsgs, SYNC_STATUS_LABELS } from"@/lib/i18n/messages/account";

export default function AccountPage() {
  const t = useMsgs(accountMsgs);
  const locale = useLocale();
  const hydrated = useHydrated();
  const enabled = useAuthEnabled();
  const { data: session, isPending } = useSession();
  const syncState = useSyncStatus((s) => s.state);

  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!hydrated) return null;

  if (!enabled) {
    return (
      <div className="mx-auto max-w-md space-y-4">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <Alert>
          <AlertTitle>{t.noSyncTitle}</AlertTitle>
          <AlertDescription>
            {t.noSyncBefore}
            <Link href="/history"className="underline underline-offset-2">
              {t.noSyncLink}
            </Link>
            {t.noSyncAfter}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  async function submit() {
    setBusy(true);
    setError(null);
    setNotice(null);
    const action =
      mode === "sign-in"
        ? signIn.email({ email, password })
        : signUp.email({ email, password, name: email.split("@")[0] });
    const { error: err } = await action;
    if (err) setError(err.message ?? t.genericError);
    setBusy(false);
  }

  async function requestReset() {
    if (!email) {
      setError(t.resetNeedEmail);
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    const { error: err } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/account/reset-password",
    });
    if (err) setError(err.message ?? t.resetSendError);
    else setNotice(t.resetSent);
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
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <span className="text-xs text-primary">{msg(SYNC_STATUS_LABELS[syncState], locale)}</span>
        </div>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{session.user.email}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">{t.syncedExplainer}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline"size="sm"onClick={downloadServerData}>
                {t.downloadData}
              </Button>
              <Button variant="outline"size="sm"onClick={() => void signOut()}>
                {t.signOut}
              </Button>
            </div>
          </CardContent>
        </Card>
        <FamilyCard myUserId={session.user.id} />
        <div className="border-t pt-4">
          {confirmDelete ? (
            <div className="space-y-2 text-sm">
              <p>{t.deleteConfirmBody}</p>
              <div className="flex gap-2">
                <Button variant="destructive"size="sm"onClick={deleteAccount}>
                  {t.deleteYes}
                </Button>
                <Button variant="outline"size="sm"onClick={() => setConfirmDelete(false)}>
                  {t.cancel}
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              {t.deleteLink}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="text-2xl font-bold">{t.saveTitle}</h1>
      <p className="text-sm text-muted-foreground">{t.saveLede}</p>

      <div className="flex gap-1 rounded-lg border p-1"role="tablist">
        {(["sign-in", "sign-up"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium",
              mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            {m === "sign-in" ? t.tabSignIn : t.tabCreate}
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
          <span className="font-medium">{t.emailLabel}</span>
          <Input type="email"value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-medium">{t.passwordLabel}</span>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
          />
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {notice && <p className="text-sm text-primary">{notice}</p>}
        <Button
          type="submit"
          disabled={busy || isPending}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/85"
        >
          {mode === "sign-in" ? t.tabSignIn : t.tabCreate}
        </Button>
        {mode === "sign-in" && (
          <button
            type="button"
            onClick={() => void requestReset()}
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            {t.forgotPassword}
          </button>
        )}
      </form>

      <GoogleButton />

      <p className="text-xs text-muted-foreground">{t.firstSignInNote}</p>
    </div>
  );
}

function GoogleButton() {
  const t = useMsgs(accountMsgs);
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
      {t.continueGoogle}
    </Button>
  );
}
