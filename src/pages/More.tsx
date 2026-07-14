import { Link } from "react-router-dom";
const links = [
  { to: "/bus", label: "🚌 Shuttle-Bus", desc: "Fahrpläne der Buslinien" },
  { to: "/accommodation", label: "🏠 Unterkunft", desc: "Schulen & Pflichtausrüstung" },
  { to: "/exhibition", label: "🎪 Exhibition & Presentation", desc: "Nations-Programm Freitag" },
  { to: "/documents", label: "📄 Dokumente", desc: "PDFs, Regeln, Pläne" }
];
export default function More() {
  return (
    <div className="p-4 space-y-3">
      <h1 className="text-xl font-bold">Mehr</h1>
      {links.map((l) => (
        <Link key={l.to} to={l.to} className="block rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-4 hover:border-ctif-orange">
          <div className="font-medium">{l.label}</div>
          <div className="text-sm text-slate-400">{l.desc}</div>
        </Link>
      ))}
    </div>
  );
}
