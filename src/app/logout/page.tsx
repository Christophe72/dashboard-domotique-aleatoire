import Link from "next/link";
import { PageShell } from "@/components/dashboard/PageShell";

export default function LogoutPage() {
  return (
    <PageShell
      badge={{ label: "Logout", tone: "warning" }}
      title="Deconnexion"
      description="Placez ici la logique d'authentification ou la redirection vers votre provider."
      actions={
        <Link
          href="/"
          className="rounded-full bg-linear-to-r from-purple-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:scale-[1.02]"
        >
          Retour au dashboard
        </Link>
      }
    >
      <div className="glass-panel rounded-3xl p-6 text-sm text-slate-200">
        <p>Cette page est un placeholder. Branchez ici votre flow de logout (auth provider, cookie clear).</p>
      </div>
    </PageShell>
  );
}
