import { ListCard } from "@/components/dashboard/ListCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PageShell } from "@/components/dashboard/PageShell";
import type { Metric } from "@/components/dashboard/types";

const customerMetrics: Metric[] = [
  { label: "Clients actifs", value: 128, unit: "", delta: 4.2 },
  { label: "Nouveaux ce mois", value: 18, unit: "", delta: 1.1 },
  { label: "Churn 30j", value: 2.3, unit: "%", delta: -0.4 },
  { label: "Satisfaction", value: 92, unit: "%", delta: 0.8 },
];

const customers = [
  {
    title: "Atlas Energie",
    description: "Site tunnel Est",
    status: "Plan Premium",
    tone: "success",
    meta: "MRR 4.2kEUR",
  },
  {
    title: "Nova Industries",
    description: "Ligne vibration 4",
    status: "Plan Standard",
    tone: "info",
    meta: "MRR 2.8kEUR",
  },
  {
    title: "Vega Agro",
    description: "Serre 2",
    status: "Plan Basic",
    tone: "warning",
    meta: "MRR 1.1kEUR",
  },
  {
    title: "Orion Labs",
    description: "Station Ouest",
    status: "Plan Premium",
    tone: "success",
    meta: "MRR 3.5kEUR",
  },
];

export default function CustomersPage() {
  return (
    <PageShell
      badge={{ label: "Customers", tone: "info" }}
      title="Clients"
      description="Etat des abonnements et sites instrumentes."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {customerMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <ListCard title="Comptes" subtitle="Vue rapide" items={customers} />
    </PageShell>
  );
}
