import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TransactionRowProps {
  icon: LucideIcon;
  name: string;
  date: string;
  category: string;
  type: "inflow" | "outflow";
  amount: number;
}

export function TransactionRow({ icon: Icon, name, date, category, type, amount }: TransactionRowProps) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
      <Icon size={18} className="shrink-0 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
      <Badge variant="secondary" className="shrink-0 text-xs">{category}</Badge>
      <span className={cn("text-sm font-medium shrink-0", type === "inflow" ? "text-emerald-400" : "text-foreground")}>
        {type === "inflow" ? "+" : "−"}€{amount.toFixed(2)}
      </span>
    </div>
  );
}
