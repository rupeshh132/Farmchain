import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { ArrowRight, Zap } from 'lucide-react';

import heroImage from '../assets/images/hero-field-morning.jpg';
import step1Image from '../assets/images/farmer-sowing-field.jpg';
import step2Image from '../assets/images/soil-hand-closeup.jpg';
import step3Image from '../assets/images/mandi-market-morning.jpg';

import { AccordionGallery } from '../components/ui/AccordionGallery';

import { ScrollExpand } from '../components/ui/ScrollExpand';
import { TextPressure } from '../components/ui/TextPressure';
import { MarketTicker } from '../components/ui/MarketTicker';
import { ProfitCalculator } from '../components/ui/ProfitCalculator';
import { ComparisonSlider } from '../components/ui/ComparisonSlider';
import { TestimonialMarquee } from '../components/ui/TestimonialMarquee';
import { BentoPillars } from '../components/ui/BentoPillars';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCTA = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-soil-900 -mt-24 selection:bg-leaf-700/30 selection:text-white">
      <ScrollExpand
        src={heroImage}
        title="FARMCHAIN"
        scrollHint="SCROLL TO EXPLORE"
        useWindowScroll={true}
        startWidth={60}
        startHeight={60}
        mediaZoom={1.3}
        scrollDistance={1.2}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center animate-fade-in-up mt-16 md:mt-24 pointer-events-auto px-4 md:px-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#133D2A] text-leaf-700 border border-leaf-700/30 mb-6 md:mb-8 text-sm font-semibold tracking-wide">
            <Zap size={16} className="text-leaf-700 fill-leaf-700" />
            <span>Intelligent Ledger</span>
          </div>
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold mb-6 md:mb-8 leading-[1.1] tracking-tight max-w-[90vw] sm:max-w-none">
            Agricultural intelligence <br className="hidden md:block"/><span className="bg-[#133D2A] text-leaf-700 px-4 py-1 rounded-full rotate-[-2deg] inline-block mt-2">for every decision.</span>
          </h1>
          <p className="text-cream/90 font-body text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-2xl font-light leading-relaxed text-balance justify-center px-2">
            From soil preparation to market sale. Get data-driven recommendations, scan crops for diseases, and trace your produce on the blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-2 sm:px-0 mt-4">
            <button 
              onClick={handleCTA}
              className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 md:py-4 bg-leaf-700 text-soil-900 font-sans font-semibold rounded-full border-transparent hover:bg-leaf-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-700 focus-visible:ring-offset-2 focus-visible:ring-offset-soil-900 active:scale-95 pointer-events-auto shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Enter Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => navigate('/how-it-works')}
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 md:py-4 bg-transparent text-white font-sans font-semibold rounded-full border-2 border-[#E5E9E3]/30 hover:border-white hover:bg-white hover:text-soil-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-soil-900 active:scale-95 pointer-events-auto"
            >
              See how it works
            </button>
          </div>
        </div>
      </ScrollExpand>

      {/* 1.5 Real-time Market Ticker */}
      <MarketTicker />

      {/* 2. Bento Grid Features Section */}
      <BentoPillars />

      {/* 3.5 Before & After AI Comparison */}
      <ComparisonSlider 
        beforeImage="/farm_traditional.jpg"
        afterImage="/farm_ai_overlay.jpg"
      />

      {/* 4. Enhanced "How it Works" Section */}
      <section id="how-it-works" className="py-20 md:py-32 px-4 md:px-8 bg-cream border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading text-soil-900 mb-6 font-extrabold tracking-tight">How FarmChain Works</h2>
            <p className="text-lg sm:text-xl text-soil-600 font-body leading-relaxed max-w-2xl mx-auto">Three simple steps to digitize your farm and maximize agricultural output.</p>
          </div>
          
          <AccordionGallery 
            items={[
              {
                image: step1Image,
                label: '1. Profile your Farm',
                description: 'Map your land digitally. Enter your soil composition, pH levels, and water availability to build your farm\'s digital twin.'
              },
              {
                image: step2Image,
                label: '2. Get AI Insights',
                description: 'Receive personalized, data-backed crop choices. Track daily tasks, input costs, and weather forecasts specific to your region.'
              },
              {
                image: step3Image,
                label: '3. Track the Market',
                description: 'Monitor real-time mandi prices across states. Harvest and sell at the optimal time for the highest possible return on investment.'
              }
            ]}
            height={500}
            expandRatio={0.6}
            accentColor="#C6F135"
            overlayColor="#0B2E1E"
            textColor="#F4F6F3"
          />
        </div>
      </section>
      
      {/* 4.5 Profit Calculator */}
      <ProfitCalculator />

      {/* 4.6 Scrolling Testimonials */}
      <TestimonialMarquee />
      
      {/* 5. Final CTA Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-soil-900 text-center border-t border-soil-700">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading text-cream mb-6 md:mb-8 font-extrabold leading-tight">Ready to <span className="bg-[#133D2A] text-leaf-700 px-4 py-1 rounded-full rotate-[2deg] inline-block">modernize</span> your farm?</h2>
          <p className="text-lg sm:text-xl text-cream/80 font-body mb-10 md:mb-12 leading-relaxed">Join thousands of farmers using FarmChain to increase yield and secure better market prices.</p>
          <button 
            onClick={handleCTA}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-5 bg-leaf-700 text-soil-900 font-sans font-semibold rounded-full hover:bg-leaf-500 transition-colors shadow-lg"
          >
            Start Farming Smarter
          </button>
        </div>
      </section>
      
      {/* 6. Massive Footer Interactive Text */}
      <section className="bg-soil-900 pb-12 pt-8 w-full overflow-hidden h-[300px] md:h-[400px]">
        <TextPressure 
          text="FARMCHAIN" 
          flex={true} 
          alpha={false} 
          stroke={false} 
          width={true} 
          weight={true} 
          italic={false} 
          textColor="#133D2A"
          minFontSize={48}
        />
      </section>
    </div>
  );
};
