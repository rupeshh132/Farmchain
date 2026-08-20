import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Brain, Sprout, ShieldCheck, Activity, BarChart3, CloudRain } from 'lucide-react';

const featuresList = [
  {
    icon: <Brain size={24} className="text-soil-900" />,
    title: "Yield Prediction (ML)",
    description: "Our proprietary machine learning models analyze historical soil data and local weather patterns to forecast crop yield with remarkable accuracy before you even plant a seed.",
    points: ["90%+ Accuracy Models", "Variety-specific tuning", "Historical parity checks"]
  },
  {
    icon: <ShieldCheck size={24} className="text-soil-900" />,
    title: "Immutable Traceability",
    description: "Every harvest is minted to a decentralized blockchain ledger, creating an immutable timeline from sowing to sale. This provides unmatched transparency for buyers and premium pricing for your crops.",
    points: ["Cryptographic Proof", "QR Code generation", "Public/Private verification"]
  },
  {
    icon: <Activity size={24} className="text-soil-900" />,
    title: "Computer Vision Diagnostics",
    description: "Take a picture of any struggling plant and let our computer vision models identify diseases and nutrient deficiencies in milliseconds. Actionable mitigation strategies are provided instantly.",
    points: ["Real-time pathogen detection", "Pesticide recommendations", "Early warning alerts"]
  },
  {
    icon: <CloudRain size={24} className="text-soil-900" />,
    title: "Micro-climate Risk Scoring",
    description: "Hyper-local weather API integrations provide dynamic risk scoring for your specific farm coordinates, allowing you to deploy mitigation strategies before severe weather hits.",
    points: ["Flood & Drought indices", "Frost warnings", "Optimal sowing windows"]
  },
  {
    icon: <BarChart3 size={24} className="text-soil-900" />,
    title: "Economic Ledger",
    description: "Track all input costs—from seeds to labor—against predicted output revenue. FarmChain operates as a dual ledger for both biological and economic farm health.",
    points: ["P&L Statements", "Cost per acre analytics", "Dynamic market pricing"]
  },
  {
    icon: <Sprout size={24} className="text-soil-900" />,
    title: "ICAR Crop Rotation Engine",
    description: "Backed by the Indian Council of Agricultural Research database, the engine suggests scientifically sound crop rotations to naturally replenish soil nitrogen and break pest cycles.",
    points: ["Nitrogen fixing analysis", "Soil health recovery", "Pest cycle disruption"]
  }
];

export const FeaturesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-cream text-soil-900 selection:bg-soil-900 selection:text-cream">
      {/* Header Section */}
      <section className="pt-2 md:pt-4 pb-16 px-4 md:px-8 border-b border-soil-200">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-end"
          >
            <div className="max-w-3xl">
              <span className="font-sans font-medium text-xs tracking-wide text-soil-500 mb-4 block">System Capabilities</span>
              <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight tracking-tight text-soil-900">
                Technical overview <br/>of the ledger.
              </h1>
            </div>
            <div className="max-w-md border-l border-soil-300 pl-6 py-2">
              <p className="font-body text-soil-700 text-lg">
                FarmChain replaces guesswork with data science, providing end-to-end intelligence for the modern agricultural enterprise.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresList.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:bg-white transition-colors duration-300">
                  <div className="mb-6 inline-flex p-3 border border-soil-200 bg-wheat-50">
                    {feature.icon}
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="font-body text-soil-600 mb-6 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                  
                  <div className="border-t border-soil-200 pt-4 mt-auto">
                    <ul className="space-y-2">
                      {feature.points.map((point, i) => (
                        <li key={i} className="font-sans font-medium text-[10px] tracking-wide text-soil-700 flex items-center gap-2">
                          <span className="w-1 h-1 bg-soil-400 block" /> {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 border-t border-soil-200 bg-wheat-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-soil-900">Ready to integrate?</h2>
          <p className="font-body text-lg text-soil-600 mb-10">
            Initialize your farm on the ledger today and start maximizing your operational efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={() => navigate('/signup')} className="w-full sm:w-auto">
              Initialize Ledger
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/how-it-works')} className="w-full sm:w-auto">
              View Workflow
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
