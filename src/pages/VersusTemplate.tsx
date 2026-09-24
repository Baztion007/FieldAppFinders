import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';
import { useAnalytics } from '../hooks/useAnalytics';
import { CheckCircle2, X, ExternalLink, ShieldAlert, Check } from 'lucide-react';
import comparisonsHeroImage from '../assets/images/comparisons_hero.jpg';

export function VersusTemplate() {
  const { matchup } = useParams<{ matchup: string }>();
  const { trackEvent } = useAnalytics();

  let p1: (typeof products)[0] | undefined;
  let p2: (typeof products)[0] | undefined;

  if (matchup) {
    const cleanMatchup = matchup.toLowerCase().trim();
    const vsIndex = cleanMatchup.indexOf('-vs-');
    if (vsIndex !== -1) {
      const slug1 = cleanMatchup.substring(0, vsIndex);
      const slug2 = cleanMatchup.substring(vsIndex + 4);
      p1 = products.find(p => p.slug.toLowerCase() === slug1 || p.id.toLowerCase() === slug1);
      p2 = products.find(p => p.slug.toLowerCase() === slug2 || p.id.toLowerCase() === slug2);
    }
  }

  const currentYear = new Date().getFullYear();

  useSEO(
    p1 && p2 ? `${p1.name} vs ${p2.name}: Which is Better in ${currentYear}?` : 'Comparison Not Found',
    p1 && p2 ? `Comprehensive comparison of ${p1.name} vs ${p2.name}. Find out which software is best for your home service business based on pricing, features, and real reviews.` : '',
    comparisonsHeroImage
  );

  if (!p1 || !p2) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Comparison Not Found</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">We could not find the software matchup you requested.</p>
          <Link to="/comparisons" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
            Return to Comparisons
          </Link>
        </div>
      </Layout>
    );
  }

  // Structured Data (FAQ Schema for AEO)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is ${p1.name} cheaper than ${p2.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${p1.name} starts at $${p1.pricing.startingPrice}/${p1.pricing.model === 'flat rate' ? 'mo' : 'user'} while ${p2.name} starts at $${p2.pricing.startingPrice}/${p2.pricing.model === 'flat rate' ? 'mo' : 'user'}. ${p1.pricing.startingPrice < p2.pricing.startingPrice ? p1.name : p2.name} has a lower starting price.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the main difference between ${p1.name} and ${p2.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${p1.name} is best for ${p1.bestFor.toLowerCase()}, whereas ${p2.name} excels at ${p2.bestFor.toLowerCase()}.`
        }
      }
    ]
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md text-xs text-slate-600 dark:text-slate-400 mb-8 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
          <p>
            <strong className="dark:text-slate-300">Affiliate Disclosure:</strong> If you purchase through our links, we may earn a commission. This helps keep FieldAppFinder free.
          </p>
        </div>

        {/* Hero Section */}
        <header className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              {p1.name} <span className="text-blue-600 dark:text-blue-500 font-normal italic">vs</span> {p2.name}
            </h1>
          </div>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Which software is right for your contracting business in {currentYear}? Read our definitive breakdown.
          </p>
        </header>

        {/* TL;DR / The Verdict (AEO/GEO Optimized) */}
        <section className="bg-blue-50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700 rounded-xl p-5 sm:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" /> The Bottom Line (TL;DR)
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm sm:text-base">
            If you need a tool specifically for <strong>{p1.bestFor.toLowerCase()}</strong>, then <a href={`/go/${p1.slug}?placement=versus_tldr`} target="_blank" rel="sponsored noopener noreferrer" onClick={() => trackEvent('affiliate_click', { product_id: p1.id, product_name: p1.name, placement: 'versus_tldr' })} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">{p1.name}</a> is the better choice.
          </p>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
            However, if your primary focus is <strong>{p2.bestFor.toLowerCase()}</strong>, we recommend going with <a href={`/go/${p2.slug}?placement=versus_tldr`} target="_blank" rel="sponsored noopener noreferrer" onClick={() => trackEvent('affiliate_click', { product_id: p2.id, product_name: p2.name, placement: 'versus_tldr' })} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">{p2.name}</a>.
          </p>
        </section>

        {/* Feature Comparison Table (GEO Optimized) */}
        <section className="mb-16 scroll-mt-24" id="features">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Feature Comparison Table</h2>
            <span className="sm:hidden text-xs text-slate-500 dark:text-slate-400">← Swipe to compare features →</span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full min-w-[500px] text-left bg-white dark:bg-slate-900 text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800">
                  <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-semibold text-slate-900 dark:text-white w-1/3">Feature</th>
                  <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-semibold text-slate-900 dark:text-white text-center w-1/3 text-base sm:text-lg">{p1.name}</th>
                  <th className="px-4 sm:px-6 py-3.5 sm:py-4 font-semibold text-slate-900 dark:text-white text-center w-1/3 text-base sm:text-lg">{p2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-slate-700 dark:text-slate-300">Starting Price</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-center text-slate-700 dark:text-slate-300 font-semibold">${p1.pricing.startingPrice} <span className="text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-400">/{p1.pricing.model === 'flat rate' ? 'mo' : 'user'}</span></td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-center text-slate-700 dark:text-slate-300 font-semibold">${p2.pricing.startingPrice} <span className="text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-400">/{p2.pricing.model === 'flat rate' ? 'mo' : 'user'}</span></td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-slate-700 dark:text-slate-300">Free Trial</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">{p1.pricing.freeTrial ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 dark:text-slate-600 mx-auto" />}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">{p2.pricing.freeTrial ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 dark:text-slate-600 mx-auto" />}</td>
                </tr>
                {Object.keys(p1.features).map((featureKey) => {
                  const key = featureKey as keyof typeof p1.features;
                  return (
                    <tr key={key} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-slate-700 dark:text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">{p1.features[key] ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 dark:text-slate-600 mx-auto" />}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">{p2.features[key] ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 dark:text-slate-600 mx-auto" />}</td>
                    </tr>
                  )
                })}
                <tr className="bg-slate-50 dark:bg-slate-800 border-t-2 border-slate-200 dark:border-slate-700">
                  <td className="px-4 sm:px-6 py-4 sm:py-6"></td>
                  <td className="px-4 sm:px-6 py-4 sm:py-6 text-center">
                    <a 
                      href={`/go/${p1.slug}?placement=versus_table`}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      onClick={() => trackEvent('affiliate_click', { product_id: p1.id, product_name: p1.name, placement: 'versus_table' })}
                      className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm w-full cursor-pointer"
                    >
                      Visit {p1.name} <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5" />
                    </a>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-6 text-center">
                    <a 
                      href={`/go/${p2.slug}?placement=versus_table`}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      onClick={() => trackEvent('affiliate_click', { product_id: p2.id, product_name: p2.name, placement: 'versus_table' })}
                      className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm w-full cursor-pointer"
                    >
                      Visit {p2.name} <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Dives */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Why choose {p1.name}?</h2>
          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 mb-8">
            <p>{p1.shortDescription}</p>
            <h3 className="text-lg font-semibold mt-6 mb-3">Pros:</h3>
            <ul className="space-y-2 list-none pl-0">
              {p1.pros.map((pro, i) => (
                <li key={i} className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" /> {pro}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Why choose {p2.name}?</h2>
          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 mb-8">
            <p>{p2.shortDescription}</p>
            <h3 className="text-lg font-semibold mt-6 mb-3">Pros:</h3>
            <ul className="space-y-2 list-none pl-0">
              {p2.pros.map((pro, i) => (
                <li key={i} className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" /> {pro}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* AEO FAQ Section */}
        <section className="mb-16 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Is {p1.name} cheaper than {p2.name}?</h3>
              <p className="text-slate-700 dark:text-slate-300">
                {p1.name} starts at ${p1.pricing.startingPrice} per {p1.pricing.model === 'flat rate' ? 'month' : 'user'} while {p2.name} starts at ${p2.pricing.startingPrice} per {p2.pricing.model === 'flat rate' ? 'month' : 'user'}. 
                {p1.pricing.startingPrice < p2.pricing.startingPrice ? ` Overall, ${p1.name} offers a lower barrier to entry.` : ` Overall, ${p2.name} offers a lower barrier to entry.`}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">What is the main difference between {p1.name} and {p2.name}?</h3>
              <p className="text-slate-700 dark:text-slate-300">
                The primary difference lies in their target audience and core strengths. {p1.name} is specifically designed for {p1.bestFor.toLowerCase()}. On the other hand, {p2.name} is better suited for {p2.bestFor.toLowerCase()}.
              </p>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
