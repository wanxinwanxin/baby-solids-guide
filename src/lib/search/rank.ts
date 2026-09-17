/**
 * Match scoring, shared by every food picker in the app.
 *
 * This module deliberately imports nothing: the app-wide index in ./index.ts
 * pulls in the whole content corpus, so the small pickers (the /log form, the
 * /foods browser) cannot import that file without shipping recipes, guides,
 * and allergen programs in their bundles. They import this instead.
 *
 * Why ranking and not a plain substring filter: a picker that truncates its
 * list must put the best match inside the window it shows. Typing "pea" once
 * matched 11 foods, and the unranked first eight were barley ("pearl
 * barley"), chickpeas, couscous ("pearl couscous"), hummus ("chickpea dip"),
 * mint ("spearmint"), peach, peanut butter, and pear — every pea-adjacent
 * food except peas itself, which sat at position nine and never rendered.
 */

/**
 * How well one entry answers the query `q`, which MUST already be trimmed
 * and lowercased. Zero means no match at all. A hit on the display name
 * always outranks a hit on a secondary term, so "pea" prefers the food named
 * Peas over the food whose Chinese alias contains 豌豆.
 *
 * `cls` holds the class terms of the entry, if it has any: words that name a
 * whole group of foods (see content/foods/search-classes). A class term
 * matches the other way round — the QUERY contains the term — so 猪肝 (pork
 * liver) also reaches chicken liver. A class hit scores below every direct
 * hit, so the food the parent actually named still comes first.
 */
export function scoreMatch(
  name: string,
  alt: readonly string[],
  q: string,
  cls: readonly string[] = [],
): number {
  const n = name.toLowerCase();
  if (n === q) return 100;
  if (n.startsWith(q)) return 90;
  if (n.includes(q)) return 70;
  let best = 0;
  for (const raw of alt) {
    const a = raw.toLowerCase();
    if (a === q) best = Math.max(best, 60);
    else if (a.startsWith(q)) best = Math.max(best, 50);
    else if (a.includes(q)) best = Math.max(best, 30);
  }
  if (best === 0) {
    for (const raw of cls) {
      const c = raw.toLowerCase();
      if (c && q.includes(c)) return 20;
    }
  }
  return best;
}

/**
 * Rank `items` against `query` and keep the matches. Ties break toward the
 * shorter name, which is the more exact hit of two equal scores: "pea"
 * scores Peas and Peanut butter alike on the prefix rule, and Peas is the
 * one the parent meant.
 *
 * Pass `limit` to truncate — and truncate here rather than at the call site,
 * so the cut always falls after ranking.
 */
export function rankMatches<T>(
  items: readonly T[],
  query: string,
  terms: (item: T) => { name: string; alt: readonly string[]; cls?: readonly string[] },
  limit?: number,
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored: { item: T; score: number; length: number }[] = [];
  for (const item of items) {
    const { name, alt, cls } = terms(item);
    const score = scoreMatch(name, alt, q, cls);
    if (score > 0) scored.push({ item, score, length: name.length });
  }
  scored.sort((a, b) => b.score - a.score || a.length - b.length);
  return (limit === undefined ? scored : scored.slice(0, limit)).map((s) => s.item);
}
