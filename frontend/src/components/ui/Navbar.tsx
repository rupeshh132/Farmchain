import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MoreVertical, X, Home, Sparkles, Layers, LogIn, UserPlus, LogOut } from 'lucide-react';

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

  const menuItems = [
    { label: 'Home', icon: Home, onClick: () => navigate('/') },
    { label: 'Features', icon: Sparkles, onClick: () => navigate('/#features') },
    { label: 'How it Works', icon: Layers, onClick: () => navigate('/#how-it-works') },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      
      {/* Floating Pill Container */}
      <motion.div 
        layout
        className="pointer-events-auto relative flex items-center justify-between bg-soil-950 text-cream rounded-full px-2 py-2 pr-2 shadow-2xl shadow-soil-900/30 border border-soil-800 backdrop-blur-xl w-full max-w-[280px]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Left Side: Logo & Brand */}
        <div 
          className="flex items-center gap-2 pl-3 cursor-pointer select-none"
          onClick={() => navigate('/')}
        >
          <img src="/logo.png" alt="FarmChain Logo" className="w-7 h-7 object-contain mix-blend-screen" />
          <span className="font-heading text-lg font-bold tracking-tight mt-0.5">FarmChain</span>
        </div>

        {/* Right Side: Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 bg-cream text-soil-950 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} strokeWidth={2.5} /> : <MoreVertical size={20} strokeWidth={2.5} />}
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[120%] left-0 right-0 bg-soil-950 border border-soil-800 rounded-2xl p-2 shadow-xl overflow-hidden origin-top"
            >
              <div className="flex flex-col gap-1">
                {menuItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.onClick}
                    className="flex items-center gap-3 px-4 py-3 text-cream/80 hover:text-white hover:bg-soil-800 rounded-xl transition-colors text-left"
                  >
                    <item.icon size={18} />
                    <span className="font-body font-medium">{item.label}</span>
                  </button>
                ))}

                <div className="h-px bg-soil-800/50 my-1 mx-2" />

                {!token ? (
                  <>
                    <button
                      onClick={() => navigate('/login')}
                      className="flex items-center gap-3 px-4 py-3 text-cream/80 hover:text-white hover:bg-soil-800 rounded-xl transition-colors text-left"
                    >
                      <LogIn size={18} />
                      <span className="font-body font-medium">Log In</span>
                    </button>
                    <button
                      onClick={() => navigate('/signup')}
                      className="flex items-center gap-3 px-4 py-3 text-primary-light hover:text-primary hover:bg-soil-800 rounded-xl transition-colors text-left"
                    >
                      <UserPlus size={18} />
                      <span className="font-body font-medium">Create Account</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-soil-800 rounded-xl transition-colors text-left"
                  >
                    <LogOut size={18} />
                    <span className="font-body font-medium">Log Out</span>
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
