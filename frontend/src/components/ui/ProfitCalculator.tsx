import React, { useState } from 'react';
import { IndianRupee, TrendingUp, Sparkles, Leaf } from 'lucide-react';
import { Card } from './Card';

export const ProfitCalculator: React.FC = () => {
  const [acres, setAcres] = useState<number>(5);
  
  // Base constants for the calculator
  const baseYieldPerAcreKg = 2500; // Average yield without AI
  const basePricePerKg = 22;
  const aiYieldIncreasePercent = 0.18; // 18% increase with AI
  const aiPriceIncreasePercent = 0.05; // 5% better price by timing the market
  
  // Calculations
  const traditionalYield = acres * baseYieldPerAcreKg;
  const traditionalRevenue = traditionalYield * basePricePerKg;
  
  const aiYield = acres * (baseYieldPerAcreKg * (1 + aiYieldIncreasePercent));
  const aiRevenue = aiYield * (basePricePerKg * (1 + aiPriceIncreasePercent));
  
  const extraProfit = Math.round(aiRevenue - traditionalRevenue);
  
  return (
    <section className="py-24 px-6 md:px-12 bg-cream overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-terracotta-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Text Side */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/10 text-terracotta-500 border border-terracotta-500/20 mb-6 text-sm font-medium">
            <TrendingUp size={16} />
            Data-Backed Returns
          </div>
          <h2 className="text-4xl md:text-5xl font-heading text-soil-900 mb-6 font-bold leading-tight">
            See how much you <br className="hidden md:block"/>
            could be <span className="text-primary italic">earning.</span>
          </h2>
          <p className="text-xl text-soil-700 font-body mb-8 max-w-xl mx-auto lg:mx-0">
            By optimizing irrigation, catching diseases early, and timing the market perfectly, FarmChain's AI helps you squeeze every bit of profit from your land.
          </p>
          <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-leaf-500 shrink-0 mt-1" />
              <span className="text-soil-800 font-body">Average 18% increase in crop yield</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-leaf-500 shrink-0 mt-1" />
              <span className="text-soil-800 font-body">Up to 30% reduction in fertilizer costs</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-leaf-500 shrink-0 mt-1" />
              <span className="text-soil-800 font-body">Sell at peak market prices</span>
            </li>
          </ul>
        </div>
        
        {/* Interactive Calculator Side */}
        <div className="flex-1 w-full max-w-lg">
          <Card className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-primary/10 p-8 relative overflow-hidden group">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            
            <h3 className="text-2xl font-heading text-soil-900 mb-8 font-semibold flex items-center gap-2">
              <Sparkles className="text-yellow-500" /> AI Profit Calculator
            </h3>
            
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <label className="text-soil-700 font-body font-medium">Your Farm Size</label>
                <div className="text-3xl font-heading font-bold text-primary">
                  {acres} <span className="text-lg text-soil-600 font-medium">Acres</span>
                </div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={acres}
                onChange={(e) => setAcres(parseInt(e.target.value))}
                className="w-full h-3 bg-soil-200 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-light transition-all"
              />
              <div className="flex justify-between text-xs font-mono text-soil-500 mt-2 uppercase tracking-wider">
                <span>1 Acre</span>
                <span>50 Acres</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-soil-950 to-soil-900 rounded-2xl p-6 text-cream relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              
              <p className="text-sm font-mono uppercase tracking-wider text-cream/70 mb-2">Estimated Extra Profit / Year</p>
              <div className="flex items-baseline gap-2 mb-6">
                <IndianRupee size={32} className="text-primary-light" />
                <span className="text-5xl font-heading font-bold text-white tracking-tight">
                  {extraProfit.toLocaleString('en-IN')}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-cream/10 pt-4">
                <div>
                  <p className="text-xs font-mono text-cream/50 uppercase mb-1">Traditional</p>
                  <p className="font-heading font-medium">₹{traditionalRevenue.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-cream/50 uppercase mb-1 flex items-center gap-1"><Leaf size={10} className="text-primary-light"/> With AI</p>
                  <p className="font-heading font-medium text-primary-light">₹{aiRevenue.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
      </div>
    </section>
  );
};

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}
