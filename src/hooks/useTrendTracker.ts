import { useEffect, useRef } from "react";
import type { ResultRow } from "../types";
import { normalizeName } from "../lib/normalize";

export type Trend = "up" | "down" | "same" | "new" | null;

/**
 * Merkt sich den vorherigen Rang je Team (pro Session) und liefert eine
 * Funktion, mit der man den Trend eines Teams abfragen kann.
 * "up" = Rang verbessert (kleinere Zahl), "down" = verschlechtert.
 */
export function useTrendTracker(rows: ResultRow[]) {
  const prevRanks = useRef<Map<string, number | null>>(new Map());
  const trends = useRef<Map<string, Trend>>(new Map());

  useEffect(() => {
    const newTrends = new Map<string, Trend>();
    for (const r of rows) {
      if (!r.teamName) continue;
      const key = normalizeName(r.teamName);
      const prev = prevRanks.current.get(key);
      let t: Trend = null;
      if (prev === undefined) t = null;                     // erstes Sehen
      else if (prev == null && r.rank != null) t = "new";
      else if (prev != null && r.rank != null) {
        if (r.rank < prev) t = "up";
        else if (r.rank > prev) t = "down";
        else t = "same";
      }
      newTrends.set(key, t);
    }
    trends.current = newTrends;
    // aktuellen Stand als "prev" für nächsten Vergleich speichern
    const nextPrev = new Map<string, number | null>();
    for (const r of rows) if (r.teamName) nextPrev.set(normalizeName(r.teamName), r.rank);
    prevRanks.current = nextPrev;
  }, [rows]);

  return (teamName: string): Trend => trends.current.get(normalizeName(teamName)) ?? null;
}