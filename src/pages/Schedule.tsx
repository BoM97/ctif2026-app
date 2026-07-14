import { Link } from "react-router-dom";
import { SCHEDULE } from "../data/schedule";
import { COMP_DAYS } from "../data/competition";

const typeColor: Record<string, string> = {
  competition: "bg-ctif-red", training: "bg-blue-600", ceremony: "bg-ctif-orange",
  food: "bg-emerald-600", meeting: "bg-purple-600", transport: "bg-slate-500", other: "bg-slate-600",
};

function detailDateFor(date: string, type: string): string | null {
  const d = COMP_DAYS.find((c) => c.date === date &&
    ((type === "training" && c.type === "Training") ||
     (type === "competition" && c.type === "Wettkampf")));
  return d ? d.date : null;
}

export default function Schedule() {
  const days = [...new Set(SCHEDULE.map((e) => e.date))].sort();
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Zeitplan</h1>
      {days.map((d) => (
        <div key={d}>
          <h2 className="py-2 font-semibold text-ctif-orange">
            {new Date(d).toLocaleDateString("de-AT", { weekday: "long", day: "2-digit", month: "long" })}
          </h2>
          <div className="space-y-2">
            {SCHEDULE.filter((e) => e.date === d)
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((e) => {
                const detail = detailDateFor(e.date, e.type);
                const inner = (
                  <>
                    <div className="w-14 shrink-0 font-mono text-sm">{e.startTime}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{e.title}</span>
                        {detail && (
                          <span className="rounded-full bg-ctif-orange px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                            Startzeiten ›
                          </span>
                        )}
                      </div>
                      {e.location && <div className="text-xs text-slate-400">{e.location}</div>}
                    </div>
                    <span className={"h-fit rounded px-2 py-0.5 text-xs text-white " + typeColor[e.type]}>{e.type}</span>
                  </>
                );
                return detail ? (
                  <Link key={e.id} to={"/plan/" + detail}
                    className="flex gap-3 rounded-lg bg-slate-800/60 p-3 hover:bg-slate-800 active:scale-[0.99]">
                    {inner}
                  </Link>
                ) : (
                  <div key={e.id} className="flex gap-3 rounded-lg bg-slate-800/60 p-3">{inner}</div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}