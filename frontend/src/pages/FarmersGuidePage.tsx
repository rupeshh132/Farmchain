import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { BookOpen, FileText, CheckCircle, Video } from 'lucide-react';

export const FarmersGuidePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-soil-900 selection:bg-soil-900 selection:text-cream pb-24">
      {/* Header Section */}
      <section className="pt-2 md:pt-4 pb-16 px-4 md:px-8 border-b border-soil-200">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-sans font-medium text-xs tracking-wide text-soil-500 mb-6 block">Resources / Farmer's Guide</span>
          <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight tracking-tight mb-6 text-soil-900">
            Master the ledger.
          </h1>
          <p className="font-body text-soil-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive guides, tutorials, and best practices to help you maximize your agricultural yield and revenue using FarmChain.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="p-8 hover:bg-white transition-colors cursor-pointer group">
              <BookOpen className="mb-4 text-soil-500 group-hover:text-soil-900 transition-colors" size={32} />
              <h3 className="font-heading text-xl font-bold mb-3">Getting Started</h3>
              <p className="font-body text-soil-600 text-sm mb-6">
                Learn how to map your farm coordinates, input initial soil data, and set up your first crop cycle on the ledger.
              </p>
              <span className="font-sans font-medium text-xs font-bold tracking-wide text-soil-900 group-hover:underline">Read Guide &rarr;</span>
            </Card>

            <Card className="p-8 hover:bg-white transition-colors cursor-pointer group">
              <CheckCircle className="mb-4 text-soil-500 group-hover:text-soil-900 transition-colors" size={32} />
              <h3 className="font-heading text-xl font-bold mb-3">Best Practices</h3>
              <p className="font-body text-soil-600 text-sm mb-6">
                Discover techniques for optimal data logging, how often to take pathogen scans, and when to sync financial data.
              </p>
              <span className="font-sans font-medium text-xs font-bold tracking-wide text-soil-900 group-hover:underline">Read Guide &rarr;</span>
            </Card>

            <Card className="p-8 hover:bg-white transition-colors cursor-pointer group">
              <Video className="mb-4 text-soil-500 group-hover:text-soil-900 transition-colors" size={32} />
              <h3 className="font-heading text-xl font-bold mb-3">Video Tutorials</h3>
              <p className="font-body text-soil-600 text-sm mb-6">
                Step-by-step visual walkthroughs of the FarmChain dashboard, from checking Mandi prices to minting blockchain records.
              </p>
              <span className="font-sans font-medium text-xs font-bold tracking-wide text-soil-900 group-hover:underline">Watch Now &rarr;</span>
            </Card>
          </div>

          {/* Featured Article */}
          <div className="bg-wheat-50 border border-soil-200 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-grow">
                <span className="px-3 py-1 border border-soil-300 bg-white font-sans font-medium text-[10px] tracking-wide text-soil-700 mb-6 inline-block">Featured</span>
                <h2 className="font-heading text-3xl font-bold mb-4">How to read your ICAR Soil Health Report</h2>
                <p className="font-body text-soil-600 text-lg leading-relaxed mb-6 max-w-2xl">
                  Understanding your N-P-K (Nitrogen, Phosphorus, Potassium) values is critical. This deep-dive explains how FarmChain interprets government soil tests and turns them into actionable fertilizer recommendations.
                </p>
                <button className="font-sans font-medium text-sm font-bold tracking-wide text-soil-900 border-b border-soil-900 pb-1 hover:text-primary hover:border-primary transition-colors">
                  Read Full Article
                </button>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <FileText size={120} className="text-soil-200" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
