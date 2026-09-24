import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { products } from '../data/products';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center text-sm text-slate-500 dark:text-slate-400 py-4 mb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto print:hidden" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center" aria-label="Home">
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          let displayName = name.charAt(0).toUpperCase() + name.slice(1);
          
          // Special handling for dynamic review routes
          if (pathnames[0] === 'reviews' && index === 1) {
            const product = products.find(p => p.slug === name);
            if (product) displayName = product.name;
          }

          return (
            <li key={name} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-slate-400" />
              {isLast ? (
                <span className="text-slate-900 dark:text-white font-medium" aria-current="page">
                  {displayName}
                </span>
              ) : (
                <Link to={routeTo} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
