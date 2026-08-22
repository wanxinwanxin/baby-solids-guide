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

# Part II — Post-v1 roadmap

Written 2026-08-22, immediately after v1 shipped. Same contract as Part I: an implementation agent works phase by phase, runs every check in a phase's **Verification** block before moving on, and commits once per completed phase (or per sub-phase where marked). Phases here are independent unless the dependency column says otherwise.

## How persistence works today (context for Phase 6.0/6)

v1 is local-first: the Zustand store persists to `localStorage` (key `opensolids-v1`), so **data already survives across sessions automatically in the same browser — no export/import needed day-to-day.** Export/import exists for backups and device moves. The real gaps:

1. **Device-bound** — a new phone/laptop/browser starts empty until a JSON import.
2. **Safari/iOS eviction** — WebKit may purge script-writable storage after ~7 days without a visit (installing to the home screen largely exempts it). A daily-use feeding app is usually safe, but a family that lapses two weeks can lose data.
3. **Site-data clearing** wipes everything with no recovery.

Phase 6.0 mitigates with backup nudges; Phase 6 solves it properly with opt-in accounts + sync. Guest mode remains the default forever.

## Sequencing & sizing

| Phase | What | Depends on | Size |
|---|---|---|---|
| 6.0 | Persistence quick wins (backup nudges, iOS guidance) | — | ½ day |
| 6 | Accounts & cross-device sync | 6.0 recommended | ~4 days |
| 8 | Allergen maintenance reminders (calendar + web push) | 6 (push path only) | 2–3 days |
| 9 | Content 63 → 150 foods + media enrichment | — | 4–5 days |
| 10 | Multi-baby support | — | 1–2 days |
| 11 | Insights dashboard | — | ~2 days |
| 12 | Localization (Spanish first) | 9 recommended first | 3–4 days (stretch) |
| 13 | Final name, custom domain, launch hardening | before any marketing push | ~2 days |

---

### Phase 6.0 — Persistence quick wins (~½ day)

**Goal:** until accounts exist, make data loss unlikely and understood.

Tasks:
1. **Backup nudge banner** on `/today`: show when `logs.length ≥ 10` AND (never exported OR `lastExportAt` > 14 days ago). Add `lastExportAt?: string` and `backupNudgeSnoozedUntil?: string` to the store (persist-version bump 1→2 with a `migrate` that backfills nothing — new optional fields only). Banner links to the History export button; dismissing snoozes 7 days.
2. Set `lastExportAt` inside `exportJson()`.
3. Copy updates: `/about` privacy section and the onboarding disclaimer gain one sentence each on device-bound storage and Safari's ~7-day eviction; recommend **Add to Home Screen** on iOS.
4. Pure predicate `shouldNudgeBackup({logCount, lastExportAt, snoozedUntil, today})` in `src/lib/backup-nudge.ts` — no date logic in components.

**Verification:** table-driven unit tests for the predicate (fresh user / 9 vs 10 logs / recent export / stale export / active snooze / expired snooze); e2e: seed 10 logs → banner visible → export → banner gone; store migration test (v1 persisted blob loads under v2).

---

### Phase 6 — Accounts & cross-device sync (~4 days)

**Goal:** opt-in account that syncs a family's data across devices. Guest mode stays the default; nothing about v1 flows changes for signed-out users.

**Locked decisions:**

| Decision | Choice | Rationale |
|---|---|---|
| Database | Railway Postgres (`railway add --database postgres`; `DATABASE_URL` referenced into the app service) | Same platform, one bill |
| ORM / migrations | Drizzle + drizzle-kit, migrations committed under `drizzle/` | Typed, CI-checkable |
| Auth | better-auth: email+password (verification & reset via Resend) + Google OAuth | Self-hosted, no per-MAU pricing, works on Railway |
| Sync model | Snapshot merge with entity-level last-write-wins (LWW) on `updatedAt`; tombstones for deleted logs | Data volume is tiny (<5k rows/family); simplest correct model |
| Server validation | The SAME Zod schemas from `src/lib/storage/schema.ts` validate every payload server-side | One source of truth |
| Integration tests | pglite (in-process Postgres) in Vitest — no service containers needed for unit/integration CI | Fast, hermetic |

**Schema (drizzle):**

```
user / session / account / verification   — better-auth generated tables
babies             (id uuid pk, user_id fk → user.id ON DELETE CASCADE, payload jsonb, updated_at timestamptz)
exposure_logs      (id uuid pk, baby_id fk CASCADE, payload jsonb, updated_at timestamptz, deleted_at timestamptz)
allergen_overrides (baby_id fk CASCADE, allergen_id text, payload jsonb, updated_at timestamptz, PK (baby_id, allergen_id))
push_subscriptions (user_id fk CASCADE, endpoint text pk, keys jsonb, created_at)   — used by Phase 8
```

