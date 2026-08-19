import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import { motion } from 'motion/react';
import { AuthInput } from '../components/ui/AuthInput';
import { LeafLoader } from '../components/ui/LeafLoader';
import { Leaf } from 'lucide-react';

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

  const isFormValid = 
    formData.fullName.length > 2 &&
    formData.email.includes('@') &&
    formData.password.length >= 6;

  // Stagger variants for the form elements
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="min-h-screen bg-cream flex flex-col md:flex-row overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Left Side: Immersive Visual */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden bg-soil-950">
        <motion.img 
          src="/farm_ai_overlay.jpg" 
          alt="Golden Hour Field"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soil-950/90 via-soil-950/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end px-12 pt-12 pb-24 lg:px-20 lg:pt-20 lg:pb-28 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="text-leaf-500 w-6 h-6" />
              <span className="text-cream/70 font-sans font-medium text-sm tracking-widest uppercase">Join the Network</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-heading text-white font-bold leading-[1.1] mb-6 text-balance">
              Cultivating the <span className="italic font-light text-primary-light">future together.</span>
            </h2>
            <p className="text-cream/80 font-body text-lg max-w-md leading-relaxed">
              Create your account today and step into the new era of transparent, technology-driven agriculture.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Editorial Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 relative bg-cream">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-leaf-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          className="w-full max-w-md relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10 md:mb-12">
            <img src="/logo.png" alt="FarmChain Logo" className="w-10 h-10 object-contain mix-blend-multiply" />
            <span className="font-heading text-2xl font-bold text-soil-900 tracking-tight">FarmChain</span>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-heading text-soil-900 mb-3 font-bold">Create Account</h1>
            <p className="text-soil-600 font-body mb-10 text-lg">Join the modern agricultural network.</p>
          </motion.div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 font-body"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <AuthInput
                id="fullName"
                name="fullName"
                type="text"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <AuthInput
                id="phone"
                name="phone"
                type="tel"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <AuthInput
                id="email"
                name="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <label className="absolute left-0 -top-5 text-xs text-soil-700 font-medium font-body pointer-events-none">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 py-3 border-border focus:border-primary border-opacity-60 outline-none transition-colors duration-300 font-body text-soil-900 appearance-none"
              >
                <option value="FARMER">Farmer</option>
                <option value="BUYER">Buyer</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <AuthInput
                id="password"
                name="password"
                type="password"
                label="Password (Min 6 chars)"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                type="submit"
                disabled={loading || !isFormValid}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-2xl font-heading font-medium text-lg flex items-center justify-center transition-all duration-300
                  ${isFormValid 
                    ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5' 
                    : 'bg-soil-200 text-soil-400 cursor-not-allowed'
                  }`}
              >
                {loading ? <LeafLoader className="text-white" /> : 'Create Account'}
              </motion.button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-12 text-center text-soil-600 font-body">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline transition-all">
              Log in
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

