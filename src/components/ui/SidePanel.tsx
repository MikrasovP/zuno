import { ReactNode } from "react";

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function SidePanel({ open, onClose, children }: SidePanelProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 transition-opacity"
        onClick={onClose}
        aria-label="Close panel"
      />
      {/* Panel */}
      <div
        className="relative bg-card w-full h-full md:w-[400px] md:h-full md:ml-auto shadow-xl transition-transform duration-200 flex flex-col"
        style={{
          transform: 'translateX(0)',
        }}
      >
        <button
          className="absolute top-4 right-4 text-2xl text-muted-foreground focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex-1 overflow-y-auto p-8 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
} 