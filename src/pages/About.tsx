import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';
import { ShieldCheck, Target, Users, Wrench } from 'lucide-react';

export function About() {
  useSEO('About Us', 'Learn more about FieldAppFinder, our mission, and our team of home service software experts.');

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">About FieldAppFinder</h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We are dedicated to helping home service and field trade businesses navigate the complex world of software, CRM, and mobile dispatch tools.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" /> Our Mission
              </h2>
              <p>
                The home service industry is rapidly digitizing, but finding the right software feels like a full-time job. Our mission is to cut through the marketing jargon and provide honest, comprehensive, and side-by-side comparisons of the top software platforms.
              </p>
              <p>
                We believe that the right technology can transform a struggling contracting business into a highly profitable, automated machine.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Wrench className="w-6 h-6 text-blue-600" /> Who We Serve
              </h2>
              <p>
                FieldAppFinder is built specifically for HVAC technicians, plumbers, electricians, landscapers, roofers, and general contractors. Whether you are a solo operator looking for your first invoicing tool or a 50-truck fleet needing advanced routing and dispatch, we have the insights you need.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-600" /> Our Promise
            </h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Unbiased Reviews:</strong> While we may earn affiliate commissions, our ratings are strictly based on our editorial methodology. We never accept payment to inflate a rating.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Real User Feedback:</strong> We aggregate insights from real contractors who use these tools in the field every day.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Up-to-Date Information:</strong> Software changes fast. We continuously update our reviews and pricing data to ensure you have the most accurate information.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
