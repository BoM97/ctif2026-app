export function normalizeName(input: string): string {
  if (!input) return "";
  let s = input.toLowerCase().trim();
  s = s.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
  s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  s = s.replace(/ł/g, "l").replace(/đ/g, "d");
  s = s.replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
  return s;
}

export function parseNum(raw: string | undefined | null): number | null {
  if (raw == null) return null;
  let s = String(raw).trim();
  if (s === "" || s === "-" || s === "—" || s.toLowerCase() === "n/a") return null;
  s = s.replace(/[\s\u00a0\u202f]/g, "");
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function matchesFavorite(
  teamName: string,
  fav: { teamName: string; aliases: string[] }
): boolean {
  const norm = normalizeName(teamName);
  if (!norm) return false;

  // Reine Zahlen-Aliases (= Teamnummern) NICHT für Namensabgleich verwenden
  const nameAliases = fav.aliases.filter((a) => !/^\d+$/.test(a.trim()));

  const candidates = [fav.teamName, ...nameAliases]
    .map(normalizeName)
    .filter((c) => c && c.length >= 3); // zu kurze Fragmente ignorieren

  return candidates.some((c) => norm === c || norm.includes(c) || c.includes(norm));
}