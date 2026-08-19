import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Brain, LineChart, Cpu, Database } from 'lucide-react';

export const YieldPredictionPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-soil-900 selection:bg-soil-900 selection:text-cream pb-24">
      {/* Header Section */}
      <section className="pt-40 md:pt-48 pb-16 px-4 md:px-8 border-b border-soil-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-3xl">
              <span className="font-sans font-medium text-xs tracking-wide text-soil-500 mb-6 block">Product / Yield Prediction</span>
              <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight tracking-tight mb-6 text-soil-900">
                Forecasting the <br/>future of your farm.
              </h1>
            </div>
            <div className="max-w-md border-l border-soil-300 pl-6 py-2">
              <p className="font-body text-soil-700 text-lg leading-relaxed">
                FarmChain's proprietary ML models analyze decades of historical data alongside real-time soil and weather metrics to predict crop yield with unprecedented accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">How our models work</h2>
              <p className="font-body text-soil-600 text-lg leading-relaxed mb-6">
                Instead of relying solely on intuition, our engine ingests multi-dimensional datasets. We cross-reference your specific N-P-K soil baselines with hyper-local micro-climate forecasts to generate dynamic yield projections.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Historical satellite imagery analysis",
                  "Variety-specific phenology tracking",
                  "Dynamic adjustment based on daily weather data"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans font-medium text-sm uppercase tracking-wide text-soil-700">
                    <div className="w-1.5 h-1.5 bg-soil-900" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigate('/signup')}>Initialize Your Farm</Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 bg-wheat-50 p-8 border border-soil-200"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-soil-200">
                <span className="font-sans font-medium text-xs tracking-wide text-soil-500">Live Model Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-[10px] font-sans font-medium tracking-wide">Operational</span>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between font-sans font-medium text-sm mb-2 text-soil-600">
                    <span>Accuracy Confidence</span>
                    <span className="text-soil-900 font-bold">94.2%</span>
                  </div>
                  <div className="h-1 w-full bg-soil-200">
                    <div className="h-1 bg-soil-900 w-[94.2%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-sans font-medium text-sm mb-2 text-soil-600">
                    <span>Data Points Analyzed</span>
                    <span className="text-soil-900 font-bold">4.2B+</span>
                  </div>
                  <div className="h-1 w-full bg-soil-200">
                    <div className="h-1 bg-soil-900 w-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8">
              <Database className="mb-4 text-soil-900" size={24} />
              <h3 className="font-heading text-xl font-bold mb-3">ICAR Database Sync</h3>
              <p className="font-body text-soil-600 text-sm">
                Direct integration with the Indian Council of Agricultural Research ensures our baselines are scientifically validated for your specific region.
              </p>
            </Card>
            <Card className="p-8">
              <Cpu className="mb-4 text-soil-900" size={24} />
              <h3 className="font-heading text-xl font-bold mb-3">Edge Processing</h3>
              <p className="font-body text-soil-600 text-sm">
                Lightweight model inference can run on standard mobile devices, ensuring you get predictions even with intermittent internet access.
              </p>
            </Card>
            <Card className="p-8">
              <LineChart className="mb-4 text-soil-900" size={24} />
              <h3 className="font-heading text-xl font-bold mb-3">Financial Projections</h3>
              <p className="font-body text-soil-600 text-sm">
                Yield predictions are automatically mapped to current Mandi prices to forecast your expected harvest revenue months in advance.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
