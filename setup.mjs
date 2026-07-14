// ============================================================
//  setup.mjs — CTIF 2026 Šumperk App — Auto-Setup
//  Ausführen mit:  node setup.mjs
//  Erzeugt die komplette Projektstruktur + alle Dateien.
// ============================================================
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

function file(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  // führendes \n aus Template-Strings entfernen
  writeFileSync(path, content.replace(/^\n/, ""), "utf8");
  console.log("✓", path);
}

console.log("\n📦 Erzeuge CTIF 2026 App-Dateien...\n");

// ---------- package.json ----------
file("package.json", `
{
  "name": "ctif2026-sumperk",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.59.0",
    "papaparse": "^5.4.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "zustand": "^4.5.5"
  },
  "devDependencies": {
    "@types/papaparse": "^5.3.14",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.6.2",
    "vite": "^5.4.8",
    "vite-plugin-pwa": "^0.20.5"
  }
}
`);

// ---------- Konfig-Dateien ----------
file("index.html", `
<!doctype html>
<html lang="de" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#0E2A47" />
    <link rel="icon" href="/favicon.svg" />
    <title>CTIF 2026 Šumperk</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

file("vite.config.ts", `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "CTIF 2026 Šumperk",
        short_name: "CTIF 2026",
        description: "Live-Ergebnisse & Zeitplan CTIF 2026",
        theme_color: "#0E2A47",
        background_color: "#0f172a",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\\/\\/docs\\.google\\.com\\/.*$/,
            handler: "NetworkFirst",
            options: { cacheName: "sheets-cache", networkTimeoutSeconds: 6,
              expiration: { maxEntries: 30, maxAgeSeconds: 3600 } }
          }
        ]
      }
    })
  ]
});
`);

file("tsconfig.json", `
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "types": ["vite/client", "vite-plugin-pwa/client"]
  },
  "include": ["src"]
}
`);

file("tailwind.config.js", `
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "ctif-red": "#D32027",
        "ctif-navy": "#0E2A47",
        "ctif-orange": "#F5821F"
      }
    }
  },
  plugins: []
};
`);

file("postcss.config.js", `
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} }
};
`);

file(".env", `
VITE_USE_PROXY=false
`);

file("public/favicon.svg", `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0E2A47"/><stop offset="1" stop-color="#D32027"/>
    </linearGradient>
    <linearGradient id="fl" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#F5821F"/><stop offset="1" stop-color="#FFD34E"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <path fill="url(#fl)" d="M256 96c30 46 84 74 84 140 0 66-46 116-84 148-38-32-84-82-84-148 0-42 24-66 44-96 12 22 8 40 24 52 18-20 6-58-8-96z"/>
  <text x="256" y="452" text-anchor="middle" font-family="Arial" font-weight="700" font-size="64" fill="#fff">CTIF</text>
</svg>
`);


// ============================================================
//  TEIL 2 — Typen, Config, Parser, Seed-Daten
// ============================================================

// ---------- src/types/index.ts ----------
file("src/types/index.ts", `
export type Category = "girls" | "boys_mixed" | "vetter";
export type CategoryOrUnknown = Category | "unknown";

export interface FavoriteTeam {
  id: string;
  teamName: string;
  country: string;
  category: CategoryOrUnknown;
  aliases: string[];
}

export interface ResultRow {
  rank: number | null;
  teamName: string;
  country: string;
  startNumber: number | null;
  obstacleTime: number | null;
  obstacleErrors: number | null;
  relayTime: number | null;
  relayErrors: number | null;
  targetTime: number | null;
  totalScore: number | null;
  category: Category;
  lastUpdated: string;
}

export interface ResultsPayload {
  category: Category;
  rows: ResultRow[];
  fetchedAt: string;
  ok: boolean;
  warnings: string[];
  rawRowCount: number;
  detectedHeaders: string[];
}

export type ChangeType =
  | "new_result" | "rank_changed" | "entered_top_3" | "left_top_3"
  | "score_changed" | "obstacle_time_changed" | "relay_time_changed"
  | "error_points_changed" | "new_team_added"
  | "source_unavailable" | "source_recovered";

export interface ResultChange {
  category: Category;
  teamName: string;
  country: string;
  type: ChangeType;
  oldRank?: number | null;
  newRank?: number | null;
  oldTotalScore?: number | null;
  newTotalScore?: number | null;
  timestamp: string;
}

export type Audience = "fans" | "participants" | "delegations" | "all";
export type ScheduleType =
  | "competition" | "training" | "ceremony"
  | "food" | "meeting" | "transport" | "other";

export interface ScheduleEvent {
  id: string;
  date: string;
  startTime: string;
  endTime?: string;
  title: string;
  location?: string;
  audience: Audience;
  type: ScheduleType;
}

export interface BusStop { name: string; time: string | null; }
export interface BusConnection {
  id: string;
  dateRange: string;
  direction: string;
  stops: BusStop[];
}

export interface Accommodation {
  school: string;
  address: string;
  diningHall?: string;
  countries: string[];
  mapUrl?: string;
}
`);

// ---------- src/config/sources.ts ----------
file("src/config/sources.ts", `
import type { Category } from "../types";

export const SHEET_IDS: Record<Category, string> = {
  girls:      "1sAtsV634PEdVjG7Q3QOYlKYfwUjFsqCtnB73NDnp0UY",
  boys_mixed: "1DxI04Au0uVTB88b-nhZQcWIL19mBWoRg3qyi8BHWWNM",
  vetter:     "1tUou7L8JVByXPL-bNZSBfelp-gmAAAJmVNk5lrWsnpM"
};

export const csvUrl = (id: string, gid = "0") =>
  \`https://docs.google.com/spreadsheets/d/\${id}/gviz/tq?tqx=out:csv&gid=\${gid}\`;
export const csvUrlFallback = (id: string, gid = "0") =>
  \`https://docs.google.com/spreadsheets/d/\${id}/export?format=csv&gid=\${gid}\`;

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
`);

// ---------- src/config/suggestedTeams.ts ----------
file("src/config/suggestedTeams.ts", `
import type { FavoriteTeam } from "../types";

export const SUGGESTED_AT_TEAMS: FavoriteTeam[] = [
  { id: "austria-ff-st-martin-im-muehlkreis", teamName: "FF St. Martin im Mühlkreis",
    country: "Austria", category: "boys_mixed",
    aliases: ["St. Martin", "FF St. Martin", "St. Martin im Mühlkreis"] },
  { id: "austria-ff-winden-windegg", teamName: "FF Winden-Windegg",
    country: "Austria", category: "boys_mixed",
    aliases: ["Winden", "Windegg", "Winden Windegg", "FF Winden"] },
  { id: "austria-ff-guggenberg", teamName: "FF Guggenberg",
    country: "Austria", category: "boys_mixed",
    aliases: ["Guggenberg", "FF Guggenberg"] },
  { id: "austria-ff-mitteregg-haagen-sand", teamName: "FF Mitteregg-Haagen-Sand",
    country: "Austria", category: "boys_mixed",
    aliases: ["Mitteregg", "Haagen", "Sand", "Mitteregg Haagen Sand"] }
];
`);

