import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, isLocale } from "@/lib/i18n/config";

/**
 * `?lang=zh` on any URL opens the app in that language and remembers it.
 *
 * The locale lives in a cookie, and a link cannot carry a cookie. A parent
 * who shares the app with a friend who reads Chinese would otherwise send
 * that friend to an English page. Share links carry the language instead,
 * this writes it to the cookie, and the redirect drops the parameter so the
 * address bar and every canonical URL stay as they were.
 *
 * Next 16 renamed the middleware file convention to `proxy` — see
 * node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md.
 */
export function proxy(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");
  const url = request.nextUrl.clone();
  url.searchParams.delete("lang");
  const response = NextResponse.redirect(url);
  // An unknown value still redirects, which strips the junk parameter and
  // leaves whatever language the reader already chose alone.
  if (isLocale(lang)) {
    response.cookies.set(LOCALE_COOKIE, lang, {
      path: "/",
      maxAge: LOCALE_COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }
  return response;
}

/**
 * Only requests that actually carry `?lang=` reach this file. Everything
 * else — every page, every API route, every static asset — is untouched.
 */
export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image).*)",
      has: [{ type: "query", key: "lang" }],
    },
  ],
};
