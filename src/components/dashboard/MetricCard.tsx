import type { Metric } from "./types";

type MetricCardProps = {
  metric: Metric;
};

export function MetricCard({ metric }: MetricCardProps) {
  const isPositive = metric.delta >= 0;

  return (
    <div className="glass-card rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          {metric.label}
        </p>
        <span
          className={`rounded-full px-2 py-1 text-[11px] ${
            isPositive
              ? "bg-(--success)/20 text-(--success)"
              : "bg-(--danger)/20 text-(--danger)"
          }`}
        >
          {isPositive ? "+" : ""}
          {metric.delta}
        </span>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="font-display text-2xl font-semibold">
            {metric.value}
            <span className="ml-1 text-sm text-slate-400">{metric.unit}</span>
          </p>
          <p className="mt-1 text-xs text-slate-400">Statut: en attente</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-slate-200">
          <span className="text-lg font-semibold">+</span>
        </div>
      </div>
    </div>
  );
}
