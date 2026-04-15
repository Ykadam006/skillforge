import { expect, test } from "@playwright/test";

test.describe("Practice", () => {
  test("study log button respects minimum minutes", async ({ page }) => {
    await page.goto("/practice");
    await expect(page.getByRole("heading", { name: "Practice", level: 1 })).toBeVisible();

    const studyMinutes = page.getByRole("spinbutton", { name: /study log minutes/i });
    await studyMinutes.clear();
    await studyMinutes.fill("0");
    await expect(page.getByRole("button", { name: "Log session" })).toBeDisabled();

    await studyMinutes.clear();
    await studyMinutes.fill("25");
    await expect(page.getByRole("button", { name: "Log session" })).toBeEnabled();
  });

  test("practice card shows log practice", async ({ page }) => {
    await page.goto("/practice");
    await expect(page.getByText("Log practice", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Add to list" })).toBeVisible();
  });

  test("session timer block is present", async ({ page }) => {
    await page.goto("/practice");
    await expect(page.getByTestId("session-timer")).toBeVisible();
    await expect(page.getByRole("button", { name: "Start" })).toBeVisible();
  });
});
