"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { navItems } from "./data";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";

const toneMap: Record<string, string> = {
  success: "bg-(--success)/20 text-(--success)",
  warning: "bg-(--warning)/20 text-(--warning)",
  danger: "bg-(--danger)/20 text-(--danger)",
  info: "bg-white/10 text-white",
};

type PageShellProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  badge?: { label: string; tone?: keyof typeof toneMap };
  children: ReactNode;
};

export function PageShell({
  title,
  description,
  actions,
  badge,
  children,
}: PageShellProps) {
  const pathname = usePathname();

  const items = useMemo(
    () =>
      navItems.map((item) => {
        const isRoot = item.href === "/";
        const active = isRoot
          ? pathname === "/"
          : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return { ...item, active };
      }),
    [pathname],
  );

  return (
    <div className="min-h-screen text-foreground">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row">
        <Sidebar items={items} />

        <main className="flex-1 space-y-6">
          {(title || description || actions) && (
            <header className="glass-panel flex flex-col gap-4 rounded-3xl p-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                {badge ? (
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      toneMap[badge.tone ?? "info"]
                    }`}
                  >
                    {badge.label}
                  </span>
                ) : null}
                {title ? (
                  <h1 className="font-display text-2xl font-semibold md:text-3xl">
                    {title}
                  </h1>
                ) : null}
                {description ? (
                  <p className="text-sm text-slate-400">{description}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <ThemeToggle />
                {actions}
              </div>
            </header>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
