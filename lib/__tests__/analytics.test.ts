import { describe, expect, it, vi } from "vitest";
import {
  activityMinuteEvents,
  activityMinutesByDayLastNDays,
  activityMinutesRollingDays,
  completionStats,
  guideStatusCounts,
  minutesByDayLastNDays,
} from "@/lib/analytics";
import { flattenSkills } from "@/lib/guide";

describe("completionStats", () => {
  it("counts total skills from guide", () => {
    const { total } = completionStats({});
    expect(total).toBe(flattenSkills().length);
    expect(total).toBeGreaterThan(0);
  });

  it("marks done and in-progress from progress map", () => {
    const rows = flattenSkills();
    const key = rows[0]!.key;
    const skillProgress = {
      [key]: {
        learningStatus: "done" as const,
        confidence: 4,
        bookmarked: false,
        notes: "",
        tasks: [],
      },
    };
    const stats = completionStats(skillProgress);
    expect(stats.done).toBeGreaterThanOrEqual(1);
    expect(stats.pct).toBeGreaterThan(0);
  });
});

describe("guideStatusCounts", () => {
  it("sums to total skills", () => {
    const c = guideStatusCounts();
    const sum = c.have + c.need + c.cert;
    expect(sum).toBe(flattenSkills().length);
  });
});

describe("minutesByDayLastNDays", () => {
  it("returns N day buckets", () => {
    const out = minutesByDayLastNDays([], 14);
    expect(out).toHaveLength(14);
    expect(out[0]).toHaveProperty("date");
    expect(out[0]).toHaveProperty("minutes");
  });

  it("sums minutes on the same date", () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const key = d.toISOString().slice(0, 10);
    const out = minutesByDayLastNDays(
      [
        { date: key, minutes: 20 },
        { date: key, minutes: 10 },
      ],
      14,
    );
    const row = out.find((x) => x.date === key);
    expect(row?.minutes).toBe(30);
  });
});

describe("activityMinuteEvents", () => {
  it("includes study sessions and practice minutes as separate events", () => {
    const events = activityMinuteEvents([{ date: "2026-04-01", minutes: 30 }], [
      { date: "2026-04-01", minutes: 15 },
      { date: "2026-04-02", minutes: 0 },
    ]);
    const sum0401 = events.filter((e) => e.date === "2026-04-01").reduce((a, b) => a + b.minutes, 0);
    expect(sum0401).toBe(45);
    expect(events.filter((e) => e.date === "2026-04-02").length).toBe(0);
  });
});

describe("activityMinutesByDayLastNDays", () => {
  it("merges study and practice into buckets", () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const key = d.toISOString().slice(0, 10);
    const out = activityMinutesByDayLastNDays([{ date: key, minutes: 10 }], [{ date: key, minutes: 5 }], 14);
    const row = out.find((x) => x.date === key);
    expect(row?.minutes).toBe(15);
  });
});

describe("activityMinutesRollingDays", () => {
  it("sums events within window from mocked now", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-14T15:00:00.000Z"));
    const sum = activityMinutesRollingDays(
      [
        { date: "2026-04-14", minutes: 10 },
        { date: "2026-04-13", minutes: 20 },
      ],
      [{ date: "2026-04-14", minutes: 5 }],
      7,
    );
    expect(sum).toBe(35);
    vi.useRealTimers();
  });
});
