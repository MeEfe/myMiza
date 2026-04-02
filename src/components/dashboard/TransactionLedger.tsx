import { useState } from "react";
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
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-lg font-semibold">Transactions</h2>
        <div className="flex items-center gap-4">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList className="h-8 bg-secondary">
              <TabsTrigger value="all" className="cursor-pointer text-xs px-3 h-6">All</TabsTrigger>
              <TabsTrigger value="outflow" className="cursor-pointer text-xs px-3 h-6">Outflow</TabsTrigger>
              <TabsTrigger value="inflow" className="cursor-pointer text-xs px-3 h-6">Inflow</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div>
        {filtered.map((t: Transaction) => (
          <TransactionRow key={t.id} {...t} />
        ))}
      </div>
      <div className="mt-3 border-t border-border pt-3 text-center">
        <button className="text-xs text-primary hover:underline cursor-pointer transition-colors">
          See All Transactions →
        </button>
      </div>
    </div>
  );
}
