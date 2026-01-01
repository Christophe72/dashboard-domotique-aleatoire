import { AreaChartCard } from "@/components/dashboard/AreaChartCard";
import { BarChartCard } from "@/components/dashboard/BarChartCard";
import { PageShell } from "@/components/dashboard/PageShell";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { TopSensorsCard } from "@/components/dashboard/TopSensorsCard";
import { initialSnapshot } from "@/components/dashboard/data";
import { buildAreaPath } from "@/components/dashboard/utils";

const { line, area } = buildAreaPath(initialSnapshot.revenue, 240, 90);

export default function AnalyticsPage() {
  return (
    <PageShell
      badge={{ label: "Analytics", tone: "info" }}
      title="Analyse des signaux"
      description="Vue comparee des flux capteurs et derivees recentes."
    >
      <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <BarChartCard bars={initialSnapshot.bars} barsPrev={initialSnapshot.barsPrev} />
        <SummaryCard items={initialSnapshot.progress} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <AreaChartCard
          linePath={line}
          areaPath={area}
          value={initialSnapshot.revenue[initialSnapshot.revenue.length - 1]}
        />
        <TopSensorsCard sensors={initialSnapshot.topSensors} />
      </section>
    </PageShell>
  );
}
