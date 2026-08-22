import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { AppNav } from "@/components/AppNav";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "OpenSolids — free, science-based baby solids guide",
    template: "%s · OpenSolids",
  },
  description:
    "A free, open, science-based guide for starting your baby on solid foods: exact safe textures for every food, dynamic daily recommendations, and allergy playbooks grounded in NIAID and AAP guidance.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#047857",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ServiceWorkerRegister />
        <AppNav />
        <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6">{children}</main>
        <footer className="border-t px-4 py-6 text-center text-xs text-muted-foreground">
          <p className="mx-auto max-w-2xl">
            OpenSolids is a free educational guide, not medical advice. Every baby is different —
            always follow your pediatrician&apos;s guidance. In an emergency, call 911.
          </p>
          <p className="mt-2">
            <Link href="/about" className="underline underline-offset-2">
              Sources &amp; methodology
            </Link>{" "}
            ·{" "}
            <Link href="/safety" className="underline underline-offset-2">
              Gagging vs. choking &amp; emergencies
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
