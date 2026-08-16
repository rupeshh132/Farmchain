import React from 'react';
import { motion } from 'motion/react';

export const BentoPillars: React.FC = () => {
  return (
    <section className="bg-soil-950 py-24 px-6 md:px-12 border-y border-soil-800">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-heading text-cream font-bold tracking-tight">Our Core Pillars</h2>
          <p className="text-xl text-cream/60 font-body mt-4 max-w-2xl">
            FarmChain replaces guesswork with data science, providing end-to-end intelligence for the modern farmer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Box 1: Yield Prediction (Large Image) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 md:row-span-2 rounded-[2rem] relative overflow-hidden group shadow-2xl border border-white/10"
          >
            <img 
              src="/bento_farmer.jpg" 
              alt="Farmer using technology" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-soil-950 via-soil-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-10 left-10 right-10">
              <h3 className="text-7xl md:text-8xl text-primary font-heading font-bold opacity-80 mb-2">01</h3>
              <h4 className="text-3xl md:text-4xl text-cream font-bold mb-3 font-heading">Smart Yield Prediction</h4>
              <p className="text-lg text-cream/80 max-w-lg font-body leading-relaxed">
                Our ML models analyze your soil profile and local weather to predict your exact crop yield before you even sow.
              </p>
            </div>
          </motion.div>

          {/* Box 2: Disease Detection (Tall Text) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-1 md:row-span-1 rounded-[2rem] bg-terracotta-600 p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group border border-terracotta-500/50"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <h3 className="text-6xl text-white font-heading font-bold opacity-50">02</h3>
            <div>
              <h4 className="text-2xl text-white font-bold mb-3 font-heading">AI Disease Detection</h4>
              <p className="text-white/90 font-body leading-relaxed">
                Snap a picture of a diseased leaf. Our deep learning engine instantly identifies the pathogen and suggests treatments.
              </p>
            </div>
          </motion.div>

          {/* Box 3: Blockchain Traceability (Tall Text) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-1 md:row-span-1 rounded-[2rem] bg-soil-800 p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group border border-white/5"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-br-full pointer-events-none group-hover:scale-110 transition-transform" />
            <h3 className="text-6xl text-cream font-heading font-bold opacity-30">03</h3>
            <div>
              <h4 className="text-2xl text-cream font-bold mb-3 font-heading">Blockchain Traceability</h4>
              <p className="text-cream/70 font-body leading-relaxed">
                Generate QR codes for your harvest. Buyers can scan to view the complete immutable history of your produce.
              </p>
            </div>
          </motion.div>

          {/* Box 4: Market APIs (Wide Image) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="md:col-span-2 md:row-span-1 rounded-[2rem] relative overflow-hidden group shadow-2xl border border-white/10"
          >
            <img 
              src="/bento_mandi.jpg" 
              alt="Mandi trading market" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-soil-950 via-soil-950/80 to-transparent opacity-90" />
            <div className="absolute top-0 bottom-0 left-10 flex flex-col justify-center">
              <h3 className="text-6xl text-primary font-heading font-bold opacity-80 mb-2">04</h3>
              <h4 className="text-3xl text-cream font-bold mb-3 font-heading">Live Market APIs</h4>
              <p className="text-lg text-cream/80 max-w-sm font-body leading-relaxed">
                Monitor real-time mandi prices across states. Harvest and sell at the optimal time for the highest possible return on investment.
              </p>
            </div>
          </motion.div>

          {/* Box 5: Trust Metric (Small Square) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="md:col-span-1 md:row-span-1 rounded-[2rem] bg-primary p-10 flex flex-col justify-center items-center text-center shadow-2xl border border-white/20 hover:-translate-y-2 transition-transform"
          >
            <h3 className="text-7xl text-white font-heading font-bold mb-4">100<span className="text-4xl">%</span></h3>
            <p className="text-xl text-white/90 font-heading font-medium tracking-wide">
              DATA OWNERSHIP
            </p>
            <p className="text-white/70 font-body text-sm mt-2">Your farm. Your data.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
