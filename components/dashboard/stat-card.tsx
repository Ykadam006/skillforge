import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function StatCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="border-border/80 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="pb-0">
        <div className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground">{title}</div>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="text-3xl font-bold tracking-tight text-foreground tabular-nums">{value}</div>
        {hint ? <p className="sf-helper mt-2 text-muted-foreground">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}
