import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, CalendarDays, BarChart3, Users, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

export const DashboardSidebar: React.FC = () => {
  const { t } = useTranslation();

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/dashboard', badge: null },
    { icon: <CheckSquare size={18} />, label: 'Tasks', path: '/tasks', badge: '12+' },
    { icon: <CalendarDays size={18} />, label: 'Calendar', path: '/calendar', badge: null },
    { icon: <BarChart3 size={18} />, label: 'Analytics', path: '/analytics', badge: null },
    { icon: <Users size={18} />, label: 'Team', path: '/team', badge: null },
  ];

  const generalItems = [
    { icon: <Settings size={18} />, label: 'Settings', path: '/settings' },
    { icon: <HelpCircle size={18} />, label: 'Help', path: '/help' },
    { icon: <LogOut size={18} />, label: 'Logout', path: '/', isLogout: true },
  ];

  return (
    <aside className="w-64 bg-cream h-screen border-r border-soil-200 flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = '/'}>
        <img src="/logo.png" alt="FarmChain Logo" className="w-8 h-8 object-contain" />
        <span className="font-heading text-2xl font-bold text-soil-900">FarmChain</span>
      </div>

      {/* Menu Sections */}
      <div className="px-4 py-2 flex-1">
        <div className="mb-6">
          <span className="px-4 text-[10px] font-sans font-bold text-soil-400 uppercase tracking-wider mb-2 block">MENU</span>
          <ul className="space-y-1">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-all ${
                      isActive 
                        ? 'text-soil-900 bg-white shadow-sm border border-soil-100 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1 before:bg-soil-900 before:rounded-r-md' 
                        : 'text-soil-500 hover:text-soil-900 hover:bg-white/50'
                    }`
                  }
                >
                  <span className="text-current opacity-80">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-soil-900 text-cream text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="px-4 text-[10px] font-sans font-bold text-soil-400 uppercase tracking-wider mb-2 block">GENERAL</span>
          <ul className="space-y-1">
            {generalItems.map((item, idx) => (
              <li key={idx}>
                {item.isLogout ? (
                  <button 
                    onClick={() => {
                      localStorage.removeItem('token');
                      window.location.href = '/';
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm font-medium text-soil-500 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    <span className="text-current opacity-80">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-all ${
                        isActive 
                          ? 'text-soil-900 bg-white shadow-sm border border-soil-100' 
                          : 'text-soil-500 hover:text-soil-900 hover:bg-white/50'
                      }`
                    }
                  >
                    <span className="text-current opacity-80">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Promo Card */}
      <div className="p-4 mt-auto mb-4">
        <div className="bg-soil-950 rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-xl -ml-10 -mb-10" />
          
          <div className="relative z-10">
            <div className="bg-white/10 w-8 h-8 rounded-lg flex items-center justify-center mb-3">
              <img src="/logo.png" className="w-5 h-5 invert brightness-200" alt="App" />
            </div>
            <h4 className="text-white font-heading text-base mb-1">Mobile App</h4>
            <p className="text-cream/50 text-[10px] font-body mb-4">Get FarmChain on the go.</p>
            <div className="w-full py-2 bg-white/10 text-cream/70 rounded-xl text-xs font-bold text-center border border-white/5 cursor-not-allowed">
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
