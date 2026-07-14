import type { ResultChange } from "../types";

export type PermState = NotificationPermission | "unsupported";

export function notificationSupport(): PermState {
  if (typeof Notification === "undefined") return "unsupported";
  return Notification.permission;
}

export async function requestPermission(): Promise<PermState> {
  if (typeof Notification === "undefined") return "unsupported";
  return await Notification.requestPermission();
}

function messageFor(c: ResultChange): string | null {
  const score = c.newTotalScore != null ? "Gesamt " + c.newTotalScore.toLocaleString("de-AT") : "";
  switch (c.type) {
    case "new_result": return c.teamName + " hat jetzt ein Ergebnis: Rang " + (c.newRank ?? "?") + (score ? ", " + score : "");
    case "entered_top_3": return c.teamName + " ist neu in den Top 3!";
    case "left_top_3": return c.teamName + " ist nicht mehr in den Top 3 (Rang " + (c.newRank ?? "?") + ")";
    case "rank_changed": return c.teamName + ": Rang geändert von " + (c.oldRank ?? "?") + " auf " + (c.newRank ?? "?");
    case "score_changed": return c.teamName + ": Gesamtpunkte aktualisiert (" + score + ")";
    default: return null;
  }
}

export function fireNotifications(changes: ResultChange[], enabled: boolean) {
  if (!enabled || notificationSupport() !== "granted") return;
  const notifyable = ["new_result", "rank_changed", "entered_top_3", "left_top_3", "score_changed"];
  for (const c of changes) {
    if (!notifyable.includes(c.type)) continue;
    const body = messageFor(c);
    if (!body) continue;
    try {
      new Notification("CTIF 2026 Šumperk", { body, icon: "/icons/icon-192.png", tag: c.teamName + "-" + c.type });
    } catch { /* ignore */ }
  }
}
