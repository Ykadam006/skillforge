"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  CertificationTrack,
  PracticeEntry,
  Project,
  SkillProgress,
  StudySession,
} from "@/types/progress";
import type { LearningStatus } from "@/types/guide";
import { defaultTasksForSkill } from "@/lib/guide";
import { RADAR_TARGET_BY_AXIS } from "@/lib/radar-targets";
import { appendChecklistHistory, appendSessionMinutesHistory } from "@/lib/skill-history";
import { skillKey } from "@/lib/slug";

type SkillProgressMap = Record<string, SkillProgress>;

type SkillforgeState = {
  weeklyGoal: string;
  setWeeklyGoal: (value: string) => void;
  weeklyTargetMinutes: number;
  setWeeklyTargetMinutes: (n: number) => void;

  /** Radar overlay targets (0–100) keyed by axis label (e.g. Languages). */
  radarTargetsByAxis: Record<string, number>;
  setRadarTarget: (axis: string, value: number) => void;

  skillProgress: SkillProgressMap;
  ensureSkill: (key: string, skillName: string) => void;
  setLearningStatus: (key: string, skillName: string, status: LearningStatus) => void;
  setConfidence: (key: string, skillName: string, confidence: number) => void;
  toggleBookmark: (key: string, skillName: string) => void;
  setNotes: (key: string, skillName: string, notes: string) => void;
  setTaskCompleted: (key: string, skillName: string, taskId: string, completed: boolean) => void;
  addTask: (key: string, skillName: string, title: string) => void;
  touchSkillOpened: (key: string, skillName: string) => void;

  studySessions: StudySession[];
  logStudySession: (minutes: number, category: string, skillKey?: string) => void;

  practiceEntries: PracticeEntry[];
  addPracticeEntry: (entry: Omit<PracticeEntry, "id">) => void;
  togglePracticeSolved: (id: string) => void;

  projects: Project[];
  upsertProject: (project: Project) => void;

  certifications: CertificationTrack[];
  updateCertification: (id: string, patch: Partial<CertificationTrack>) => void;
};

const defaultProgress = (skillName: string): SkillProgress => ({
  learningStatus: "not-started",
  confidence: 3,
  bookmarked: false,
  notes: "",
  tasks: defaultTasksForSkill(skillName),
  checklistHistory: [],
  sessionHistory: [],
});

const seedProjects: Project[] = [
  {
    id: "proj-docker-dailyhabitz",
    skillKeys: [skillKey("devops", "Docker")],
    title: "Containerize DailyHabitz (or ApplyVibe)",
    status: "building",
    notes: "Dockerfile + docker-compose for app + database. Push to GitHub and update resume.",
  },
  {
    id: "proj-kafka-jobs",
    skillKeys: [skillKey("backend", "Kafka (address Java resume gap)")],
    title: "Event-driven job tracker (Spring + Kafka)",
    status: "idea",
    notes: "Producer emits events; consumer processes them. Credibility project for resume Kafka claim.",
  },
  {
    id: "proj-redis-limiter",
    skillKeys: [skillKey("database", "Redis")],
    title: "Rate limiter + caching demo",
    status: "idea",
    notes: "Show cache-aside + sliding window rate limiting.",
  },
  {
    id: "proj-ai-jd",
    skillKeys: [skillKey("ai", "LLM API Integration")],
    title: "ApplyVibe JD analyzer (AI fit score)",
    status: "idea",
    notes: "Next.js route handler + Vercel AI SDK + structured output.",
  },
  {
    id: "proj-rag-notes",
    skillKeys: [skillKey("ai", "RAG Systems")],
    title: "Notes search with pgvector",
    status: "idea",
    notes: "RAG over your own notes using Neon + pgvector.",
  },
];