// ---------- src/lib/normalize.ts ----------
file("src/lib/normalize.ts", `
export function normalizeName(input: string): string {
  if (!input) return "";
  let s = input.toLowerCase().trim();
  s = s.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
  s = s.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
  s = s.replace(/ł/g, "l").replace(/đ/g, "d");
  s = s.replace(/[^a-z0-9]+/g, " ").replace(/\\s+/g, " ").trim();
  return s;
}

export function parseNum(raw: string | undefined | null): number | null {
  if (raw == null) return null;
  let s = String(raw).trim();
  if (s === "" || s === "-" || s === "—" || s.toLowerCase() === "n/a") return null;
  s = s.replace(/[\\s\\u00a0\\u202f]/g, "");
  if (s.includes(",")) s = s.replace(/\\./g, "").replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function matchesFavorite(
  teamName: string,
  fav: { teamName: string; aliases: string[] }
): boolean {
  const norm = normalizeName(teamName);
  if (!norm) return false;
  const candidates = [fav.teamName, ...fav.aliases].map(normalizeName).filter(Boolean);
  return candidates.some((c) => norm === c || norm.includes(c) || c.includes(norm));
}
`);

// ---------- src/lib/parser.ts ----------
file("src/lib/parser.ts", `
import Papa from "papaparse";
import type { Category, ResultRow, ResultsPayload } from "../types";
import { parseNum } from "./normalize";

interface ColMap {
  rank: number; teamName: number; country: number; startNumber: number;
  obstacleTime: number; obstacleErrors: number;
  relayTime: number; relayErrors: number;
  targetTime: number; totalScore: number;
}

const H = {
  rank: ["rank", "pořadí", "poradi", "platz", "rang", "místo", "misto", "pos"],
  team: ["team", "družstvo", "druzstvo", "gruppe", "name", "sbor", "ff", "unit"],
  country: ["country", "země", "zeme", "land", "nation", "stát", "stat"],
  startNumber: ["start", "číslo", "cislo", "no.", "nr", "bib", "bewerbsnummer"],
  obstacleTime: ["obstacle", "překážky", "prekazky", "hindernis", "bahn"],
  obstacleErr: ["obstacle err", "chyby překážky", "hindernisfehler", "penal"],
  relayTime: ["relay", "štafeta", "stafeta", "staffel"],
  relayErr: ["relay err", "chyby štafeta", "staffelfehler"],
  target: ["target", "vorgabe", "předpoklad", "predpoklad", "handicap", "coeff"],
  total: ["total", "celkem", "gesamt", "sum", "body", "score", "points", "bodů"]
};

function findCol(headers: string[], keys: string[]): number {
  const low = headers.map((h) => (h || "").toLowerCase().trim());
  for (let i = 0; i < low.length; i++)
    if (keys.some((k) => low[i].includes(k))) return i;
  return -1;
}

function detectHeaderRow(rows: string[][]) {
  for (let i = 0; i < Math.min(rows.length, 15); i++) {
    const h = rows[i];
    const map: ColMap = {
      rank: findCol(h, H.rank), teamName: findCol(h, H.team),
      country: findCol(h, H.country), startNumber: findCol(h, H.startNumber),
      obstacleTime: findCol(h, H.obstacleTime), obstacleErrors: findCol(h, H.obstacleErr),
      relayTime: findCol(h, H.relayTime), relayErrors: findCol(h, H.relayErr),
      targetTime: findCol(h, H.target), totalScore: findCol(h, H.total)
    };
    const hits = Object.values(map).filter((v) => v >= 0).length;
    if (map.teamName >= 0 && hits >= 3) return { idx: i, map, headers: h };
  }
  return null;
}

function cell(row: string[], idx: number): string {
  return idx >= 0 && idx < row.length ? (row[idx] ?? "").trim() : "";
}

export function parseResultsCsv(csv: string, category: Category): ResultsPayload {
  const warnings: string[] = [];
  const fetchedAt = new Date().toISOString();
  let rows: string[][] = [];
  try {
    const res = Papa.parse<string[]>(csv, { skipEmptyLines: "greedy" });
    rows = (res.data as string[][]).filter((r) => Array.isArray(r));
    if (res.errors?.length) warnings.push(res.errors.length + " parse warnings");
  } catch (e) {
    warnings.push("CSV parse failed: " + (e as Error).message);
    return { category, rows: [], fetchedAt, ok: false, warnings, rawRowCount: 0, detectedHeaders: [] };
  }

  const header = detectHeaderRow(rows);
  if (!header) {
    warnings.push("Keine Header-Zeile erkannt.");
    return { category, rows: [], fetchedAt, ok: false, warnings, rawRowCount: rows.length, detectedHeaders: [] };
  }

  const { idx, map, headers } = header;
  const out: ResultRow[] = [];
  for (let i = idx + 1; i < rows.length; i++) {
    const r = rows[i];
    const teamName = cell(r, map.teamName);
    if (!teamName) continue;
    if (/^(rank|team|country|celkem|total)/i.test(teamName)) continue;
    out.push({
      rank: parseNum(cell(r, map.rank)),
      teamName,
      country: cell(r, map.country),
      startNumber: parseNum(cell(r, map.startNumber)),
      obstacleTime: parseNum(cell(r, map.obstacleTime)),
      obstacleErrors: parseNum(cell(r, map.obstacleErrors)),
      relayTime: parseNum(cell(r, map.relayTime)),
      relayErrors: parseNum(cell(r, map.relayErrors)),
      targetTime: parseNum(cell(r, map.targetTime)),
      totalScore: parseNum(cell(r, map.totalScore)),
      category,
      lastUpdated: fetchedAt
    });
  }
  if (out.length === 0) warnings.push("Keine Datenzeilen.");
  return { category, rows: out, fetchedAt, ok: out.length > 0, warnings,
    rawRowCount: rows.length, detectedHeaders: headers };
}
`);

