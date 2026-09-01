"use client";

import Link from"next/link";
import { useEffect, useState } from"react";
import { authClient, signIn, signOut, signUp, useSession } from"@/lib/auth-client";
import { useAuthEnabled, useSyncStatus } from"@/components/SyncProvider";
import { useHydrated } from"@/lib/hooks";
import { CaregiverModeCard } from"@/components/CaregiverModeCard";
import { FamilyCard } from"@/components/FamilyCard";
import { InstallPrompt } from"@/components/InstallPrompt";
import { Alert, AlertDescription, AlertTitle } from"@/components/ui/alert";
import { Button } from"@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { cn } from"@/lib/utils";
import { fmt, msg } from"@/lib/i18n/config";
import { useLocale, useMsgs } from"@/lib/i18n/LocaleProvider";
import { accountMsgs, SYNC_STATUS_LABELS } from"@/lib/i18n/messages/account";

export default function AccountPage() {
  const t = useMsgs(accountMsgs);
  const locale = useLocale();
  const hydrated = useHydrated();
  const enabled = useAuthEnabled();
  const { data: session, isPending } = useSession();
  const syncState = useSyncStatus((s) => s.state);
  const lastSyncedAt = useSyncStatus((s) => s.lastSyncedAt);

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
        <CaregiverModeCard />
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
            <p className="text-muted-foreground text-xs">
              {lastSyncedAt === null
                ? t.lastCheckedNever
                : fmt(syncState === "error" ? t.lastCheckedStale : t.lastChecked, {
                    time: new Date(lastSyncedAt).toLocaleTimeString(
                      locale === "zh" ? "zh-CN" : undefined,
                      { hour: "2-digit", minute: "2-digit" },
                    ),
                  })}
            </p>
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
        <CaregiverModeCard />
        <InstallPrompt persistent />
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

      <GoogleSignIn />

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
          className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/85"
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

      <p className="text-xs text-muted-foreground">{t.firstSignInNote}</p>

      <CaregiverModeCard />
      <InstallPrompt persistent />
    </div>
  );
}

let googleEnabledCache: boolean | null = null;

/** Mirrors useAuthEnabled: the button only exists where Google OAuth is configured. */
function useGoogleEnabled(): boolean {
  const [google, setGoogle] = useState(googleEnabledCache ?? false);
  useEffect(() => {
    if (googleEnabledCache !== null) return;
    fetch("/api/auth/status")
      .then((r) => r.json())
      .then((d) => {
        googleEnabledCache = !!d.google;
        setGoogle(googleEnabledCache);
      })
      .catch(() => {
        googleEnabledCache = false;
      });
  }, []);
  return google;
}

/** Google's 4-color "G", inlined so the page stays self-contained (no CDN). */
function GoogleGlyph() {
  return (
    <svg viewBox="0 0 48 48"className="size-5"aria-hidden="true"focusable="false">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

/**
 * Primary sign-in path: full-width Google button above the email form, with an
 * "or" divider between them. Renders nothing when Google OAuth isn't configured.
 */
function GoogleSignIn() {
  const t = useMsgs(accountMsgs);
  const google = useGoogleEnabled();
  if (!google) return null;
  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => void signIn.social({ provider: "google" })}
        className="h-11 w-full gap-3 border-border bg-card text-base font-medium text-foreground hover:bg-muted dark:bg-card dark:hover:bg-muted"
      >
        <GoogleGlyph />
        {t.continueGoogle}
      </Button>
      <div className="flex items-center gap-3">
        <span aria-hidden="true"className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t.orDivider}</span>
        <span aria-hidden="true"className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