const seedCerts: CertificationTrack[] = [
  {
    id: "aws-clf",
    name: "AWS Cloud Practitioner (CLF-C02)",
    progress: 15,
    readiness: 20,
    targetDate: "",
    notes: "Use Skill Builder + freeCodeCamp course; schedule when practice exams hit 80%+.",
    checklist: [
      { id: "aws-1", title: "Finish Cloud Practitioner Essentials (Skill Builder)", completed: false },
      { id: "aws-2", title: "Complete freeCodeCamp AWS course (mapped to domains)", completed: false },
      { id: "aws-3", title: "20+ practice exams until consistent 80%+", completed: false },
      { id: "aws-4", title: "Book Pearson VUE / online proctored exam", completed: false },
    ],
  },
  {
    id: "redis-cert",
    name: "Redis Certified Developer",
    progress: 0,
    readiness: 10,
    targetDate: "",
    notes: "Finish RU101 + RU102JS, then attempt free certification.",
    checklist: [
      { id: "ru101", title: "RU101 — Redis data structures", completed: false },
      { id: "ru102js", title: "RU102JS — Redis for JavaScript developers", completed: false },
      { id: "redis-exam", title: "Take Redis certification attempt (free)", completed: false },
    ],
  },
  {
    id: "terraform-assoc",
    name: "HashiCorp Terraform Associate (003)",
    progress: 0,
    readiness: 5,
    targetDate: "",
    notes: "Lower priority: do after AWS + real Terraform on a project.",
    checklist: [
      { id: "tf-learn", title: "HashiCorp Learn AWS Terraform path", completed: false },
      { id: "tf-project", title: "Terraform a real AWS footprint (EC2/RDS/S3)", completed: false },
      { id: "tf-practice", title: "Practice exams + schedule ($70)", completed: false },
    ],
  },
];

