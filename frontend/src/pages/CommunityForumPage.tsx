import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MessageSquare, Users, ThumbsUp, Search } from 'lucide-react';

export const CommunityForumPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-soil-900 selection:bg-soil-900 selection:text-cream pb-24">
      {/* Header Section */}
      <section className="pt-2 md:pt-4 pb-16 px-4 md:px-8 border-b border-soil-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-3xl">
              <span className="font-sans font-medium text-xs tracking-wide text-soil-500 mb-6 block">Resources / Community Forum</span>
              <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight tracking-tight mb-6 text-soil-900">
                Shared knowledge. <br/>Better yields.
              </h1>
            </div>
            <div className="max-w-md border-l border-soil-300 pl-6 py-2">
              <p className="font-body text-soil-700 text-lg leading-relaxed">
                Connect with thousands of other FarmChain users. Share mitigation strategies for regional pathogens, discuss Mandi price trends, and get advice on crop rotation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Main Forum List */}
          <main className="lg:w-2/3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl font-bold">Trending Discussions</h2>
              <Button onClick={() => navigate('/signup')} variant="outline">New Topic</Button>
            </div>
            
            <div className="space-y-4">
              {[
                { 
                  title: "Mitigation for late blight in early potatoes?", 
                  author: "FarmChain_North", 
                  replies: 42, 
                  tag: "Disease Protocol",
                  time: "2 hours ago"
                },
                { 
                  title: "Any insights on the sudden drop in soybean prices at Indore Mandi?", 
                  author: "AgriTrader99", 
                  replies: 18, 
                  tag: "Market Trends",
                  time: "5 hours ago"
                },
                { 
                  title: "Integrating FarmChain API with my custom irrigation IoT setup", 
                  author: "TechFarmer", 
                  replies: 56, 
                  tag: "API Integration",
                  time: "1 day ago"
                },
                { 
                  title: "Best cover crops to restore Nitrogen after heavy corn yield?", 
                  author: "SoilMaster", 
                  replies: 112, 
                  tag: "Soil Health",
                  time: "2 days ago"
                }
              ].map((topic, i) => (
                <div key={i} className="bg-white p-6 border border-soil-200 hover:border-soil-900 transition-colors cursor-pointer group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <span className="inline-block px-2 py-1 bg-wheat-50 border border-soil-200 font-sans font-medium text-[10px] tracking-wide text-soil-700 mb-3">
                        {topic.tag}
                      </span>
                      <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors">{topic.title}</h3>
                      <div className="flex items-center gap-4 font-sans font-medium text-xs text-soil-500">
                        <span>By {topic.author}</span>
                        <span>&bull;</span>
                        <span>{topic.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-wheat-50 px-3 py-2 border border-soil-200">
                      <MessageSquare size={16} className="text-soil-600" />
                      <span className="font-sans font-medium text-sm font-bold text-soil-900">{topic.replies}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="font-sans font-medium text-sm font-bold tracking-wide text-soil-900 border-b border-soil-900 pb-1 hover:text-primary hover:border-primary transition-colors">
                Load More Discussions
              </button>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              {/* Search */}
              <div className="bg-wheat-50 p-6 border border-soil-200">
                <div className="flex items-center gap-3 border-b border-soil-900 pb-2 mb-4">
                  <Search size={18} className="text-soil-900" />
                  <input type="text" placeholder="Search the forum..." className="bg-transparent border-none outline-none w-full font-sans font-medium text-sm text-soil-900 placeholder-soil-500" />
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white p-6 border border-soil-200">
                <h4 className="font-heading text-lg font-bold mb-6 border-b border-soil-200 pb-2">Community Stats</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-soil-600">
                      <Users size={16} />
                      <span className="font-sans font-medium text-sm">Active Farmers</span>
                    </div>
                    <span className="font-sans font-medium text-sm font-bold text-soil-900">12,450+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-soil-600">
                      <MessageSquare size={16} />
                      <span className="font-sans font-medium text-sm">Total Topics</span>
                    </div>
                    <span className="font-sans font-medium text-sm font-bold text-soil-900">8,921</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-soil-600">
                      <ThumbsUp size={16} />
                      <span className="font-sans font-medium text-sm">Solutions Accepted</span>
                    </div>
                    <span className="font-sans font-medium text-sm font-bold text-soil-900">4,190</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </div>
  );
};
