import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { Sprout } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Don't show login button on the landing page if already logged in (Dashboard button is there)
  // But wait, the user wants a Navbar. Let's make it always visible.

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-border h-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer text-primary hover:text-primary/80 transition-colors"
          onClick={() => navigate('/')}
        >
          <Sprout size={28} />
          <span className="font-heading text-xl text-soil-900 font-bold tracking-tight">FarmChain</span>
        </div>
        
        <div className="flex gap-4 items-center">
          {!token ? (
            <>
              <Button variant="outline" className="text-sm py-1.5 hidden md:block" onClick={() => navigate('/login')}>
                Log In
              </Button>
              <Button variant="primary" className="text-sm py-1.5" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              {location.pathname !== '/dashboard' && (
                <Button variant="outline" className="text-sm py-1.5" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>
              )}
              <Button variant="secondary" className="text-sm py-1.5" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
