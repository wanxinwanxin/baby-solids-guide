import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/** Phase 15 — accessibility gate: 0 critical violations on the key routes. */

const ROUTES = ["/", "/foods", "/foods/carrot", "/learn", "/learn/why-solids", "/safety", "/log", "/plan", "/allergens", "/history", "/more"];

for (const route of ROUTES) {
  test(`axe: no critical violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(
      critical.map((v) => `${v.id}: ${v.nodes.length} nodes — ${v.help}`),
    ).toEqual([]);
  });
}
