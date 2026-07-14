import { NavLink } from "react-router-dom";
const items = [
  { to: "/", label: "Start", icon: "🏠" },
  { to: "/results", label: "Ergebnisse", icon: "📊" },
  { to: "/my-teams", label: "Meine", icon: "★" },
  { to: "/schedule", label: "Plan", icon: "📅" },
  { to: "/more", label: "Mehr", icon: "☰" }
];
export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-2xl justify-around border-t border-slate-700 bg-slate-900/95 backdrop-blur">
      {items.map((i) => (
        <NavLink key={i.to} to={i.to} end={i.to === "/"}
          className={({ isActive }) =>
            "flex flex-1 flex-col items-center gap-0.5 py-2 text-xs " + (isActive ? "text-ctif-orange" : "text-slate-400")}>
          <span className="text-lg">{i.icon}</span>{i.label}
        </NavLink>
      ))}
    </nav>
  );
}
