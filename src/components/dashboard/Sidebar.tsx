import Link from "next/link";
import type { NavItem } from "./types";
import { NavIcon } from "./NavIcon";

type SidebarProps = {
  items: NavItem[];
};

export function Sidebar({ items }: SidebarProps) {
  return (
    <aside className="glass-panel flex w-full flex-col gap-6 rounded-3xl p-6 lg:w-64">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 via-fuchsia-500 to-indigo-500 shadow-lg">
          <span className="font-display text-xs font-semibold">CR</span>
        </div>
        <div>
          <p className="font-display text-sm tracking-[0.3em] text-slate-200">
            CRAVEAT
          </p>
          <p className="text-xs text-slate-400">Sensor deck</p>
        </div>
      </div>
      <nav className="space-y-2 text-sm">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={`relative flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition ${
              item.active
                ? "bg-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span
              className={`absolute left-0 h-6 w-1 rounded-r-full ${
                item.active
                  ? "bg-linear-to-b from-purple-400 to-fuchsia-400"
                  : "bg-transparent"
              }`}
            />
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5">
              <NavIcon name={item.key} />
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs text-slate-400">Etat du reseau</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-display text-lg">Stable</p>
          <span className="rounded-full bg-(--success)/20 px-2 py-1 text-xs text-(--success)">
            99.2%
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-400">Derniere sync 2 min</p>
      </div>
    </aside>
  );
}
