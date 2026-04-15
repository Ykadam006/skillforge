import { flattenSkills } from "@/lib/guide";
import type { SkillProgress } from "@/types/progress";

type Map = Record<string, SkillProgress>;

function recencyScore(iso?: string) {
  if (!iso) return 0;
  const ageDays = (Date.now() - new Date(iso).getTime()) / 86400000;
  if (ageDays <= 1) return 55;
  if (ageDays <= 3) return 40;
  if (ageDays <= 7) return 24;
  if (ageDays <= 14) return 12;
  return 0;
}

export function recentSkillsForDashboard(skillProgress: Map, limit = 6) {
  const rows = flattenSkills().map((row) => {
    const p = skillProgress[row.key];
    let score = 0;
    if (p?.learningStatus === "in-progress") score += 100;
    if (p?.bookmarked) score += 40;
    if (row.skill.status === "need") score += 25;
    if (row.skill.hot) score += 20;
    if (row.skill.priority === 1) score += 15;
    score += recencyScore(p?.lastOpenedAt);
    if (p?.learningStatus === "done") score -= 50;
    return { row, score };
  });

  return [...rows].sort((a, b) => b.score - a.score).slice(0, limit);
}
