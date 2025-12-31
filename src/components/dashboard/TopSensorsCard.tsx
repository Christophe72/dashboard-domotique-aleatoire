import type { TopSensor } from "./types";

type TopSensorsCardProps = {
  sensors: TopSensor[];
};

export function TopSensorsCard({ sensors }: TopSensorsCardProps) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg">Top capteurs</p>
        <span className="text-xs text-slate-400">Live</span>
      </div>
      <div className="mt-4 space-y-3">
        {sensors.map((sensor) => (
          <div
            key={sensor.name}
            className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2"
          >
            <div>
              <p className="text-sm">{sensor.name}</p>
              <p className="text-xs text-slate-400">{sensor.signal}</p>
            </div>
            <span className="text-sm font-semibold text-slate-200">
              {sensor.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
