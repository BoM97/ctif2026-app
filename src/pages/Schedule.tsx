import { SCHEDULE } from "../data/schedule";
const typeColor: Record<string, string> = {
  competition: "bg-ctif-red", training: "bg-blue-600", ceremony: "bg-ctif-orange",
  food: "bg-emerald-600", meeting: "bg-purple-600", transport: "bg-slate-500", other: "bg-slate-600"
};
export default function Schedule() {
  const days = [...new Set(SCHEDULE.map((e) => e.date))].sort();
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Zeitplan</h1>
      {days.map((d) => (
        <div key={d}>
          <h2 className="py-2 font-semibold text-ctif-orange">
            {new Date(d).toLocaleDateString("de-AT", { weekday: "long", day: "2-digit", month: "long" })}</h2>
          <div className="space-y-2">
            {SCHEDULE.filter((e) => e.date === d).sort((a,b)=>a.startTime.localeCompare(b.startTime)).map((e) => (
              <div key={e.id} className="flex gap-3 rounded-lg bg-slate-800/60 p-3">
                <div className="w-14 shrink-0 font-mono text-sm">{e.startTime}</div>
                <div className="flex-1"><div className="font-medium">{e.title}</div>
                  {e.location && <div className="text-xs text-slate-400">{e.location}</div>}</div>
                <span className={"h-fit rounded px-2 py-0.5 text-xs text-white " + typeColor[e.type]}>{e.type}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
