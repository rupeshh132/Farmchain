import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Scan, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

export const DiseaseDetectionInfoPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-soil-900 selection:bg-soil-900 selection:text-cream pb-24">
      {/* Header Section */}
      <section className="pt-2 md:pt-4 pb-16 px-4 md:px-8 border-b border-soil-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-3xl">
              <span className="font-sans font-medium text-xs tracking-wide text-soil-500 mb-6 block">Product / Disease Detection</span>
              <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight tracking-tight mb-6 text-soil-900">
                Identify pathogens <br/>in milliseconds.
              </h1>
            </div>
            <div className="max-w-md border-l border-soil-300 pl-6 py-2">
              <p className="font-body text-soil-700 text-lg leading-relaxed">
                Leverage advanced computer vision to diagnose crop diseases directly from your smartphone. FarmChain cross-references symptoms against thousands of known pathogens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
            
            {/* Visual Demo Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 md:order-1 bg-wheat-50 p-8 border border-soil-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628183188582-74720970db1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-20 grayscale" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-soil-300">
                  <span className="font-sans font-medium text-xs tracking-wide text-soil-700">Scan Results</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-[10px] font-sans font-medium tracking-wide">High Risk</span>
                </div>
                <div className="bg-white p-6 border border-soil-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-soil-100 pb-2">
                    <span className="font-sans font-medium text-sm text-soil-600">Detected Pathogen:</span>
                    <span className="font-bold font-sans font-medium text-red-600">Blight (Alternaria solani)</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-soil-100 pb-2">
                    <span className="font-sans font-medium text-sm text-soil-600">Confidence Score:</span>
                    <span className="font-bold">98.4%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="font-sans font-medium text-sm text-soil-600">Affected Area:</span>
                    <span className="font-bold text-soil-900">~14% of Leaf Surface</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="w-full justify-center">View Mitigation Protocol</Button>
                </div>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-2"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Stop outbreaks before they spread</h2>
              <p className="font-body text-soil-600 text-lg leading-relaxed mb-6">
                Early detection is critical. By the time human eyes notice widespread wilting, the pathogen has often already compromised the yield. Our computer vision models detect micro-lesions and color variations invisible to the naked eye.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Offline scanning capabilities for remote fields",
                  "Automatic localized weather risk correlation",
                  "Direct links to approved fungicide purchase orders"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans font-medium text-sm uppercase tracking-wide text-soil-700">
                    <div className="w-1.5 h-1.5 bg-soil-900" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigate('/disease-detection')} variant="outline">Try the Scanner Live</Button>
            </motion.div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8">
              <Scan className="mb-4 text-soil-900" size={24} />
              <h3 className="font-heading text-xl font-bold mb-3">Instant Analysis</h3>
              <p className="font-body text-soil-600 text-sm">
                Simply take a photo using your smartphone. The model processes the image locally or via our high-speed edge servers in under 2 seconds.
              </p>
            </Card>
            <Card className="p-8">
              <AlertTriangle className="mb-4 text-soil-900" size={24} />
              <h3 className="font-heading text-xl font-bold mb-3">Epidemic Alerts</h3>
              <p className="font-body text-soil-600 text-sm">
                If multiple farms in your radius detect the same pathogen, FarmChain automatically pushes a geo-fenced epidemic warning to your dashboard.
              </p>
            </Card>
            <Card className="p-8">
              <ShieldCheck className="mb-4 text-soil-900" size={24} />
              <h3 className="font-heading text-xl font-bold mb-3">Verified Protocols</h3>
              <p className="font-body text-soil-600 text-sm">
                Mitigation strategies are pulled directly from regional agricultural universities to ensure you are using safe, legal, and effective treatments.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
