import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';

export function Privacy() {
  useSEO('Privacy Policy', 'Read the FieldAppFinder privacy policy to understand how we collect, use, and protect your personal information.');

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">Privacy Policy</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-12">Last Updated: September 23, 2026</p>

        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-8">
          <p>
            At FieldAppFinder, we take your privacy seriously. This Privacy Policy outlines the types of personal information we collect, how it is used, and the steps we take to ensure your personal information is handled appropriately.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. Information We Collect</h2>
          <p>We may collect the following types of information when you interact with our website:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> such as your name and email address when you subscribe to our newsletter or download a lead magnet.</li>
            <li><strong>Usage Data:</strong> automatically collected data such as IP address, browser type, pages visited, and interaction with links (including affiliate links).</li>
            <li><strong>Cookies:</strong> we use cookies to track session data, store preferences, and analyze website traffic.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. How We Use Your Information</h2>
          <p>We use the collected data for various purposes, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our Service.</li>
            <li>To notify you about changes to our Service.</li>
            <li>To provide customer support and respond to inquiries.</li>
            <li>To monitor the usage of our Service and analyze traffic via internal analytics and Google Analytics.</li>
            <li>To track the effectiveness of our affiliate marketing campaigns.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. Affiliate Tracking and Third-Party Links</h2>
          <p>
            FieldAppFinder contains links to affiliate websites. When you click on an affiliate link, a cookie may be placed on your browser to track the referral. If you make a purchase, the affiliate partner will report the sale to us. We do not have access to your credit card information or private account details on these third-party platforms.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4. Data Security</h2>
          <p>
            We implement standard security measures to protect your personal data. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">5. Your Data Rights</h2>
          <p>
            Depending on your location, you may have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, please contact us.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.
          </p>
        </div>
      </div>
    </Layout>
  );
}
