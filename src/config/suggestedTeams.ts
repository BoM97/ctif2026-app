import type { FavoriteTeam } from "../types";

// AT-Schnellvorschläge mit echter Teamnummer (im aliases-Feld als Zahl)
export const SUGGESTED_AT_TEAMS: FavoriteTeam[] = [
  { id: "aut-guggenberg-7", teamName: "Guggenberg AUT", country: "AUT",
    category: "boys_mixed", aliases: ["7", "Guggenberg", "FF Guggenberg"] },
  { id: "aut-winden-windegg-19", teamName: "Winden Windegg AUT", country: "AUT",
    category: "boys_mixed", aliases: ["19", "Winden", "Windegg", "Winden Windegg", "FF Winden-Windegg"] },
  { id: "aut-st-martin-31", teamName: "St. Martin i. M. AUT", country: "AUT",
    category: "boys_mixed", aliases: ["31", "St. Martin", "St. Martin im Mühlkreis", "FF St. Martin im Mühlkreis"] },
  { id: "aut-mitteregg-41", teamName: "Mitteregg-Haagen-Sand AUT", country: "AUT",
    category: "boys_mixed", aliases: ["41", "Mitteregg", "Haagen", "Sand", "FF Mitteregg-Haagen-Sand"] },
];