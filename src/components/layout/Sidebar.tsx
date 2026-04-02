import { Settings } from "lucide-react";
import { NavItem } from "./NavItem";
import { navItems } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

export function Sidebar() {
  const { activeNav, setActiveNav } = useApp();

  return (
    <aside className="flex h-full flex-col bg-sidebar px-4 py-6">
      {/* Brand */}
      <div className="mb-8 flex items-center gap-3 px-0">
        <div className="h-8 w-8 rounded bg-primary" />
        <span className="font-serif text-xl font-semibold text-primary">MyMiza</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeNav === item.id}
            onClick={() => setActiveNav(item.id)}
          />
        ))}
      </nav>

      {/* Settings — utility, separated */}
      <div className="border-t border-sidebar-border pt-2">
        <NavItem icon={Settings} label="Settings" isActive={false} onClick={() => {}} />
      </div>
    </aside>
  );
}
