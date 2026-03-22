import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SankeyDiagram } from "./SankeyDiagram";
import { SankeyModal } from "./SankeyModal";
import { useApp } from "@/context/AppContext";

export function CashFlowCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { currentMonth } = useApp();

  return (
    <>
      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-5">
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif text-lg font-semibold">Cash Flow</CardTitle>
            <button
              onClick={() => setModalOpen(true)}
              className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
              title="Expand"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-4">
          <SankeyDiagram nodes={currentMonth.nodes} links={currentMonth.links} />
        </CardContent>
      </Card>

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
