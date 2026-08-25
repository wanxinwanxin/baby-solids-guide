"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LOCALE, type Locale, type Msgs, pick } from "./config";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/**
 * Bridges the server-read cookie locale into client components. The root
 * layout reads the cookie and passes it here; the language toggle rewrites
 * the cookie and calls router.refresh(), which re-renders the layout with
 * the new value — no client-side locale state to keep in sync.
 */
export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Resolve a message module against the current locale. */
export function useMsgs<T extends Msgs>(msgs: T): { [K in keyof T]: string } {
  return pick(msgs, useLocale());
}
