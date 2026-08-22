import { expect, test, type Page } from "@playwright/test";

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
}

/** Complete the fresh-start onboarding wizard for a ~7-month-old. */
async function completeOnboarding(
  page: Page,
  opts: { severeEczema?: boolean; finish?: "fresh" | "import" } = {},
) {
  await page.goto("/onboarding");
  await page.getByLabel("Name or nickname").fill("Testling");
  await page.getByLabel("Birth date").fill(isoDaysAgo(213)); // ~7 months
  await page.getByRole("button", { name: "A mix of both" }).click();
  await page.getByRole("button", { name: "Next: allergy questions" }).click();

  if (opts.severeEczema) {
    await page.getByRole("button", { name: "Severe" }).click();
  } else {
    await page.getByRole("button", { name: "No", exact: true }).nth(0).click();
  }
  await page.getByRole("button", { name: "No", exact: true }).nth(1).click();
  await page.getByRole("button", { name: "No", exact: true }).nth(2).click();
  await page.getByRole("button", { name: "Next: readiness" }).click();

  for (const sign of [
    "Sits upright",
    "Steady head control",
    "Brings hands and toys",
    "Watches your food",
    "tongue-thrust",
  ]) {
    await page.getByRole("checkbox", { name: new RegExp(sign) }).check();
  }
  await page.getByRole("button", { name: "Next: one last thing" }).click();
  await page.getByRole("checkbox", { name: /educational guide/ }).check();

  if (opts.finish === "import") {
    await page.getByRole("button", { name: /already started → import/ }).click();
    await page.waitForURL("**/onboarding/import");
  } else {
    await page.getByRole("button", { name: /Start fresh/ }).click();
    await page.waitForURL("**/today");
  }
}

test.describe("fresh-start journey", () => {
  test("onboarding → today shows iron-first picks and the peanut rail", async ({ page }) => {
    await completeOnboarding(page);
    await expect(page.getByRole("heading", { name: "Today for Testling" })).toBeVisible();
    await expect(page.getByText("Today's picks")).toBeVisible();
    await expect(page.getByText(/Iron stores dip around 6 months/).first()).toBeVisible();
    await expect(page.getByText("Next up: Peanut")).toBeVisible();
  });

  test("severe eczema gates peanut behind a doctor conversation", async ({ page }) => {
    await completeOnboarding(page, { severeEczema: true });
    await expect(page.getByText("Next up: Peanut")).toBeVisible();
    await expect(page.getByText("on hold")).toBeVisible();
    await expect(page.getByText(/pediatrician or allergist/)).toBeVisible();
    // The tracker offers the clearance confirmation
    await page.goto("/allergens");
    await expect(page.getByRole("button", { name: /My doctor cleared us/ })).toBeVisible();
  });
});

test.describe("logging journey", () => {
  test("log a food → persists across reload → export → wipe → import restores it", async ({ page }) => {
    await completeOnboarding(page);

    // Log carrot
    await page.goto("/log?food=carrot");
    await expect(page.getByText("Carrot")).toBeVisible();
    await page.getByRole("button", { name: "Lots!" }).click();
    await page.getByRole("button", { name: "😍 Loved" }).click();
    await page.getByRole("button", { name: "Save log" }).click();
    await page.waitForURL("**/today**");

    // Persists across reload
    await page.goto("/history");
    await page.reload();
    await expect(page.getByText("Carrot × 1")).toBeVisible();

    // Export
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Export JSON" }).click();
    const download = await downloadPromise;
    const filePath = await download.path();

    // Wipe
    await page.getByRole("button", { name: "Delete all data on this device" }).click();
    await page.getByRole("button", { name: "Yes, delete everything" }).click();
    await expect(page.getByText("No logs yet")).toBeVisible();

    // Import restores identical history
    await page
      .locator('input[type="file"][aria-label="Import backup file"]')
      .setInputFiles(filePath!);
    await expect(page.getByText(/Imported 1 log/)).toBeVisible();
    await expect(page.getByText("Carrot × 1")).toBeVisible();
  });

  test("reaction log pauses the allergen group and shows the playbook", async ({ page }) => {
    await completeOnboarding(page);

    await page.goto("/log?food=yogurt");
    await page.getByRole("button", { name: /Any symptoms/ }).click();
    await page.getByRole("checkbox", { name: /Widespread hives/ }).check();
    await page.getByRole("button", { name: "Save log" }).click();

    // Playbook screen after save
    await expect(page.getByText("Contact your pediatrician today.")).toBeVisible();
    await expect(page.getByText(/milk group is now paused/)).toBeVisible();

    // Today shows the hold; milk foods are out of the picks
    await page.goto("/today");
    await expect(page.getByText(/milk group is paused/)).toBeVisible();
  });

  test("a red-flag symptom interrupts with the emergency screen BEFORE save", async ({ page }) => {
    await completeOnboarding(page);
    await page.goto("/log?food=egg");
    await page.getByRole("button", { name: /Any symptoms/ }).click();
    await page.getByRole("checkbox", { name: /Trouble breathing/ }).check();

    // Interrupt appears immediately — no save happened yet
    const dialog = page.getByRole("alertdialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Call 911 now.")).toBeVisible();
    await dialog.getByRole("button", { name: /I understand/ }).click();
    await expect(dialog).toHaveCount(0);
  });
});

test.describe("import journey", () => {
  test("mid-journey family imports their state and gets a sensible plan", async ({ page }) => {
    await completeOnboarding(page, { finish: "import" });

    await expect(page.getByRole("heading", { name: "Where are you already?" })).toBeVisible();
    for (const food of ["Beef", "Banana", "Carrot", "Peanut butter"]) {
      await page.getByRole("button", { name: food, exact: true }).click();
    }
    await page
      .locator("label", { hasText: "Peanut" })
      .locator("select")
      .selectOption("maintaining");
    await page.getByRole("button", { name: /S2: Lumpy mash/ }).click();
    await page.getByRole("button", { name: /Done — build my plan \(4 foods\)/ }).click();
    await page.waitForURL("**/today**");

    await expect(page.getByRole("heading", { name: "Today for Testling" })).toBeVisible();
    await expect(page.getByText("stage S2")).toBeVisible();
    // Peanut is maintaining, so the rail moves on to egg
    await expect(page.getByText("Next up: Egg")).toBeVisible();
    // Imported foods show up in history
    await page.goto("/history");
    await expect(page.getByText("Beef × 1")).toBeVisible();
  });
});
