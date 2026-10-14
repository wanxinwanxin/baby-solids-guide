import { expect, test, type Page } from "@playwright/test";

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

test("BabySparks catalog combines filters, searches, and itemized logging", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/activities");
  await expect(page.getByRole("heading", { name: "BabySparks activities", exact: true })).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("193 of 193 activities");
  await page.getByRole("navigation", { name: "Catalog age", exact: true }).getByRole("link", { name: "4–6 months" }).click();
  await page.getByRole("navigation", { name: "Show ideas for" }).getByRole("link", { name: /^Daily routines/ }).click();
  await page.getByLabel("Search activities in English or Chinese").fill("期待吃饭");
  await page.getByRole("button", { name: "Search activities", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("1 of 193 activities");
  await page.locator("#babysparks-001 summary").click();
  await expect(page.getByText("While feeding baby", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Did this today ✓", exact: true }).click();
  await expect(page.getByRole("listitem").getByText("🧩 Play & learning · Anticipating Events")).toBeVisible();
  await page.getByRole("button", { name: /Done today/ }).click();
  await expect(page.getByText("Nothing logged today yet.")).toBeVisible();
});

test("BabySparks reads in Chinese and keeps added reminders separate", async ({ page, context }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await context.addCookies([{ name: "lang", value: "zh", url: "http://localhost:3100" }]);
  await page.goto("/activities?q=追看气球");
  await page.locator("#babysparks-003 summary").click();
  await expect(page.getByText("另加提醒", { exact: true })).toBeVisible();
  await expect(page.getByText(/气球有窒息风险/)).toBeVisible();
  await expect(page.getByText("建议时长：5–8分钟", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: /今天做了/ })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.screenshot({ path: testInfo.outputPath("babysparks-mobile.png"), fullPage: true });
  await page.goto("/activities?q=xyz-no-match");
  await expect(page.getByRole("status")).toHaveText("共193项，显示0项");
});

async function completeOnboarding(page: Page, nickname = "Nori") {
  await page.goto("/onboarding");
  await page.getByLabel("Name or nickname").fill(nickname);
  await page.getByLabel("Birth date").fill(isoDaysAgo(240));
  await page.getByRole("button", { name: "A mix of both" }).click();
  await page.getByRole("button", { name: "Next: allergy questions" }).click();
  for (const i of [0, 1, 2]) {
    await page.getByRole("button", { name: "No", exact: true }).nth(i).click();
  }
  await page.getByRole("button", { name: "Next: readiness" }).click();
  for (const sign of ["Sits upright", "Steady head control", "Brings hands", "Watches your food", "tongue-thrust"]) {
    await page.getByRole("checkbox", { name: new RegExp(sign) }).check();
  }
  await page.getByRole("button", { name: "Next: one last thing" }).click();
  await page.getByRole("checkbox", { name: /educational guide/ }).check();
  await page.getByRole("button", { name: /Start fresh/ }).click();
  await page.waitForURL("**/today");
}

test("quick-logs an activity for today, then deletes it", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/activities");

  await expect(page.getByText("Nothing logged today yet.")).toBeVisible();
  await page.getByRole("button", { name: /Singing/ }).click();
  await expect(page.getByRole("listitem").getByText("🎤 Singing")).toBeVisible();

  await page.getByRole("button", { name: /Delete Singing/ }).click();
  await expect(page.getByText("Nothing logged today yet.")).toBeVisible();
});

test("marks a specific piece as read on /read and it shows itemized", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/read");

  // Expand the first English piece and log it; the button flips to undo.
  await page.locator("details > summary").first().click();
  await page.getByRole("button", { name: "Read this to baby ✓" }).first().click();
  await expect(page.getByRole("button", { name: /Read today ✓/ })).toBeVisible();

  // The itemized entry (with its title) shows on the activities page.
  await page.goto("/activities");
  await expect(page.getByText(/📖 Read to baby · /)).toBeVisible();

  // The current Full day dashboard counts it in its Activities tile.
  await page.goto("/account");
  await page.getByRole("button", { name: "Switch to full day view" }).click();
  await page.goto("/today");
  await expect(page.getByText("1 logged", { exact: true })).toBeVisible();
});

test("logs a movement idea from the shelf and shows it itemized", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/activities?collection=everyday");

  // The shelf groups by starting age, youngest first.
  await expect(page.getByRole("heading", { name: /Things to do with the baby/ })).toBeVisible();
  await expect(page.getByText(/From birth · \d+/)).toBeVisible();
  await expect(page.getByText(/From 6 months · \d+/)).toBeVisible();

  // Open one idea: steps, the reason, and the limit all render.
  await page.getByText("Tummy time on your chest").click();
  await expect(page.getByText(/Lay the baby tummy-down on your chest/)).toBeVisible();
  await expect(page.getByText("Why it helps").first()).toBeVisible();
  await expect(page.getByText("Watch for").first()).toBeVisible();

  // One tap logs it, carrying the idea's title.
  await page.getByRole("button", { name: "Did this today ✓" }).first().click();
  await expect(page.getByRole("button", { name: /Done today ✓/ })).toBeVisible();
  await expect(
    page.getByRole("listitem").getByText("🐢 Tummy time · Tummy time on your chest"),
  ).toBeVisible();

  // Tapping again undoes it.
  await page.getByRole("button", { name: /Done today ✓/ }).first().click();
  await expect(page.getByText("Nothing logged today yet.")).toBeVisible();
});

test("the movement shelf reads for a visitor with no baby yet", async ({ page }) => {
  // No onboarding: the quick-log row becomes a setup prompt, but the ideas
  // must still be readable, and no log button may appear without a profile.
  await page.goto("/activities?collection=everyday");

  await expect(page.getByText("Set up a profile to log activities")).toBeVisible();
  await expect(page.getByText("Tummy time on your chest")).toBeVisible();
  await expect(page.getByRole("button", { name: /Did this today/ })).toHaveCount(0);
});

test("the area filter narrows the shelf to one area", async ({ page }) => {
  await page.goto("/activities?collection=everyday");
  await expect(page.getByText("Set up a profile to log activities")).toBeVisible();
  const filter = page.getByRole("navigation", { name: "Show ideas for" });
  await expect(filter.getByRole("link", { name: /^All/ })).toHaveAttribute("aria-current", "page");

  await filter.getByRole("link", { name: /^Hands/ }).click();
  // The URL changes when the navigation commits, which in dev waits for
  // the route to compile on its first visit.
  await expect(page).toHaveURL(/\/activities\?collection=everyday&area=hands$/, { timeout: 30_000 });
  await expect(filter.getByRole("link", { name: /^Hands/ })).toHaveAttribute("aria-current", "page");
  await expect(page.getByText("Pass it hand to hand")).toBeVisible();
  await expect(page.getByText("Tummy time on your chest")).toHaveCount(0);

  // "All" brings the whole shelf back.
  await filter.getByRole("link", { name: /^All/ }).click();
  await expect(page.getByText("Tummy time on your chest")).toBeVisible();
});
