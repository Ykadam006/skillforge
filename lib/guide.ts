import type { GuideSkill, MasterLearningGuide } from "@/types/guide";
import skillsStack from "@/data/skills.json";
import { skillsStackToMasterGuide } from "@/lib/skills-stack-to-guide";
import { skillKey, skillSlug, slugify } from "@/lib/slug";
import type { SkillsStackFile } from "@/types/skills-stack";

const guide: MasterLearningGuide = skillsStackToMasterGuide(skillsStack as SkillsStackFile);

export function getGuide() {
  return guide;
}

export function flattenSkills() {
  const rows: Array<{
    categoryId: string;
    categoryLabel: string;
    skill: GuideSkill;
    key: string;
    slug: string;
  }> = [];

  for (const cat of guide.cats) {
    for (const skill of cat.skills) {
      rows.push({
        categoryId: cat.id,
        categoryLabel: cat.label,
        skill,
        key: skillKey(cat.id, skill.name),
        slug: skillSlug(cat.id, skill.name),
      });
    }
  }

  return rows;
}

export function findSkillBySlug(slug: string) {
  return flattenSkills().find((row) => row.slug === slug) ?? null;
}

export function defaultTasksForSkill(skillName: string) {
  const titles = [
    "Watch or read an intro",
    "Capture notes (what + why)",
    "Build something small (apply)",
    "Ship to GitHub / document outcome",
    "Mark this skill complete when honest",
  ];

  return titles.map((title, index) => ({
    id: `${slugify(skillName)}:task-${index + 1}`,
    title,
    completed: false,
  }));
}
