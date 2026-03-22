import { Sun, Moon } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function ThemeSwitcher() {
  const { isDark, toggleDark } = useApp();
  return (
    <button
      onClick={toggleDark}
      className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
      title={isDark ? "Switch to light" : "Switch to dark"}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
