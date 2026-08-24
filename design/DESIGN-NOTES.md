# OpenSolids redesign — design handoff

Mockups for the redesign specced in "OpenSolids Design Brief.pdf" (repo root). Every screen is built from real repo content: prep specs from `content/foods/*.ts`, readiness signs and quiz from `OnboardingWizard.tsx`, guide titles from `content/guides/`, engine states from `today/page.tsx`.

## Viewing
Open any `.dc.html` in a browser (keep `support.js` beside them; fonts load from Google Fonts, so internet needed). Files:

- `01 Tokens & Brand` — palette light+dark, type ramp, 3 brand-mark candidates (A "open cut" recommended), radius/shadow/spacing, core controls
- `02 Cut Diagrams` — the signature asset: template anatomy + 5 exemplars (banana, peanut butter, egg, broccoli, salmon)
- `03 Landing` — desktop 1440 + mobile 390
- `04 Today` — ready / gated (incl. pediatrician early-start card) / empty
- `05 Food Detail` — banana; question-led H2s, diagram-first prep, receipts footer
- `06 Foods Database` — search-first, filter chips, diagram-thumbnail cards
- `07 Onboarding` — 4 steps + both verdict moments
- `08 Mobile` — bottom tab bar with centered "+ Log" FAB, 2-tap log sheet, severe-reaction interrupt

## Tokens — "garden ledger"

Drop-in replacement for the shadcn zinc tokens in `src/app/globals.css`:

```css
:root {
  --background: #FBF8F3;      /* paper */
  --foreground: #1F2E26;      /* ink */
  --card: #FFFEFB;
  --card-foreground: #1F2E26;
  --primary: #1E7A52;         /* botanical — the owned hue */
  --primary-foreground: #FBF8F3;
  --secondary: #E6F0E9;       /* botanical tint */
  --secondary-foreground: #175E40;
  --muted: #F2F6F1;           /* wash */
  --muted-foreground: #5D6C62;
  --accent: #C97F1E;          /* honey — caution + nutrition highlights */
  --accent-foreground: #7A4E0C; /* honey text on tint #F7ECD9 */
  --destructive: #B4462E;     /* terracotta — SAFETY ONLY (triage, choking, reactions) */
  --destructive-foreground: #FFF7F2;
  --border: #E7E0D4;
  --input: #E7E0D4;
  --ring: #1E7A52;
  --radius: 0.75rem;          /* 12px cards; 6 chips; 20 heroes; 999 pills/buttons */
}
.dark {
  --background: #141C17;
  --foreground: #EDE9DE;
  --card: #1C2620;
  --primary: #57B48A;
  --primary-foreground: #141C17;
  --secondary: #1F3129;
  --secondary-foreground: #8FBFA5;
  --muted: #1C2620;
  --muted-foreground: #A3AFA3;
  --accent: #E2A54F;          /* honey tint dark: #33291A */
  --destructive: #DC7457;     /* terracotta tint dark: #362019 */
  --border: #2E3A31;
}
```

Deep/hover shades: botanical `#175E40`, honey text `#96610F`. Tints: botanical `#E6F0E9`, honey `#F7ECD9`, terracotta `#F7E7E1` (light). Shadows are ink-tinted, never gray: rest `0 1px 2px rgba(31,46,38,.05)`, raised `0 8px 24px -12px rgba(31,46,38,.22)`, overlay `0 20px 44px -16px rgba(31,46,38,.28)`.

**Hard rule:** terracotta only on triage/warnings/choking/reaction states. Honey carries caution + iron/nutrition. Category chips are tints of the core palette — never new hues.

## Type

Google Fonts (free): **Bricolage Grotesque** 700/800 (display, never below 20px) · **Figtree** 400–700 (all UI/body) · **JetBrains Mono** 400–600 (every number: ages, counts, dates — `font-variant-numeric: tabular-nums`).

```
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap');
```

Scale: display 44–56/800, H1 32/800, H2 24–26/700, H3 18 (Figtree 700), body 16/400/1.6, small 14/500, data mono 11–13/500. Replaces Geist; keep Geist Mono only if JetBrains Mono is unwanted.

## IA changes

Top nav consolidates 9 → 5: **Today · Foods · Plan · Learn · More** (Allergens, History, Insights, Safety, Account under More or surfaced contextually). Mobile: bottom tab bar Today · Foods · **+ Log FAB** · Plan · Learn. Emergency reachable ≤ 1 tap from any logging screen.

## Cut diagrams (signature asset)

Line language: ink `#1F2E26` 2.5px stroke, botanical fills `#E6F0E9`/`#D8E8DD`, dashed green = the cut, hatching = grip zone, honey outline = the adult-finger scale unit, band chip mono, pass/fail caption, `OPENSOLIDS · CC BY 4.0` footer. Extends `src/components/diagrams/CutDiagram.tsx`'s 9 parametric variants — generate the long tail from `prepSpecs[].cutDiagram` at build time; the 5 exemplars are the drawn reference. Cards double as 1200×630 OG/social images.

## Motion budget

One orchestrated landing scroll moment (banana diagram redraws across bands) · one-time ~400ms confetti settle on the readiness verdict + first-food/first-allergen logs · 150–200ms ease-out everywhere else · full `prefers-reduced-motion` respect.

## Acceptance criteria (from the brief)

WCAG AA contrast in both themes · 390px zero horizontal overflow · all type from the two families (+ mono for data) · semantic colors reserved for safety meaning · mobile targets ≥ 44px.

## Open items

- Dark-mode screen mockups (tokens are specced; screens shown light)
- Final mark pick (A/B/C on sheet 01) + favicon/manifest export
- Remaining cut-diagram exemplars beyond the 5, if wanted before parametric generation
