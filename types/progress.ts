import type { LearningStatus } from "./guide";

export type SkillTask = {
  id: string;
  title: string;
  completed: boolean;
};

export type ChecklistHistoryPoint = {
  date: string;
  pct: number;
};

export type SessionHistoryPoint = {
  date: string;
  minutes: number;
};

export type SkillProgress = {
  learningStatus: LearningStatus;
  confidence: number;
  bookmarked: boolean;
  notes: string;
  tasks: SkillTask[];
  /** Last points for checklist % sparkline (capped in store). */
  checklistHistory?: ChecklistHistoryPoint[];
  /** Minutes per day for this skill when logs include skillKey (capped in store). */
  sessionHistory?: SessionHistoryPoint[];
  /** ISO timestamp — updated when you open a skill path (drives focus + recent). */
  lastOpenedAt?: string;
};

export type PracticeType = "DSA" | "SQL" | "SYSTEM_DESIGN" | "TESTING";

export type PracticeEntry = {
  id: string;
  type: PracticeType;
  topic: string;
  question: string;
  solved: boolean;
  difficulty?: "easy" | "medium" | "hard";
  minutes?: number;
  date: string;
  /** When set, minutes roll into that skill's session sparkline. */
  skillKey?: string;
};

export type ProjectStatus = "idea" | "building" | "done";

export type Project = {
  id: string;
  skillKeys: string[];
  title: string;
  status: ProjectStatus;
  githubUrl?: string;
  demoUrl?: string;
  notes: string;
};

export type CertificationTrack = {
  id: string;
  name: string;
  progress: number;
  readiness: number;
  targetDate?: string;
  notes: string;
  checklist: SkillTask[];
};

export type StudySession = {
  id: string;
  date: string;
  minutes: number;
  category: string;
  /** When set, minutes roll into that skill's session sparkline. */
  skillKey?: string;
};
