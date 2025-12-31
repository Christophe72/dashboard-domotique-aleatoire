"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BarChartCard } from "./BarChartCard";
import { AreaChartCard } from "./AreaChartCard";
import { DashboardHeader } from "./DashboardHeader";
import { MetricCard } from "./MetricCard";
import { OverviewCard } from "./OverviewCard";
import { Sidebar } from "./Sidebar";
import { SummaryCard } from "./SummaryCard";
import { TopSensorsCard } from "./TopSensorsCard";
import { SensorListCard } from "./SensorListCard";
import { initialSnapshot, navItems } from "./data";
import { buildAreaPath, generateSnapshot } from "./utils";
import type { Snapshot } from "./types";

export function Dashboard() {
  const [snapshot, setSnapshot] = useState<Snapshot>(initialSnapshot);

  const refresh = useCallback(() => {
    setSnapshot(generateSnapshot());
  }, []);

  useEffect(() => {
    const interval = setInterval(refresh, 4500);
    return () => clearInterval(interval);
  }, [refresh]);

  const { line, area } = useMemo(
    () => buildAreaPath(snapshot.revenue, 240, 90),
    [snapshot.revenue],
  );

  return (
    <div className="min-h-screen text-foreground">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row">
        <Sidebar items={navItems} />

        <main className="flex-1 space-y-6">
          <DashboardHeader timestamp={snapshot.timestamp} onRefresh={refresh} />

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {snapshot.metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.7fr_1fr_1fr]">
            <SummaryCard items={snapshot.progress} />
            <OverviewCard />
            <TopSensorsCard sensors={snapshot.topSensors} />
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <BarChartCard bars={snapshot.bars} barsPrev={snapshot.barsPrev} />
            <AreaChartCard
              linePath={line}
              areaPath={area}
              value={snapshot.revenue[snapshot.revenue.length - 1]}
            />
          </section>

          <SensorListCard sensors={snapshot.sensors} />
        </main>
      </div>
    </div>
  );
}