// ---------- src/lib/changeDetection.ts ----------
file("src/lib/changeDetection.ts", `
import type { ResultRow, ResultChange, FavoriteTeam } from "../types";
import { matchesFavorite } from "./normalize";

const near = (a: number | null, b: number | null) =>
  a == null && b == null ? true : a != null && b != null && Math.abs(a - b) < 1e-6;

export function detectChanges(
  prev: ResultRow[], next: ResultRow[], favs: FavoriteTeam[]
): ResultChange[] {
  const changes: ResultChange[] = [];
  const prevByName = new Map(prev.map((r) => [r.teamName, r]));
  const ts = new Date().toISOString();
  const isFav = (name: string) =>
    favs.length === 0 || favs.some((f) => matchesFavorite(name, f));

  for (const row of next) {
    if (!isFav(row.teamName)) continue;
    const old = prevByName.get(row.teamName);
    const base = { category: row.category, teamName: row.teamName, country: row.country, timestamp: ts };
    if (!old) {
      if (row.totalScore != null || row.rank != null)
        changes.push({ ...base, type: "new_result", newRank: row.rank, newTotalScore: row.totalScore });
      continue;
    }
    if (old.totalScore == null && row.totalScore != null)
      changes.push({ ...base, type: "new_result", newRank: row.rank, newTotalScore: row.totalScore });
    if (old.rank !== row.rank && (old.rank != null || row.rank != null)) {
      changes.push({ ...base, type: "rank_changed", oldRank: old.rank, newRank: row.rank,
        oldTotalScore: old.totalScore, newTotalScore: row.totalScore });
      const wasTop3 = old.rank != null && old.rank <= 3;
      const isTop3 = row.rank != null && row.rank <= 3;
      if (!wasTop3 && isTop3) changes.push({ ...base, type: "entered_top_3", oldRank: old.rank, newRank: row.rank });
      if (wasTop3 && !isTop3) changes.push({ ...base, type: "left_top_3", oldRank: old.rank, newRank: row.rank });
    }
    if (!near(old.totalScore, row.totalScore))
      changes.push({ ...base, type: "score_changed", oldTotalScore: old.totalScore, newTotalScore: row.totalScore });
  }
  return changes;
}
`);

// ---------- Seed-Daten ----------
file("src/data/schedule.ts", `
import type { ScheduleEvent } from "../types";
export const SCHEDULE: ScheduleEvent[] = [
  { id: "d13-arrival", date: "2026-07-13", startTime: "09:00", title: "Arrival & Accreditation", audience: "all", type: "other" },
  { id: "d13-dinner", date: "2026-07-13", startTime: "18:00", title: "Dinner", audience: "participants", type: "food" },
  { id: "d13-hod", date: "2026-07-13", startTime: "20:00", title: "Heads of Delegation Meeting", audience: "delegations", type: "meeting" },
  { id: "d13-rev", date: "2026-07-13", startTime: "21:00", title: "Reviewer's Meeting", audience: "delegations", type: "meeting" },
  { id: "d14-bf", date: "2026-07-14", startTime: "07:00", title: "Breakfast", audience: "participants", type: "food" },
  { id: "d14-train", date: "2026-07-14", startTime: "08:30", title: "Training", location: "Tyršův stadion", audience: "participants", type: "training" },
  { id: "d14-mayor", date: "2026-07-14", startTime: "16:00", title: "Mayor's Reception", audience: "delegations", type: "ceremony" },
  { id: "d14-parade", date: "2026-07-14", startTime: "17:30", title: "Parade", location: "City Centre", audience: "all", type: "ceremony" },
  { id: "d14-open", date: "2026-07-14", startTime: "19:00", title: "Opening Ceremony", location: "Tyršův stadion", audience: "all", type: "ceremony" },
  { id: "d15-train", date: "2026-07-15", startTime: "08:30", title: "Training", location: "Tyršův stadion", audience: "participants", type: "training" },
  { id: "d15-rev", date: "2026-07-15", startTime: "18:00", title: "Reviewer's Meeting", audience: "delegations", type: "meeting" },
  { id: "d15-hod", date: "2026-07-15", startTime: "19:00", title: "Heads of Delegation Meeting", audience: "delegations", type: "meeting" },
  { id: "d16-champ", date: "2026-07-16", startTime: "08:00", title: "World Championship", location: "Tyršův stadion", audience: "all", type: "competition" },
  { id: "d16-camp", date: "2026-07-16", startTime: "14:00", title: "Camp Olympics", audience: "participants", type: "other" },
  { id: "d17-exh", date: "2026-07-17", startTime: "09:00", title: "Exhibition of Nations", location: "Central Park / Sady 1. máje", audience: "all", type: "other" },
  { id: "d17-concert", date: "2026-07-17", startTime: "16:00", title: "Concert", audience: "all", type: "other" },
  { id: "d17-pres", date: "2026-07-17", startTime: "18:00", title: "Presentation of Nations", location: "Pavlínin dvůr", audience: "all", type: "ceremony" },
  { id: "d17-abba", date: "2026-07-17", startTime: "21:00", title: "ABBA Revival", audience: "all", type: "other" },
  { id: "d18-bf", date: "2026-07-18", startTime: "07:00", title: "Breakfast", audience: "participants", type: "food" },
  { id: "d18-tidy", date: "2026-07-18", startTime: "08:00", title: "Tidying up schools", audience: "participants", type: "other" },
  { id: "d18-comm", date: "2026-07-18", startTime: "09:00", title: "Commission Meeting", audience: "delegations", type: "meeting" },
  { id: "d18-lunch", date: "2026-07-18", startTime: "12:00", title: "Lunch", audience: "participants", type: "food" },
  { id: "d18-close", date: "2026-07-18", startTime: "14:00", title: "Closing Ceremony", location: "Tyršův stadion", audience: "all", type: "ceremony" },
  { id: "d18-dep", date: "2026-07-18", startTime: "16:00", title: "Departure", audience: "all", type: "transport" }
];
`);

file("src/data/accommodation.ts", `
import type { Accommodation } from "../types";
export const REQUIRED_EQUIPMENT = ["Bed Sheet", "Small Pillow", "Sleeping Bag or Blanket"];
export const ACCOMMODATIONS: Accommodation[] = [
  { school: "School 1 – Základní škola Šumperk, Dr. E. Beneše 1", address: "Dr. E. Beneše 1, Šumperk",
    countries: ["Luxembourg","Italy – Trentino","Ukraine","Slovakia","United Kingdom","Serbia","Liechtenstein","Japan","Slovenia","Czechia"],
    mapUrl: "https://maps.google.com/?q=Základní+škola+Dr.+E.+Beneše+Šumperk" },
  { school: "School 2 – Gymnázium, Šumperk, Masarykovo náměstí 8", address: "Masarykovo náměstí 8, Šumperk",
    countries: ["Hungary","Poland","Austria","Switzerland","Portugal"],
    mapUrl: "https://maps.google.com/?q=Gymnázium+Šumperk+Masarykovo+náměstí" },
  { school: "School 3 – Střední odborná škola, Šumperk, Zemědělská 3", address: "Zemědělská 3, Šumperk",
    countries: ["France","Italy – South Tyrol","Sweden"],
    mapUrl: "https://maps.google.com/?q=Střední+odborná+škola+Zemědělská+Šumperk" },
  { school: "School 4 – Základní škola Šumperk, Sluneční 38", address: "Sluneční 38, Šumperk",
    countries: ["Bulgaria","Croatia","Romania","Finland","Germany"],
    mapUrl: "https://maps.google.com/?q=Základní+škola+Sluneční+Šumperk" }
];
`);

