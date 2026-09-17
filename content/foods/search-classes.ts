/**
 * Food classes: words that name a group of foods rather than one food.
 *
 * The term index (search-terms.ts) answers "which food is called this". It
 * cannot answer "which foods are this kind of thing", because a term there
 * belongs to exactly one food: 猪肝 is pork liver and 鸡肝 is chicken liver,
 * and neither name contains the other. A parent who types 猪肝 is choosing
 * between livers, so the picker shows both.
 *
 * A query that CONTAINS a class term also matches every food in that class,
 * ranked below any direct name hit (see scoreMatch). Keep this list short: a
 * class term must genuinely name the group in one of the two languages, and
 * the foods in a class must be ones a parent would serve in place of each
 * other.
 */
export const FOOD_CLASSES: { terms: string[]; slugs: string[] }[] = [
  { terms: ["liver", "肝"], slugs: ["liver", "pork-liver"] },
];

/** Class terms per food slug, for the `cls` field the pickers pass to rankMatches. */
export const FOOD_CLASS_TERMS: Record<string, string[]> = (() => {
  const out: Record<string, string[]> = {};
  for (const group of FOOD_CLASSES) {
    for (const slug of group.slugs) out[slug] = [...(out[slug] ?? []), ...group.terms];
  }
  return out;
})();
