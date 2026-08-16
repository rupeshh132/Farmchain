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
import RotatingText from '../components/ui/RotatingText';
import BlurText from '../components/ui/BlurText';
import { ShinyText } from '../components/ui/ShinyText';
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
    <div className="min-h-screen bg-soil-950 -mt-24 selection:bg-primary/30">
      {/* 1. Hero Section - Cinematic Scroll Expand */}
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
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center animate-fade-in-up mt-16 pointer-events-auto px-4 md:px-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30 mb-6 text-sm font-medium backdrop-blur-md">
            <Zap size={16} className="text-yellow-400 fill-yellow-400" />
            <ShinyText text="Welcome to the future of farming" disabled={false} speed={3} color="#a3e635" shineColor="#ffffff" />
          </div>
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-heading font-bold mb-6 leading-[1.1] tracking-tight text-balance">
            Agricultural intelligence <br className="hidden md:block"/>for every{' '}
            <RotatingText
              texts={['Harvest.', 'Season.', 'Crop.', 'Decision.']}
              mainClassName="text-primary-light inline-flex overflow-hidden"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </h1>
          <BlurText
            text="From soil preparation to market sale. Get AI-driven recommendations, scan crops for diseases, and trace your produce on the blockchain."
            delay={30}
            animateBy="words"
            direction="top"
            className="text-cream/90 font-body text-base sm:text-xl md:text-2xl mb-8 max-w-2xl font-light leading-relaxed text-balance justify-center"
          />
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <button 
              onClick={handleCTA}
              className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 min-h-[44px] bg-primary text-white font-heading font-medium text-base sm:text-lg rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(202,138,4,0.6)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-soil-950 pointer-events-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                Enter Dashboard <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 min-h-[44px] bg-white/10 text-white font-heading font-medium text-base sm:text-lg rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all pointer-events-auto"
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
      <section id="how-it-works" className="py-10 md:py-16 px-4 md:px-8 bg-wheat-50 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-soil-900 mb-3 font-bold tracking-tight">How FarmChain Works</h2>
            <p className="text-base sm:text-xl text-soil-600 font-body leading-relaxed">Three simple steps to maximize your agricultural output.</p>
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
            accentColor="#6B8C5F"
            overlayColor="#3A2E22"
            textColor="#F7F3EA"
          />
        </div>
      </section>
      
      {/* 4.5 Profit Calculator */}
      <ProfitCalculator />

      {/* 4.6 Scrolling Testimonials */}
      <TestimonialMarquee />
      
      {/* 5. Final CTA Section */}
      <section className="py-10 md:py-16 px-4 md:px-8 bg-soil-900 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-4 md:mb-6 font-bold leading-tight">Ready to modernize your farm?</h2>
          <p className="text-base sm:text-xl text-cream/80 font-body mb-8 md:mb-10 leading-relaxed">Join thousands of farmers using FarmChain to increase yield and secure better market prices.</p>
          <button 
            onClick={handleCTA}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 min-h-[44px] bg-primary text-white font-heading font-semibold text-lg md:text-xl rounded-xl hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/20"
          >
            Start Farming Smarter
          </button>
        </div>
      </section>
      
      {/* 6. Massive Footer Interactive Text */}
      <section className="bg-soil-950 pb-12 pt-8 w-full overflow-hidden h-[300px] md:h-[400px]">
        <TextPressure 
          text="FARMCHAIN" 
          flex={true} 
          alpha={false} 
          stroke={false} 
          width={true} 
          weight={true} 
          italic={true} 
          textColor="#F7F3EA"
          minFontSize={48}
        />
      </section>
    </div>
  );
};
