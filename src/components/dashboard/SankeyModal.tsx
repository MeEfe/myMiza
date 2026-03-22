import { X } from "lucide-react";
import { SankeyDiagram } from "./SankeyDiagram";
import type { SankeyNode, SankeyLink } from "@/types";

interface SankeyModalProps {
  open: boolean;
  onClose: () => void;
  nodes: SankeyNode[];
  links: SankeyLink[];
  label: string;
}

export function SankeyModal({ open, onClose, nodes, links, label }: SankeyModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-[90vw] max-w-5xl rounded-xl border border-border bg-card p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">Cash Flow — {label}</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>
        <SankeyDiagram nodes={nodes} links={links} width={900} height={480} />
      </div>
    </div>
  );
}
