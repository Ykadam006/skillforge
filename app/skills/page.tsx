import { PageShell } from "@/components/layout/page-shell";
import { SkillsLibrary } from "@/components/skills/skills-library";

export default function SkillsPage() {
  return (
    <PageShell title="Skills library" description="Your master guide, now trackable.">
      <SkillsLibrary />
    </PageShell>
  );
}
