import type { FixedBill } from "@/types";
import { BillStatusBadge } from "./BillStatusBadge";

export function FixedBillRow({ icon: Icon, name, dueDate, amount, status, category }: FixedBill) {
  return (
    <div className="flex items-center gap-4 border-b border-border py-3 last:border-0">
      <Icon size={16} className="shrink-0 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">Due {dueDate} · {category}</p>
      </div>
      <BillStatusBadge status={status} />
      <span className="min-w-[72px] text-right text-sm font-semibold text-primary">
        €{amount.toFixed(2)}
      </span>
    </div>
  );
}
