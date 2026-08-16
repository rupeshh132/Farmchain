import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Show splash animation only on the Landing Page initially
  const [isSplash, setIsSplash] = useState(location.pathname === '/');

  useEffect(() => {
    if (location.pathname === '/') {
      setIsSplash(true);
      // Wait for 2.5 seconds to show the cinematic logo, then trigger the layout animation
      const timer = setTimeout(() => setIsSplash(false), 2500);
      return () => clearTimeout(timer);
    } else {
      setIsSplash(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <AnimatePresence>
        {isSplash && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-soil-950 flex items-center justify-center overflow-hidden"
          >
            {/* Soft glowing background effect behind logo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 2 }}
              className="absolute w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none"
            />
            
            <motion.div 
              layoutId="brand-logo-container"
              className="flex items-center gap-6 relative z-10 flex-col md:flex-row"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1.2, opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <motion.img 
                layoutId="brand-logo-img"
                src="/logo.png" 
                alt="FarmChain Logo" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain mix-blend-screen drop-shadow-[0_0_30px_rgba(163,230,53,0.3)]" 
              />
              <motion.span 
                layoutId="brand-logo-text"
                className="font-heading text-5xl md:text-7xl text-cream font-bold tracking-tight"
              >
                FarmChain
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav 
        initial={false}
        animate={{ 
          opacity: isSplash ? 0 : 1, 
          y: isSplash ? -20 : 0,
          pointerEvents: isSplash ? 'none' : 'auto'
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-border h-16 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity h-full py-2"
            onClick={() => navigate('/')}
          >
            {!isSplash && (
              <motion.div layoutId="brand-logo-container" className="flex items-center gap-3 h-full">
                <motion.img 
                  layoutId="brand-logo-img" 
                  src="/logo.png" 
                  alt="FarmChain Logo" 
                  className="w-10 h-10 object-contain mix-blend-multiply" 
                />
                <motion.span 
                  layoutId="brand-logo-text" 
                  className="font-heading text-2xl text-soil-900 font-bold tracking-tight"
                >
                  FarmChain
                </motion.span>
              </motion.div>
            )}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isSplash ? 0 : 1, x: isSplash ? 20 : 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex gap-4 items-center"
          >
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
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
};

