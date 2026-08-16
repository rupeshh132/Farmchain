import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import { Sprout } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await login(formData);
      if (res.success && res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6 py-12 relative overflow-hidden -mt-16">
      {/* Decorative background blobs */}
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/logo.png" alt="FarmChain Logo" className="w-12 h-12 object-contain mix-blend-multiply" />
            <span className="font-heading text-3xl font-bold text-soil-900 tracking-tight">FarmChain</span>
          </div>
          
          <h2 className="text-3xl font-heading text-center text-soil-900 mb-2 font-bold">Welcome Back</h2>
          <p className="text-center text-soil-600 font-body mb-8">Log in to manage your farm and market data.</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="block text-sm font-medium text-soil-700 mb-1.5 flex justify-between">
                <span>Password</span>
                <a href="#" className="text-primary text-xs hover:underline">Forgot password?</a>
              </label>
              <input
                type="password"
                name="password"
                required
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
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-soil-600 font-body">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
