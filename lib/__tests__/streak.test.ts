import { describe, expect, it } from "vitest";
import { streakDays } from "@/lib/streak";

/** Same key logic as streakDays for “today” (mirrors implementation). */
function todayKey() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function yesterdayKey() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

describe("streakDays", () => {
  it("returns 0 for no sessions", () => {
    expect(streakDays([])).toBe(0);
  });

  it("is at least 1 when today has activity", () => {
    expect(streakDays([{ date: todayKey() }])).toBeGreaterThanOrEqual(1);
  });

  it("is at least 2 when today and yesterday have activity", () => {
    expect(streakDays([{ date: todayKey() }, { date: yesterdayKey() }])).toBeGreaterThanOrEqual(2);
  });

  it("returns 0 when today has no activity", () => {
    expect(streakDays([{ date: "1999-01-01" }])).toBe(0);
  });
});