file("src/data/bus.ts", `
import type { BusConnection } from "../types";
export const BUS_STOPS_ORDER = ["Tyršův stadion","School 3","School 4","School 1","School 2","Tyršův stadion Arrival"];
export const BUS_CONNECTIONS: BusConnection[] = [
  { id: "tue-wed-out", dateRange: "Tue & Wed 14.–15.07.", direction: "Schools → Stadium",
    stops: [{name:"School 1",time:"07:30"},{name:"School 2",time:"07:35"},{name:"School 3",time:"07:40"},{name:"School 4",time:"07:45"},{name:"Tyršův stadion Arrival",time:"08:00"}] },
  { id: "thu-out", dateRange: "Thu 16.07.", direction: "Schools → Stadium (Championship)",
    stops: [{name:"School 1",time:"06:45"},{name:"School 2",time:"06:50"},{name:"School 3",time:"06:55"},{name:"School 4",time:"07:00"},{name:"Tyršův stadion Arrival",time:"07:20"}] }
];
`);

file("src/data/exhibition.ts", `
export const EXHIBITION = {
  title: "Exhibition of Nations",
  date: "Friday, 17 July 2026 — Morning",
  location: "Central Park / Sady 1. máje",
  rules: ["Each nation gets approx. 3 × 3 m","A hut/booth is provided","Bring posters, photos, maps, flags and typical exhibits","No alcohol — violation may lead to booth closure"]
};
export const PRESENTATION = {
  title: "Presentation of Nations",
  date: "Friday, 17 July 2026 — Afternoon/Evening",
  location: "Pavlínin dvůr",
  rules: ["Folklore / performance: 3–5 minutes","Stage approx. 10 × 8 m","Only registered participants allowed","Actively involve the youth","Be innovative — different from previous gatherings"]
};
`);

file("src/data/documents.ts", `
export const DOCUMENTS = [
  { title: "Official Training Schedule (PDF)", url: "https://ctif.cz/competition", kind: "pdf" },
  { title: "Competition Rules (PDF)", url: "https://ctif.cz/competition", kind: "pdf" },
  { title: "Equipment & Apparatus (PDF)", url: "https://ctif.cz/competition", kind: "pdf" },
  { title: "Audio Commands (MP3)", url: "https://ctif.cz/competition", kind: "audio" },
  { title: "Stadium Plan (JPG)", url: "https://ctif.cz/competition", kind: "image" },
  { title: "Camp Olympics Guidelines (PDF)", url: "https://ctif.cz/camp", kind: "pdf" },
  { title: "Information & Maps", url: "https://ctif.cz/information", kind: "link" },
  { title: "Accommodation", url: "https://ctif.cz/accommodation", kind: "link" }
];
`);


// ============================================================
//  TEIL 3 — Store, Hooks, Notifications
// ============================================================

// ---------- src/store/favorites.ts ----------
file("src/store/favorites.ts", `
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FavoriteTeam } from "../types";

interface FavState {
  favorites: FavoriteTeam[];
  add: (t: FavoriteTeam) => void;
  remove: (id: string) => void;
  toggle: (t: FavoriteTeam) => void;
  has: (id: string) => boolean;
}

export const useFavorites = create<FavState>()(
  persist(
    (set, get) => ({
      favorites: [],
      add: (t) => set((s) => (s.favorites.some((f) => f.id === t.id) ? s : { favorites: [...s.favorites, t] })),
      remove: (id) => set((s) => ({ favorites: s.favorites.filter((f) => f.id !== id) })),
      toggle: (t) => set((s) =>
        s.favorites.some((f) => f.id === t.id)
          ? { favorites: s.favorites.filter((f) => f.id !== t.id) }
          : { favorites: [...s.favorites, t] }),
      has: (id) => get().favorites.some((f) => f.id === id)
    }),
    { name: "ctif2026-favorites" }
  )
);

export function makeFavoriteId(country: string, name: string): string {
  const slug = (s: string) =>
    s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return \`\${slug(country)}-\${slug(name)}\`;
}
`);

// ---------- src/store/settings.ts ----------
file("src/store/settings.ts", `
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Settings {
  theme: "light" | "dark";
  notificationsEnabled: boolean;
  setTheme: (t: "light" | "dark") => void;
  setNotifications: (v: boolean) => void;
}

export const useSettings = create<Settings>()(
  persist(
    (set) => ({
      theme: "dark",
      notificationsEnabled: false,
      setTheme: (theme) => set({ theme }),
      setNotifications: (notificationsEnabled) => set({ notificationsEnabled })
    }),
    { name: "ctif2026-settings" }
  )
);
`);

// ---------- src/lib/notify.ts ----------
file("src/lib/notify.ts", `
import type { ResultChange } from "../types";

export type PermState = NotificationPermission | "unsupported";

export function notificationSupport(): PermState {
  if (typeof Notification === "undefined") return "unsupported";
  return Notification.permission;
}

export async function requestPermission(): Promise<PermState> {
  if (typeof Notification === "undefined") return "unsupported";
  return await Notification.requestPermission();
}

function messageFor(c: ResultChange): string | null {
  const score = c.newTotalScore != null ? "Gesamt " + c.newTotalScore.toLocaleString("de-AT") : "";
  switch (c.type) {
    case "new_result": return c.teamName + " hat jetzt ein Ergebnis: Rang " + (c.newRank ?? "?") + (score ? ", " + score : "");
    case "entered_top_3": return c.teamName + " ist neu in den Top 3!";
    case "left_top_3": return c.teamName + " ist nicht mehr in den Top 3 (Rang " + (c.newRank ?? "?") + ")";
    case "rank_changed": return c.teamName + ": Rang geändert von " + (c.oldRank ?? "?") + " auf " + (c.newRank ?? "?");
    case "score_changed": return c.teamName + ": Gesamtpunkte aktualisiert (" + score + ")";
    default: return null;
  }
}

export function fireNotifications(changes: ResultChange[], enabled: boolean) {
  if (!enabled || notificationSupport() !== "granted") return;
  const notifyable = ["new_result", "rank_changed", "entered_top_3", "left_top_3", "score_changed"];
  for (const c of changes) {
    if (!notifyable.includes(c.type)) continue;
    const body = messageFor(c);
    if (!body) continue;
    try {
      new Notification("CTIF 2026 Šumperk", { body, icon: "/icons/icon-192.png", tag: c.teamName + "-" + c.type });
    } catch { /* ignore */ }
  }
}
`);

// ---------- src/hooks/useOnline.ts ----------
file("src/hooks/useOnline.ts", `
import { useEffect, useState } from "react";
export function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);
  return online;
}
`);

// ---------- src/hooks/useNextEvents.ts ----------
file("src/hooks/useNextEvents.ts", `
import { SCHEDULE } from "../data/schedule";
export function useNextEvents(count = 3) {
  const now = new Date();
  return [...SCHEDULE]
    .filter((e) => new Date(e.date + "T" + e.startTime + ":00") >= now)
    .sort((a, b) => (a.date + "T" + a.startTime).localeCompare(b.date + "T" + b.startTime))
    .slice(0, count);
}
`);

