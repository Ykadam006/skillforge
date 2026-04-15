import { PageShell } from "@/components/layout/page-shell";
import { CertificationsHome } from "@/components/certifications/certifications-home";

export default function CertificationsPage() {
  return (
    <PageShell title="Certifications" description="Exam readiness without the LMS bloat.">
      <CertificationsHome />
    </PageShell>
  );
}
