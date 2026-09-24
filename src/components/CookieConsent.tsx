import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('contractorstack_cookie_consent');
    if (!consent) {
      // Delay showing slightly so it does not interfere with first contentful paint
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('contractorstack_cookie_consent', JSON.stringify({
      analytics: true,
      preferences: true,
      essential: true,
      date: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('contractorstack_cookie_consent', JSON.stringify({
      analytics: false,
      preferences: true,
      essential: true,
      date: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xl transition-all duration-300 transform translate-y-0"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Privacy & Cookie Preferences
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            We use essential cookies to maintain your comparisons, ROI calculator values, and analyze partner referral conversions. We never sell your personal data. Read our{' '}
            <Link to="/privacy" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 pt-2">
        <button
          onClick={handleAcceptAll}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          Accept All
        </button>
        <button
          onClick={handleEssentialOnly}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
        >
          Essential Only
        </button>
        <button
          onClick={handleEssentialOnly}
          aria-label="Dismiss cookie notice"
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
