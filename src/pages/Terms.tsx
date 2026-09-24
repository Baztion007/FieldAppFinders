import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';

export function Terms() {
  useSEO('Terms of Use', 'Read the FieldAppFinder Terms of Use, including our FTC Affiliate Disclosure and website guidelines.');

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">Terms of Use</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-12">Last Updated: September 23, 2026</p>

        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-8">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0 mb-2">FTC Affiliate Disclosure</h2>
            <p className="mb-0">
              FieldAppFinder is an independent, reader-supported review site. We may receive commissions when you click our links and make purchases. This does not impact our reviews, comparisons, or recommendations. We only recommend software and services that we believe provide value to home service and field professionals.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and using FieldAppFinder ("the Site"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this site.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. Informational Purposes Only</h2>
          <p>
            The content on FieldAppFinder is for informational and educational purposes only. We strive to provide accurate and up-to-date information, but software pricing, features, and terms change frequently. We do not warrant the completeness, reliability, or accuracy of this information. You should always verify pricing and features directly with the software vendor before making a purchase decision.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. Intellectual Property Rights</h2>
          <p>
            All content, features, and functionality (including but not limited to all information, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by FieldAppFinder, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4. Third-Party Links & Services</h2>
          <p>
            The Site contains links to third-party web sites or services that are not owned or controlled by FieldAppFinder. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">5. Limitation of Liability</h2>
          <p>
            In no event shall FieldAppFinder, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Site; (ii) any conduct or content of any third party on the Site; (iii) any content obtained from the Site; and (iv) unauthorized access, use or alteration of your transmissions or content.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">6. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>
        </div>
      </div>
    </Layout>
  );
}
