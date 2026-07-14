import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { Category, ResultsPayload } from "../types";
import { csvUrl, csvUrlFallback, SHEET_IDS,
  POLL_INTERVAL_NORMAL, POLL_INTERVAL_LIVE, COMPETITION_DAYS } from "../config/sources";
import { parseResultsCsv } from "../lib/parser";
import { detectChanges } from "../lib/changeDetection";
import { fireNotifications } from "../lib/notify";
import { useFavorites } from "../store/favorites";
import { useSettings } from "../store/settings";

const USE_PROXY = import.meta.env.VITE_USE_PROXY === "true";

async function fetchCategory(cat: Category): Promise<ResultsPayload> {
  if (USE_PROXY) {
    const map: Record<Category, string> = { girls: "girls", boys_mixed: "boys-mixed", vetter: "vetter" };
    const res = await fetch("/api/results/" + map[cat]);
    if (!res.ok) throw new Error("proxy " + res.status);
    return res.json();
  }
  const id = SHEET_IDS[cat];
  try {
    const r = await fetch(csvUrl(id));
    if (!r.ok) throw new Error(String(r.status));
    return parseResultsCsv(await r.text(), cat);
  } catch {
    const r2 = await fetch(csvUrlFallback(id));
    if (!r2.ok) throw new Error("fallback " + r2.status);
    return parseResultsCsv(await r2.text(), cat);
  }
}

function pollInterval(): number {
  const today = new Date().toISOString().slice(0, 10);
  return COMPETITION_DAYS.includes(today) ? POLL_INTERVAL_LIVE : POLL_INTERVAL_NORMAL;
}

export function useResults(cat: Category) {
  const favorites = useFavorites((s) => s.favorites);
  const notifEnabled = useSettings((s) => s.notificationsEnabled);
  const prevRef = useRef<ResultsPayload | null>(null);

  const q = useQuery({
    queryKey: ["results", cat],
    queryFn: () => fetchCategory(cat),
    refetchInterval: pollInterval(),
    refetchOnWindowFocus: true,
    staleTime: 3000,
    retry: 2
  });

  useEffect(() => {
    if (!q.data?.ok) return;
    const prev = prevRef.current;
    if (prev && prev.ok) {
      const catFavs = favorites.filter((f) => f.category === cat || f.category === "unknown");
      const changes = detectChanges(prev.rows, q.data.rows, catFavs);
      if (changes.length) fireNotifications(changes, notifEnabled);
    }
    prevRef.current = q.data;
  }, [q.data, cat, favorites, notifEnabled]);

  return q;
}
