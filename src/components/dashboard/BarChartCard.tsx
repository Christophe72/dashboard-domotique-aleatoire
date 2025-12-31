type BarChartCardProps = {
  bars: number[];
  barsPrev: number[];
};

export function BarChartCard({ bars, barsPrev }: BarChartCardProps) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg">Flux par zone</p>
        <span className="text-xs text-slate-400">Hebdo</span>
      </div>
      <div className="mt-6 flex items-end gap-3">
        {bars.map((bar, index) => (
          <div key={`bar-${index}`} className="flex flex-col gap-2">
            <div className="flex items-end gap-1">
              <div
                className="w-3 rounded-full bg-(--accent)/80"
                style={{ height: `${bar}px` }}
              />
              <div
                className="w-3 rounded-full bg-white/10"
                style={{ height: `${barsPrev[index]}px` }}
              />
            </div>
            <span className="text-[10px] text-slate-400">J{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-(--accent)" />
          Cette semaine
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          Semaine derniere
        </span>
      </div>
    </div>
  );
}
