import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { BarChart3, TrendingUp, MousePointerClick, Users, Mail, Trash2, PieChart, MessageSquare, CheckCircle2, XCircle, Star, Filter, ShieldCheck } from 'lucide-react';
import { products } from '../data/products';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, getDoc, writeBatch, query, orderBy, limit, updateDoc, deleteDoc } from 'firebase/firestore';

export interface AdminReview {
  id: string;
  productId: string;
  productName: string;
  authorName: string;
  companyName: string;
  trade: string;
  rating: number;
  headline: string;
  pros: string;
  cons: string;
  recommend: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: any;
}

export function AdminReports() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'reviews'>('analytics');
  const [stats, setStats] = useState<Record<string, { clicks: number, name: string }>>({});
  const [views, setViews] = useState<Record<string, { views: number }>>({});
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalSubs, setTotalSubs] = useState(0);
  const [recentClicks, setRecentClicks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Community Reviews state
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isUpdatingReview, setIsUpdatingReview] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load Product Stats from Firebase
      const productStatsSnapshot = await getDocs(collection(db, 'product_stats'));
      const newStats: Record<string, { clicks: number, name: string }> = {};
      const newViews: Record<string, { views: number }> = {};
      
      productStatsSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.clicks) {
          newStats[doc.id] = { clicks: data.clicks, name: data.name || 'Unknown' };
        }
        if (data.views) {
          newViews[doc.id] = { views: data.views };
        }
      });
      setStats(newStats);
      setViews(newViews);

      // Load Recent Clicks
      const clicksQuery = query(collection(db, 'affiliate_clicks'), orderBy('createdAt', 'desc'), limit(15));
      const clicksSnapshot = await getDocs(clicksQuery);
      const fetchedClicks: any[] = [];
      clicksSnapshot.forEach(doc => {
        fetchedClicks.push({ id: doc.id, ...doc.data() });
      });
      setRecentClicks(fetchedClicks);

      // Load Totals from Firebase
      const totalsDoc = await getDoc(doc(db, 'analytics', 'totals'));
      if (totalsDoc.exists()) {
        const totalsData = totalsDoc.data();
        setTotalLeads(totalsData.totalLeads || 0);
        setTotalSubs(totalsData.totalSubs || 0);
      } else {
        setTotalLeads(0);
        setTotalSubs(0);
      }

      // Load Reviews
      try {
        const reviewsQuery = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
        const reviewsSnapshot = await getDocs(reviewsQuery);
        const fetchedReviews: AdminReview[] = [];
        reviewsSnapshot.forEach(doc => {
          fetchedReviews.push({ id: doc.id, ...doc.data() } as AdminReview);
        });
        setReviews(fetchedReviews);
      } catch (revErr) {
        console.warn('Could not fetch reviews collection:', revErr);
      }
    } catch (e) {
      console.error('Error reading stats from Firebase', e);
      // Fallback to local storage
      const stored = localStorage.getItem('admin_affiliate_stats');
      if (stored) setStats(JSON.parse(stored));
      const storedViews = localStorage.getItem('admin_product_views');
      if (storedViews) setViews(JSON.parse(storedViews));
      setTotalLeads(parseInt(localStorage.getItem('admin_total_leads') || '0', 10));
      setTotalSubs(parseInt(localStorage.getItem('admin_total_subs') || '0', 10));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateReviewStatus = async (reviewId: string, newStatus: 'approved' | 'rejected') => {
    setIsUpdatingReview(reviewId);
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      await updateDoc(reviewRef, { status: newStatus });
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
    } catch (err) {
      console.error('Failed to update review status:', err);
      alert('Error updating review status.');
    } finally {
      setIsUpdatingReview(null);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this review?')) return;
    setIsUpdatingReview(reviewId);
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (err) {
      console.error('Failed to delete review:', err);
      alert('Error deleting review.');
    } finally {
      setIsUpdatingReview(null);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to clear all tracking data from the database?")) {
      try {
        const batch = writeBatch(db);
        
        // Reset totals
        const totalsRef = doc(db, 'analytics', 'totals');
        batch.set(totalsRef, { totalLeads: 0, totalSubs: 0 });
        
        // Reset product stats
        const productStatsSnapshot = await getDocs(collection(db, 'product_stats'));
        productStatsSnapshot.forEach(productDoc => {
          batch.delete(productDoc.ref);
        });
        
        await batch.commit();

        // Also clear local storage
        localStorage.removeItem('admin_affiliate_stats');
        localStorage.removeItem('admin_product_views');
        localStorage.removeItem('admin_total_leads');
        localStorage.removeItem('admin_total_subs');
        
        loadData();
      } catch (error) {
        console.error("Error resetting data:", error);
      }
    }
  };

  const statList = Object.values(stats) as { clicks: number; name: string }[];
  const totalClicks = statList.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
  const sortedProducts = (Object.entries(stats) as [string, { clicks: number; name: string }][]).sort((a, b) => b[1].clicks - a[1].clicks);

  const pendingReviewsCount = reviews.filter(r => r.status === 'pending').length;

  const filteredReviews = reviews.filter(r => {
    if (reviewFilter === 'all') return true;
    return r.status === reviewFilter;
  });

  // Aggregate by Category
  const categoryStats: Record<string, { clicks: number, views: number }> = {};
  
  products.forEach(p => {
    const pClicks = stats[p.id]?.clicks || 0;
    const pViews = views[p.id]?.views || 0;
    
    if (!categoryStats[p.category]) {
      categoryStats[p.category] = { clicks: 0, views: 0 };
    }
    categoryStats[p.category].clicks += pClicks;
    categoryStats[p.category].views += pViews;
  });

  const chartData = Object.entries(categoryStats)
    .filter(([_, data]) => data.views > 0 || data.clicks > 0)
    .map(([category, data]) => ({
      name: category,
      ctr: data.views > 0 ? Number(((data.clicks / data.views) * 100).toFixed(1)) : 0,
      clicks: data.clicks,
      views: data.views,
    }))
    .sort((a, b) => b.ctr - a.ctr);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white m-0">Admin Dashboard</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Manage affiliate conversions, track lead velocity, and moderate contractor reviews</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Reset Analytics Data
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-8 pb-1">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-t-xl transition-colors border-b-2 -mb-1 ${
              activeTab === 'analytics'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/10'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Traffic & Affiliate Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-t-xl transition-colors border-b-2 -mb-1 ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/10'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Review Moderation</span>
            {pendingReviewsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold">
                {pendingReviewsCount} pending
              </span>
            )}
          </button>
        </div>

        {activeTab === 'reviews' ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Contractor Reviews Queue ({reviews.length})
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Approve verified reviews to display them on software review pages, or reject unverified marketing submissions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {(['all', 'pending', 'approved', 'rejected'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setReviewFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                      reviewFilter === filter
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {filter} {filter === 'pending' && pendingReviewsCount > 0 ? `(${pendingReviewsCount})` : ''}
                  </button>
                ))}
              </div>
            </div>

            {filteredReviews.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-base font-medium text-slate-700 dark:text-slate-300">No {reviewFilter !== 'all' ? reviewFilter : ''} reviews found.</p>
                <p className="text-xs mt-1">Contractor review submissions from the homepage and product reviews will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReviews.map(rev => (
                  <div 
                    key={rev.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6"
                  >
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          rev.status === 'approved' 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                            : rev.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {rev.status}
                        </span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          Software: <span className="text-blue-600 dark:text-blue-400">{rev.productName}</span>
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 font-medium">{rev.trade}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star 
                              key={s} 
                              className={`w-4 h-4 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} 
                            />
                          ))}
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                            {rev.rating} / 5
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          "{rev.headline}"
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl">
                        <div>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">✓ Pros:</span>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{rev.pros}</p>
                        </div>
                        <div>
                          <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">✕ Cons:</span>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{rev.cons}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{rev.authorName}</span>
                        <span>({rev.companyName})</span>
                        <span>•</span>
                        <span>Recommend: <strong className={rev.recommend ? 'text-emerald-600' : 'text-rose-500'}>{rev.recommend ? 'Yes' : 'No'}</strong></span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex md:flex-col items-center gap-2 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                      {rev.status !== 'approved' && (
                        <button
                          onClick={() => handleUpdateReviewStatus(rev.id, 'approved')}
                          disabled={isUpdatingReview === rev.id}
                          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm w-full justify-center"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approve
                        </button>
                      )}

                      {rev.status !== 'rejected' && (
                        <button
                          onClick={() => handleUpdateReviewStatus(rev.id, 'rejected')}
                          disabled={isUpdatingReview === rev.id}
                          className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm w-full justify-center"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        disabled={isUpdatingReview === rev.id}
                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-rose-900/30 text-slate-600 hover:text-rose-600 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors w-full justify-center"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
              <MousePointerClick className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Affiliate Clicks</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalClicks}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Lead Magnet Submissions</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalLeads}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Newsletter Subscribers</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalSubs}</p>
            </div>
          </div>
        </div>

        {chartData.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-500" /> Click-Through Rate by Category
            </h2>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}%`} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                    itemStyle={{ color: '#38bdf8' }}
                  />
                  <Bar dataKey="ctr" name="CTR (%)" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#94a3b8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" /> Top Performing Products
        </h2>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Product Name</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white text-right">Total Clicks</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white text-right">Share of Clicks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {sortedProducts.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-slate-600 dark:text-slate-300">
                      No click data recorded yet.
                    </td>
                  </tr>
                )}
                {sortedProducts.map(([id, data]) => {
                  const percentage = totalClicks > 0 ? Math.round((data.clicks / totalClicks) * 100) : 0;
                  return (
                    <tr key={id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{data.name}</td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300 text-right font-semibold">{data.clicks}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{percentage}%</span>
                          <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-12 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <MousePointerClick className="w-5 h-5 text-indigo-500" /> Recent Clicks & Conversion Paths
          </h2>
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Time</th>
                    <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Product</th>
                    <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Conversion Path</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {recentClicks.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-slate-600 dark:text-slate-300">
                        No detailed click logs yet.
                      </td>
                    </tr>
                  )}
                  {recentClicks.map((click) => (
                    <tr key={click.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {click.createdAt?.toDate ? click.createdAt.toDate().toLocaleString() : 'Just now'}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{click.productName}</td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-mono text-xs truncate max-w-xs" title={click.conversionPath}>
                        {click.conversionPath}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </>
        )}

      </div>
    </Layout>
  );
}
