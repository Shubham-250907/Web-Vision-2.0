import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { ApplicationProvider } from './context/ApplicationContext';

// Layout components
import { HackathonDemoBanner } from './components/layout/HackathonDemoBanner';
import { TopAccessibilityBar } from './components/layout/TopAccessibilityBar';
import { GovHeader } from './components/layout/GovHeader';
import { MainNavbar } from './components/layout/MainNavbar';
import { MarqueeAlert } from './components/layout/MarqueeAlert';
import { GovFooter } from './components/layout/GovFooter';

// Pages
import { HomePage } from './pages/HomePage';
import { DocumentAdvisorPage } from './pages/DocumentAdvisorPage';
import { DocumentUploadPage } from './pages/DocumentUploadPage';
import { ApplyPassportPage } from './pages/ApplyPassportPage';
import { TrackApplicationPage } from './pages/TrackApplicationPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { PaymentPage } from './pages/PaymentPage';
import { FeeCalculatorPage } from './pages/FeeCalculatorPage';
import { LocateCentrePage } from './pages/LocateCentrePage';
import { FaqPage } from './pages/FaqPage';
import { AboutUsPage } from './pages/AboutUsPage';

export function App() {
  return (
    <AccessibilityProvider>
      <ApplicationProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[#f1f5f9] text-slate-800">
            {/* Top Hackathon Demo Tour Bar for Evaluators */}
            <HackathonDemoBanner />

            {/* Authentic GOI Accessibility Toolbar */}
            <TopAccessibilityBar />

            {/* Official Ministry Header */}
            <GovHeader />

            {/* Primary Navigation Menu */}
            <MainNavbar />

            {/* Scrolling Advisory Ticker */}
            <MarqueeAlert />

            {/* Main Content Area */}
            <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/advisor" element={<DocumentAdvisorPage />} />
                <Route path="/upload" element={<DocumentUploadPage />} />
                <Route path="/apply" element={<ApplyPassportPage />} />
                <Route path="/track" element={<TrackApplicationPage />} />
                <Route path="/appointment" element={<AppointmentPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/fee-calculator" element={<FeeCalculatorPage />} />
                <Route path="/locate-centre" element={<LocateCentrePage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                {/* Fallback to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Authentic GOI Footer */}
            <GovFooter />
          </div>
        </Router>
      </ApplicationProvider>
    </AccessibilityProvider>
  );
}

export default App;
