import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { FarmOnboardingPage } from './pages/FarmOnboardingPage';
import { CalculatorPage } from './pages/CalculatorPage';
import RecommendationsPage from './pages/RecommendationsPage';
import TracePage from './pages/TracePage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/onboarding/farm" element={<ProtectedRoute><FarmOnboardingPage /></ProtectedRoute>} />
        <Route path="/calculator" element={<ProtectedRoute><CalculatorPage /></ProtectedRoute>} />
        <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />
        <Route path="/disease-detection" element={<ProtectedRoute><DiseaseDetectionPage /></ProtectedRoute>} />
        <Route path="/trace/:qrCode" element={<TracePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
