import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { monthSnapshots } from "@/data/mockData";

interface AppContextValue {
  activeNav: string;
  setActiveNav: (id: string) => void;
  monthIdx: number;
  setMonthIdx: (idx: number) => void;
  currentMonth: typeof monthSnapshots[0];
  canPrev: boolean;
  canNext: boolean;
  isDark: boolean;
  toggleDark: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [monthIdx, setMonthIdx] = useState(0);
  const [isDark, setIsDark] = useState(true);

  const currentMonth = monthSnapshots[monthIdx];
  const canPrev = monthIdx < monthSnapshots.length - 1;
  const canNext = monthIdx > 0;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleDark = () => setIsDark((d) => !d);

  return (
    <AppContext.Provider value={{ activeNav, setActiveNav, monthIdx, setMonthIdx, currentMonth, canPrev, canNext, isDark, toggleDark }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
