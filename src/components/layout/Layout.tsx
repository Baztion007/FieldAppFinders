import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, ArrowRight, Sun, Moon, Search, Command, Layers, Sparkles } from 'lucide-react';
import { BackToTopButton } from '../BackToTopButton';
import { ExitIntentModal } from '../ExitIntentModal';
import { Breadcrumbs } from '../Breadcrumbs';
import { SearchModal } from '../SearchModal';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Reviews', path: '/reviews' },
    { name: 'Comparisons', path: '/comparisons' },
    { name: 'ROI Calculator', path: '/calculator' },
    { name: 'By Industry', path: '/industries' },
    { name: 'Pricing Guide', path: '/pricing-guide' },
    { name: 'Resources', path: '/resources' },
  ];

  useEffect(() => {
    // Check initial preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <header className="print:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-4">
          
          {/* Left: Brand Identity + Separator + Navigation */}
          <div className="flex items-center gap-6 xl:gap-8 min-w-0">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3 flex-shrink-0" aria-label="FieldAppFinder Home">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 ring-1 ring-blue-500/30 group-hover:scale-105 group-hover:shadow-blue-500/40 transition-all duration-200">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-extrabold text-xl text-slate-900 dark:text-white tracking-tight leading-none">
                  FieldApp<span className="text-blue-600 dark:text-blue-400">Finder</span>
                </span>
                <span className="text-[9.5px] font-semibold tracking-wider uppercase text-slate-600 dark:text-slate-300 leading-tight mt-0.5">
                  Contractor Software
                </span>
              </div>
            </Link>

            {/* Visual Divider between Brand and Navigation */}
            <div className="hidden lg:block h-6 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />

            {/* Desktop Navigation Pills */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-150 whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-semibold shadow-xs ring-1 ring-blue-500/20'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 font-medium'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Search, Theme Toggle & Primary CTA */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 flex-shrink-0">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 rounded-lg transition-all text-sm font-medium border border-transparent hover:border-slate-300 dark:hover:border-slate-600 shadow-xs cursor-pointer group"
              aria-label="Search software (Command K)"
            >
              <Search className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <span className="text-slate-600 dark:text-slate-300 text-xs">Search...</span>
              <kbd className="ml-1 px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-sans shadow-xs text-[10px] text-slate-600 dark:text-slate-300 group-hover:border-slate-300 dark:group-hover:border-slate-500">
                <Command className="w-2.5 h-2.5 inline mr-0.5" />K
              </kbd>
            </button>
            <button 
              onClick={toggleDarkMode} 
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link 
              to="/resources" 
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>Get Buying Guide</span>
            </Link>
          </div>

          {/* Mobile / Tablet Controls */}
          <div className="flex lg:hidden items-center space-x-1">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleDarkMode} 
              className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu Drawer Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`lg:hidden fixed inset-y-0 right-0 z-[70] w-72 sm:w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif font-bold text-lg text-slate-900 dark:text-white">
              FieldApp<span className="text-blue-600 dark:text-blue-400">Finder</span>
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Quick Search inside drawer */}
        <div className="p-3 border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => {
              setIsOpen(false);
              setIsSearchOpen(true);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Search className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            <span>Search software or comparisons...</span>
          </button>
        </div>

        <nav className="px-2 pt-3 pb-3 space-y-1 sm:px-3" aria-label="Mobile Navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path}
                onClick={() => setIsOpen(false)} 
                to={item.path} 
                className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.name}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
              </Link>
            );
          })}
          
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 px-2">
            <Link 
              onClick={() => setIsOpen(false)} 
              to="/resources" 
              className="flex items-center justify-center gap-2 px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all w-full min-h-[48px]"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Get Free Buying Guide</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="print:hidden bg-slate-900 text-slate-300 py-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="group inline-flex items-center gap-3 mb-4" aria-label="FieldAppFinder Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 ring-1 ring-white/10 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif font-bold text-xl text-white tracking-tight">
              FieldApp<span className="text-blue-400">Finder</span>
            </span>
          </Link>
          <p className="text-sm text-slate-300">
            Practical, honest software reviews and growth systems for home-service and field businesses.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/reviews" className="hover:text-white transition-colors">Software Reviews</Link></li>
            <li><Link to="/comparisons" className="hover:text-white transition-colors">Comparisons</Link></li>
            <li><Link to="/calculator" className="hover:text-white transition-colors">ROI Calculator</Link></li>
            <li><Link to="/pricing-guide" className="hover:text-white transition-colors">Pricing & Hidden Fees</Link></li>
            <li><Link to="/industries" className="hover:text-white transition-colors">By Industry</Link></li>
            <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Trust & Legal</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/methodology" className="hover:text-white transition-colors">Editorial Methodology</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Affiliate Disclosure</h4>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <p className="text-sm text-slate-300 flex gap-3 items-start leading-relaxed">
              <ShieldCheck className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" />
              <span>
                <strong>FTC Disclosure:</strong> FieldAppFinder is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. This helps us keep our reviews free and independent.
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-300">
        &copy; {new Date().getFullYear()} FieldAppFinder. All rights reserved.
      </div>
    </footer>
  );
}

export function Layout({ children, hideLayoutElements = false }: { children: React.ReactNode, hideLayoutElements?: boolean }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {!hideLayoutElements && <Header />}
      {!hideLayoutElements && <Breadcrumbs />}
      <main className="flex-grow">{children}</main>
      {!hideLayoutElements && <Footer />}
      <BackToTopButton />
      {!hideLayoutElements && <ExitIntentModal />}
    </div>
  );
}
