import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, StarHalf, Link as LinkIcon, Check, PlusSquare, CheckSquare, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data/products';
import { useAnalytics } from '../hooks/useAnalytics';

import dash1 from '../assets/images/dash1.jpg';
import dash2 from '../assets/images/dash2.jpg';
import dash3 from '../assets/images/dash3.jpg';

export function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div 
      className="flex items-center text-amber-500 dark:text-amber-400"
      role="img" 
      aria-label={`Rated ${rating.toFixed(1)} out of 5 stars`}
    >
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-current" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-current" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-slate-300 dark:text-slate-600" />
      ))}
      <span className="text-slate-800 dark:text-slate-200 text-sm ml-2 font-semibold">{rating.toFixed(1)}</span>
    </div>
  );
}

export function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/reviews/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <button 
        onClick={handleCopy} 
        className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 flex items-center gap-1.5 text-sm transition-colors py-1 px-2 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer" 
        title="Copy Review Link"
        aria-label="Copy link to review"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <LinkIcon className="w-4 h-4" />}
        {copied ? <span className="text-emerald-500 font-medium">Copied!</span> : <span>Copy Link</span>}
      </button>

      {copied && (
        <div className="fixed bottom-6 right-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 z-[150] transition-all transform opacity-100 translate-y-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <div className="font-medium text-sm sm:text-base">Link copied to clipboard!</div>
        </div>
      )}
    </>
  );
}

export interface ProductCardProps {
  product: Product;
  compareSelected?: string[];
  onToggleCompare?: (id: string) => void;
  className?: string;
  key?: React.Key;
}

export function ProductCard({ product, compareSelected = [], onToggleCompare, className = "" }: ProductCardProps) {
  const { trackEvent } = useAnalytics();
  const isSelected = compareSelected.includes(product.id);
  const isDisabled = !isSelected && compareSelected.length >= 2;
  
  // Calculate rough reading time based on content length
  const wordCount = product.shortDescription.split(' ').length + product.pros.length * 10 + product.cons.length * 10 + 200;
  const readTime = Math.max(3, Math.ceil(wordCount / 200));

  // Deterministically assign one of the 3 premium dashboard images
  const images = [dash1, dash2, dash3];
  const charSum = product.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const imageUrl = images[charSum % images.length];

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 2);

  const trackingUrl = (() => {
    try {
      const url = new URL(product.affiliate.url);
      url.searchParams.append('utm_source', 'ContractorStack');
      url.searchParams.append('utm_medium', 'ProductCard');
      return url.toString();
    } catch {
      return product.affiliate.url;
    }
  })();

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-xl shadow-sm border ${product.isFeatured ? 'border-amber-400 dark:border-amber-500 shadow-amber-500/10' : 'border-slate-200 dark:border-slate-800'} overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow relative group ${className}`}>
      {product.isFeatured ? (
        <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 z-20 flex justify-center items-center shadow-md">
          <Star className="w-3.5 h-3.5 mr-1.5 fill-white" /> Editor's Choice
        </div>
      ) : product.rating >= 4.8 ? (
        <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 z-20 flex justify-center items-center shadow-md">
          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Best for Small Business
        </div>
      ) : product.rating >= 4.5 ? (
        <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 z-20 flex justify-center items-center shadow-md">
          <Check className="w-3.5 h-3.5 mr-1.5" /> Verified
        </div>
      ) : null}
      <div className={`w-full aspect-video bg-slate-100 dark:bg-slate-800 relative overflow-hidden ${(product.isFeatured || product.rating >= 4.5) ? 'pt-7' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent pointer-events-none z-10 mix-blend-multiply dark:mix-blend-overlay" />
        <img 
          src={imageUrl} 
          alt={`${product.name} interface preview`} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{product.category}</div>
          {onToggleCompare && (
            <button 
              onClick={() => onToggleCompare(product.id)}
              disabled={isDisabled}
              aria-label={isSelected ? `Remove ${product.name} from comparison` : `Add ${product.name} to comparison`}
              aria-pressed={isSelected}
              className={`flex items-center gap-1.5 text-sm font-medium py-1 px-2 rounded-md transition-colors ${
                isSelected ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50' : 
                isDisabled ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {isSelected ? <CheckSquare className="w-4 h-4" /> : <PlusSquare className="w-4 h-4" />}
              {isSelected ? 'Selected' : 'Compare'}
            </button>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-1 mt-0 text-slate-900 dark:text-white">{product.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={product.rating} />
          <div className="flex items-center text-xs text-slate-600 dark:text-slate-300 font-medium">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {readTime} min read
          </div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">{product.shortDescription}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mr-2 flex-shrink-0" />
            <span className="text-sm text-slate-700 dark:text-slate-300">Starts at ${product.pricing.startingPrice}/{product.pricing.model === 'flat rate' ? 'mo' : 'user'}</span>
          </div>
          {product.pricing.freeTrial && (
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mr-2 flex-shrink-0" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{product.pricing.trialLengthDays}-Day Free Trial</span>
            </div>
          )}
        </div>

        {relatedProducts.length > 0 && (
          <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Related Reviews</div>
            <div className="flex flex-wrap gap-2">
              {relatedProducts.map(rp => (
                <Link 
                  key={rp.id} 
                  to={`/reviews/${rp.slug}`} 
                  className="text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1.5 rounded transition-colors"
                >
                  {rp.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 mt-auto flex flex-col gap-3">
        <a 
          href={`/go/${product.slug}?placement=product_card`}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => trackEvent('affiliate_click', {
            product_id: product.id,
            product_name: product.name,
            placement: 'product_card',
            is_featured: product.isFeatured || false
          })}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          {product.pricing.freeTrial ? 'Start Free Trial' : 'Visit Website'} <ExternalLink className="w-4 h-4" />
        </a>
        <div className="flex items-center justify-between">
          <CopyLinkButton slug={product.slug} />
          <Link 
            to={`/reviews/${product.slug}`} 
            className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-slate-900 dark:hover:text-white flex items-center transition-colors"
            aria-label={`Read full review of ${product.name}`}
          >
            Read Review <ArrowRight className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
