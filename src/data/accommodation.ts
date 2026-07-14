import type { Accommodation } from "../types";
export const REQUIRED_EQUIPMENT = ["Bed Sheet", "Small Pillow", "Sleeping Bag or Blanket"];
export const ACCOMMODATIONS: Accommodation[] = [
  { school: "School 1 – Základní škola Šumperk, Dr. E. Beneše 1", address: "Dr. E. Beneše 1, Šumperk",
    countries: ["Luxembourg","Italy – Trentino","Ukraine","Slovakia","United Kingdom","Serbia","Liechtenstein","Japan","Slovenia","Czechia"],
    mapUrl: "https://maps.google.com/?q=Základní+škola+Dr.+E.+Beneše+Šumperk" },
  { school: "School 2 – Gymnázium, Šumperk, Masarykovo náměstí 8", address: "Masarykovo náměstí 8, Šumperk",
    countries: ["Hungary","Poland","Austria","Switzerland","Portugal"],
    mapUrl: "https://maps.google.com/?q=Gymnázium+Šumperk+Masarykovo+náměstí" },
  { school: "School 3 – Střední odborná škola, Šumperk, Zemědělská 3", address: "Zemědělská 3, Šumperk",
    countries: ["France","Italy – South Tyrol","Sweden"],
    mapUrl: "https://maps.google.com/?q=Střední+odborná+škola+Zemědělská+Šumperk" },
  { school: "School 4 – Základní škola Šumperk, Sluneční 38", address: "Sluneční 38, Šumperk",
    countries: ["Bulgaria","Croatia","Romania","Finland","Germany"],
    mapUrl: "https://maps.google.com/?q=Základní+škola+Sluneční+Šumperk" }
];
