import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';
import { industries, Industry } from '../data/industries';
import { products } from '../data/products';
import { Product } from '../types';
import { StarRating } from '../components/ProductCard';
import { useAnalytics } from '../hooks/useAnalytics';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  ChevronRight, 
  ExternalLink, 
  HelpCircle, 
  Check, 
  X, 
  Sparkles, 
  Zap, 
  Wrench, 
  Home as HomeIcon, 
  Trees, 
  Hammer, 
  Calculator, 
  ChevronDown, 
  ChevronUp, 
  Award,
  Layers,
  ArrowUpRight
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Zap,
  Home: HomeIcon,
  Hammer,
  Sparkles,
  Trees
};

export function IndustryGuide() {
  const { slug } = useParams<{ slug: string }>();
  const { trackEvent } = useAnalytics();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const industry = industries.find(ind => ind.slug === slug);

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  const IconComponent = iconMap[industry.iconName] || Wrench;

  // Compile Schema.org JSON-LD for this specific industry guide:
  // 1. BreadcrumbList
  // 2. FAQPage
  // 3. ItemList of ranked software recommendations
  const domain = typeof window !== 'undefined' ? window.location.origin : 'https://contractorstack.com';
  const canonicalPath = `/industries/${industry.slug}`;

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
            'name': 'Software By Industry',
            'item': `${domain}/industries`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': industry.name,
            'item': `${domain}${canonicalPath}`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        'mainEntity': industry.faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      },
      {
        '@type': 'ItemList',
        'name': `Top Recommended Software for ${industry.name} Contractors`,
        'description': industry.description,
        'itemListElement': industry.rankings.map((rank, index) => {
          const product = products.find(p => p.id === rank.productId);
          return {
            '@type': 'ListItem',
            'position': index + 1,
            'name': product ? product.name : rank.productId,
            'description': rank.verdict
          };
        })
      }
    ]
  };

  useSEO(
    industry.metaTitle,
    industry.metaDescription,
    {
      canonicalPath,
      schema
    }
  );

  const handleAffiliateClick = (product: Product, placement: string) => {
    trackEvent('affiliate_click', {
      product_id: product.id,
      product_name: product.name,
      placement: `industry_guide_${industry.slug}_${placement}`
    });
  };

  const otherIndustries = industries.filter(i => i.id !== industry.id);

  return (
    <Layout>
      {/* Breadcrumbs */}
      <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/industries" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Software By Industry</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-slate-200 font-medium">{industry.name}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-12 md:py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-4">
              <IconComponent className="w-3.5 h-3.5" />
              <span>2026 Verified Trade Guide</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>Updated Monthly</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
              {industry.tagline}
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {industry.description}
            </p>

            {/* Keyword tags / search queries targeted */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">Target Workflows:</span>
              {industry.searchVolumeKeywords.slice(0, 3).map((kw, idx) => (
                <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md">
                  #{kw}
                </span>
              ))}
            </div>

            {/* Quick in-page nav */}
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              <a href="#ranked-software" className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm">
                Top Rated Platforms <ChevronDown className="w-3.5 h-3.5" />
              </a>
              <a href="#trade-workflows" className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                Operational Bottlenecks
              </a>
              <a href="#pricing-benchmarks" className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                Cost Benchmarks
              </a>
              <a href="#trade-faqs" className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                Trade FAQs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-16">

            {/* Section 1: Top Ranked Tools for this Trade */}
            <section id="ranked-software" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Top Recommended {industry.name} Platforms
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-8 text-sm sm:text-base">
                Our editorial team ranked each tool based on dispatching agility, mobile invoice speed, inventory controls, and real contractor reviews in the {industry.name} sector.
              </p>

              <div className="space-y-8">
                {industry.rankings.map((rank, idx) => {
                  const product = products.find(p => p.id === rank.productId);
                  if (!product) return null;

                  return (
                    <div 
                      key={product.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                    >
                      {/* Card Header Bar */}
                      <div className="p-6 sm:p-7 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/40">
                        <div className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm flex items-center justify-center flex-shrink-0">
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                {product.name}
                              </h3>
                              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                {rank.badge}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <StarRating rating={product.rating} />
                              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                ({product.rating.toFixed(1)} / 5.0 Rating)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-xs text-slate-400 dark:text-slate-500 block">Starting At</span>
                          <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                            ${product.pricing.startingPrice} <span className="text-xs font-normal text-slate-500">/ {product.pricing.model}</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 sm:p-7">
                        <p className="text-slate-700 dark:text-slate-300 font-medium mb-6 text-base leading-relaxed">
                          {rank.verdict}
                        </p>

                        {/* Pros and Cons */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                          <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-xl p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-2.5 flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              Why It Wins in {industry.name}
                            </h4>
                            <ul className="space-y-2">
                              {rank.pros.map((pro, pIdx) => (
                                <li key={pIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-rose-50/70 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-xl p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 mb-2.5 flex items-center gap-1.5">
                              <X className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                              Trade Drawbacks to Consider
                            </h4>
                            <ul className="space-y-2">
                              {rank.cons.map((con, cIdx) => (
                                <li key={cIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Card CTAs */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                          <a
                            href={product.affiliate.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleAffiliateClick(product, 'primary_cta')}
                            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm text-center inline-flex items-center justify-center gap-2"
                          >
                            <span>Try {product.name} Free</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <Link
                            to={`/reviews/${product.slug}`}
                            className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-medium rounded-xl transition-colors text-center inline-flex items-center justify-center gap-1.5"
                          >
                            <span>Read Full 2026 Review</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 2: Trade Workflows & Bottlenecks */}
            <section id="trade-workflows" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Critical {industry.name} Operational Workflows
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-8 text-sm sm:text-base">
                Generic business software fails in this industry because it ignores specialized field mechanics. Here are the 3 workflows your platform must handle flawlessly:
              </p>

              <div className="grid sm:grid-cols-3 gap-5 mb-8">
                {industry.tradeWorkflows.map((workflow, wIdx) => (
                  <div key={wIdx} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 relative flex flex-col justify-between">
                    <div>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full inline-block mb-3 ${
                        workflow.importance === 'Critical' 
                          ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800' 
                          : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      }`}>
                        {workflow.importance} Priority
                      </span>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                        {workflow.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {workflow.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Challenges & Must-haves */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 rounded-xl p-6">
                  <h3 className="font-bold text-amber-900 dark:text-amber-400 mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Top Bottlenecks & Margin Bleeds
                  </h3>
                  <ul className="space-y-2.5">
                    {industry.challenges.map((challenge, cIdx) => (
                      <li key={cIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 rounded-xl p-6">
                  <h3 className="font-bold text-emerald-900 dark:text-emerald-400 mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Non-Negotiable Software Features
                  </h3>
                  <ul className="space-y-2.5">
                    {industry.keyFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Pricing Benchmarks */}
            <section id="pricing-benchmarks" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {industry.name} Software Pricing Benchmarks
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base">
                Expect to spend between 0.5% and 1.5% of total gross revenue on software. Here is what {industry.name} contractors realistically pay in 2026 based on crew size:
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Solo Operator</span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white block mb-1">
                    {industry.pricingBenchmarks.soloCostMonthly}
                  </span>
                  <span className="text-[11px] text-slate-500">1 user / owner-operator</span>
                </div>

                <div className="p-5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-center relative">
                  <span className="absolute -top-2.5 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Most Common</span>
                  <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider block mb-1">Small Crew (3-5 Techs)</span>
                  <span className="text-2xl font-extrabold text-blue-950 dark:text-blue-100 block mb-1">
                    {industry.pricingBenchmarks.smallCrewCostMonthly.split(' ')[0]}
                  </span>
                  <span className="text-[11px] text-blue-700 dark:text-blue-300">{industry.pricingBenchmarks.smallCrewCostMonthly.replace(/^[^\(]+/, '')}</span>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Fleet (10+ Techs)</span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white block mb-1">
                    {industry.pricingBenchmarks.largeCrewCostMonthly.split(' ')[0]}
                  </span>
                  <span className="text-[11px] text-slate-500">{industry.pricingBenchmarks.largeCrewCostMonthly.replace(/^[^\(]+/, '')}</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-5 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white block mb-2">Key Trade Cost Drivers:</span>
                <ul className="list-disc list-inside space-y-1">
                  {industry.pricingBenchmarks.costDrivers.map((driver, dIdx) => (
                    <li key={dIdx}>{driver}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 4: Interactive ROI Bridge */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg relative overflow-hidden">
              <div className="max-w-xl relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-3 backdrop-blur-sm">
                  <Calculator className="w-3.5 h-3.5" /> Interactive Assessment
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Calculate Your Exact {industry.name} ROI
                </h3>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                  See how much revenue you recover every month by automating client text reminders, preventing missed calls, and reducing unbilled technician paperwork.
                </p>
                <Link
                  to="/calculator"
                  className="px-5 py-3 bg-white hover:bg-blue-50 text-blue-700 font-bold text-sm rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  Open Contractor ROI Calculator <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Section 5: FAQs with Accordion */}
            <section id="trade-faqs" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base">
                Real questions asked by {industry.name} business owners evaluating field management platforms:
              </p>

              <div className="space-y-3">
                {industry.faqs.map((faq, fIdx) => {
                  const isOpen = openFaqIndex === fIdx;
                  return (
                    <div 
                      key={fIdx}
                      className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm sm:text-base"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 flex-shrink-0 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 flex-shrink-0 text-slate-400" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* Sticky Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-6">

              {/* Quick Decision Box */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-2">
                  At A Glance
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4">
                  Quick Recommendations
                </h3>

                <div className="space-y-4 text-xs">
                  {industry.rankings.map((rank, idx) => {
                    const prod = products.find(p => p.id === rank.productId);
                    if (!prod) return null;

                    return (
                      <div key={prod.id} className="pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{prod.name}</span>
                          <span className="text-slate-500 font-medium">${prod.pricing.startingPrice}/mo</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-2">{rank.badge}</p>
                        <a
                          href={prod.affiliate.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleAffiliateClick(prod, 'sidebar_quick_cta')}
                          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-1"
                        >
                          Visit Site <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pricing Transparency Callout */}
              <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block mb-1">
                  Buyer's Advisory
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Avoid Hidden Software Fees
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                  Before signing a contract, review payment processing markups (2.7% vs 3.2%), cancellation penalties, and per-technician user additions.
                </p>
                <Link
                  to="/pricing-guide"
                  className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                >
                  Read Hidden Fees Guide →
                </Link>
              </div>

              {/* Other Trades Directory */}
              <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">
                  Other Trade Software Guides
                </h4>
                <div className="space-y-2">
                  {otherIndustries.map(other => (
                    <Link
                      key={other.id}
                      to={`/industries/${other.slug}`}
                      className="block p-2.5 rounded-lg bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-xs font-semibold text-slate-800 dark:text-slate-200"
                    >
                      {other.name} Software Guide
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </Layout>
  );
}
