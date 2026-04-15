import { expect, test } from "@playwright/test";

test.describe("Smoke", () => {
  test("home landing then open dashboard", async ({ page }) => {
    await page.goto("/");
    await expect(new URL(page.url()).pathname).toBe("/");
    await expect(page.getByRole("heading", { name: /Learn with intent/i })).toBeVisible();
    await page.getByRole("link", { name: /Open dashboard/i }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole("heading", { name: "Dashboard", level: 1 })).toBeVisible();
  });

  test("dashboard shows hero and stats", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: "Your learning command center", level: 2 })).toBeVisible();
    await expect(page.getByText("Skills completed")).toBeVisible();
  });
});
