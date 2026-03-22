import type { VariableBill } from "@/types";
import { cn } from "@/lib/utils";

const GOLD = "oklch(0.7800 0.1300 80)";
const DESTRUCTIVE = "oklch(0.6500 0.2200 25)";

export function VariableBillRow({ icon: Icon, name, used, budget, category }: VariableBill) {
  const pct = Math.min((used / budget) * 100, 100);
  const isOver = used > budget;

  return (
    <div className="border-b border-border py-3 last:border-0">
      <div className="mb-2 flex items-center gap-3">
        <Icon size={16} className="shrink-0 text-muted-foreground" />
        <span className="flex-1 text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{category}</span>
        <span className={cn("text-sm font-semibold", isOver ? "text-destructive" : "text-foreground")}>
          €{used} <span className="text-xs font-normal text-muted-foreground">/ €{budget}</span>
        </span>
      </div>
      {/* Progress bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: isOver ? DESTRUCTIVE : GOLD }}
        />
      </div>
    </div>
  );
}
