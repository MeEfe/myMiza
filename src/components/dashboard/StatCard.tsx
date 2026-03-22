import { Maximize2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <Icon size={16} className="text-muted-foreground" />
          <Maximize2 size={14} className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
        </div>
        <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}
