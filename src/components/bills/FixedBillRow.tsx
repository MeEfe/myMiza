import type { FixedBill } from "@/types";
import { BillStatusBadge } from "./BillStatusBadge";
import { cn } from "@/lib/utils";

export function FixedBillRow({ icon: Icon, name, dueDate, amount, status, category }: FixedBill) {
  const isPaid = status === "paid";
  const isUpcoming = status === "upcoming";
  const isOverdue = status === "overdue";

  return (
    <div className={cn(
      "group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/30",
      isPaid && "opacity-50",
    )}>
      {/* Status accent bar */}
      <span className={cn(
        "shrink-0 w-0.5 h-8 rounded-full",
        isOverdue  ? "bg-destructive" :
        isUpcoming ? "bg-amber-500" :
        isPaid     ? "bg-transparent" :
                     "bg-border"
      )} />

      <Icon size={16} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium truncate", isPaid ? "text-muted-foreground" : "text-foreground")}>
          {name}
        </p>
        <p className="text-xs text-muted-foreground">Due {dueDate} · {category}</p>
      </div>
      <BillStatusBadge status={status} />
      <span className={cn(
        "min-w-[72px] text-right text-sm font-semibold tabular-nums",
        isPaid ? "text-muted-foreground" : "text-primary"
      )}>
        €{amount.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
}
