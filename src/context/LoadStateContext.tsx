import { createContext, useContext, useState, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface LoadStateContextProps {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const LoadStateContext = createContext<LoadStateContextProps | null>(null);

export function LoadStateProvider({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <LoadStateContext.Provider value={{ isLoading, error, setLoading, setError }}>
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80">
          <Loader2 className="h-16 w-16 animate-spin text-neutral-400" />
        </div>
      )}
      {error && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90">
          <div className="text-2xl font-bold text-red-600 mb-4">{error}</div>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => setError(null)}
          >
            Dismiss
          </button>
        </div>
      )}
      {children}
    </LoadStateContext.Provider>
  );
}

export function useLoadState() {
  const ctx = useContext(LoadStateContext);
  if (!ctx) throw new Error("useLoadState must be used within a LoadStateProvider");
  return ctx;
} 