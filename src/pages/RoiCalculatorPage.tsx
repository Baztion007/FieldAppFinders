import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';
import { RoiCalculator } from '../components/RoiCalculator';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export function RoiCalculatorPage() {
  useSEO(
    'Contractor Software ROI & Profit Calculator (2026)',
    'Calculate the exact time savings and revenue gains your home-service business recovers by adopting field service management software. See ROI by trade and crew size.'
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-4">
            <TrendingUp className="w-3.5 h-3.5" /> Interactive Business Assessment
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            How Much Is Manual Paperwork Costing Your Contracting Business?
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Use our data-driven model to estimate recovered revenue from automated scheduling, zero missed calls, faster invoicing, and eliminated technician paperwork.
          </p>
        </div>

        {/* The Interactive Calculator Component */}
        <div className="mb-16">
          <RoiCalculator />
        </div>

        {/* Why Contractors See 300%+ ROI Section */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Where Does the ROI Actually Come From?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base">
              Field Service Management (FSM) software isn't just an administrative expense—it directly plugs revenue leaks across four primary operational areas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg w-fit mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Reclaimed Tech Hours
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Technicians spend an average of 45–60 minutes daily driving to the shop for paper job tickets, handwriting invoices, or calling the office. Digital job sheets and mobile dispatch return those hours to billable field work.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg w-fit mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Instant Payment & Zero DSO
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Collecting payments on mobile card readers upon job completion reduces Days Sales Outstanding (DSO) from 28+ days down to under 48 hours, virtually eliminating bad debt and awkward collection phone calls.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg w-fit mb-4">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Higher Estimate Close Rates
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Multi-option "Good / Better / Best" digital quotes with automated SMS follow-up boost customer acceptance rates by 22% compared to standard paper quotes or text estimates.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg w-fit mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Eliminated No-Shows
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Automated SMS "On My Way" alerts with live technician GPS tracking drop customer no-show rates by over 65%, keeping your trucks profitable and on schedule throughout the day.
              </p>
            </div>
          </div>
        </section>

        {/* Trade Industry Benchmark Table */}
        <section className="mb-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="max-w-2xl mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Industry Software ROI Benchmarks by Trade
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Historical averages based on 500+ contractor survey responses and software analytics.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50">
                  <th className="py-3.5 px-4 font-semibold">Trade Sector</th>
                  <th className="py-3.5 px-4 font-semibold">Avg. Ticket</th>
                  <th className="py-3.5 px-4 font-semibold">Weekly Admin Saved</th>
                  <th className="py-3.5 px-4 font-semibold">Est. Monthly Gain (4 Techs)</th>
                  <th className="py-3.5 px-4 font-semibold">Recommended Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">HVAC & Heating</td>
                  <td className="py-3.5 px-4">$480</td>
                  <td className="py-3.5 px-4">6.5 hours / tech</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">+$6,400 / mo</td>
                  <td className="py-3.5 px-4">
                    <Link to="/reviews/housecall-pro" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Housecall Pro</Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">Plumbing & Drain</td>
                  <td className="py-3.5 px-4">$390</td>
                  <td className="py-3.5 px-4">5.5 hours / tech</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">+$5,800 / mo</td>
                  <td className="py-3.5 px-4">
                    <Link to="/reviews/jobber" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Jobber</Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">Electrical Contracting</td>
                  <td className="py-3.5 px-4">$450</td>
                  <td className="py-3.5 px-4">6.0 hours / tech</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">+$6,100 / mo</td>
                  <td className="py-3.5 px-4">
                    <Link to="/reviews/jobber" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Jobber</Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">Roofing & Exteriors</td>
                  <td className="py-3.5 px-4">$3,800</td>
                  <td className="py-3.5 px-4">8.0 hours / tech</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">+$8,900 / mo</td>
                  <td className="py-3.5 px-4">
                    <Link to="/reviews/jobber" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Jobber</Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">Growing Trade Fleet (5-15 Techs)</td>
                  <td className="py-3.5 px-4">$149</td>
                  <td className="py-3.5 px-4">6.5 hours / tech</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">+$12,800 / mo</td>
                  <td className="py-3.5 px-4">
                    <Link to="/reviews/servicem8" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">ServiceM8</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Top Software Comparison Fast Cards */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Top Software Recommendations by Team Size
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Explore the highest-rated platforms tested and verified by our editorial team.
              </p>
            </div>
            <Link 
              to="/comparisons" 
              className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Compare All Platforms Head-to-Head <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <div 
                key={product.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {product.name}
                    </h3>
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                      ★ {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {product.category}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {product.shortDescription}
                  </p>

                  <ul className="space-y-1.5 mb-6 text-xs text-slate-700 dark:text-slate-300">
                    {product.pros.slice(0, 2).map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Starts at</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      ${product.pricing.startingPrice}
                      <span className="text-xs font-normal text-slate-500">/mo</span>
                    </span>
                  </div>
                  <Link
                    to={`/reviews/${product.slug}`}
                    className="inline-flex items-center text-xs font-bold px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Frequently Asked Questions About Software ROI
          </h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                How accurate is this contractor ROI calculator?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Our model utilizes conservative industry averages drawn from verified user studies across thousands of HVAC, plumbing, and electrical shops. Rather than assuming unrealistic revenue explosions, it focuses on recoverable operational waste: reducing repetitive paperwork by 60%, capturing 35% of otherwise lost after-hours/busy phone leads via online booking, and protecting 5% of no-shows through automated SMS updates.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Will my technicians actually adopt the software in the field?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Technician adoption is the #1 hurdle for field service companies. Modern tools like Jobber and Housecall Pro are specifically built with consumer-grade mobile apps that mimic apps technicians already use (like Uber and Apple Pay). Most crews become comfortable with daily clock-ins, turn-by-turn routing, and taking photo attachments within 3 to 5 business days.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                How long before we break even on the software investment?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Because software subscription costs range from $49 to $350/mo for small to mid-sized crews, winning just 1 or 2 extra service calls or recovering 4 hours of billable tech time completely covers the entire monthly cost. In practice, most contractors achieve full payback within their first 7 to 14 days of live deployment.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
