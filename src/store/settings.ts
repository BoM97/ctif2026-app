import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Settings {
  theme: "light" | "dark";
  notificationsEnabled: boolean;       // Ergebnis-Benachrichtigungen
  startReminderEnabled: boolean;       // Erinnerung vor dem Start
  startReminderMinutes: number;        // Vorlaufzeit in Minuten
  setTheme: (t: "light" | "dark") => void;
  setNotifications: (v: boolean) => void;
  setStartReminder: (v: boolean) => void;
  setStartReminderMinutes: (m: number) => void;
}

export const useSettings = create<Settings>()(
  persist(
    (set) => ({
      theme: "dark",
      notificationsEnabled: false,
      startReminderEnabled: false,
      startReminderMinutes: 15,
      setTheme: (theme) => set({ theme }),
      setNotifications: (notificationsEnabled) => set({ notificationsEnabled }),
      setStartReminder: (startReminderEnabled) => set({ startReminderEnabled }),
      setStartReminderMinutes: (startReminderMinutes) => set({ startReminderMinutes }),
    }),
    { name: "ctif2026-settings" }
  )
);