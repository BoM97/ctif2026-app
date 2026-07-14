import { EXHIBITION, PRESENTATION } from "../data/exhibition";
function Card({ data }: { data: typeof EXHIBITION }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
      <h2 className="font-bold">{data.title}</h2>
      <p className="text-sm text-ctif-orange">{data.date}</p>
      <p className="text-sm text-slate-400">{data.location}</p>
      <ul className="mt-3 list-disc pl-5 text-sm space-y-1">{data.rules.map((r) => <li key={r}>{r}</li>)}</ul>
    </div>
  );
}
export default function Exhibition() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Exhibition & Presentation</h1>
      <Card data={EXHIBITION} /><Card data={PRESENTATION} />
    </div>
  );
}
