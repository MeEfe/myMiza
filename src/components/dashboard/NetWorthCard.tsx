import { TrendingUp } from "lucide-react";
import { netWorth } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

export function NetWorthCard() {
  const { currentMonth } = useApp();

  return (
    <div className="pb-6 border-b border-border">
      <div className="flex items-center gap-2 mb-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground">Net Worth</p>
        <span className="text-[11px] text-muted-foreground/60">·</span>
        <span className="text-[11px] text-muted-foreground/70">Viewing: {currentMonth.label}</span>
      </div>
      <p className="font-serif text-5xl font-semibold text-foreground tabular-nums">{netWorth.value}</p>
      <div className="mt-2 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
          <TrendingUp size={11} />
          {netWorth.change}
        </span>
        <span className="text-xs text-muted-foreground">{netWorth.changeLabel}</span>
      </div>
    </div>
  );
}
