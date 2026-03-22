import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BillsPieChart } from "./BillsPieChart";
import { FixedBillRow } from "./FixedBillRow";
import { VariableBillRow } from "./VariableBillRow";
import { fixedBills, variableBills } from "@/data/mockData";
import { cn } from "@/lib/utils";

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
  const fixed = buildFixedSlices().map((s) => ({ ...s, label: `${s.label}` }));
  const variable = buildVariableSlices().map((s) => ({ ...s, label: `${s.label} (var)` }));
  return [...fixed, ...variable];
}

const fixedSlices = buildFixedSlices();
const variableSlices = buildVariableSlices();
const combinedSlices = buildCombinedSlices();
const totalFixed = fixedBills.reduce((s, b) => s + b.amount, 0);
const totalVariable = variableBills.reduce((s, b) => s + b.used, 0);

const TABS: { id: Tab; label: string }[] = [
  { id: "fixed",    label: "Fixed" },
  { id: "variable", label: "Variable" },
  { id: "combined", label: "Combined" },
];

export function BillsView() {
  const [tab, setTab] = useState<Tab>("fixed");

  const slices = tab === "fixed" ? fixedSlices : tab === "variable" ? variableSlices : combinedSlices;
  const total = tab === "fixed" ? totalFixed : tab === "variable" ? totalVariable : totalFixed + totalVariable;
  const countLabel = tab === "fixed"
    ? `${fixedBills.length} obligations`
    : tab === "variable"
    ? `${variableBills.length} categories`
    : `${fixedBills.length + variableBills.length} total entries`;

  return (
    <Card className="flex flex-col flex-1 min-h-0 border-border">
      <CardHeader className="shrink-0 px-5 pt-4 pb-0">
        {/* Tab switcher + summary */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 rounded-lg border border-border bg-muted p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "cursor-pointer rounded-md px-5 py-1.5 text-sm font-medium transition-colors",
                  tab === t.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {countLabel} · <span className="font-medium text-foreground">€{total.toFixed(2)}</span>
          </span>
        </div>

        {/* Pie chart + legend */}
        <div className="mt-4 flex items-center gap-6 pb-4 border-b border-border">
          <BillsPieChart slices={slices} />
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 flex-1">
            {slices.map((sl) => (
              <div key={sl.label} className="flex items-center justify-between gap-3 min-w-0">
                <span className="flex items-center gap-2 text-sm text-muted-foreground truncate">
                  <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: sl.color }} />
                  {sl.label}
                </span>
                <span className="text-sm font-medium text-foreground shrink-0">€{sl.value.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col min-h-0 px-5 pb-2 pt-0">
        <ScrollArea className="flex-1 h-full pr-3">
          {tab === "fixed" && fixedBills.map((b) => <FixedBillRow key={b.id} {...b} />)}
          {tab === "variable" && variableBills.map((b) => <VariableBillRow key={b.id} {...b} />)}
          {tab === "combined" && (
            <>
              <p className="py-2 text-xs uppercase tracking-wider text-muted-foreground">Fixed</p>
              {fixedBills.map((b) => <FixedBillRow key={b.id} {...b} />)}
              <p className="pb-2 pt-4 text-xs uppercase tracking-wider text-muted-foreground">Variable</p>
              {variableBills.map((b) => <VariableBillRow key={b.id} {...b} />)}
            </>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
