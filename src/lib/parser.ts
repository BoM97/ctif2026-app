import Papa from "papaparse";
import type { Category, ResultRow, ResultsPayload } from "../types";
import { parseNum } from "./normalize";

/**
 * CTIF-Ergebnis-Sheets haben eine feste Spaltenreihenfolge:
 * [0] Rang [1] Gruppenname [2] Land [3] BewNr
 * [4] Hindernis-Zeit [5] Hindernis-Fehler
 * [6] Staffel-Zeit [7] Staffel-Fehler
 * [8] Vorgabe [9] Gesamt
 */
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
    return {
      category, rows: [], fetchedAt, ok: false, warnings,
      rawRowCount: 0, detectedHeaders: [], title: null, phase: null,
    };
  }

  const cell = (r: string[], i: number) => (i < r.length ? (r[i] ?? "").trim() : "");

  const out: ResultRow[] = [];
  const titleLines: string[] = [];
  let detectedHeaders: string[] = [];

  for (const r of rows) {
    const rankRaw = cell(r, 0);
    const name = cell(r, 1);

    // Kopfzeile merken (für Debug)
    if (/^(rang|rank|pořadí|platz)/i.test(rankRaw)) {
      detectedHeaders = r;
      continue;
    }

    // Titelzeilen (vor den Daten) sammeln
    if (
      out.length === 0 &&
      rankRaw &&
      parseNum(rankRaw) == null &&
      !/^(rang|rank|pořadí|platz|zeit|fehler)/i.test(rankRaw)
    ) {
      titleLines.push(rankRaw);
    }

    // Datenzeile? erste Spalte muss reine Rang-Zahl sein + Name vorhanden
    const rank = parseNum(rankRaw);
    if (rank == null) continue;
    if (!Number.isInteger(rank)) continue;
    if (!name) continue;

    out.push({
      rank,
      teamName: name,
      country: cell(r, 2),
      startNumber: parseNum(cell(r, 3)),
      obstacleTime: parseNum(cell(r, 4)),
      obstacleErrors: parseNum(cell(r, 5)),
      relayTime: parseNum(cell(r, 6)),
      relayErrors: parseNum(cell(r, 7)),
      targetTime: parseNum(cell(r, 8)),
      totalScore: parseNum(cell(r, 9)),
      category,
      lastUpdated: fetchedAt,
    });
  }

  if (out.length === 0) warnings.push("Keine Datenzeilen erkannt (Format geändert?).");

  // Phase (Training / Wettkampf) aus den Titelzeilen ableiten
  const titleText = titleLines.join(" ").toLowerCase();
  let phase: "training" | "wettkampf" | null = null;
  if (titleText.includes("training")) phase = "training";
  else if (
    titleText.includes("wettkampf") ||
    titleText.includes("competition") ||
    titleText.includes("concours") ||
    titleText.includes("results") ||
    titleText.includes("ergebnis")
  ) {
    phase = "wettkampf";
  }

  return {
    category,
    rows: out,
    fetchedAt,
    ok: out.length > 0,
    warnings,
    rawRowCount: rows.length,
    title: titleLines[0] ?? null,
    phase,
    detectedHeaders: detectedHeaders.length
      ? detectedHeaders
      : ["Rang", "Gruppenname", "Land", "BewNr", "Hind-Zeit", "Hind-Fehler", "Staffel-Zeit", "Staffel-Fehler", "Vorgabe", "Gesamt"],
  };
}