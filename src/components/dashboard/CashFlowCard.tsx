import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { SankeyDiagram } from "./SankeyDiagram";
import { SankeyModal } from "./SankeyModal";
import { useApp } from "@/context/AppContext";

export function CashFlowCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { currentMonth } = useApp();

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold">Cash Flow</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            title="Expand"
          >
            <Maximize2 size={14} />
          </button>
        </div>
        <SankeyDiagram nodes={currentMonth.nodes} links={currentMonth.links} />
      </div>

      <SankeyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        nodes={currentMonth.nodes}
        links={currentMonth.links}
        label={currentMonth.label}
      />
    </>
  );
}
