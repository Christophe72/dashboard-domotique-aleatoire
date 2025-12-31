type DashboardHeaderProps = {
  timestamp: string;
  onRefresh: () => void;
};

export function DashboardHeader({ timestamp, onRefresh }: DashboardHeaderProps) {
  return (
    <header className="glass-panel flex flex-col gap-4 rounded-3xl p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          Tableau de bord
        </p>
        <h1 className="font-display text-2xl font-semibold md:text-3xl">
          Capteurs en attente
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Mise a jour automatique toutes les 4.5s
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-(--success)" />
          En attente de capteurs
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="rounded-full bg-linear-to-r from-purple-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:scale-[1.02]"
        >
          Actualiser
        </button>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-white/50" />
          {timestamp}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-white/20 to-white/5 text-sm font-semibold">
          AD
        </div>
      </div>
    </header>
  );
}
