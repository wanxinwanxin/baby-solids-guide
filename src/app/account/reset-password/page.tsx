"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ResetPasswordForm() {
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
        This reset link is invalid or has expired.{" "}
        <Link href="/account" className="text-primary underline underline-offset-2">
          Request a new one from the sign-in page.
        </Link>
      </p>
    );
  }

  if (done) {
    return (
      <p className="text-sm">
        Password updated.{" "}
        <Link href="/account" className="text-primary underline underline-offset-2">
          Sign in with it now →
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
            if (err) setError(err.message ?? "Couldn't reset the password — the link may have expired.");
            else setDone(true);
            setBusy(false);
          });
      }}
    >
      <label className="block space-y-1 text-sm">
        <span className="font-medium">New password</span>
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
        Set new password
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="text-2xl font-bold">Reset password</h1>
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
