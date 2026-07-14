import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Settings {
  theme: "light" | "dark";
  notificationsEnabled: boolean;
  setTheme: (t: "light" | "dark") => void;
  setNotifications: (v: boolean) => void;
}

export const useSettings = create<Settings>()(
  persist(
    (set) => ({
      theme: "dark",
      notificationsEnabled: false,
      setTheme: (theme) => set({ theme }),
      setNotifications: (notificationsEnabled) => set({ notificationsEnabled })
    }),
    { name: "ctif2026-settings" }
  )
);
