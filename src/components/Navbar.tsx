import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuthState } from '@/context/AuthStateContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useAuthState();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
            {user ? (
              <>
                <Link to="/me" className={buttonClass}>
                  Me
                </Link>
                <button
                  className={buttonClass}
                  onClick={() => setUser(null)}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={buttonClass}>
                  Sign In
                </Link>
                <Link to="/signup" className={buttonClass}>
                  Sign Up
                </Link>
              </>
            )}
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
              {user ? (
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
                      setUser(null);
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={buttonClass}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className={buttonClass}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 