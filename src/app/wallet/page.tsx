import { ListCard } from "@/components/dashboard/ListCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PageShell } from "@/components/dashboard/PageShell";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import type { Metric, ProgressItem } from "@/components/dashboard/types";

const walletMetrics: Metric[] = [
  { label: "Solde", value: 124.6, unit: "kEUR", delta: 2.1 },
  { label: "Encaissements", value: 18.4, unit: "kEUR", delta: 1.7 },
  { label: "Factures dues", value: 6.2, unit: "kEUR", delta: -0.6 },
  { label: "CapEx restant", value: 42, unit: "%", delta: -1.1 },
];

const progress: ProgressItem[] = [
  { label: "Disponibilite", value: 68, accent: "var(--accent)" },
  { label: "Utilisation Opex", value: 54, accent: "var(--accent-cool)" },
  { label: "CapEx", value: 32, accent: "var(--warning)" },
];

const transactions = [
  { title: "Facture #9923", description: "Capteurs Orion", status: "Payee", tone: "success", meta: "-2.4kEUR" },
  { title: "Facture #9918", description: "Maintenance A3", status: "En attente", tone: "warning", meta: "-1.1kEUR" },
  { title: "Encaissement #221", description: "Abonnement Nova", status: "+2.8kEUR", tone: "success", meta: "Hier" },
  { title: "Encaissement #219", description: "Support N2", status: "+0.7kEUR", tone: "info", meta: "Hier" },
];

export default function WalletPage() {
  return (
    <PageShell
      badge={{ label: "Wallet", tone: "info" }}
      title="Finances"
      description="Solde, factures et capex capteurs."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {walletMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <SummaryCard items={progress} />
        <ListCard title="Transactions" subtitle="Derniers mouvements" items={transactions} />
      </section>
    </PageShell>
  );
}
