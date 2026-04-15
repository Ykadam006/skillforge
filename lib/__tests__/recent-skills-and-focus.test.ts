import { describe, expect, it } from "vitest";
import { flattenSkills } from "@/lib/guide";
import { recentSkillsForDashboard } from "@/lib/recent-skills";
import { pickTodayFocus } from "@/lib/today-focus";

describe("recentSkillsForDashboard", () => {
  it("returns at most the requested limit", () => {
    expect(recentSkillsForDashboard({}, 6)).toHaveLength(6);
    expect(recentSkillsForDashboard({}, 3)).toHaveLength(3);
  });

  it("returns rows from the guide", () => {
    const recent = recentSkillsForDashboard({}, 2);
    expect(recent[0]?.row.skill.name).toBeTruthy();
  });

  it("ranks in-progress above not-started for the same base row signals", () => {
    const rows = flattenSkills();
    const row = rows.find((r) => r.skill.status !== "need") ?? rows[0]!;
    const skillProgress = {
      [row.key]: {
        learningStatus: "in-progress" as const,
        confidence: 3,
        bookmarked: false,
        notes: "",
        tasks: [],
      },
    };
    const withProgress = recentSkillsForDashboard(skillProgress, 500);
    const without = recentSkillsForDashboard({}, 500);
    const scoredWith = withProgress.find((r) => r.row.key === row.key)?.score ?? 0;
    const scoredWithout = without.find((r) => r.row.key === row.key)?.score ?? 0;
    expect(scoredWith).toBeGreaterThan(scoredWithout);
  });
});

describe("pickTodayFocus", () => {
  it("returns a skill row", () => {
    const focus = pickTodayFocus({});
    expect(focus).not.toBeNull();
    expect(focus?.skill.name).toBeTruthy();
  });

  it("returns the only in-progress skill when all others are done", () => {
    const rows = flattenSkills();
    const keep = rows[0]!;
    const skillProgress = Object.fromEntries(
      rows.map((r) => [
        r.key,
        {
          learningStatus:
            r.key === keep.key ? ("in-progress" as const) : ("done" as const),
          confidence: 3,
          bookmarked: false,
          notes: "",
          tasks: [],
        },
      ]),
    );
    const focus = pickTodayFocus(skillProgress);
    expect(focus?.key).toBe(keep.key);
  });
});
