import React, { useState } from 'react';
import { products } from '../data/products';
import { useAnalytics } from '../hooks/useAnalytics';

export function PricingEstimator({ defaultProductId }: { defaultProductId?: string }) {
  const { trackEvent } = useAnalytics();
  const [techs, setTechs] = useState(5);
  const [volume, setVolume] = useState(50);
  const [selectedProductId, setSelectedProductId] = useState(defaultProductId || products[0].id);

  const product = products.find(p => p.id === selectedProductId) || products[0];
  
  // Fake estimation logic based on tech count and volume
  const calculateEstimatedPrice = () => {
    let base = product.pricing.startingPrice;
    if (product.pricing.model === 'per user' || product.pricing.model === 'per tech') {
      base = base * techs;
    }
    
    // Add volume complexity scalar
    if (volume > 100) base += (volume - 100) * 0.5;

    return Math.max(product.pricing.startingPrice, Math.round(base));
  };

  const estimatedPrice = calculateEstimatedPrice();
  
  const affiliateUrl = (() => {
    try {
      const url = new URL(product.affiliate.url);
      url.searchParams.append('utm_source', 'ContractorStack');
      url.searchParams.append('utm_medium', 'PricingEstimator');
      return url.toString();
    } catch {
      return product.affiliate.url;
    }
  })();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden my-12">
      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Custom Pricing Estimator</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm">Calculate your estimated monthly cost based on your team size and job volume.</p>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="estimator-select-software" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Select Software
            </label>
            <select 
              id="estimator-select-software"
              aria-label="Select Software"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="estimator-team-size" className="text-sm font-medium text-slate-700 dark:text-slate-300">Team Size (Field Techs)</label>
              <span className="font-bold text-blue-600 dark:text-blue-400">{techs}</span>
            </div>
            <input 
              id="estimator-team-size"
              aria-label="Team Size (Field Techs)"
              aria-valuemin={1}
              aria-valuemax={50}
              aria-valuenow={techs}
              type="range" 
              min="1" 
              max="50" 
              value={techs} 
              onChange={(e) => setTechs(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="estimator-monthly-jobs" className="text-sm font-medium text-slate-700 dark:text-slate-300">Monthly Jobs (Volume)</label>
              <span className="font-bold text-blue-600 dark:text-blue-400">{volume}</span>
            </div>
            <input 
              id="estimator-monthly-jobs"
              aria-label="Monthly Jobs (Volume)"
              aria-valuemin={10}
              aria-valuemax={500}
              aria-valuenow={volume}
              type="range" 
              min="10" 
              max="500" 
              step="10"
              value={volume} 
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-blue-100 dark:border-blue-800/50">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Estimated Monthly Cost</span>
          <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">
            ${estimatedPrice}
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 mb-6">
            Billed monthly for {techs} users. Includes base features.
          </p>
          <a 
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('affiliate_click', {
              product_id: product.id,
              product_name: product.name,
              placement: 'pricing_estimator',
              estimated_price: estimatedPrice,
              techs_selected: techs,
              volume_selected: volume
            })}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md text-lg"
          >
            Get Custom Quote
          </a>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-4">
            *Pricing is an estimate based on standard public tiers. Click through to confirm exact pricing and available discounts.
          </p>
        </div>
      </div>
    </div>
  );
}
