import React, { useState } from 'react';
import { BookOpen, MessageSquare, HelpCircle, Users, Activity, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const HelpPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('guides');

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-soil-900 mb-2">Help & Support</h1>
        <p className="text-soil-600 font-body">Get help using FarmChain or contact our agronomy experts.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl p-2 border border-soil-200 flex flex-col gap-1 shadow-sm">
            {[
              { id: 'guides', label: 'App Walkthrough', icon: <BookOpen size={18} /> },
              { id: 'support', label: 'Contact Expert', icon: <MessageSquare size={18} /> },
              { id: 'faqs', label: 'FAQs', icon: <HelpCircle size={18} /> },
              { id: 'community', label: 'Community', icon: <Users size={18} /> },
              { id: 'diagnostics', label: 'System Status', icon: <Activity size={18} /> }
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
            
            {activeTab === 'guides' && (
              <div className="space-y-6">
                <h2 className="text-xl font-heading font-bold text-soil-900 border-b border-soil-100 pb-4">App Walkthrough & Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "How to scan a diseased crop", desc: "Step-by-step guide on using the ML camera." },
                    { title: "Logging daily farm tasks", desc: "Learn how to track labor and input costs." },
                    { title: "Understanding Mandi Prices", desc: "How to interpret the market trends and forecasts." },
                    { title: "Syncing with ICAR Data", desc: "How to pull the latest soil baselines." }
                  ].map((guide, i) => (
                    <div key={i} className="p-4 border border-soil-200 rounded-xl hover:border-soil-400 cursor-pointer transition-colors group">
                      <div className="w-10 h-10 bg-soil-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-soil-900 group-hover:text-white transition-colors">
                        <BookOpen size={18} />
                      </div>
                      <h4 className="font-bold text-soil-900 text-sm mb-1">{guide.title}</h4>
                      <p className="text-xs text-soil-600">{guide.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-6">
                <h2 className="text-xl font-heading font-bold text-soil-900 border-b border-soil-100 pb-4">Contact Agronomy Expert</h2>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-soil-700 mb-2">Subject</label>
                    <input type="text" placeholder="e.g. Tomato leaves turning yellow" className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:ring-2 focus:ring-soil-900/10 focus:border-soil-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soil-700 mb-2">Describe the issue</label>
                    <textarea rows={5} placeholder="Please provide as much detail as possible..." className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:ring-2 focus:ring-soil-900/10 focus:border-soil-400"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soil-700 mb-2">Attach Photos (Optional)</label>
                    <input type="file" className="text-sm text-soil-600" />
                  </div>
                  <Button className="flex items-center gap-2"><Send size={16}/> Submit Support Ticket</Button>
                </form>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <h2 className="text-xl font-heading font-bold text-soil-900 border-b border-soil-100 pb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: "How do I verify blockchain data?", a: "Every task logged in your Field Journal has a unique hash. You can view this on the Blockchain Traceability page." },
                    { q: "Is the ML prediction 100% accurate?", a: "Our models have a 94%+ confidence score, but weather anomalies can always affect actual yields." },
                    { q: "Does the app work without internet?", a: "Yes! You can log tasks and take photos offline. They will sync automatically when you reconnect." }
                  ].map((faq, i) => (
                    <div key={i} className="p-4 border border-soil-100 rounded-xl bg-soil-50">
                      <h4 className="font-bold text-soil-900 text-sm mb-2">Q: {faq.q}</h4>
                      <p className="text-sm text-soil-700">A: {faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'community' && (
              <div className="space-y-6 text-center py-8">
                <div className="w-16 h-16 bg-soil-100 rounded-full flex items-center justify-center mx-auto mb-4 text-soil-900">
                  <Users size={32} />
                </div>
                <h2 className="text-xl font-heading font-bold text-soil-900 mb-2">Farmer Community Forum</h2>
                <p className="text-soil-600 text-sm max-w-md mx-auto mb-6">
                  Join thousands of other farmers to share tips, ask questions, and discuss local market trends.
                </p>
                <Button onClick={() => window.open('/community', '_blank')}>Go to Community Forum</Button>
              </div>
            )}

            {activeTab === 'diagnostics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-heading font-bold text-soil-900 border-b border-soil-100 pb-4">System Diagnostics</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-soil-200 rounded-xl">
                    <span className="font-medium text-soil-900">Network Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">Online</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-soil-200 rounded-xl">
                    <span className="font-medium text-soil-900">Local Storage Sync</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">Synced (0 pending)</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-soil-200 rounded-xl">
                    <span className="font-medium text-soil-900">App Version</span>
                    <span className="text-sm text-soil-600 font-mono">v1.2.0 (Build 445)</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full">Run Full Diagnostic Check</Button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
