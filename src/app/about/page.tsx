import type { Metadata } from "next";
import { SOURCES } from "../../../content/sources";
import { allFoods } from "../../../content/foods";

export const metadata: Metadata = {
  title: "Sources, methodology & privacy",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold">About OpenSolids</h1>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold">What this is</h2>
        <p>
          OpenSolids is a free, open guide for starting a baby on solid foods. The research behind
          safe solids introduction — when to start, how to cut food safely, how and when to
          introduce allergens — is public and freely available. This app organizes it into
          something practical: an exact safe texture for every food at every age, a daily plan
          that adapts to your logs, and clear playbooks for allergic reactions.
        </p>
        <p>
          It is educational guidance, not medical advice. Your pediatrician knows your baby;
          when the app and your clinician disagree, the clinician wins, every time.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold">Methodology</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Every one of the {allFoods.length} food entries and each engine rule cites at least
            one source from the list below. A CI check fails the build if a claim ships without a
            citation, if a choking-risk food lacks a mitigation, or if a texture spec is vague.
          </li>
          <li>
            All text is written from primary, freely available sources — never copied from
            commercial products. Illustrations are our own original diagrams.
          </li>
          <li>
            Allergen scheduling follows the NIAID 2017 addendum guidelines and the LEAP/EAT
            evidence: early introduction, one new allergen at a time, risk-stratified peanut
            guidance, and consistent maintenance once tolerated.
          </li>
          <li>
            Links are re-verified weekly by an automated check, and each citation records the
            date it was retrieved.
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-sm">
        <h2 className="text-lg font-semibold">Sources</h2>
        <ul className="space-y-2">
          {Object.values(SOURCES).map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                {s.label}
              </a>{" "}
              <span className="text-muted-foreground">(retrieved {s.retrievedOn})</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold">Privacy</h2>
        <p>
          Everything you enter — your baby&apos;s profile and every log — lives in your
          browser&apos;s storage on your device. There is no account, no server database, no
          analytics, no trackers, and no ads. The Export button gives you a complete JSON copy of
          your data; &quot;Delete all data&quot; on the History page removes everything instantly.
          If you clear your browser data, your logs go with it, so export a backup now and then.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold">Name & trademarks</h2>
        <p>
          &quot;OpenSolids&quot; is a working name. This project is not affiliated with, endorsed
          by, or connected to any commercial infant-feeding program or brand.
        </p>
      </section>
    </article>
  );
}
