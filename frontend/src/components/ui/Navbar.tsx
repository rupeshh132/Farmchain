import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MoreVertical, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Features', onClick: () => navigate('/#features') },
    { label: 'How it Works', onClick: () => navigate('/#how-it-works') },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-center pointer-events-none">
      
      {/* Expanding Pill Container */}
      <motion.div 
        layout
        className="pointer-events-auto flex items-center bg-soil-950 text-cream rounded-full px-2 py-2 pr-2 shadow-2xl shadow-soil-900/30 border border-soil-800 backdrop-blur-xl gap-2 md:gap-4 overflow-hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
        style={{ borderRadius: 9999 }}
      >
        {/* Left Side: Logo & Brand */}
        <motion.div 
          layout="position"
          className="flex items-center gap-2 pl-3 cursor-pointer select-none shrink-0"
          onClick={() => navigate('/')}
        >
          <img src="/logo.png" alt="FarmChain Logo" className="w-7 h-7 object-contain mix-blend-screen" />
          <span className="font-heading text-lg font-bold tracking-tight mt-0.5 pr-2">FarmChain</span>
        </motion.div>

        {/* Horizontal Menu Items */}
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.div
              key="menu-items"
              initial={{ opacity: 0, width: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, width: 'auto', filter: 'blur(0px)' }}
              exit={{ opacity: 0, width: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center gap-2 md:gap-4 px-2 whitespace-nowrap overflow-hidden"
            >
              {navLinks.map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className="font-body font-medium text-sm text-cream/70 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}

              <div className="w-px h-4 bg-soil-800 mx-1" />

              {!token ? (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="font-body font-medium text-sm text-cream hover:text-white transition-colors"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="font-body font-medium text-sm bg-primary/20 text-primary-light hover:bg-primary/30 px-3 py-1.5 rounded-full transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="font-body font-medium text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1.5 rounded-full transition-colors"
                >
                  Log Out
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side: Menu Button */}
        <motion.button 
          layout="position"
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 bg-cream text-soil-950 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shrink-0 ml-auto"
          aria-label="Toggle Menu"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={20} strokeWidth={2.5} /> : <MoreVertical size={20} strokeWidth={2.5} />}
          </motion.div>
        </motion.button>

      </motion.div>

    </div>
  );
};
