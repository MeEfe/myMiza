import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BudgetProgressItem } from "./BudgetProgressItem";
import { budgetItems } from "@/data/mockData";

export function BudgetCard() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2 pt-4 px-5">
        <CardTitle className="font-serif text-lg font-semibold">Budget Progress</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-4 space-y-4">
        {budgetItems.map((item) => (
          <BudgetProgressItem key={item.category} {...item} />
        ))}
      </CardContent>
    </Card>
  );
}
