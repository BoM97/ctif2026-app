import type { CategoryOrUnknown } from "../types";
import { useFavorites, makeFavoriteId } from "../store/favorites";

export function FavoriteStar({
  teamName, country, category,
}: { teamName: string; country: string; category: CategoryOrUnknown }) {
  const { has, toggle } = useFavorites();
  const id = makeFavoriteId(country, teamName);
  const active = has(id);

  return (
    <button
      aria-label={active ? "Favorit entfernen" : "Als Favorit markieren"}
      onClick={(e) => {
        e.stopPropagation();
        toggle({
          id,
          teamName,
          country,
          category,
          aliases: [teamName], // Ergebnis-/Anzeige-Name als Alias mitspeichern
        });
      }}
      className={"text-xl leading-none transition-transform active:scale-90 " +
        (active ? "text-ctif-orange" : "text-slate-500 hover:text-slate-300")}
    >
      {active ? "★" : "☆"}
    </button>
  );
}