// ---------- src/hooks/useResults.ts ----------
file("src/hooks/useResults.ts", `
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { Category, ResultsPayload } from "../types";
import { csvUrl, csvUrlFallback, SHEET_IDS,
  POLL_INTERVAL_NORMAL, POLL_INTERVAL_LIVE, COMPETITION_DAYS } from "../config/sources";
import { parseResultsCsv } from "../lib/parser";
import { detectChanges } from "../lib/changeDetection";
import { fireNotifications } from "../lib/notify";
import { useFavorites } from "../store/favorites";
import { useSettings } from "../store/settings";

const USE_PROXY = import.meta.env.VITE_USE_PROXY === "true";

async function fetchCategory(cat: Category): Promise<ResultsPayload> {
  if (USE_PROXY) {
    const map: Record<Category, string> = { girls: "girls", boys_mixed: "boys-mixed", vetter: "vetter" };
    const res = await fetch("/api/results/" + map[cat]);
    if (!res.ok) throw new Error("proxy " + res.status);
    return res.json();
  }
  const id = SHEET_IDS[cat];
  try {
    const r = await fetch(csvUrl(id));
    if (!r.ok) throw new Error(String(r.status));
    return parseResultsCsv(await r.text(), cat);
  } catch {
    const r2 = await fetch(csvUrlFallback(id));
    if (!r2.ok) throw new Error("fallback " + r2.status);
    return parseResultsCsv(await r2.text(), cat);
  }
}

function pollInterval(): number {
  const today = new Date().toISOString().slice(0, 10);
  return COMPETITION_DAYS.includes(today) ? POLL_INTERVAL_LIVE : POLL_INTERVAL_NORMAL;
}

export function useResults(cat: Category) {
  const favorites = useFavorites((s) => s.favorites);
  const notifEnabled = useSettings((s) => s.notificationsEnabled);
  const prevRef = useRef<ResultsPayload | null>(null);

  const q = useQuery({
    queryKey: ["results", cat],
    queryFn: () => fetchCategory(cat),
    refetchInterval: pollInterval(),
    refetchOnWindowFocus: true,
    staleTime: 3000,
    retry: 2
  });

  useEffect(() => {
    if (!q.data?.ok) return;
    const prev = prevRef.current;
    if (prev && prev.ok) {
      const catFavs = favorites.filter((f) => f.category === cat || f.category === "unknown");
      const changes = detectChanges(prev.rows, q.data.rows, catFavs);
      if (changes.length) fireNotifications(changes, notifEnabled);
    }
    prevRef.current = q.data;
  }, [q.data, cat, favorites, notifEnabled]);

  return q;
}
`);


// ============================================================
//  TEIL 4 — CSS, Komponenten, Seiten, App, main (ABSCHLUSS)
// ============================================================

// ---------- src/index.css ----------
file("src/index.css", `
@tailwind base;
@tailwind components;
@tailwind utilities;

html { -webkit-tap-highlight-color: transparent; }
body { background: #0f172a; overscroll-behavior-y: none; }
.tabular-nums { font-variant-numeric: tabular-nums; }
`);

// ---------- src/main.tsx ----------
file("src/main.tsx", `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>
);
`);

// ---------- src/components/Layout.tsx ----------
file("src/components/Layout.tsx", `
import { ReactNode, useEffect } from "react";
import { BottomNav } from "./BottomNav";
import { useSettings } from "../store/settings";

export function Layout({ children }: { children: ReactNode }) {
  const theme = useSettings((s) => s.theme);
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); }, [theme]);
  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-slate-900 text-slate-100 pb-20">
      {children}
      <BottomNav />
    </div>
  );
}
`);

// ---------- src/components/BottomNav.tsx ----------
file("src/components/BottomNav.tsx", `
import { NavLink } from "react-router-dom";
const items = [
  { to: "/", label: "Start", icon: "🏠" },
  { to: "/results", label: "Ergebnisse", icon: "📊" },
  { to: "/my-teams", label: "Meine", icon: "★" },
  { to: "/schedule", label: "Plan", icon: "📅" },
  { to: "/more", label: "Mehr", icon: "☰" }
];
export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-2xl justify-around border-t border-slate-700 bg-slate-900/95 backdrop-blur">
      {items.map((i) => (
        <NavLink key={i.to} to={i.to} end={i.to === "/"}
          className={({ isActive }) =>
            "flex flex-1 flex-col items-center gap-0.5 py-2 text-xs " + (isActive ? "text-ctif-orange" : "text-slate-400")}>
          <span className="text-lg">{i.icon}</span>{i.label}
        </NavLink>
      ))}
    </nav>
  );
}
`);

// ---------- src/components/StatusBar.tsx ----------
file("src/components/StatusBar.tsx", `
import { useOnline } from "../hooks/useOnline";
export function StatusBar({ lastUpdated, sourceOk }: { lastUpdated: string | null; sourceOk: boolean }) {
  const online = useOnline();
  const dot = !online ? "bg-slate-400" : sourceOk ? "bg-emerald-400" : "bg-red-400";
  const label = !online ? "Offline – gecachte Daten" : sourceOk ? "Live" : "Live-Daten aktuell nicht erreichbar";
  const time = lastUpdated ? new Date(lastUpdated).toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "—";
  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-700 bg-slate-900/80 px-4 py-2 text-xs backdrop-blur sticky top-0 z-10">
      <span className="flex items-center gap-2">
        <span className={"inline-block h-2.5 w-2.5 rounded-full " + dot + (online && sourceOk ? " animate-pulse" : "")} />
        {label}
      </span>
      <span className="text-slate-400">Update: {time}</span>
    </div>
  );
}
`);

// ---------- src/components/FavoriteStar.tsx ----------
file("src/components/FavoriteStar.tsx", `
import type { CategoryOrUnknown } from "../types";
import { useFavorites, makeFavoriteId } from "../store/favorites";
export function FavoriteStar({ teamName, country, category }:
  { teamName: string; country: string; category: CategoryOrUnknown }) {
  const { has, toggle } = useFavorites();
  const id = makeFavoriteId(country, teamName);
  const active = has(id);
  return (
    <button aria-label={active ? "Favorit entfernen" : "Favorit"}
      onClick={(e) => { e.stopPropagation(); toggle({ id, teamName, country, category, aliases: [] }); }}
      className={"text-xl leading-none transition-transform active:scale-90 " +
        (active ? "text-ctif-orange" : "text-slate-500 hover:text-slate-300")}>
      {active ? "★" : "☆"}
    </button>
  );
}
`);

// ---------- src/components/SearchSort.tsx ----------
file("src/components/SearchSort.tsx", `
export function SearchSort({ query, setQuery, sortKey, setSortKey }:
  { query: string; setQuery: (s: string) => void; sortKey: string; setSortKey: (s: any) => void }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input value={query} onChange={(e) => setQuery(e.target.value)}
        placeholder="Suche Gruppe oder Land…"
        className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-base placeholder-slate-400 focus:border-ctif-orange focus:outline-none" />
      <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}
        className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-base">
        <option value="rank">Sortieren: Rang</option>
        <option value="teamName">Sortieren: Gruppe</option>
        <option value="country">Sortieren: Land</option>
        <option value="startNumber">Sortieren: Bewerbsnummer</option>
      </select>
    </div>
  );
}
`);

