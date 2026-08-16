import React, { useState } from 'react';
import { motion } from 'motion/react';

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
    <section className="py-24 px-6 md:px-12 bg-[#F9F6F0] relative overflow-hidden border-t border-soil-200">
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
        
        {/* Text Side - Typographic Focus */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6 inline-block border-b border-soil-900 pb-2">
            <span className="text-soil-900 font-mono text-sm uppercase tracking-[0.2em] font-bold">Projected Impact</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-heading text-soil-900 mb-8 font-bold leading-[1.1] tracking-tight">
            See how much <br className="hidden md:block"/>
            you could be <span className="italic font-light">earning.</span>
          </h2>
          
          <p className="text-xl text-soil-700 font-body mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            By optimizing irrigation, catching diseases early, and timing the market perfectly, FarmChain's precision models squeeze every bit of yield from your land.
          </p>
          
          {/* Typographic Features List */}
          <div className="space-y-8 text-left max-w-md mx-auto lg:mx-0">
            <div className="flex gap-6 items-start group">
              <div className="text-4xl font-heading font-bold text-primary shrink-0 w-24 border-b-2 border-primary/30 pb-2 group-hover:border-primary transition-colors">
                +18<span className="text-2xl">%</span>
              </div>
              <div className="pt-2">
                <h4 className="text-lg font-bold text-soil-900 font-heading mb-1">Average Yield Increase</h4>
                <p className="text-soil-600 font-body text-sm leading-relaxed">Through precision micro-climate weather forecasting and data-driven crop nutrition.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start group">
              <div className="text-4xl font-heading font-bold text-terracotta-500 shrink-0 w-24 border-b-2 border-terracotta-500/30 pb-2 group-hover:border-terracotta-500 transition-colors">
                -30<span className="text-2xl">%</span>
              </div>
              <div className="pt-2">
                <h4 className="text-lg font-bold text-soil-900 font-heading mb-1">Fertilizer Cost Reduction</h4>
                <p className="text-soil-600 font-body text-sm leading-relaxed">Applying exact nutrients only where needed via AI soil mapping.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start group">
              <div className="text-4xl font-heading font-bold text-soil-900 shrink-0 w-24 border-b-2 border-soil-900/30 pb-2 group-hover:border-soil-900 transition-colors tracking-tighter">
                MAX
              </div>
              <div className="pt-2">
                <h4 className="text-lg font-bold text-soil-900 font-heading mb-1">Peak Market Pricing</h4>
                <p className="text-soil-600 font-body text-sm leading-relaxed">Sell precisely when demand peaks using live Mandi predictive APIs.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Interactive Calculator Side - The "Ledger" */}
        <div className="flex-1 w-full max-w-lg perspective-1000">
          <motion.div 
            initial={{ rotateY: 10, opacity: 0, x: 20 }}
            whileInView={{ rotateY: 0, opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-[#F4F1E1] border border-soil-300 shadow-[20px_20px_60px_rgba(0,0,0,0.05),-1px_-1px_0_rgba(255,255,255,0.5)] p-10 relative"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.04%22/%3E%3C/svg%3E")' }}
          >
            {/* Top decorative lines to mimic a physical invoice/ledger */}
            <div className="flex flex-col gap-1 mb-8">
              <div className="w-full h-px bg-soil-800" />
              <div className="w-full h-0.5 bg-soil-800" />
            </div>
            
            <h3 className="text-3xl font-heading text-soil-900 mb-10 font-bold uppercase tracking-widest text-center">
              Profit Estimate
            </h3>
            
            <div className="mb-12">
              <div className="flex justify-between items-end mb-4 border-b border-soil-300 border-dashed pb-2">
                <label className="text-soil-800 font-mono text-sm uppercase tracking-wider font-bold">Land Size</label>
                <div className="text-3xl font-heading font-bold text-soil-900">
                  {acres} <span className="text-lg font-medium italic">Acres</span>
                </div>
              </div>
              
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={acres}
                onChange={(e) => setAcres(parseInt(e.target.value))}
                className="w-full h-2 bg-soil-300 appearance-none cursor-pointer accent-soil-900 hover:accent-primary transition-all rounded-none"
              />
              <div className="flex justify-between text-xs font-mono text-soil-500 mt-3 uppercase tracking-widest">
                <span>1 Acre</span>
                <span>50 Acres</span>
              </div>
            </div>
            
            {/* Receipt Totals Area */}
            <div className="border border-soil-800 p-8 relative bg-[#F9F7EF]">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-r border-b border-soil-800 bg-[#F4F1E1]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-l border-b border-soil-800 bg-[#F4F1E1]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-r border-t border-soil-800 bg-[#F4F1E1]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-l border-t border-soil-800 bg-[#F4F1E1]" />

              <div className="grid grid-cols-2 gap-6 border-b border-soil-300 pb-6 mb-6">
                <div>
                  <p className="text-xs font-mono text-soil-500 uppercase tracking-widest mb-2">Traditional</p>
                  <p className="font-heading font-medium text-xl text-soil-700">₹{traditionalRevenue.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2 font-bold">With FarmChain</p>
                  <p className="font-heading font-bold text-xl text-primary">₹{aiRevenue.toLocaleString('en-IN')}</p>
                </div>
              </div>
              
              <div className="relative">
                <p className="text-sm font-mono uppercase tracking-widest text-soil-800 font-bold mb-2">Net Extra Profit / Yr</p>
                
                <div className="flex items-start gap-1">
                  <span className="text-3xl font-heading text-soil-900 mt-1">₹</span>
                  <span className="text-6xl md:text-7xl font-heading font-bold text-soil-900 tracking-tighter">
                    {extraProfit.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Humanized Handwritten Accent */}
                <div className="absolute -right-8 -bottom-10 rotate-[-12deg] opacity-80 pointer-events-none hidden sm:block">
                  <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-6 -left-4 text-terracotta-500 w-full h-full">
                    <path d="M20,60 C40,20 100,10 110,40 C120,70 50,75 30,50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="5,5" />
                    <path d="M25,45 L30,50 L35,42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </svg>
                  <span className="font-serif italic text-terracotta-600 text-lg relative z-10 block ml-8 mt-6 whitespace-nowrap">
                    Pure growth!
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-soil-800 border-dashed text-center">
              <span className="font-mono text-[10px] text-soil-400 uppercase tracking-[0.3em]">Ref: FC-{new Date().getFullYear()}-EST</span>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};
