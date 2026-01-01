export type Metric = {
  label: string;
  value: number;
  unit: string;
  delta: number;
};

export type ProgressItem = {
  label: string;
  value: number;
  accent: string;
};

export type SensorRow = {
  id: string;
  zone: string;
  status: "En attente" | "En ligne";
  value: number;
  unit: string;
  trend: string;
};

export type TopSensor = {
  name: string;
  score: number;
  signal: string;
};

export type Snapshot = {
  timestamp: string;
  metrics: Metric[];
  progress: ProgressItem[];
  bars: number[];
  barsPrev: number[];
  revenue: number[];
  topSensors: TopSensor[];
  sensors: SensorRow[];
};

export type NavItemKey =
  | "dashboard"
  | "analytics"
  | "orders"
  | "customers"
  | "reviews"
  | "chats"
  | "wallet"
  | "logout";

export type NavItem = {
  label: string;
  key: NavItemKey;
  href: string;
  active?: boolean;
};
