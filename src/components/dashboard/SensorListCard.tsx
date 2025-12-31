import type { SensorRow } from "./types";

type SensorListCardProps = {
  sensors: SensorRow[];
};

export function SensorListCard({ sensors }: SensorListCardProps) {
  const pendingCount = sensors.filter(
    (sensor) => sensor.status === "En attente",
  ).length;

  return (
    <section className="glass-panel rounded-3xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Capteurs en attente
          </p>
          <h2 className="font-display text-xl">Liste prioritaire</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
          {pendingCount} sur {sensors.length} en attente
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {sensors.map((sensor) => {
          const statusClasses =
            sensor.status === "En ligne"
              ? "bg-[var(--success)]/20 text-[var(--success)]"
              : "bg-[var(--warning)]/20 text-[var(--warning)]";
          return (
            <div
              key={sensor.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-white/15 to-white/5 text-xs font-semibold">
                  {sensor.id.slice(-2)}
                </div>
                <div>
                  <p className="text-sm font-medium">{sensor.id}</p>
                  <p className="text-xs text-slate-400">{sensor.zone}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <div className="text-right">
                  <p className="text-sm text-slate-200">
                    {sensor.value}
                    <span className="ml-1 text-slate-400">{sensor.unit}</span>
                  </p>
                  <p className="text-xs text-slate-400">{sensor.trend}</p>
                </div>
                <span className={`rounded-full px-2 py-1 ${statusClasses}`}>
                  {sensor.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