// ---------- src/components/ResultsTable.tsx ----------
file("src/components/ResultsTable.tsx", `
import { useMemo } from "react";
import type { ResultRow, FavoriteTeam } from "../types";
import { matchesFavorite } from "../lib/normalize";
import { FavoriteStar } from "./FavoriteStar";

const fmt = (n: number | null, d = 2) =>
  n == null ? "–" : n.toLocaleString("de-AT", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtInt = (n: number | null) => (n == null ? "–" : String(n));

export function ResultsTable({ rows, favorites, query, sortKey }:
  { rows: ResultRow[]; favorites: FavoriteTeam[]; query: string; sortKey: string }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let r = rows;
    if (q) r = r.filter((x) => x.teamName.toLowerCase().includes(q) || x.country.toLowerCase().includes(q));
    return [...r].sort((a, b) => {
      switch (sortKey) {
        case "teamName": return a.teamName.localeCompare(b.teamName);
        case "country": return a.country.localeCompare(b.country);
        case "startNumber": return (a.startNumber ?? 1e9) - (b.startNumber ?? 1e9);
        default: return (a.rank ?? 1e9) - (b.rank ?? 1e9);
      }
    });
  }, [rows, query, sortKey]);
  const isFav = (name: string) => favorites.some((f) => matchesFavorite(name, f));
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="min-w-full text-sm">
        <thead className="bg-ctif-navy text-white">
          <tr className="text-left">
            <th className="px-2 py-3">★</th><th className="px-2 py-3">Rang</th>
            <th className="px-3 py-3 min-w-[160px]">Gruppe</th><th className="px-3 py-3">Land</th>
            <th className="px-2 py-3 text-right">Nr.</th><th className="px-2 py-3 text-right">Hind. Zeit</th>
            <th className="px-2 py-3 text-right">Hind. F.</th><th className="px-2 py-3 text-right">Staffel Zeit</th>
            <th className="px-2 py-3 text-right">Staffel F.</th><th className="px-2 py-3 text-right">Vorgabe</th>
            <th className="px-3 py-3 text-right">Gesamt</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan={11} className="px-3 py-8 text-center text-slate-400">Keine Ergebnisse.</td></tr>
          )}
          {filtered.map((r, i) => {
            const fav = isFav(r.teamName);
            const podium = r.rank != null && r.rank <= 3;
            return (
              <tr key={r.teamName + "-" + i}
                className={["border-t border-slate-700",
                  fav ? "bg-ctif-orange/15" : i % 2 ? "bg-slate-800/40" : "",
                  podium ? "font-semibold" : ""].join(" ")}>
                <td className="px-2 py-2"><FavoriteStar teamName={r.teamName} country={r.country} category={r.category} /></td>
                <td className="px-2 py-2">{r.rank == null ? "–" :
                  <span className={podium ? "inline-flex h-6 w-6 items-center justify-center rounded-full bg-ctif-orange text-white" : ""}>{r.rank}</span>}</td>
                <td className="px-3 py-2">{r.teamName}</td>
                <td className="px-3 py-2 text-slate-300">{r.country}</td>
                <td className="px-2 py-2 text-right tabular-nums">{fmtInt(r.startNumber)}</td>
                <td className="px-2 py-2 text-right tabular-nums">{fmt(r.obstacleTime)}</td>
                <td className="px-2 py-2 text-right tabular-nums">{fmtInt(r.obstacleErrors)}</td>
                <td className="px-2 py-2 text-right tabular-nums">{fmt(r.relayTime)}</td>
                <td className="px-2 py-2 text-right tabular-nums">{fmtInt(r.relayErrors)}</td>
                <td className="px-2 py-2 text-right tabular-nums">{fmt(r.targetTime)}</td>
                <td className="px-3 py-2 text-right tabular-nums font-bold">{fmt(r.totalScore)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
`);

// ---------- src/pages/Results.tsx ----------
file("src/pages/Results.tsx", `
import { useState } from "react";
import type { Category } from "../types";
import { CATEGORY_LABELS } from "../config/sources";
import { useResults } from "../hooks/useResults";
import { useFavorites } from "../store/favorites";
import { ResultsTable } from "../components/ResultsTable";
import { SearchSort } from "../components/SearchSort";
import { StatusBar } from "../components/StatusBar";
import { matchesFavorite } from "../lib/normalize";

const TABS: (Category | "favorites")[] = ["girls", "boys_mixed", "vetter", "favorites"];

export default function Results() {
  const [tab, setTab] = useState<Category | "favorites">("girls");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<any>("rank");
  const favorites = useFavorites((s) => s.favorites);
  const girls = useResults("girls");
  const boys = useResults("boys_mixed");
  const vetter = useResults("vetter");
  const byCat = { girls, boys_mixed: boys, vetter } as const;
  const current = tab === "favorites" ? null : byCat[tab];
  const favRows = tab === "favorites"
    ? [girls, boys, vetter].flatMap((q) => q.data?.rows ?? [])
        .filter((r) => favorites.some((f) => matchesFavorite(r.teamName, f))) : [];
  const rows = tab === "favorites" ? favRows : current?.data?.rows ?? [];
  const ok = tab === "favorites" ? true : current?.data?.ok ?? false;
  const lastUpdated = tab === "favorites" ? girls.data?.fetchedAt ?? null : current?.data?.fetchedAt ?? null;
  return (
    <div>
      <StatusBar lastUpdated={lastUpdated} sourceOk={ok} />
      <div className="p-4 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={"whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium " +
                (tab === t ? "bg-ctif-red text-white" : "bg-slate-800 text-slate-300")}>
              {t === "favorites" ? "★ Favoriten" : CATEGORY_LABELS[t]}
            </button>
          ))}
        </div>
        <SearchSort query={query} setQuery={setQuery} sortKey={sortKey} setSortKey={setSortKey} />
        {tab !== "favorites" && current?.isError && (
          <div className="rounded-lg bg-red-900/40 px-4 py-3 text-sm text-red-200">
            Live-Daten aktuell nicht erreichbar – letzter Stand wird angezeigt.
          </div>
        )}
        <ResultsTable rows={rows} favorites={favorites} query={query} sortKey={sortKey} />
      </div>
    </div>
  );
}
`);

