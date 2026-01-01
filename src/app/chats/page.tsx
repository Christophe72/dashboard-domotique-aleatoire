import { ListCard } from "@/components/dashboard/ListCard";
import { PageShell } from "@/components/dashboard/PageShell";

const chats = [
  {
    title: "Atelier Nord",
    description: "Remonter logs vibration semaine",
    status: "A repondre",
    tone: "warning",
    meta: "Il y a 12 min",
  },
  {
    title: "Serre 2",
    description: "Reset capteur humidite",
    status: "En cours",
    tone: "info",
    meta: "Il y a 26 min",
  },
  {
    title: "Tunnel Est",
    description: "Calibrage pression",
    status: "Termine",
    tone: "success",
    meta: "Il y a 1h",
  },
];

const threads = [
  {
    title: "Support N2",
    description: "3 conversations ouvertes",
    status: "SLA 12min",
    tone: "info",
  },
  {
    title: "Escalade",
    description: "1 conversation critique",
    status: "Priorite",
    tone: "danger",
  },
];

export default function ChatsPage() {
  return (
    <PageShell
      badge={{ label: "Chats", tone: "info" }}
      title="Conversations"
      description="Messages entrants des sites capteurs."
    >
      <section className="grid gap-4 lg:grid-cols-2">
        <ListCard title="Inbox" subtitle="Aujourd hui" items={chats} />
        <ListCard title="Files" subtitle="Support" items={threads} />
      </section>
    </PageShell>
  );
}
