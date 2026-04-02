import type { VariableBill } from "@/types";
import { cn } from "@/lib/utils";

function getBarColor(pct: number): string {
  if (pct > 100) return "oklch(0.6509 0.2199 25.04)";   // danger red
  if (pct > 90)  return "oklch(0.7200 0.1800 40)";       // caution orange
  if (pct > 70)  return "oklch(0.7800 0.1500 75)";       // warning amber
  return "oklch(0.7797 0.1299 79.58)";                    // brand/primary
}

function getAmountClass(pct: number): string {
  if (pct > 100) return "text-destructive font-semibold";
  if (pct > 90)  return "text-orange-500 font-medium";
  if (pct > 70)  return "text-amber-500";
  return "text-foreground";
}

export function VariableBillRow({ icon: Icon, name, used, budget, category }: VariableBill) {
  const rawPct = (used / budget) * 100;
  const pct = Math.min(rawPct, 100);
  const isOver = used > budget;

  return (
    <div className="px-4 py-3.5 hover:bg-muted/30 transition-colors">
      <div className="mb-2 flex items-center gap-3">
        <Icon size={16} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
        <span className="flex-1 text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{category}</span>
        <span className={cn("text-sm tabular-nums", getAmountClass(rawPct))}>
          €{used}
          <span className="text-xs font-normal text-muted-foreground"> / €{budget}</span>
          {isOver && <span className="ml-1 text-[11px] text-destructive font-medium">+€{used - budget} over</span>}
        </span>
      </div>
      <div className="ml-7 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: getBarColor(rawPct) }}
        />
      </div>
    </div>
  );
}
