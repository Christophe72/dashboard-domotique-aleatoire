import { sensorZones, signalLabels, topSensorNames } from "./data";
import type { Snapshot } from "./types";

export const randomRange = (min: number, max: number, digits = 0) => {
  return Number((min + Math.random() * (max - min)).toFixed(digits));
};

export const buildAreaPath = (
  values: number[],
  width: number,
  height: number,
) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const points = values.map((value, index) => {
    const x = index * step;
    const y = height - ((value - min) / range) * height;
    return { x, y };
  });
  const line = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;
  return { line, area };
};

export const generateSnapshot = (): Snapshot => {
  const now = new Date();
  return {
    timestamp: now.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    metrics: [
      {
        label: "Temperature moyenne",
        value: randomRange(18, 32, 1),
        unit: "C",
        delta: randomRange(-1.8, 2.6, 1),
      },
      {
        label: "Humidite relative",
        value: randomRange(42, 78),
        unit: "%",
        delta: randomRange(-4, 5, 1),
      },
      {
        label: "Pression",
        value: randomRange(992, 1028),
        unit: "hPa",
        delta: randomRange(-6, 6, 1),
      },
      {
        label: "Vibration RMS",
        value: randomRange(1.4, 4.6, 1),
        unit: "mm/s",
        delta: randomRange(-0.6, 0.9, 1),
      },
    ],
    progress: [
      {
        label: "Flux actif",
        value: randomRange(58, 88),
        accent: "var(--accent)",
      },
      {
        label: "Stabilite",
        value: randomRange(62, 92),
        accent: "var(--accent-cool)",
      },
      {
        label: "Maintenance",
        value: randomRange(18, 38),
        accent: "var(--warning)",
      },
    ],
    bars: Array.from({ length: 7 }, () => randomRange(40, 100)),
    barsPrev: Array.from({ length: 7 }, () => randomRange(20, 80)),
    revenue: Array.from({ length: 9 }, () => randomRange(40, 120)),
    topSensors: topSensorNames.map((name) => ({
      name,
      score: randomRange(60, 98),
      signal: signalLabels[Math.floor(Math.random() * signalLabels.length)],
    })),
    sensors: sensorZones.map((zone, index) => ({
      id: `CAP-${String(index + 1).padStart(2, "0")}`,
      zone,
      status: Math.random() > 0.25 ? "En attente" : "En ligne",
      value: randomRange(12, 88),
      unit: "%",
      trend: Math.random() > 0.5 ? "Oscille" : "Stable",
    })),
  };
};
