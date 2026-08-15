import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { FarmOnboardingPage } from './pages/FarmOnboardingPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { RecommendationsPage } from './pages/RecommendationsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/onboarding/farm" element={<FarmOnboardingPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
