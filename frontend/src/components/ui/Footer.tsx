import React from 'react';
import { Sprout, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-soil-950 text-cream/80 pt-16 pb-8 px-6 md:px-12 border-t border-soil-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="FarmChain Logo" className="w-10 h-10 object-contain" />
            <span className="font-heading text-2xl font-bold">FarmChain</span>
          </div>
          <p className="font-body text-sm max-w-xs">
            Empowering modern agriculture with AI-driven insights, crop traceability, and real-time market data.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-heading text-lg text-cream mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Yield Prediction</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Disease Detection</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Blockchain Traceability</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Mandi Prices</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg text-cream mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Farmer's Guide</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Community Forum</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Support Center</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-heading text-lg text-cream mb-4">Stay Updated</h4>
          <p className="text-sm mb-4">Get the latest agricultural trends and platform updates.</p>
          <div className="flex bg-soil-900 rounded-lg overflow-hidden border border-soil-800 focus-within:border-primary transition-colors">
            <div className="pl-3 flex items-center text-soil-500">
              <Mail size={16} />
            </div>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent text-sm w-full py-2 px-3 text-cream focus:outline-none placeholder-soil-600"
            />
            <button className="bg-primary text-white px-4 text-sm font-medium hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-soil-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>&copy; {new Date().getFullYear()} FarmChain. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cream transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};
