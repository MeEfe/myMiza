import { BudgetProgressItem } from "./BudgetProgressItem";
import { budgetItems } from "@/data/mockData";

export function BudgetCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="font-serif text-lg font-semibold mb-5">Budget</h2>
      <div className="space-y-5">
        {budgetItems.map((item) => (
          <BudgetProgressItem key={item.category} {...item} />
        ))}
      </div>
    </div>
  );
}
