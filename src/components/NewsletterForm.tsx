import React, { useState, useEffect, useId } from 'react';
import { CheckCircle2, X, AlertCircle } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

export function NewsletterForm({ 
  className = '', 
  buttonText = 'Download PDF',
  successMessage = 'Success! Check your email for the PDF.',
  eventName = 'newsletter_signup'
}: { 
  className?: string;
  buttonText?: string;
  successMessage?: string;
  eventName?: string;
}) {
  const generatedId = useId();
  const emailInputId = `newsletter-email-${generatedId.replace(/:/g, '')}`;
  const weeklyCheckboxId = `newsletter-weekly-${generatedId.replace(/:/g, '')}`;
  const errorId = `newsletter-error-${generatedId.replace(/:/g, '')}`;

  const { trackEvent } = useAnalytics();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isWeekly, setIsWeekly] = useState(false);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => setStatus('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (error && validateEmail(val)) {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setStatus('loading');
    
    // Simulate an API call for form submission
    setTimeout(() => {
      setStatus('success');
      trackEvent(eventName, { email, is_weekly: isWeekly });
      setEmail('');
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`flex flex-col gap-3 ${className}`}>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <label htmlFor={emailInputId} className="sr-only">Email address</label>
          <div className="relative flex-grow">
            <input 
              type="email" 
              id={emailInputId} 
              aria-label="Email address"
              required 
              value={email}
              onChange={handleChange}
              placeholder="Enter your email address" 
              className={`px-4 py-3 rounded-md border w-full text-slate-900 dark:text-white bg-white dark:bg-slate-800 focus:ring-2 focus:outline-none placeholder-slate-500 dark:placeholder-slate-400 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'}`} 
              disabled={status === 'loading'}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? errorId : undefined}
            />
          </div>
          <button 
            type="submit" 
            disabled={status === 'loading'}
            aria-label={status === 'loading' ? 'Sending...' : buttonText}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium rounded-md whitespace-nowrap transition-colors flex justify-center items-center cursor-pointer"
          >
            {status === 'loading' ? 'Sending...' : buttonText}
          </button>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            id={weeklyCheckboxId}
            aria-label="Send me a weekly summary instead of instant alerts"
            checked={isWeekly}
            onChange={(e) => setIsWeekly(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
          />
          <label htmlFor={weeklyCheckboxId} className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
            Send me a weekly summary instead of instant alerts
          </label>
        </div>

        {error && (
          <div id={errorId} className="text-red-500 text-sm flex items-center gap-1.5" role="alert">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {status === 'success' && (
        <div className="fixed bottom-6 right-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 z-[150] transition-all transform opacity-100 translate-y-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <div className="font-medium text-sm sm:text-base">{successMessage}</div>
          <button 
            onClick={() => setStatus('idle')} 
            className="ml-4 text-slate-400 hover:text-white dark:hover:text-slate-900 p-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}
