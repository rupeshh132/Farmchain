import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/dashboard/TasksPage';
import { CalendarPage } from './pages/dashboard/CalendarPage';
import { AnalyticsPage } from './pages/dashboard/AnalyticsPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';
import { HelpPage } from './pages/dashboard/HelpPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { FarmOnboardingPage } from './pages/FarmOnboardingPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import TracePage from './pages/TracePage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { YieldPredictionPage } from './pages/YieldPredictionPage';
import { FieldJournalPage } from './pages/FieldJournalPage';
import { NetRealizationPage } from './pages/NetRealizationPage';
import { DiseaseDetectionInfoPage } from './pages/DiseaseDetectionInfoPage';
import { BlockchainTraceabilityPage } from './pages/BlockchainTraceabilityPage';
import { SoilReportOCRPage } from './pages/SoilReportOCRPage';
import { MandiPricesPage } from './pages/MandiPricesPage';
import { FarmersGuidePage } from './pages/FarmersGuidePage';
import { ApiDocumentationPage } from './pages/ApiDocumentationPage';
import { CommunityForumPage } from './pages/CommunityForumPage';
import { SupportCenterPage } from './pages/SupportCenterPage';
import { Navbar } from './components/ui/Navbar';
import { GlobalChatWidget } from './components/ui/GlobalChatWidget';
import { LanguageSelector } from './components/ui/LanguageSelector';
import { Footer } from './components/ui/Footer';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute><HelpPage /></ProtectedRoute>} />
        <Route path="/onboarding/farm" element={<ProtectedRoute><FarmOnboardingPage /></ProtectedRoute>} />
        <Route path="/calculator" element={<ProtectedRoute><CalculatorPage /></ProtectedRoute>} />
        <Route path="/net-realization" element={<ProtectedRoute><NetRealizationPage /></ProtectedRoute>} />
        <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />
        <Route path="/disease-detection" element={<ProtectedRoute><DiseaseDetectionPage /></ProtectedRoute>} />
        <Route path="/soil-ocr" element={<ProtectedRoute><SoilReportOCRPage /></ProtectedRoute>} />
        <Route path="/journal" element={<ProtectedRoute><FieldJournalPage /></ProtectedRoute>} />
        <Route path="/trace/:qrCode" element={<TracePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        
        {/* Footer Pages */}
        <Route path="/yield-prediction" element={<YieldPredictionPage />} />
        <Route path="/disease-detection-info" element={<DiseaseDetectionInfoPage />} />
        <Route path="/traceability" element={<BlockchainTraceabilityPage />} />
        <Route path="/mandi-prices" element={<MandiPricesPage />} />
        <Route path="/farmers-guide" element={<FarmersGuidePage />} />
        <Route path="/api-docs" element={<ApiDocumentationPage />} />
        <Route path="/community" element={<CommunityForumPage />} />
        <Route path="/support" element={<SupportCenterPage />} />
      </Routes>
    </AnimatePresence>
  );
};

import { DashboardLayout } from './components/dashboard/DashboardLayout';

const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);
  const isDashboardRoute = ['/dashboard', '/tasks', '/calendar', '/analytics', '/mandi-prices', '/settings', '/help'].includes(location.pathname);

  if (isDashboardRoute) {
    return (
      <DashboardLayout>
        <div className="fixed bottom-6 left-6 z-50">
          <LanguageSelector />
        </div>
        <GlobalChatWidget />
        <AnimatedRoutes />
      </DashboardLayout>
    );
  }

  return (
    <>
        <Navbar />
        <div className="fixed bottom-6 left-6 z-50">
          <LanguageSelector />
        </div>
        <GlobalChatWidget />
        <div className={`${isAuthPage ? '' : 'pt-24'} min-h-screen flex flex-col`}>
          <div className="flex-1">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
