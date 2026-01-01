"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "dashboard-theme";

const moon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path
      d="M20 14.5A8.5 8.5 0 0 1 11.5 6a8.5 8.5 0 0 1 .7-3.3A9 9 0 1 0 21 14c-.3.2-.7.4-1 .5Z"
      fill="currentColor"
    />
  </svg>
);

const sun = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path
      d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-6.7 1.4-1.4M4.9 19.1l1.4-1.4m0-11.4L4.9 4.9m13.2 13.2 1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const nextTheme = (value: Theme) => (value === "dark" ? "light" : "dark");

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(() => getInitialTheme());

  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    root.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  if (!theme) return null;

  const icon = theme === "dark" ? sun : moon;
  const label = theme === "dark" ? "Mode jour" : "Mode nuit";

  return (
    <button
      type="button"
      onClick={() => theme && setTheme(nextTheme(theme))}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-white/20 hover:text-white"
      aria-label={label}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-(--accent)">
        {icon}
      </span>
      {label}
    </button>
  );
}
