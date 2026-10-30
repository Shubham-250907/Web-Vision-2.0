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
import { VisaAssistPage } from './pages/VisaAssistPage';
import { VisaAlertsPage } from './pages/VisaAlertsPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { FeeCalculatorPage } from './pages/FeeCalculatorPage';
import { LocateCentrePage } from './pages/LocateCentrePage';
import { FaqPage } from './pages/FaqPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ReissueCheckPage } from './pages/ReissueCheckPage';

export function App() {
  return (
    <AccessibilityProvider>
      <ApplicationProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[#e8edf3] text-[#212529]">
            {/* Top Hackathon Demo Tour Bar for Evaluators */}
            <HackathonDemoBanner />

            {/* Authentic Boxed Government Portal matching passportindia.gov.in/psp */}
            <div className="psp-container w-full min-h-screen flex flex-col">
              {/* Authentic GOI Accessibility Toolbar */}
              <TopAccessibilityBar />

              {/* Official Ministry Header */}
              <GovHeader />

              {/* Primary Navigation Menu */}
              <MainNavbar />

              {/* Scrolling Advisory Ticker */}
              <MarqueeAlert />

              {/* Main Content Area */}
              <main id="main-content" className="flex-1 w-full px-4 py-4">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/advisor" element={<DocumentAdvisorPage />} />
                  <Route path="/upload" element={<DocumentUploadPage />} />
                  <Route path="/reissue-check" element={<ReissueCheckPage />} />
                  <Route path="/apply" element={<ApplyPassportPage />} />
                  <Route path="/visa-assist" element={<VisaAssistPage />} />
                  <Route path="/visa-alerts" element={<VisaAlertsPage />} />
                  <Route path="/appointment" element={<AppointmentPage />} />
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
          </div>
        </Router>
      </ApplicationProvider>
    </AccessibilityProvider>
  );
}

export default App;
