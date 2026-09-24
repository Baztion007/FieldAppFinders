import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';
import { ProductCard } from '../components/ProductCard';
import { Star, ArrowDownAZ } from 'lucide-react';
import reviewsHeroImage from '../assets/images/reviews_hero.jpg';

export function Reviews() {
  useSEO('All Software Reviews', 'Read comprehensive reviews of CRMs, estimating, and scheduling tools for home service businesses.');

  const [sortBy, setSortBy] = useState('rating-desc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'rating-desc') {
      return b.rating - a.rating;
    } else if (sortBy === 'rating-asc') {
      return a.rating - b.rating;
    } else if (sortBy === 'date-desc') {
      return new Date(b.lastVerifiedDate).getTime() - new Date(a.lastVerifiedDate).getTime();
    } else if (sortBy === 'date-asc') {
      return new Date(a.lastVerifiedDate).getTime() - new Date(b.lastVerifiedDate).getTime();
    }
    return 0;
  });

  return (
    <Layout>
      <div className="bg-slate-50 dark:bg-slate-900 py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.07] dark:opacity-20 pointer-events-none">
          <img src={reviewsHeroImage} className="w-full h-full object-cover" alt="Reviews Background" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-slate-50 dark:from-slate-900/50 dark:to-slate-900" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">All Software Reviews</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Browse our complete library of in-depth, hands-on software reviews. We evaluate each platform on usability, feature depth, value for money, and customer support.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong className="text-slate-900 dark:text-white">{sortedProducts.length}</strong> reviewed platforms
          </p>
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm font-medium text-slate-700 dark:text-slate-300">Sort by:</label>
            <select
              id="sort"
              aria-label="Sort software reviews by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-3 pr-8 py-2 text-sm border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm cursor-pointer w-full sm:w-auto"
            >
              <option value="rating-desc">Rating: Highest to Lowest</option>
              <option value="rating-asc">Rating: Lowest to Highest</option>
              <option value="date-desc">Date: Newest to Oldest</option>
              <option value="date-asc">Date: Oldest to Newest</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((cardIdx) => (
              <div key={cardIdx} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-full animate-pulse">
                <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800"></div>
                <div className="p-6 flex-grow">
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                  <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
