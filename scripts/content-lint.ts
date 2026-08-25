/**
 * Content lint — CI gate (ROADMAP §11.2).
 *
 * Validates every food entry against the Zod schema plus cross-field rules
 * the type system can't express. Exits non-zero on any violation.
 */
import fs from "node:fs";
import path from "node:path";

const FOODS_DIR = path.join(process.cwd(), "content", "foods");
const CONTENT_DIR = path.join(process.cwd(), "content");

async function main() {
  const errors: string[] = [];

  // Banned-source check runs even before any food exists.
  scanBannedSources(CONTENT_DIR, errors);

  if (!fs.existsSync(FOODS_DIR)) {
    console.log("content-lint: no content/foods directory yet — nothing to lint.");
    finish(errors);
    return;
  }

  const { foodSchema } = await import("../src/content-schema/food");
  const { allFoods } = await import("../content/foods");
  const { allergenPrograms } = await import("../content/allergens");

  if (allFoods.length === 0) {
    console.log("content-lint: food database is empty (pre-Phase-1 state) — corpus rules skipped.");
    finish(errors);
    return;
  }

  const slugs = new Set<string>();
  const allergensCovered = new Set<string>();
  let ironRichCount = 0;

  for (const food of allFoods) {
    const label = `food:${food.slug ?? "?"}`;
    const parsed = foodSchema.safeParse(food);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        errors.push(`${label}: ${issue.path.join(".")} — ${issue.message}`);
      }
      continue;
    }
    const f = parsed.data;

    if (slugs.has(f.slug)) errors.push(`${label}: duplicate slug`);
    slugs.add(f.slug);

    if (f.commonAllergen) allergensCovered.add(f.commonAllergen);
    if (f.ironRich) ironRichCount++;

    // ≥1 source with url + retrievedOn (schema enforces shape; enforce non-empty here)
    if (f.sources.length === 0) errors.push(`${label}: sources must be non-empty`);

    // PrepSpec must cover the band containing minAgeMonths
    const requiredBand = f.minAgeMonths < 9 ? "6-8m" : f.minAgeMonths < 12 ? "9-12m" : "12-24m";
    if (!f.prepSpecs.some((p) => p.band === requiredBand)) {
      errors.push(`${label}: missing PrepSpec for band ${requiredBand} (minAgeMonths=${f.minAgeMonths})`);
    }

    for (const spec of f.prepSpecs) {
      const words = spec.form.trim().split(/\s+/).length;
      if (words < 12) {
        errors.push(`${label}: PrepSpec[${spec.band}].form must be ≥12 words (got ${words})`);
      }
      const sizeRef =
        /(finger|pinky|thumb|palm|hand|credit.card|pea|grain of rice|coin|inch|cm|millimet|centimet|matchstick|stick|strip|drizzl|yogurt|smooth|mash|pur[ée]e|shred|grated|thin|paper.thin|bite.siz|quarter)/i;
      if (!sizeRef.test(spec.form)) {
        errors.push(`${label}: PrepSpec[${spec.band}].form lacks a size/consistency reference`);
      }
      if (!spec.passFailTest.trim()) errors.push(`${label}: PrepSpec[${spec.band}].passFailTest empty`);
      // Media images must record a license
      for (const m of spec.media) {
        if (m.kind === "image" && !m.license) {
          errors.push(`${label}: image media "${m.title}" missing license`);
        }
      }
    }

    if ((f.chokingRisk === "moderate" || f.chokingRisk === "high") && !f.chokingNotes?.trim()) {
      errors.push(`${label}: chokingRisk=${f.chokingRisk} requires chokingNotes`);
    }
    if (f.chokingRisk === "high" && !f.prepSpecs[0].cutDiagram) {
      errors.push(`${label}: chokingRisk=high requires a cutDiagram in the first band`);
    }

    if (f.slug === "honey" && f.minAgeMonths < 12) {
      errors.push(`${label}: honey must have minAgeMonths >= 12`);
    }

    // Phase 10 fields are required now that the backfill is complete.
    if (!f.nutrients || f.nutrients.length === 0) {
      errors.push(`${label}: missing nutrients tags (1-4 required)`);
    }
    if (!f.emoji) errors.push(`${label}: missing emoji`);
    const MEASURE_WORD =
      /(teaspoon|tablespoon|stick|strip|piece|cube|slice|handful|half|quarter|cup|spoonful|smear|drizzle|dollop|pinch|wedge|segment|spear|floret|ounce)/i;
    for (const spec of f.prepSpecs) {
      const sg = f.servingGuidance?.find((s) => s.band === spec.band);
      if (!sg) {
        errors.push(`${label}: missing servingGuidance for band ${spec.band}`);
      } else if (!MEASURE_WORD.test(sg.typicalAmount)) {
        errors.push(`${label}: servingGuidance[${spec.band}].typicalAmount lacks a measure word`);
      }
    }

    // Every allergen food needs a matching allergen program page
    if (f.commonAllergen && !allergenPrograms.some((a) => a.id === f.commonAllergen)) {
      errors.push(`${label}: no allergen program page for ${f.commonAllergen}`);
    }
  }

  // Corpus-level rules (ROADMAP §6.1)
  const ALL_ALLERGENS = ["peanut", "egg", "milk", "wheat", "soy", "sesame", "tree-nut", "fish", "shellfish"];
  for (const a of ALL_ALLERGENS) {
    if (!allergensCovered.has(a)) errors.push(`corpus: no food covers allergen "${a}"`);
  }
  if (ironRichCount < 12) errors.push(`corpus: only ${ironRichCount} iron-rich foods (need ≥12)`);
  const FOODS_MIN = Number(process.env.FOODS_MIN ?? 150);
  if (allFoods.length < FOODS_MIN) errors.push(`corpus: only ${allFoods.length} foods (target: ${FOODS_MIN})`);
  const CATEGORY_MINIMUMS: Record<string, number> = {
    vegetable: 30, fruit: 30, protein: 25, grain: 20, legume: 12, dairy: 8, "herb-spice": 10, "fat-other": 4,
  };
  const categoryCounts = new Map<string, number>();
  for (const f of allFoods) categoryCounts.set(f.category, (categoryCounts.get(f.category) ?? 0) + 1);
  for (const [cat, min] of Object.entries(CATEGORY_MINIMUMS)) {
    const n = categoryCounts.get(cat) ?? 0;
    if (n < min) errors.push(`corpus: category ${cat} has ${n} foods (minimum ${min})`);
  }

  // ——— Learn guides (Phase 9) ———
  const { guideSchema } = await import("../src/content-schema/food");
  const { allGuides } = await import("../content/guides");
  const guideSlugs = new Set<string>();
  for (const guide of allGuides) {
    const glabel = `guide:${guide.slug ?? "?"}`;
    const parsed = guideSchema.safeParse(guide);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        errors.push(`${glabel}: ${issue.path.join(".")} — ${issue.message}`);
      }
      continue;
    }
    if (guideSlugs.has(guide.slug)) errors.push(`${glabel}: duplicate slug`);
    guideSlugs.add(guide.slug);
    const words = guide.sections
      .flatMap((s) => s.paragraphs)
      .join(" ")
      .split(/\s+/).length;
    if (words < 300 || words > 900) {
      errors.push(`${glabel}: ${words} words (target 400-800, hard bounds 300-900)`);
    }
  }
  if (allGuides.length < 6) errors.push(`corpus: only ${allGuides.length} Learn guides (need ≥6)`);

  // ——— Recipes (Part III D3) ———
  const RECIPES_MIN = Number(process.env.RECIPES_MIN ?? 40);
  const IRON_PAIRING_MIN = 10;
  const { RecipeSchema } = await import("../src/content-schema/recipe");
  const { allRecipes } = await import("../content/recipes");
  const foodSlugSet = new Set(allFoods.map((f) => f.slug));
  const recipeSlugs = new Set<string>();
  let ironPairingCount = 0;
  for (const recipe of allRecipes) {
    const rlabel = `recipe:${recipe.slug ?? "?"}`;
    const parsed = RecipeSchema.safeParse(recipe);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        errors.push(`${rlabel}: ${issue.path.join(".")} — ${issue.message}`);
      }
      continue;
    }
    if (recipeSlugs.has(recipe.slug)) errors.push(`${rlabel}: duplicate slug`);
    recipeSlugs.add(recipe.slug);
    for (const slug of recipe.foods) {
      if (!foodSlugSet.has(slug)) errors.push(`${rlabel}: unknown food "${slug}"`);
    }
    // Safety: a recipe may only claim a band if every ingredient's age gate
    // has opened by that band's start.
    const bandStart = { "6-8m": 6, "9-12m": 9, "12-24m": 12 } as const;
    for (const band of recipe.bands) {
      for (const slug of recipe.foods) {
        const ingredient = allFoods.find((f) => f.slug === slug);
        if (ingredient && ingredient.minAgeMonths > bandStart[band]) {
          errors.push(
            `${rlabel}: "${slug}" is ${ingredient.minAgeMonths}m+ but the recipe claims band ${band}`,
          );
        }
      }
    }
    if (new Set(recipe.foods).size !== recipe.foods.length) {
      errors.push(`${rlabel}: duplicate ingredient`);
    }
    if (recipe.ironPairing) ironPairingCount++;
  }
  if (allRecipes.length < RECIPES_MIN) {
    errors.push(`corpus: only ${allRecipes.length} recipes (need ≥${RECIPES_MIN})`);
  }
  if (ironPairingCount < IRON_PAIRING_MIN) {
    errors.push(`corpus: only ${ironPairingCount} iron-pairing recipes (need ≥${IRON_PAIRING_MIN})`);
  }

  console.log(
    `content-lint: ${allFoods.length} foods, ${allergensCovered.size}/9 allergens, ${ironRichCount} iron-rich, ${allGuides.length} guides, ${allRecipes.length} recipes (${ironPairingCount} iron-pairing).`,
  );
  finish(errors);
}

function scanBannedSources(dir: string, errors: string[]) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) scanBannedSources(p, errors);
    else if (/\.(ts|tsx|md|json)$/.test(entry.name)) {
      const text = fs.readFileSync(p, "utf8");
      if (/solidstarts\.com/i.test(text)) {
        errors.push(`${p}: references banned source solidstarts.com`);
      }
    }
  }
}

function finish(errors: string[]) {
  if (errors.length) {
    console.error(`content-lint: ${errors.length} error(s):`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log("content-lint: OK");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
