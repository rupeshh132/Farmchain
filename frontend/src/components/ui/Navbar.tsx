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
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-center pointer-events-none w-full max-w-[100vw] px-4">
      
      {/* Expanding Container */}
      <motion.div 
        layout
        className={`pointer-events-auto flex flex-col md:flex-row md:items-center bg-soil-950 text-cream shadow-2xl shadow-soil-900/30 border border-soil-800 backdrop-blur-xl gap-2 md:gap-4 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'rounded-3xl p-4 md:rounded-full md:p-2 w-full md:w-auto max-w-sm md:max-w-none' : 'rounded-full p-2 w-auto'}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
      >
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Left Side: Logo & Brand */}
          <motion.div 
            layout="position"
            className="flex items-center gap-2 pl-3 cursor-pointer select-none shrink-0"
            onClick={() => navigate('/')}
          >
            <img src="/logo.png" alt="FarmChain Logo" className="w-7 h-7 object-contain mix-blend-screen" />
            <span className="font-heading text-lg font-bold tracking-tight mt-0.5 pr-2">FarmChain</span>
          </motion.div>

          {/* Right Side: Menu Button (Visible mainly on mobile next to logo, or at the end on desktop) */}
          <motion.button 
            layout="position"
            onClick={() => setIsOpen(!isOpen)}
            className="w-11 h-11 bg-white/5 hover:bg-white/10 border border-white/10 text-cream rounded-full flex items-center justify-center transition-all shrink-0 md:order-3"
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
        </div>

        {/* Menu Items (Vertical on Mobile, Horizontal on Desktop) */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="menu-items"
              initial={{ opacity: 0, height: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
              exit={{ opacity: 0, height: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-4 px-3 md:px-2 pb-2 md:pb-0 overflow-hidden md:order-2"
            >
              <div className="flex flex-col md:flex-row gap-4 mt-2 md:mt-0">
                {navLinks.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.onClick}
                    className="font-body font-medium text-base md:text-sm text-cream/70 hover:text-white transition-colors text-left md:text-center"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="w-full h-px md:w-px md:h-4 bg-soil-800 my-2 md:my-0 md:mx-1" />

              <div className="flex flex-col md:flex-row gap-3 md:gap-2">
                {!token ? (
                  <>
                    <button
                      onClick={() => navigate('/login')}
                      className="font-body font-medium text-base md:text-sm text-cream hover:text-white transition-colors text-left md:text-center py-2 md:py-0"
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => navigate('/signup')}
                      className="font-body font-medium text-base md:text-sm bg-primary/20 text-primary-light hover:bg-primary/30 px-4 py-3 md:px-3 md:py-1.5 rounded-xl md:rounded-full transition-colors text-center"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="font-body font-medium text-base md:text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-3 md:px-3 md:py-1.5 rounded-xl md:rounded-full transition-colors text-center"
                  >
                    Log Out
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

    </div>
  );
};
