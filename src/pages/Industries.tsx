import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { industries } from '../data/industries';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';
import { ProductCard } from '../components/ProductCard';
import { CheckCircle2, AlertTriangle, ArrowRight, ArrowUpRight, DollarSign, Calculator } from 'lucide-react';
import { TradeIndustryMap } from '../components/TradeIndustryMap';

export function Industries() {
  const domain = typeof window !== 'undefined' ? window.location.origin : 'https://fieldappfinder.com';

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
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        'name': 'Best Contractor Software by Trade & Industry (2026)',
        'description': 'Find the best software tools for your specific home service industry. In-depth reviews, workflow breakdowns, and pricing benchmarks.',
        'url': `${domain}/industries`
      }
    ]
  };

  useSEO(
    'Software By Industry - Trade-Specific Contractor Reviews',
    'Find the best software tools for your specific home service trade. In-depth comparisons for HVAC, Plumbing, Electrical, Roofing, General Contracting, and Landscaping.',
    {
      canonicalPath: '/industries',
      schema
    }
  );

  // Group products by category from the products list, matched with detailed industry data
  const groupedProducts = industries.map(industry => ({
    ...industry,
    products: industry.recommendedProductIds
      .map(id => products.find(p => p.id === id))
      .filter((p): p is typeof products[0] => p !== undefined)
  })).filter(group => group.products.length > 0);

  return (
    <Layout>
      <div className="bg-slate-50 dark:bg-slate-900 py-10 sm:py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-6">
              Software by Industry
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6 sm:mb-8">
              Every trade has distinct field mechanics. Explore top-rated software tailored specifically for your trade's dispatching, inventory, estimating, and billing needs.
            </p>
            
            {/* Quick jump pills */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {groupedProducts.map((group) => (
                <a 
                  key={group.id} 
                  href={`#${group.slug}`}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
                >
                  {group.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Magnets Bar */}
      <div className="bg-blue-50/70 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/40 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Looking for hidden software fees or payment processing markup rates?</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/pricing-guide" className="font-bold text-blue-700 dark:text-blue-300 hover:underline flex items-center gap-1">
              Read 2026 Pricing & Fees Guide <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/calculator" className="font-bold text-blue-700 dark:text-blue-300 hover:underline flex items-center gap-1">
              Calculate Software ROI <Calculator className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TradeIndustryMap />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="space-y-16 sm:space-y-24">
          {groupedProducts.map((group) => (
            <section key={group.id} id={group.slug} className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800 first:border-0 first:pt-0">
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      {group.name} Software
                    </h2>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                      {group.products.length} {group.products.length === 1 ? 'Tool' : 'Tools'}
                    </span>
                  </div>

                  {/* Programmatic dedicated trade guide link */}
                  <Link
                    to={`/industries/${group.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm self-start sm:self-auto"
                  >
                    <span>Read Full {group.name} Buyer's Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <p className="text-base text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed mb-6">
                  {group.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-amber-50/70 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl p-6">
                    <h3 className="text-sm sm:text-base font-semibold text-amber-900 dark:text-amber-500 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Unique Trade Challenges
                    </h3>
                    <ul className="space-y-2.5">
                      {group.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-emerald-50/70 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-6">
                    <h3 className="text-sm sm:text-base font-semibold text-emerald-900 dark:text-emerald-500 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Must-Have Features
                    </h3>
                    <ul className="space-y-2.5">
                      {group.keyFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
