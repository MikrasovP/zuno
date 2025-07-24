import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { LoadStateProvider } from '@/context/LoadStateContext';

export default function AppLayout() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-1 container mx-auto px-4 py-8 relative">
        <LoadStateProvider>
          <Outlet />
        </LoadStateProvider>
      </main>
    </div>
  );
} 