export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface GeoContext {
  stateCompliance: string;
  taxAndJurisdiction: string;
  connectivityAndOffline: string;
  dispatchRadius: string;
  targetServiceDensity: string;
}

export interface AeoIntelligence {
  directAnswer: string;
  onboardingDays: string;
  contractTerms: string;
  accountingIntegration: string;
  paymentProcessingRate: string;
  techLearningCurve: 'Low (1-2 days)' | 'Moderate (1-2 weeks)' | 'High (3-6 weeks)';
  citableFactSheet: {
    label: string;
    value: string;
  }[];
}

export interface TradeSuitability {
  trade: string;
  score: number;
  notes: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  company: string;
  category: string;
  shortDescription: string;
  bestFor: string;
  notIdealFor: string;
  pricing: {
    startingPrice: number;
    model: 'per user' | 'flat rate' | 'per tech' | 'custom';
    freePlan: boolean;
    freeTrial: boolean;
    trialLengthDays: number | null;
    creditCardRequiredForTrial: boolean;
  };
  features: {
    mobileApp: boolean;
    crm: boolean;
    scheduling: boolean;
    estimating: boolean;
    invoicing: boolean;
    payments: boolean;
    automation: boolean;
  };
  isFeatured?: boolean;
  affiliate: {
    commissionType: 'recurring' | 'one-time' | 'bounty';
    url: string;
  };
  pros: string[];
  cons: string[];
  rating: number;
  lastVerifiedDate: string;
  
  // SEO, AEO, and GEO context extensions
  aeo?: AeoIntelligence;
  geoContext?: GeoContext;
  faqs?: ProductFAQ[];
  hiddenCosts?: string[];
  tradeSuitabilities?: TradeSuitability[];
}
