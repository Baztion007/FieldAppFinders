import { initializeApp } from 'firebase/app';
import { 
  initializeFirestore,
  collection, 
  doc, 
  setDoc, 
  increment, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';

const firebaseConfig = {
  projectId: "nimble-terminus-807pf",
  appId: "1:522709745358:web:84f9df8ee09249bbb6da9f",
  apiKey: "AIzaSyCLCE8CD-4SJFkkJ533s_gL0W1qycYRv94",
  authDomain: "nimble-terminus-807pf.firebaseapp.com",
  storageBucket: "nimble-terminus-807pf.firebasestorage.app",
  messagingSenderId: "522709745358"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore with experimentalForceLongPolling to ensure instant connectivity
// through sandboxed iframes, reverse proxies, and Cloud Run environments without WebChannel timeouts.
export const db = initializeFirestore(
  app,
  {
    experimentalForceLongPolling: true,
  },
  "ai-studio-contractorstack-70d07a7c-d1f3-4fe6-acbc-e8e444eda22c"
);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
}

// Helper to track analytics globally
export const trackFirebaseEvent = async (eventName: string, data: any) => {
  try {
    if (eventName === 'product_view') {
      const productRef = doc(db, 'product_stats', data.product_id);
      await setDoc(productRef, {
        views: increment(1),
        name: data.product_name || 'Unknown',
        category: data.category || 'Unknown'
      }, { merge: true });
    } else if (eventName === 'affiliate_click') {
      const productRef = doc(db, 'product_stats', data.product_id);
      await setDoc(productRef, {
        clicks: increment(1),
        name: data.product_name || 'Unknown'
      }, { merge: true });
      
      // Store the individual click to track conversion paths
      await addDoc(collection(db, 'affiliate_clicks'), {
        productId: String(data.product_id || 'unknown'),
        productName: String(data.product_name || 'Unknown'),
        conversionPath: String(data.conversion_path || 'Unknown'),
        referrer: String(data.referrer || 'Unknown'),
        placement: String(data.placement || 'Unknown'),
        createdAt: serverTimestamp()
      });
    } else if (eventName === 'newsletter_signup') {
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email: String(data.email || '').trim().toLowerCase(),
        isWeekly: Boolean(data.is_weekly ?? data.isWeekly ?? false),
        createdAt: serverTimestamp()
      });
      const totalsRef = doc(db, 'analytics', 'totals');
      await setDoc(totalsRef, {
        totalSubs: increment(1)
      }, { merge: true });
    } else if (eventName === 'checklist_download') {
      await addDoc(collection(db, 'leads'), {
        email: String(data.email || '').trim().toLowerCase(),
        isWeekly: Boolean(data.is_weekly ?? data.isWeekly ?? false),
        eventName: String(eventName),
        createdAt: serverTimestamp()
      });
      const totalsRef = doc(db, 'analytics', 'totals');
      await setDoc(totalsRef, {
        totalLeads: increment(1)
      }, { merge: true });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, eventName);
  }
};
