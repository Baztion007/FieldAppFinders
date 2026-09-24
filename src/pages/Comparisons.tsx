import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';
import { GitCompare, ArrowRight, CheckCircle2, X } from 'lucide-react';
import comparisonsHeroImage from '../assets/images/comparisons_hero.jpg';

export function Comparisons() {
  useSEO('Software Comparisons', 'Compare the top CRMs and software tools for home service businesses side-by-side.', comparisonsHeroImage);

  const [selectedProduct1, setSelectedProduct1] = useState(products[0]?.id || '');
  const [selectedProduct2, setSelectedProduct2] = useState(products[1]?.id || '');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const p1 = products.find(p => p.id === selectedProduct1);
  const p2 = products.find(p => p.id === selectedProduct2);

  // Pre-generate some popular comparison pairs based on categories
  const popularComparisons = [
    { p1: products.find(p => p.name === 'ServiceM8'), p2: products.find(p => p.name === 'Housecall Pro'), category: 'HVAC & Plumbing' },
    { p1: products.find(p => p.name === 'Jobber'), p2: products.find(p => p.name === 'Housecall Pro'), category: 'General Contracting' },
    { p1: products.find(p => p.name === 'Jobber'), p2: products.find(p => p.name === 'ServiceM8'), category: 'Field Service & Trade Dispatch' },
    { p1: products.find(p => p.name === 'Jobber'), p2: products.find(p => p.name === 'Workiz'), category: 'Field Service & Locksmith' }
  ].filter(c => c.p1 && c.p2) as Array<{ p1: any, p2: any, category: string }>;

  return (
    <Layout>
      <div className="bg-slate-50 dark:bg-slate-900 py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.07] dark:opacity-20 pointer-events-none">
          <img src={comparisonsHeroImage} className="w-full h-full object-cover" alt="Comparisons Background" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-slate-50 dark:from-slate-900/50 dark:to-slate-900" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Software Comparisons</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Not sure which platform is right for your business? We put the most popular software head-to-head so you can see exactly how they stack up.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Dynamic Comparison Builder */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            <div className="flex-1 w-full">
              <label htmlFor="product1" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select Software 1</label>
              <select
                id="product1"
                aria-label="Select first software to compare"
                value={selectedProduct1}
                onChange={(e) => setSelectedProduct1(e.target.value)}
                className="block w-full pl-3 pr-10 py-3 text-base border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm cursor-pointer"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id} disabled={p.id === selectedProduct2}>{p.name} ({p.category})</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 text-slate-500 dark:text-slate-400 mt-6 hidden md:flex">
              <span className="font-bold text-xs italic">VS</span>
            </div>
            
            <div className="flex-1 w-full">
              <label htmlFor="product2" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select Software 2</label>
              <select
                id="product2"
                aria-label="Select second software to compare"
                value={selectedProduct2}
                onChange={(e) => setSelectedProduct2(e.target.value)}
                className="block w-full pl-3 pr-10 py-3 text-base border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm cursor-pointer"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id} disabled={p.id === selectedProduct1}>{p.name} ({p.category})</option>
                ))}
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm animate-pulse">
              <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800">
                <div className="p-6 flex flex-col items-center">
                  <div className="h-8 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-1"></div>
                  <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
                <div className="p-6 flex flex-col items-center">
                  <div className="h-8 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-1"></div>
                  <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((row) => (
                    <div key={row} className="h-10 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : p1 && p2 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800">
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{p1.name}</h3>
                  <div className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    ${p1.pricing.startingPrice} <span className="text-sm font-normal text-slate-600 dark:text-slate-300">/{p1.pricing.model === 'flat rate' ? 'mo' : 'user'}</span>
                  </div>
                  <Link to={`/reviews/${p1.slug}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Read Full Review</Link>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{p2.name}</h3>
                  <div className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    ${p2.pricing.startingPrice} <span className="text-sm font-normal text-slate-600 dark:text-slate-300">/{p2.pricing.model === 'flat rate' ? 'mo' : 'user'}</span>
                  </div>
                  <Link to={`/reviews/${p2.slug}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Read Full Review</Link>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300 text-center uppercase tracking-wider text-sm">
                Core Features
              </div>
              
              <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800">
                <div className="p-6">
                  <ul className="space-y-4">
                    {Object.entries(p1.features).map(([key, value]) => (
                      <li key={key} className="flex items-start">
                        {value ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                        )}
                        <span className="text-slate-700 dark:text-slate-300 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {Object.entries(p2.features).map(([key, value]) => (
                      <li key={key} className="flex items-start">
                        {value ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                        )}
                        <span className="text-slate-700 dark:text-slate-300 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-y border-slate-200 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300 text-center uppercase tracking-wider text-sm">
                Pros & Cons
              </div>
              
              <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800">
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-3 text-sm uppercase tracking-wide">Pros</h4>
                    <ul className="space-y-2">
                      {p1.pros.map((pro, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                          <span className="text-emerald-500 mr-2 font-bold">+</span> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3 text-sm uppercase tracking-wide">Cons</h4>
                    <ul className="space-y-2">
                      {p1.cons.map((con, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                          <span className="text-red-500 mr-2 font-bold">-</span> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-3 text-sm uppercase tracking-wide">Pros</h4>
                    <ul className="space-y-2">
                      {p2.pros.map((pro, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                          <span className="text-emerald-500 mr-2 font-bold">+</span> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3 text-sm uppercase tracking-wide">Cons</h4>
                    <ul className="space-y-2">
                      {p2.cons.map((con, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                          <span className="text-red-500 mr-2 font-bold">-</span> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-t border-slate-200 dark:border-slate-800 flex justify-center">
                <Link 
                  to={`/compare/${p1.slug}-vs-${p2.slug}`} 
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Read the In-Depth Comparison <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Popular Matchups</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularComparisons.map((comp, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
              <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-6 tracking-wide uppercase">{comp.category}</div>
              
              <div className="flex items-center justify-center gap-4 w-full mb-8">
                <div className="w-1/2">
                  <div className="font-bold text-slate-900 dark:text-white text-lg">{comp.p1.name}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Starts at ${comp.p1.pricing.startingPrice}</div>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-xs italic">VS</span>
                </div>
                
                <div className="w-1/2">
                  <div className="font-bold text-slate-900 dark:text-white text-lg">{comp.p2.name}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Starts at ${comp.p2.pricing.startingPrice}</div>
                </div>
              </div>
              
              <Link 
                to={`/compare/${comp.p1.slug}-vs-${comp.p2.slug}`} 
                className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                Read Full Comparison <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-600 dark:bg-blue-900/50 rounded-2xl p-8 md:p-12 text-center border border-blue-700 dark:border-blue-800">
          <GitCompare className="w-12 h-12 text-white dark:text-blue-400 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Not finding what you need?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Check out our complete library of in-depth software reviews to find the perfect fit for your home service business.
          </p>
          <Link 
            to="/reviews" 
            className="inline-flex justify-center items-center px-8 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-blue-50 transition-colors"
          >
            Browse All Reviews
          </Link>
        </div>
      </div>
    </Layout>
  );
}
