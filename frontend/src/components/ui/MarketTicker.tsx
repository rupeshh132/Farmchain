import React from 'react';
import { TrendingUp, TrendingDown, CircleAlert } from 'lucide-react';

const mockMandiData = [
  { crop: 'Wheat (Lokwan)', price: 2275, change: 1.2, up: true },
  { crop: 'Tomato (Desi)', price: 1500, change: -0.5, up: false },
  { crop: 'Potato (Jyoti)', price: 1100, change: 2.0, up: true },
  { crop: 'Onion (Nashik)', price: 2150, change: 4.1, up: true },
  { crop: 'Soybean (Yellow)', price: 4600, change: -1.1, up: false },
  { crop: 'Cotton (J34)', price: 5800, change: 0.8, up: true },
  { crop: 'Mustard (Black)', price: 5100, change: -0.2, up: false },
  { crop: 'Paddy (Basmati)', price: 3200, change: 1.5, up: true },
];

export const MarketTicker: React.FC = () => {
  // Duplicate array to create a seamless infinite scroll effect
  const tickerItems = [...mockMandiData, ...mockMandiData];

  return (
    <div className="w-full bg-soil-950 border-y border-soil-800 text-cream overflow-hidden py-3 relative z-20 flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      
      {/* "Live" Badge */}
      <div className="absolute left-0 top-0 bottom-0 bg-soil-950 z-10 px-4 md:px-8 flex items-center border-r border-soil-800 shadow-[20px_0_20px_-10px_rgba(38,30,22,1)]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="font-mono text-sm font-bold tracking-widest text-white hidden md:block">LIVE MANDI</span>
        </div>
      </div>

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] ml-12 md:ml-48">
        {tickerItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 px-6 border-r border-soil-800/50 min-w-max">
            <span className="font-heading font-medium text-cream">{item.crop}</span>
            <span className="font-mono font-bold">₹{item.price.toLocaleString('en-IN')}<span className="text-xs text-cream/50 font-normal">/qtl</span></span>
            
            <div className={`flex items-center gap-1 text-xs font-mono font-bold px-1.5 py-0.5 rounded ${item.up ? 'text-leaf-500 bg-leaf-500/10' : 'text-red-400 bg-red-400/10'}`}>
              {item.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {item.change > 0 ? '+' : ''}{item.change}%
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};
