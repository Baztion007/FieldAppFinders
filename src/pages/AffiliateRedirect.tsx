import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc, increment } from 'firebase/firestore';
import { ShieldCheck, ExternalLink, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export function AffiliateRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const product = products.find(p => p.slug === slug || p.id === slug);

  useSEO(
    product ? `Redirecting to ${product.name}...` : 'Redirecting...',
    'Redirecting to verified official partner software application.'
  );

  useEffect(() => {
    if (!product) {
      setError('Software partner not found.');
      return;
    }

    const placement = searchParams.get('placement') || 'direct_cloaked_link';
    const source = searchParams.get('source') || 'FieldAppFinder';

    // Build target destination URL with UTM params
    let destinationUrl = product.affiliate.url;
    try {
      const url = new URL(destinationUrl);
      url.searchParams.set('utm_source', 'fieldappfinder');
      url.searchParams.set('utm_medium', 'affiliate_cloaked');
      url.searchParams.set('utm_campaign', placement);
      destinationUrl = url.toString();
    } catch {
      // Keep original if parsing fails
    }

    // Record click event in Firestore
    const logClick = async () => {
      try {
        await addDoc(collection(db, 'affiliate_clicks'), {
          productId: product.id,
          productName: product.name,
          conversionPath: `/go/${slug}`,
          referrer: document.referrer || 'direct',
          placement: placement,
          createdAt: serverTimestamp()
        });

        // Increment stats counter
        const statRef = doc(db, 'product_stats', product.id);
        await setDoc(statRef, {
          name: product.name,
          category: product.category,
          clicks: increment(1)
        }, { merge: true });
      } catch (err) {
        console.warn('Could not record affiliate click event:', err);
      }
    };

    logClick();

    // Execute safe redirect after 900ms transition
    const timer = setTimeout(() => {
      setHasRedirected(true);
      window.location.replace(destinationUrl);
    }, 900);

    return () => clearTimeout(timer);
  }, [product, slug, searchParams]);

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold mb-2">Partner Link Not Found</h1>
          <p className="text-slate-400 text-sm mb-6">
            The software partner URL you requested could not be located.
          </p>
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors"
          >
            Browse All Software Reviews
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl p-8 shadow-2xl text-center backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Verified Partner Offer
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Connecting to {product.name}
        </h1>

        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          Transferring you to the official secured vendor portal. Any eligible contractor discounts or extended trial periods will be applied automatically.
        </p>

        <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-slate-950/60 border border-slate-700/50 mb-6">
          <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          <span className="text-xs font-mono text-slate-300">Securing partner session...</span>
        </div>

        <p className="text-xs text-slate-400">
          Not redirected automatically?{' '}
          <a
            href={product.affiliate.url}
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline font-medium"
          >
            Click here to proceed immediately
          </a>
        </p>
      </div>
    </div>
  );
}