`payload` is the exact client shape. No server-side querying beyond fetch-per-user, so jsonb beats columns.

**Client changes:**
1. Add `updatedAt: string` to `BabyProfile`, `ExposureLog`, `AllergenOverride`; persist-version bump (backfill `updatedAt = now` in `migrate`). Export envelope becomes `schemaVersion: 2`; importer accepts v1 and v2.
2. `deleteLog` also records the id in a `deletedLogIds: string[]` ledger (tombstones must sync).
3. `SyncedStore` layered on the existing store: when signed in, every mutation schedules a debounced (2s) `POST /api/sync`; login and window-focus trigger `GET /api/sync`; merge rule = per entity id, newer `updatedAt` wins, tombstone beats older update.
4. **First-login migration:** server empty → push local snapshot. Server already has a different baby → conflict screen with exactly three choices: *keep this device's data* / *keep account data* / *merge (union logs by id, LWW on conflicts)*.
5. UI: `/account` page (email, linked provider, "download my data from the server", delete account), sign-in entry on `/history` and the footer, subtle "synced ✓ / syncing…" indicator on `/today`.

**API (route handlers, all behind the better-auth session, all Zod-validated):**
- `GET /api/sync` → full snapshot for the user.
- `POST /api/sync` `{baby?, logs[], overrides[], deletedLogIds[]}` → server merges LWW, returns merged snapshot.
- `DELETE /api/account` → cascade delete + sign-out.

**Env & ops:** `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID/SECRET`, `RESEND_API_KEY` — set via `railway variables`; document in README. Drizzle migrations run in the Railway build command (`drizzle-kit migrate && next build`).

**Privacy (binding):** server stores email + the envelope, nothing else; no analytics added; delete is a hard cascade; `/about` updated to say exactly this.

**Verification:**
- Unit: LWW merge matrix (local newer / server newer / tombstone vs older update / tombstone vs newer update / unknown ids), Zod rejects malformed payloads, envelope v1 import still works.
- Integration (Vitest + pglite): migrations apply cleanly; push→pull roundtrip; account delete cascades all four tables.
- Authorization tests: unauthenticated `/api/sync` → 401; user A can never read/write user B's rows (explicit test with two seeded users).
- e2e (local Postgres via `docker run postgres` or a Railway dev DB, behind `ENABLE_SYNC_E2E=1` so default CI stays hermetic): guest builds history → signs up → second browser context signs in and sees identical history → edits there → first context pulls on focus → delete-account empties the server and leaves local guest data intact.
- Manual gate: sign-up email actually delivered via Resend on the production deploy (documented in the phase PR).

---

### Phase 8 — Allergen maintenance reminders (~2–3 days; push path needs Phase 6)

**Goal:** the engine already computes "peanut is overdue" (R3) — deliver that insight when the app is closed. Two delivery paths so guests get value too.

**Path A — calendar file (works for everyone, no server):**
1. `icsForMaintenance(allergenStates, now)` pure function → VCALENDAR with one weekly-recurring event per *maintaining* allergen ("Serve peanut — keeping it in rotation maintains tolerance", RRULE `FREQ=WEEKLY;INTERVAL=1`, two per week for the first month via a second BYDAY).
2. "Add reminders to my calendar" button on `/allergens` → client-side Blob download.

**Path B — web push (account users):**
1. `web-push` (VAPID) — env `VAPID_PUBLIC_KEY/PRIVATE_KEY/SUBJECT`; subscriptions in the Phase 6 `push_subscriptions` table; opt-in card on `/today` (never prompt unasked).
2. Service-worker `push` + `notificationclick` handlers (open `/today`).
3. `POST /api/notify/run` guarded by `CRON_SECRET` header: for each user with subscriptions, load snapshot → run the engine with injected `today` → send at most ONE push/day/user, only for `urgent` maintenance lapses (>14 days) or a newly-eligible next allergen. Schedule: Railway cron service (or a GitHub Actions `schedule` hitting the endpoint) daily 16:00 UTC.

**Verification:** unit — ICS output snapshot (valid RRULEs, escaping) and notify-selection logic (reuses R3; cases: no lapse → no push, lapse → one push, two lapses → still one push, already pushed today → none); integration — `/api/notify/run` with a mocked `web-push` asserts exact payloads and the CRON_SECRET gate (401 without); e2e — opt-in flow persists a subscription row; manual gate — one real push received on a phone, screenshot in the PR.

---

### Phase 9 — Content expansion: 63 → 150 foods + media enrichment (~4–5 days)

