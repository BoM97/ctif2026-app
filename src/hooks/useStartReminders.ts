import { useEffect, useRef } from "react";
import { useFavorites } from "../store/favorites";
import { useSettings } from "../store/settings";
import { getTeamSlots } from "./useTeamSchedule";
import { notificationSupport } from "../lib/notify";

/**
 * Prüft im Minutentakt, ob ein Favoriten-Start innerhalb der eingestellten
 * Vorlaufzeit liegt, und feuert dann eine lokale Benachrichtigung.
 * Jede Erinnerung wird nur einmal ausgelöst (gemerkt via localStorage).
 */
export function useStartReminders() {
  const favorites = useFavorites((s) => s.favorites);
  const { startReminderEnabled, startReminderMinutes, notificationsEnabled } = useSettings();
  const firedRef = useRef<Set<string>>(new Set());

  // bereits ausgelöste Erinnerungen aus localStorage laden
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ctif2026-fired-reminders") || "[]");
      firedRef.current = new Set(saved);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!startReminderEnabled || !notificationsEnabled) return;
    if (notificationSupport() !== "granted") return;

    const check = () => {
      const now = new Date();
      const teamNrOf = (aliases: string[]) => {
        const n = aliases.find((a) => /^\d+$/.test(a));
        return n ? Number(n) : null;
      };

      for (const fav of favorites) {
        const nr = teamNrOf(fav.aliases);
        if (nr == null) continue;
        for (const slot of getTeamSlots(nr)) {
          const start = new Date(slot.date + "T" + slot.time + ":00");
          const diffMin = (start.getTime() - now.getTime()) / 60000;

          // im Fenster [0 ... Vorlaufzeit] und noch nicht ausgelöst?
          if (diffMin > 0 && diffMin <= startReminderMinutes) {
            const key = fav.id + "-" + slot.date + "-" + slot.discipline + "-" + slot.time;
            if (firedRef.current.has(key)) continue;
            firedRef.current.add(key);
            try {
              localStorage.setItem("ctif2026-fired-reminders", JSON.stringify([...firedRef.current]));
            } catch { /* ignore */ }

            const mins = Math.round(diffMin);
            try {
              new Notification("CTIF 2026 – Start bald!", {
                body: `${fav.teamName}: ${slot.discipline} in ${mins} Min (${slot.time}, ${slot.lane})`,
                icon: "/icons/icon-192.png",
                tag: key,
              });
            } catch { /* ignore */ }
          }
        }
      }
    };

    check();
    const id = setInterval(check, 60_000); // jede Minute prüfen
    return () => clearInterval(id);
  }, [favorites, startReminderEnabled, startReminderMinutes, notificationsEnabled]);
}