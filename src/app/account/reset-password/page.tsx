"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { resetPasswordMsgs } from "@/lib/i18n/messages/account";

function ResetPasswordForm() {
  const t = useMsgs(resetPasswordMsgs);
  const params = useSearchParams();
  const token = params.get("token");
  const linkError = params.get("error");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  if (linkError || !token) {
    return (
      <p className="text-sm text-muted-foreground">
        {t.linkInvalid}
        <Link href="/account" className="text-primary underline underline-offset-2">
          {t.linkInvalidLink}
        </Link>
      </p>
    );
  }

  if (done) {
    return (
      <p className="text-sm">
        {t.updated}
        <Link href="/account" className="text-primary underline underline-offset-2">
          {t.updatedLink}
        </Link>
      </p>
    );
  }

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        setBusy(true);
        setError(null);
        void authClient
          .resetPassword({ newPassword: password, token })
          .then(({ error: err }) => {
            if (err) setError(err.message ?? t.resetFailed);
            else setDone(true);
            setBusy(false);
          });
      }}
    >
      <label className="block space-y-1 text-sm">
        <span className="font-medium">{t.newPasswordLabel}</span>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
        />
      </label>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={busy} className="w-full">
        {t.submit}
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  const t = useMsgs(resetPasswordMsgs);
  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
