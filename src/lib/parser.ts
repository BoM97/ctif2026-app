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
