"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { BRAND } from "@/lib/brand";
import { useHydrated } from "@/lib/hooks";
import { fmt } from "@/lib/i18n/config";
import { useMsgs } from "@/lib/i18n/LocaleProvider";
import { installMsgs } from "@/lib/i18n/messages/install";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Phase 8C — "add to home screen", the two ways it actually works.
 *
 * Chromium (Android, desktop Chrome/Edge) fires `beforeinstallprompt`, which we
 * stash and replay from a real button — one tap, native install dialog.
 *
 * iOS Safari does NOT implement `beforeinstallprompt` (WebKit has never shipped
 * it, and there is no other install API), so a programmatic install is
 * impossible there. The only path is Share → Add to Home Screen, so we show the
 * steps with the actual Share glyph inline. No third-party workaround changes
 * this; the instruction card IS the iOS install flow.
 *
 * Renders nothing when the app is already installed (display-mode: standalone /
 * navigator.standalone), when neither path applies (desktop Safari, Firefox), or
 * when the parent dismissed it before.
 */

const DISMISS_KEY = "opensolids.install-prompt-dismissed";

/** The Chromium-only event; not in lib.dom, so we describe the bits we use. */
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/*
 * `beforeinstallprompt` fires early — often before this component mounts — so the
 * listener lives at module scope and the event is replayed to subscribers.
 */
let deferred: BeforeInstallPromptEvent | null = null;
const subscribers = new Set<() => void>();

function publish() {
  for (const fn of subscribers) fn();
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // suppress Chrome's own mini-infobar; we drive the prompt
    deferred = e as BeforeInstallPromptEvent;
    publish();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    publish();
  });
}

function subscribe(fn: () => void) {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}

/** Server and first client render agree: no captured event yet. */
const noDeferred = () => null;
const alwaysFalse = () => false;
const neverChanges = () => () => {};

/** Standalone-ness flips if the same document is adopted into an app window. */
function subscribeStandalone(fn: () => void) {
  const mq = window.matchMedia?.("(display-mode: standalone)");
  mq?.addEventListener("change", fn);
  return () => mq?.removeEventListener("change", fn);
}

const readIos = () => isIosDevice(window.navigator);
const readStandalone = () => isStandaloneDisplay(window);

/** iPhone/iPad/iPod, plus iPadOS 13+ which masquerades as a Mac. */
export function isIosDevice(nav: Navigator): boolean {
  if (/iPhone|iPad|iPod/.test(nav.userAgent)) return true;
  return /Macintosh/.test(nav.userAgent) && nav.maxTouchPoints > 1;
}

/** Already launched from the home screen / installed app window. */
export function isStandaloneDisplay(win: Window): boolean {
  if (win.matchMedia?.("(display-mode: standalone)").matches) return true;
  return (win.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(DISMISS_KEY) !== null;
  } catch {
    return false; // private mode / storage blocked — just show it
  }
}

function writeDismissed() {
  try {
    window.localStorage.setItem(DISMISS_KEY, new Date().toISOString());
  } catch {
    /* nothing to persist to; the in-memory state still hides it */
  }
}

function ShareGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
    >
      <path d="M12 3.5v11" />
      <path d="M8.4 7.1 12 3.5l3.6 3.6" />
      <path d="M7.5 10.5H6a2 2 0 0 0-2 2v6.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6.5a2 2 0 0 0-2-2h-1.5" />
    </svg>
  );
}

function AddSquareGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <path d="M12 8.2v7.6M8.2 12h7.6" />
    </svg>
  );
}

function Step({
  n,
  glyph,
  children,
}: {
  n: number;
  glyph?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2">
      <span className="font-data flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] text-secondary-foreground">
        {n}
      </span>
      {glyph}
      <span>{children}</span>
    </li>
  );
}

export function InstallPrompt({
  className,
  persistent = false,
}: {
  /** Extra classes on the wrapping Alert. */
  className?: string;
  /** Settings-style surfaces (/account) always offer it and skip the dismiss control. */
  persistent?: boolean;
}) {
  const t = useMsgs(installMsgs);
  const hydrated = useHydrated();
  const promptEvent = useSyncExternalStore(subscribe, () => deferred, noDeferred);

  // Browser facts, read through useSyncExternalStore so the server snapshot is
  // always the "show nothing" one and the client reads the real value.
  const ios = useSyncExternalStore(neverChanges, readIos, alwaysFalse);
  const installed = useSyncExternalStore(subscribeStandalone, readStandalone, alwaysFalse);
  const storedDismissal = useSyncExternalStore(neverChanges, readDismissed, alwaysFalse);

  const [dismissedNow, setDismissedNow] = useState(false);
  const dismissed = dismissedNow || storedDismissal;

  const dismiss = useCallback(() => {
    setDismissedNow(true);
    writeDismissed();
  }, []);

  const install = useCallback(async () => {
    if (!deferred) return;
    const event = deferred;
    try {
      await event.prompt();
      const { outcome } = await event.userChoice;
      if (outcome === "accepted") {
        deferred = null;
        publish();
      }
    } catch {
      /* the event can only be used once; leave the card up either way */
    }
  }, []);

  // Nothing before hydration: the answer depends on UA/storage, and a card that
  // pops in on the server render would shift the page under the reader.
  if (!hydrated || installed) return null;
  if (dismissed && !persistent) return null;

  const alertClass = cn("border-primary/50 bg-secondary/50", className);

  if (promptEvent) {
    return (
      <Alert className={alertClass}>
        <AlertTitle>{fmt(t.androidTitle, { brand: BRAND })}</AlertTitle>
        <AlertDescription className="flex flex-wrap items-center gap-3">
          <span>{t.androidBody}</span>
          <Button size="sm" onClick={() => void install()}>
            {t.install}
          </Button>
          {!persistent && (
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex min-h-11 items-center text-xs underline underline-offset-2"
            >
              {t.dismiss}
            </button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  // No install event and not iOS → desktop Safari, Firefox, or already-dismissed
  // Chromium. There is nothing useful to say.
  if (!ios) return null;

  return (
    <Alert className={alertClass}>
      <AlertTitle>{fmt(t.iosTitle, { brand: BRAND })}</AlertTitle>
      <AlertDescription className="space-y-2">
        {/* span, not p: AlertDescription adds mb-4 to non-final <p> children. */}
        <span className="block">{t.iosBody}</span>
        <ol className="space-y-1.5 text-foreground/90">
          <Step n={1} glyph={<ShareGlyph />}>
            {t.iosStep1}
          </Step>
          <Step n={2} glyph={<AddSquareGlyph />}>
            {t.iosStep2}
          </Step>
          <Step n={3}>{t.iosStep3}</Step>
        </ol>
        {!persistent && (
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex min-h-11 items-center text-xs underline underline-offset-2"
          >
            {t.dismiss}
          </button>
        )}
      </AlertDescription>
    </Alert>
  );
}
