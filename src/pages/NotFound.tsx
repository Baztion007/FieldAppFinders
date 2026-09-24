import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';
import { AlertCircle } from 'lucide-react';

export function NotFound() {
  useSEO('Page Not Found', 'The requested page could not be found.');
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-32 text-center flex flex-col items-center">
        <AlertCircle className="w-16 h-16 text-blue-600 dark:text-blue-500 mb-6" />
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">404</h1>
        <h2 className="text-3xl mb-6 text-slate-800 dark:text-slate-200">Page not found</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link 
          to="/" 
          className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </Layout>
  );
}
