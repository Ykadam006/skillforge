import { PageShell } from "@/components/layout/page-shell";
import { AnalyticsHome } from "@/components/analytics/analytics-home";

export default function AnalyticsPage() {
  return (
    <PageShell title="Analytics" description="A small set of charts that stay readable.">
      <AnalyticsHome />
    </PageShell>
  );
}
