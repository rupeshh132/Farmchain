import React from 'react';
import { Search, Mail } from 'lucide-react';
import { NotificationBell } from '../ui/NotificationBell';

export const DashboardTopHeader: React.FC = () => {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-cream border-b border-soil-100">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-soil-400 group-focus-within:text-soil-900 transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search task"
            className="w-full bg-white border border-soil-200 text-soil-900 text-sm rounded-2xl pl-11 pr-16 py-3 focus:outline-none focus:ring-2 focus:ring-soil-900/10 focus:border-soil-400 transition-all font-body placeholder-soil-400"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block bg-cream border border-soil-200 rounded px-2 py-0.5 text-[10px] font-sans font-bold text-soil-500">
              ⌘ F
            </kbd>
          </div>
        </div>
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-white border border-soil-200 flex items-center justify-center text-soil-600 hover:text-soil-900 hover:border-soil-300 transition-all shadow-sm">
          <Mail size={18} />
        </button>
        <div className="w-10 h-10 rounded-full bg-white border border-soil-200 flex items-center justify-center shadow-sm">
           <NotificationBell />
        </div>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-soil-200 cursor-pointer group">
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Rupesh" 
            alt="User avatar" 
            className="w-10 h-10 rounded-full bg-soil-200 border border-soil-300 group-hover:border-soil-500 transition-colors"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-heading font-bold text-soil-900 leading-tight">Rupesh Vishwakarma</p>
            <p className="text-xs font-body text-soil-500">rupesh@farmchain.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};
