"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AreaChartCard } from "./AreaChartCard";
import { BarChartCard } from "./BarChartCard";
import { MetricCard } from "./MetricCard";
import { OverviewCard } from "./OverviewCard";
import { SummaryCard } from "./SummaryCard";
import { TopSensorsCard } from "./TopSensorsCard";
import { SensorListCard } from "./SensorListCard";
import { PageShell } from "./PageShell";
import { initialSnapshot } from "./data";
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

  const headerActions = (
    <>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
        <span className="h-2 w-2 rounded-full bg-(--success)" />
        En attente de capteurs
      </div>
      <button
        type="button"
        onClick={refresh}
        className="rounded-full bg-linear-to-r from-purple-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:scale-[1.02]"
      >
        Actualiser
      </button>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
        <span className="h-2 w-2 rounded-full bg-white/50" />
        {snapshot.timestamp}
      </div>
    </>
  );

  return (
    <PageShell
      badge={{ label: "Tableau de bord", tone: "info" }}
      title="Capteurs en attente"
      description="Mise a jour automatique toutes les 4.5s"
      actions={headerActions}
    >
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
    </PageShell>
  );
}
