// Web-Push Anmeldung (Frontend)
import { useFavorites } from "../store/favorites";
import { useSettings } from "../store/settings";

// >>> HIER deinen VAPID PUBLIC KEY einsetzen <<<
const VAPID_PUBLIC_KEY = "BP4-i6RHy70cHjf9xxxrls2XDGWyBzZeqQ3QPyUSoWMD-azFsyW52MNH1foEZjHPTr7FQj2O0mC2VvOXNzqm9DA";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

export function pushSupported(): boolean {
  return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
}

function teamNumbersFromFavorites(): number[] {
  const favs = useFavorites.getState().favorites;
  const nums: number[] = [];
  for (const f of favs) {
    const n = f.aliases.find((a) => /^\d+$/.test(a));
    if (n) nums.push(Number(n));
  }
  return nums;
}

/** Service Worker registrieren (einmalig). */
export async function ensureServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!pushSupported()) return null;
  try {
    return await navigator.serviceWorker.register("/sw.js");
  } catch {
    return null;
  }
}

/** Push abonnieren + Anmeldung ans Backend schicken. */
export async function subscribePush(): Promise<boolean> {
  if (!pushSupported()) return false;
  if (VAPID_PUBLIC_KEY.startsWith("HIER_")) {
    alert("VAPID Public Key fehlt in src/lib/push.ts");
    return false;
  }

  const perm = await Notification.requestPermission();
  if (perm !== "granted") return false;

  const reg = await ensureServiceWorker();
  if (!reg) return false;
  await navigator.serviceWorker.ready;

  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });
  }

  const reminderMinutes = useSettings.getState().startReminderMinutes;
  const resp = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subscription: sub,
      teamNumbers: teamNumbersFromFavorites(),
      reminderMinutes,
    }),
  });
  return resp.ok;
}

/** Aktualisiert Favoriten/Vorlaufzeit beim Backend (wenn schon angemeldet). */
export async function syncPush(): Promise<void> {
  if (!pushSupported()) return;
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return;

  await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subscription: sub,
      teamNumbers: teamNumbersFromFavorites(),
      reminderMinutes: useSettings.getState().startReminderMinutes,
    }),
  });
}

/** Abmelden. */
export async function unsubscribePush(): Promise<void> {
  if (!pushSupported()) return;
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return;

  await fetch("/api/unsubscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint: sub.endpoint }),
  });
  await sub.unsubscribe();
}