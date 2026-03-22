import { Progress } from "@/components/ui/progress";
import type { BudgetItem } from "@/types";

export function BudgetProgressItem({ category, spent, total }: BudgetItem) {
  const pct = Math.round((spent / total) * 100);
  const isOver = pct > 80;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-foreground">{category}</span>
        <span className="text-muted-foreground">€{spent} / €{total}</span>
      </div>
      <Progress
        value={Math.min(pct, 100)}
        className="h-1.5"
        style={isOver ? { "--primary": "var(--destructive)" } as React.CSSProperties : undefined}
      />
    </div>
  );
}
