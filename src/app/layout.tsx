import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { BRAND, BRAND_TAGLINE } from "@/lib/brand";
import { AppNav } from "@/components/AppNav";
import { MobileTabBar } from "@/components/MobileTabBar";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { SyncProvider } from "@/components/SyncProvider";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${BRAND} — ${BRAND_TAGLINE}`,
    template: `%s · ${BRAND}`,
  },
  description:
    "A free, open, science-based guide for starting your baby on solid foods: exact safe textures for every food, dynamic daily recommendations, and allergy playbooks grounded in NIAID and AAP guidance.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#1E7A52",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${figtree.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <ServiceWorkerRegister />
        <SyncProvider />
        <AppNav />
        <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6">{children}</main>
        <MobileTabBar />
        <footer className="border-t px-4 py-6 pb-24 text-center text-xs text-muted-foreground md:pb-6">
          <p className="mx-auto max-w-2xl">
            {BRAND} is a free educational guide, not medical advice. Every baby is different —
            always follow your pediatrician&apos;s guidance. In an emergency, call 911.
          </p>
          <p className="mt-2">
            <Link href="/about" className="underline underline-offset-2">
              Sources &amp; methodology
            </Link>{" "}
            ·{" "}
            <Link href="/safety" className="underline underline-offset-2">
              Gagging vs. choking &amp; emergencies
            </Link>{" "}
            ·{" "}
            <Link href="/account" className="underline underline-offset-2">
              Account &amp; sync
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
