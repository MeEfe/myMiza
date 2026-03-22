import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionRow } from "./TransactionRow";
import { transactions } from "@/data/mockData";
import type { Transaction } from "@/types";

type Filter = "all" | "outflow" | "inflow";

export function TransactionLedger() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = transactions.filter((t: Transaction) =>
    filter === "all" ? true : t.type === filter
  );

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-5">
        <CardTitle className="font-serif text-lg font-semibold">Recent Transactions</CardTitle>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <TabsList className="h-8 bg-secondary">
            <TabsTrigger value="all" className="cursor-pointer text-xs px-3 h-6">All</TabsTrigger>
            <TabsTrigger value="outflow" className="cursor-pointer text-xs px-3 h-6">Outflow</TabsTrigger>
            <TabsTrigger value="inflow" className="cursor-pointer text-xs px-3 h-6">Inflow</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="px-5 pb-2">
        {filtered.map((t: Transaction) => (
          <TransactionRow key={t.id} {...t} />
        ))}
      </CardContent>
    </Card>
  );
}
