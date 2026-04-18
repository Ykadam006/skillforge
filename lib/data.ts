import applicationsData from "@/data/applications.json";
import certificationsData from "@/data/certifications.json";
import nowData from "@/data/now.json";
import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import skillsStackData from "@/data/skills.json";
import type { SkillsStackFile } from "@/types/skills-stack";

const skillsStack = skillsStackData as SkillsStackFile;

export type Profile = typeof profileData;
export type NowSnapshot = typeof nowData;
export type ApplicationsSnapshot = typeof applicationsData;
export type ShowcaseProjectsFile = typeof projectsData;
export type ShowcaseCertificationsFile = typeof certificationsData;

export const profile = profileData;
export const now = nowData;
export const applications = applicationsData;
export const showcaseProjects = projectsData;
export const showcaseCertifications = certificationsData;

export function getSkillsStack(): SkillsStackFile {
  return skillsStack;
}

export function getSkillById(id: string) {
  return skillsStack.skills.find((s) => s.id === id);
}

export function getSkillsByCategory(cat: string) {
  return skillsStack.skills.filter((s) => s.category === cat);
}

export function getProjectById(id: string) {
  return projectsData.projects.find((p) => p.id === id);
}

export function getSkillsForProject(projectId: string) {
  return skillsStack.skills.filter((s) => (s.projects ?? []).includes(projectId));
}
