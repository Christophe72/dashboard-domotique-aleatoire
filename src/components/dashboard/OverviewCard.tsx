import { ProgressRing } from "./ProgressRing";

export function OverviewCard() {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg">Overview</p>
        <span className="text-xs text-slate-400">Cette semaine</span>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <ProgressRing
          value={52}
          accent="var(--accent-strong)"
          sizeClass="h-20 w-20"
          textClass="text-sm font-semibold"
        />
        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <span>Matin</span>
            <span className="text-slate-200">24%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Apres-midi</span>
            <span className="text-slate-200">35%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Soir</span>
            <span className="text-slate-200">41%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
