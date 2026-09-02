import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import Link from "next/link";
import { BRAND, BRAND_TAGLINE, SUPPORT_EMAIL } from "@/lib/brand";
import { AppNav } from "@/components/AppNav";
import { MobileTabBar } from "@/components/MobileTabBar";
import { PageViewPing } from "@/components/PageViewPing";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { SyncProvider } from "@/components/SyncProvider";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { fmt, pick } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { chromeMsgs } from "@/lib/i18n/messages/chrome";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
// CJK glyph fallback for zh — served in unicode-range chunks, so English
// visitors download nothing extra.
const notoSansSC = Noto_Sans_SC({ variable: "--font-noto-sc", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(chromeMsgs, locale);
  const tagline = locale === "en" ? BRAND_TAGLINE : t.tagline;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: {
      default: `${BRAND} — ${tagline}`,
      template: `%s · ${BRAND}`,
    },
    description: t.siteDescription,
    openGraph: { siteName: BRAND, type: "website" },
    twitter: { card: "summary_large_image" },
    manifest: "/manifest.webmanifest",
    // The label under the icon when iOS adds this to the home screen — without
    // it Safari uses the full <title>, which is far too long to fit.
    appleWebApp: { title: BRAND, capable: true, statusBarStyle: "default" },
  };
}

export const viewport: Viewport = {
  themeColor: "#1E7A52",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const t = pick(chromeMsgs, locale);
  return (
    <html
      lang={locale === "zh" ? "zh-CN" : "en"}
      className={`${bricolage.variable} ${figtree.variable} ${jetbrainsMono.variable} ${notoSansSC.variable}`}
    >
      <body className="antialiased">
        <LocaleProvider locale={locale}>
          <ServiceWorkerRegister />
          <PageViewPing />
          <SyncProvider />
          <AppNav />
          <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6">{children}</main>
          <MobileTabBar />
          <footer className="border-t px-4 py-6 pb-24 text-center text-xs text-muted-foreground md:pb-6">
            <p className="mx-auto max-w-2xl">{fmt(t.footerDisclaimer, { brand: BRAND })}</p>
            <p className="mt-2">
              <Link href="/about" className="underline underline-offset-2">
                {t.footerSources}
              </Link>{" "}
              ·{" "}
              <Link href="/safety" className="underline underline-offset-2">
                {t.footerSafety}
              </Link>{" "}
              ·{" "}
              <Link href="/account" className="underline underline-offset-2">
                {t.footerAccount}
              </Link>{" "}
              ·{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="underline underline-offset-2">
                {t.footerContact}
              </a>
            </p>
          </footer>
        </LocaleProvider>
      </body>
    </html>
  );
}
