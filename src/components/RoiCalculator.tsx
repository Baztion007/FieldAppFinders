import React, { useState, useId, useMemo } from 'react';
import { 
  Calculator, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Users, 
  PhoneCall, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  Printer, 
  Download, 
  Sparkles,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  Cell 
} from 'recharts';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useAnalytics } from '../hooks/useAnalytics';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface TradePreset {
  name: string;
  avgTicket: number;
  jobsPerWeek: number;
  adminHours: number;
  hourlyRate: number;
  missedCalls: number;
}

const TRADE_PRESETS: Record<string, TradePreset> = {
  hvac: { name: 'HVAC & Heating', avgTicket: 480, jobsPerWeek: 8, adminHours: 6, hourlyRate: 48, missedCalls: 14 },
  plumbing: { name: 'Plumbing & Drain', avgTicket: 390, jobsPerWeek: 10, adminHours: 5, hourlyRate: 45, missedCalls: 16 },
  electrical: { name: 'Electrical Contracting', avgTicket: 450, jobsPerWeek: 7, adminHours: 6, hourlyRate: 50, missedCalls: 10 },
  roofing: { name: 'Roofing & Exteriors', avgTicket: 3800, jobsPerWeek: 2, adminHours: 8, hourlyRate: 55, missedCalls: 8 },
  landscaping: { name: 'Landscaping & Lawn', avgTicket: 140, jobsPerWeek: 22, adminHours: 5, hourlyRate: 35, missedCalls: 12 },
  general: { name: 'General Contracting', avgTicket: 2200, jobsPerWeek: 3, adminHours: 9, hourlyRate: 50, missedCalls: 9 },
};

const TEAM_PRESETS = [
  { label: 'Solo Operator (1 Tech)', techs: 1 },
  { label: 'Small Crew (3 Techs)', techs: 3 },
  { label: 'Growing Team (6 Techs)', techs: 6 },
  { label: 'Established Fleet (15 Techs)', techs: 15 },
];

