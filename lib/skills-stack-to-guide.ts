import type {
  GuideCategory,
  GuideCert,
  GuideLevel,
  GuideResource,
  GuideSkill,
  MasterLearningGuide,
} from "@/types/guide";
import type { SkillsStackCert, SkillsStackFile, SkillsStackResource, SkillsStackSkill } from "@/types/skills-stack";

const LEVEL_ORDER = ["beginner", "intermediate", "advanced"] as const;

const TIER_TITLE: Record<(typeof LEVEL_ORDER)[number], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

function humanizeStatus(status: string) {
  return status
    .split("-")
    .map((w) => (w.length ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function stackResourceToGuide(r: SkillsStackResource): GuideResource {
  return {
    id: r.id,
    name: r.name,
    url: r.url,
    type: r.type,
    desc: r.notes ?? "",
    covers: humanizeStatus(r.status),
    cost: r.cost,
    resourceStatus: r.status,
  };
}

function stackCertToGuide(c: SkillsStackCert): GuideCert {
  return {
    name: c.name,
    desc: c.desc ?? "",
    url: c.url ?? undefined,
    cost: c.cost ?? undefined,
  };
}

function stackSkillToGuide(skill: SkillsStackSkill): GuideSkill {
  const levels: GuideLevel[] = [];
  for (const key of LEVEL_ORDER) {
    const block = skill.levels[key];
    if (!block) continue;
    const pct = typeof block.progress === "number" ? block.progress : 0;
    levels.push({
      label: `${TIER_TITLE[key]} (${pct}%)`,
      topics: block.topics ?? [],
      progress: pct,
    });
  }

  const resources = (skill.resources ?? []).map((r) => stackResourceToGuide(r));

  return {
    id: skill.id,
    name: skill.name,
    status: skill.status,
    priority: skill.priority,
    hot: skill.hot,
    why: skill.why,
    levels,
    resources: resources.length ? resources : undefined,
    projectIds: skill.projects ?? [],
    cert: skill.cert ? stackCertToGuide(skill.cert) : undefined,
  };
}

/** Single source of truth: `data/skills.json` (categories + flat skills). */
export function skillsStackToMasterGuide(data: SkillsStackFile): MasterLearningGuide {
  const orderedCats = [...data.categories].sort((a, b) => a.order - b.order);
  const buckets = new Map<string, GuideCategory>();

  for (const c of orderedCats) {
    buckets.set(c.id, { id: c.id, label: c.label, skills: [] });
  }

  for (const skill of data.skills) {
    const cat = buckets.get(skill.category);
    if (!cat) continue;
    cat.skills.push(stackSkillToGuide(skill));
  }

  return {
    cats: orderedCats.map((c) => buckets.get(c.id)!).filter((c) => c.skills.length > 0),
  };
}
