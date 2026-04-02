import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_BADGE, DEFAULT_BADGE } from "@/lib/categoryColors";

interface TransactionRowProps {
  icon: LucideIcon;
  name: string;
  date: string;
  category: string;
  type: "inflow" | "outflow";
  amount: number;
}

export function TransactionRow({ icon: Icon, name, date, category, type, amount }: TransactionRowProps) {
  const badge = CATEGORY_BADGE[category] ?? DEFAULT_BADGE;

  return (
    <div className="flex items-center gap-4 py-3.5 rounded-lg -mx-2 px-2 hover:bg-muted/40 transition-colors cursor-default">
      <Icon size={18} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
      <span className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
        badge.bg, badge.text
      )}>
        {category}
      </span>
      <span className={cn(
        "text-sm font-semibold tabular-nums shrink-0",
        type === "inflow" ? "text-emerald-600" : "text-foreground"
      )}>
        {type === "inflow" ? "+" : "−"}€{amount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    </div>
  );
}
