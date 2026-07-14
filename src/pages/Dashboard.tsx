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
