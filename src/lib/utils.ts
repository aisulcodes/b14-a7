export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

// english to bangla
export function getBanglaUnit(unit: string) {
  if (unit === "kg") return "কেজি";
  if (unit === "litre") return "লিটার";
  if (unit === "dozen") return "ডজন";
  if (unit === "piece") return "পিস";

  return unit;
}

// english number to bangla
export function banglaNumber(num: number) {
  return num.toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });
}