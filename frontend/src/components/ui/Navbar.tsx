import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MoreVertical, X } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const { t } = useTranslation();
  
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Close menu when route changes on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { label: t('nav.home'), onClick: () => navigate('/') },
    { label: t('nav.features'), onClick: () => navigate('/features') },
    { label: t('nav.howItWorks'), onClick: () => navigate('/how-it-works') },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-center pointer-events-none w-full px-4 md:px-0 md:w-auto">
      
      {/* Container */}
      <div className="relative">
        {/* Expanding Pill */}
        <motion.div 
          layout
          className="pointer-events-auto flex items-center bg-[#0B2E1E] text-white rounded-full px-2 py-2 pr-2 shadow-sm border border-[#133D2A] backdrop-blur-xl gap-2 md:gap-4 max-w-full md:max-w-none"
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

          {/* Offline Badge */}
          <AnimatePresence>
            {isOffline && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: 'auto' }}
                exit={{ opacity: 0, scale: 0.8, width: 0 }}
                className="overflow-hidden hidden md:block"
              >
                <div className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full flex items-center gap-2 whitespace-nowrap">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-sans text-[10px] font-bold tracking-wide mt-0.5">Offline - Stale Data</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Horizontal Menu Items */}
          <AnimatePresence mode="popLayout">
            {isOpen && (
              <motion.div
                key="menu-items"
                initial={{ opacity: 0, width: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, width: 'auto', filter: 'blur(0px)' }}
                exit={{ opacity: 0, width: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="hidden md:flex items-center gap-4 px-2 whitespace-nowrap"
              >
                {navLinks.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.onClick}
                    className="font-sans font-medium text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ))}

                <div className="w-px h-4 bg-[#133D2A] mx-1" />

                {!token ? (
                  <>
                    <button
                      onClick={() => navigate('/login')}
                      className="font-sans font-medium text-sm text-white hover:text-white/80 transition-colors"
                    >
                      {t('nav.login')}
                    </button>
                    <button
                      onClick={() => navigate('/signup')}
                      className="font-sans font-semibold text-sm bg-leaf-700 text-soil-900 hover:bg-leaf-500 px-4 py-1.5 rounded-full transition-colors shadow-sm"
                    >
                      {t('nav.signup')}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="font-sans font-medium text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {t('nav.logout')}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 border-l border-white/10 pl-2 ml-auto">
            {/* Menu Button */}
            <motion.button 
              layout="position"
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full flex items-center justify-center transition-all shrink-0"
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

        </motion.div>

        {/* Mobile Vertical Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[calc(100%+0.5rem)] right-0 w-[240px] md:hidden flex flex-col bg-[#0B2E1E] border border-[#133D2A] rounded-2xl shadow-xl overflow-hidden pointer-events-auto origin-top-right z-50"
            >
              {isOffline && (
                <div className="bg-red-500/20 text-red-400 px-4 py-3 border-b border-red-500/30 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-sans text-xs font-bold tracking-wide">Offline - Stale Data</span>
                </div>
              )}
              
              <div className="flex flex-col py-2">
                {navLinks.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.onClick}
                    className="w-full text-left px-5 py-3 font-sans font-medium text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}

                <div className="w-full h-px bg-white/10 my-2" />

                {!token ? (
                  <div className="flex flex-col gap-2 px-4 pb-2">
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full text-center py-2.5 font-sans font-medium text-sm text-white hover:bg-white/5 rounded-xl transition-colors border border-white/10"
                    >
                      {t('nav.login')}
                    </button>
                    <button
                      onClick={() => navigate('/signup')}
                      className="w-full text-center py-2.5 font-sans font-semibold text-sm bg-leaf-700 text-soil-900 hover:bg-leaf-500 rounded-xl transition-colors shadow-sm"
                    >
                      {t('nav.signup')}
                    </button>
                  </div>
                ) : (
                  <div className="px-4 pb-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-center py-2.5 font-sans font-medium text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl transition-colors"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
