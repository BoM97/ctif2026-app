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
