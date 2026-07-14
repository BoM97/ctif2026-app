import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FavoriteTeam } from "../types";

interface FavState {
  favorites: FavoriteTeam[];
  add: (t: FavoriteTeam) => void;
  remove: (id: string) => void;
  toggle: (t: FavoriteTeam) => void;
  has: (id: string) => boolean;
}

export const useFavorites = create<FavState>()(
  persist(
    (set, get) => ({
      favorites: [],
      add: (t) => set((s) => (s.favorites.some((f) => f.id === t.id) ? s : { favorites: [...s.favorites, t] })),
      remove: (id) => set((s) => ({ favorites: s.favorites.filter((f) => f.id !== id) })),
      toggle: (t) => set((s) =>
        s.favorites.some((f) => f.id === t.id)
          ? { favorites: s.favorites.filter((f) => f.id !== t.id) }
          : { favorites: [...s.favorites, t] }),
      has: (id) => get().favorites.some((f) => f.id === id)
    }),
    { name: "ctif2026-favorites" }
  )
);

export function makeFavoriteId(country: string, name: string): string {
  const slug = (s: string) =>
    s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${slug(country)}-${slug(name)}`;
}
