import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useResults } from "../hooks/useResults";
import { useFavorites } from "../store/favorites";
import { useNextEvents } from "../hooks/useNextEvents";
import { StatusBar } from "../components/StatusBar";
import { matchesFavorite } from "../lib/normalize";
import { EVENT } from "../config/sources";
import { flagLabel } from "../lib/flags";
import { getTeamSlots, liveSlotStatus } from "../hooks/useTeamSchedule";
import type { Category } from "../types";

const CATEGORY_SHORT: Record<Category, string> = {
  girls: "Girls", boys_mixed: "Boys/Mixed", vetter: "Vetter Cup",
};
const CATEGORY_STYLE: Record<Category, string> = {
  girls: "bg-pink-600 text-white", boys_mixed: "bg-emerald-600 text-white", vetter: "bg-purple-600 text-white",
};

export default function Dashboard() {
  const favorites = useFavorites((s) => s.favorites);
  const girls = useResults("girls");
  const boys = useResults("boys_mixed");
  const vetter = useResults("vetter");
  const nextEvents = useNextEvents(3);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const byCat = { girls, boys_mixed: boys, vetter } as const;

  const allRows = (["girls", "boys_mixed", "vetter"] as Category[]).flatMap((cat) =>
    (byCat[cat].data?.rows ?? []).map((r) => ({
      row: r, category: cat, phase: byCat[cat].data?.phase ?? null,
    }))
  );

  const favRowsWithResult = allRows
    .filter((x) => x.row.teamName && x.row.teamName.trim() !== "")
    .filter((x) => favorites.some((f) => matchesFavorite(x.row.teamName, f)))
    .filter((x) => x.row.totalScore != null && x.row.totalScore > 0);

  const hasResults = favRowsWithResult.length > 0;
  const hasFavorites = favorites.length > 0;

  // "Jetzt läuft" / "als Nächstes" für Favoriten (aus Startzeiten-Plan)
  const favLive = useMemo(() => {
    const teamNrOf = (aliases: string[]) => {
      const n = aliases.find((a) => /^\d+$/.test(a));
      return n ? Number(n) : null;
    };
    const items = favorites.map((f) => {
      const nr = teamNrOf(f.aliases);
      if (nr == null) return null;
      const slots = getTeamSlots(nr);
      const live = slots.find((s) => liveSlotStatus(s, now) === "now");
      const next = slots.find((s) => liveSlotStatus(s, now) !== "past");
      return { fav: f, live, next };
    }).filter(Boolean) as { fav: typeof favorites[number]; live: any; next: any }[];
    return items;
  }, [favorites, now]);

  const liveItems = favLive.filter((x) => x.live);
  const nextItems = favLive.filter((x) => !x.live && x.next);

  const anyOk = [girls, boys, vetter].some((q) => q.data?.ok);
  const lastUpdated = girls.data?.fetchedAt ?? null;

  const phaseLabel = (p: any) => p === "training" ? "Training" : p === "wettkampf" ? "Wettkampf" : null;
  const phaseStyle = (p: any) => p === "wettkampf" ? "bg-ctif-red text-white" : "bg-blue-600 text-white";

  return (
    <div>
      <StatusBar lastUpdated={lastUpdated} sourceOk={anyOk} />
      <div className="space-y-6 p-4">
        <header className="rounded-xl bg-gradient-to-br from-ctif-navy to-ctif-red p-5 text-white">
          <h1 className="text-lg font-bold">{EVENT.title}</h1>
          <p className="text-sm opacity-90">{EVENT.subtitle}</p>
          <p className="mt-2 text-sm">{EVENT.dates} · {EVENT.place}</p>
        </header>

        {/* JETZT LÄUFT / ALS NÄCHSTES (Favoriten) */}
        {liveItems.length > 0 && (
          <section>
            <h2 className="mb-2 flex items-center gap-2 font-bold">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-ctif-red" /> Jetzt live
            </h2>
            <div className="space-y-2">
              {liveItems.map((x) => (
                <div key={x.fav.id} className="rounded-lg border-2 border-ctif-red bg-ctif-red/15 px-4 py-3">
                  <div className="font-semibold">{x.fav.teamName}</div>
                  <div className="text-sm text-slate-300">
                    {x.live.discipline} · {x.live.time} · {x.live.lane}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {liveItems.length === 0 && nextItems.length > 0 && (
          <section>
            <h2 className="mb-2 font-bold">Nächster Start deiner Gruppen</h2>
            <div className="space-y-2">
              {nextItems.slice(0, 3).map((x) => (
                <div key={x.fav.id} className="rounded-lg bg-slate-800/60 px-4 py-3">
                  <div className="font-semibold">{x.fav.teamName}</div>
                  <div className="text-sm text-slate-400">
                    {x.next.discipline} ·{" "}
                    {new Date(x.next.date).toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit" })}{" "}
                    {x.next.time} · {x.next.lane}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Favoriten-Ergebnisse */}
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-bold">★ Meine Gruppen</h2>
            <Link to="/my-teams" className="text-sm text-ctif-orange">Alle</Link>
          </div>

          {!hasFavorites ? (
            <p className="text-sm text-slate-400">
              Noch keine Favoriten. <Link to="/my-teams" className="text-ctif-orange">Gruppen auswählen</Link>
            </p>
          ) : hasResults ? (
            <div className="space-y-2">
              {favRowsWithResult
                .sort((a, b) => (a.row.rank ?? 1e9) - (b.row.rank ?? 1e9))
                .map((x, i) => {
                  const label = phaseLabel(x.phase);
                  return (
                    <Link
                      key={i}
                      to={"/team/" + encodeURIComponent(x.row.teamName)}
                      className="flex items-center justify-between rounded-lg bg-ctif-orange/15 px-4 py-3 hover:bg-ctif-orange/25 active:scale-[0.99]"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold">{x.row.teamName}</span>
                          <span className={"rounded px-2 py-0.5 text-[10px] font-bold uppercase " + CATEGORY_STYLE[x.category]}>
                            {CATEGORY_SHORT[x.category]}
                          </span>
                          {label && (
                            <span className={"rounded px-2 py-0.5 text-[10px] font-bold uppercase " + phaseStyle(x.phase)}>
                              {label}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">{flagLabel(x.row.country)}</div>
                      </div>
                      <div className="text-right">
                        {x.row.rank != null && <div className="font-bold">Rang {x.row.rank}</div>}
                        {x.row.totalScore != null && (
                          <div className="text-xs text-slate-400">{x.row.totalScore.toLocaleString("de-AT")}</div>
                        )}
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              {favorites.length} Gruppe(n) favorisiert. Ergebnisse erscheinen hier, sobald der Wettkampf läuft.
            </p>
          )}
        </section>

        {/* Nächste Programmpunkte */}
        <section>
          <h2 className="mb-2 font-bold">Nächste Programmpunkte</h2>
          <div className="space-y-2">
            {nextEvents.map((e) => (
              <div key={e.id} className="flex gap-3 rounded-lg bg-slate-800/60 px-4 py-3">
                <div className="text-sm font-semibold text-ctif-orange">
                  {new Date(e.date).toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit" })}<br />{e.startTime}
                </div>
                <div>
                  <div className="font-medium">{e.title}</div>
                  {e.location && <div className="text-xs text-slate-400">{e.location}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}