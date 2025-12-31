type AreaChartCardProps = {
  linePath: string;
  areaPath: string;
  value: number;
};

export function AreaChartCard({ linePath, areaPath, value }: AreaChartCardProps) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg">Total flux</p>
        <span className="text-xs text-slate-400">Mensuel</span>
      </div>
      <div className="mt-4 h-32 w-full">
        <svg viewBox="0 0 240 100" className="h-full w-full">
          <defs>
            <linearGradient id="areaGlow" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#a66bff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a66bff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#areaGlow)" />
          <path d={linePath} fill="none" stroke="#c28bff" strokeWidth="3" />
        </svg>
      </div>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-sm text-slate-300">Flux moyen</p>
        <p className="font-display text-xl">
          {value}
          <span className="text-sm text-slate-400"> / h</span>
        </p>
      </div>
    </div>
  );
}
