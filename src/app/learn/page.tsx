import type { Metadata } from "next";
import Link from "next/link";
import { allGuides } from "../../../content/guides";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Learn: the big picture of starting solids",
  description:
    "Why solids at all, when to start, how fast to go, and how allergens really work — the five-minute grounding for brand-new solid-food parents.",
};

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Learn</h1>
        <p className="max-w-2xl text-muted-foreground">
          New to all of this? These short chapters give you the big picture — why solids matter
          (hint: it&apos;s not mainly calories), when to start, how fast to go, and how allergens
          really work. Each one cites its sources.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {allGuides.map((g, i) => (
          <Link key={g.slug} href={`/learn/${g.slug}`}>
            <Card className="h-full transition-colors hover:border-emerald-400">
              <CardContent className="pt-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="font-semibold">
                    <span className="mr-2 text-emerald-700 dark:text-emerald-400">{i + 1}.</span>
                    {g.title}
                  </h2>
                  <span className="shrink-0 text-xs text-muted-foreground">{g.minRead} min</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{g.summary}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
