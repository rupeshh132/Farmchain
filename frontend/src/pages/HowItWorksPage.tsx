import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Sprout, Database, Fingerprint, Banknote } from 'lucide-react';

const workflowSteps = [
  {
    step: "01",
    icon: <Sprout size={32} className="text-leaf-500" />,
    title: "Soil & Farm Initialization",
    description: "Begin by plotting your farm coordinates and inputting baseline soil health data. FarmChain immediately queries the ICAR database to establish a digital twin of your land.",
    details: ["GPS Coordinate Mapping", "N-P-K Baseline Entry", "Historical Yield Sync"]
  },
  {
    step: "02",
    icon: <Database size={32} className="text-leaf-500" />,
    title: "Continuous Data Logging",
    description: "Throughout the season, log daily expenses, weather anomalies, and crop health metrics. The ledger acts as a single source of truth for both economic and biological inputs.",
    details: ["Expense Tracking", "Pathogen Photo Scans", "Automated Weather Hooks"]
  },
  {
    step: "03",
    icon: <Fingerprint size={32} className="text-leaf-500" />,
    title: "Immutable Harvest Minting",
    description: "When the crop is harvested, the entire season's ledger is cryptographically hashed and minted to a blockchain. This ensures the origin and quality data can never be altered.",
    details: ["SHA-256 Hashing", "Decentralized Storage", "Verifiable QR Generation"]
  },
  {
    step: "04",
    icon: <Banknote size={32} className="text-leaf-500" />,
    title: "Mandi Integration & Sale",
    description: "Present your cryptographic proof to buyers or directly at the Mandi. Buyers can scan the QR code to verify pesticide usage and soil health, enabling you to command premium prices.",
    details: ["Price Forecasting", "Buyer Verification", "Direct Profit Calculation"]
  }
];

export const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-soil-900 selection:bg-soil-900 selection:text-cream pb-24">
      {/* Header Section */}
      <section className="pt-40 md:pt-48 pb-16 px-4 md:px-8 border-b border-soil-200">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-sans font-medium text-xs tracking-wide text-soil-500 mb-6 block">Operational Flow</span>
          <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight tracking-tight mb-6 text-soil-900">
            From soil to sale.
          </h1>
          <p className="font-body text-soil-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A transparent, step-by-step breakdown of how FarmChain digitizes and secures your agricultural lifecycle.
          </p>
        </div>
      </section>

      {/* Workflow Steps Section */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Line Connector (Desktop) */}
          <div className="hidden md:block absolute left-[31px] top-10 bottom-10 w-[1px] bg-soil-200 z-0" />

          <div className="space-y-16 md:space-y-24">
            {workflowSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start"
              >
                {/* Icon & Step Number */}
                <div className="flex flex-row md:flex-col items-center md:items-center gap-4 shrink-0 w-auto md:w-16 bg-cream py-2">
                  <div className="w-16 h-16 bg-wheat-50 border border-soil-200 flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  <span className="font-heading text-4xl md:text-5xl font-bold text-soil-300">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-2 flex-grow">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-soil-900">{step.title}</h3>
                  <p className="font-body text-soil-600 text-lg leading-relaxed mb-6">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {step.details.map((detail, i) => (
                      <span key={i} className="px-3 py-1 border border-soil-200 bg-white font-sans font-medium text-[10px] tracking-wide text-soil-700">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-12 px-4 md:px-8 text-center">
        <div className="max-w-2xl mx-auto border-t border-soil-200 pt-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-soil-900">Ready to begin the process?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={() => navigate('/signup')} className="w-full sm:w-auto">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/features')} className="w-full sm:w-auto">
              Technical Specs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
