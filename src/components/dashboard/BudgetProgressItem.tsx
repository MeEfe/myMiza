import type { BudgetItem } from "@/types";

function getBudgetColor(pct: number): string {
  if (pct > 100) return "oklch(0.6509 0.2199 25.04)";    // danger red
  if (pct > 90)  return "oklch(0.7200 0.1800 40)";        // caution orange
  if (pct > 70)  return "oklch(0.7800 0.1500 75)";        // warning amber
  return "oklch(0.7797 0.1299 79.58)";                     // brand/primary (calm)
}

function getBudgetTextColor(pct: number): string {
  if (pct > 100) return "text-destructive font-semibold";
  if (pct > 90)  return "text-orange-500 font-medium";
  if (pct > 70)  return "text-amber-500";
  return "text-muted-foreground";
}

export function BudgetProgressItem({ category, spent, total }: BudgetItem) {
  const pct = Math.round((spent / total) * 100);
  const remaining = total - spent;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{category}</span>
        <span className={getBudgetTextColor(pct)}>
          {pct > 100
            ? `€${spent} / €${total} · €${Math.abs(remaining)} over`
            : `€${spent} / €${total} · €${remaining} left`}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: getBudgetColor(pct) }}
        />
      </div>
    </div>
  );
}
