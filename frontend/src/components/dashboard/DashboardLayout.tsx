import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardTopHeader } from './DashboardTopHeader';
import { MobileNavigation } from './MobileNavigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-cream font-sans">
      <DashboardSidebar />
      <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
        <DashboardTopHeader />
        <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8 md:pb-8 bg-soil-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};
