import { useOnline } from "../hooks/useOnline";
export function StatusBar({ lastUpdated, sourceOk }: { lastUpdated: string | null; sourceOk: boolean }) {
  const online = useOnline();
  const dot = !online ? "bg-slate-400" : sourceOk ? "bg-emerald-400" : "bg-red-400";
  const label = !online ? "Offline – gecachte Daten" : sourceOk ? "Live" : "Live-Daten aktuell nicht erreichbar";
  const time = lastUpdated ? new Date(lastUpdated).toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "—";
  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-700 bg-slate-900/80 px-4 py-2 text-xs backdrop-blur sticky top-0 z-10">
      <span className="flex items-center gap-2">
        <span className={"inline-block h-2.5 w-2.5 rounded-full " + dot + (online && sourceOk ? " animate-pulse" : "")} />
        {label}
      </span>
      <span className="text-slate-400">Update: {time}</span>
    </div>
  );
}
