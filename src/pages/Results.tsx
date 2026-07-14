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
