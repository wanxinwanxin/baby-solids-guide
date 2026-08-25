import type { Metadata } from "next";
import { SOURCES } from "../../../content/sources";
import { PrintButton } from "@/components/PrintButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocale } from "@/lib/i18n/server";
import { fmt, msg, pick } from "@/lib/i18n/config";
import {
  CALL_911_SIGNS,
  CHOKE_SIGNS,
  GAG_SIGNS,
  NEVER_SERVE_ROWS,
  PLAN_BLANKS,
  safetyMsgs,
} from "@/lib/i18n/messages/safety";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = pick(safetyMsgs, locale);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function SafetyPage() {
  const locale = await getLocale();
  const t = pick(safetyMsgs, locale);
  return (
    <article className="space-y-8">
      <h1 className="text-2xl font-bold">{t.title}</h1>

      <Alert className="border-red-400">
        <AlertTitle className="text-base">{t.call911Title}</AlertTitle>
        <AlertDescription>
          <ul className="mt-2 space-y-1">
            {CALL_911_SIGNS.map((sign) => (
              <li key={sign.en}>{msg(sign, locale)}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.gvcTitle}</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">{t.gvcIntro}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="border-primary/40">
            <CardHeader>
              <CardTitle className="text-base">{t.gagTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              {GAG_SIGNS.map((sign) => (
                <p key={sign.en}>{msg(sign, locale)}</p>
              ))}
              <p className="pt-2 font-medium">{t.gagWhat}</p>
            </CardContent>
          </Card>
          <Card className="border-red-400">
            <CardHeader>
              <CardTitle className="text-base">{t.chokeTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              {CHOKE_SIGNS.map((sign) => (
                <p key={sign.en}>{msg(sign, locale)}</p>
              ))}
              <p className="pt-2 font-medium">{t.chokeWhat}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.neverTitle}</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">{t.neverIntro}</p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3 font-semibold">{t.thHazard}</th>
                <th className="p-3 font-semibold">{t.thAlt}</th>
              </tr>
            </thead>
            <tbody className="[&_td]:border-t [&_td]:p-3">
              {NEVER_SERVE_ROWS.map((row) => (
                <tr key={row.hazard.en}>
                  <td>{msg(row.hazard, locale)}</td>
                  <td>{msg(row.alt, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3 print:block">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t.planTitle}</h2>
          <PrintButton />
        </div>
        <Card>
          <CardContent className="space-y-4 pt-6 text-sm">
            <p className="font-medium">{t.planIntro}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {PLAN_BLANKS.map((blank) => (
                <p key={blank.en}>{msg(blank, locale)}</p>
              ))}
            </div>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong>{t.severeLead}</strong>
                {t.severeMid}
                <strong>{t.severeCall}</strong>
                {t.severeTail}
              </li>
              <li>
                <strong>{t.milderLead}</strong>
                {t.milderTail}
              </li>
              <li>
                <strong>{t.delayedLead}</strong>
                {t.delayedTail}
              </li>
              <li>
                <strong>{t.chokingLead}</strong>
                {t.chokingTail}
              </li>
            </ol>
            <p className="text-xs text-muted-foreground">
              {fmt(t.planSourcesNote, {
                fare: SOURCES.fareEmergencyPlan.label,
                aap: SOURCES.aapChoking.label,
              })}
            </p>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t pt-4 text-xs text-muted-foreground">
        {t.footerSources}{" "}
        <a href={SOURCES.aapChoking.url} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          AAP Choking Prevention
        </a>
        {" · "}
        <a href={SOURCES.cdcChokingHazards.url} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          CDC Choking Hazards
        </a>
        {" · "}
        <a href={SOURCES.fareEmergencyPlan.url} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          FARE Emergency Care Plan
        </a>
        {" · "}
        <a href={SOURCES.fdaFish.url} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          FDA/EPA fish advice
        </a>
        {t.footerDisclaimer}
      </footer>
    </article>
  );
}
