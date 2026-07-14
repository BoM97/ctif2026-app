import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useResults } from "../hooks/useResults";
import { getTeamSlots } from "../hooks/useTeamSchedule";
import { COMP_TEAMS } from "../data/competition";
import { flagLabel } from "../lib/flags";
import { normalizeName } from "../lib/normalize";
import type { Category } from "../types";

const CATEGORY_SHORT: Record<Category, string> = {
  girls: "Girls", boys_mixed: "Boys/Mixed", vetter: "Vetter Cup",
};

const fmt = (n: number | null | undefined, d = 2) =>
  n == null ? "–" : n.toLocaleString("de-AT", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtInt = (n: number | null | undefined) => (n == null ? "–" : String(n));

export default function TeamDetail() {
  const { name } = useParams();
  const decoded = decodeURIComponent(name ?? "");

  const girls = useResults("girls");
  const boys = useResults("boys_mixed");
  const vetter = useResults("vetter");
  const byCat = { girls, boys_mixed: boys, vetter } as const;

  // Ergebnis-Zeile über alle Kategorien finden
  const found = useMemo(() => {
    const target = normalizeName(decoded);
    for (const cat of ["girls", "boys_mixed", "vetter"] as Category[]) {
      const row = (byCat[cat].data?.rows ?? []).find((r) => normalizeName(r.teamName) === target);
      if (row) return { row, category: cat, phase: byCat[cat].data?.phase ?? null };
    }
    return null;
  }, [decoded, girls.data, boys.data, vetter.data]);

  // Nur ein "echtes" Ergebnis, wenn Rang oder Gesamtpunkte vorhanden sind
  const hasRealResult = !!found && (found.row.rank != null || (found.row.totalScore != null && found.row.totalScore > 0));

  // Passende Teamnummer aus den PDF-Daten (für Startzeiten)
  const teamNr = useMemo(() => {
    const target = normalizeName(decoded);
    const t = COMP_TEAMS.find((ct) => {
      const n = normalizeName(ct.display.replace(/\b[A-ZÄÖÜ]{2,4}\b/g, ""));
      return n && (n.includes(target) || target.includes(n));
    });
    return t?.nr ?? null;
  }, [decoded]);

  const slots = teamNr != null ? getTeamSlots(teamNr) : [];

  const share = async () => {
    const r = found!.row;
    let text = `${r.teamName}`;
    if (r.rank != null) text += ` – Rang ${r.rank}`;
    if (r.totalScore != null) text += `, ${r.totalScore.toLocaleString("de-AT")} Punkte`;
    text += " 🚒🔥 (CTIF 2026 Šumperk)";
    if (navigator.share) {
      try { await navigator.share({ title: "CTIF 2026", text }); } catch { /* abgebrochen */ }
    } else {
      try { await navigator.clipboard.writeText(text); alert("In Zwischenablage kopiert:\n\n" + text); }
      catch { alert(text); }
    }
  };

  return (
    <div className="p-4 space-y-5">
      <Link to="/results" className="text-sm text-ctif-orange">‹ Zurück</Link>

      <div>
        <h1 className="text-xl font-bold">{decoded}</h1>
        {(found || teamNr != null) && (
          <p className="text-sm text-slate-400">
            {found ? flagLabel(found.row.country) : ""}
            {found ? " · " + CATEGORY_SHORT[found.category] : ""}
            {found?.phase ? " · " + (found.phase === "wettkampf" ? "Wettkampf" : "Training") : ""}
            {teamNr != null ? " · #" + teamNr : ""}
          </p>
        )}
      </div>

      {/* Ergebnis-Details NUR wenn echtes Ergebnis vorhanden */}
      {hasRealResult ? (
        <>
          <button onClick={share}
            className="w-full rounded-lg bg-ctif-navy py-3 text-sm font-medium text-white active:scale-[0.99]">
            📤 Ergebnis teilen
          </button>

          <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-semibold text-ctif-orange">Ergebnis</span>
              {found!.row.rank != null && (
                <span className="rounded-full bg-ctif-orange px-3 py-1 text-sm font-bold text-white">
                  Rang {found!.row.rank}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Stat label="Hindernisbahn Zeit" value={fmt(found!.row.obstacleTime)} />
              <Stat label="Hindernisbahn Fehler" value={fmtInt(found!.row.obstacleErrors)} />
              <Stat label="Staffellauf Zeit" value={fmt(found!.row.relayTime)} />
              <Stat label="Staffellauf Fehler" value={fmtInt(found!.row.relayErrors)} />
              <Stat label="Vorgabe" value={fmt(found!.row.targetTime)} />
              <Stat label="Gesamt" value={fmt(found!.row.totalScore)} highlight />
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-slate-400">
          Noch kein Ergebnis für diese Gruppe. Sobald der Wettkampf gewertet ist, erscheint es hier.
        </p>
      )}

      {/* Startzeiten */}
      {slots.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold text-ctif-orange">Startzeiten</h2>
          <div className="overflow-hidden rounded-xl border border-slate-700">
            <table className="min-w-full text-sm">
              <thead className="bg-ctif-navy text-white">
                <tr>
                  <th className="px-3 py-2 text-left">Tag</th>
                  <th className="px-3 py-2 text-left">Disziplin</th>
                  <th className="px-2 py-2 text-left">Zeit</th>
                  <th className="px-2 py-2 text-left">Bahn</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((s, i) => (
                  <tr key={i} className="border-t border-slate-700">
                    <td className="px-3 py-2">
                      {new Date(s.date).toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit" })}
                      <span className="ml-1 text-xs text-slate-400">{s.label}</span>
                    </td>
                    <td className="px-3 py-2">{s.discipline}</td>
                    <td className="whitespace-nowrap px-2 py-2 font-mono">{s.time}{s.to ? "–" + s.to : ""}</td>
                    <td className="px-2 py-2">{s.lane}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
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