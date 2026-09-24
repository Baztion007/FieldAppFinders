import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';
import { useSEO } from '../hooks/useSEO';
import { NewsletterForm } from '../components/NewsletterForm';
import { ProductCard, StarRating } from '../components/ProductCard';
import { Tooltip } from '../components/Tooltip';
import { LeadMagnetWidget } from '../components/LeadMagnetWidget';
import { CheckCircle2, ArrowRight, Search, ChevronDown, ChevronUp, Link as LinkIcon, Check, PlusSquare, CheckSquare, X, GitCompare, Clock, BarChart2, SearchX, History, Star, Calculator, DollarSign, Layers, ShieldCheck } from 'lucide-react';
import homeHeroImage from '../assets/images/home_hero.jpg';
import { RoiCalculator } from '../components/RoiCalculator';
import { ReviewSubmissionModal } from '../components/ReviewSubmissionModal';

const categoryDescriptions: Record<string, string> = {
  'Field Service Management': 'All-in-one platforms to run operations, from scheduling to invoicing.',
  'Plumbing & HVAC Software': 'Specialized tools for complex inventory, truck stock, and service agreements.',
  'Enterprise Field Service': 'Robust platforms designed for large fleets and complex multi-trade operations.',
  'Dispatch & Scheduling': 'Streamlined solutions focusing on fast, on-demand routing and booking.',
  'Small Business CRM': 'Client relationship tools combined with basic scheduling and marketing.',
};

