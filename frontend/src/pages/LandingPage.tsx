import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

import heroImage from '../assets/images/hero-field-morning.jpg';
import step1Image from '../assets/images/farmer-sowing-field.jpg';
import step2Image from '../assets/images/soil-hand-closeup.jpg';
import step3Image from '../assets/images/mandi-market-morning.jpg';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section 
        className="relative h-screen min-h-[600px] flex items-end pb-24 px-6 md:px-12 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Subtle warm gradient overlay ONLY at the bottom third for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-soil-900/40 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-cream text-4xl md:text-6xl font-heading font-medium mb-4 leading-tight">
            Agricultural intelligence for every decision.
          </h1>
          <p className="text-cream/90 font-body text-lg md:text-xl mb-8 max-w-xl">
            From soil to market. Get data-driven recommendations, track costs, and connect directly with buyers.
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading text-soil-900 mb-12 text-center">
          How FarmChain Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <Card noPadding className="overflow-hidden flex flex-col">
            <div className="h-64 w-full relative">
              <img 
                src={step1Image} 
                alt="Farmer sowing field" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-soil-900/10" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <h3 className="font-heading text-xl text-soil-900 mb-2">1. Profile your Farm</h3>
              <p className="text-soil-700 font-body">
                Map your land and enter your soil type and water availability.
              </p>
            </div>
          </Card>

          {/* Step 2 */}
          <Card noPadding className="overflow-hidden flex flex-col">
            <div className="h-64 w-full relative">
              <img 
                src={step2Image} 
                alt="Close-up of soil" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-soil-900/10" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <h3 className="font-heading text-xl text-soil-900 mb-2">2. Get Recommendations</h3>
              <p className="text-soil-700 font-body">
                Receive data-backed crop choices and task schedules for your specific conditions.
              </p>
            </div>
          </Card>

          {/* Step 3 */}
          <Card noPadding className="overflow-hidden flex flex-col">
            <div className="h-64 w-full relative">
              <img 
                src={step3Image} 
                alt="Busy mandi market" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-soil-900/10" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <h3 className="font-heading text-xl text-soil-900 mb-2">3. Track the Market</h3>
              <p className="text-soil-700 font-body">
                Monitor real-time mandi prices and harvest at the optimal time for the best return.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};
