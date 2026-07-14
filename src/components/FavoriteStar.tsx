import type { CategoryOrUnknown } from "../types";
import { useFavorites, makeFavoriteId } from "../store/favorites";
export function FavoriteStar({ teamName, country, category }:
  { teamName: string; country: string; category: CategoryOrUnknown }) {
  const { has, toggle } = useFavorites();
  const id = makeFavoriteId(country, teamName);
  const active = has(id);
  return (
    <button aria-label={active ? "Favorit entfernen" : "Favorit"}
      onClick={(e) => { e.stopPropagation(); toggle({ id, teamName, country, category, aliases: [] }); }}
      className={"text-xl leading-none transition-transform active:scale-90 " +
        (active ? "text-ctif-orange" : "text-slate-500 hover:text-slate-300")}>
      {active ? "★" : "☆"}
    </button>
  );
}
