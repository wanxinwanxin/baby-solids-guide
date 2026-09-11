import { expect, test, type Page } from "@playwright/test";

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function completeOnboarding(page: Page, nickname = "Testling") {
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

/** White-box helper: mutate the persisted store and reload. */
async function mutateStore(page: Page, fn: string) {
  await page.evaluate(`(() => {
    const raw = JSON.parse(localStorage.getItem("opensolids-v1"));
    const mutate = ${fn};
    mutate(raw.state);
    localStorage.setItem("opensolids-v1", JSON.stringify(raw));
  })()`);
  await page.reload();
}

test.describe("Food gallery", () => {
  test("unlocks a food after 3 eaten days, tracks progress and reactions", async ({ page }) => {
    await completeOnboarding(page);

    await mutateStore(
      page,
      `(s) => {
        const babyId = s.activeBabyId;
        const base = { babyId, prepBandUsed: "6-8m", amountEaten: "some", enjoyment: "neutral", gagging: false, symptoms: [] };
        s.logs.push(
          { ...base, id: "g1", foodSlug: "carrot", date: "${isoDaysAgo(3)}" },
          { ...base, id: "g2", foodSlug: "carrot", date: "${isoDaysAgo(2)}" },
          { ...base, id: "g3", foodSlug: "carrot", date: "${isoDaysAgo(1)}" },
          { ...base, id: "g4", foodSlug: "banana", date: "${isoDaysAgo(1)}" },
          { ...base, id: "g5", foodSlug: "egg", date: "${isoDaysAgo(1)}", symptoms: ["hives-widespread"] },
        );
      }`,
    );

    await page.goto("/gallery");

    // One food (carrot) has 3 distinct eaten days → unlocked, first badge earned.
    await expect(page.getByText(/1 of \d+ foods unlocked/)).toBeVisible();
    await expect(page.getByText("🏅 First bite")).toBeVisible();
    await expect(page.getByRole("link", { name: "Carrot — Unlocked" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Banana .*— In progress/ })).toBeVisible();

    // The egg reaction moves it to the reactions shelf.
    await expect(page.getByText("Reactions", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Egg/ }).first()).toBeVisible();
  });

  test("is reachable from the history page", async ({ page }) => {
    await completeOnboarding(page);
    await page.goto("/history");
    await page.getByRole("link", { name: /Food gallery/ }).click();
    await page.waitForURL("**/gallery");
    await expect(page.getByRole("heading", { name: "Food gallery" })).toBeVisible();
  });
});
