import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../store/favorites";
import { useSettings } from "../store/settings";
import { SUGGESTED_AT_TEAMS } from "../config/suggestedTeams";
import { requestPermission, notificationSupport } from "../lib/notify";
import { getTeamSlots, liveSlotStatus } from "../hooks/useTeamSchedule";
import { useStartReminders } from "../hooks/useStartReminders";
import { flagLabel } from "../lib/flags";

const REMINDER_OPTIONS = [5, 10, 15, 30, 60];

export default function MyTeams() {
  const { favorites, add, remove, has } = useFavorites();
  const {
    notificationsEnabled, setNotifications,
    startReminderEnabled, setStartReminder,
    startReminderMinutes, setStartReminderMinutes,
  } = useSettings();
  const [now, setNow] = useState(() => new Date());
  const [selected, setSelected] = useState<string[]>([]);

  useStartReminders(); // Start-Erinnerungen aktiv halten

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  // Ergebnis-Benachrichtigungen umschalten (fragt bei Bedarf um Erlaubnis)
  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const p = await requestPermission();
      setNotifications(p === "granted");
    } else {
      setNotifications(false);
    }
  };

  // Start-Erinnerung umschalten (braucht ebenfalls Erlaubnis)
  const toggleReminder = async () => {
    if (!startReminderEnabled) {
      const p = await requestPermission();
      if (p === "granted") {
        setStartReminder(true);
        if (!notificationsEnabled) setNotifications(true);
      }
    } else {
      setStartReminder(false);
    }
  };

  const toggleSelect = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const addSelected = () => {
    SUGGESTED_AT_TEAMS.filter((t) => selected.includes(t.id)).forEach((t) => add(t));
    setSelected([]);
  };

  const teamNrOf = (aliases: string[]) => {
    const n = aliases.find((a) => /^\d+$/.test(a));
    return n ? Number(n) : null;
  };

  const notifUnsupported = notificationSupport() === "unsupported";

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Meine Gruppen</h1>

      {/* Benachrichtigungs-Einstellungen */}
      <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800/40 p-4">
        <p className="text-sm font-semibold text-slate-300">Benachrichtigungen</p>

        {notifUnsupported && (
          <p className="text-sm text-amber-300">
            Dieser Browser unterstützt keine Benachrichtigungen.
          </p>
        )}

        {/* Ergebnis-Benachrichtigungen */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Ergebnis-Updates</div>
            <div className="text-xs text-slate-400">Bei neuem Ergebnis / Rangänderung deiner Gruppen</div>
          </div>
          <button onClick={toggleNotifications} disabled={notifUnsupported}
            className={"relative h-7 w-12 rounded-full transition-colors " +
              (notificationsEnabled ? "bg-emerald-600" : "bg-slate-600")}>
            <span className={"absolute top-1 h-5 w-5 rounded-full bg-white transition-all " +
              (notificationsEnabled ? "left-6" : "left-1")} />
          </button>
        </div>

        {/* Start-Erinnerung */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Start-Erinnerung</div>
            <div className="text-xs text-slate-400">Bevor eine deiner Gruppen startet</div>
          </div>
          <button onClick={toggleReminder} disabled={notifUnsupported}
            className={"relative h-7 w-12 rounded-full transition-colors " +
              (startReminderEnabled ? "bg-emerald-600" : "bg-slate-600")}>
            <span className={"absolute top-1 h-5 w-5 rounded-full bg-white transition-all " +
              (startReminderEnabled ? "left-6" : "left-1")} />
          </button>
        </div>

        {/* Vorlaufzeit */}
        {startReminderEnabled && (
          <div>
            <div className="mb-2 text-xs text-slate-400">Erinnerung wie lange vorher?</div>
            <div className="flex flex-wrap gap-2">
              {REMINDER_OPTIONS.map((m) => (
                <button key={m} onClick={() => setStartReminderMinutes(m)}
                  className={"rounded-lg px-3 py-2 text-sm font-medium " +
                    (startReminderMinutes === m ? "bg-ctif-orange text-white" : "bg-slate-800 text-slate-300")}>
                  {m} Min
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Schnellvorschläge mit Mehrfachauswahl */}
      <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800/40 p-4">
        <p className="text-sm font-semibold text-slate-300">Schnellvorschläge (Österreich)</p>
        <div className="grid gap-2">
          {SUGGESTED_AT_TEAMS.map((t) => {
            const already = has(t.id);
            const checked = selected.includes(t.id);
            return (
              <label key={t.id}
                className={"flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 " +
                  (already ? "border-emerald-600/50 bg-emerald-900/20 opacity-70" :
                   checked ? "border-ctif-orange bg-ctif-orange/10" : "border-slate-600 bg-slate-800")}>
                <input type="checkbox" disabled={already} checked={already || checked}
                  onChange={() => toggleSelect(t.id)} className="h-5 w-5 accent-ctif-orange" />
                <span className="flex-1">{t.teamName}
                  <span className="ml-1 text-xs text-slate-400">#{teamNrOf(t.aliases)}</span>
                </span>
                {already && <span className="text-xs text-emerald-400">✓ Favorit</span>}
              </label>
            );
          })}
        </div>
        <button onClick={addSelected} disabled={selected.length === 0}
          className={"w-full rounded-lg py-3 text-sm font-medium " +
            (selected.length ? "bg-ctif-orange text-white" : "bg-slate-700 text-slate-500")}>
          {selected.length ? `${selected.length} Gruppe(n) hinzufügen` : "Gruppen auswählen"}
        </button>
      </div>

      {/* Favoriten-Liste */}
      {favorites.length === 0 ? (
        <p className="text-slate-400">Noch keine Favoriten ausgewählt.</p>
      ) : (
        <div className="space-y-3">
          {favorites.map((f) => {
            const nr = teamNrOf(f.aliases);
            const slots = nr != null ? getTeamSlots(nr) : [];
            const nextSlot = slots.find((s) => liveSlotStatus(s, now) !== "past");
            const liveSlot = slots.find((s) => liveSlotStatus(s, now) === "now");
            return (
              <div key={f.id} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{f.teamName}</div>
                    <div className="text-sm text-slate-400">
                      {flagLabel(f.country)}{nr != null ? " · #" + nr : ""}
                    </div>
                  </div>
                  <button onClick={() => remove(f.id)} className="text-sm text-red-400">Entfernen</button>
                </div>

                {liveSlot && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-ctif-red/20 px-3 py-2 text-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-ctif-red" />
                    <span className="font-semibold">Jetzt: {liveSlot.discipline}</span>
                    <span className="text-slate-300">{liveSlot.time} · {liveSlot.lane}</span>
                  </div>
                )}

                {!liveSlot && nextSlot && (
                  <div className="mt-3 rounded-lg bg-slate-900/60 px-3 py-2 text-sm">
                    <span className="text-slate-400">Nächster Start: </span>
                    <span className="font-semibold">{nextSlot.discipline}</span>{" "}
                    {new Date(nextSlot.date).toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit" })}{" "}
                    {nextSlot.time} · {nextSlot.lane}
                  </div>
                )}

                <Link to={"/team/" + encodeURIComponent(f.teamName)}
                  className="mt-3 inline-block text-sm text-ctif-orange">
                  Alle Startzeiten ansehen ›
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}