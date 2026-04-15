import { PageShell } from "@/components/layout/page-shell";
import { ProjectsHome } from "@/components/projects/projects-home";

export default function ProjectsPage() {
  return (
    <PageShell title="Projects" description="What you build is what gets you hired.">
      <ProjectsHome />
    </PageShell>
  );
}
