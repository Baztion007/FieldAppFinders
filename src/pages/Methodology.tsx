import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';
import { Search, PenTool, CheckCircle, Scale } from 'lucide-react';

export function Methodology() {
  useSEO('Editorial Methodology', 'Discover how FieldAppFinder tests, reviews, and rates home service software platforms to ensure you get honest and accurate recommendations.');

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Editorial Methodology</h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            How we test, rate, and rank the best software for home service professionals.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-12">
          <section>
            <p className="text-lg">
              At FieldAppFinder, building trust with our readers is our highest priority. To help you make the best software decisions for your business, we adhere to a strict, rigorous, and transparent editorial process.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <Search className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Hands-On Testing</h3>
              <p className="text-sm">
                We don't just read marketing material. Our experts sign up for the software, run through onboarding, create mock jobs, dispatch technicians, and generate invoices. We evaluate the UI for intuitiveness, speed, and mobile-friendliness.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <Scale className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Feature Comparison</h3>
              <p className="text-sm">
                We map out every feature a product offers against an industry-standard checklist. We look for gaps in functionality, proprietary limitations, and unique standout tools that give a platform a competitive edge.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <CheckCircle className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Real-World Validation</h3>
              <p className="text-sm">
                Software looks different in the field than it does in a demo. We aggregate verified reviews from platforms like Capterra, G2, and App Store, and interview real contractors to understand where the software shines and where it breaks down.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <PenTool className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Independent Scoring</h3>
              <p className="text-sm">
                Our final ratings (1-5 stars) are calculated using a weighted rubric focusing on: Ease of Use (25%), Feature Set (30%), Value for Money (25%), and Customer Support (20%).
              </p>
            </div>
          </section>

          <section className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Affiliate Independence</h2>
            <p>
              FieldAppFinder is reader-supported. When you buy through links on our site, we may earn an affiliate commission. However, <strong>this does not impact our evaluations.</strong> We routinely give lower ratings to products that pay us if they do not meet our quality standards, and we highlight excellent tools even if they do not offer an affiliate program.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
