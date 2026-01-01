import type { NavItem, Snapshot } from "./types";

export const navItems: NavItem[] = [
  { label: "Dashboard", key: "dashboard", href: "/" },
  { label: "Analytics", key: "analytics", href: "/analytics" },
  { label: "Orders", key: "orders", href: "/orders" },
  { label: "Customers", key: "customers", href: "/customers" },
  { label: "Reviews", key: "reviews", href: "/reviews" },
  { label: "Chats", key: "chats", href: "/chats" },
  { label: "Wallet", key: "wallet", href: "/wallet" },
  { label: "Logout", key: "logout", href: "/logout" },
];

export const sensorZones = [
  "Atelier Nord",
  "Pompe A3",
  "Serre 2",
  "Tunnel Est",
  "Ligne 4",
  "Station Ouest",
];

export const topSensorNames = [
  "Capteur Orion",
  "Capteur Atlas",
  "Capteur Vega",
  "Capteur Nova",
];

export const signalLabels = ["Stable", "Intermittent", "Faible", "En attente"];

export const initialSnapshot: Snapshot = {
  timestamp: "--:--:--",
  metrics: [
    {
      label: "Temperature moyenne",
      value: 24.6,
      unit: "C",
      delta: 0.4,
    },
    {
      label: "Humidite relative",
      value: 58,
      unit: "%",
      delta: -1.2,
    },
    {
      label: "Pression",
      value: 1012,
      unit: "hPa",
      delta: 0.6,
    },
    {
      label: "Vibration RMS",
      value: 2.4,
      unit: "mm/s",
      delta: -0.2,
    },
  ],
  progress: [
    {
      label: "Flux actif",
      value: 72,
      accent: "var(--accent)",
    },
    {
      label: "Stabilite",
      value: 81,
      accent: "var(--accent-cool)",
    },
    {
      label: "Maintenance",
      value: 28,
      accent: "var(--warning)",
    },
  ],
  bars: [62, 78, 70, 52, 88, 74, 66],
  barsPrev: [48, 60, 54, 42, 70, 56, 46],
  revenue: [62, 74, 82, 70, 98, 90, 78, 86, 102],
  topSensors: [
    { name: "Capteur Orion", score: 92, signal: "Stable" },
    { name: "Capteur Atlas", score: 86, signal: "Intermittent" },
    { name: "Capteur Vega", score: 79, signal: "Faible" },
    { name: "Capteur Nova", score: 71, signal: "En attente" },
  ],
  sensors: sensorZones.map((zone, index) => ({
    id: `CAP-${String(index + 1).padStart(2, "0")}`,
    zone,
    status: index % 3 === 0 ? "En ligne" : "En attente",
    value: 45 + index * 6,
    unit: "%",
    trend: index % 2 === 0 ? "Stable" : "Oscille",
  })),
};
