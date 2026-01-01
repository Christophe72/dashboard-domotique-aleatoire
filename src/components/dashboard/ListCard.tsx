import type { ReactNode } from "react";

const toneMap: Record<string, string> = {
  success: "bg-(--success)/20 text-(--success)",
  warning: "bg-(--warning)/20 text-(--warning)",
  danger: "bg-(--danger)/20 text-(--danger)",
  info: "bg-white/10 text-white",
};

type ListItem = {
  title: string;
  meta?: string;
  description?: string;
  status?: string;
  tone?: keyof typeof toneMap;
  trailing?: ReactNode;
};

type ListCardProps = {
  title: string;
  subtitle?: string;
  items: ListItem[];
};

export function ListCard({ title, subtitle, items }: ListCardProps) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-lg">{title}</p>
          {subtitle ? <p className="text-xs text-slate-400">{subtitle}</p> : null}
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.title + (item.meta ?? "")}
            className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/5 px-3 py-2"
          >
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-slate-100">{item.title}</p>
              {item.description ? (
                <p className="text-xs text-slate-400">{item.description}</p>
              ) : null}
              {item.meta ? <p className="text-[11px] text-slate-500">{item.meta}</p> : null}
            </div>
            <div className="flex items-center gap-2 text-sm">
              {item.status ? (
                <span
                  className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                    toneMap[item.tone ?? "info"]
                  }`}
                >
                  {item.status}
                </span>
              ) : null}
              {item.trailing}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
