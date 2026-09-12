import { expect, test, type Page } from "@playwright/test";

/**
 * The sleep window predictor (/sleep, Extras): wake anchor → window card
 * with its explainer → asleep state → back awake with the session listed.
 */

const DAY = 86400000;

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * DAY);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function completeOnboarding(page: Page, nickname = "Sleepy") {
  await page.goto("/onboarding");
  await page.getByLabel("Name or nickname").fill(nickname);
  await page.getByLabel("Birth date").fill(isoDaysAgo(213));
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

// The window title depends on the wall clock: an evening run predicts bedtime.
const WINDOW_TITLE = /^(Next nap window|Bedtime window)$/;

/** Seed several past days of naps + night sleep into the synced store. */
async function seedSleepHistory(page: Page) {
  await page.evaluate(() => {
    const raw = JSON.parse(localStorage.getItem("opensolids-v1")!);
    const babyId = raw.state.babies[0].id;
    const at = (daysAgo: number, h: number, m = 0) => {
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      d.setHours(h, m, 0, 0);
      return d.toISOString();
    };
    const sessions: unknown[] = [];
    let n = 0;
    for (let day = 1; day <= 6; day++) {
      // A consistent shape: morning nap, midday nap, late nap, night sleep.
      sessions.push({ id: `sd${n++}`, babyId, start: at(day, 9, 0), end: at(day, 10, 0) });
      sessions.push({ id: `sd${n++}`, babyId, start: at(day, 12, 30), end: at(day, 14, 0) });
      sessions.push({ id: `sd${n++}`, babyId, start: at(day, 16, 30), end: at(day, 17, 15) });
      sessions.push({ id: `sd${n++}`, babyId, start: at(day, 19, 30), end: at(day - 1, 6, 30) });
    }
    raw.state.sleepSessions = sessions;
    localStorage.setItem("opensolids-v1", JSON.stringify(raw));
  });
  await page.reload();
}

test("today's total clips an overnight session at local midnight", async ({ page }) => {
  await completeOnboarding(page);
  // One night: yesterday 20:00 → today 06:30. The row shows the whole span,
  // but only the 6 h 30 min after midnight count as today.
  await page.evaluate(() => {
    const raw = JSON.parse(localStorage.getItem("opensolids-v1")!);
    const babyId = raw.state.babies[0].id;
    const at = (daysAgo: number, h: number, m = 0) => {
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      d.setHours(h, m, 0, 0);
      return d.toISOString();
    };
    raw.state.sleepSessions = [{ id: "night1", babyId, start: at(1, 20, 0), end: at(0, 6, 30) }];
    localStorage.setItem("opensolids-v1", JSON.stringify(raw));
  });
  await page.reload();
  await page.goto("/sleep");

  await expect(page.getByText("10 h 30 min")).toBeVisible(); // the full row
  await expect(page.getByText("Today's total: 6 h 30 min")).toBeVisible(); // the clipped total
});

test("sleep history shows per-day totals and a when-baby-slept timeline", async ({ page }) => {
  await completeOnboarding(page);
  await seedSleepHistory(page);
  await page.goto("/sleep");

  await expect(page.getByText("Sleep history")).toBeVisible();
  await expect(page.getByText(/Last \d+ days · about .+ of sleep a day/)).toBeVisible();
  await expect(page.getByText("Hours per day")).toBeVisible();
  await expect(page.getByText("When baby slept")).toBeVisible();
  await expect(page.getByText("Nap", { exact: true })).toBeVisible();
  await expect(page.getByText("Night", { exact: true })).toBeVisible();
  // One timeline row per day with sleep. Six seeded days of naps, and the
  // night sessions carry a morning block into today too → seven dated rows.
  const rows = page.getByRole("img", { name: /of sleep across \d+ sleeps/ });
  await expect(rows).toHaveCount(7);

  await page.screenshot({ path: "test-results/sleep-history.png", fullPage: true });
});

test("predicts a window from a wake anchor and logs a session", async ({ page }) => {
  await completeOnboarding(page);

  await page.goto("/sleep");
  await expect(page.getByRole("heading", { name: "Sleep", exact: true })).toBeVisible();

  // No wake evidence yet — the page asks.
  await expect(page.getByText("When did your baby last wake up?")).toBeVisible();
  await page.getByRole("button", { name: "Just now" }).click();

  // The window card and its explainer appear.
  await expect(page.getByText(WINDOW_TITLE)).toBeVisible();
  await expect(page.getByText("Why this window")).toBeVisible();
  await expect(page.getByText(/Typical wake window at/)).toBeVisible();
  await expect(page.getByText(/Still learning your baby's pattern/)).toBeVisible();
  await expect(page.getByText(/Estimated bedtime tonight/)).toBeVisible();

  // Fall asleep never assumes "now": the button opens a typed time field
  // prefilled with the current clock, so a late logger can backdate it.
  await page.getByRole("button", { name: "Fell asleep", exact: true }).click();
  await page.locator("#fell-asleep-time").fill("12:01 am");
  await page.getByRole("button", { name: "Start", exact: true }).click();
  await expect(page.getByText(/Asleep for/)).toBeVisible();
  await expect(page.getByText(/since 12:01\sAM/)).toBeVisible();

  // Waking up confirms a time the same way (prefilled with now).
  await page.getByRole("button", { name: "Woke up", exact: true }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText(WINDOW_TITLE)).toBeVisible();
  await expect(page.getByText(/Today's total:/)).toBeVisible();
  await expect(page.getByText("No sleep logged today yet.")).toHaveCount(0);

  // The log survives a reload (persisted, and now synced when signed in).
  await page.reload();
  await expect(page.getByText(/Today's total:/)).toBeVisible();
});

test("a session can be edited with typed times, and deleted from the edit panel", async ({
  page,
}) => {
  await completeOnboarding(page);
  await page.goto("/sleep");
  await page.getByRole("button", { name: "Just now" }).click();
  await page.getByRole("button", { name: "Fell asleep", exact: true }).click();
  await page.getByRole("button", { name: "Start", exact: true }).click();
  await page.getByRole("button", { name: "Woke up", exact: true }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const row = page
    .locator("li")
    .filter({ has: page.getByRole("button", { name: /^Edit the sleep/ }) })
    .first();
  // The row has one action: Edit. No delete button sits next to it.
  await expect(row.getByRole("button", { name: "Delete" })).toHaveCount(0);
  await row.getByRole("button", { name: /^Edit/ }).click();

  // Times are typed, not scrolled — free text like "1:00 pm" parses.
  await row.getByLabel(/Fell asleep — Time/).fill("1:00 pm");
  await row.getByLabel(/Woke up — Time/).fill("1:45 pm");
  await row.getByRole("button", { name: "Save" }).click();
  await expect(row.getByText(/1:00\sPM – 1:45\sPM/)).toBeVisible();
  await expect(row.getByText("45 min")).toBeVisible();

  // Nonsense time is flagged, and the save is refused.
  await row.getByRole("button", { name: /^Edit/ }).click();
  await row.getByLabel(/Woke up — Time/).fill("banana");
  await expect(row.getByText(/Enter a time like/)).toBeVisible();

  // Delete lives inside the edit panel, behind a confirm.
  await row.getByRole("button", { name: "Delete" }).click();
  await expect(row.getByText("Delete this sleep?")).toBeVisible();
  await row.getByRole("button", { name: "Yes, delete" }).click();
  await expect(page.getByText("No sleep logged today yet.")).toBeVisible();
});

test("reaches /sleep from the More page", async ({ page }) => {
  await completeOnboarding(page);
  await page.goto("/more");
  await page.getByRole("link", { name: /Sleep windows/ }).click();
  await page.waitForURL("**/sleep");
  await expect(page.getByRole("heading", { name: "Sleep", exact: true })).toBeVisible();
});