// ---------- src/pages/Dashboard.tsx ----------
file("src/pages/Dashboard.tsx", `
import { Link } from "react-router-dom";
import { useResults } from "../hooks/useResults";
import { useFavorites } from "../store/favorites";
import { useNextEvents } from "../hooks/useNextEvents";
import { StatusBar } from "../components/StatusBar";
import { matchesFavorite } from "../lib/normalize";
import { EVENT } from "../config/sources";

export default function Dashboard() {
  const favorites = useFavorites((s) => s.favorites);
  const girls = useResults("girls");
  const boys = useResults("boys_mixed");
  const vetter = useResults("vetter");
  const nextEvents = useNextEvents(3);
  const allRows = [girls, boys, vetter].flatMap((q) => q.data?.rows ?? []);
  const favRows = allRows.filter((r) => favorites.some((f) => matchesFavorite(r.teamName, f)));
  const anyOk = [girls, boys, vetter].some((q) => q.data?.ok);
  const lastUpdated = girls.data?.fetchedAt ?? null;
  return (
    <div>
      <StatusBar lastUpdated={lastUpdated} sourceOk={anyOk} />
      <div className="space-y-6 p-4">
        <header className="rounded-xl bg-gradient-to-br from-ctif-navy to-ctif-red p-5 text-white">
          <h1 className="text-lg font-bold">{EVENT.title}</h1>
          <p className="text-sm opacity-90">{EVENT.subtitle}</p>
          <p className="mt-2 text-sm">{EVENT.dates} · {EVENT.place}</p>
        </header>
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-bold">★ Meine Gruppen</h2>
            <Link to="/my-teams" className="text-sm text-ctif-orange">Alle</Link>
          </div>
          {favRows.length === 0 ? (
            <p className="text-sm text-slate-400">Noch keine Favoriten mit Ergebnis. <Link to="/my-teams" className="text-ctif-orange">Hinzufügen</Link></p>
          ) : (
            <div className="space-y-2">
              {favRows.sort((a,b)=>(a.rank??1e9)-(b.rank??1e9)).map((r, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-ctif-orange/15 px-4 py-3">
                  <div><div className="font-semibold">{r.teamName}</div><div className="text-xs text-slate-400">{r.country}</div></div>
                  <div className="text-right"><div className="font-bold">Rang {r.rank ?? "–"}</div>
                    <div className="text-xs text-slate-400">{r.totalScore?.toLocaleString("de-AT") ?? "–"}</div></div>
                </div>
              ))}
            </div>
          )}
        </section>
        <section>
          <h2 className="mb-2 font-bold">Nächste Programmpunkte</h2>
          <div className="space-y-2">
            {nextEvents.map((e) => (
              <div key={e.id} className="flex gap-3 rounded-lg bg-slate-800/60 px-4 py-3">
                <div className="text-sm font-semibold text-ctif-orange">
                  {new Date(e.date).toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit" })}<br />{e.startTime}
                </div>
                <div><div className="font-medium">{e.title}</div>
                  {e.location && <div className="text-xs text-slate-400">{e.location}</div>}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
`);

// ---------- src/pages/MyTeams.tsx ----------
file("src/pages/MyTeams.tsx", `
import { useFavorites } from "../store/favorites";
import { useSettings } from "../store/settings";
import { useResults } from "../hooks/useResults";
import { SUGGESTED_AT_TEAMS } from "../config/suggestedTeams";
import { matchesFavorite } from "../lib/normalize";
import { requestPermission, notificationSupport } from "../lib/notify";

export default function MyTeams() {
  const { favorites, add, remove } = useFavorites();
  const { notificationsEnabled, setNotifications } = useSettings();
  const girls = useResults("girls");
  const boys = useResults("boys_mixed");
  const vetter = useResults("vetter");
  const allRows = [girls, boys, vetter].flatMap((q) => q.data?.rows ?? []);
  const rowFor = (f: any) => allRows.find((r) => matchesFavorite(r.teamName, f));
  const grouped = favorites.reduce<Record<string, typeof favorites>>((acc, f) => {
    (acc[f.category] ??= []).push(f); return acc; }, {});
  const labels: Record<string, string> = { girls: "Girls", boys_mixed: "Boys / Mixed", vetter: "Vetter Cup", unknown: "Sonstige" };
  const enableNotif = async () => { const p = await requestPermission(); setNotifications(p === "granted"); };
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Meine Gruppen</h1>
        <button onClick={enableNotif}
          className={"rounded-lg px-4 py-2 text-sm font-medium text-white " + (notificationsEnabled ? "bg-emerald-600" : "bg-ctif-navy")}>
          {notificationsEnabled ? "🔔 aktiv" : "Benachrichtigen"}
        </button>
      </div>
      {notificationSupport() === "unsupported" && (
        <p className="text-sm text-amber-300">Benachrichtigungen werden von diesem Browser nicht unterstützt.</p>
      )}
      {favorites.length === 0 && (
        <div className="space-y-3">
          <p className="text-slate-400">Noch keine Favoriten. Schnellvorschläge (Österreich):</p>
          <div className="grid gap-2">
            {SUGGESTED_AT_TEAMS.map((t) => (
              <button key={t.id} onClick={() => add(t)}
                className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-left hover:border-ctif-orange">
                ☆ {t.teamName} <span className="text-slate-400 text-sm">({t.country})</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {Object.entries(grouped).map(([cat, favs]) => (
        <div key={cat} className="space-y-2">
          <h2 className="text-sm font-semibold uppercase text-slate-400">{labels[cat] ?? cat}</h2>
          {favs.map((f) => {
            const r = rowFor(f);
            return (
              <div key={f.id} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
                <div className="flex items-start justify-between">
                  <div><div className="font-semibold">{f.teamName}</div><div className="text-sm text-slate-400">{f.country}</div></div>
                  <button onClick={() => remove(f.id)} className="text-sm text-red-400">Entfernen</button>
                </div>
                {r ? (
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                    <Stat label="Rang" value={r.rank ?? "–"} highlight={r.rank != null && r.rank <= 3} />
                    <Stat label="Gesamt" value={r.totalScore?.toLocaleString("de-AT") ?? "–"} />
                    <Stat label="Hind." value={r.obstacleTime ?? "–"} />
                    <Stat label="Staffel" value={r.relayTime ?? "–"} />
                  </div>
                ) : <p className="mt-3 text-sm text-slate-500">Noch kein Ergebnis.</p>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
function Stat({ label, value, highlight }: { label: string; value: any; highlight?: boolean }) {
  return (
    <div className={"rounded-lg px-3 py-2 " + (highlight ? "bg-ctif-orange/20" : "bg-slate-900/60")}>
      <div className="text-xs text-slate-400">{label}</div>
      <div className="font-semibold tabular-nums">{value}</div>
    </div>
  );
}
`);

// ---------- src/pages/Schedule.tsx ----------
file("src/pages/Schedule.tsx", `
import { SCHEDULE } from "../data/schedule";
const typeColor: Record<string, string> = {
  competition: "bg-ctif-red", training: "bg-blue-600", ceremony: "bg-ctif-orange",
  food: "bg-emerald-600", meeting: "bg-purple-600", transport: "bg-slate-500", other: "bg-slate-600"
};
export default function Schedule() {
  const days = [...new Set(SCHEDULE.map((e) => e.date))].sort();
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Zeitplan</h1>
      {days.map((d) => (
        <div key={d}>
          <h2 className="py-2 font-semibold text-ctif-orange">
            {new Date(d).toLocaleDateString("de-AT", { weekday: "long", day: "2-digit", month: "long" })}</h2>
          <div className="space-y-2">
            {SCHEDULE.filter((e) => e.date === d).sort((a,b)=>a.startTime.localeCompare(b.startTime)).map((e) => (
              <div key={e.id} className="flex gap-3 rounded-lg bg-slate-800/60 p-3">
                <div className="w-14 shrink-0 font-mono text-sm">{e.startTime}</div>
                <div className="flex-1"><div className="font-medium">{e.title}</div>
                  {e.location && <div className="text-xs text-slate-400">{e.location}</div>}</div>
                <span className={"h-fit rounded px-2 py-0.5 text-xs text-white " + typeColor[e.type]}>{e.type}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
`);

