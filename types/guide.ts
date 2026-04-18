export type GuideStatus = "have" | "need" | "cert";

export type LearningStatus = "not-started" | "in-progress" | "done";

export type GuideResource = {
  name: string;
  url: string;
  type: string;
  desc: string;
  covers: string;
  id?: string;
  cost?: string;
  /** Raw stack status, e.g. `in-progress`, `completed`. */
  resourceStatus?: string;
};

export type GuideCert = {
  name: string;
  desc: string;
  url?: string;
  cost?: string | null;
};

export type GuideLevel = {
  label: string;
  topics: string[];
  /** Optional tier progress from static JSON (0–100). */
  progress?: number;
};

export type GuideSkill = {
  /** Stable id from `data/skills.json` (e.g. `typescript`). */
  id?: string;
  name: string;
  status: GuideStatus;
  priority: 1 | 2 | 3;
  hot?: boolean;
  why: string;
  levels: GuideLevel[];
  resources?: GuideResource[];
  note?: string;
  cert?: GuideCert;
  /** Project ids for showcase / static `data/projects.json`. */
  projectIds?: string[];
};

export type GuideCategory = {
  id: string;
  label: string;
  skills: GuideSkill[];
};

export type MasterLearningGuide = {
  cats: GuideCategory[];
};
