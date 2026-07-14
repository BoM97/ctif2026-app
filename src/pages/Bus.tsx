import { BUS_CONNECTIONS } from "../data/bus";
export default function Bus() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Shuttle-Bus</h1>
      {BUS_CONNECTIONS.map((c) => (
        <div key={c.id} className="space-y-2">
          <div><div className="font-semibold">{c.direction}</div><div className="text-sm text-slate-400">{c.dateRange}</div></div>
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="min-w-full text-sm">
              <thead className="bg-ctif-navy text-white"><tr>
                {c.stops.map((s) => <th key={s.name} className="whitespace-nowrap px-3 py-2 text-left">{s.name}</th>)}</tr></thead>
              <tbody><tr>{c.stops.map((s) => <td key={s.name} className="whitespace-nowrap px-3 py-2 font-mono">{s.time ?? "–"}</td>)}</tr></tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
