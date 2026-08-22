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

    if (f.slug === "honey" && f.minAgeMonths < 12) {
      errors.push(`${label}: honey must have minAgeMonths >= 12`);
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
  if (allFoods.length < 60) errors.push(`corpus: only ${allFoods.length} foods (v1 target: 60)`);

  console.log(`content-lint: ${allFoods.length} foods, ${allergensCovered.size}/9 allergens, ${ironRichCount} iron-rich.`);
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
