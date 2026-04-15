import { describe, expect, it } from "vitest";
import { activityMinutesDaySeries, heatLevel } from "@/lib/activity-heatmap";

describe("heatLevel", () => {
  it("maps minute bands to levels", () => {
    expect(heatLevel(0)).toBe(0);
    expect(heatLevel(10)).toBe(1);
    expect(heatLevel(30)).toBe(2);
    expect(heatLevel(60)).toBe(3);
    expect(heatLevel(100)).toBe(4);
  });
});

describe("activityMinutesDaySeries", () => {
  it("includes last N days with summed minutes", () => {
    const today = new Date().toISOString().slice(0, 10);
    const series = activityMinutesDaySeries([{ date: today, minutes: 20 }], [], 7);
    expect(series.length).toBe(7);
    expect(series.some((s) => s.date === today && s.minutes === 20)).toBe(true);
  });
});
