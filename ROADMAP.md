# OpenSolids — Free, Science-Based Baby Solids Guide

> **Status (2026-08-22): v1 SHIPPED.** Phases 0–5 and 7 are complete and verified — live at
> https://baby-solids-guide-production.up.railway.app, source at https://github.com/wanxinwanxin/baby-solids-guide
> (public; every push to `main` runs CI and deploys to Railway). Phase 6 (accounts + Postgres sync)
> is deferred post-launch per the v1 definition of done. Gates at ship time: 44 unit tests, 8 e2e
> journeys, content-lint (63 foods, 9/9 allergens, 18 iron-rich), link check, Lighthouse 95–100
> across performance/accessibility/best-practices/SEO on /, /foods/carrot, and /today.

**Product roadmap + implementation spec.** This document is written so an implementation agent can build v1 nearly end-to-end without further product decisions. Read the whole document before writing code. Work phase by phase (§10), run every check in a phase's **Verification** block before moving on, and commit once per completed phase.

> **Working name:** "OpenSolids" is a codename. Before public launch, run a trademark knockout search (USPTO TESS + app stores + domains) and pick a final name. Hard requirement: the name, logo, and branding must not be confusable with "Solid Starts" or any other existing baby-feeding brand. The descriptive phrase "starting solids" may appear in body copy (it's generic), never in branding.

---

## 1. Vision & positioning

A free, open, science-based web app that guides parents through introducing solid foods to their baby (roughly 4–24 months), dynamically adapting to where each baby actually is.

Core promises:

1. **Science-based** — every recommendation traces to a free, authoritative source (§3). No claim ships without a citation.
2. **Dynamic** — the app knows which foods the baby has tried, how they responded, which allergens are in progress, and what texture stage they're at, and it recommends what to do *today*.
3. **Texture-first food guidance** — the flagship feature: for every food, an exact, testable description of the form/texture that makes it safe for a first try at each age, plus how to actually prepare it (with original cut-diagram illustrations and links to free videos).
4. **Meets you where you are** — a fresh-start wizard for day-one parents AND an import flow for parents who already started, after which recommendations adjust to the imported state.
5. **Allergy-aware** — risk-stratified allergen introduction schedules and reaction playbooks, following NIAID/AAP guidance.
6. **Free & private** — no paywall, no ads, no trackers. Local-first storage with optional account sync.

Non-goals for v1 (§12): meal planning/recipes at scale, native mobile apps, community features, multi-language.

---

## 2. Non-negotiable guardrails

### 2.1 Legal / IP (binding on all content work)

- **Never copy, paraphrase-from, or scrape Solid Starts** (or any proprietary competitor: Yumi, Kids Eat in Color, etc.). Do not open their food database as a "reference" while writing our entries. All food copy is written from the primary sources in §3.
- Facts and scientific findings are not copyrightable; *their expression is*. We use the same public research (LEAP, EAT, NIAID guidelines, CDC/AAP/WHO/NHS guidance) and write 100% original text.
- **Media:** never rehost third-party images/video. Videos are embedded via YouTube's standard embed (permitted by YouTube ToS), preferring official health-org channels (§6.5). Photos come from Wikimedia Commons / Openverse with license + attribution recorded per asset. Our own SVG cut diagrams (§6.4) are the primary visuals and carry no licensing risk.
- **Trademark:** distinct name/branding (see note above). No comparative marketing that uses their marks in branding contexts.

### 2.2 Safety / medical (binding on all product work)

- The app is **educational, not medical advice**. A disclaimer appears in onboarding (must be acknowledged once), in the footer of every food page, and prominently in the allergy module.
- **Hard blocks the engine must enforce** (encoded as data, tested in CI):
  - No honey or honey-containing foods before 12 months (infant botulism).
  - No cow's milk as a primary drink before 12 months (yogurt/cheese as foods are fine from ~6 months).
  - No unmodified high-risk choking foods: whole grapes/cherry tomatoes/large blueberries, whole nuts, globs of nut butter, popcorn, hot dogs/sausage rounds, hard raw vegetables/fruit chunks, marshmallows, whole cherries with pits.
  - No added salt (sodium limits for infants) or added sugar; no unpasteurized dairy/juice; limit high-mercury fish (king mackerel, shark, swordfish, tilefish, bigeye tuna); vary grains to limit rice-based arsenic exposure.
- **Emergency guidance** (call 911 criteria, gagging vs. choking) must always be reachable within one tap from any logging or allergy screen.
- Any symptom log that matches the "severe" row of the triage table (§8.4) must interrupt the flow with the emergency screen before anything else.

### 2.3 Privacy

- Local-first by default: all baby data lives in the browser until the user opts into an account.
- If accounts are enabled (Phase 6): minimal PII (email only), no third-party analytics SDKs, full JSON export and one-click delete. Plain-language privacy page.

---

## 3. Source-of-truth references (all free)

Every food entry and engine rule cites at least one of these. The content lint (§11.2) fails any entry with an empty `sources` array.

| Source | What we use it for | Licensing |
|---|---|---|
| CDC — Infant & Toddler Nutrition (cdc.gov/infant-toddler-nutrition) | When/how to start, foods & drinks by age, choking prevention | US gov, public domain |
| USDA WIC — *Infant Nutrition and Feeding Guide* | Deep reference: readiness, textures by age, feeding skills timeline | US gov, public domain |
| NIAID 2017 Addendum Guidelines (Peanut Allergy Prevention) | Risk-stratified peanut introduction (§8.2) | NIH, public domain |
| LEAP study (NEJM 2015), EAT study (NEJM 2016) | Evidence base for early allergen introduction | Cite findings; original text |
| AAP (healthychildren.org) — Starting Solid Foods; Choking Prevention | Readiness signs, iron-rich-first, hazards | Cite; write original text |
| WHO — Complementary Feeding guidance | ~6-month start, responsive feeding | Cite; write original text |
| NHS Start for Life — Weaning (nhs.uk/start-for-life) | Food-by-food prep ideas, videos | Open Government Licence v3 (reuse with attribution) — verify per page |
| Health Canada / Canadian Paediatric Society | Iron-rich first foods, allergen guidance corroboration | Cite; write original text |
| AAAAI / ACAAI position statements | Allergen maintenance dosing, FPIES awareness | Cite; write original text |
| FDA/EPA — Advice About Eating Fish | Mercury tiers | US gov, public domain |

**Implementation-agent task during content authoring:** verify each URL resolves, capture `retrievedOn` dates, and paraphrase — never copy — non-public-domain text.

---

## 4. Architecture & stack (locked decisions)

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js (latest, App Router, TypeScript, `src/` dir) on **Railway** | SSG for ~60–150 food pages (SEO), server components, single deploy target |
| Styling/UI | Tailwind CSS + shadcn/ui | Fast, accessible primitives |
| Content | **Content-as-code**: typed TS objects in `content/`, validated by Zod at build time | Reviewable in PRs, no CMS to run, CI-lintable |
| State/storage v1 | Local-first: repository interface backed by `localStorage` (Zustand + persist), plus JSON export/import | Zero-friction start; §5.6 interface makes Phase 6 sync a drop-in |
| Auth + DB (Phase 6, optional for launch) | Railway Postgres + Drizzle ORM, provisioned via the Railway CLI | Platform-native, swappable |
| Engine | Pure TypeScript functions in `src/lib/engine/`, no I/O, clock injected | Deterministic, table-testable |
| Tests | Vitest (unit), Playwright (e2e), custom content-lint script | §11 |
| Illustrations | Original parametric SVG cut diagrams (§6.4) | No licensing risk; the differentiator |

### Directory layout

```
src/
  app/                    # routes (see §9.1)
  components/             # UI components
  lib/
    engine/               # recommendation engine (pure)
    triage/               # reaction triage decision table (pure)
    storage/              # repository interface + localStorage impl (+ pg impl in Phase 6)
    age.ts                # chronological + corrected age math
  content-schema/         # Zod schemas + TS types for content
content/
  foods/                  # one .ts file per food
  allergens/              # one .ts file per common allergen program
  guidance/               # readiness, gagging-vs-choking, hard blocks, disclaimers
scripts/
  content-lint.ts         # §11.2
  check-links.ts          # §11.3
e2e/                      # Playwright specs
```

---

## 5. Data model

All types live in `src/content-schema/` (content) and `src/lib/storage/types.ts` (user data). Zod schemas mirror every type.

### 5.1 `BabyProfile`

```ts
type BabyProfile = {
  id: string;
  nickname: string;
  birthDate: string;          // ISO date
  dueDate?: string;           // ISO date; if set and <24mo, use corrected age everywhere
  feedingStyle: 'purees' | 'baby-led' | 'mixed';   // affects which prep spec is surfaced first
  allergyRisk: {
    eczema: 'none' | 'mild-moderate' | 'severe';
    existingFoodAllergy: boolean;                   // diagnosed
    familyHistoryAtopy: boolean;
  };
  knownAllergies: AllergenId[];       // confirmed — engine excludes these foods
  doctorAvoidList: string[];          // free-text food slugs to exclude per medical advice
  conditions: ('reflux' | 'fpies-dx' | 'cmpa' | 'premature')[];
  startedSolidsOn?: string;           // ISO date
  disclaimerAcknowledgedAt?: string;
};
```

**Age math (`src/lib/age.ts`):** `correctedAgeMonths = chronological − (weeks premature)/4.33`, applied only when `dueDate` is set and chronological age < 24 months. All engine gates use corrected age. Unit-test with a 8-weeks-early baby.

### 5.2 `Food` (content)

```ts
type AgeBand = '6-8m' | '9-12m' | '12-24m';

type PrepSpec = {
  band: AgeBand;
  form: string;             // ONE precise sentence: exact shape/size/consistency for a safe serve
  passFailTest: string;     // a physical test the parent can do, e.g. the "squish test"
  whyThisForm: string;      // developmental rationale (palmar grasp vs pincer, molars, etc.)
  prepSteps: string[];      // numbered, concrete (cook method, times, cut geometry)
  commonMistakes: string[];
  cutDiagram?: string;      // id of SVG diagram component (§6.4)
  media: MediaLink[];       // §6.5
};

type Food = {
  slug: string;                       // unique, kebab-case
  name: string;
  aliases: string[];
  category: 'vegetable' | 'fruit' | 'protein' | 'grain' | 'dairy' | 'legume' | 'fat-other';
  minAgeMonths: number;               // corrected age gate (most foods: 6; honey: 12)
  ironRich: boolean;
  commonAllergen: AllergenId | null;  // 'peanut'|'egg'|'milk'|'wheat'|'soy'|'sesame'|'tree-nut'|'fish'|'shellfish'
  chokingRisk: 'low' | 'moderate' | 'high';
  chokingNotes?: string;              // REQUIRED when risk ≥ moderate: hazard + mitigation
  nutritionHighlights: string[];      // max 3, each source-backed
  prepSpecs: PrepSpec[];              // must include the band covering minAge
  firstFoodPick: boolean;             // curated "great first food" flag
  flavorPairings: string[];           // slugs
  tips: string[];                     // the "how to get it to that texture" gold (§6.3)
  sources: SourceRef[];               // ≥1 required; {label, url, retrievedOn}
};
```

### 5.3 `ExposureLog`

```ts
type ExposureLog = {
  id: string; babyId: string; foodSlug: string;
  date: string; mealSlot?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  prepBandUsed: AgeBand;
  amountEaten: 'none' | 'taste' | 'some' | 'lots';
  enjoyment: 'loved' | 'neutral' | 'disliked' | 'refused';
  gagging: boolean;                   // educational flag, not alarm (normal reflex)
  symptoms: SymptomId[];              // §8.4 controlled vocabulary
  symptomOnset?: 'immediate' | 'within-2h' | '2-6h' | 'next-day';
  notes?: string;
};
```

### 5.4 `AllergenState` (derived + user-adjustable)

Per common allergen: `status: 'not-started' | 'introducing' | 'maintaining' | 'reacted-paused' | 'avoid-per-doctor'`, `exposureCount`, `lastExposureDate`. Derived from logs by default; user can override status (e.g., allergist said avoid).

### 5.5 `TextureStage`

`S1` smooth mash + soft graspable strips (≈6–7m) → `S2` lumpy mash + soft bite-size pieces (≈8–9m, pincer grasp) → `S3` chopped soft table food (≈10–12m) → `S4` safely-cut family meals (12m+). Stored per baby; engine nudges progression (rule R4).

### 5.6 Storage repository interface

```ts
interface GuideStore {
  getBaby(): Promise<BabyProfile | null>;
  saveBaby(b: BabyProfile): Promise<void>;
  listLogs(range?: DateRange): Promise<ExposureLog[]>;
  addLog(l: ExposureLog): Promise<void>;
  getOverrides(): Promise<AllergenOverride[]>;
  exportJson(): Promise<string>;      // versioned envelope {schemaVersion, baby, logs, overrides}
  importJson(json: string): Promise<ImportResult>;   // validates with Zod, reports skipped rows
}
```

Phase 2 ships `LocalStore` (localStorage). Phase 6 ships `SyncedStore` (Postgres) behind the same interface. **Nothing outside `lib/storage` may touch localStorage directly.**

---

## 6. Content system — the flagship

### 6.1 Scope

- **v1 seed: 60 foods** (list in §6.6) covering all 9 common allergens, ≥12 iron-rich foods, and every category. Post-launch target: 150.
- Each food ships with **all applicable age-band PrepSpecs**, tips, sources, and at least one media link or cut diagram.

### 6.2 The texture spec ("form for a safe first try")

This is the product's centerpiece. The `form` string must be *measurably precise*. House style:

- ❌ "Cut into small, safe pieces."
- ✅ (carrot, 6–8m) "A whole peeled carrot cooked until it smashes easily between your thumb and finger, served as a stick roughly the length and width of two adult fingers."
- Every PrepSpec includes a **`passFailTest`** — a physical check: *"Press a piece between thumb and forefinger: it should flatten with gentle pressure. If you need to squeeze hard, cook it longer."*
- Size language uses adult-finger units and household references (pinky width, credit-card length), never bare centimeters alone.

### 6.3 The "how to get there" tips

For each food, 2–5 tips that solve the *actual kitchen problem* of achieving the safe texture, e.g.:

- Peanut: "Thin 1 tsp smooth peanut butter with warm water or breast milk to a drizzly, yogurt-like consistency — thick globs are a choking hazard."
- Apple (6–8m): "Raw apple stays dangerously firm; steam wedges 8–10 minutes or grate raw apple on the fine side of a box grater."
- Meat (6–8m): "Braise or slow-cook until shreddable; a drumstick with the skin, cartilage, and loose bone fragments removed makes a graspable handle."

### 6.4 Original SVG cut diagrams

A parametric React SVG component library (`components/diagrams/`) rendering top-down "cut this shape" illustrations: food silhouette + dashed cut lines + a hand/finger scale reference. One diagram per (food × band) where geometry matters (grapes quartered lengthwise, banana split into thirds with a "handle" of peel, steamed carrot batons, quesadilla strips…). Style: flat 2-color + accent, currentColor-aware for dark mode. These are original works — our visual identity and zero licensing risk.

### 6.5 Media policy (`MediaLink`)

```ts
type MediaLink = {
  kind: 'youtube' | 'image';
  url: string;                 // youtube watch URL or Commons/Openverse file page
  title: string;
  sourceChannel: string;       // e.g. "NHS", "UNICEF", a children's hospital channel
  license?: string;            // REQUIRED for images (e.g. "CC BY-SA 4.0" + attribution)
  verifiedOn: string;          // ISO date the agent last confirmed it live + accurate
};
```

Rules: YouTube only via standard embed, prefer official health-org channels (NHS weaning videos, children's hospitals, WIC state programs); **never** link Solid Starts' channel or site; images only from Wikimedia Commons/Openverse with license recorded; `scripts/check-links.ts` re-verifies liveness in CI (§11.3). Diagrams-first: if no good free video exists, the cut diagram + text is sufficient — do not link low-quality content to fill a slot.

### 6.6 v1 seed food list (60)

Iron-rich flag ★, common allergen in [brackets], high choking-risk ⚠ (entry must include mitigation):

- **Proteins:** beef★, chicken★, turkey★, pork★, lamb★, salmon★ [fish], cod [fish], sardines★ [fish] ⚠(bones), shrimp [shellfish], egg★ [egg], tofu★ [soy], edamame★ [soy] ⚠, lentils★, black beans★, chickpeas★, liver★ (portion-capped vitamin A note)
- **Dairy:** plain whole-milk yogurt [milk], cheese [milk] ⚠(cubes→thin strips)
- **Nuts/seeds:** peanut butter [peanut] ⚠, almond butter [tree-nut] ⚠, cashew butter [tree-nut] ⚠, walnut (ground) [tree-nut], tahini/hummus [sesame]
- **Grains:** iron-fortified oat cereal★, oatmeal, wheat bread/toast [wheat], pasta [wheat], farina★ [wheat], quinoa★, rice (with variety note), barley [wheat], corn/polenta
- **Vegetables:** avocado, sweet potato, carrot ⚠(raw), broccoli, zucchini, green beans, peas ⚠, spinach★, butternut squash, cauliflower, beet, potato, bell pepper ⚠(raw skin), cucumber, tomato ⚠(cherry)
- **Fruits:** banana, apple ⚠(raw), pear, peach, mango, strawberry, blueberry ⚠(whole), raspberry, watermelon, orange ⚠(membranes), kiwi, grapes ⚠⚠(quarter lengthwise, 9m+), cherries ⚠(pit), prunes
- **Fats/other:** olive oil, unsweetened nut-free seed butter (sunflower)

Worked examples the agent should write **first** and use as the canonical template: **carrot** (texture-progression showcase) and **peanut** (allergen showcase).

---

## 7. Recommendation engine

Pure functions in `src/lib/engine/`. Signature: `recommend(input: {baby, logs, overrides, foods, today: Date}) → Recommendation`. No I/O, no `Date.now()` — clock injected. Same input ⇒ same output (tie-breaks defined below).

### 7.1 Output shape

```ts
type Recommendation = {
  gate: 'not-ready' | 'ready';            // R0
  todaysPicks: ScoredFood[];               // top 3, with reason strings
  allergenRail: { next: AllergenPlanItem | null; maintenance: MaintenanceNudge[] };
  textureStage: { current: TextureStage; nudge?: string };   // R4
  retryQueue: ScoredFood[];                // refused foods due for another try
  warnings: Warning[];                     // hard blocks & holds triggered
};
```

### 7.2 Rules (each gets a table-driven Vitest suite; IDs are stable)

- **R0 — Readiness gate.** No food recommendations until: corrected age ≥ ~6 months (allow 4–6m only if user affirms pediatrician advised early start) AND readiness quiz passed (sits with minimal support, good head control, brings objects to mouth, shows interest, diminished tongue-thrust). Otherwise show "what to watch for" content.
- **R1 — Iron first.** While distinct iron-rich foods introduced < 5 or total iron-rich exposures < 12: iron-rich foods get +2.0 score. Reason string: "Iron stores dip around 6 months — iron-rich foods are the priority."
- **R2 — Allergen cadence.** Next allergen becomes eligible when: ≥3 total successful solid-food days; no unresolved symptoms; no *other* allergen first-exposed in the last 3 days; risk gate from §8.2 satisfied. Default order (editable by user): peanut → egg → dairy (yogurt) → wheat → soy → sesame → tree nut → fish → shellfish. Surface with "serve early in the day so you can watch for a reaction."
- **R3 — Allergen maintenance.** Introduced allergen (≥3 exposures) with `lastExposure > 5 days` → nudge "keep peanut in rotation ~2×/week"; >14 days → stronger warning that consistent ongoing exposure is what maintains tolerance.
- **R4 — Texture progression.** Advance nudge when: age fits next stage AND last 10 logs show ≥8 `some|lots` eaten AND no `symptoms` AND gagging rate declining. Never auto-advance — nudge with rationale; user confirms.
- **R5 — Variety pressure.** Categories with 0 exposures in trailing 7 days get +1.0. Bitter vegetables carry a persistent note: "It can take 8–15 tries — keep offering without pressure."
- **R6 — Refusal retry.** Refused/disliked foods re-enter `retryQueue` after ≥3 days, capped at prominence after 15 attempts, each retry suggesting a *different* PrepSpec or pairing.
- **R7 — Symptom hold.** Any log with allergy-type symptoms puts that food's allergen into `reacted-paused`, blocks all foods sharing the allergen, and emits a warning pointing to the triage playbook (§8.4). Cleared only by explicit user action ("doctor cleared us").
- **R8 — Hard blocks.** `minAgeMonths` gate; `knownAllergies`/`doctorAvoidList` exclusion; honey/whole-nut/etc. rules from §2.2 as data-driven exclusions with explanations.
- **R9 — Scoring & determinism.** `score = 1.0 + bonuses (R1,R2,R5,R6) − penalties`; excluded = −∞. Sort by score desc, then fewer exposures, then alphabetical slug. Top 3 → `todaysPicks`, each with its dominant reason string.

### 7.3 Required engine test cases (write these verbatim as Vitest tables)

1. Baby 6.5m corrected, 4 foods logged, 1 iron-rich, no allergens started → picks contain ≥2 iron-rich; allergenRail.next = peanut (low risk).
2. Severe-eczema baby, peanut not cleared in profile → allergenRail.next = "talk to your pediatrician first" gate, not a food.
3. Peanut first-exposed yesterday → egg NOT eligible (R2 3-day window); non-allergen foods unaffected.
4. Peanut maintaining, last exposure 9 days ago → maintenance nudge present.
5. Hives logged after yogurt → all `milk` foods excluded; warning links triage; status `reacted-paused`.
6. Baby 8m, 12 recent logs eating well → texture nudge S1→S2 present; same but 3 gagging logs → absent.
7. Honey excluded at 11.9m, included ≥12m (boundary test on corrected age).
8. Preemie (8 weeks early) chronological 6m → R0 gate = not-ready (corrected ~4m).
9. Refused broccoli 2 days ago → not in retryQueue; 4 days ago → present with a different PrepSpec suggested.
10. Determinism: two equal-score foods order by exposure count then slug; snapshot stable across runs with fixed `today`.

---

## 8. Allergy module & playbooks

### 8.1 Onboarding risk quiz

Three questions (eczema severity, existing food allergy dx, family history) → `allergyRisk`. Shown to every user; skippable but persistently nudged until answered.

### 8.2 Risk-stratified introduction (NIAID-aligned)

| Risk tier | Definition | Peanut/egg guidance the app gives |
|---|---|---|
| High | Severe eczema and/or existing egg allergy | "Talk to your pediatrician/allergist **before** introducing peanut (they may recommend testing or supervised first exposure, ideally around 4–6 months)." App gates peanut behind an explicit "my doctor cleared us" confirmation. |
| Moderate | Mild–moderate eczema | Introduce peanut around 6 months at home; first serve early in the day; watch 2 hours. |
| Low | Neither | Introduce allergens freely alongside other foods per R2 cadence. |

FPIES/CMPA conditions in the profile add tailored notes (e.g., FPIES: new foods one at a time with 4-day observation, common triggers flagged).

### 8.3 Allergen tracker page

Grid of 9 allergens × status, exposure count, last exposure, next action. Each allergen has a program page (from `content/allergens/*.ts`): first-serve form (e.g., peanut = thinned smooth PB or peanut-puff style dissolvables), dose progression, maintenance rhythm, what a reaction looks like for *this* allergen.

### 8.4 Reaction triage decision table (`src/lib/triage/`, pure + table-tested)

| Severity | Any of… | App response |
|---|---|---|
| **Emergency** | trouble breathing/wheezing/persistent cough; swelling of tongue/lips with drooling or trouble swallowing; widespread hives WITH vomiting; pale/floppy/unresponsive; repetitive vomiting | Full-screen: **"Call 911 now."** Do-not list (no waiting, no driving alone). Logged automatically. |
| **Same-day medical** | widespread hives; facial swelling without breathing trouble; vomiting shortly after an allergen | "Contact your pediatrician today." Allergen → `reacted-paused`. |
| **Monitor + call before re-offering** | a few hives near the mouth; mild rash/redness that resolves | Note it; pause that allergen pending pediatrician OK. |
| **FPIES pattern** | profuse repeated vomiting 1–4h after eating ± lethargy/pallor | Urgent evaluation guidance; trigger avoidance; allergist referral note. |
| **Not an allergy (educate)** | gagging (normal reflex — link gagging-vs-choking guide); spitting food out; contact redness from acidic food (tomato/citrus/strawberry) | Inline reassurance content; no status change. |

Symptom vocabulary (`SymptomId`) maps 1:1 onto this table so triage is a pure lookup. Include a **printable emergency action plan** page (modeled on FARE's freely available plan structure, original layout/text).

---

## 9. UX spec

### 9.1 Routes

```
/                     Landing: value prop, two big CTAs ("Starting fresh" / "We've already started"), food library teaser
/onboarding           Wizard: profile → risk quiz → readiness quiz → (fresh|import branch) → disclaimer ack
/onboarding/import    "Where are you?": checklist of foods by category (tap all tried), per-allergen status, texture stage picker, optional JSON restore
/today                THE home screen: today's 3 picks w/ reasons, allergen rail, maintenance nudges, texture indicator, quick-log button
/foods                Library: search + filters (category, allergen, iron-rich, age band, first-food picks)
/foods/[slug]         Food page: age-band tabs → form + passFailTest + steps + diagram + media + tips + sources; "Log this food" CTA
/allergens            Tracker grid (§8.3)
/allergens/[id]       Allergen program page
/log                  Quick-log flow (≤4 taps for the happy path: food → amount → enjoyment → done); symptoms expandable
/history              Timeline + per-food exposure counts; export/import JSON
/safety               Gagging vs choking, hard blocks explained, emergency plan (printable)
/about                Sources, methodology, disclaimer, privacy
```

### 9.2 Key interaction rules

- Quick-log happy path ≤ 4 taps; symptoms are opt-in expansion, but **symptom selection immediately runs triage** and can interrupt with the emergency screen.
- `/today` renders meaningfully with zero logs (fresh start), imported mid-journey state, and 100+ logs.
- Food pages default to the age-band tab matching the baby's current stage; `feedingStyle` orders puree-style vs. graspable-style prep first.
- Empty/edge states specified: no baby yet (→ onboarding), gate not passed (R0 content), allergen paused (banner + playbook link).
- Mobile-first (parents hold babies); minimum 44px touch targets; works one-handed.

---

## 10. Phased implementation plan

> **Agent protocol:** complete phases in order; run the Verification block; fix failures before proceeding; one git commit per phase (conventional commits, e.g. `feat: phase 1 — content schema + seed foods`). If a check cannot pass for an external reason, document it in the commit body rather than skipping silently.

### Phase 0 — Scaffold & CI (~½ day)

Tasks: `create-next-app` (TS, App Router, Tailwind, src dir, `--yes`); add shadcn/ui, Vitest, Playwright, ESLint/Prettier; `scripts/content-lint.ts` + `check-links.ts` stubs wired into `npm run check`; GitHub Actions running typecheck+lint+unit+content-lint+build; Railway deploy.

**Verification:** `npm run build` ✅; `npm run check` ✅ (green on stubs); deployed URL renders placeholder landing.

### Phase 1 — Content schema + seed database + library UI (~3 days)

Tasks: implement §5.2 types + Zod schemas; write **carrot** and **peanut** as canonical templates; author all 60 foods (§6.6) with full PrepSpecs, tips, sources; build 12–15 cut diagrams for the geometry-critical foods; implement content-lint (§11.2) and link-checker; build `/foods` + `/foods/[slug]` (SSG).

**Verification:** content-lint 0 errors on 60 foods; every one of the 9 allergens covered by ≥1 food; ≥12 iron-rich; every ⚠ food has `chokingNotes`; `check-links` all 200s; e2e: browse → filter "iron-rich" → open salmon → see 6-8m form + passFailTest; Lighthouse a11y ≥ 90 on a food page.

### Phase 2 — Baby profile, local storage, logging (~2 days)

Tasks: `GuideStore` interface + `LocalStore`; profile CRUD; corrected-age lib + tests; quick-log flow; `/history`; JSON export/import with versioned envelope.

**Verification:** unit tests for age math (incl. preemie) and store; e2e: create profile → log 3 foods → reload page → data persists → export → clear site data → import → identical history; symptom selection reaches triage stub.

### Phase 3 — Recommendation engine + Today screen (~3 days)

Tasks: implement R0–R9; the 10 test cases in §7.3 as table-driven Vitest suites; build `/today` consuming `recommend()`; reason strings surfaced in UI.

**Verification:** all §7.3 cases green; mutation-style spot check (flip a rule constant → a test fails); e2e: fresh baby sees iron-rich picks + peanut rail; e2e: log hives on yogurt → today shows milk excluded + warning.

### Phase 4 — Allergy module & playbooks (~2 days)

Tasks: risk quiz; §8.2 gating incl. "doctor cleared us" confirmation; allergen tracker + 9 program pages (`content/allergens/`); triage decision table + full-screen emergency flow; printable emergency plan; gagging-vs-choking guide at `/safety`.

**Verification:** triage table 100% branch-covered by tests; e2e: severe-eczema profile → peanut gated; e2e: log "trouble breathing" symptom → emergency screen interrupts before save completes; every allergen program page cites ≥1 source; manual content review against NIAID/AAP sources recorded in PR description.

### Phase 5 — Onboarding & import (~2 days)

Tasks: fresh-start wizard (profile → risk quiz → readiness quiz → first-foods plan); import flow (checklist by category, allergen statuses, texture stage, JSON restore); landing page with the two CTAs.

**Verification:** e2e both journeys end on a sensible `/today`; snapshot test: a defined imported state (20 foods, peanut maintaining, egg not started, S2) produces expected picks/rails; disclaimer ack stored and not re-shown.

### Phase 6 — Accounts & sync (optional for launch, ~3 days)

Tasks: provision Railway Postgres + an auth library (e.g. better-auth); Drizzle schema mirroring §5; `SyncedStore` behind `GuideStore`; local→account migration on first login; last-write-wins per entity; delete-account flow.

**Verification:** integration tests against a branch DB; e2e: build local history → sign up → data appears server-side → second browser sees it; export + delete-account both work.

### Phase 7 — Polish & launch (~2 days)

Tasks: SEO metadata + OG images for food pages; PWA manifest + offline caching of content routes; axe/a11y pass; privacy + about/methodology pages; final trademark-name decision applied; production deploy on Railway + domain; GitHub push-to-deploy wired up.

**Verification:** Lighthouse ≥90 across categories on `/`, `/foods/carrot`, `/today`; axe: 0 critical; all §11 gates green in CI on `main`; production URL live.

**v1 launch definition of done:** Phases 0–5 + 7 complete (Phase 6 may follow); master checklist: 60 lint-clean foods, engine tests green, triage branch-covered, both onboarding journeys pass e2e, disclaimers in place, no third-party trackers.

---

## 11. Quality gates (CI on every PR)

1. **Types & lint:** `tsc --noEmit`, ESLint.
2. **Content lint (`scripts/content-lint.ts`)** — fails the build if any food violates: unique slug; ≥1 source with URL + retrievedOn; PrepSpec present for the band covering `minAgeMonths`; `form` ≥ 12 words and contains a size/consistency reference; `passFailTest` nonempty; `chokingNotes` present when risk ≥ moderate; allergen foods have an allergen program page; honey has `minAgeMonths ≥ 12`; media links include license for images; banned-source check (no solidstarts.com URLs anywhere in content).
3. **Link checker** — HEAD-requests every content URL; failures report as a table; scheduled weekly run + PR gate.
4. **Unit:** engine (§7.3 mandatory), triage (branch coverage 100%), age math, storage.
5. **E2E (Playwright):** fresh-start journey, import journey, log-with-reaction journey.
6. **Build:** all food pages SSG successfully.

---

## 12. Out of scope for v1 (explicit cutline)

Recipes/meal plans, photos of real prepared food (diagrams suffice), native apps, push notifications, multi-baby switching UI (model supports it; UI later), localization, community/comments, growth tracking, formula/milk-feed tracking. **Most of these are now specced in Part II below.**

## 13. Open questions for the product owner (status as of 2026-08-22)

1. Final product name — **still open**; process and rename mechanics specced in Phase 13.
2. Accounts before/after launch — **resolved: after** (shipped v1 local-first; full sync spec in Phase 6).
3. Peanut-first allergen order — **shipped as default**, user-editable.
4. Age ceiling 24 months — **shipped as default.**

---
# Part II — Post-v1 roadmap (rev. 2, 2026-08-22)

> **Status (2026-08-22, end of day): PART II IMPLEMENTED AND SHIPPED.** All phases live in production:
> 6.0 (backup nudges) · 6 (email+password sign-in & LWW snapshot sync on Railway Postgres; Google/Resend
> light up when the owner adds credentials; verified end-to-end with a two-browser test against the real
> database) · 8 (reaction check-ins with Google Calendar/.ics delivery + server push/email pipeline with
> a 5-minute cron; VAPID keys provisioned) · 9 (six Learn chapters + landing/nav IA) · 10 (nutrition
> tags, serving guidance, watch-outs on every food) · 11 (drag-and-drop 12-week planner, generatePlan/
> validatePlan, engine R10, allergen reorder UI) · 12 (153 foods incl. herbs & spices; per-category lint
> minimums; first-band diagrams enforced on high-risk foods) · 13 (multi-baby switcher + add-baby flow) ·
> 14 (insights dashboard + acceptance surfacing) · 15 (brand.ts, /api/health, per-food OG images, 9-route
> axe CI gate, LICENSE/SECURITY; **name + custom domain + Google OAuth/Resend/Apple credentials remain
> owner decisions**). Gates at ship: 134 unit tests, 26 e2e + gated real-DB sync e2e, content-lint
> (153 foods, 9/9 allergens, 35 iron-rich, 6 guides), links verified, mobile 0-overflow at 390px,
> visually reviewed page-by-page in a real browser (which caught and fixed a global font-fallback bug,
> friendlier pick tie-breaks, classic allergen vehicles, and planner warning noise).
> Documented deviations: the first-login conflict screen became a safe multi-baby union merge; the
> allergen reorder list uses accessible up/down controls instead of drag; SMS was replaced by
> calendar/push/email as specced.


Revised after owner feedback on rev. 1. Changes: **Spanish localization is cut** (owner call — revisit post-launch); **sign-in persistence is priority #1** (Google chosen as the primary provider); new phases for **reaction check-in reminders**, a **"why solids at all" education layer**, **nutrition & serving guidance**, and an **evidence-honest ordering + drag-and-drop planner**; preference (thumbs) surfacing folded into Insights — note that v1 already *records* enjoyment per log (loved / neutral / disliked / refused, a superset of thumbs up/down); what's missing is surfacing it.

Same contract as Part I: an implementation agent works phase by phase, passes every check in a phase's **Verification** block before moving on, and commits per phase (or per lettered sub-phase).

**Store/envelope versioning rule (applies to every phase below):** any phase that changes the persisted shape bumps the zustand persist version and the export `schemaVersion` by one, ships a `migrate` step, and keeps the importer accepting every prior version. Assign concrete numbers at implementation time in phase order — never reuse or skip.

## How persistence works today (context for 6.0/6)

v1 is local-first: the Zustand store persists to `localStorage` (key `opensolids-v1`), so **data already survives across sessions automatically in the same browser — no export/import needed day-to-day.** Export/import exists for backups and device moves. The real gaps:

1. **Device-bound** — a new phone/laptop/browser starts empty until a JSON import.
2. **Safari/iOS eviction** — WebKit may purge script-writable storage after ~7 days without a visit (installing to the home screen largely exempts it).
3. **Site-data clearing** wipes everything with no recovery.

Phase 6.0 mitigates with backup nudges; Phase 6 solves it with opt-in sign-in + sync. Guest mode remains the default forever.

## Sequencing & sizing

| Phase | What | Depends on | Size |
|---|---|---|---|
| 6.0 | Persistence quick wins (backup nudges, iOS guidance) | — | ½ day |
| 6 | Sign-in (Google primary) & cross-device sync | 6.0 recommended | ~4 days |
| 8 | Reaction check-ins & reminders (calendar path has no deps; push/email needs 6) | 8A: none · 8B: 6 | 3–4 days |
| 9 | Learn — first-visit education & IA rework | — | 2–3 days |
| 10 | Nutrition & serving guidance (schema + backfill all 63 foods) | ships **before** 12 | 2–3 days |
| 11 | Planner — ordering science + drag-and-drop timeline | 10 nice-to-have | 3–4 days |
| 12 | Content 63 → 150 foods + media enrichment | 10 (new foods authored with the new fields once) | 4–5 days |
| 13 | Multi-baby support | — | 1–2 days |
| 14 | Insights & preference surfacing | 10 (nutrient coverage view) | ~2 days |
| 15 | Final name, custom domain, launch hardening | before any marketing push | ~2 days |

Parallelization notes: 8A, 9, and 10 have no dependency on 6 and can run alongside it. 10 must land before 12 so the 87 new foods are authored with nutrition fields once instead of backfilled twice. **Cut:** Spanish localization (owner decision 2026-08-22; the rev. 1 spec is preserved in git history at tag-worthy commit `01ebd6e` if revisited).

---

### Phase 6.0 — Persistence quick wins (~½ day)

**Goal:** until sign-in exists, make data loss unlikely and understood.

Tasks:
1. **Backup nudge banner** on `/today`: show when `logs.length ≥ 10` AND (never exported OR `lastExportAt` > 14 days ago). Add `lastExportAt?: string` and `backupNudgeSnoozedUntil?: string` to the store (persist-version bump per the versioning rule). Banner links to the History export; dismissing snoozes 7 days.
2. Set `lastExportAt` inside `exportJson()`.
3. Copy updates: `/about` privacy section and the onboarding disclaimer gain one sentence each on device-bound storage and Safari's ~7-day eviction; recommend **Add to Home Screen** on iOS.
4. Pure predicate `shouldNudgeBackup({logCount, lastExportAt, snoozedUntil, today})` in `src/lib/backup-nudge.ts` — no date logic in components.

**Verification:** table-driven predicate tests (fresh user / 9 vs 10 logs / recent export / stale export / active snooze / expired snooze); e2e: seed 10 logs → banner → export → gone; migration test (v1 persisted blob loads cleanly).

---

### Phase 6 — Sign-in & cross-device sync (~4 days) — PRIORITY #1

**Goal:** the owner-requested persistence story: log in with a common identity so data survives cleared caches, long absences, and new devices. Guest mode stays the default; nothing changes for signed-out users.

**Provider decision (owner asked to pick at least one of Google / iOS / email):**

| Provider | Status | Rationale |
|---|---|---|
| **Google OAuth** | ✅ primary, ships in this phase | Most common identity for the target demographic; zero email-deliverability work; free |
| **Email + password** (verification & reset via Resend) | ✅ secondary, ships in this phase | Covers the no-Google minority; Resend free tier suffices |
| **Sign in with Apple** | ⏸ optional Phase 6.1 | Requires Apple Developer Program enrollment ($99/yr) — one config task in better-auth once enrolled; do it if/when iOS installs matter |

**Locked stack:** Railway Postgres (`railway add --database postgres`, `DATABASE_URL` referenced into the service); Drizzle + drizzle-kit (migrations committed under `drizzle/`, run via `drizzle-kit migrate && next build` in the Railway build command); **better-auth** for both providers; snapshot sync with entity-level last-write-wins (LWW) on `updatedAt` + tombstones for deletes; the SAME Zod schemas from `src/lib/storage/schema.ts` validate every payload server-side.

**Schema (drizzle):**

```
user / session / account / verification   — better-auth generated tables
babies             (id uuid pk, user_id fk → user.id ON DELETE CASCADE, payload jsonb, updated_at timestamptz)
exposure_logs      (id uuid pk, baby_id fk CASCADE, payload jsonb, updated_at timestamptz, deleted_at timestamptz)
allergen_overrides (baby_id fk CASCADE, allergen_id text, payload jsonb, updated_at timestamptz, PK (baby_id, allergen_id))
push_subscriptions (user_id fk CASCADE, endpoint text pk, keys jsonb, created_at)      — used by Phase 8B
reminders          (id uuid pk, user_id fk CASCADE, kind text, payload jsonb, due_at timestamptz, sent_at timestamptz) — used by Phase 8B
```

`payload` is the exact client shape (no server-side querying beyond fetch-per-user, so jsonb beats columns).

**Client changes:**
1. Add `updatedAt: string` to `BabyProfile`, `ExposureLog`, `AllergenOverride` (persist + envelope version bump; importer accepts all prior versions).
2. `deleteLog` records the id in a `deletedLogIds: string[]` ledger (tombstones must sync).
3. `SyncedStore` layered on the existing store: signed in ⇒ every mutation schedules a debounced (2s) `POST /api/sync`; login and window-focus trigger `GET /api/sync`; merge = per entity id, newer `updatedAt` wins, tombstone beats older update.
4. **First-login migration:** server empty → push local snapshot. Server already has a different baby → conflict screen with exactly three choices: *keep this device's data* / *keep account data* / *merge (union logs by id, LWW on conflicts)*.
5. UI: prominent but skippable "Save your data — sign in with Google" card on `/today` once `logs ≥ 5` (replaces the 6.0 backup nudge when shown); `/account` page (identity, download-my-data-from-server, delete account); "synced ✓ / syncing…" indicator.

**API (route handlers, all session-gated, all Zod-validated):** `GET /api/sync` (snapshot), `POST /api/sync` `{baby?, logs[], overrides[], deletedLogIds[]}` (LWW merge, returns merged snapshot), `DELETE /api/account` (hard cascade + sign-out).

**Env:** `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID/SECRET`, `RESEND_API_KEY` — via `railway variables`, documented in README. Google OAuth consent screen setup steps documented (external, testing → production).

**Privacy (binding):** server stores identity + the envelope, nothing else; no analytics; delete is a hard cascade; `/about` updated to say exactly this.

**Verification:**
- Unit: LWW merge matrix (local newer / server newer / tombstone vs older / tombstone vs newer / unknown ids); Zod rejects malformed payloads; old envelopes still import.
- Integration (Vitest + pglite): migrations apply; push→pull roundtrip; account delete cascades all tables.
- Authorization: unauthenticated `/api/sync` → 401; two seeded users can never read/write each other's rows.
- e2e (local Postgres behind `ENABLE_SYNC_E2E=1`): guest history → sign in with email flow → second browser context sees identical history → edits flow back on focus → delete-account empties server, local guest data intact.
- Manual gates in the phase PR: real Google sign-in on production; Resend verification email delivered.

---

### Phase 8 — Reaction check-ins & reminders (~3–4 days)

**Goal:** the owner-requested killer feature: "I just fed a potential allergen — remind me to check for symptoms in 15 minutes / an hour / 2 days / a week." Plus the allergen-maintenance reminders from rev. 1. Two delivery tiers so guests get value before Phase 6 exists.

**Delivery-channel decision:** calendar (Google Calendar link + .ics) for everyone with zero server; web push + email for signed-in users. **SMS is explicitly out**: US A2P 10DLC registration, per-message cost, and carrier filtering make it unreasonable for a free product — calendar/push/email cover the need.

#### 8A — Check-ins, no account needed (ship first; no dependency on Phase 6)

1. **Offer on save:** after saving a log for a common-allergen food (or any food, via a "watch this one" toggle), the confirmation screen offers "Remind me to check for symptoms" with preset chips: **15 min · 1 h · 2 h (default, matches the watch-for-2-hours guidance) · 2 days · 1 week** — multi-select.
2. **Data:** `checkIns: {id, foodSlug, logId, dueAt, status: "pending"|"done"|"dismissed"}[]` in the store (version bump). Pure helpers in `src/lib/checkins.ts`: `dueAtForPreset(preset, now)`, `pendingCheckIns(checkIns, now)`, `onsetForElapsed(loggedAt, now)` → maps elapsed time to the log vocabulary (`<15m → immediate`, `<2h → within-2h`, `<6h → 2-6h`, else `next-day`).
3. **Delivery without a server:**
   - **Google Calendar link** per selected time — the `calendar.google.com/calendar/render?action=TEMPLATE&text=…&dates=…&details=…` URL template, prefilled: "Check {baby} for a reaction — {food} served {time}", details list the allergen's `reactionSigns` and deep-link back to the check-in.
   - **.ics download** (one VEVENT per check-in with a `VALARM` at T-0) for Apple/Outlook calendars.
   - **In-app:** a "Check-ins" card on `/today` listing due/overdue items (works with zero permissions); plus, if the tab is open and Notification permission was granted, a timer fires the notification at `dueAt`.
4. **Completing a check-in:** tapping it opens the symptom picker pre-bound to the original food; selected symptoms create a follow-up log with `symptomOnset` auto-set via `onsetForElapsed`; the emergency interrupt and triage behave exactly as in `/log`. "All clear" marks it done and (if it was the allergen's first exposure) surfaces the "next exposure" guidance from the allergen program.

#### 8B — Server-delivered reminders for signed-in users (needs Phase 6)

1. `web-push` (VAPID: `VAPID_PUBLIC_KEY/PRIVATE_KEY/SUBJECT`); subscriptions in `push_subscriptions`; opt-in card on `/today` — never prompt unasked. Service-worker `push` + `notificationclick` (opens the check-in).
2. Creating a check-in while signed in also writes a `reminders` row (kind `check-in`, `due_at`). **Email fallback** via Resend when the user has no push subscription (plain, single-purpose email: what was served, when, what to look for, link).
3. `POST /api/reminders/run` guarded by a `CRON_SECRET` header, scheduled every 5 minutes (Railway cron service, or a GitHub Actions `schedule` as fallback): send all `due_at ≤ now AND sent_at IS NULL`, set `sent_at` (idempotent), push first, email fallback.

#### 8C — Allergen-maintenance reminders (carried from rev. 1)

- Guests: "Add reminders to my calendar" on `/allergens` → client-generated .ics with a weekly-recurring event per *maintaining* allergen (`RRULE FREQ=WEEKLY`, twice-weekly via BYDAY for the first month).
- Signed-in: the daily pass of `/api/reminders/run` also evaluates engine rule R3 per user and enqueues at most ONE maintenance push/email per user per day, urgent lapses (>14 days) first.

**Verification:**
- Unit: `dueAtForPreset` for all 5 presets (DST-safe: computed in UTC from injected `now`); `onsetForElapsed` boundary table; Google Calendar URL encoding (spaces, ampersands, unicode food names); ICS validity snapshots (VALARM, RRULE); reminder selection (due-only, once-only, push-else-email).
- Integration: `/api/reminders/run` with mocked web-push/Resend asserts exact payloads, idempotency on double-run, and 401 without `CRON_SECRET`.
- e2e: log peanut → pick 2 h → `/today` shows the pending check-in → complete it with "a few hives" → follow-up log exists with `within-2h` onset and the milk— *(correction: peanut)* group pauses per triage; overdue badge renders; .ics downloads.
- Manual gate in the PR: one real push and one real email received.

---

### Phase 9 — Learn: first-visit education & IA rework (~2–3 days)

**Goal:** stop assuming visitors already understand why solids matter. A parent who lands cold gets the big picture in five minutes: why we do this at all (it is NOT mainly about calories), how fast to go, and why allergens are introduced deliberately.

**Content system:** new content type in `content/guides/*.ts`, Zod-validated like foods: `{slug, title, summary, minRead, sections: {heading, paragraphs[]}[], sources[]}`. Same rules: 100% original text, ≥2 sources per chapter, 400–800 words each, banned-source scan applies.

**Chapters (six, each with the key claims it must make):**
1. `why-solids` — milk (breast/formula) stays the main nutrition source until ~12 months; solids exist to (a) teach the *skills* of eating — chewing, moving food, swallowing textures, (b) protect iron and zinc stores that dip around 6 months, (c) build flavor/texture acceptance through repeated exposure, and (d) use the early window where introducing allergens *prevents* allergies (LEAP/EAT). Calories are a side effect at first, not the goal.
2. `when-to-start` — the readiness signs, why ~6 months (corrected age for preemies), the risks of much earlier/later.
3. `how-fast` — a realistic pace: first weeks are one "meal" a day and tastes count as wins; non-allergen foods can move quickly; common allergens go one at a time with ~3 days between new ones; by 9 months most babies take 2–3 meals/day; refusals are normal (8–15 relaxed offers).
4. `allergens-101` — the 9 allergens, the early-introduction evidence, risk tiers, why *keeping* an allergen in the diet matters as much as starting it.
5. `milk-and-solids` — how milk feeds change across 6–12 months, no cow's-milk drink before 12 months, water in an open cup, responsive feeding ("the parent decides what and when; the baby decides whether and how much").
6. `ordering` — what the evidence actually supports about food order (see Phase 11; this chapter is written there and linked here).

**IA changes:**
- New nav item **Learn** (`/learn` hub + `/learn/[slug]` chapters, SSG).
- Landing page: a "New to solids? Start here" strip (3 chapter cards) ABOVE the food teaser; hero subtext links `why-solids`.
- Onboarding step 0 gains a one-line collapsible: "What's the point of solids? → 2-minute read" (links, doesn't block).
- The `/today` not-ready gate links `when-to-start`; the allergen tracker links `allergens-101`; food-page footers link `how-fast`.

**Verification:** guides pass content-lint (extended: sources ≥2, word-count bounds, banned-source scan); SSG builds all chapters; e2e: landing → Learn strip → chapter renders with sources → back to onboarding CTA; not-ready gate links `when-to-start`; axe 0 critical on hub + one chapter; every claim in `why-solids` traceable to a Part I §3 source (reviewer checklist in the PR).

---

### Phase 10 — Nutrition & serving guidance (~2–3 days; MUST precede Phase 12)

**Goal:** owner request: highlight the nutrition/health side — "this food has this benefit, this is the watch-out, this is a sensible amount." **Explicit non-goal (binding):** no calorie or macro *tracking*. Infant feeding guidance is responsive — appetite varies wildly and the baby self-regulates; a counting UI would contradict the sources we cite. The copy says so, in those words: "watch the baby, not the numbers."

**Schema additions to `Food` (with lint rules):**
1. `nutrients: NutrientTag[]` — enum: `iron, zinc, protein, omega3, vitaminA, vitaminC, vitaminD, calcium, folate, fiber, healthyFats, potassium`. Lint: 1–4 tags per food.
2. `servingGuidance: {band, typicalAmount, frequency?, note?}[]` — e.g. carrot 6–8m: "Start with 1–2 soft sticks; let the baby set the pace — some days they'll gum one bite, some days three sticks." Lint: an entry for every band that has a PrepSpec; `typicalAmount` ≥ 4 words and contains a measure word (`teaspoon|tablespoon|stick|strip|piece|cube|slice|handful|ounce|half|quarter`).
3. `watchOuts?: string[]` (max 3) — non-choking cautions: sodium (cheese, bread, nori), vitamin A cap (liver), oxalates (spinach + calcium note), fruit-acid contact rash, mercury tiers, constipation/loosening effects (rice vs prunes).
4. `emoji?: string` — optional single emoji per food (used by Phase 11 planner chips and list views; cheap to backfill).

**UI:**
- Food page gains a **"Nutrition & serving"** card: nutrient chips, the active band's `typicalAmount` + `frequency`, watch-outs; iron-tagged foods auto-suggest vitamin-C-tagged pairings ("pair with strawberry — vitamin C boosts iron absorption") computed from tags, not hand-authored.
- `/today` pick cards show nutrient chips; the R1 iron reason already exists — now it's visually legible.
- Library filter row gains "Iron", "Omega-3", "Vitamin C" quick filters (driven by tags).

**Backfill:** all 63 foods get `nutrients`, `servingGuidance`, `emoji`, and `watchOuts` where warranted — parallel agent batches with a per-food nutrient table in the prompt (from the WIC guide / USDA knowledge), same authoring rules as Part I.

**Verification:** content-lint green with the new rules across 63; e2e: carrot page shows serving guidance + tags, iron→vitamin-C pairing chip renders on beef; engine behavior unchanged (recommendation snapshot test before/after); 10-food sample audited against sources in the PR; the "no counting" stance stated on `/about` and in the card's footer copy.

---

### Phase 11 — Planner: ordering science + drag-and-drop timeline (~3–4 days)

**Goal:** owner request, two halves. (1) Be honest about ordering science: iron-rich early and allergens early-one-at-a-time are evidence-backed; beyond that there is NO medically "correct" sequence — so (2) give parents a visual, configurable plan: drag food chips onto a week timeline, with the engine validating rather than dictating.

**Science content:** write the `ordering` chapter (`content/guides/ordering.ts`, linked from Phase 9's hub): what's supported (iron first; allergens early, one at a time, maintained), what's myth-adjacent (strict veg-before-fruit ordering — repeated exposure matters far more than sequence), and where parents have genuine freedom. ≥3 sources.

**Data model:** `plan: { anchorMonday: string; entries: {id, foodSlug, weekIndex}[] } | null` in the store (version bump; envelope carries it; importer accepts prior versions). 12-week horizon, week 0 = the week containing `anchorMonday`.

**Pure logic (`src/lib/planner/`):**
1. `generatePlan(baby, foods, weeks=12, today)` — deterministic suggested plan: weeks 0–1 seed iron-rich + `firstFoodPick` foods; allergens slotted per the baby's risk gates and R2 cadence (default one new allergen per week, peanut withheld for high-risk until cleared); variety spread across categories; choking-caution foods placed only in stage-appropriate weeks (uses corrected age per week).
2. `validatePlan(plan, baby, foods, today)` → per-entry warnings, never hard blocks except `knownAllergies` (blocked): `min-age` (food's minAge vs baby's corrected age *in that week*), `allergen-crowding` (>1 new allergen first-appearing in the same week), `allergen-paused`, `doctor-avoid`, `stage-mismatch` (high-choking-risk food before its geometry-safe stage).
3. `allergenOrderFromPlan(plan, foods)` → `AllergenId[]` by first-appearance week; the engine's R2 uses this order when a plan exists (falling back to `DEFAULT_ALLERGEN_ORDER` for unplanned allergens).
4. New engine rule **R10:** foods planned for the current week get **+1.25** score with reason "On your plan for this week"; `todaysPicks` therefore follow the plan without ignoring safety rules (all exclusions still apply).

**UI `/plan`:**
- Week lanes ("This week", "Week of Sep 7", … 12 weeks) — horizontal scroll on desktop, vertical stack on mobile; food chips = `emoji + name` (+ amber warning badge with the validation reason on tap).
- **Drag and drop via `@dnd-kit/core`** (the one new dependency; touch + keyboard sensors — keyboard operability is an a11y gate). A searchable/filterable tray of unplanned foods (reuses the library filters); drag to a week, drag between weeks, tap-remove.
- Buttons: **"Suggest a plan"** (`generatePlan`; confirm-overwrite if entries exist) and **"Clear plan"** (confirm).
- Empty state teaches the ordering science in two sentences + links the `ordering` chapter.
- `/allergens` additionally gets a simple **drag-to-reorder allergen list** (same dnd-kit, one dimension) writing `baby.allergenOrder` — the non-calendar way to configure order, kept in sync with `allergenOrderFromPlan` precedence (plan wins when present; the UI says which is in effect).

**Verification:**
- Unit: `generatePlan` determinism (same input ⇒ same plan) and gate matrix (high-risk peanut never auto-planned pre-clearance; no >1 new allergen/week; min-age respected using corrected age at week N); `validatePlan` warning matrix incl. the knownAllergies hard block; `allergenOrderFromPlan` extraction; R10 scoring + reason string; engine determinism suite still green.
- e2e: suggest a plan → ≥8 populated weeks; drag carrot from tray to week 2 via keyboard sensor (a11y path); drop egg and milk into the same week → crowding warning renders with reason; `/today` shows the "On your plan" reason for a planned food; clear-plan restores default allergen order.
- axe 0 critical on `/plan`; plan roundtrips through export/import.

---

### Phase 12 — Content expansion: 63 → 150 foods + media enrichment (~4–5 days)

As specced in rev. 1, with one change: **all 87 new foods are authored with the Phase 10 fields** (`nutrients`, `servingGuidance`, `emoji`, `watchOuts`) from the start.

- **Target list (+87, equivalents swappable, count may not drop):** proteins (12): trout, tilapia, halibut, canned light tuna (mercury note), crab [shellfish], scallops [shellfish] ⚠, mussels [shellfish], duck, bison, venison, sole, tempeh [soy] · dairy (6): kefir, cottage cheese, ricotta, paneer, goat cheese, butter/ghee · legumes (6): white/kidney/pinto beans, split peas, mung beans, lima beans · nuts & seeds (7): ground pecan, ground pistachio, hazelnut butter ⚠ [all tree-nut], pumpkin-seed butter ⚠, hemp seeds, gelled chia, ground flaxseed · grains (9): buckwheat, millet, couscous [wheat], tortilla [wheat], pita [wheat] ⚠, amaranth, teff, spelt [wheat], soba [wheat] · vegetables (17): asparagus, mushrooms, cabbage, kale, brussels sprouts, eggplant, celery ⚠, corn on the cob, snap peas ⚠, radish ⚠, leek, onion, parsnip, turnip, pumpkin, okra, swiss chard · fruits (17): plum, apricot, nectarine, cantaloupe, honeydew, pineapple, pomegranate arils ⚠⚠, fig, dates ⚠, papaya, lychee ⚠⚠ (the classic aspiration fruit — say so), persimmon, clementine, blackberry, cooked cranberry, coconut, guava · herbs & spices (10, new category `herb-spice`): cinnamon, cumin, ginger, turmeric, paprika, dill, basil, oregano, mint, cilantro · fats/other (3): avocado oil, nutritional yeast, nori ⚠.
- Schema: `cuisineTags?: string[]`; category enum + labels + import-flow grouping gain `herb-spice`.
- New lint rules: every `chokingRisk: "high"` food carries a `cutDiagram` in every band; per-category minimums (veg ≥ 30, fruit ≥ 30, protein ≥ 25, grain ≥ 20, legume ≥ 12, dairy ≥ 8, herb-spice ≥ 10, fat-other ≥ 4); corpus minimum via `FOODS_MIN` env (default 60, flipped to 150 in the final commit).
- Media: top 30 foods get one verified health-org video (`MediaLink` with license + `verifiedOn`); `check-links` gains YouTube oEmbed validation (`youtube.com/oembed?url=…` → 200, no API key). Diagrams-first stands — no filler links.
- Authoring: same canonical templates and parallel agent batches (~12/batch) with per-food flag + nutrient tables in prompts; `gen:food-index` + lint per batch.

**Verification:** content-lint green at 150 with all rules (incl. Phase 10 fields on every food); each of the 9 allergens has ≥2 delivery foods; oEmbed checks pass; ⚠⚠ foods name their hazard in `chokingNotes`' first sentence; 10% random sample re-checked against sources in the PR; e2e browse passes with the herb-spice filter.

---

### Phase 13 — Multi-baby support (~1–2 days)

As rev. 1: store migration to `{babies: BabyProfile[], activeBabyId}` (logs already carry `babyId`; `AllergenOverride` and the Phase 11 `plan` gain per-baby scoping in the same migration); nav switcher rendered only with 2+ babies; "Add another baby" reuses the onboarding wizard (`?add=1`); export envelope carries all babies; importer accepts every prior version; if Phase 6 shipped, `allergen_overrides` PK gains the baby dimension via drizzle migration.

**Verification:** migration unit tests from each prior persisted version incl. override/plan stamping; e2e twins scenario (separate logs/plans, `/today`, `/plan`, `/history` never leak across); 2-baby export/import roundtrip; engine tests untouched.

---

### Phase 14 — Insights & preference surfacing (~2 days)

**Goal:** rev. 1's insights plus the owner's thumbs request — surface what the baby loves. (Recording already exists: every log carries loved/neutral/disliked/refused; quick-log keeps the 4 options since they're a strict superset of 👍/👎 and the retry engine needs the distinction between "disliked" and "refused".)

Tasks:
1. `src/lib/insights/` pure selectors with fixtures: `categoryVariety(14d)`, `ironExposuresPerWeek`, `allergenCoverage`, `textureTimeline`, `persistentRefusals` (attempt counts + the 8–15-tries reframing), **`acceptance(foodSlug)`** → `loved | warming-up | needs-retries | not-tried` derived from enjoyment history (latest-weighted), and `nutrientCoverage(7d)` from Phase 10 tags.
2. `/insights` page: stat tiles + zero-dependency inline-SVG spark bars (`components/charts/Spark.tsx`, currentColor-aware), each stat linking to the filtered history behind it; accessible table alternative per chart.
3. **Preference surfacing:** library gains "❤️ Loved" and "🔁 Needs retries" quick filters; food pages show an acceptance strip (attempt dots colored by enjoyment); `/today` gets a small "Greatest hits" row (top-3 loved foods not served this week — comfort anchors when introducing something new, which is also evidence-aligned: pair new with familiar).
4. Copy guardrail (binding): descriptive only — no percentiles, no "normal", no deficiency language; gaps phrased as suggestions.

**Verification:** unit tests per selector incl. empty/single-log fixtures and the acceptance state machine table; e2e: seeded 3-week history renders counts, loved-filter shows the loved food, greatest-hits row renders and links to `/log`; meaningful at 0 logs; axe 0 critical; no new chart dependencies.

---

### Phase 15 — Final name, custom domain, launch hardening (~2 days)

As rev. 1: name shortlist → knockout search (USPTO TESS classes 9/41/44, domains, app stores, handles) → owner picks → single-point rename via `src/lib/brand.ts` with a grep gate (zero "OpenSolids" outside brand.ts and git history); custom domain (`railway domain add`, `NEXT_PUBLIC_SITE_URL` update, 301 from the railway.app subdomain); per-food OG images via `next/og`; `@axe-core/playwright` scan of `/`, `/foods`, `/foods/carrot`, `/today`, `/log`, `/safety`, `/plan`, `/learn` as a CI gate (0 critical); `/api/health` + Railway healthcheck + weekly production ping; zero-third-party error stance documented; licensing defaults for owner sign-off (code MIT, content CC BY 4.0).

**Verification:** domain 200 + TLS, old subdomain 301s; OG cards validate on 3 spot-checked foods; axe CI job green; healthcheck wired; rename grep gate passes; full `npm run check` + e2e + Lighthouse ≥ 90 re-run on the renamed production deploy.