// ---------- src/pages/More.tsx (Sammelseite: Bus, Unterkunft, Exhibition, Docs) ----------
file("src/pages/More.tsx", `
import { Link } from "react-router-dom";
const links = [
  { to: "/bus", label: "🚌 Shuttle-Bus", desc: "Fahrpläne der Buslinien" },
  { to: "/accommodation", label: "🏠 Unterkunft", desc: "Schulen & Pflichtausrüstung" },
  { to: "/exhibition", label: "🎪 Exhibition & Presentation", desc: "Nations-Programm Freitag" },
  { to: "/documents", label: "📄 Dokumente", desc: "PDFs, Regeln, Pläne" }
];
export default function More() {
  return (
    <div className="p-4 space-y-3">
      <h1 className="text-xl font-bold">Mehr</h1>
      {links.map((l) => (
        <Link key={l.to} to={l.to} className="block rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-4 hover:border-ctif-orange">
          <div className="font-medium">{l.label}</div>
          <div className="text-sm text-slate-400">{l.desc}</div>
        </Link>
      ))}
    </div>
  );
}
`);

// ---------- src/pages/Bus.tsx ----------
file("src/pages/Bus.tsx", `
import { BUS_CONNECTIONS } from "../data/bus";
export default function Bus() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Shuttle-Bus</h1>
      {BUS_CONNECTIONS.map((c) => (
        <div key={c.id} className="space-y-2">
          <div><div className="font-semibold">{c.direction}</div><div className="text-sm text-slate-400">{c.dateRange}</div></div>
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="min-w-full text-sm">
              <thead className="bg-ctif-navy text-white"><tr>
                {c.stops.map((s) => <th key={s.name} className="whitespace-nowrap px-3 py-2 text-left">{s.name}</th>)}</tr></thead>
              <tbody><tr>{c.stops.map((s) => <td key={s.name} className="whitespace-nowrap px-3 py-2 font-mono">{s.time ?? "–"}</td>)}</tr></tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
`);

// ---------- src/pages/Accommodation.tsx ----------
file("src/pages/Accommodation.tsx", `
import { ACCOMMODATIONS, REQUIRED_EQUIPMENT } from "../data/accommodation";
export default function Accommodation() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Unterkunft</h1>
      <div className="rounded-xl border border-ctif-orange/40 bg-ctif-orange/10 p-4">
        <h2 className="font-semibold">Pflichtausrüstung</h2>
        <ul className="mt-2 list-disc pl-5 text-sm">{REQUIRED_EQUIPMENT.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
      {ACCOMMODATIONS.map((a) => (
        <div key={a.school} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
          <h3 className="font-semibold">{a.school}</h3>
          <p className="text-sm text-slate-400">{a.address}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {a.countries.map((c) => <span key={c} className="rounded bg-slate-700 px-2 py-0.5 text-xs">{c}</span>)}</div>
          {a.mapUrl && <a href={a.mapUrl} target="_blank" className="mt-3 inline-block text-sm text-ctif-orange">📍 In Google Maps</a>}
        </div>
      ))}
    </div>
  );
}
`);

// ---------- src/pages/Exhibition.tsx ----------
file("src/pages/Exhibition.tsx", `
import { EXHIBITION, PRESENTATION } from "../data/exhibition";
function Card({ data }: { data: typeof EXHIBITION }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
      <h2 className="font-bold">{data.title}</h2>
      <p className="text-sm text-ctif-orange">{data.date}</p>
      <p className="text-sm text-slate-400">{data.location}</p>
      <ul className="mt-3 list-disc pl-5 text-sm space-y-1">{data.rules.map((r) => <li key={r}>{r}</li>)}</ul>
    </div>
  );
}
export default function Exhibition() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Exhibition & Presentation</h1>
      <Card data={EXHIBITION} /><Card data={PRESENTATION} />
    </div>
  );
}
`);

// ---------- src/pages/Documents.tsx ----------
file("src/pages/Documents.tsx", `
import { DOCUMENTS } from "../data/documents";
const icon: Record<string, string> = { pdf: "📄", audio: "🎧", image: "🖼️", link: "🔗" };
export default function Documents() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Dokumente & Downloads</h1>
      <div className="grid gap-2">
        {DOCUMENTS.map((d) => (
          <a key={d.title} href={d.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-4 hover:border-ctif-orange active:scale-[0.99]">
            <span className="text-2xl">{icon[d.kind] ?? "🔗"}</span>
            <span className="flex-1 font-medium">{d.title}</span><span className="text-slate-400">›</span>
          </a>
        ))}
      </div>
    </div>
  );
}
`);

// ---------- src/App.tsx ----------
file("src/App.tsx", `
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Results";
import MyTeams from "./pages/MyTeams";
import Schedule from "./pages/Schedule";
import More from "./pages/More";
import Bus from "./pages/Bus";
import Accommodation from "./pages/Accommodation";
import Exhibition from "./pages/Exhibition";
import Documents from "./pages/Documents";

const qc = new QueryClient({
  defaultOptions: { queries: { gcTime: 1000 * 60 * 60, networkMode: "offlineFirst" } }
});

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/results" element={<Results />} />
            <Route path="/my-teams" element={<MyTeams />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/more" element={<More />} />
            <Route path="/bus" element={<Bus />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/exhibition" element={<Exhibition />} />
            <Route path="/documents" element={<Documents />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
`);

// ---------- README.md ----------
file("README.md", `
# CTIF 2026 Šumperk — Live Companion App

PWA für Live-Ergebnisse, Zeitplan, Favoriten & Benachrichtigungen (CTIF 2026, Šumperk).

## Lokal starten
\\\`\\\`\\\`
npm install
npm run dev
\\\`\\\`\\\`
Dann http://localhost:5173 öffnen.

## Online stellen (Vercel)
1. Code auf GitHub hochladen
2. Auf vercel.com importieren → Deploy
3. Fertig → eigener Link (z.B. ctif2026.vercel.app)

## Konfiguration
- Google-Sheets-IDs: src/config/sources.ts
- Favoriten-Vorschläge: src/config/suggestedTeams.ts
- Zeitplan/Bus/Unterkunft: src/data/*

## Hinweise
- Sheets müssen öffentlich sein ("Jeder mit Link: Betrachter").
- Parser-Spalten ggf. in src/lib/parser.ts anpassen, sobald echte Daten da sind.
- Benachrichtigungen: nur bei geöffneter App (lokale Notification API).
`);
