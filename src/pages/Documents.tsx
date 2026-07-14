import { DOCUMENTS } from "../data/documents";
const icon: Record<string, string> = { pdf: "📄", audio: "🎧", image: "🖼️", link: "🔗" };
export default function Documents() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Dokumente & Downloads</h1>
      <div className="grid gap-2">
        {DOCUMENTS.map((d) => (
          <a key={d.title} href={d.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-4 hover:border-ctif-orange active:scale-[0.99]">
            <span className="text-2xl">{icon[d.kind] ?? "🔗"}</span>
            <span className="flex-1 font-medium">{d.title}</span><span className="text-slate-400">›</span>
          </a>
        ))}
      </div>
    </div>
  );
}
