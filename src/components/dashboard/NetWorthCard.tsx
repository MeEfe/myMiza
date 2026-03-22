import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { netWorth } from "@/data/mockData";

export function NetWorthCard() {
  return (
    <Card className="border-border">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Net Worth</p>
          <p className="font-serif text-5xl font-semibold text-foreground">{netWorth.value}</p>
          <div className="flex items-center gap-1.5 text-sm text-emerald-400">
            <TrendingUp size={14} />
            <span>{netWorth.change} {netWorth.changeLabel}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">Transfer</Button>
          <Button size="sm">Add Income</Button>
        </div>
      </CardContent>
    </Card>
  );
}
