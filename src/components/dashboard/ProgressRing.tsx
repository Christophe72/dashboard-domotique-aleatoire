import type { CSSProperties } from "react";

type ProgressRingProps = {
  value: number;
  accent: string;
  label?: string;
  sizeClass: string;
  textClass: string;
};

export function ProgressRing({
  value,
  accent,
  label,
  sizeClass,
  textClass,
}: ProgressRingProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className={`ring ${sizeClass}`}
        style={
          {
            "--value": value,
            "--ring-accent": accent,
          } as CSSProperties
        }
      >
        <span className={textClass}>{value}%</span>
      </div>
      {label ? <p className="text-xs text-slate-300">{label}</p> : null}
    </div>
  );
}
