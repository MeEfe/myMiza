import { StatCard } from "./StatCard";
import { statCards } from "@/data/mockData";

export function StatCardGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {statCards.map((card) => (
        <StatCard key={card.label} icon={card.icon} label={card.label} value={card.value} />
      ))}
    </div>
  );
}
