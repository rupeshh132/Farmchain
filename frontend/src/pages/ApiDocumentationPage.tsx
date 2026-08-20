import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Code, Key } from 'lucide-react';

export const ApiDocumentationPage: React.FC = () => {
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
              <span className="font-sans font-medium text-xs tracking-wide text-soil-500 mb-6 block">Resources / API Documentation</span>
              <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight tracking-tight mb-6 text-soil-900">
                Build with <br/>FarmChain.
              </h1>
            </div>
            <div className="max-w-md border-l border-soil-300 pl-6 py-2">
              <p className="font-body text-soil-700 text-lg leading-relaxed">
                Integrate FarmChain's intelligence directly into your custom ERP systems, IoT hardware, or regional marketplaces using our RESTful API.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-32 space-y-8">
              <div>
                <h4 className="font-sans font-medium text-xs font-bold tracking-wide text-soil-500 mb-4">Getting Started</h4>
                <ul className="space-y-3 font-body text-sm text-soil-700">
                  <li className="font-bold text-soil-900">Authentication</li>
                  <li className="hover:text-soil-900 cursor-pointer">Rate Limits</li>
                  <li className="hover:text-soil-900 cursor-pointer">Webhooks</li>
                </ul>
              </div>
              <div>
                <h4 className="font-sans font-medium text-xs font-bold tracking-wide text-soil-500 mb-4">Endpoints</h4>
                <ul className="space-y-3 font-body text-sm text-soil-700">
                  <li className="hover:text-soil-900 cursor-pointer">/v1/yield-prediction</li>
                  <li className="hover:text-soil-900 cursor-pointer">/v1/disease-scan</li>
                  <li className="hover:text-soil-900 cursor-pointer">/v1/mandi-prices</li>
                  <li className="hover:text-soil-900 cursor-pointer">/v1/ledger/mint</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Documentation Content */}
          <main className="lg:w-3/4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              
              {/* Authentication Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Key className="text-soil-900" size={24} />
                  <h2 className="font-heading text-3xl font-bold">Authentication</h2>
                </div>
                <p className="font-body text-soil-600 text-lg leading-relaxed mb-6">
                  The FarmChain API uses API keys to authenticate requests. You can view and manage your API keys in the FarmChain Dashboard. All API requests must be made over HTTPS.
                </p>
                <div className="bg-soil-950 text-cream p-6 border border-soil-900 shadow-xl overflow-x-auto">
                  <pre className="font-sans font-medium text-sm leading-loose">
<span className="text-soil-500"># Pass the API key in the header</span>
curl https://api.farmchain.com/v1/mandi-prices \
  -H <span className="text-green-400">"Authorization: Bearer fc_test_8f7a3c2b..."</span>
                  </pre>
                </div>
              </div>

              {/* Endpoint Section */}
              <div className="pt-8 border-t border-soil-200">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="text-soil-900" size={24} />
                  <h2 className="font-heading text-3xl font-bold">Yield Prediction</h2>
                </div>
                <p className="font-body text-soil-600 text-lg leading-relaxed mb-6">
                  Returns a projected yield based on provided soil metrics and farm coordinates. The model automatically pulls in historical weather data for the specified coordinates.
                </p>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-900 font-sans font-medium text-sm font-bold border border-green-200">POST</span>
                  <code className="font-sans font-medium text-soil-800">/v1/yield-prediction</code>
                </div>

                <div className="bg-soil-950 text-cream p-6 border border-soil-900 shadow-xl overflow-x-auto mb-6">
                  <pre className="font-sans font-medium text-sm leading-loose">
<span className="text-soil-500">// Request Payload</span>
{"{"}
  <span className="text-leaf-500">"farm_lat"</span>: 28.7041,
  <span className="text-leaf-500">"farm_lng"</span>: 77.1025,
  <span className="text-leaf-500">"crop_type"</span>: <span className="text-green-400">"wheat"</span>,
  <span className="text-leaf-500">"soil_metrics"</span>: {"{"}
    <span className="text-leaf-500">"n"</span>: 140,
    <span className="text-leaf-500">"p"</span>: 45,
    <span className="text-leaf-500">"k"</span>: 210
  {"}"}
{"}"}
                  </pre>
                </div>

                <div className="bg-wheat-50 p-6 border border-soil-200">
                  <h4 className="font-sans font-medium text-xs tracking-wide text-soil-600 mb-4">Response Object</h4>
                  <p className="font-sans font-medium text-sm text-soil-900 mb-2"><span className="font-bold">estimated_yield_kg:</span> Integer. The predicted output.</p>
                  <p className="font-sans font-medium text-sm text-soil-900 mb-2"><span className="font-bold">confidence_score:</span> Float. 0.0 to 1.0 representing model certainty.</p>
                  <p className="font-sans font-medium text-sm text-soil-900"><span className="font-bold">risk_factors:</span> Array of strings. Identified climate or soil risks.</p>
                </div>
              </div>

            </motion.div>
          </main>

        </div>
      </section>
    </div>
  );
};
