import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { FarmOnboardingPage } from './pages/FarmOnboardingPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import TracePage from './pages/TracePage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import { Navbar } from './components/ui/Navbar';

import { Footer } from './components/ui/Footer';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <div className="pt-16 min-h-screen flex flex-col">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/onboarding/farm" element={<ProtectedRoute><FarmOnboardingPage /></ProtectedRoute>} />
              <Route path="/calculator" element={<ProtectedRoute><CalculatorPage /></ProtectedRoute>} />
              <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />
              <Route path="/disease-detection" element={<ProtectedRoute><DiseaseDetectionPage /></ProtectedRoute>} />
              <Route path="/trace/:qrCode" element={<TracePage />} />
            </Routes>
          </div>
          <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
