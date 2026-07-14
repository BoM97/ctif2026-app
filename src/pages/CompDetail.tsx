import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { COMP_DAYS } from "../data/competition";
import { useFavorites, makeFavoriteId } from "../store/favorites";

export default function CompDetail() {
  const { date } = useParams();
  const [query, setQuery] = useState("");
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const { favorites, toggle } = useFavorites();

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const day = COMP_DAYS.find((d) => d.date === date);
  const favNrs = useMemo(
    () => new Set(favorites.map((f) => f.aliases.find((a) => /^\d+$/.test(a))).filter(Boolean)),
    [favorites]
  );

  if (!day) return <div className="p-4">Kein Plan gefunden. <Link to="/schedule" className="text-ctif-orange">Zurück</Link></div>;

  const q = query.trim().toLowerCase();
  const entryVisible = (e: any) => {
    if (e.pause) return true;
    if (onlyFavs && !favNrs.has(String(e.teamNr))) return false;
    if (q && !(e.display?.toLowerCase().includes(q) || String(e.teamNr).includes(q))) return false;
    return true;
  };
  const rowVisible = (entries: any[]) =>
    (!q && !onlyFavs) ? true : entries.some((e) => !e.pause && entryVisible(e));

  // "Jetzt läuft"-Prüfung pro Durchgang
  const runIsNow = (r: any) => {
    const t = r.time ?? r.from;
    if (!t) return false;
    const start = new Date(day.date + "T" + t + ":00");
    const end = r.to ? new Date(day.date + "T" + r.to + ":00")
                     : new Date(start.getTime() + 10 * 60 * 1000);
    return now >= start && now < end;
  };

  const toggleTeam = (teamNr: number, display: string) => {
    const country = (display.match(/([A-ZÄÖÜ]{2,4})\s*$/)?.[1]) ?? "";
    toggle({
      id: makeFavoriteId(country || "team", display + "-" + teamNr),
      teamName: display, country, category: "unknown", aliases: [String(teamNr)],
    });
  };
  const isTeamFav = (teamNr: number) => favNrs.has(String(teamNr));

  return (
    <div className="p-4 space-y-4">
      <Link to="/schedule" className="text-sm text-ctif-orange">‹ Zurück zum Plan</Link>
      <h1 className="text-xl font-bold">
        {day.label}
        <span className="ml-2 text-sm font-normal text-slate-400">
          {new Date(day.date).toLocaleDateString("de-AT", { weekday: "long", day: "2-digit", month: "long" })}
        </span>
      </h1>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Suche Team, Nummer oder Land…"
          className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 placeholder-slate-400 focus:border-ctif-orange focus:outline-none" />
        <button onClick={() => setOnlyFavs((v) => !v)}
          className={"rounded-lg px-4 py-3 text-sm font-medium " + (onlyFavs ? "bg-ctif-orange text-white" : "bg-slate-800 text-slate-300")}>
          ★ Nur meine
        </button>
      </div>

      {day.disciplines.map((disc) => {
        const rows = disc.runs.filter((r) => rowVisible(r.entries));
        return (
          <div key={disc.discipline} className="space-y-2">
            <h2 className="font-semibold text-ctif-orange">{disc.discipline}</h2>
            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="min-w-full text-sm">
                <thead className="bg-ctif-navy text-white">
                  <tr>
                    <th className="px-2 py-2 text-left">DG</th>
                    <th className="px-2 py-2 text-left">Zeit</th>
                    {disc.lanes.map((l) => <th key={l} className="whitespace-nowrap px-3 py-2 text-left">{l}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 && (
                    <tr><td colSpan={disc.lanes.length + 2} className="px-3 py-6 text-center text-slate-400">Keine Treffer.</td></tr>
                  )}
                  {rows.map((r) => {
                    const isPause = r.entries.every((x: any) => x.pause);
                    const nowRow = !isPause && runIsNow(r);
                    return (
                      <tr key={r.dg} className={"border-t border-slate-700 " +
                        (isPause ? "bg-slate-800/30 italic text-slate-500 " : "") +
                        (nowRow ? "bg-ctif-red/15 ring-1 ring-ctif-red/40" : "")}>
                        <td className="px-2 py-2">{r.dg}</td>
                        <td className="whitespace-nowrap px-2 py-2 font-mono">
                          {nowRow && <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-ctif-red align-middle" />}
                          {r.time ?? r.from}{r.to ? "–" + r.to : ""}
                        </td>
                        {disc.lanes.map((lane) => {
                          const en = r.entries.find((x: any) => x.lane === lane);
                          if (!en) return <td key={lane} className="px-3 py-2 text-slate-600">–</td>;
                          if (en.pause) return <td key={lane} className="px-3 py-2">PAUSE</td>;
                          const fav = isTeamFav(en.teamNr);
                          return (
                            <td key={lane} className={"whitespace-nowrap px-3 py-2 " + (fav ? "rounded bg-ctif-orange/20 font-semibold" : "")}>
                              <button onClick={() => toggleTeam(en.teamNr, en.display)}
                                className={"mr-1 " + (fav ? "text-ctif-orange" : "text-slate-500 hover:text-slate-300")}>
                                {fav ? "★" : "☆"}
                              </button>
                              <span className="text-slate-400">#{en.teamNr}</span> {en.display}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}