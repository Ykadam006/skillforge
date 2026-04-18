import type { GuideStatus } from "@/types/guide";

export type SkillsStackCategory = {
  id: string;
  label: string;
  order: number;
};

export type SkillsStackLevelBlock = {
  progress: number;
  topics: string[];
};

export type SkillsStackLevels = Partial<
  Record<"beginner" | "intermediate" | "advanced", SkillsStackLevelBlock>
>;

export type SkillsStackResource = {
  id: string;
  name: string;
  url: string;
  type: string;
  cost: string;
  status: string;
  notes?: string;
};

export type SkillsStackCert = {
  name: string;
  cost?: string | null;
  url?: string | null;
  desc?: string;
};

export type SkillsStackSkill = {
  id: string;
  name: string;
  category: string;
  status: GuideStatus;
  priority: 1 | 2 | 3;
  hot?: boolean;
  why: string;
  levels: SkillsStackLevels;
  resources?: SkillsStackResource[];
  projects?: string[];
  cert?: SkillsStackCert | null;
};

export type SkillsStackFile = {
  categories: SkillsStackCategory[];
  skills: SkillsStackSkill[];
};
