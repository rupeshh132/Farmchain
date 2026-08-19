import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import { motion } from 'motion/react';
import { AuthInput } from '../components/ui/AuthInput';
import { LeafLoader } from '../components/ui/LeafLoader';
import { Leaf, Mail } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseLogin } from '../api/auth';

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
      // 1. Login with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      
      // 2. Get Firebase ID Token
      const token = await userCredential.user.getIdToken();
      
      // 3. Authenticate with FarmChain Backend
      const res = await firebaseLogin(token);
      if (res.success && res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken);
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const token = await userCredential.user.getIdToken();
      
      const res = await firebaseLogin(token);
      if (res.success && res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken);
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google Login failed.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = formData.email.includes('@') && formData.password.length >= 6;

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
          src="/farm_traditional.jpg" 
          alt="Traditional Farming"
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
              <span className="text-cream/70 font-sans font-medium text-sm tracking-widest uppercase">Smart Agriculture</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-heading text-white font-bold leading-[1.1] mb-6 text-balance">
              Sowing seeds <span className="italic font-light text-primary-light">for a better tomorrow.</span>
            </h2>
            <p className="text-cream/80 font-body text-lg max-w-md leading-relaxed">
              Log in to access your precision farming dashboard and unlock the hidden potential of your fields.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Editorial Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 relative bg-cream">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
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
            <h1 className="text-4xl md:text-5xl font-heading text-soil-900 mb-3 font-bold">Welcome Back</h1>
            <p className="text-soil-600 font-body mb-10 text-lg">Sign in to continue your journey.</p>
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
              <AuthInput
                id="password"
                name="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Link to="/forgot-password" className="absolute right-0 top-3 text-sm text-primary hover:text-primary-dark font-medium transition-colors font-body">
                Forgot?
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 space-y-4">
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
                {loading ? <LeafLoader className="text-white" /> : 'Log In with Email'}
              </motion.button>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-soil-200"></div>
                <span className="flex-shrink-0 mx-4 text-soil-400 font-body text-sm">or</span>
                <div className="flex-grow border-t border-soil-200"></div>
              </div>

              <motion.button
                type="button"
                onClick={handleGoogleLogin}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl font-heading font-medium text-lg flex items-center justify-center gap-3 bg-white border border-soil-200 text-soil-800 hover:bg-soil-50 transition-all duration-300"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </motion.button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-12 text-center text-soil-600 font-body">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-bold hover:underline transition-all">
              Sign up
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

