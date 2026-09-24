import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';
import { products } from '../data/products';
import { Product } from '../types';
import { useAnalytics } from '../hooks/useAnalytics';
import { 
  DollarSign, 
  AlertTriangle, 
  ShieldCheck, 
  Calculator, 
  HelpCircle, 
  Check, 
  X, 
  ChevronRight, 
  ArrowRight, 
  ExternalLink,
  Lock,
  CreditCard,
  FileSpreadsheet,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
  Percent
} from 'lucide-react';

interface PricingSpec {
  productId: string;
  name: string;
  startingPrice: string;
  baseMonthlyCost: number; // estimated average entry mid-tier plan
  additionalUserCost: number; // per additional user
  processingRateCardPresent: string; // e.g. "2.7% + 30¢"
  processingRateCardPresentPct: number;
  processingRateKeyed: string; // e.g. "3.1% + 30¢"
  processingRateKeyedPct: number;
  setupFee: string;
  contractType: string;
  freeTrialDays: number;
  hiddenFeeWarnings: string[];
}

const pricingSpecs: PricingSpec[] = [
  {
    productId: 'jobber',
    name: 'Jobber',
    startingPrice: '$49/mo',
    baseMonthlyCost: 149, // Connect plan
    additionalUserCost: 29,
    processingRateCardPresent: '2.7% + 30¢',
    processingRateCardPresentPct: 2.7,
    processingRateKeyed: '3.1% + 30¢',
    processingRateKeyedPct: 3.1,
    setupFee: '$0',
    contractType: 'Month-to-month or Annual (-20%)',
    freeTrialDays: 14,
    hiddenFeeWarnings: [
      'Two-way SMS text messaging requires Connect or Grow tier',
      'Advanced route optimization locked behind higher tier plans'
    ]
  },
  {
    productId: 'housecall-pro',
    name: 'Housecall Pro',
    startingPrice: '$69/mo',
    baseMonthlyCost: 149, // Essentials tier
    additionalUserCost: 35,
    processingRateCardPresent: '2.69% + 30¢',
    processingRateCardPresentPct: 2.69,
    processingRateKeyed: '3.09% + 30¢',
    processingRateKeyedPct: 3.09,
    setupFee: '$0 - $199',
    contractType: 'Monthly or Annual (discounted)',
    freeTrialDays: 14,
    hiddenFeeWarnings: [
      'Add-on fees for QuickBooks Desktop sync',
      'Consumer financing takes an origination fee on funded jobs'
    ]
  },
  {
    productId: 'servicem8',
    name: 'ServiceM8',
    startingPrice: '$29/mo',
    baseMonthlyCost: 79,
    additionalUserCost: 0,
    processingRateCardPresent: '2.9% + 30¢ (Tap to Pay on iPhone)',
    processingRateCardPresentPct: 2.9,
    processingRateKeyed: '2.9% + 30¢',
    processingRateKeyedPct: 2.9,
    setupFee: '$0',
    contractType: 'Month-to-month (cancel anytime)',
    freeTrialDays: 14,
    hiddenFeeWarnings: [
      'Monthly job count caps (overages apply if exceeding plan job allotment)',
      'Pre-purchased SMS credit packs required for high-volume text marketing'
    ]
  },
  {
    productId: 'lucrovox',
    name: 'LucroVox',
    startingPrice: '$99/mo',
    baseMonthlyCost: 149,
    additionalUserCost: 0,
    processingRateCardPresent: 'N/A (AI Telecom)',
    processingRateCardPresentPct: 0,
    processingRateKeyed: 'N/A',
    processingRateKeyedPct: 0,
    setupFee: '$0',
    contractType: 'Month-to-month (no lock-in)',
    freeTrialDays: 7,
    hiddenFeeWarnings: [
      'Call minutes overage billing if exceeding monthly AI minutes allowance',
      'Optional vanity phone numbers carry standard carrier line fees'
    ]
  },
  {
    productId: 'workiz',
    name: 'Workiz',
    startingPrice: '$65/mo',
    baseMonthlyCost: 125,
    additionalUserCost: 29,
    processingRateCardPresent: '2.69% + 30¢',
    processingRateCardPresentPct: 2.69,
    processingRateKeyed: '3.19% + 30¢',
    processingRateKeyedPct: 3.19,
    setupFee: '$0',
    contractType: 'Monthly or Annual (-15%)',
    freeTrialDays: 7,
    hiddenFeeWarnings: [
      'Workiz Voice phone system charges per-minute / per-number overages',
      'Advanced automated messaging sequences require higher plans'
    ]
  },
  {
    productId: 'thryv',
    name: 'Thryv',
    startingPrice: '$199/mo',
    baseMonthlyCost: 299,
    additionalUserCost: 40,
    processingRateCardPresent: '2.6% + 30¢',
    processingRateCardPresentPct: 2.6,
    processingRateKeyed: '2.9% + 30¢',
    processingRateKeyedPct: 2.9,
    setupFee: '$250 - $500',
    contractType: 'Usually 12-month minimum term',
    freeTrialDays: 0,
    hiddenFeeWarnings: [
      'High barrier to exit once marketing directories are synced',
      'Less specialized field workflow tools, requiring add-on apps'
    ]
  }
];

