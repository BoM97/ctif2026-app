import { ReactNode, useEffect } from "react";
import { BottomNav } from "./BottomNav";
import { useSettings } from "../store/settings";

export function Layout({ children }: { children: ReactNode }) {
  const theme = useSettings((s) => s.theme);
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); }, [theme]);
  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-slate-900 text-slate-100 pb-20">
      {children}
      <BottomNav />
    </div>
  );
}