function PollWidget() {
  const [voted, setVoted] = useState(false);
  const [results, setResults] = useState([
    { id: 1, label: 'Missing Leads / Calls', percent: 34 },
    { id: 2, label: 'Scheduling Conflicts', percent: 28 },
    { id: 3, label: 'Slow Estimating', percent: 22 },
    { id: 4, label: 'Collecting Payments', percent: 16 }
  ]);

  const handleVote = (id: number) => {
    if (voted) return;
    setResults(results.map(r => 
      r.id === id 
        ? { ...r, percent: r.percent + 2 } 
        : { ...r, percent: Math.max(1, r.percent - 1) }
    ));
    setVoted(true);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-bold m-0 text-slate-900 dark:text-white">Community Poll</h3>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">What is your biggest operational challenge right now?</p>
      
      <div className="space-y-3">
        {results.map(option => (
          <div key={option.id} className="relative">
            <button 
              onClick={() => handleVote(option.id)}
              disabled={voted}
              className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium relative z-10 transition-colors border ${
                voted 
                  ? 'border-transparent text-slate-800 dark:text-slate-200' 
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{option.label}</span>
                {voted && <span className="font-bold">{option.percent}%</span>}
              </div>
            </button>
            {voted && (
              <div 
                className="absolute inset-0 bg-blue-100 dark:bg-blue-900/40 rounded-md z-0 transition-all duration-1000 ease-out" 
                style={{ width: `${option.percent}%` }}
              />
            )}
          </div>
        ))}
      </div>
      {voted && <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">Thank you for voting! Join 1,200+ other pros.</p>}
    </div>
  );
}

const faqs = [
  {
    question: "Do I really need specialized home-service software?",
    answer: "While general CRMs work, specialized field service management (FSM) software handles industry-specific workflows like dispatching, route optimization, and on-site estimating, saving significant administrative time."
  },
  {
    question: "How much should I expect to pay for contractor software?",
    answer: "Small teams (1-5 users) typically pay $50 to $150 per month. Enterprise solutions for larger fleets can range from $200 to $400+ per technician. Always look out for setup fees and long-term contracts."
  },
  {
    question: "What if my field technicians aren't tech-savvy?",
    answer: "Mobile app usability is crucial. We specifically review the technician mobile experience because software is useless if your field team refuses to use it. Look for tools we've highly rated for ease-of-use."
  },
  {
    question: "Is QuickBooks integration standard?",
    answer: "Most top-tier home service CRMs integrate with QuickBooks Online, but the quality of the sync varies. Some are true two-way syncs, while others only push invoices one way. Check our individual reviews for integration details."
  }
];

import { MatchmakerQuiz } from '../components/MatchmakerQuiz';

export function Home() {
  useSEO('Software Reviews for Home-Service Businesses', 'Practical, honest software reviews and growth systems for home-service businesses. Find the right CRM, estimating, and scheduling tools.');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [compareSelected, setCompareSelected] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('compareSelected');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('compareSelected', JSON.stringify(compareSelected));
  }, [compareSelected]);

  const [showCompareModal, setShowCompareModal] = useState(false);
  
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('recentSearches') || '[]'); } catch { return []; }
  });
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  type CompareHistoryItem = [string, string];
  const [compareHistory, setCompareHistory] = useState<CompareHistoryItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('compareHistory') || '[]'); } catch { return []; }
  });

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
      const newSearches = [searchQuery.trim(), ...recentSearches].slice(0, 5);
      setRecentSearches(newSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
    }
  };

  const openComparisonModal = () => {
    if (compareSelected.length === 2) {
      const pair = [compareSelected[0], compareSelected[1]] as CompareHistoryItem;
      const filtered = compareHistory.filter(h => !(h.includes(pair[0]) && h.includes(pair[1])));
      const newHistory = [pair, ...filtered].slice(0, 3);
      setCompareHistory(newHistory);
      localStorage.setItem('compareHistory', JSON.stringify(newHistory));
      setShowCompareModal(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showCompareModal) {
        setShowCompareModal(false);
      }
    };
    
    if (showCompareModal) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [showCompareModal]);

  const allCategories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort: Featured first, then by rating
  const displayedProducts = (searchQuery || selectedCategory ? filteredProducts : products).slice().sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return b.rating - a.rating;
  });
  const featuredProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  const toggleCompare = (id: string) => {
    setCompareSelected(prev => {
      if (prev.includes(id)) return prev.filter(pId => pId !== id);
      if (prev.length < 2) return [...prev, id];
      return prev;
    });
  };

  const getComparedProducts = () => {
    return products.filter(p => compareSelected.includes(p.id));
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="relative bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {/* Hero Section */}
      <section className="bg-white dark:bg-slate-900 py-16 md:py-24 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">Software Reviews for Home-Service Businesses</h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
              Make confident software decisions. We research and review CRMs, estimating tools, and scheduling software for plumbers, landscapers, cleaners, and contractors.
            </p>
            
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mb-6">
              <label htmlFor="hero-search-input" className="sr-only">Search software by name or industry</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </div>
              <input
                id="hero-search-input"
                type="text"
                aria-label="Search software by name or industry"
                className="block w-full pl-10 pr-3 py-4 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-lg shadow-sm"
                placeholder="Search software by name or industry (e.g., 'HVAC')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              
              {/* Recent Searches Dropdown */}
              {isSearchFocused && recentSearches.length > 0 && searchQuery === '' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50">
                    Recent Searches
                  </div>
                  <ul className="max-h-60 overflow-y-auto">
                    {recentSearches.map((term, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSearchQuery(term);
                            handleSearchSubmit();
                          }}
                          className="w-full text-left px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-3 transition-colors"
                        >
                          <History className="w-4 h-4 text-slate-400" />
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>

            {/* Tag Cloud / Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8 lg:mb-0">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  selectedCategory === null 
                    ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                }`}
              >
                All Tools
              </button>
              {allCategories.map(cat => (
                <Tooltip key={cat} content={categoryDescriptions[cat] || cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                      selectedCategory === cat
                        ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                </Tooltip>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-slate-200 dark:border-slate-700">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent pointer-events-none z-10 mix-blend-multiply dark:mix-blend-overlay" />
            <img src={homeHeroImage} className="w-full h-full object-cover" alt="Professional contractor looking at software on a tablet" />
          </div>
          </div>
        </div>
      </section>

      {/* Matchmaker Quiz Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 md:py-24 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MatchmakerQuiz />
        </div>
      </section>

      {/* Interactive ROI & Time-Savings Calculator Section */}
      <section className="py-16 md:py-20 bg-slate-100/60 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-3">
              <Calculator className="w-3.5 h-3.5" /> Free Interactive Assessment
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Calculate Your Team's Software ROI & Time Savings
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-base">
              Slide to match your crew size, job ticket, and weekly paperwork to see the exact dollar return and hours recovered every month.
            </p>
          </div>
          <RoiCalculator />
        </div>
      </section>

      {/* Featured Carousel Section */}
      {!searchQuery && !selectedCategory && (
        <section className="py-16 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-400 fill-current" />
              <h2 className="text-2xl m-0 text-slate-900 dark:text-white">Featured Top-Rated Tools</h2>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
              {featuredProducts.map(product => (
                <div key={`featured-${product.id}`} className="snap-start snap-always shrink-0 w-[85vw] sm:w-[350px]">
                  <ProductCard 
                    product={product} 
                    compareSelected={compareSelected} 
                    onToggleCompare={toggleCompare} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadMagnetWidget />
      </div>

      {/* All / Searched Software Section with Sidebar */}
      <section id="all-software" className="py-16 md:py-24 bg-white dark:bg-slate-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2>{(searchQuery || selectedCategory) ? 'Search Results' : 'All Reviewed Software'}</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              {(searchQuery || selectedCategory)
                ? `Found ${displayedProducts.length} result${displayedProducts.length === 1 ? '' : 's'} for your criteria.` 
                : 'Comprehensive breakdowns of the industry\'s most popular platforms.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {displayedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {displayedProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      compareSelected={compareSelected} 
                      onToggleCompare={toggleCompare} 
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-12 text-center rounded-xl border border-slate-200 dark:border-slate-700 border-dashed">
                  <div className="bg-white dark:bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 dark:border-slate-800">
                    <SearchX className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No matches found</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                    We couldn't find any software matching "{searchQuery}". Try adjusting your filters or search terms.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    <X className="w-4 h-4" /> Clear all filters
                  </button>
                </div>
              )}
            </div>
            
            {/* Sidebar content */}
            <div className="lg:col-span-1 space-y-8">
              <PollWidget />
            </div>
          </div>
        </div>
      </section>

      {/* High-Intent Decision Tools & Guides */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Essential Contractor Software Research
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Unbiased financial breakdowns, trade-tailored buying playbooks, and interactive calculation engines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              to="/pricing-guide" 
              className="group bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500/50 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">Financial Investigation</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                2026 True Pricing & Hidden Fees Guide
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-grow">
                Interactive simulator exposing payment processing markup rates, per-tech add-ons, implementation costs, and vendor lock-in traps.
              </p>
              <div className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                <span>Explore True Costs</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link 
              to="/industries" 
              className="group bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500/50 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">Trade Buyer's Playbooks</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Software Guides by Trade & Industry
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-grow">
                Dedicated trade guides for HVAC, Plumbing, Electrical, Roofing, General Contractors, and Landscaping with workflows and pricing benchmarks.
              </p>
              <div className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                <span>View Trade Guides</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link 
              to="/calculator" 
              className="group bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500/50 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">Interactive Math Engine</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Contractor ROI & Payback Calculator
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-grow">
                Calculate your exact billable hours recovered, lost revenue prevention, and monthly net profit impact based on your crew size.
              </p>
              <div className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                <span>Calculate Your ROI</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Review Submissions (What Pros Are Saying placeholder) */}
      <section className="py-16 md:py-24 bg-blue-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4">What Pros Are Saying</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            We are actively collecting real, verified reviews from home-service professionals to build a transparent community resource. 
            We strictly refuse to publish fake testimonials or manipulated quotes.
          </p>
          <button 
            onClick={() => setIsReviewModalOpen(true)}
            className="px-6 py-3 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-semibold rounded-md border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            Submit Your Software Experience
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 max-w-md mx-auto">
            All submissions are verified against proof of business before publication to maintain editorial integrity.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2>Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Common questions about selecting and implementing home-service software.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4 mt-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Lead Magnet (Footer CTA) */}
      <section id="newsletter" className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4">Don't buy the wrong CRM.</h2>
            <p className="text-slate-300 mb-8 text-lg">
              Download our "Home-Service Software Buying Checklist" – 27 critical questions you must ask before committing to any software subscription. Join 5,000+ contractors who receive our weekly software tips.
            </p>
            <NewsletterForm className="max-w-md mx-auto" />
            <p className="text-xs text-slate-300 mt-4 text-center">
              We respect your privacy. Unsubscribe at any time. By signing up, you agree to our <Link to="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Compare Action Bar */}
      {compareSelected.length > 0 && !showCompareModal && (
        <div className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bg-slate-900 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-full shadow-2xl flex items-center justify-between sm:justify-start gap-3 sm:gap-6 z-40 border border-slate-700 animate-in slide-in-from-bottom-8 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
            <span className="font-medium text-xs sm:text-sm whitespace-nowrap">
              {compareSelected.length} {compareSelected.length === 1 ? 'tool' : 'tools'} selected
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 border-l border-slate-700 pl-3 sm:pl-6">
            {compareSelected.length === 2 ? (
              <button 
                onClick={openComparisonModal}
                className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-colors whitespace-nowrap shadow-sm cursor-pointer"
              >
                Compare Now
              </button>
            ) : (
              <span className="text-xs sm:text-sm text-slate-400 italic">Select one more</span>
            )}
            <button 
              onClick={() => setCompareSelected([])}
              className="text-slate-300 hover:text-white p-1.5 sm:p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
              title="Clear Selection"
              aria-label="Clear selection"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showCompareModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="comparison-title"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl my-4 sm:my-8 relative flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 id="comparison-title" className="text-lg sm:text-2xl m-0 flex items-center gap-2 sm:gap-3 text-slate-900 dark:text-white">
                <GitCompare className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" /> Software Comparison
              </h2>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Close comparison modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-4 sm:p-6">
              {/* Recent Comparisons History */}
              {compareHistory.length > 0 && (
                <div className="mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">Recently Compared</h4>
                  <div className="flex flex-wrap gap-2">
                    {compareHistory.map((pair, idx) => {
                      const p1 = products.find(p => p.id === pair[0]);
                      const p2 = products.find(p => p.id === pair[1]);
                      if (!p1 || !p2) return null;
                      return (
                        <button
                          key={idx}
                          onClick={() => setCompareSelected([p1.id, p2.id])}
                          className="px-3 py-1.5 text-sm bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-md transition-colors flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer"
                        >
                          <History className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                          {p1.name} vs {p2.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                {/* Desktop Divider */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2"></div>
                
                {getComparedProducts().map((p, idx) => (
                  <div key={p.id} className={idx === 1 ? 'border-t border-slate-200 dark:border-slate-800 pt-8 mt-8 md:border-0 md:pt-0 md:mt-0' : ''}>
                    <div className="mb-6">
                      <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">{p.category}</div>
                      <h3 className="text-3xl mb-2 text-slate-900 dark:text-white">{p.name}</h3>
                      <StarRating rating={p.rating} />
                      <p className="text-slate-600 dark:text-slate-300 mt-4">{p.shortDescription}</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 border-b border-slate-100 dark:border-slate-800 pb-2">Pricing</h4>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">${p.pricing.startingPrice} <span className="text-sm font-normal text-slate-600 dark:text-slate-300">/ {p.pricing.model}</span></div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{p.pricing.freeTrial ? `${p.pricing.trialLengthDays}-day free trial` : 'No free trial available'}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 border-b border-slate-100 dark:border-slate-800 pb-2">Best For</h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{p.bestFor}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1.5"><Check className="w-4 h-4" /> Top Pros</h4>
                        <ul className="space-y-2">
                          {p.pros.slice(0, 3).map((pro, i) => (
                            <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                              <span className="text-emerald-500 font-bold">•</span> {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 mt-auto">
                        <Link 
                          to={`/reviews/${p.slug}`} 
                          className="block w-full py-3 px-4 bg-slate-50 dark:bg-slate-800 text-center text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                        >
                          Read Full Review
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {getComparedProducts().length === 2 && (
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                  <Link
                    to={`/compare/${getComparedProducts()[0].slug}-vs-${getComparedProducts()[1].slug}`}
                    onClick={() => setShowCompareModal(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    View Full In-Depth Head-to-Head Comparison →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contractor Review Modal */}
      <ReviewSubmissionModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
}
