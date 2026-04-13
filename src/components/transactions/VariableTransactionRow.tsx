import type { VariableBill } from "@/types";

export function VariableTransactionRow({ icon: Icon, name, date, amount, category }: VariableBill) {
  return (
    <div className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/40">
      <span className="shrink-0 w-[3px] h-9 rounded-full bg-border/60" />

      <Icon size={16} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground">
          {date}
          <span className="mx-1 text-border">·</span>
          {category}
        </p>
      </div>

      <span className="min-w-[72px] text-right text-sm font-semibold tabular-nums text-foreground">
        €{amount.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
}
