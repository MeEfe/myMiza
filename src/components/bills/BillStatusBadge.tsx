import type { BillStatus } from "@/types";
import { cn } from "@/lib/utils";

const CONFIG: Record<BillStatus, { label: string; classes: string }> = {
  paid:     { label: "Paid",     classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
  upcoming: { label: "Upcoming", classes: "bg-primary/15 text-primary border-primary/20" },
  pending:  { label: "Pending",  classes: "bg-muted text-muted-foreground border-border" },
  overdue:  { label: "Overdue",  classes: "bg-destructive/15 text-destructive border-destructive/20" },
};

export function BillStatusBadge({ status }: { status: BillStatus }) {
  const { label, classes } = CONFIG[status];
  return (
    <span className={cn("rounded border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide", classes)}>
      {label}
    </span>
  );
}