const faqs = [
  {
    q: 'How much does contractor software really cost per month?',
    a: 'For a solo contractor or 2-person team, budget between $29 and $149/month for software subscriptions. For a growing 5-technician company, expect between $79 and $349/month (with platforms like ServiceM8 offering flat rates with unlimited users). Adding 24/7 AI call answering with LucroVox runs $99 to $249/month, preventing lost high-ticket emergency calls.'
  },
  {
    q: 'Why are credit card processing fees often higher than the software subscription?',
    a: 'If your business does $50,000/month in credit card volume at a 2.9% rate, you are paying $1,450/month in processing fees—nearly 10x the cost of a typical $149/month software subscription. Always factor in payment processing rates when evaluating total cost of ownership.'
  },
  {
    q: 'Can I negotiate software pricing with contractor SaaS companies?',
    a: 'Yes! End-of-month and end-of-quarter are prime times to negotiate. Sales reps can frequently waive $500 to $2,500 in onboarding fees, grant 20% discounts on annual terms, or throw in extra user licenses at no charge if you mention competing quotes.'
  },
  {
    q: 'What happens to my customer data if I cancel?',
    a: 'Standard platforms (Jobber, Housecall Pro, Workiz) allow you to export all customer databases, invoices, and job history to CSV files before closing your account. Be cautious of vendors that charge "data extraction fees" or hold your historical photos hostage.'
  }
];

