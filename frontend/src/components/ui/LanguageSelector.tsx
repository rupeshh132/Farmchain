import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../../i18n/translations';
import { AnimatePresence, motion } from 'motion/react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#0B2E1E] border border-[#133D2A] text-white rounded-full px-4 py-2 shadow-sm hover:bg-[#133D2A] transition-colors"
      >
        <Globe size={16} className="text-blue-500" />
        <span className="font-sans font-medium text-xs font-bold tracking-wide">{currentLang.label}</span>
        <ChevronDown size={14} className="text-white/50" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-0 mb-2 w-64 bg-[#111115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 text-white"
          >
            <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center">
              <span className="font-sans font-medium text-[10px] text-white/50 tracking-wide font-bold">Select Language Mode</span>
              <span className="font-sans font-medium text-[10px] text-blue-500 tracking-wide font-bold">Live</span>
            </div>
            
            <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isActive = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-3 rounded-xl flex items-center justify-between mb-1 transition-colors
                      ${isActive ? 'bg-[#152336] text-blue-400' : 'hover:bg-white/5'}
                    `}
                  >
                    <div className="flex items-baseline gap-2">
                      <span className={`text-lg font-heading ${isActive ? 'text-blue-400' : 'text-white'}`}>
                        {lang.native}
                      </span>
                      <span className={`text-xs ${isActive ? 'text-blue-400/70' : 'text-white/50'}`}>
                        ({lang.label})
                      </span>
                    </div>
                    {isActive && <Check size={16} className="text-blue-500" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
