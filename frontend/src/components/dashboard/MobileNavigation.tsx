import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Store, Menu, X, CalendarDays, BarChart3, Settings, HelpCircle, LogOut } from 'lucide-react';

export const MobileNavigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const mainTabs = [
    { icon: <LayoutDashboard size={20} />, label: 'Home', path: '/dashboard' },
    { icon: <CheckSquare size={20} />, label: 'Tasks', path: '/tasks' },
    { icon: <Store size={20} />, label: 'Mandi', path: '/mandi-prices' },
  ];

  const moreItems = [
    { icon: <CalendarDays size={18} />, label: 'Calendar', path: '/calendar' },
    { icon: <BarChart3 size={18} />, label: 'Analytics', path: '/analytics' },
    { icon: <Settings size={18} />, label: 'Settings', path: '/settings' },
    { icon: <HelpCircle size={18} />, label: 'Help & Support', path: '/help' },
  ];

  return (
    <>
      {/* Slide-up Menu Drawer */}
      <div className={`fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMenuOpen(false)}>
        <div 
          className={`absolute bottom-0 left-0 w-full bg-white rounded-t-3xl transition-transform duration-300 transform ${menuOpen ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b border-soil-100">
            <h3 className="font-heading font-bold text-xl text-soil-900">More Options</h3>
            <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-soil-100 text-soil-600">
              <X size={18} />
            </button>
          </div>
          <div className="p-4 pb-8 space-y-2">
            {moreItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-xl font-body text-base font-medium transition-colors ${
                    isActive ? 'bg-soil-50 text-soil-900' : 'text-soil-600 hover:bg-soil-50'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/';
              }}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-body text-base font-medium text-red-500 hover:bg-red-50 transition-colors mt-4"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom App Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-soil-200 z-50 md:hidden pb-safe flex justify-around items-center h-16 px-2 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        {mainTabs.map((tab, idx) => (
          <NavLink
            key={idx}
            to={tab.path}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? 'text-soil-900' : 'text-soil-400 hover:text-soil-600'
              }`
            }
          >
            {tab.icon}
            <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
          </NavLink>
        ))}
        
        {/* Menu Toggle */}
        <button 
          onClick={() => setMenuOpen(true)}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            menuOpen ? 'text-soil-900' : 'text-soil-400 hover:text-soil-600'
          }`}
        >
          <Menu size={20} />
          <span className="text-[10px] font-medium tracking-wide">Menu</span>
        </button>
      </div>
    </>
  );
};
