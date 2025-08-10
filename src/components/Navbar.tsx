import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AuthState, useAuthState } from '@/context/AuthStateContext';
import { useSidePanel } from '@/context/SidePanelContext';
import { logout } from '@/api/AuthApi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, authState, onLogout } = useAuthState();
  const { openPanel } = useSidePanel();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logout();
    onLogout();
  }

  // Button styles
  const buttonClass =
    "px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition-colors";
  const menuItemClass = "text-foreground hover:text-primary transition-colors";

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            Zuno
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={menuItemClass}>
              Home
            </Link>
            <Link to="/new" className={menuItemClass}>
              New Post
            </Link>
            {authState === AuthState.AUTHENTICATED && user ? (
              <>
                <Link to="/me" className={buttonClass}>
                  Me
                </Link>
                <button
                  className={buttonClass}
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : authState === AuthState.UNAUTHENTICATED ? (
              <>
                <button
                  className={buttonClass}
                  onClick={() => openPanel('login')}
                >
                  Sign In
                </button>
                <button
                  className={buttonClass}
                  onClick={() => openPanel('signup')}
                >
                  Sign Up
                </button>
              </>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={menuItemClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/new"
                className={menuItemClass}
                onClick={() => setIsMenuOpen(false)}
              >
                New Post
              </Link>
              {authState === AuthState.AUTHENTICATED && user ? (
                <>
                  <Link
                    to="/me"
                    className={buttonClass}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Me
                  </Link>
                  <button
                    className={buttonClass}
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : authState === AuthState.UNAUTHENTICATED ? (
                <>
                  <button
                    className={buttonClass}
                    onClick={() => {
                      openPanel('login');
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className={buttonClass}
                    onClick={() => {
                      openPanel('signup');
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 