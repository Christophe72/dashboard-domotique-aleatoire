import { ListCard } from "@/components/dashboard/ListCard";
import { PageShell } from "@/components/dashboard/PageShell";

const orders = [
  {
    title: "Commande #4821",
    description: "Capteurs ligne 4",
    meta: "Maj: 10:24",
    status: "Preparation",
    tone: "warning",
  },
  {
    title: "Commande #4820",
    description: "Kit vibration A3",
    meta: "Maj: 09:58",
    status: "Expedie",
    tone: "success",
  },
  {
    title: "Commande #4819",
    description: "Batteries Orion",
    meta: "Maj: 09:12",
    status: "En attente",
    tone: "info",
  },
  {
    title: "Commande #4818",
    description: "Capteurs hygrometrie",
    meta: "Maj: 08:47",
    status: "Retard",
    tone: "danger",
  },
];

const logistics = [
  {
    title: "Entrepot Nord",
    description: "Chargement en cours",
    status: "Slot 10:30",
    tone: "info",
  },
  {
    title: "Hub Est",
    description: "Camion #54 en approche",
    status: "ETA 25min",
    tone: "warning",
  },
  {
    title: "Station Ouest",
    description: "Palette capteurs Orion",
    status: "Reception OK",
    tone: "success",
  },
];

export default function OrdersPage() {
  return (
    <PageShell
      badge={{ label: "Orders", tone: "info" }}
      title="Commandes"
      description="Suivi des flux logistiques et kit capteurs."
    >
      <section className="grid gap-4 lg:grid-cols-2">
        <ListCard title="Commandes en cours" subtitle="Dernieres mises a jour" items={orders} />
        <ListCard title="Suivi logistique" subtitle="Hubs & receptions" items={logistics} />
      </section>
    </PageShell>
  );
}
