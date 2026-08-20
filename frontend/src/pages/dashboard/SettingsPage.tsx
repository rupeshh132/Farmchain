import React, { useState } from 'react';
import { User, Map, Bell, Globe, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-soil-900 mb-2">Settings</h1>
        <p className="text-soil-600 font-body">Manage your account preferences and farm configuration.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl p-2 border border-soil-200 flex flex-col gap-1 shadow-sm">
            {[
              { id: 'profile', label: 'Profile & Account', icon: <User size={18} /> },
              { id: 'farm', label: 'Farm Configuration', icon: <Map size={18} /> },
              { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
              { id: 'language', label: 'Language', icon: <Globe size={18} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium transition-all text-left ${
                  activeTab === tab.id 
                    ? 'bg-soil-900 text-white shadow-sm' 
                    : 'text-soil-600 hover:bg-soil-50 hover:text-soil-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl p-6 border border-soil-200 min-h-[400px] shadow-sm">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-heading font-bold text-soil-900 border-b border-soil-100 pb-4">Profile Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-soil-700 mb-2">Full Name</label>
                    <input type="text" defaultValue="Rupesh Vishwakarma" className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:ring-2 focus:ring-soil-900/10 focus:border-soil-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soil-700 mb-2">Email Address</label>
                    <input type="email" defaultValue="vrupesh132@gmail.com" className="w-full px-4 py-2 border border-soil-200 rounded-lg bg-soil-50 text-soil-500 cursor-not-allowed" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soil-700 mb-2">Phone Number</label>
                    <input type="tel" defaultValue="+91 9876543210" className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:ring-2 focus:ring-soil-900/10 focus:border-soil-400" />
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="flex items-center gap-2"><Save size={16}/> Save Changes</Button>
                </div>
              </div>
            )}

            {activeTab === 'farm' && (
              <div className="space-y-6">
                <h2 className="text-xl font-heading font-bold text-soil-900 border-b border-soil-100 pb-4">Farm Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-soil-700 mb-2">Farm Location (GPS)</label>
                    <input type="text" defaultValue="28.7041° N, 77.1025° E" className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:ring-2 focus:ring-soil-900/10 focus:border-soil-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soil-700 mb-2">Total Area (Acres)</label>
                    <input type="number" defaultValue="5.2" className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:ring-2 focus:ring-soil-900/10 focus:border-soil-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soil-700 mb-2">Soil Baseline Type</label>
                    <select className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:ring-2 focus:ring-soil-900/10 focus:border-soil-400 bg-white">
                      <option>Alluvial Soil</option>
                      <option>Black Soil (Regur)</option>
                      <option>Red Soil</option>
                      <option>Laterite Soil</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="flex items-center gap-2"><Save size={16}/> Update Configuration</Button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-heading font-bold text-soil-900 border-b border-soil-100 pb-4">Alert Preferences</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Weather & Storm Alerts', desc: 'Get SMS when severe weather is approaching.' },
                    { title: 'Disease Risk Warnings', desc: 'Alerts when local ML models detect high pathogen spread.' },
                    { title: 'Mandi Price Drops', desc: 'Email digest of weekly crop price changes.' },
                    { title: 'System Diagnostics', desc: 'Warnings when your app is out of sync or offline.' }
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-soil-100 rounded-xl">
                      <div>
                        <h4 className="font-bold text-soil-900 text-sm mb-1">{alert.title}</h4>
                        <p className="text-xs text-soil-600">{alert.desc}</p>
                      </div>
                      <label htmlFor={`toggle-${i}`} className="flex items-center cursor-pointer relative">
                        <input type="checkbox" id={`toggle-${i}`} className="sr-only peer" defaultChecked={i < 2} />
                        <div className="w-11 h-6 bg-soil-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-soil-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-soil-900"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'language' && (
              <div className="space-y-6">
                <h2 className="text-xl font-heading font-bold text-soil-900 border-b border-soil-100 pb-4">Language Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center justify-between p-4 border-2 border-soil-900 rounded-xl bg-soil-50">
                    <span className="font-bold text-soil-900">English (US)</span>
                    <div className="w-4 h-4 rounded-full bg-soil-900 border-2 border-white ring-2 ring-soil-900" />
                  </button>
                  <button className="flex items-center justify-between p-4 border border-soil-200 rounded-xl hover:border-soil-300">
                    <span className="font-medium text-soil-700">हिन्दी (Hindi)</span>
                    <div className="w-4 h-4 rounded-full border-2 border-soil-300" />
                  </button>
                  <button className="flex items-center justify-between p-4 border border-soil-200 rounded-xl hover:border-soil-300">
                    <span className="font-medium text-soil-700">मराठी (Marathi)</span>
                    <div className="w-4 h-4 rounded-full border-2 border-soil-300" />
                  </button>
                  <button className="flex items-center justify-between p-4 border border-soil-200 rounded-xl hover:border-soil-300">
                    <span className="font-medium text-soil-700">ਪੰਜਾਬੀ (Punjabi)</span>
                    <div className="w-4 h-4 rounded-full border-2 border-soil-300" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
