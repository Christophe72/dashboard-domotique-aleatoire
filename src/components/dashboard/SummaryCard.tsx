import type { ProgressItem } from "./types";
import { ProgressRing } from "./ProgressRing";

type SummaryCardProps = {
  items: ProgressItem[];
};

export function SummaryCard({ items }: SummaryCardProps) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg">Resume capteurs</p>
        <span className="text-xs text-slate-400">Aujourd hui</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {items.map((item) => (
          <ProgressRing
            key={item.label}
            value={item.value}
            accent={item.accent}
            label={item.label}
            sizeClass="h-16 w-16"
            textClass="text-xs font-semibold"
          />
        ))}
      </div>
    </div>
  );
}
