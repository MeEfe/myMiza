import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  accentColor?: string; // tailwind border-color class e.g. "border-emerald-500"
}

export function StatCard({ icon: Icon, label, value, accentColor }: StatCardProps) {
  return (
    <div className={cn(
      "rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md",
      accentColor && `border-t-2 ${accentColor}`
    )}>
      <div className="mb-4 flex items-center justify-between">
        <Icon size={16} strokeWidth={1.5} className="text-muted-foreground" />
      </div>
      <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground">
        {label}
      </p>
      <p className="text-2xl font-semibold tabular-nums text-foreground">{value}</p>
    </div>
  );
}
