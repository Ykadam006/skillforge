import { describe, expect, it } from "vitest";
import { appendChecklistHistory, appendSessionMinutesHistory } from "@/lib/skill-history";
import type { SkillTask } from "@/types/progress";

describe("appendChecklistHistory", () => {
  it("appends a new point when pct changes", () => {
    const tasks: SkillTask[] = [
      { id: "a", title: "t", completed: true },
      { id: "b", title: "u", completed: false },
    ];
    const next = appendChecklistHistory({}, tasks);
    expect(next.length).toBe(1);
    expect(next[0].pct).toBe(50);
  });

  it("dedupes same calendar day with same pct", () => {
    const tasks: SkillTask[] = [
      { id: "a", title: "t", completed: true },
      { id: "b", title: "u", completed: false },
    ];
    const once = appendChecklistHistory({}, tasks);
    const twice = appendChecklistHistory({ checklistHistory: once }, tasks);
    expect(twice.length).toBe(1);
  });
});

describe("appendSessionMinutesHistory", () => {
  it("sums minutes for the same date", () => {
    const d = "2026-04-01";
    let h = appendSessionMinutesHistory({}, d, 10);
    expect(h).toEqual([{ date: d, minutes: 10 }]);
    h = appendSessionMinutesHistory({ sessionHistory: h }, d, 15);
    expect(h).toEqual([{ date: d, minutes: 25 }]);
  });

  it("ignores non-positive minutes", () => {
    expect(appendSessionMinutesHistory({}, "2026-04-02", 0)).toEqual([]);
  });
});
