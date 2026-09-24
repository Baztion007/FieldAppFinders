import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackFirebaseEvent } from '../lib/firebase';

interface AnalyticsContextType {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    // Standard GA4 Page View Tracking (mocked for preview)
    const pagePath = location.pathname + location.search;
    trackEvent('page_view', { page_path: pagePath });
  }, [location]);

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    const enrichedProperties = {
      ...properties,
      conversion_path: location.pathname + location.search,
      referrer: document.referrer
    };

    // 1. Mock GA4 / Provider integration
    if (import.meta.env.MODE === 'development' || true) {
      console.groupCollapsed(`📊 GA4 Event: ${eventName}`);
      console.table(enrichedProperties);
      console.groupEnd();
    }

    // 2. Fire to Firebase
    trackFirebaseEvent(eventName, enrichedProperties);

    // 3. Keep local storage for instant legacy fallback (optional, but good for local dev)
    try {
      if (eventName === 'affiliate_click') {
        const stats = JSON.parse(localStorage.getItem('admin_affiliate_stats') || '{}');
        const productId = properties?.product_id;
        if (productId) {
          if (!stats[productId]) {
            stats[productId] = { clicks: 0, name: properties.product_name };
          }
          stats[productId].clicks += 1;
          localStorage.setItem('admin_affiliate_stats', JSON.stringify(stats));
        }
      } else if (eventName === 'product_view') {
        const views = JSON.parse(localStorage.getItem('admin_product_views') || '{}');
        const productId = properties?.product_id;
        if (productId) {
          if (!views[productId]) {
            views[productId] = { views: 0 };
          }
          views[productId].views += 1;
          localStorage.setItem('admin_product_views', JSON.stringify(views));
        }
      } else if (eventName === 'checklist_download') {
        const leads = parseInt(localStorage.getItem('admin_total_leads') || '0', 10);
        localStorage.setItem('admin_total_leads', (leads + 1).toString());
      } else if (eventName === 'newsletter_signup') {
        const subs = parseInt(localStorage.getItem('admin_total_subs') || '0', 10);
        localStorage.setItem('admin_total_subs', (subs + 1).toString());
      }
    } catch (e) {
      // Ignore parsing errors
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}