export function PricingGuide() {
  const { trackEvent } = useAnalytics();
  const [techCount, setTechCount] = useState<number>(3);
  const [cardVolume, setCardVolume] = useState<number>(35000);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const domain = typeof window !== 'undefined' ? window.location.origin : 'https://fieldappfinder.com';
  const canonicalPath = '/pricing-guide';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${domain}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Pricing & Hidden Fees Guide',
            'item': `${domain}${canonicalPath}`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        'mainEntity': faqs.map(item => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.a
          }
        }))
      },
      {
        '@type': 'Article',
        'headline': 'Contractor Software Pricing & Hidden Fees Guide (2026)',
        'description': 'True monthly costs, per-user pricing, payment processing fees, and contract fine-print for Jobber, ServiceM8, Housecall Pro, LucroVox, and more.',
        'author': {
          '@type': 'Organization',
          'name': 'FieldAppFinder'
        }
      }
    ]
  };

  useSEO(
    'Contractor Software Pricing & Hidden Fees (2026 Breakdown)',
    'Unbiased breakdown of true contractor software costs. Compare monthly subscription plans, per-user fees, credit card processing rates, and contract lock-ins.',
    {
      canonicalPath,
      schema
    }
  );

  // Calculate live simulator costs
  const simulatedCosts = useMemo(() => {
    return pricingSpecs.map(spec => {
      // Base cost + additional users beyond 1
      const extraUsers = Math.max(0, techCount - 1);
      const subTotal = spec.baseMonthlyCost + (extraUsers * spec.additionalUserCost);
      // Assume 70% card present / tap to pay and 30% keyed-in or online invoice
      const effectiveProcessingRate = (spec.processingRateCardPresentPct * 0.7) + (spec.processingRateKeyedPct * 0.3);
      const monthlyProcessingCut = Math.round((cardVolume * (effectiveProcessingRate / 100)));
      const totalMonthlyOutflow = subTotal + monthlyProcessingCut;

      return {
        ...spec,
        subTotal,
        monthlyProcessingCut,
        totalMonthlyOutflow
      };
    });
  }, [techCount, cardVolume]);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-slate-200 font-medium">Pricing & Hidden Fees Guide</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-12 md:py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-4">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Pricing Transparency Audit (2026 Edition)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
              Contractor Software Pricing & Hidden Fees Guide
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              The price on the marketing page is rarely what you actually pay. Discover what field service management software truly costs once you factor in per-technician seat fees, payment processing markups, and onboarding retainers.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" /> Real Contract Data
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" /> Processing Markup Analysis
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" /> Negotiation Scripts
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">

        {/* Interactive True Monthly Cost Simulator */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              <Calculator className="w-4 h-4" /> Live Cost Simulator
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Simulate Your True Monthly Outflow
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Adjust your team size and monthly credit card volume to see how subscription fees + card processing fees compound together:
            </p>
          </div>

          {/* Sliders Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-10 p-6 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="pricing-tech-slider" className="text-sm font-bold text-slate-900 dark:text-white">
                  Field Technicians / Users
                </label>
                <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 px-3 py-0.5 rounded-full">
                  {techCount} {techCount === 1 ? 'Tech' : 'Techs'}
                </span>
              </div>
              <input
                id="pricing-tech-slider"
                type="range"
                min="1"
                max="15"
                step="1"
                value={techCount}
                onChange={(e) => setTechCount(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1 (Solo)</span>
                <span>5 Techs</span>
                <span>10 Techs</span>
                <span>15 Techs</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="pricing-card-slider" className="text-sm font-bold text-slate-900 dark:text-white">
                  Monthly Credit Card Processing Volume
                </label>
                <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 px-3 py-0.5 rounded-full">
                  ${cardVolume.toLocaleString()}/mo
                </span>
              </div>
              <input
                id="pricing-card-slider"
                type="range"
                min="5000"
                max="150000"
                step="5000"
                value={cardVolume}
                onChange={(e) => setCardVolume(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>$5,000</span>
                <span>$50,000</span>
                <span>$100,000</span>
                <span>$150,000</span>
              </div>
            </div>
          </div>

          {/* Results Comparison Table */}
          <div className="relative">
            <div className="sm:hidden text-xs text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
              <span>← Swipe table horizontally to see full breakdown →</span>
            </div>
            <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="py-3 px-4">Platform</th>
                    <th className="py-3 px-4">Software Subscription</th>
                    <th className="py-3 px-4">Card Processing Cut (~2.8%)</th>
                    <th className="py-3 px-4 font-bold text-slate-900 dark:text-white">True Monthly Outflow</th>
                    <th className="py-3 px-4">Contract Term</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {simulatedCosts.map((spec) => (
                  <tr key={spec.productId} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                      <Link to={`/reviews/${spec.productId}`} className="hover:text-blue-600 transition-colors inline-flex items-center gap-1">
                        {spec.name} <ArrowRight className="w-3 h-3 text-slate-400" />
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                      ${spec.subTotal.toLocaleString()}/mo
                      <span className="text-[11px] text-slate-400 block">({techCount} users)</span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                      ${spec.monthlyProcessingCut.toLocaleString()}/mo
                      <span className="text-[11px] text-slate-400 block">{spec.processingRateCardPresent}</span>
                    </td>
                    <td className="py-4 px-4 font-extrabold text-base text-slate-900 dark:text-white">
                      ${spec.totalMonthlyOutflow.toLocaleString()}/mo
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-500">
                      {spec.contractType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

        {/* Section 2: 4 Hidden Fee Gotchas */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              The 4 Dirty Tricks in Contractor SaaS Pricing
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Watch out for these clauses buried in service level agreements before handing over your credit card:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
                Mandatory Processing Surcharges
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Some platforms penalize you with an extra 1% to 1.5% fee if you connect an external merchant processor (e.g., your local bank or Square) instead of using their in-house payment gateway. Always verify whether third-party gateways are permitted and what the surcharge penalty is.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
                The 60-Day Auto-Renewal Trap
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Multi-year SaaS contracts often stipulate that unless you deliver written certified notice of cancellation between 60 and 90 days before your anniversary date, your contract automatically locks you in for another full 12 to 24 months.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
                Micro-Fee Overages on SMS & Calls
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Automated appointment reminders and technician "on-my-way" SMS texts are vital, but some platforms cap you at 500 texts/month before billing $0.03 to $0.05 per message. At 3,000 customer touchpoints a month, this adds $100+ to your bill.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center font-bold mb-4">
                4
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
                Data Hostage Fees
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                A vendor may let you easily export customer names and phone numbers to a CSV, but charge an hourly "engineering fee" ($1,000+) to release your job attachments, equipment serial numbers, and photos if you decide to leave.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Negotiation Playbook */}
        <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-2">
              Insider Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              The Contractor's 4-Step SaaS Negotiation Playbook
            </h2>
            <p className="text-slate-300 text-sm mb-8 leading-relaxed">
              Software companies operate on commission quotas. Use these tested strategies to save up to 30% before signing:
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-blue-500/30 text-blue-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-white mb-1">Time Your Purchase at Month-End or Quarter-End</h4>
                  <p className="text-slate-300 text-xs">Sales managers have strict closing quotas on the 28th through 31st of March, June, September, and December. You have maximum leverage during these final 72 hours.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-blue-500/30 text-blue-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-white mb-1">Demand an Onboarding Fee Waiver</h4>
                  <p className="text-slate-300 text-xs">Always say: <em className="text-blue-200">"We are ready to move forward today, but our budget will not accommodate a $1,500 onboarding fee. If you can waive that line item, send the agreement over."</em> In 8 out of 10 cases, it will be waived or cut in half.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-blue-500/30 text-blue-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-white mb-1">Strike Out Auto-Renewal Windows</h4>
                  <p className="text-slate-300 text-xs">Cross out language requiring 60 days advance written notice for renewal. Request standard 30-day month-to-month conversion upon completion of the initial term.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-blue-500/30 text-blue-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <h4 className="font-bold text-white mb-1">Ask for Free Added Tech Licenses During Ramp-up</h4>
                  <p className="text-slate-300 text-xs">If you plan to hire 2 new technicians next spring, ask for 2 free complementary licenses for the first 90 days as part of your initial contract agreement.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: FAQs */}
        <section className="space-y-6 pt-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Frequently Asked Pricing Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Key answers to common contractor contract and billing questions:
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm sm:text-base"
                  >
                    <span>{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 flex-shrink-0 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 flex-shrink-0 text-slate-400" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </Layout>
  );
}
