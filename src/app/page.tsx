import Link from "next/link";
import { allFoods } from "../../content/foods";
import { allGuides } from "../../content/guides";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const firstPicks = allFoods.filter((f) => f.firstFoodPick).slice(0, 6);
  return (
    <div className="space-y-12">
      <section className="space-y-5 pt-8 text-center">
        <Badge variant="outline" className="border-emerald-300 text-emerald-700 dark:text-emerald-400">
          Free · No ads · Your data stays on your device
        </Badge>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Start solids with confidence
        </h1>
        <p className="mx-auto max-w-xl text-pretty text-lg text-muted-foreground">
          Exact safe textures for every food, daily recommendations that adapt to your baby, and
          allergy playbooks built on NIAID, AAP, CDC, and WHO guidance — with a citation behind
          every claim.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/onboarding"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 bg-emerald-700 px-6 text-white hover:bg-emerald-800",
            )}
          >
            We&apos;re starting fresh
          </Link>
          <Link
            href="/onboarding/import"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 px-6")}
          >
            We&apos;ve already started
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">New to solids? Start here</h2>
          <Link href="/learn" className="text-sm text-emerald-700 underline underline-offset-2 dark:text-emerald-400">
            All chapters →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {allGuides.slice(0, 3).map((g) => (
            <Link
              key={g.slug}
              href={`/learn/${g.slug}`}
              className="rounded-lg border p-4 transition-colors hover:border-emerald-400"
            >
              <div className="font-medium">{g.title}</div>
              <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{g.summary}</div>
              <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-400">{g.minRead} min read</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Texture-first",
            body: "Every food comes with a precise safe form for each age — and a physical pass/fail test, like the squish test, so you know it's right.",
          },
          {
            title: "Adapts daily",
            body: "Log what your baby tried and how it went. Tomorrow's suggestions account for iron, allergen pacing, variety, and texture progress.",
          },
          {
            title: "Allergy-aware",
            body: "Risk-based allergen schedules from NIAID guidance, one new allergen at a time, and clear playbooks for every kind of reaction.",
          },
        ].map((c) => (
          <Card key={c.title}>
            <CardContent className="pt-6">
              <h2 className="font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Great first foods</h2>
          <Link href="/foods" className="text-sm text-emerald-700 underline underline-offset-2 dark:text-emerald-400">
            Browse all {allFoods.length} foods →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {firstPicks.map((f) => (
            <Link
              key={f.slug}
              href={`/foods/${f.slug}`}
              className="rounded-lg border p-4 transition-colors hover:border-emerald-400"
            >
              <div className="font-medium">{f.name}</div>
              <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {f.prepSpecs[0].form}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
