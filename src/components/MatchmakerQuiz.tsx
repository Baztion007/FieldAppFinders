import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Factory, Users, Hammer, Wallet } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

type QuizStep = 'industry' | 'size' | 'goal' | 'email' | 'result';

export function MatchmakerQuiz() {
  const { trackEvent } = useAnalytics();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<QuizStep>('industry');
  const [answers, setAnswers] = useState({
    industry: '',
    size: '',
    goal: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleSelect = (field: keyof typeof answers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    
    // Automatically progress
    if (field === 'industry') setStep('size');
    else if (field === 'size') setStep('goal');
    else if (field === 'goal') setStep('email');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Determine recommendation based on answers
    let recommendedSlug = 'housecall-pro';
    if (answers.goal === 'Grow Sales & Lead Generation') {
      recommendedSlug = 'lucrovox';
    } else if (answers.size === '16+' || answers.size === '6-15') {
      recommendedSlug = 'servicem8';
    } else if (answers.size === '1-5') {
      recommendedSlug = 'jobber';
    } else if (answers.industry === 'HVAC' || answers.industry === 'Plumbing') {
      recommendedSlug = 'servicem8';
    }
    
    const recProduct = products.find(p => p.slug === recommendedSlug);
    setRecommendation(recProduct?.slug || 'housecall-pro');

    try {
      await addDoc(collection(db, 'quiz_leads'), {
        ...answers,
        recommendedProduct: recProduct?.name || 'Unknown',
        createdAt: serverTimestamp()
      });
      
      trackEvent('quiz_completion', {
        industry: answers.industry,
        size: answers.size,
        goal: answers.goal,
        recommended: recProduct?.slug
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
    setStep('result');
  };

  const recData = products.find(p => p.slug === recommendation);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl max-w-3xl mx-auto w-full relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800">
        <div 
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: 
            step === 'industry' ? '25%' : 
            step === 'size' ? '50%' : 
            step === 'goal' ? '75%' : 
            '100%' 
          }}
        />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Find Your Perfect CRM in 60 Seconds</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Answer 3 quick questions to get a personalized software recommendation.</p>
      </div>

      {step === 'industry' && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 text-center">What is your primary industry?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['HVAC', 'Plumbing', 'Electrical', 'Landscaping', 'Roofing', 'General Contracting'].map((ind) => (
              <button
                key={ind}
                onClick={() => handleSelect('industry', ind)}
                className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300 font-medium transition-all text-left flex items-center justify-between group"
              >
                {ind}
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'size' && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 text-center">How big is your team?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button onClick={() => handleSelect('size', '1-5')} className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex flex-col items-center gap-3 transition-all">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="font-medium text-slate-900 dark:text-white">1 - 5</span>
              <span className="text-xs text-slate-500 text-center">Solo operator or small crew</span>
            </button>
            <button onClick={() => handleSelect('size', '6-15')} className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex flex-col items-center gap-3 transition-all">
              <Factory className="w-8 h-8 text-blue-500" />
              <span className="font-medium text-slate-900 dark:text-white">6 - 15</span>
              <span className="text-xs text-slate-500 text-center">Growing business with dispatch</span>
            </button>
            <button onClick={() => handleSelect('size', '16+')} className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex flex-col items-center gap-3 transition-all">
              <Hammer className="w-8 h-8 text-blue-500" />
              <span className="font-medium text-slate-900 dark:text-white">16+</span>
              <span className="text-xs text-slate-500 text-center">Large fleet & multiple departments</span>
            </button>
          </div>
        </div>
      )}

      {step === 'goal' && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 text-center">What's your main goal?</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              'Improve Scheduling & Dispatching',
              'Streamline Invoicing & Payments',
              'Grow Sales & Lead Generation',
              'All-in-one Management'
            ].map((goal) => (
              <button
                key={goal}
                onClick={() => handleSelect('goal', goal)}
                className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300 font-medium transition-all text-left flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-slate-400" />
                {goal}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'email' && (
        <div className="animate-in fade-in zoom-in-95 duration-500 max-w-sm mx-auto text-center">
          <Wallet className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">We found your match!</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">Enter your email to see your #1 recommended software and get our free setup checklist.</p>
          
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <label htmlFor="quiz-email-input" className="sr-only">Your email address</label>
            <input
              id="quiz-email-input"
              type="email"
              aria-label="Your email address"
              required
              placeholder="Your email address"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={answers.email}
              onChange={e => setAnswers(prev => ({ ...prev, email: e.target.value }))}
            />
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Show My Match'} <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      )}

      {step === 'result' && recData && (
        <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
          <div className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold rounded-full mb-6 border border-emerald-200 dark:border-emerald-800">
            Top Recommendation
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{recData.name}</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto">{recData.shortDescription}</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate(`/reviews/${recData.slug}`)}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
            >
              Read Full Review
            </button>
            <a 
              href={recData.affiliate?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('affiliate_click', {
                  product_id: recData.id,
                  product_name: recData.name,
                  placement: 'quiz_results'
                });
              }}
              className="w-full sm:w-auto px-8 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl transition-all"
            >
              Visit Website
            </a>
          </div>
          <button 
            onClick={() => setStep('industry')}
            className="mt-8 text-sm text-slate-500 hover:text-slate-700 underline"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}
