import type { Metadata } from "next";
import { SOURCES } from "../../../content/sources";
import { PrintButton } from "@/components/PrintButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Safety: gagging vs. choking & emergencies",
  description:
    "How to tell gagging from choking, the foods that must always be modified, and a printable emergency plan.",
};

export default function SafetyPage() {
  return (
    <article className="space-y-8">
      <h1 className="text-2xl font-bold">Safety guide</h1>

      <Alert className="border-red-400">
        <AlertTitle className="text-base">Call 911 immediately if your baby:</AlertTitle>
        <AlertDescription>
          <ul className="mt-2 space-y-1">
            <li>• Cannot cry, cough, or make sound (silent = choking)</li>
            <li>• Has trouble breathing, wheezing, or a persistent cough after eating</li>
            <li>• Has swelling of the tongue or lips, or is drooling and can&apos;t swallow</li>
            <li>• Has widespread hives together with vomiting</li>
            <li>• Is pale, floppy, or hard to rouse</li>
          </ul>
        </AlertDescription>
      </Alert>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Gagging vs. choking</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Gagging is a normal, protective reflex that moves food forward in the mouth — nearly
          every baby gags while learning. Choking is a blocked airway. The difference is sound:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="border-emerald-300">
            <CardHeader>
              <CardTitle className="text-base">Gagging — normal, stay calm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>• Noisy: coughing, sputtering, retching</p>
              <p>• Face may turn red</p>
              <p>• Baby works the food forward on their own</p>
              <p className="pt-2 font-medium">
                What to do: nothing. Stay calm, don&apos;t reach into the mouth — a finger sweep
                can push food deeper.
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-400">
            <CardHeader>
              <CardTitle className="text-base">Choking — act now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>• Silent: can&apos;t cry, cough, or make sound</p>
              <p>• Face/lips turning blue or gray</p>
              <p>• Panicked look, or losing consciousness</p>
              <p className="pt-2 font-medium">
                What to do: have someone call 911 while you start infant back blows and chest
                thrusts. Take an infant CPR class before starting solids if you can — it&apos;s the
                single best preparation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Never serve unmodified</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          These are the classic airway-shaped hazards. Most are fine with the right prep — each
          food&apos;s page shows exactly how.
        </p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3 font-semibold">Hazard</th>
                <th className="p-3 font-semibold">Safe alternative</th>
              </tr>
            </thead>
            <tbody className="[&_td]:border-t [&_td]:p-3">
              <tr><td>Whole grapes, cherry tomatoes, large blueberries, cherries</td><td>Quarter lengthwise (never coin-shaped slices); pit cherries</td></tr>
              <tr><td>Whole nuts and thick globs of nut butter</td><td>Finely ground nuts or nut butter thinned to a drizzle / spread paper-thin (whole nuts: not until ~age 4)</td></tr>
              <tr><td>Hot dogs and sausage rounds</td><td>Skip, or slice lengthwise into thin strips (watch sodium)</td></tr>
              <tr><td>Popcorn, marshmallows, hard candy</td><td>None — wait until at least age 4</td></tr>
              <tr><td>Raw apple chunks, raw carrot sticks/coins, other hard raw produce</td><td>Steam until squish-test soft, or grate finely raw</td></tr>
              <tr><td>Honey (in any form)</td><td>None before 12 months — infant botulism risk</td></tr>
              <tr><td>Cow&apos;s milk as a drink</td><td>Not before 12 months (yogurt and cheese as foods are fine from ~6 months)</td></tr>
              <tr><td>Added salt and sugar, unpasteurized dairy/juice</td><td>Cook without salt; babies don&apos;t need sweeteners</td></tr>
              <tr><td>High-mercury fish (shark, swordfish, king mackerel, tilefish, bigeye tuna)</td><td>Low-mercury choices: salmon, cod, sardines</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3 print:block">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Emergency action plan</h2>
          <PrintButton />
        </div>
        <Card>
          <CardContent className="space-y-4 pt-6 text-sm">
            <p className="font-medium">
              Post this where you feed your baby. Fill in the blanks and review it with everyone
              who feeds them.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <p>Baby&apos;s name: ______________________</p>
              <p>Date of birth: ______________________</p>
              <p>Known allergies: ____________________</p>
              <p>Pediatrician: _______________________</p>
              <p>Pediatrician phone: _________________</p>
              <p>Emergency contact: __________________</p>
            </div>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong>Severe reaction</strong> (trouble breathing; tongue/lip swelling; widespread
                hives with vomiting; pale or floppy): <strong>call 911 first.</strong> If infant
                epinephrine has been prescribed, use it as directed, then call.
              </li>
              <li>
                <strong>Milder reaction</strong> (a few hives, localized rash, one vomit): stop the
                food, photograph the symptoms, call the pediatrician today, and pause that
                allergen in the app.
              </li>
              <li>
                <strong>Delayed heavy vomiting</strong> (1–4 hours after a meal, baby wiped out):
                can be FPIES — call the pediatrician urgently; go to the ER if baby can&apos;t
                keep fluids down.
              </li>
              <li>
                <strong>Choking</strong> (silent, can&apos;t cough or cry): shout for someone to
                call 911 and begin infant back blows and chest thrusts.
              </li>
            </ol>
            <p className="text-xs text-muted-foreground">
              Structure informed by FARE&apos;s emergency care plan and AAP choking-prevention
              guidance ({SOURCES.fareEmergencyPlan.label}; {SOURCES.aapChoking.label}).
            </p>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t pt-4 text-xs text-muted-foreground">
        Sources:{" "}
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
        . Educational guidance, not medical advice.
      </footer>
    </article>
  );
}
