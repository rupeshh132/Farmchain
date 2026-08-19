import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ramesh Singh',
    location: 'Punjab, India',
    crop: 'Wheat Farmer',
    quote: 'FarmChain told me exactly when to harvest. Made 20% extra profit this season by selling right before the price dropped!',
    rating: 5,
  },
  {
    name: 'Anjali Patel',
    location: 'Gujarat, India',
    crop: 'Cotton & Tomato',
    quote: 'The disease scanner caught a pest infestation early. Saved my entire tomato crop. The AI overlay is like magic.',
    rating: 5,
  },
  {
    name: 'Vikram Reddy',
    location: 'Telangana, India',
    crop: 'Paddy Farmer',
    quote: 'Tracing my paddy on the blockchain gave buyers so much confidence that they offered me a premium price. Incredible tech.',
    rating: 5,
  },
  {
    name: 'Surinder Kaur',
    location: 'Haryana, India',
    crop: 'Mustard',
    quote: 'I used to guess when to apply fertilizer. Now FarmChain calculates the exact day based on weather. Saved 30% on costs.',
    rating: 4,
  },
];

export const TestimonialMarquee: React.FC = () => {
  // Duplicate for seamless infinite marquee scroll
  const items = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-soil-950 border-t border-soil-800 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading text-cream mb-4 font-bold">Loved by farmers.</h2>
        <p className="text-xl text-cream/70 font-body max-w-2xl mx-auto">
          Join thousands of modern farmers who are transforming their yields with FarmChain.
        </p>
      </div>

      {/* Marquee Track Container */}
      <div className="relative flex w-full overflow-hidden">
        
        {/* Left/Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-soil-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-soil-950 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-4">
          {items.map((t, idx) => (
            <div 
              key={idx} 
              className="w-[350px] md:w-[450px] mx-4 bg-soil-900/50 backdrop-blur-md border border-soil-800 p-8 rounded-2xl shrink-0 shadow-xl relative group transition-transform hover:-translate-y-2"
            >
              <Quote className="absolute top-6 right-6 text-soil-800 w-12 h-12 opacity-50 group-hover:text-primary/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < t.rating ? 'fill-yellow-500 text-yellow-500' : 'fill-soil-800 text-soil-800'} 
                  />
                ))}
              </div>
              
              <p className="text-cream/90 font-body text-lg mb-8 leading-relaxed relative z-10">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-soil-800 pt-6">
                <div className="w-12 h-12 rounded-full bg-soil-800 flex items-center justify-center font-heading font-bold text-cream text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-cream">{t.name}</h4>
                  <p className="text-sm text-primary-light font-sans font-medium">{t.crop} • {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
