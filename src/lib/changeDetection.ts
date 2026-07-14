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
