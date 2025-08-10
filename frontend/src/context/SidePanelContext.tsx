import { createContext, useContext, useState, ReactNode } from "react";

type PanelContent = 'login' | 'signup' | null;

interface SidePanelContextProps {
  isOpen: boolean;
  content: PanelContent;
  openPanel: (content: PanelContent) => void;
  closePanel: () => void;
}

const SidePanelContext = createContext<SidePanelContextProps | null>(null);

export function SidePanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<PanelContent>(null);

  const openPanel = (newContent: PanelContent) => {
    setContent(newContent);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <SidePanelContext.Provider value={{ isOpen, content, openPanel, closePanel }}>
      {children}
    </SidePanelContext.Provider>
  );
}

export function useSidePanel() {
  const context = useContext(SidePanelContext);
  if (!context) {
    throw new Error("useSidePanel must be used within a SidePanelProvider");
  }
  return context;
} 