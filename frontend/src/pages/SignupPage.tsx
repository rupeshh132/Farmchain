import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import { Sprout } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: 'FARMER'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await register(formData);
      if (res.success && res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6 py-12 relative overflow-hidden -mt-16">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-wheat-400/20 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up pt-16">
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/logo.png" alt="FarmChain Logo" className="w-12 h-12 object-contain mix-blend-multiply" />
            <span className="font-heading text-3xl font-bold text-soil-900 tracking-tight">FarmChain</span>
          </div>
          
          <h2 className="text-3xl font-heading text-center text-soil-900 mb-2 font-bold">Create Account</h2>
          <p className="text-center text-soil-600 font-body mb-8">Join the modern agricultural network.</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-soil-700 mb-1.5">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soil-700 mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soil-700 mb-1.5">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soil-700 mb-1.5">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              >
                <option value="FARMER">Farmer</option>
                <option value="BUYER">Buyer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-soil-700 mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-soil-600 font-body">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
