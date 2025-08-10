import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { LoadStateProvider } from '@/context/LoadStateContext';
import SidePanel from '@/components/ui/SidePanel';
import SidePanelContent from '@/components/ui/SidePanelContent';
import { useSidePanel } from '@/context/SidePanelContext';

export default function AppLayout() {
  const { isOpen, content, closePanel } = useSidePanel();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row relative">
        <main className="flex-1 container mx-auto px-4 py-8">
          <LoadStateProvider>
            <Outlet />
          </LoadStateProvider>
        </main>
      </div>
      {isOpen && content && (
        <SidePanel open={isOpen} onClose={closePanel}>
          <SidePanelContent content={content} onClose={closePanel} />
        </SidePanel>
      )}
    </div>
  );
} 