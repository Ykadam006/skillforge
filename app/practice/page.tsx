import { PageShell } from "@/components/layout/page-shell";
import { PracticeHome } from "@/components/practice/practice-home";

export default function PracticePage() {
  return (
    <PageShell title="Practice" description="DSA, SQL, system design, testing — timed reps.">
      <PracticeHome />
    </PageShell>
  );
}
