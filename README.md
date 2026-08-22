# OpenSolids 🥄

A **free, open, science-based guide for starting your baby on solid foods** — exact safe textures for every food, daily recommendations that adapt to your baby, and allergy playbooks grounded in NIAID, AAP, CDC, and WHO guidance.

> Educational guidance, not medical advice. Your pediatrician's word always wins. In an emergency, call 911.

## What it does

- **Texture-first food guidance** — 63 foods, each with a measurably precise safe form per age band (6–8m / 9–12m / 12–24m), a physical pass/fail test (the "squish test"), prep steps, common mistakes, original cut diagrams, and kitchen tips for actually achieving the texture.
- **Dynamic daily plan** — a deterministic recommendation engine prioritizes iron-rich foods, paces the 9 common allergens (one at a time, risk-stratified per the NIAID guidelines), nudges texture progression, re-queues refused foods, and hard-blocks unsafe items (honey <12m, unmodified choking hazards, …).
- **Meets you where you are** — a fresh-start wizard *and* a mid-journey import flow (tap what you've tried, set allergen statuses, pick a texture stage, or restore a JSON backup).
- **Allergy playbooks** — a reaction triage table from "that's normal gagging" to a full-screen **call-911 interrupt**, an allergen tracker, and per-allergen introduction programs.
- **Free & private** — no accounts, no ads, no trackers. Everything lives in your browser; export/import JSON any time.

## Science & sourcing

Every food entry and engine rule cites a free, authoritative source (CDC, USDA WIC, NIAID, AAP/healthychildren.org, NHS Start for Life, WHO, FDA, LEAP/EAT studies). CI enforces it: the content lint fails the build on any uncited claim, vague texture spec, missing choking mitigation, or reference to proprietary competitors, and a weekly job re-verifies every source link. See [`/about`](src/app/about/page.tsx) and [ROADMAP.md](ROADMAP.md) for the methodology.

## Development

```bash
npm install
npm run dev          # http://localhost:3000

npm run check        # typecheck + lint + unit tests + content lint
npm run test         # vitest (engine, triage, age math, storage)
npm run e2e          # Playwright journeys (needs: npx playwright install chromium)
npm run content-lint # validate the food database
npm run check-links  # verify every cited URL is live
npm run gen:food-index  # regenerate content/foods/index.ts after adding a food
```

### Adding a food

1. Copy `content/foods/carrot.ts` (the canonical template) to `content/foods/<slug>.ts`.
2. Write original text from the sources in `content/sources.ts` — precise `form` sentences with household size references, a physical `passFailTest`, real kitchen tips.
3. `npm run gen:food-index && npm run content-lint`.

### Stack

Next.js (App Router) · TypeScript · Tailwind + shadcn/ui · Zod-validated content-as-code · Zustand (localStorage, local-first) · Vitest + Playwright · deployed on Railway, CI on GitHub Actions.

## License & trademark note

"OpenSolids" is a working codename. This project is not affiliated with any commercial infant-feeding program; all content is original and written from public primary sources.
