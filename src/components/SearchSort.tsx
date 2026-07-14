export function SearchSort({ query, setQuery, sortKey, setSortKey }:
  { query: string; setQuery: (s: string) => void; sortKey: string; setSortKey: (s: any) => void }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input value={query} onChange={(e) => setQuery(e.target.value)}
        placeholder="Suche Gruppe oder Land…"
        className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-base placeholder-slate-400 focus:border-ctif-orange focus:outline-none" />
      <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}
        className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-base">
        <option value="rank">Sortieren: Rang</option>
        <option value="teamName">Sortieren: Gruppe</option>
        <option value="country">Sortieren: Land</option>
        <option value="startNumber">Sortieren: Bewerbsnummer</option>
      </select>
    </div>
  );
}
