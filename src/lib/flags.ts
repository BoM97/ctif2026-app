// Wandelt Ländernamen ODER -kürzel (aus Sheets & PDF) in Flaggen-Emoji + Klartext um.

// ISO-2-Codes → für Flaggen-Emoji
const ISO2: Record<string, string> = {
  austria: "AT", aut: "AT", österreich: "AT", osterreich: "AT",
  germany: "DE", ger: "DE", deutschland: "DE", de: "DE",
  czechia: "CZ", cz: "CZ", "czech republic": "CZ", tschechien: "CZ",
  slovakia: "SK", sk: "SK", slowakei: "SK",
  slovenia: "SI", slo: "SI", si: "SI", slowenien: "SI",
  poland: "PL", pol: "PL", pl: "PL", polen: "PL",
  croatia: "HR", hr: "HR", kroatien: "HR",
  italia: "IT", italy: "IT", ita: "IT", it: "IT", italien: "IT",
  france: "FR", fr: "FR", frankreich: "FR",
  finland: "FI", fin: "FI", fi: "FI", finnland: "FI",
  portugal: "PT", pt: "PT",
  hungary: "HU", hu: "HU", ungarn: "HU",
  ukraine: "UA", ukr: "UA", ua: "UA",
  serbia: "RS", srb: "RS", rs: "RS", serbien: "RS",
  liechtenstein: "LI", lie: "LI", li: "LI",
  japan: "JP", jpn: "JP", jp: "JP",
  luxembourg: "LU", lux: "LU", lu: "LU", luxemburg: "LU",
  bulgaria: "BG", bgr: "BG", bg: "BG", bulgarien: "BG",
  romania: "RO", rou: "RO", ro: "RO", ru: "RO", rumänien: "RO", rumanien: "RO",
  sweden: "SE", swe: "SE", se: "SE", schweden: "SE",
  switzerland: "CH", che: "CH", ch: "CH", schweiz: "CH",
  "united kingdom": "GB", uk: "GB", gb: "GB", england: "GB", "great britain": "GB",
};

/** ISO-2-Code → Flaggen-Emoji (Regional Indicator Symbols) */
function iso2ToFlag(iso2: string): string {
  if (!iso2 || iso2.length !== 2) return "";
  const base = 0x1f1e6;
  const chars = iso2.toUpperCase().split("").map((c) => base + (c.charCodeAt(0) - 65));
  return String.fromCodePoint(...chars);
}

/** Gibt das Flaggen-Emoji für ein Land (Name oder Kürzel) zurück, oder "" wenn unbekannt. */
export function countryFlag(country: string | null | undefined): string {
  if (!country) return "";
  const key = country.trim().toLowerCase();
  const iso2 = ISO2[key];
  return iso2 ? iso2ToFlag(iso2) : "";
}

/** Flagge + Name als String, z.B. "🇦🇹 Austria". Fällt auf reinen Namen zurück. */
export function flagLabel(country: string | null | undefined): string {
  if (!country) return "";
  const flag = countryFlag(country);
  return flag ? flag + " " + country : country;
}