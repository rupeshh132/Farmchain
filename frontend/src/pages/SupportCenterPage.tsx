import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { HelpCircle, Phone, Mail, FileWarning } from 'lucide-react';

export const SupportCenterPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-soil-900 selection:bg-soil-900 selection:text-cream pb-24">
      {/* Header Section */}
      <section className="pt-2 md:pt-4 pb-16 px-4 md:px-8 border-b border-soil-200">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-sans font-medium text-xs tracking-wide text-soil-500 mb-6 block">Resources / Support Center</span>
          <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight tracking-tight mb-6 text-soil-900">
            How can we help?
          </h1>
          <p className="font-body text-soil-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Whether you are facing a technical issue with the ledger or need guidance on interpreting a disease scan, our support team is ready.
          </p>
          <div className="max-w-xl mx-auto bg-white p-2 flex border border-soil-200 focus-within:border-soil-900 transition-colors">
            <input 
              type="text" 
              placeholder="Search for answers..." 
              className="bg-transparent border-none outline-none w-full px-4 font-sans font-medium text-sm text-soil-900 placeholder-soil-500"
            />
            <Button>Search</Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Quick Contacts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <Card className="p-8 text-center flex flex-col items-center">
              <Phone className="mb-4 text-soil-900" size={32} />
              <h3 className="font-heading text-xl font-bold mb-3">Call Support</h3>
              <p className="font-body text-soil-600 text-sm mb-4">
                Available Mon-Fri, 9am to 6pm IST for Premium Ledger users.
              </p>
              <span className="font-sans font-medium text-lg font-bold text-soil-900">1800-FAR-MCHN</span>
            </Card>
            <Card className="p-8 text-center flex flex-col items-center">
              <Mail className="mb-4 text-soil-900" size={32} />
              <h3 className="font-heading text-xl font-bold mb-3">Email Support</h3>
              <p className="font-body text-soil-600 text-sm mb-4">
                For general inquiries and technical troubleshooting. We aim to reply within 24 hours.
              </p>
              <a href="mailto:support@farmchain.com" className="font-sans font-medium text-sm font-bold text-soil-900 border-b border-soil-900 hover:text-primary hover:border-primary">
                support@farmchain.com
              </a>
            </Card>
            <Card className="p-8 text-center flex flex-col items-center">
              <FileWarning className="mb-4 text-soil-900" size={32} />
              <h3 className="font-heading text-xl font-bold mb-3">Submit a Ticket</h3>
              <p className="font-body text-soil-600 text-sm mb-4">
                Experiencing a bug or need to dispute a blockchain minting record?
              </p>
              <Button variant="outline">Open Ticket</Button>
            </Card>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="text-soil-900" size={28} />
              <h2 className="font-heading text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  q: "How do I reset my FarmChain password?",
                  a: "Click on 'Forgot Password' on the login screen. You will receive an SMS OTP or an email link to reset your credentials securely."
                },
                {
                  q: "What happens if my phone loses internet connection during a disease scan?",
                  a: "The FarmChain app operates on an edge-processing architecture. It will cache the image and the initial diagnosis locally, and sync it to the ledger automatically once you regain connectivity."
                },
                {
                  q: "Can I delete a harvest record from the blockchain?",
                  a: "No. The core value of FarmChain is its immutability. Once a harvest and its associated data are minted to the smart contract, it cannot be deleted. If you made an error, you must mint an 'Addendum' record that points to the original."
                },
                {
                  q: "Are the Mandi prices guaranteed?",
                  a: "Mandi prices displayed are aggregated from real-time market data APIs. They are highly accurate but should be considered estimates. Final prices are negotiated directly with the buyer or the Mandi auctioneer."
                }
              ].map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 border border-soil-200"
                >
                  <h4 className="font-heading text-xl font-bold mb-3">{faq.q}</h4>
                  <p className="font-body text-soil-600 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
