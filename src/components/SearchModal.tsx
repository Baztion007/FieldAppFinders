import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Command, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // The parent component should handle opening, but we catch it here just in case
          // if it's already open, we close it
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.length > 1 
    ? products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-start justify-center pt-4 sm:pt-20 px-3 sm:px-4 bg-slate-900/60 backdrop-blur-sm print:hidden"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="fixed inset-0 transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[85vh] sm:max-h-[80vh] overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input */}
        <div className="relative flex items-center p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800">
          <label htmlFor="global-search-input" className="sr-only">Search software, categories, or comparisons</label>
          <Search className="w-5 h-5 text-slate-500 dark:text-slate-400 absolute left-4 sm:left-6" />
          <input
            id="global-search-input"
            ref={inputRef}
            type="text"
            role="searchbox"
            aria-label="Search software, categories, or comparisons"
            className="w-full bg-transparent border-0 pl-8 sm:pl-10 pr-10 py-1.5 sm:py-2 text-base sm:text-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-0 focus:outline-none"
            placeholder="Search software or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            aria-label="Close search dialog"
            className="absolute right-3 sm:right-4 p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-md cursor-pointer"
          >
            <span className="sr-only">Close search</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1 p-2">
          {query.length <= 1 ? (
            <div className="p-8 text-center text-slate-600 dark:text-slate-300">
              <p>Type to search for HVAC, Plumbing, or Electrical software...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-600 dark:text-slate-300">
              <p>No results found for "{query}".</p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Products
              </div>
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    navigate(`/reviews/${product.slug}`);
                    onClose();
                  }}
                  className="w-full text-left px-3 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between group transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-slate-900 dark:text-white font-medium">{product.name}</span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">{product.category}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-center gap-4 text-xs text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-sans shadow-sm"><Command className="w-3 h-3 inline" />K</kbd> to open search</span>
          <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-sans shadow-sm">esc</kbd> to close</span>
        </div>

      </div>
    </div>
  );
}
