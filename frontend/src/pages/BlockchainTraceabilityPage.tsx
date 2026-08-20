import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Network, Fingerprint, Lock, QrCode } from 'lucide-react';

export const BlockchainTraceabilityPage: React.FC = () => {
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
              <span className="font-sans font-medium text-xs tracking-wide text-soil-500 mb-6 block">Product / Blockchain Traceability</span>
              <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight tracking-tight mb-6 text-soil-900">
                Immutable proof <br/>of quality.
              </h1>
            </div>
            <div className="max-w-md border-l border-soil-300 pl-6 py-2">
              <p className="font-body text-soil-700 text-lg leading-relaxed">
                Transform trust into a mathematical certainty. FarmChain records every event in the agricultural lifecycle onto a decentralized ledger, allowing you to prove premium quality to buyers.
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
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">A transparent supply chain</h2>
              <p className="font-body text-soil-600 text-lg leading-relaxed mb-6">
                In modern agriculture, buyers want to know exactly what they are purchasing. Was it grown sustainably? Were harsh pesticides used? What was the soil health?
              </p>
              <p className="font-body text-soil-600 text-lg leading-relaxed mb-8">
                FarmChain automatically hashes your seasonal data logs into a smart contract. Once minted, this data cannot be altered, spoofed, or deleted, creating an unshakeable foundation of trust.
              </p>
              <Button onClick={() => navigate('/signup')}>Start Logging Today</Button>
            </motion.div>

            {/* Code/Data Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-soil-950 text-cream p-8 border border-soil-900 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-soil-800">
                <span className="font-sans font-medium text-xs tracking-wide text-leaf-500">Block Explorer</span>
                <span className="font-sans font-medium text-xs text-soil-500">Block #894211</span>
              </div>
              <div className="font-sans font-medium text-sm leading-loose text-cream/80 whitespace-pre-wrap overflow-x-auto">
                <span className="text-leaf-500">TxHash:</span> 0x8f7a...3c2b<br/>
                <span className="text-leaf-500">Farm_ID:</span> FC_9921_IN<br/>
                <span className="text-leaf-500">Crop:</span> Wheat (HD-2967)<br/>
                <span className="text-leaf-500">Pesticide_Log:</span> 0.0mg/Ha [ORGANIC]<br/>
                <span className="text-leaf-500">Harvest_Date:</span> 1682947200<br/>
                <br/>
                <span className="text-soil-500">{"{"}</span><br/>
                &nbsp;&nbsp;"soil_n": 140,<br/>
                &nbsp;&nbsp;"soil_p": 45,<br/>
                &nbsp;&nbsp;"soil_k": 210<br/>
                <span className="text-soil-500">{"}"}</span><br/>
                <br/>
                <span className="text-green-400">Status: VERIFIED</span>
              </div>
            </motion.div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8">
              <QrCode className="mb-4 text-soil-900" size={24} />
              <h3 className="font-heading text-xl font-bold mb-3">Consumer QR Codes</h3>
              <p className="font-body text-soil-600 text-sm">
                Generate dynamic QR codes for your packaging. Buyers can scan them to view the complete, verified history of the produce they are buying.
              </p>
            </Card>
            <Card className="p-8">
              <Network className="mb-4 text-soil-900" size={24} />
              <h3 className="font-heading text-xl font-bold mb-3">Decentralized Storage</h3>
              <p className="font-body text-soil-600 text-sm">
                Data is not held on a single vulnerable server. It is distributed across a robust network, ensuring 100% uptime and data integrity.
              </p>
            </Card>
            <Card className="p-8">
              <Lock className="mb-4 text-soil-900" size={24} />
              <h3 className="font-heading text-xl font-bold mb-3">Privacy Controls</h3>
              <p className="font-body text-soil-600 text-sm">
                You control what data is public (like organic status) and what data remains private (like specific yield volume or exact revenue).
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
