import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ResultRow, FavoriteTeam } from "../types";
import { matchesFavorite } from "../lib/normalize";
import { FavoriteStar } from "./FavoriteStar";
import { flagLabel } from "../lib/flags";
import { useTrendTracker } from "../hooks/useTrendTracker";

const fmt = (n: number | null, d = 2) =>
  n == null ? "–" : n.toLocaleString("de-AT", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtInt = (n: number | null) => (n == null ? "–" : String(n));

function TrendIcon({ trend }: { trend: "up" | "down" | "same" | "new" | null }) {
  if (trend === "up") return <span className="text-emerald-400" title="verbessert">▲</span>;
  if (trend === "down") return <span className="text-red-400" title="verschlechtert">▼</span>;
  if (trend === "new") return <span className="text-ctif-orange" title="neu">•</span>;
  return null;
}

export function ResultsTable({
  rows, favorites, query, sortKey,
}: { rows: ResultRow[]; favorites: FavoriteTeam[]; query: string; sortKey: string }) {
  const navigate = useNavigate();
  const getTrend = useTrendTracker(rows);

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
            <th className="px-2 py-3">★</th>
            <th className="px-2 py-3">Rang</th>
            <th className="px-3 py-3 min-w-[160px]">Gruppe</th>
            <th className="px-3 py-3">Land</th>
            <th className="px-2 py-3 text-right">Nr.</th>
            <th className="px-2 py-3 text-right">Hind. Zeit</th>
            <th className="px-2 py-3 text-right">Hind. F.</th>
            <th className="px-2 py-3 text-right">Staffel Zeit</th>
            <th className="px-2 py-3 text-right">Staffel F.</th>
            <th className="px-2 py-3 text-right">Vorgabe</th>
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
            const trend = getTrend(r.teamName);
            return (
              <tr
                key={r.teamName + "-" + i}
                onClick={() => navigate("/team/" + encodeURIComponent(r.teamName))}
                className={[
                  "cursor-pointer border-t border-slate-700 hover:bg-slate-700/40",
                  fav ? "bg-ctif-orange/15" : i % 2 ? "bg-slate-800/40" : "",
                  podium ? "font-semibold" : "",
                ].join(" ")}
              >
                <td className="px-2 py-2" onClick={(e) => e.stopPropagation()}>
                  <FavoriteStar teamName={r.teamName} country={r.country} category={r.category} />
                </td>
                <td className="px-2 py-2">
                  <span className="inline-flex items-center gap-1">
                    {r.rank == null ? "–" : (
                      <span className={podium ? "inline-flex h-6 w-6 items-center justify-center rounded-full bg-ctif-orange text-white" : ""}>
                        {r.rank}
                      </span>
                    )}
                    <TrendIcon trend={trend} />
                  </span>
                </td>
                <td className="px-3 py-2">{r.teamName}</td>
                <td className="whitespace-nowrap px-3 py-2 text-slate-300">{flagLabel(r.country)}</td>
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