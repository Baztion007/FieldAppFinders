/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ReviewTemplate } from './pages/ReviewTemplate';
import { Reviews } from './pages/Reviews';
import { Comparisons } from './pages/Comparisons';
import { Industries } from './pages/Industries';
import { IndustryGuide } from './pages/IndustryGuide';
import { PricingGuide } from './pages/PricingGuide';
import { Resources } from './pages/Resources';
import { Layout } from './components/layout/Layout';
import { NotFound } from './pages/NotFound';
import { ScrollToTop } from './components/ScrollToTop';
import { useSEO } from './hooks/useSEO';
import { AnalyticsProvider } from './hooks/useAnalytics';
import { AdminReports } from './pages/AdminReports';
import { VersusTemplate } from './pages/VersusTemplate';
import { RoiCalculatorPage } from './pages/RoiCalculatorPage';
import { About } from './pages/About';
import { Methodology } from './pages/Methodology';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { AffiliateRedirect } from './pages/AffiliateRedirect';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CookieConsent } from './components/CookieConsent';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AnalyticsProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reviews/:slug" element={<ReviewTemplate />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/comparisons" element={<Comparisons />} />
            <Route path="/comparisons/:matchup" element={<VersusTemplate />} />
            <Route path="/compare/:matchup" element={<VersusTemplate />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryGuide />} />
            <Route path="/pricing-guide" element={<PricingGuide />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/calculator" element={<RoiCalculatorPage />} />
            <Route path="/roi-calculator" element={<RoiCalculatorPage />} />
            
            {/* Cloaked partner link redirect */}
            <Route path="/go/:slug" element={<AffiliateRedirect />} />

            <Route path="/admin/reports" element={<AdminReports />} />
            
            {/* Informational and compliance pages */}
            <Route path="/about" element={<About />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </AnalyticsProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
