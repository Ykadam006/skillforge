import type { GuideStatus, LearningStatus } from "@/types/guide";
import { cn } from "@/lib/utils";

export function GuideStatusBadge({ status }: { status: GuideStatus }) {
  if (status === "have") return <span className="sf-pill-have inline-flex items-center rounded-lg">Have</span>;
  if (status === "need") return <span className="sf-pill-gap inline-flex items-center rounded-lg">Gap</span>;
  return <span className="sf-pill-cert inline-flex items-center rounded-lg">Cert</span>;
}

export function LearningStatusBadge({ status }: { status: LearningStatus }) {
  const map: Record<LearningStatus, string> = {
    "not-started": "Not started",
    "in-progress": "In progress",
    done: "Done",
  };
  const styles: Record<LearningStatus, string> = {
    "not-started": "sf-pill-learning-idle",
    "in-progress": "sf-pill-learning-active",
    done: "sf-pill-learning-done",
  };
  return (
    <span className={cn("inline-flex items-center rounded-lg", styles[status])}>{map[status]}</span>
  );
}

export function PriorityBadge({ priority }: { priority: 1 | 2 | 3 }) {
  if (priority === 1) return <span className="sf-pill-priority-high">High priority</span>;
  if (priority === 2) return <span className="sf-pill-priority-medium">Medium</span>;
  return <span className="sf-pill-priority-optional">Optional</span>;
}
