import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useApp } from "@/context/AppContext";
import { navItems } from "@/data/mockData";
import { ThemeSwitcher } from "./ThemeSwitcher";

const PAGE_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  portfolio: "Portfolio",
  transactions: "Transactions",
  budgets: "Budgets",
  bills: "Bills",
};

export function TopBar() {
  const { activeNav, monthIdx, setMonthIdx, currentMonth, canPrev, canNext } = useApp();
  const title = PAGE_TITLES[activeNav] ?? "Dashboard";
  const navLabel = navItems.find((n) => n.id === activeNav)?.label ?? title;

  return (
    <div className="flex items-center justify-between border-b border-border px-6 py-4">
      <div className="flex items-center gap-6">
        <h1 className="font-serif text-xl font-semibold">{navLabel}</h1>
        {activeNav === "dashboard" && (
          <Tabs defaultValue="overview">
            <TabsList className="bg-transparent p-0 gap-1">
              <TabsTrigger value="overview" className="cursor-pointer text-sm data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none pb-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="cashflow" className="cursor-pointer text-sm data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none pb-1">
                Cash Flow
              </TabsTrigger>
              <TabsTrigger value="assets" className="cursor-pointer text-sm data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none pb-1">
                Assets
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Global month navigator */}
        <div className="flex items-center gap-1 rounded-md border border-border px-2 py-1">
          <button
            onClick={() => setMonthIdx(monthIdx + 1)}
            disabled={!canPrev}
            className="cursor-pointer p-0.5 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="min-w-[62px] text-center text-xs text-muted-foreground">{currentMonth.label}</span>
          <button
            onClick={() => setMonthIdx(monthIdx - 1)}
            disabled={!canNext}
            className="cursor-pointer p-0.5 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        <ThemeSwitcher />
        <div className="h-4 w-px bg-border" />
        <Bell size={18} className="text-muted-foreground" />
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-secondary text-foreground text-xs">JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
