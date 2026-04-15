export type GuideStatus = "have" | "need" | "cert";

export type LearningStatus = "not-started" | "in-progress" | "done";

export type GuideResource = {
  name: string;
  url: string;
  type: string;
  desc: string;
  covers: string;
};

export type GuideCert = {
  name: string;
  desc: string;
};

export type GuideLevel = {
  label: string;
  topics: string[];
};

export type GuideSkill = {
  name: string;
  status: GuideStatus;
  priority: 1 | 2 | 3;
  hot?: boolean;
  why: string;
  levels: GuideLevel[];
  resources?: GuideResource[];
  note?: string;
  cert?: GuideCert;
};

export type GuideCategory = {
  id: string;
  label: string;
  skills: GuideSkill[];
};

export type MasterLearningGuide = {
  cats: GuideCategory[];
};
