import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { TrendingUp, Map, BellRing, DollarSign } from 'lucide-react';

export const MandiPricesPage: React.FC = () => {
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
              <span className="font-sans font-medium text-xs tracking-wide text-soil-500 mb-6 block">Product / Mandi Prices</span>
              <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight tracking-tight mb-6 text-soil-900">
                Real-time market <br/>intelligence.
              </h1>
            </div>
            <div className="max-w-md border-l border-soil-300 pl-6 py-2">
              <p className="font-body text-soil-700 text-lg leading-relaxed">
                Stop relying on middlemen for pricing information. Access live commodity rates across hundreds of regional Mandis to decide exactly when and where to sell.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Maximize your profit margins</h2>
              <p className="font-body text-soil-600 text-lg leading-relaxed mb-6">
                FarmChain aggregates pricing data from government APIs and private trading floors, presenting it in a clean, comparative dashboard.
              </p>
              <p className="font-body text-soil-600 text-lg leading-relaxed mb-8">
                Combine this with our Blockchain Traceability, and you can identify exactly which buyers are willing to pay a premium for organic, verified produce.
              </p>
              <Button onClick={() => navigate('/dashboard')} variant="outline">View Live Dashboard</Button>
            </motion.div>

            {/* Dashboard Mockup Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 bg-white p-6 border border-soil-200 shadow-sm"
            >
              <div className="flex justify-between items-center mb-6 border-b border-soil-100 pb-4">
                <h4 className="font-heading font-bold text-lg">Wheat (HD-2967)</h4>
                <span className="font-sans font-medium text-xs bg-soil-100 px-2 py-1">TODAY</span>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Azadpur Mandi", price: "₹2,250", trend: "+1.2%", color: "text-green-600" },
                  { name: "Narela Mandi", price: "₹2,210", trend: "-0.5%", color: "text-red-600" },
                  { name: "Karnal Market", price: "₹2,300", trend: "+2.4%", color: "text-green-600" },
                ].map((market, i) => (
                  <div key={i} className="flex justify-between items-center bg-wheat-50 p-4 border border-soil-100">
                    <div>
                      <span className="block font-bold text-soil-900">{market.name}</span>
                      <span className="font-sans font-medium text-xs text-soil-500">per quintal</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-heading font-bold text-xl">{market.price}</span>
                      <span className={`font-sans font-medium text-xs font-bold ${market.color}`}>{market.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8">
              <TrendingUp className="mb-4 text-soil-900" size={24} />
              <h3 className="font-heading text-xl font-bold mb-3">Historical Analysis</h3>
              <p className="font-body text-soil-600 text-sm">
                View price charts going back 5 years to understand seasonal trends and predict the best week to bring your harvest to market.
              </p>
            </Card>
            <Card className="p-8">
              <BellRing className="mb-4 text-soil-900" size={24} />
              <h3 className="font-heading text-xl font-bold mb-3">Price Alerts</h3>
              <p className="font-body text-soil-600 text-sm">
                Set target prices for your crops. FarmChain will send an SMS or push notification the moment a local Mandi hits your desired rate.
              </p>
            </Card>
            <Card className="p-8">
              <Map className="mb-4 text-soil-900" size={24} />
              <h3 className="font-heading text-xl font-bold mb-3">Radius Search</h3>
              <p className="font-body text-soil-600 text-sm">
                Calculate transportation costs dynamically. We show you if it's more profitable to sell locally or drive 50km to a better-paying market.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
