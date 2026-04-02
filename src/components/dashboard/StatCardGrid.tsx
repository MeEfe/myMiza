import { StatCard } from "./StatCard";
import { statCards } from "@/data/mockData";

const ACCENT_COLORS = [
  "border-emerald-500",   // Monthly Income → green
  "border-amber-500",     // Expenses → amber
  "border-primary",       // Savings Rate → brand
  "border-orange-400",    // Upcoming Bills → orange
];

export function StatCardGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {statCards.map((card, index) => (
        <StatCard
          key={card.label}
          icon={card.icon}
          label={card.label}
          value={card.value}
          accentColor={ACCENT_COLORS[index]}
        />
      ))}
    </div>
  );
}