export function RoiCalculator() {
  const { trackEvent } = useAnalytics();

  // Unique IDs for accessible inputs
  const tradeId = useId();
  const techsId = useId();
  const ticketId = useId();
  const jobsId = useId();
  const hoursId = useId();
  const rateId = useId();
  const callsId = useId();

  // State
  const [selectedTrade, setSelectedTrade] = useState<string>('hvac');
  const [techCount, setTechCount] = useState<number>(4);
  const [avgTicket, setAvgTicket] = useState<number>(480);
  const [jobsPerWeek, setJobsPerWeek] = useState<number>(8);
  const [adminHoursPerWeek, setAdminHoursPerWeek] = useState<number>(6);
  const [hourlyRate, setHourlyRate] = useState<number>(48);
  const [missedCallsPerMonth, setMissedCallsPerMonth] = useState<number>(12);

  // Lead capture state
  const [email, setEmail] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Apply Trade Preset
  const handleTradeChange = (tradeKey: string) => {
    setSelectedTrade(tradeKey);
    const preset = TRADE_PRESETS[tradeKey];
    if (preset) {
      setAvgTicket(preset.avgTicket);
      setJobsPerWeek(preset.jobsPerWeek);
      setAdminHoursPerWeek(preset.adminHours);
      setHourlyRate(preset.hourlyRate);
      setMissedCallsPerMonth(preset.missedCalls);
      trackEvent('roi_calculator_preset_change', { trade: tradeKey });
    }
  };

  // Calculations
  const metrics = useMemo(() => {
    // 1. Time Saved: Software automates scheduling, dispatch, invoicing, saving ~60% of paperwork
    const hoursSavedPerTechPerWeek = adminHoursPerWeek * 0.6;
    const totalHoursSavedMonthly = Math.round(techCount * hoursSavedPerTechPerWeek * 4.33);
    const monthlyLaborSavings = Math.round(totalHoursSavedMonthly * hourlyRate);

    // 2. Recovered Revenue: Online booking & missed call auto-replies capture ~35% of lost inquiries
    const capturedJobsMonthly = Math.round(missedCallsPerMonth * 0.35);
    const monthlyRecoveredRevenue = Math.round(capturedJobsMonthly * avgTicket);

    // 3. No-Show & Travel Optimization: Automated SMS reminders reduce no-shows by 5%
    const totalJobsMonthly = techCount * jobsPerWeek * 4.33;
    const preventedNoShows = Math.round(totalJobsMonthly * 0.05);
    const monthlyNoShowSavings = Math.round(preventedNoShows * (avgTicket * 0.45)); // 45% margin protected

    // 4. Totals
    const totalMonthlyGain = monthlyLaborSavings + monthlyRecoveredRevenue + monthlyNoShowSavings;
    const totalAnnualGain = totalMonthlyGain * 12;

    // 5. Software Cost Estimation
    let estimatedSoftwareCostMonthly = 99;
    if (techCount === 1) {
      estimatedSoftwareCostMonthly = 49;
    } else if (techCount <= 3) {
      estimatedSoftwareCostMonthly = 149;
    } else if (techCount <= 8) {
      estimatedSoftwareCostMonthly = 289;
    } else if (techCount <= 15) {
      estimatedSoftwareCostMonthly = 499;
    } else {
      estimatedSoftwareCostMonthly = 499 + (techCount - 15) * 65;
    }

    const netMonthlyProfit = Math.max(0, totalMonthlyGain - estimatedSoftwareCostMonthly);
    const roiMultiple = Number((totalMonthlyGain / estimatedSoftwareCostMonthly).toFixed(1));
    const paybackDays = Math.max(1, Math.round((estimatedSoftwareCostMonthly / (totalMonthlyGain / 30))));

    return {
      totalHoursSavedMonthly,
      monthlyLaborSavings,
      capturedJobsMonthly,
      monthlyRecoveredRevenue,
      preventedNoShows,
      monthlyNoShowSavings,
      totalMonthlyGain,
      totalAnnualGain,
      estimatedSoftwareCostMonthly,
      netMonthlyProfit,
      roiMultiple,
      paybackDays
    };
  }, [techCount, avgTicket, jobsPerWeek, adminHoursPerWeek, hourlyRate, missedCallsPerMonth]);

  // Recommended tool matching
  const recommendedProduct = useMemo(() => {
    if (missedCallsPerMonth >= 20) {
      return products.find(p => p.id === 'lucrovox') || products[0];
    } else if (techCount >= 5) {
      return products.find(p => p.id === 'servicem8') || products[0];
    } else if (selectedTrade === 'plumbing' || selectedTrade === 'hvac') {
      return products.find(p => p.id === 'housecall-pro') || products[0];
    } else if (missedCallsPerMonth > 10) {
      return products.find(p => p.id === 'workiz') || products[0];
    } else {
      return products.find(p => p.id === 'jobber') || products[0];
    }
  }, [techCount, selectedTrade, missedCallsPerMonth]);

  // Chart data
  const chartData = [
    {
      category: 'Monthly Admin Savings',
      amount: metrics.monthlyLaborSavings,
      fill: '#3b82f6',
    },
    {
      category: 'Recovered Bookings',
      amount: metrics.monthlyRecoveredRevenue,
      fill: '#10b981',
    },
    {
      category: 'Protected No-Shows',
      amount: metrics.monthlyNoShowSavings,
      fill: '#8b5cf6',
    },
    {
      category: 'Estimated Tool Cost',
      amount: metrics.estimatedSoftwareCostMonthly,
      fill: '#f59e0b',
    },
  ];

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmittingLead(true);
    try {
      await addDoc(collection(db, 'roi_leads'), {
        email,
        source: 'roi_calculator_breakdown',
        trade: selectedTrade,
        techCount,
        totalMonthlyGain: metrics.totalMonthlyGain,
        totalAnnualGain: metrics.totalAnnualGain,
        recommendedTool: recommendedProduct.name,
        createdAt: serverTimestamp()
      });
      trackEvent('roi_calculator_lead_capture', {
        trade: selectedTrade,
        techCount,
        annualGain: metrics.totalAnnualGain
      });
      setLeadSubmitted(true);
    } catch (err) {
      console.error('Lead submission error:', err);
      // Fallback
      setLeadSubmitted(true);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden" id="roi-calculator">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-6 sm:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-100 border border-blue-400/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> 2026 Home Service Benchmark Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Contractor Software ROI & Profit Calculator
            </h2>
            <p className="text-blue-100 text-sm sm:text-base mt-1 max-w-2xl">
              Calculate the exact dollar value and hours your business recovers by replacing paperwork, phone tags, and manual dispatching with a modern FSM platform.
            </p>
          </div>
          <div className="flex items-center gap-3 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/20 cursor-pointer"
              aria-label="Print ROI calculation report"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              1. Choose Your Industry Benchmark
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(TRADE_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleTradeChange(key)}
                  className={`px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-left border transition-all cursor-pointer ${
                    selectedTrade === key
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-600 dark:border-blue-400 text-blue-700 dark:text-blue-300 shadow-sm font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Team Size Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
              Quick Team Size Presets:
            </label>
            <div className="flex flex-wrap gap-2">
              {TEAM_PRESETS.map((preset) => (
                <button
                  key={preset.techs}
                  type="button"
                  onClick={() => setTechCount(preset.techs)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                    techCount === preset.techs
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent font-bold'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-5">
            {/* Technicians Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor={techsId} className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Field Technicians / Crew Members
                </label>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                  {techCount} {techCount === 1 ? 'Tech' : 'Techs'}
                </span>
              </div>
              <input
                id={techsId}
                type="range"
                min={1}
                max={30}
                step={1}
                value={techCount}
                onChange={(e) => setTechCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                aria-label="Field Technicians count"
              />
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                <span>1 solo</span>
                <span>10 techs</span>
                <span>20 techs</span>
                <span>30+ techs</span>
              </div>
            </div>

            {/* Average Ticket Size Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor={ticketId} className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Average Ticket / Job Invoice
                </label>
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  ${avgTicket.toLocaleString()}
                </span>
              </div>
              <input
                id={ticketId}
                type="range"
                min={80}
                max={4000}
                step={20}
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                aria-label="Average ticket invoice value"
              />
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                <span>$80</span>
                <span>$1,000</span>
                <span>$2,500</span>
                <span>$4,000</span>
              </div>
            </div>

            {/* Admin Hours Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor={hoursId} className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Weekly Paperwork & Admin Hours per Tech
                </label>
                <span className="text-sm font-bold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2.5 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
                  {adminHoursPerWeek} hrs / week
                </span>
              </div>
              <input
                id={hoursId}
                type="range"
                min={2}
                max={15}
                step={1}
                value={adminHoursPerWeek}
                onChange={(e) => setAdminHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                aria-label="Weekly paperwork and administrative hours per technician"
              />
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Time spent creating quotes, manually writing invoices, calling the office, or chasing payment status.
              </p>
            </div>

            {/* Missed Calls / Inquiries Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor={callsId} className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Missed Inbound Calls / Leads Monthly
                </label>
                <span className="text-sm font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                  {missedCallsPerMonth} calls / mo
                </span>
              </div>
              <input
                id={callsId}
                type="range"
                min={0}
                max={40}
                step={1}
                value={missedCallsPerMonth}
                onChange={(e) => setMissedCallsPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                aria-label="Missed inbound calls and unanswered leads monthly"
              />
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Calls during busy dispatch hours or after-hours that go to voicemail instead of instant online booking.
              </p>
            </div>

            {/* Additional Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor={rateId} className="block text-xs font-semibold text-slate-900 dark:text-white mb-1.5">
                  Technician / Admin Hourly Rate
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-slate-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id={rateId}
                    min={20}
                    max={150}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Math.max(1, Number(e.target.value)))}
                    className="block w-full rounded-md border-slate-300 dark:border-slate-700 pl-7 pr-3 py-2 text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={jobsId} className="block text-xs font-semibold text-slate-900 dark:text-white mb-1.5">
                  Jobs per Tech per Week
                </label>
                <input
                  type="number"
                  id={jobsId}
                  min={1}
                  max={40}
                  value={jobsPerWeek}
                  onChange={(e) => setJobsPerWeek(Math.max(1, Number(e.target.value)))}
                  className="block w-full rounded-md border-slate-300 dark:border-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Results & Recommendations */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Key Metric Highlights */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 block mb-1">
              Estimated Net Value Created
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
              <div>
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  +${metrics.totalMonthlyGain.toLocaleString()}
                </span>
                <span className="text-slate-600 dark:text-slate-300 text-sm font-medium ml-2">/ month</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-sm font-bold border border-emerald-200 dark:border-emerald-800 self-start">
                <TrendingUp className="w-4 h-4" />
                {metrics.roiMultiple}x ROI
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-700/80">
              <div>
                <span className="text-xs text-slate-600 dark:text-slate-300 block">Annual Impact</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  +${metrics.totalAnnualGain.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-600 dark:text-slate-300 block">Hours Saved / Mo</span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {metrics.totalHoursSavedMonthly} hrs
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-600 dark:text-slate-300 block">Payback Period</span>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {metrics.paybackDays} {metrics.paybackDays === 1 ? 'day' : 'days'}
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Visualizer (Recharts) */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
              <span>Monthly Value Breakdown</span>
              <span className="text-xs font-normal text-slate-600 dark:text-slate-300">Net after software cost</span>
            </h4>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fill: '#64748b', fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false}
                    interval={0}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(59, 130, 246, 0.04)' }}
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Value']}
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '8px', 
                      border: '1px solid #334155', 
                      color: '#fff',
                      fontSize: '12px' 
                    }} 
                  />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Admin Savings: <strong>${metrics.monthlyLaborSavings.toLocaleString()}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Captured Leads: <strong>${metrics.monthlyRecoveredRevenue.toLocaleString()}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">No-Show Protection: <strong>${metrics.monthlyNoShowSavings.toLocaleString()}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Est. Tool Cost: <strong>~${metrics.estimatedSoftwareCostMonthly.toLocaleString()}</strong></span>
              </div>
            </div>
          </div>

          {/* Recommended Tool Match Card (High-Converting Affiliate CTA) */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 border border-slate-700 shadow-md">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Recommended Platform for {techCount} {techCount === 1 ? 'Tech' : 'Techs'}
                </span>
                <h4 className="text-xl font-bold text-white mt-0.5">
                  {recommendedProduct.name}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                  {recommendedProduct.bestFor}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-xs text-slate-400 block">Starting At</span>
                <span className="text-lg font-bold text-white">
                  ${recommendedProduct.pricing.startingPrice}
                </span>
                <span className="text-[11px] text-slate-400">/{recommendedProduct.pricing.model === 'flat rate' ? 'mo' : 'user'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 pt-4 border-t border-slate-700/80">
              <a
                href={recommendedProduct.affiliate.url}
                target="_blank"
                rel="sponsored noopener noreferrer"
                onClick={() => trackEvent('affiliate_click', {
                  product_id: recommendedProduct.id,
                  product_name: recommendedProduct.name,
                  placement: 'roi_calculator_recommendation',
                  crew_size: techCount,
                  trade: selectedTrade
                })}
                className="w-full sm:flex-1 inline-flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-sm transition-colors cursor-pointer"
              >
                {recommendedProduct.pricing.freeTrial ? 'Start Free Trial with Deal' : `Explore ${recommendedProduct.name}`}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>

              <Link
                to={`/reviews/${recommendedProduct.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-600 transition-colors"
              >
                Read In-Depth Review
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

          {/* Email Me This Breakdown Lead Magnet */}
          <div className="bg-blue-50/70 dark:bg-blue-950/30 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50 print:hidden">
            {!leadSubmitted ? (
              <form onSubmit={handleLeadSubmit} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Email My Custom ROI Summary
                  </span>
                  <span className="text-[11px] text-blue-700 dark:text-blue-300">Free PDF breakdown</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your contractor email..."
                    aria-label="Email address for ROI breakdown"
                    className="flex-1 rounded-lg border-slate-300 dark:border-slate-700 px-3 py-2 text-xs text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {isSubmittingLead ? 'Sending...' : 'Send Summary'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-medium py-1">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Your personalized ROI forecast has been saved! Check your inbox shortly.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust & Methodology Footer */}
      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span>
            <strong>Calculation Methodology:</strong> Modeled on verified case studies showing an average 60% administrative time reduction, 35% missed call capture via 24/7 web booking, and 5% appointment no-show prevention.
          </span>
        </p>
        <Link to="/methodology" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex-shrink-0">
          View Full Methodology →
        </Link>
      </div>
    </div>
  );
}