export const useSkillforgeStore = create<SkillforgeState>()(
  persist(
    (set, get) => ({
      weeklyGoal: "Finish Docker basics + 10 NeetCode problems",
      weeklyTargetMinutes: 300,

      radarTargetsByAxis: { ...RADAR_TARGET_BY_AXIS },

      setWeeklyGoal: (value) => set({ weeklyGoal: value }),
      setWeeklyTargetMinutes: (n) =>
        set({ weeklyTargetMinutes: Math.min(2000, Math.max(30, Math.round(Number(n)) || 300)) }),
      setRadarTarget: (axis, value) =>
        set((state) => ({
          radarTargetsByAxis: {
            ...state.radarTargetsByAxis,
            [axis]: Math.min(100, Math.max(0, Math.round(Number(value)) || 0)),
          },
        })),

      skillProgress: {},

      ensureSkill: (key, skillName) => {
        const existing = get().skillProgress[key];
        if (existing) return;
        set((state) => ({
          skillProgress: { ...state.skillProgress, [key]: defaultProgress(skillName) },
        }));
      },

      setLearningStatus: (key, skillName, status) => {
        get().ensureSkill(key, skillName);
        set((state) => ({
          skillProgress: {
            ...state.skillProgress,
            [key]: { ...state.skillProgress[key], learningStatus: status },
          },
        }));
      },

      setConfidence: (key, skillName, confidence) => {
        get().ensureSkill(key, skillName);
        set((state) => ({
          skillProgress: {
            ...state.skillProgress,
            [key]: { ...state.skillProgress[key], confidence },
          },
        }));
      },

      toggleBookmark: (key, skillName) => {
        get().ensureSkill(key, skillName);
        set((state) => ({
          skillProgress: {
            ...state.skillProgress,
            [key]: {
              ...state.skillProgress[key],
              bookmarked: !state.skillProgress[key].bookmarked,
            },
          },
        }));
      },

      setNotes: (key, skillName, notes) => {
        get().ensureSkill(key, skillName);
        set((state) => ({
          skillProgress: {
            ...state.skillProgress,
            [key]: { ...state.skillProgress[key], notes },
          },
        }));
      },

      setTaskCompleted: (key, skillName, taskId, completed) => {
        get().ensureSkill(key, skillName);
        set((state) => {
          const current = state.skillProgress[key];
          const tasks = current.tasks.map((t) => (t.id === taskId ? { ...t, completed } : t));
          const checklistHistory = appendChecklistHistory(current, tasks);
          return {
            skillProgress: { ...state.skillProgress, [key]: { ...current, tasks, checklistHistory } },
          };
        });
      },

      addTask: (key, skillName, title) => {
        get().ensureSkill(key, skillName);
        set((state) => {
          const current = state.skillProgress[key];
          const id = `${key}:${title}`.replace(/\s+/g, "-").toLowerCase();
          const tasks = [...current.tasks, { id, title, completed: false }];
          const checklistHistory = appendChecklistHistory(current, tasks);
          return {
            skillProgress: {
              ...state.skillProgress,
              [key]: { ...current, tasks, checklistHistory },
            },
          };
        });
      },

      touchSkillOpened: (key, skillName) => {
        get().ensureSkill(key, skillName);
        const lastOpenedAt = new Date().toISOString();
        set((state) => ({
          skillProgress: {
            ...state.skillProgress,
            [key]: { ...state.skillProgress[key], lastOpenedAt },
          },
        }));
      },

      studySessions: [],

      logStudySession: (minutes, category, skillKey) => {
        const safe = Math.min(1440, Math.max(0, Math.round(Number(minutes)) || 0));
        if (safe < 1) return;
        const day = new Date().toISOString().slice(0, 10);
        const session: StudySession = {
          id: crypto.randomUUID(),
          date: day,
          minutes: safe,
          category: category.trim() || "Study",
          ...(skillKey ? { skillKey } : {}),
        };
        set((state) => {
          let skillProgress = state.skillProgress;
          if (skillKey && state.skillProgress[skillKey]) {
            const current = state.skillProgress[skillKey];
            skillProgress = {
              ...state.skillProgress,
              [skillKey]: {
                ...current,
                sessionHistory: appendSessionMinutesHistory(current, day, safe),
              },
            };
          }
          return {
            studySessions: [session, ...state.studySessions].slice(0, 365),
            skillProgress,
          };
        });
      },

      practiceEntries: [],

      addPracticeEntry: (entry) => {
        const row: PracticeEntry = { ...entry, id: crypto.randomUUID() };
        set((state) => {
          let skillProgress = state.skillProgress;
          const mins = row.minutes ?? 0;
          if (row.skillKey && mins > 0 && state.skillProgress[row.skillKey]) {
            const current = state.skillProgress[row.skillKey];
            skillProgress = {
              ...state.skillProgress,
              [row.skillKey]: {
                ...current,
                sessionHistory: appendSessionMinutesHistory(current, row.date, mins),
              },
            };
          }
          return {
            practiceEntries: [row, ...state.practiceEntries].slice(0, 2000),
            skillProgress,
          };
        });
      },

      togglePracticeSolved: (id) => {
        set((state) => ({
          practiceEntries: state.practiceEntries.map((p) =>
            p.id === id ? { ...p, solved: !p.solved } : p,
          ),
        }));
      },

      projects: seedProjects,

      upsertProject: (project) => {
        set((state) => {
          const idx = state.projects.findIndex((p) => p.id === project.id);
          if (idx === -1) return { projects: [project, ...state.projects] };
          const next = [...state.projects];
          next[idx] = project;
          return { projects: next };
        });
      },

      certifications: seedCerts,

      updateCertification: (id, patch) => {
        set((state) => ({
          certifications: state.certifications.map((c) => {
            if (c.id !== id) return c;
            const next: CertificationTrack = { ...c, ...patch };
            if (patch.checklist) {
              const cl = next.checklist;
              next.progress =
                cl.length === 0 ? 0 : Math.round((100 * cl.filter((t) => t.completed).length) / cl.length);
            }
            return next;
          }),
        }));
      },
    }),
    {
      name: "skillforge:v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        weeklyGoal: state.weeklyGoal,
        weeklyTargetMinutes: state.weeklyTargetMinutes,
        radarTargetsByAxis: state.radarTargetsByAxis,
        skillProgress: state.skillProgress,
        studySessions: state.studySessions,
        practiceEntries: state.practiceEntries,
        projects: state.projects,
        certifications: state.certifications,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<SkillforgeState>;
        return {
          ...current,
          ...p,
          radarTargetsByAxis: {
            ...RADAR_TARGET_BY_AXIS,
            ...(p.radarTargetsByAxis ?? {}),
          },
        };
      },
    },
  ),
);
