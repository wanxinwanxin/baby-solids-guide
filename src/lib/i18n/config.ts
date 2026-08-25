/**
 * i18n core (isomorphic — safe in server and client components).
 *
 * The locale is a cookie (`lang`), not a URL segment, so every existing
 * route, the sitemap, auth callbacks, and offline caching keep working.
 * Server components read it via `getLocale()` (src/lib/i18n/server.ts);
 * client components via `useLocale()` (src/lib/i18n/LocaleProvider.tsx).
 *
 * UI strings live in per-surface message modules (src/lib/i18n/messages/*)
 * as `{ en, zh }` records; content prose is localized through the overlay
 * system in src/lib/l10n.ts.
 */

export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "lang";
/** ~1 year; refreshed on every toggle. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** One translatable string. */
export type Msg = { en: string; zh: string };

/** A per-surface message module: flat map of ids → translations. */
export type Msgs = Record<string, Msg>;

/** Resolve a single message. */
export function msg(m: Msg, locale: Locale): string {
  return m[locale];
}

/** Resolve a whole message module to plain strings for one locale. */
export function pick<T extends Msgs>(msgs: T, locale: Locale): { [K in keyof T]: string } {
  const out = {} as { [K in keyof T]: string };
  for (const key in msgs) out[key] = msgs[key][locale];
  return out;
}

/** Tiny `{name}` interpolation for count/name placeholders. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}
