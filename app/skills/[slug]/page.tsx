import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { SkillLearningPanel } from "@/components/skills/skill-learning-panel";
import { findSkillBySlug } from "@/lib/guide";

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const row = findSkillBySlug(slug);
  if (!row) notFound();

  return (
    <PageShell title="Learning path" description={`${row.skill.name} · ${row.categoryLabel}`}>
      <SkillLearningPanel slug={slug} />
    </PageShell>
  );
}
