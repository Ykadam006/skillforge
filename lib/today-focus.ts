import { flattenSkills } from "@/lib/guide";
import type { SkillProgress } from "@/types/progress";

type SkillProgressMap = Record<string, SkillProgress>;

export function pickTodayFocus(skillProgress: SkillProgressMap) {
  const rows = flattenSkills();

  const scored = rows
    .map((row) => {
      const p = skillProgress[row.key];
      let score = 0;
      if (p?.bookmarked) score += 80;
      if (p?.learningStatus === "in-progress") score += 60;
      if (row.skill.status === "need") score += 40;
      if (row.skill.priority === 1) score += 30;
      if (row.skill.hot) score += 10;
      if (p?.lastOpenedAt) {
        const ageDays = (Date.now() - new Date(p.lastOpenedAt).getTime()) / 86400000;
        if (ageDays <= 3) score += 45;
        else if (ageDays <= 7) score += 22;
      }
      if (p?.learningStatus === "done") score -= 100;
      return { row, score };
    })
    .filter((x) => x.score > -50)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.row ?? rows.find((r) => r.skill.status === "need") ?? rows[0] ?? null;
}
