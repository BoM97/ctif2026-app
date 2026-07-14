import type { Category } from "../types";

export const SHEET_IDS: Record<Category, string> = {
  girls:      "1sAtsV634PEdVjG7Q3QOYlKYfwUjFsqCtnB73NDnp0UY",
  boys_mixed: "1DxI04Au0uVTB88b-nhZQcWIL19mBWoRg3qyi8BHWWNM",
  vetter:     "1tUou7L8JVByXPL-bNZSBfelp-gmAAAJmVNk5lrWsnpM"
};

export const csvUrl = (id: string, gid = "0") =>
  `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&gid=${gid}`;
export const csvUrlFallback = (id: string, gid = "0") =>
  `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;

export const CATEGORY_LABELS: Record<Category, string> = {
  girls: "Girls Category",
  boys_mixed: "Boys / Mixed Category",
  vetter: "Vetter Cup"
};

export const POLL_INTERVAL_NORMAL = 30000;
export const POLL_INTERVAL_LIVE = 8000;
export const COMPETITION_DAYS = ["2026-07-14", "2026-07-15", "2026-07-16"];

export const EVENT = {
  title: "XXV International Youth Fire Brigade Gathering",
  subtitle: "World Youth Championship in Classic CTIF Disciplines",
  dates: "13–18 July 2026",
  place: "Šumperk, Czech Republic",
  website: "https://ctif.cz/"
};
