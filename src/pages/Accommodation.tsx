import { ACCOMMODATIONS, REQUIRED_EQUIPMENT } from "../data/accommodation";
export default function Accommodation() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Unterkunft</h1>
      <div className="rounded-xl border border-ctif-orange/40 bg-ctif-orange/10 p-4">
        <h2 className="font-semibold">Pflichtausrüstung</h2>
        <ul className="mt-2 list-disc pl-5 text-sm">{REQUIRED_EQUIPMENT.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
      {ACCOMMODATIONS.map((a) => (
        <div key={a.school} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
          <h3 className="font-semibold">{a.school}</h3>
          <p className="text-sm text-slate-400">{a.address}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {a.countries.map((c) => <span key={c} className="rounded bg-slate-700 px-2 py-0.5 text-xs">{c}</span>)}</div>
          {a.mapUrl && <a href={a.mapUrl} target="_blank" className="mt-3 inline-block text-sm text-ctif-orange">📍 In Google Maps</a>}
        </div>
      ))}
    </div>
  );
}
