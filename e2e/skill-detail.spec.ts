import { expect, test } from "@playwright/test";

test.describe("Skill detail", () => {
  test("known slug renders learning path", async ({ page }) => {
    await page.goto("/skills/devops-docker");
    await expect(page.getByRole("heading", { name: "Learning path", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Docker", level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /Back to library/i })).toBeVisible();
  });
});