**Goal:** cover a family's real grocery run, add the herbs/spices program, and put a verified video on the top foods — same lint-enforced quality bar as v1.

**Schema additions (with lint rules):**
1. `cuisineTags?: string[]` on Food (free-form, lowercase).
2. New category `herb-spice` (enum extension + `CATEGORY_LABELS` + import-flow grouping).
3. New lint rules: every `chokingRisk: "high"` food must carry a `cutDiagram` in **every** band; per-category minimums at completion (vegetable ≥ 30, fruit ≥ 30, protein ≥ 25, grain ≥ 20, legume ≥ 12, dairy ≥ 8, herb-spice ≥ 10, fat-other ≥ 4); corpus minimum parameterized (`FOODS_MIN` env, default 60, flipped to 150 in the phase's final commit so intermediate merges stay green).

**Target list (+87; equivalents may be swapped if sourcing is weak, count may not drop):**
- *Proteins (12):* trout, tilapia, halibut, canned light tuna (mercury-tier note), crab [shellfish], scallops [shellfish] ⚠(rubbery), mussels [shellfish], duck, bison, venison, sole, tempeh [soy]
- *Dairy (6):* kefir, cottage cheese, ricotta, paneer, goat cheese, butter/ghee
- *Legumes (6):* white beans, kidney beans, pinto beans, split peas, mung beans, lima beans
- *Nuts & seeds (7):* ground pecan [tree-nut], ground pistachio [tree-nut], hazelnut butter [tree-nut] ⚠, pumpkin-seed butter ⚠, hemp seeds, chia (gelled, hydration note), ground flaxseed
- *Grains (9):* buckwheat, millet, couscous [wheat], tortilla [wheat], pita [wheat] ⚠(gummy), amaranth, teff, spelt [wheat], soba [wheat]
- *Vegetables (17):* asparagus, mushrooms, cabbage, kale, brussels sprouts, eggplant, celery ⚠(strings), corn on the cob, snap peas ⚠, radish ⚠(hard raw), leek, onion, parsnip, turnip, pumpkin, okra, swiss chard
- *Fruits (17):* plum, apricot, nectarine, cantaloupe, honeydew, pineapple, pomegranate arils ⚠⚠, fig, dates ⚠(sticky), papaya, lychee ⚠⚠(the classic aspiration fruit — say so), persimmon, clementine, blackberry, cranberry (cooked), coconut, guava
- *Herbs & spices (10):* cinnamon, cumin, ginger, turmeric, paprika, dill, basil, oregano, mint, cilantro — prep specs describe amounts (a pinch stirred into a familiar food), the "flavor variety without salt/sugar" rationale, and any staining/irritation notes
- *Fats/other (3):* avocado oil, nutritional yeast, nori/seaweed ⚠(sodium + clinging-film note)

**Authoring process:** identical to v1 — carrot/peanut-butter as canonical templates, parallel agent batches of ~12 with per-food flag tables in the prompt, `gen:food-index` + content-lint after each batch, no solidstarts.com contact ever.

**Media enrichment:** top 30 foods (by first-food relevance) each get one `MediaLink` video from an official health-org channel (NHS, children's hospitals, WIC programs), license + `verifiedOn` recorded; extend `check-links` to validate YouTube links via the oEmbed endpoint (`https://www.youtube.com/oembed?url=…` → 200 = live, no API key). Diagrams-first rule stands: no filler links.

**Verification:** content-lint green at 150 with the new rules; every one of the 9 allergens now has ≥ 2 delivery foods; oEmbed checks pass in CI; every new ⚠⚠ food (pomegranate, lychee) names its hazard in the first sentence of `chokingNotes`; 10% random sample re-checked against cited sources, documented in the phase PR; e2e browse still passes (categories filter includes herb-spice).

---

### Phase 10 — Multi-baby support (~1–2 days)

**Goal:** twins and second kids without re-onboarding. The data model was built for this (logs already carry `babyId`); this phase is storage shape + UI.

Tasks:
1. Store migration v2→v3: `{baby: BabyProfile|null}` → `{babies: BabyProfile[], activeBabyId: string|null}`; `AllergenOverride` gains `babyId` (migration stamps existing overrides with the existing baby's id). Export envelope v3 carries all babies; importer accepts v1/v2/v3.
2. Selectors: `activeBaby()`, logs/overrides filtered by `activeBabyId` everywhere the engine or UI reads them (grep gate: no direct `state.babies[0]`).
3. UI: baby switcher in `AppNav` (rendered only when `babies.length > 1`), "Add another baby" on `/history` reusing the onboarding wizard with a `?add=1` flag, per-baby delete.
4. Phase 6 interaction (if shipped): `babies` is already multi-row server-side; `allergen_overrides` PK gains the baby dimension via migration.

**Verification:** migration unit tests (v1→v3, v2→v3, override stamping); e2e: onboard baby A → add baby B → log different foods for each → `/today` and `/history` switch cleanly and never leak across; export/import roundtrip with two babies; engine tests untouched (it always receives one baby).

---

### Phase 11 — Insights dashboard (~2 days)

**Goal:** answer "how are we actually doing?" from data already logged — descriptive only, zero diagnostic claims.

Tasks:
1. `src/lib/insights/` pure selectors, each with fixtures: `categoryVariety(logs, foods, 14d)` (distinct foods per category), `ironExposuresPerWeek(logs, foods)`, `allergenCoverage(states)` (introduced/maintaining/paused counts), `textureTimeline(logs)` (band used over time), `persistentRefusals(logs)` (attempt counts on refused foods, with the 8–15-tries reframing).
2. `/insights` page (client): stat tiles + zero-dependency inline-SVG spark bars (`components/charts/Spark.tsx`, `currentColor`-aware); every stat links to the filtered history behind it; accessible table alternative for each chart.
3. Copy guardrail (binding): no percentiles, no comparisons to "normal", no deficiency language — celebrate variety, surface gaps as suggestions ("nothing from legumes in 2 weeks — lentils reheat well").

**Verification:** unit tests per selector incl. empty-state and single-log fixtures; e2e: seeded 3-week history renders expected counts, `/insights` renders meaningfully at 0 logs (pointing to `/log`); axe 0 critical; no new npm dependencies (chart lib ban enforced by review).

---

### Phase 12 — Localization: Spanish first (~3–4 days, stretch)

**Goal:** the WIC-adjacent audience is heavily Spanish-speaking; ship `/es` without forking content quality.

Tasks (sub-phased; commit each):
1. **12.0 UI strings:** next-intl with app-router locale segment; extract all UI strings to `messages/en.json`; machine-translate to `messages/es.json` then flag a native-speaker review task (blocking for launch of `/es`, not for merge); locale switcher in the footer; `hreflang` metadata.
2. **12.1 content overlay:** `content/foods-es/<slug>.ts` partial overrides (name, form, passFailTest, tips first — the safety-critical strings); loader falls back per-field to English with a visible "EN" badge; lint report lists translation coverage per food (informational, not blocking).
3. **12.2 units:** authoring rule going forward — dual units inline ("1 teaspoon (5 ml)"); applied to all `-es` content and new English content.

**Verification:** build renders both locales; message-key parity check (en/es same key set) as a lint script; e2e smoke: onboarding happy path in `/es`; safety pages (`/safety`, emergency interrupt) fully translated before `/es` is linked publicly — explicit checklist in the PR; native-review sign-off recorded before announcement.

---

### Phase 13 — Final name, custom domain, launch hardening (~2 days)

**Goal:** shed the codename and make the deployment boring.

Tasks:
1. **Name:** shortlist 5 candidates → knockout search each (USPTO TESS live-mark search for classes 9/41/44, .com/.app domain availability, App Store/Play, top social handles) → owner picks → mechanical rename: introduce `src/lib/brand.ts` exporting `BRAND` consumed by layout, nav, manifest, README, and about; grep gate: zero "OpenSolids" occurrences outside `brand.ts` and git history.
2. **Domain:** buy + `railway domain add`; update `NEXT_PUBLIC_SITE_URL`; permanent redirect from the railway.app subdomain (host check in `next.config` redirects).
3. **Per-food OG images:** `opengraph-image.tsx` under `foods/[slug]` via `next/og` — food name, the 6–8m form sentence, brand mark; verify with a card validator.
4. **a11y as a CI gate:** `@axe-core/playwright` scan of `/`, `/foods`, `/foods/carrot`, `/today`, `/log`, `/safety` — 0 critical violations, wired into the e2e job.
5. **Ops:** `/api/health` (returns build sha) + Railway healthcheck path; weekly workflow already re-checks links — add a production ping step; error visibility stays zero-third-party (Railway logs; a `window.onerror` console breadcrumb only) — documented in `/about`.
6. **Licensing (owner decision, defaults):** code MIT; content CC BY 4.0 with attribution requirements in README; `LICENSE` + `SECURITY.md` added.

**Verification:** custom domain serves 200 with valid TLS and the old subdomain 301s; OG image renders for 3 spot-checked foods; axe job green in CI; healthcheck shows in Railway; rename grep gate passes; `npm run check` + e2e + Lighthouse ≥ 90 re-run on the renamed production deploy.
