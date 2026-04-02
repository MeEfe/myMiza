import { useState } from "react";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BillsPieChart } from "./BillsPieChart";
import { FixedBillRow } from "./FixedBillRow";
import { VariableBillRow } from "./VariableBillRow";
import { fixedBills, variableBills } from "@/data/mockData";
import { cn } from "@/lib/utils";
import type { BillStatus } from "@/types";

type Tab = "fixed" | "variable" | "combined";

const FIXED_COLORS: Record<string, string> = {
  Housing:       "oklch(0.7800 0.1300 80)",
  Utilities:     "oklch(0.6500 0.1500 200)",
  Insurance:     "oklch(0.6000 0.1400 260)",
  Subscriptions: "oklch(0.6500 0.1500 160)",
  Transport:     "oklch(0.6800 0.1600 40)",
  Health:        "oklch(0.6500 0.1600 330)",
  Education:     "oklch(0.6000 0.1200 290)",
};

const VARIABLE_COLORS: Record<string, string> = {
  Food:      "oklch(0.7200 0.1400 95)",
  Transport: "oklch(0.6200 0.1400 55)",
  Work:      "oklch(0.5800 0.1300 215)",
  Health:    "oklch(0.5800 0.1400 345)",
  Leisure:   "oklch(0.5500 0.1300 175)",
  Personal:  "oklch(0.5500 0.1100 305)",
  Housing:   "oklch(0.5800 0.1300 275)",
  Education: "oklch(0.5200 0.1100 325)",
};

function buildFixedSlices() {
  const map: Record<string, number> = {};
  fixedBills.forEach((b) => { map[b.category] = (map[b.category] ?? 0) + b.amount; });
  return Object.entries(map).map(([label, value]) => ({
    label, value, color: FIXED_COLORS[label] ?? "oklch(0.5500 0.1000 270)",
  }));
}

function buildVariableSlices() {
  const map: Record<string, number> = {};
  variableBills.forEach((b) => { map[b.category] = (map[b.category] ?? 0) + b.used; });
  return Object.entries(map).map(([label, value]) => ({
    label, value, color: VARIABLE_COLORS[label] ?? "oklch(0.5500 0.1000 270)",
  }));
}

function buildCombinedSlices() {
  const fixed = buildFixedSlices();
  const variable = buildVariableSlices().map((s) => ({ ...s, label: `${s.label} (var)` }));
  return [...fixed, ...variable];
}

const fixedSlices = buildFixedSlices();
const variableSlices = buildVariableSlices();
const combinedSlices = buildCombinedSlices();
const totalFixed = fixedBills.reduce((s, b) => s + b.amount, 0);
const totalVariable = variableBills.reduce((s, b) => s + b.used, 0);

// Status counts
const paidCount = fixedBills.filter((b) => b.status === "paid").length;
const overdueCount = fixedBills.filter((b) => b.status === "overdue").length;
const upcomingCount = fixedBills.filter((b) => b.status === "upcoming").length;
const overBudgetCount = variableBills.filter((b) => b.used > b.budget).length;

// Status grouping for fixed bills
const STATUS_ORDER: BillStatus[] = ["overdue", "upcoming", "pending", "paid"];
const STATUS_LABEL: Record<BillStatus, string> = {
  overdue: "Overdue",
  upcoming: "Upcoming",
  pending: "Pending",
  paid: "Paid",
};

const TABS: { id: Tab; label: string; count: number }[] = [
  { id: "fixed",    label: "Fixed",    count: fixedBills.length },
  { id: "variable", label: "Variable", count: variableBills.length },
  { id: "combined", label: "Combined", count: fixedBills.length + variableBills.length },
];

export function BillsView() {
  const [tab, setTab] = useState<Tab>("fixed");

  const slices = tab === "fixed" ? fixedSlices : tab === "variable" ? variableSlices : combinedSlices;
  const total = tab === "fixed" ? totalFixed : tab === "variable" ? totalVariable : totalFixed + totalVariable;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header row: tabs + Add Bill */}
      <div className="shrink-0 mb-4 flex items-center justify-between">
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "cursor-pointer rounded-md px-3.5 py-1.5 text-sm font-medium transition-all duration-150",
                tab === t.id
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
              )}
            >
              {t.label}
              <span className={cn(
                "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                tab === t.id ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus size={14} />
          Add Bill
        </Button>
      </div>

      {/* Status summary pills */}
      <div className="shrink-0 flex items-center gap-2 mb-5">
        {overdueCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-destructive/15 px-2.5 py-1 text-xs font-medium text-destructive">
            {overdueCount} overdue
          </span>
        )}
        {upcomingCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-600">
            {upcomingCount} upcoming
          </span>
        )}
        {overBudgetCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-destructive/15 px-2.5 py-1 text-xs font-medium text-destructive">
            {overBudgetCount} over budget
          </span>
        )}
        {overdueCount === 0 && upcomingCount === 0 && overBudgetCount === 0 && (
          <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-600">
            All clear
          </span>
        )}
        <span className="ml-auto text-xs text-muted-foreground">
          {paidCount} paid · <span className="font-medium text-foreground">€{total.toLocaleString("de-DE", { minimumFractionDigits: 2 })}</span> total
        </span>
      </div>

      {/* Donut chart + vertical legend in card */}
      <div className="shrink-0 rounded-xl border border-border bg-card p-5 mb-5">
        <div className="flex items-center gap-8">
          <BillsPieChart slices={slices} />
          <div className="flex-1 space-y-2.5">
            {slices.map((sl) => (
              <div key={sl.label} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: sl.color }}
                  />
                  <span className="truncate">{sl.label}</span>
                </span>
                <span className="text-sm font-semibold tabular-nums text-foreground shrink-0">
                  €{sl.value.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bill list */}
      <div className="flex flex-1 flex-col min-h-0">
        <ScrollArea className="flex-1 h-full pr-3">
          {tab === "fixed" && (
            <>
              {STATUS_ORDER.map((status) => {
                const group = fixedBills.filter((b) => b.status === status);
                if (group.length === 0) return null;
                return (
                  <div key={status} className="mb-4">
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground/70 px-1">
                      {STATUS_LABEL[status]}
                    </p>
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                      {group.map((b, i) => (
                        <div key={b.id} className={cn(i > 0 && "border-t border-border/60")}>
                          <FixedBillRow {...b} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {tab === "variable" && (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {variableBills.map((b, i) => (
                <div key={b.id} className={cn(i > 0 && "border-t border-border/60")}>
                  <VariableBillRow {...b} />
                </div>
              ))}
            </div>
          )}
          {tab === "combined" && (
            <>
              <div className="mb-4">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground/70 px-1">Fixed</p>
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  {fixedBills.map((b, i) => (
                    <div key={b.id} className={cn(i > 0 && "border-t border-border/60")}>
                      <FixedBillRow {...b} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground/70 px-1">Variable</p>
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  {variableBills.map((b, i) => (
                    <div key={b.id} className={cn(i > 0 && "border-t border-border/60")}>
                      <VariableBillRow {...b} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
