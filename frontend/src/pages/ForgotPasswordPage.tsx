import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { AuthInput } from '../components/ui/AuthInput';
import { LeafLoader } from '../components/ui/LeafLoader';
import { auth } from '../lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email.includes('@');

  return (
    <motion.div 
      className="min-h-screen bg-cream flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <img src="/logo.png" alt="FarmChain Logo" className="w-10 h-10 object-contain mix-blend-multiply" />
          <span className="font-heading text-2xl font-bold text-soil-900 tracking-tight">FarmChain</span>
        </div>

        <h1 className="text-3xl font-heading text-soil-900 mb-2 font-bold">Reset Password</h1>
        <p className="text-soil-600 font-body mb-8 text-sm">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 font-body">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 text-sm rounded-xl border border-green-100 font-body">
            Password reset email sent! Check your inbox.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <AuthInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading || !isFormValid || success}
            className={`w-full py-4 rounded-2xl font-heading font-medium text-lg flex items-center justify-center transition-all duration-300
              ${(isFormValid && !success)
                ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90' 
                : 'bg-soil-200 text-soil-400 cursor-not-allowed'
              }`}
          >
            {loading ? <LeafLoader className="text-white" /> : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-8 text-center text-soil-600 font-body text-sm">
          Remember your password?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
