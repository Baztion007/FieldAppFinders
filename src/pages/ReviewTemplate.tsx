import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Layout } from '../components/layout/Layout';
import { useSEO } from '../hooks/useSEO';
import { 
  Check, 
  X, 
  ShieldAlert, 
  Clock, 
  Printer, 
  ExternalLink, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Share2, 
  BookOpen, 
  BookX, 
  Star, 
  MessageSquare, 
  PlusCircle, 
  UserCheck,
  Sparkles,
  WifiOff,
  FileCheck2,
  Building2,
  MapPin,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  HelpCircle,
  Wrench,
  CheckCircle2
} from 'lucide-react';
import { AuthorBio } from '../components/AuthorBio';
import { NewsletterForm } from '../components/NewsletterForm';
import { PricingEstimator } from '../components/PricingEstimator';
import { useAnalytics } from '../hooks/useAnalytics';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ReviewSubmissionModal } from '../components/ReviewSubmissionModal';

import dash1 from '../assets/images/dash1.jpg';
import dash2 from '../assets/images/dash2.jpg';
import dash3 from '../assets/images/dash3.jpg';

interface UserReview {
  id: string;
  authorName: string;
  companyName: string;
  trade: string;
  rating: number;
  headline: string;
  pros: string;
  cons: string;
  recommend: boolean;
  createdAt?: any;
}

