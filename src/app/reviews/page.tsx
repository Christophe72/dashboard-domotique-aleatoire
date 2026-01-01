import { ListCard } from "@/components/dashboard/ListCard";
import { PageShell } from "@/components/dashboard/PageShell";
import { SummaryCard } from "@/components/dashboard/SummaryCard";

const sentiment = [
  { label: "Positifs", value: 74, accent: "var(--success)" },
  { label: "Neutres", value: 18, accent: "var(--accent)" },
  { label: "Negatifs", value: 8, accent: "var(--danger)" },
];

const reviews = [
  {
    title: "Ligne 4",
    description: "Alertes moins bruyantes, bon suivi",
    status: "5/5",
    tone: "success",
    meta: "Recu il y a 2h",
  },
  {
    title: "Station Ouest",
    description: "Dashboard clair, vitesse ok",
    status: "4/5",
    tone: "info",
    meta: "Recu il y a 6h",
  },
  {
    title: "Serre 2",
    description: "Notifications trop frequentes",
    status: "2/5",
    tone: "danger",
    meta: "Recu hier",
  },
];

export default function ReviewsPage() {
  return (
    <PageShell
      badge={{ label: "Reviews", tone: "info" }}
      title="Avis"
      description="Retours utilisateurs sur la plateforme capteurs."
    >
      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <ListCard title="Derniers avis" subtitle="Synthese" items={reviews} />
        <SummaryCard items={sentiment} />
      </section>
    </PageShell>
  );
}
