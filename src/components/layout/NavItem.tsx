import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function NavItem({ icon: Icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 py-2.5 text-sm transition-colors",
        isActive
          ? "border-l-2 border-primary pl-3 text-primary"
          : "pl-4 text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}