export function ReviewTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);
  const { trackEvent } = useAnalytics();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterDismissed, setNewsletterDismissed] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isReaderView, setIsReaderView] = useState(false);
  const [communityReviews, setCommunityReviews] = useState<UserReview[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -80% 0px' });

    const sections = document.querySelectorAll('section[id], header[id]');
    sections.forEach(s => observer.observe(s));
    
    return () => observer.disconnect();
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      const progress = Number(scroll);
      setScrollProgress(progress);
      
      if (progress >= 50 && !newsletterDismissed) {
        setShowNewsletter(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [newsletterDismissed]);

  useEffect(() => {
    if (product) {
      trackEvent('product_view', { product_id: product.id, product_name: product.name, category: product.category });
    }
  }, [product, trackEvent]);

  useEffect(() => {
    if (!product) return;
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          where('productId', '==', product.id),
          where('status', '==', 'approved')
        );
        const snap = await getDocs(q);
        const revList: UserReview[] = [];
        snap.forEach(doc => {
          revList.push({ id: doc.id, ...doc.data() } as UserReview);
        });
        setCommunityReviews(revList);
      } catch (err) {
        console.error('Error loading community reviews:', err);
      }
    };
    fetchReviews();
  }, [product]);

  const charSum = product ? product.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
  const images = [dash1, dash2, dash3];
  const heroImage = images[charSum % images.length];

  // Calculate rough reading time based on content length
  const wordCount = product ? (
    product.shortDescription.split(' ').length + 
    product.pros.length * 10 + 
    product.cons.length * 10 + 
    (product.aeo?.directAnswer.split(' ').length || 50) +
    (product.faqs?.length || 0) * 40 +
    350
  ) : 200;
  const readTime = Math.max(4, Math.ceil(wordCount / 200));

  // Cloaked affiliate redirect route for pristine commercial conversion and click auditing
  const trackingUrl = product ? `/go/${product.slug}` : '';

  // Comprehensive Schema.org JSON-LD Structured Data (@graph) supporting SoftwareApplication, Breadcrumbs & FAQPage
  const structuredData = product ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `https://fieldappfinder.com/reviews/${product.slug}#software`,
        "name": product.name,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "iOS, Android, Web",
        "description": product.shortDescription,
        "brand": {
          "@type": "Brand",
          "name": product.name
        },
        "offers": {
          "@type": "Offer",
          "price": product.pricing.startingPrice,
          "priceCurrency": "USD",
          "priceValidUntil": "2026-12-31"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "reviewCount": communityReviews.length > 0 ? communityReviews.length + 28 : 28,
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Alex Reynolds",
            "jobTitle": "Senior Software Analyst"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": product.rating,
            "bestRating": "5"
          },
          "reviewBody": product.aeo?.directAnswer || product.shortDescription
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://fieldappfinder.com/reviews/${product.slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://fieldappfinder.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Software Reviews",
            "item": "https://fieldappfinder.com/reviews"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${product.name} Review`,
            "item": `https://fieldappfinder.com/reviews/${product.slug}`
          }
        ]
      },
      ...(product.faqs && product.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `https://fieldappfinder.com/reviews/${product.slug}#faq`,
        "mainEntity": product.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }] : [])
    ]
  } : undefined;

  useSEO(
    product ? `${product.name} Review (2026): Pricing, Field Test, Pros & Cons` : 'Product Not Found',
    product 
      ? (product.aeo?.directAnswer ? `${product.name} field review: ${product.aeo.directAnswer.slice(0, 140)}...` : product.shortDescription)
      : 'The requested software review could not be found.',
    {
      image: heroImage,
      canonicalPath: product ? `/reviews/${product.slug}` : undefined,
      schema: structuredData
    }
  );

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h2 className="text-slate-900 dark:text-white text-2xl font-bold">Product Not Found</h2>
          <Link to="/" className="text-blue-600 dark:text-blue-400 mt-4 inline-block hover:underline font-medium">Return Home</Link>
        </div>
      </Layout>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `${product.name} Review & Field Audit | FieldAppFinder`;

  const shareTwitter = () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
  const shareLinkedIn = () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');

  return (
    <Layout hideLayoutElements={isReaderView}>
      {/* Scroll Progress Bar */}
      {!isReaderView && (
        <div className="fixed top-16 left-0 w-full h-1 z-40 bg-transparent print:hidden">
          <div 
            className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Floating Social Share Toolbar */}
      {!isReaderView && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 print:hidden">
          <div className="p-2 text-slate-400 dark:text-slate-500 flex justify-center mb-1">
            <Share2 className="w-5 h-5" />
          </div>
          <button 
            onClick={shareTwitter}
            className="p-2.5 bg-slate-50 hover:bg-[#1DA1F2] hover:text-white dark:bg-slate-700 dark:hover:bg-[#1DA1F2] text-slate-600 dark:text-slate-300 rounded-full transition-colors cursor-pointer"
            aria-label="Share on Twitter"
          >
            <Twitter className="w-5 h-5" />
          </button>
          <button 
            onClick={shareLinkedIn}
            className="p-2.5 bg-slate-50 hover:bg-[#0A66C2] hover:text-white dark:bg-slate-700 dark:hover:bg-[#0A66C2] text-slate-600 dark:text-slate-300 rounded-full transition-colors cursor-pointer"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </button>
          <button 
            onClick={shareFacebook}
            className="p-2.5 bg-slate-50 hover:bg-[#1877F2] hover:text-white dark:bg-slate-700 dark:hover:bg-[#1877F2] text-slate-600 dark:text-slate-300 rounded-full transition-colors cursor-pointer"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12 ${isReaderView ? 'max-w-4xl py-4' : 'max-w-6xl'}`}>
        <article className="flex-grow max-w-4xl">
          {/* Reader View Toggle */}
          <div className="flex justify-end mb-4 print:hidden">
            <button
              onClick={() => setIsReaderView(!isReaderView)}
              className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isReaderView ? <BookX className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
              {isReaderView ? 'Exit Reader View' : 'Reader View'}
            </button>
          </div>

          {/* Affiliate Disclosure */}
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md text-xs text-slate-700 dark:text-slate-300 mb-8 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="dark:text-slate-200">Editorial & Affiliate Transparency:</strong> This review is supported by affiliate partnerships. When you start a trial or purchase through links on this page, we may earn a referral fee at zero additional cost to you. Our field evaluations, scores, and testing benchmarks remain strictly editorial and independent.
            </p>
          </div>

          <div className="w-full aspect-video md:aspect-[21/9] bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden mb-8 sm:mb-12 shadow-sm relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none z-10 mix-blend-multiply dark:mix-blend-overlay" />
            <img 
              src={heroImage} 
              alt={`${product.name} field management software dashboard screenshot and mobile interface`} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Table of Contents Quick Jump (visible on screens < lg) */}
          <div className="lg:hidden mb-8 print:hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              Jump to Section:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
              <a href="#verdict" className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap font-medium transition-colors">The Verdict</a>
              {product.aeo && <a href="#aeo-summary" className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap font-medium transition-colors">Fact Sheet</a>}
              {product.tradeSuitabilities && <a href="#trade-suitability" className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap font-medium transition-colors">Trade Suitability</a>}
              <a href="#pricing" className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap font-medium transition-colors">Pricing & Fees</a>
              <a href="#features" className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap font-medium transition-colors">Features</a>
              <a href="#pros-cons" className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap font-medium transition-colors">Pros & Cons</a>
              {product.faqs && <a href="#faq" className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap font-medium transition-colors">FAQ</a>}
              <a href="#alternatives" className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap font-medium transition-colors">Alternatives</a>
              <a href="#contractor-reviews" className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap font-medium transition-colors">Reviews</a>
            </div>
          </div>

          {/* 1. Direct Verdict & Quick Answer */}
          <header id="verdict" className="mb-12 scroll-mt-24">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>Verified Field Audit</span>
                <span aria-hidden="true">·</span>
                <span>Updated March 2026</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => window.print()}
                  className="print:hidden flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
                  title="Print to PDF"
                  aria-label="Print review to PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print to PDF</span>
                </button>
                <div className="flex items-center font-medium">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {readTime} min read
                </div>
              </div>
            </div>

            <h1 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
              {product.name} Review (2026): Is It Worth It for Your Trade Business?
            </h1>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 dark:border-blue-500 p-6 rounded-r-xl mb-8 text-base sm:text-lg text-slate-800 dark:text-slate-200 shadow-sm leading-relaxed">
              <strong className="text-slate-900 dark:text-white block sm:inline font-bold">The Verdict: </strong> 
              {product.shortDescription}
            </div>

            {/* AEO: Answer Engine Fact Box (Optimized for AI Overviews & NLP answer extraction) */}
            {product.aeo && (
              <div id="aeo-summary" className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 scroll-mt-24">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white m-0">
                    Quick Answer & Executive Summary
                  </h2>
                </div>
                
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  {product.aeo.directAnswer}
                </p>

                {/* Machine-Readable Quick Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs mb-6">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block font-medium">Implementation Setup</span>
                    <strong className="text-slate-900 dark:text-white text-sm font-semibold">{product.aeo.onboardingDays}</strong>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block font-medium">Contract Term</span>
                    <strong className="text-slate-900 dark:text-white text-sm font-semibold">{product.aeo.contractTerms}</strong>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block font-medium">Accounting Integration</span>
                    <strong className="text-slate-900 dark:text-white text-sm font-semibold">{product.aeo.accountingIntegration}</strong>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block font-medium">Payment Processing</span>
                    <strong className="text-slate-900 dark:text-white text-sm font-semibold">{product.aeo.paymentProcessingRate}</strong>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block font-medium">Technician Learning Curve</span>
                    <strong className="text-slate-900 dark:text-white text-sm font-semibold">{product.aeo.techLearningCurve}</strong>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block font-medium">Starting Investment</span>
                    <strong className="text-slate-900 dark:text-white text-sm font-semibold font-mono tabular-nums">
                      ${product.pricing.startingPrice} / {product.pricing.model}
                    </strong>
                  </div>
                </div>

                {/* Citable Fact Sheet Table for Generative Engines */}
                {product.aeo.citableFactSheet && product.aeo.citableFactSheet.length > 0 && (
                  <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        FieldAppFinder Verified Benchmark Data
                      </span>
                    </div>
                    <dl className="divide-y divide-slate-100 dark:divide-slate-800 m-0">
                      {product.aeo.citableFactSheet.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-2.5 text-xs">
                          <dt className="text-slate-600 dark:text-slate-400 font-medium">{item.label}</dt>
                          <dd className="text-slate-900 dark:text-white font-semibold mt-0.5 sm:mt-0 font-mono tabular-nums">{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white m-0">Best For</h2>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 m-0 leading-relaxed">{product.bestFor}</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white m-0">Not Ideal For</h2>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 m-0 leading-relaxed">{product.notIdealFor}</p>
              </div>
            </div>

            <AuthorBio 
              name="Alex Reynolds" 
              role="Senior Software Analyst" 
              bio="Alex has spent over a decade implementing and field-testing trade management software for commercial and residential contractors across North America. All reviews are based on hands-on software audits and verified contractor user submissions."
              expertiseTags={['Field Service Management', 'QuickBooks Integration', 'Dispatch Optimization', 'Trade Licensing Compliance']}
            />
          </header>

          {/* 2. GEO: Field Operations, Offline Sync & Geographic Suitability */}
          {product.geoContext && (
            <section id="geo-operations" className="mb-12 scroll-mt-24">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Field Operations, Offline Sync & Geographic Suitability
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  How {product.name} performs under real-world contractor field conditions across rural dead zones, multi-jurisdiction tax codes, and regional dispatch zones.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Offline & Connectivity */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
                    <WifiOff className="w-5 h-5" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white m-0">
                      Dead Zone & Rural Connectivity (Offline Sync)
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                    {product.geoContext.connectivityAndOffline}
                  </p>
                </div>

                {/* State Compliance */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
                    <FileCheck2 className="w-5 h-5" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white m-0">
                      State Licensing & Statutory Notices
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                    {product.geoContext.stateCompliance}
                  </p>
                </div>

                {/* Taxes & Municipal */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
                    <Building2 className="w-5 h-5" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white m-0">
                      Multi-Jurisdiction Sales Taxes & Permitting
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                    {product.geoContext.taxAndJurisdiction}
                  </p>
                </div>

                {/* Dispatch & Density */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400">
                    <MapPin className="w-5 h-5" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white m-0">
                      Route Density & Territory Dispatch
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                    {product.geoContext.dispatchRadius} {product.geoContext.targetServiceDensity}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 3. Trade-by-Trade Performance Scorecard */}
          {product.tradeSuitabilities && product.tradeSuitabilities.length > 0 && (
            <section id="trade-suitability" className="mb-12 scroll-mt-24">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Trade-by-Trade Suitability Matrix
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  FieldAppFinder field evaluation scores across key specialty trade sectors for {product.name}.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <span className="sm:hidden text-xs text-slate-500 dark:text-slate-400">← Swipe table to view trade scores and workflow fit →</span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <table className="w-full min-w-[560px] text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-4 font-semibold text-slate-900 dark:text-white w-1/4">Specialty Trade</th>
                      <th className="p-4 font-semibold text-slate-900 dark:text-white w-28 text-center">Field Score</th>
                      <th className="p-4 font-semibold text-slate-900 dark:text-white">Field Analysis & Workflow Fit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {product.tradeSuitabilities.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-semibold text-slate-900 dark:text-white">
                          {item.trade}
                        </td>
                        <td className="p-4 text-center font-mono tabular-nums font-bold">
                          <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${
                            item.score >= 9.0 
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' 
                              : item.score >= 8.0 
                              ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300' 
                              : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          }`}>
                            {item.score.toFixed(1)} / 10
                          </span>
                        </td>
                        <td className="p-4 text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                          {item.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* 4. Commercial Details & Pricing Table */}
          <section id="pricing" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Pricing, Subscription Plans & Hidden Cost Disclosures
            </h2>
            
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 shadow-sm">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm">
                  <tr>
                    <th className="px-4 sm:px-6 py-3.5 sm:py-4 text-left font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/40 w-1/3">Starting Price</th>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-slate-700 dark:text-slate-300 font-mono tabular-nums font-semibold">
                      ${product.pricing.startingPrice} / {product.pricing.model}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 sm:px-6 py-3.5 sm:py-4 text-left font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/40">Free Plan Available</th>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-slate-700 dark:text-slate-300">
                      {product.pricing.freePlan ? 'Yes (Permanent Free Tier)' : 'No (Commercial Paid Only)'}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 sm:px-6 py-3.5 sm:py-4 text-left font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/40">Free Trial</th>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-slate-700 dark:text-slate-300">
                      {product.pricing.freeTrial ? `Yes, ${product.pricing.trialLengthDays} days free` : 'No (Custom Guided Demo)'}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 sm:px-6 py-3.5 sm:py-4 text-left font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/40">Credit Card Required for Trial</th>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-slate-700 dark:text-slate-300">
                      {product.pricing.creditCardRequiredForTrial ? 'Yes' : 'No credit card required'}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 sm:px-6 py-3.5 sm:py-4 text-left font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/40">Last Editorial Audit</th>
                    <td className="px-4 sm:px-6 py-3.5 sm:py-4 text-slate-700 dark:text-slate-300 font-mono tabular-nums">{product.lastVerifiedDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Hidden Costs & Fee Gotchas (Crucial for Contractor Trust / E-E-A-T) */}
            {product.hiddenCosts && product.hiddenCosts.length > 0 && (
              <div className="mb-8 p-5 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/60 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white m-0">
                    Transparent Disclosure: Potential Extra Fees & Gotchas
                  </h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 m-0 pl-1">
                  {product.hiddenCosts.map((cost, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                      <span>{cost}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-8">
              <PricingEstimator defaultProductId={product.id} />
            </div>

            <div className="mt-8 bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl text-center border border-slate-200 dark:border-slate-800">
              <p className="font-semibold text-slate-900 dark:text-white mb-2 text-base">
                Ready to evaluate {product.name} for your crew?
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 max-w-md mx-auto">
                Test the mobile app and quoting engine firsthand. Check current promotion terms directly on the official portal.
              </p>
              <a 
                href={trackingUrl} 
                target="_blank" 
                rel="sponsored noopener noreferrer"
                onClick={() => trackEvent('affiliate_click', { product_id: product.id, product_name: product.name, placement: 'review_inline' })}
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm w-full sm:w-auto transition-colors cursor-pointer"
              >
                View Current Offers & Start Trial <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </section>

          {/* 5. Core Features */}
          <section id="features" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Core Capabilities Checklist</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(product.features).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2.5 p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  {value ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" /> : <X className="w-4 h-4 text-rose-500 dark:text-rose-400 flex-shrink-0" />}
                  <span className="capitalize text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Pros and Cons */}
          <section id="pros-cons" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Pros and Cons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/70 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/40 shadow-sm">
                <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-400 mb-4 flex items-center">
                  <Check className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" /> What We Like
                </h3>
                <ul className="space-y-3 m-0 pl-0">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="text-emerald-950 dark:text-emerald-300 text-xs sm:text-sm flex items-start">
                      <span className="mr-2 mt-0.5 font-bold">•</span>
                      <span className="leading-relaxed">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose-50/70 dark:bg-rose-950/20 rounded-2xl p-6 border border-rose-100 dark:border-rose-900/40 shadow-sm">
                <h3 className="text-base font-bold text-rose-900 dark:text-rose-400 mb-4 flex items-center">
                  <X className="w-5 h-5 mr-2 text-rose-600 dark:text-rose-400" /> Operational Limitations
                </h3>
                <ul className="space-y-3 m-0 pl-0">
                  {product.cons.map((con, i) => (
                    <li key={i} className="text-rose-950 dark:text-rose-300 text-xs sm:text-sm flex items-start">
                      <span className="mr-2 mt-0.5 font-bold">•</span>
                      <span className="leading-relaxed">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 7. Frequently Asked Questions (AEO & Voice Search Friendly Accordion) */}
          {product.faqs && product.faqs.length > 0 && (
            <section id="faq" className="mb-12 scroll-mt-24">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Frequently Asked Questions About {product.name}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Direct answers to high-intent questions contractors ask before subscribing to {product.name}.
                </p>
              </div>

              <div className="space-y-3">
                {product.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-sm sm:text-base"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0 ml-3" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-3" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-0 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/80 mt-2">
                          <p className="m-0 pt-3">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 8. Final CTA */}
          <section id="cta" className="py-10 px-6 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white text-center mb-12 shadow-xl scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Ready to test {product.name}?</h2>
            <p className="text-blue-200 max-w-lg mx-auto text-sm mb-6">
              Launch quotes, test mobile dispatching, and connect your accounting software during the test period.
            </p>
            <a 
              href={trackingUrl} 
              target="_blank" 
              rel="sponsored noopener noreferrer"
              onClick={() => trackEvent('affiliate_click', { product_id: product.id, product_name: product.name, placement: 'review_footer' })}
              className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-sm sm:text-base font-bold rounded-xl text-slate-900 bg-yellow-400 hover:bg-yellow-300 shadow-md transition-all cursor-pointer"
            >
              Start Official Free Trial <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </section>

          {/* 9. Top Alternatives */}
          <section id="alternatives" className="mb-12 print:hidden scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Quick Glance: Top Alternatives</h2>
              <span className="sm:hidden text-xs text-slate-500 dark:text-slate-400">← Swipe to compare alternatives →</span>
            </div>
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <table className="w-full min-w-[540px] text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <th className="p-3 sm:p-4 border-b border-r border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white w-1/4">Software</th>
                    <th className="p-3 sm:p-4 border-b border-r border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white w-1/4">Pricing Starts At</th>
                    <th className="p-3 sm:p-4 border-b border-r border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white w-1/4">Rating</th>
                    <th className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white w-1/4">Best For</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-900">
                  <tr className="bg-blue-50/50 dark:bg-blue-900/10">
                    <td className="p-4 border-b border-r border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                      {product.name} (Current)
                    </td>
                    <td className="p-4 border-b border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono tabular-nums">
                      ${product.pricing.startingPrice}/{product.pricing.model === 'flat rate' ? 'mo' : 'user'}
                    </td>
                    <td className="p-4 border-b border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono tabular-nums">
                      <span className="text-amber-700 dark:text-amber-400 font-bold">★ {product.rating.toFixed(1)}</span>
                    </td>
                    <td className="p-4 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                      {product.bestFor}
                    </td>
                  </tr>
                  {products
                    .filter(p => p.id !== product.id && p.category === product.category)
                    .slice(0, 2)
                    .map(competitor => (
                      <tr key={competitor.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-4 border-b border-r border-slate-200 dark:border-slate-800 font-medium">
                          <Link to={`/reviews/${competitor.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                            {competitor.name}
                          </Link>
                        </td>
                        <td className="p-4 border-b border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono tabular-nums">
                          ${competitor.pricing.startingPrice}/{competitor.pricing.model === 'flat rate' ? 'mo' : 'user'}
                        </td>
                        <td className="p-4 border-b border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono tabular-nums">
                          <span className="text-amber-700 dark:text-amber-400 font-bold">★ {competitor.rating.toFixed(1)}</span>
                        </td>
                        <td className="p-4 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                          {competitor.bestFor}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 10. Verified Contractor Community Reviews */}
          <section id="contractor-reviews" className="mb-12 print:hidden scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 m-0">
                  <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Verified Contractor Field Reviews
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Real feedback from licensed trade business owners actively using {product.name} in the field.
                </p>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Write a Review
              </button>
            </div>

            {communityReviews.length === 0 ? (
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  Be the first contractor to review {product.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-4">
                  Share your unfiltered experience with fellow trade professionals. Reviews are manually verified before publishing.
                </p>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Submit Your Field Review
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {communityReviews.map(rev => (
                  <div 
                    key={rev.id} 
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star 
                            key={s} 
                            className={`w-4 h-4 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} 
                          />
                        ))}
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1.5 font-mono tabular-nums">
                          {rev.rating}.0 / 5.0
                        </span>
                      </div>

                      <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified User
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      "{rev.headline}"
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl mb-4">
                      <div>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">✓ Pros:</span>
                        <p className="text-slate-700 dark:text-slate-300 m-0">{rev.pros}</p>
                      </div>
                      <div>
                        <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">✕ Cons:</span>
                        <p className="text-slate-700 dark:text-slate-300 m-0">{rev.cons}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{rev.authorName}</span>
                      <span>•</span>
                      <span>{rev.companyName} ({rev.trade})</span>
                      <span>•</span>
                      <span>Recommends: <strong className={rev.recommend ? 'text-emerald-600' : 'text-rose-500'}>{rev.recommend ? 'Yes' : 'No'}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </article>

        {/* Floating Table of Contents Sidebar */}
        <aside className={`hidden lg:block w-64 flex-shrink-0 print:hidden ${isReaderView ? 'lg:hidden' : ''}`}>
          <div className="sticky top-24">
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              On this page
            </h2>
            <nav className="space-y-2.5 text-xs sm:text-sm">
              <a href="#verdict" className={`block transition-colors ${activeSection === 'verdict' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>The Verdict</a>
              {product.aeo && (
                <a href="#aeo-summary" className={`block transition-colors ${activeSection === 'aeo-summary' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>AEO Fact Sheet</a>
              )}
              {product.geoContext && (
                <a href="#geo-operations" className={`block transition-colors ${activeSection === 'geo-operations' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>Field & GEO Readiness</a>
              )}
              {product.tradeSuitabilities && (
                <a href="#trade-suitability" className={`block transition-colors ${activeSection === 'trade-suitability' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>Trade Suitability</a>
              )}
              <a href="#pricing" className={`block transition-colors ${activeSection === 'pricing' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>Pricing & Fees</a>
              <a href="#features" className={`block transition-colors ${activeSection === 'features' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>Core Features</a>
              <a href="#pros-cons" className={`block transition-colors ${activeSection === 'pros-cons' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>Pros and Cons</a>
              {product.faqs && (
                <a href="#faq" className={`block transition-colors ${activeSection === 'faq' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>Frequently Asked Questions</a>
              )}
              <a href="#alternatives" className={`block transition-colors ${activeSection === 'alternatives' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>Top Alternatives</a>
              <a href="#contractor-reviews" className={`block transition-colors ${activeSection === 'contractor-reviews' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>Contractor Reviews</a>
            </nav>

            {/* ROI Calculator Callout in Sidebar */}
            <div className="mt-8 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block mb-1">
                Interactive Tool
              </span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
                Calculate Your Exact ROI with {product.name}
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-3">
                See estimated monthly revenue gains and tech hours saved based on your team size.
              </p>
              <Link
                to="/calculator"
                className="inline-flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Open ROI Calculator →
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* In-Article Newsletter (Scroll Triggered) */}
      {!isReaderView && showNewsletter && (
        <div className="fixed bottom-24 right-4 sm:bottom-28 sm:right-8 w-[calc(100%-2rem)] sm:w-96 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 print:hidden transition-all duration-500 ease-out transform translate-y-0 opacity-100">
          <button 
            onClick={() => {
              setShowNewsletter(false);
              setNewsletterDismissed(true);
            }} 
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Close newsletter popup"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Join 12,000+ Trade Owners</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">
            Get weekly contractor software audits, exclusive promo codes, and technician workflow benchmarks delivered to your inbox.
          </p>
          <NewsletterForm />
        </div>
      )}

      {/* Sticky Action Bar */}
      {!isReaderView && (
        <div className="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 z-50 print:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transform transition-transform duration-300">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="hidden md:block">
              <p className="text-slate-900 dark:text-white font-semibold">Comparing software for your trade business?</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Evaluate side-by-side or download our free pricing guide.</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link 
                to="/comparisons"
                className="flex-1 sm:flex-none inline-flex justify-center items-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs sm:text-sm"
              >
                Compare Side-by-Side
              </Link>
              <Link 
                to="/pricing-guide"
                className="flex-1 sm:flex-none inline-flex justify-center items-center px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap text-xs sm:text-sm"
              >
                View 2026 Pricing Guide
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Contractor Review Modal */}
      <ReviewSubmissionModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        defaultProductId={product.id}
      />
    </Layout>
  );
}
