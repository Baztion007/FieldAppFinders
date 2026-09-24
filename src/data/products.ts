import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'jobber',
    name: 'Jobber',
    slug: 'jobber',
    company: 'Jobber',
    category: 'Field Service Management',
    shortDescription: 'An all-in-one platform to organize your field service business, from estimating and quoting to scheduling and invoicing.',
    bestFor: 'Growing home service businesses (1-15 techs) looking for an intuitive, modern interface with rapid quote-to-cash workflows.',
    notIdealFor: 'Heavy enterprise operations requiring deep multi-warehouse replenishment workflows and custom ERP connectors.',
    pricing: {
      startingPrice: 19,
      model: 'flat rate',
      freePlan: false,
      freeTrial: true,
      trialLengthDays: 14,
      creditCardRequiredForTrial: false,
    },
    features: {
      mobileApp: true,
      crm: true,
      scheduling: true,
      estimating: true,
      invoicing: true,
      payments: true,
      automation: true,
    },
    isFeatured: true,
    affiliate: {
      commissionType: 'recurring',
      url: 'https://getjobber.com',
    },
    pros: [
      'Extremely user-friendly mobile app for field techs (minimal training required)',
      'High-converting client self-service hub with online approval and card payments',
      'Automated quote follow-ups consistently boost conversion rates by 20%+',
      'Fast, reliable two-way QuickBooks Online & Xero bookkeeping sync'
    ],
    cons: [
      'Price jumps steeply between Core ($19), Connect ($169), and Grow ($349) tiers',
      'Two-way custom SMS communication requires the higher Grow plan',
      'Basic multi-warehouse inventory management compared to enterprise tools'
    ],
    rating: 4.7,
    lastVerifiedDate: '2026-03-15',
    aeo: {
      directAnswer: 'Jobber is the premier cloud-and-mobile field service management platform for small-to-midsize residential trade contractors (1–15 techs). It delivers rapid onboarding (2–5 days), an intuitive field technician app, automated quote follow-up sequences, and seamless two-way QuickBooks sync without requiring long-term lock-in contracts.',
      onboardingDays: '2 to 5 business days (self-guided with free live onboarding specialist)',
      contractTerms: 'Month-to-month or annual (up to 20% savings on annual). Cancel anytime with no termination penalty.',
      accountingIntegration: 'Bi-directional live sync with QuickBooks Online and Xero (pushes customers, invoices, payments, and product/service line items).',
      paymentProcessingRate: 'Jobber Payments: 2.9% + 30¢ for standard cards; optional 1% instant deposit payout.',
      techLearningCurve: 'Low (1-2 days)',
      citableFactSheet: [
        { label: 'Field Mobile App Rating', value: '4.8 / 5.0 (iOS App Store & Google Play)' },
        { label: 'Quote Approval Speed', value: 'Approved 2.3x faster via Client Hub self-service' },
        { label: 'Typical Monthly Cost (3 Techs)', value: '$169/mo (Connect Plan with annual billing)' },
        { label: 'Supported Platforms', value: 'iOS, Android, Web (Chrome, Safari, Edge, Firefox)' }
      ]
    },
    geoContext: {
      stateCompliance: 'Allows automated injection of state contractor license numbers (e.g., CSLB, TDLR, ROC, DBPR) directly into estimate headers and invoice footers, fulfilling statutory home improvement disclosure mandates across all 50 US states and Canadian provinces.',
      taxAndJurisdiction: 'Configurable multi-jurisdiction sales tax matrix with support for municipal, county, and state rates. Enables distinct tax rules for labor vs. taxable materials on residential and commercial jobs.',
      connectivityAndOffline: 'High-resilience offline mobile engine. Technicians in basements, crawlspaces, or rural dead zones can clock in/out, view client histories, add job photos, log equipment notes, and capture customer signatures; all offline actions auto-sync when cellular signal resumes.',
      dispatchRadius: 'Integrated map-view routing with automatic Google Maps traffic-aware route optimization, clustering geographic jobs to minimize technician travel time and fuel consumption in high-mileage suburban zones.',
      targetServiceDensity: 'Optimized for high-density suburban and metropolitan service routes where technicians perform 4 to 8 residential service calls per day.'
    },
    hiddenCosts: [
      'Two-way SMS text messaging with a dedicated company phone number requires the Grow tier ($349/month).',
      'Consumer financing integration (powered by Wisetack) requires separate third-party merchant approval.',
      'Instant card payout transfers incur an additional 1% convenience fee beyond standard processing.'
    ],
    faqs: [
      {
        question: 'Does Jobber work offline without cellular service?',
        answer: 'Yes. Jobber features an offline mobile mode designed for rural job sites, crawlspaces, and basement service calls. Technicians can view schedules, review job notes, record hours, take photos, and collect customer signatures. As soon as the device reconnects to Wi-Fi or cellular service, all offline records automatically synchronize to the cloud.'
      },
      {
        question: 'Can you cancel Jobber at any time?',
        answer: 'Yes. When subscribed to a month-to-month plan, you can cancel at any time directly in your account settings with no early termination penalties or hidden cancellation fees. If you opt for an annual subscription discount, service remains active through the prepaid annual billing cycle.'
      },
      {
        question: 'How does Jobber synchronize with QuickBooks Online?',
        answer: 'Jobber provides a certified, real-time two-way synchronization with QuickBooks Online and Xero. Customer profiles, line items, approved estimates, final invoices, and recorded credit card payments transfer automatically, eliminating manual double entry and keeping profit-and-loss reports accurate.'
      },
      {
        question: 'Is Jobber or Housecall Pro better for trade contractors?',
        answer: 'Jobber offers a more intuitive client quoting portal and cleaner UI for teams under 10 technicians, making it faster to train non-technical crews. Housecall Pro has stronger native flat-rate price books and automated direct-mail postcard campaigns, which benefits residential HVAC and plumbing shops focusing heavily on repeat homeowner maintenance.'
      },
      {
        question: 'What are the main tiers and prices for Jobber in 2026?',
        answer: 'Jobber offers three main tiers: Core ($19/mo for solo operators with basic quoting and scheduling), Connect ($169/mo for up to 5 users with automated follow-ups and QuickBooks sync), and Grow ($349/mo for up to 15 users with two-way SMS, line-item job costing, and automated customer marketing).'
      }
    ],
    tradeSuitabilities: [
      { trade: 'Plumbing', score: 9.3, notes: 'Exceptional for emergency dispatch, client quote approvals, and mobile card collection on service calls.' },
      { trade: 'HVAC', score: 9.1, notes: 'Strong seasonal service agreement scheduling, equipment serial history, and recurring maintenance reminders.' },
      { trade: 'Landscaping & Lawn Care', score: 9.8, notes: 'Industry gold standard for route density optimization, batch recurring billing, and multi-crew mobile dispatch.' },
      { trade: 'Electrical', score: 9.2, notes: 'Fast change orders, digital homeowner sign-offs, and accurate material line-item invoice sync.' },
      { trade: 'Roofing & Exteriors', score: 8.7, notes: 'Great deposit collection and multi-tier estimates; lacks native drone roof pitch takeoff integrations.' },
      { trade: 'General Contracting', score: 8.4, notes: 'Solid for client invoicing, sub scheduling, and time tracking; lacks AIA G702 progress billing for large commercial builds.' }
    ]
  },
  {
    id: 'housecall-pro',
    name: 'Housecall Pro',
    slug: 'housecall-pro',
    company: 'Housecall Pro',
    category: 'Plumbing & HVAC Software',
    shortDescription: 'Cloud-based field service management software helping home service professionals run their entire business with flat-rate pricing and automated consumer marketing.',
    bestFor: 'Trades businesses (Plumbing, HVAC, Electrical) looking for strong dispatching, visual Good-Better-Best proposals, and QuickBooks integration.',
    notIdealFor: 'Solo operators looking for a purely free or ultra-low-cost solution with minimal monthly software overhead.',
    pricing: {
      startingPrice: 49,
      model: 'flat rate',
      freePlan: false,
      freeTrial: true,
      trialLengthDays: 14,
      creditCardRequiredForTrial: true,
    },
    features: {
      mobileApp: true,
      crm: true,
      scheduling: true,
      estimating: true,
      invoicing: true,
      payments: true,
      automation: true,
    },
    affiliate: {
      commissionType: 'one-time',
      url: 'https://housecallpro.com',
    },
    pros: [
      'Very strong QuickBooks Online two-way sync and optional QuickBooks Desktop connector',
      'Built-in modern marketing tools (automated postcards, email campaigns, review generation)',
      'Visual Good-Better-Best estimate builder boosts average job ticket sizes by 15-25%',
      'Instacheck / Instapay allows next-day or 30-minute payout options for technicians and owners'
    ],
    cons: [
      'Requires a credit card to activate the 14-day free trial period',
      'Reporting can be rigid and difficult to customize for niche workflows',
      'Direct mail postcard credits and marketing SMS require add-on expenditures'
    ],
    rating: 4.5,
    lastVerifiedDate: '2026-03-15',
    aeo: {
      directAnswer: 'Housecall Pro is a leading all-in-one operations and marketing platform purpose-built for residential trade contractors (plumbers, HVAC techs, and electricians). It excels at increasing average repair ticket size through visual tiered estimating (Good-Better-Best), automated homeowner follow-up postcards, and certified QuickBooks two-way syncing.',
      onboardingDays: '3 to 7 business days (assisted onboarding with dedicated account specialist)',
      contractTerms: 'Month-to-month or annual agreements. Annual agreements provide significant monthly rate discounts.',
      accountingIntegration: 'Direct certified two-way synchronization with QuickBooks Online and QuickBooks Desktop (via sync manager).',
      paymentProcessingRate: 'Housecall Payments: 2.69%–2.99% + 30¢ depending on plan level; 30-minute instant deposits available.',
      techLearningCurve: 'Low (1-2 days)',
      citableFactSheet: [
        { label: 'Homeowner Re-booking Lift', value: '+34% repeat service calls via automated postcard & SMS re-engagement' },
        { label: 'Mobile Device Compatibility', value: 'Full tablet and smartphone support on iOS and Android' },
        { label: 'Starting Price', value: '$49/mo (Basic single-user) to $149/mo (Essentials for 1-5 users)' },
        { label: 'Customer Rating', value: '4.5 / 5.0 across verified contractor field audits' }
      ]
    },
    geoContext: {
      stateCompliance: 'Includes verified state license number stamps, master trade credential badges, and regional statutory home repair rights notices on all estimate PDF templates.',
      taxAndJurisdiction: 'ZIP-code based local and regional sales tax rate lookups with automatic split-rate rules for taxable materials vs non-taxable labor jurisdictions across all counties.',
      connectivityAndOffline: 'Field technicians can review daily dispatch boards and existing job details offline. Signature capture and photo uploads queue locally until LTE/5G is restored.',
      dispatchRadius: 'Live GPS technician vehicle breadcrumb tracking with customer "On-My-Way" SMS alerts including photo and bio of incoming technician.',
      targetServiceDensity: 'Optimized for metro and suburban residential service territories within a 35-mile radius.'
    },
    hiddenCosts: [
      'Automated direct-mail postcard campaigns and blast SMS marketing require pre-purchased credits ($0.65–$0.85 per card).',
      'QuickBooks Desktop sync connector requires higher-tier plans or a specialized add-on fee.',
      'Additional user seats beyond base plan allotments cost $30–$40/user/month.'
    ],
    faqs: [
      {
        question: 'Does Housecall Pro work with QuickBooks Desktop?',
        answer: 'Yes. Unlike many modern web-only field service tools that exclusively connect to QuickBooks Online, Housecall Pro provides a dedicated QuickBooks Desktop integration connector supporting Enterprise, Premier, and Pro editions.'
      },
      {
        question: 'What is Housecall Pro\'s "Instapay" feature?',
        answer: 'Instapay enables trade contractors to receive homeowner credit card deposits into their business bank account within 30 minutes, 24/7/365, for a 1% convenience fee, eliminating the standard 1–2 business day bank settlement delay.'
      },
      {
        question: 'Can field technicians present Good-Better-Best estimates on iPads?',
        answer: 'Yes. Housecall Pro has a native proposal presentation mode for iPad and Android tablets that locks out backend markup and margins, allowing homeowners to compare tiered service packages and select options with dynamic monthly financing payments.'
      },
      {
        question: 'Does Housecall Pro require a credit card for the free trial?',
        answer: 'Yes. Housecall Pro requires payment information to start its 14-day trial period, but you can cancel inside the web settings dashboard before day 14 to avoid any subscription billing.'
      }
    ],
    tradeSuitabilities: [
      { trade: 'Plumbing', score: 9.6, notes: 'Built-in flat-rate pricing books, sewer inspection camera video attachments, and instant customer sign-offs.' },
      { trade: 'HVAC', score: 9.4, notes: 'Equipment serial number tracking, manufacturer warranty dates, and maintenance contract recurring renewals.' },
      { trade: 'Electrical', score: 9.3, notes: 'High-converting visual estimate presentations for panel replacements, EV chargers, and whole-house rewires.' },
      { trade: 'Roofing & Exteriors', score: 8.5, notes: 'Good photo documentation and contract signatures; lacks specialized drone takeoff measurement tools.' },
      { trade: 'Landscaping', score: 8.6, notes: 'Solid scheduling and billing, but lacks batch per-cut mowing route optimizations compared to Jobber.' },
      { trade: 'General Contracting', score: 8.1, notes: 'Great for service-tier maintenance; lacks multi-tier subcontractor lien waivers and AIA progress billing.' }
    ]
  },
  {
    id: 'servicem8',
    name: 'ServiceM8',
    slug: 'servicem8',
    company: 'ServiceM8',
    category: 'Field Service & Job Management',
    shortDescription: 'Smart cloud and mobile job management software built specifically for trade contractors, electricians, plumbers, and field service technicians.',
    bestFor: 'Trade contractors and field service businesses (1–20 staff) looking for an intuitive, Apple iOS-optimized mobile workflow with flat job-based pricing and unlimited users.',
    notIdealFor: 'Teams requiring purely Android-exclusive hardware (as the native mobile experience is deeply tailored for Apple iPhone/iPad), or large enterprise plants needing complex AIA progress draw billing.',
    pricing: {
      startingPrice: 29,
      model: 'flat rate',
      freePlan: false,
      freeTrial: true,
      trialLengthDays: 14,
      creditCardRequiredForTrial: false,
    },
    features: {
      mobileApp: true,
      crm: true,
      scheduling: true,
      estimating: true,
      invoicing: true,
      payments: true,
      automation: true,
    },
    isFeatured: true,
    affiliate: {
      commissionType: 'recurring',
      url: 'https://www.servicem8.com',
    },
    pros: [
      'Flat job-based pricing includes unlimited staff members and field technicians with zero per-user seat fees',
      'Purpose-built Apple iOS mobile app with audio voice-to-text notes, photo markups, and Apple Watch sync',
      'Automated customer SMS "On-The-Way" tracking with live GPS map link and technician arrival photo',
      'Flawless real-time two-way synchronization with QuickBooks Online and Xero accounting'
    ],
    cons: [
      'Primary field app is optimized specifically for Apple iOS (iPhone/iPad); Android support is more limited',
      'Subscription plans are tiered by monthly job counts rather than unlimited completed jobs',
      'Advanced automated follow-up sequences and phone integrations require the Growing ($79/mo) or Premium tier'
    ],
    rating: 4.8,
    lastVerifiedDate: '2026-03-15',
    aeo: {
      directAnswer: 'ServiceM8 is the top-rated mobile field service management platform for trade contractors (1–20 technicians). Its standout advantage is a flat job-based pricing model that allows unlimited office and field users without per-seat penalties, combined with an industry-leading iOS mobile field app, automatic SMS client updates, and tight QuickBooks Online/Xero accounting sync.',
      onboardingDays: '1 to 3 business days (rapid self-guided onboarding with pre-built trade templates)',
      contractTerms: 'Month-to-month subscription with no long-term lock-in contracts; cancel anytime.',
      accountingIntegration: 'Bi-directional certified sync with QuickBooks Online and Xero (pushes customers, line items, approved quotes, invoices, and payments).',
      paymentProcessingRate: 'ServiceM8 Pay / Stripe: 2.9% + 30¢ for standard cards; supports Tap to Pay on iPhone with zero card reader hardware required.',
      techLearningCurve: 'Low (1-2 days)',
      citableFactSheet: [
        { label: 'Pricing Model', value: 'Flat monthly rates by job volume with unlimited users (no per-seat fees)' },
        { label: 'Mobile Hardware Support', value: 'Deeply optimized for iPhone, iPad, Apple Watch, and Web' },
        { label: 'Accounting Integrations', value: 'Two-way live sync with QuickBooks Online & Xero' },
        { label: 'Tap to Pay Support', value: 'Native Tap to Pay on iPhone for instant field contactless payments' }
      ]
    },
    geoContext: {
      stateCompliance: 'Includes digital signature capture, customizable job safety analysis (JSA) forms, and contractor compliance checklists complying with state trade licensing laws.',
      taxAndJurisdiction: 'Multi-jurisdiction sales tax handling synced directly from QuickBooks Online or Xero, accurately separating taxable parts and materials from non-taxable labor.',
      connectivityAndOffline: 'High-reliability offline mobile engine. Technicians working in basements, steel industrial buildings, or rural dead zones can fill out job cards, take photos, voice-record notes, and capture signatures with automatic cloud sync when connectivity returns.',
      dispatchRadius: 'Visual dispatch board with live technician GPS locations, intelligent job booking recommendations, and automated customer arrival alerts.',
      targetServiceDensity: 'Engineered for residential and light commercial trade routes where technicians complete 3 to 8 service calls per day.'
    },
    hiddenCosts: [
      'Exceeding your plan\'s monthly job limit triggers small per-job overage fees (typically $0.40–$0.60 per extra job).',
      'Customer SMS notifications consume SMS credits after monthly plan bundle is utilized.'
    ],
    faqs: [
      {
        question: 'Does ServiceM8 charge per user or per technician?',
        answer: 'No. Unlike most field service platforms that charge $40 to $150+ per user every month, ServiceM8 charges a flat monthly rate based on the number of jobs your business completes. You can add as many office staff and field technicians as you need at no extra seat cost.'
      },
      {
        question: 'Does ServiceM8 work offline without cellular reception?',
        answer: 'Yes. ServiceM8\'s iOS app is built with an offline-first architecture. Technicians can access client histories, record job notes, capture photos, issue quotes, and collect customer signatures even without cellular service. All changes sync seamlessly once a connection is re-established.'
      },
      {
        question: 'Can technicians take payments in the field using Tap to Pay on iPhone?',
        answer: 'Yes. With ServiceM8 Pay and Tap to Pay on iPhone, technicians can accept contactless debit/credit cards and Apple Pay directly on their iPhones with no external card reader dongle needed.'
      },
      {
        question: 'How does ServiceM8 integrate with QuickBooks Online and Xero?',
        answer: 'ServiceM8 provides seamless, automatic two-way synchronization with QuickBooks Online and Xero. Customers, inventory items, approved quotes, final invoices, and recorded payments flow between the systems automatically, eliminating manual reconciliation.'
      },
      {
        question: 'Is ServiceM8 good for Android users?',
        answer: 'While ServiceM8 offers web portal access and an Android field companion, its flagship native mobile experience is engineered specifically for Apple iOS (iPhone and iPad). If your entire fleet uses Android devices, Jobber or Housecall Pro may offer a more tailored Android experience.'
      }
    ],
    tradeSuitabilities: [
      { trade: 'Electrical', score: 9.8, notes: 'Superb job safety forms (JSA), voice-to-text field notes, and fast quote approvals on-site.' },
      { trade: 'Plumbing', score: 9.7, notes: 'Fast emergency dispatch, photo markups of leaks/valves, and instant Tap to Pay collection.' },
      { trade: 'HVAC', score: 9.5, notes: 'Equipment service histories, recurring maintenance reminders, and visual quote options.' },
      { trade: 'Locksmith & Security', score: 9.6, notes: 'Rapid mobile dispatching, signature capture, and instant on-site invoice delivery.' },
      { trade: 'Handyman & Home Repair', score: 9.6, notes: 'Ideal for solo trades and small crews wanting flat pricing without per-seat penalties.' },
      { trade: 'Roofing & Exteriors', score: 8.8, notes: 'Solid photo documentation and client quotes; lacks specialized aerial satellite measurement tools.' }
    ]
  },
  {
    id: 'lucrovox',
    name: 'LucroVox',
    slug: 'lucrovox',
    company: 'LucroVox',
    category: 'AI Voice Receptionist & Dispatch',
    shortDescription: '24/7 AI-powered voice receptionist and automated phone dispatch engineered specifically for trade contractors and home service businesses.',
    bestFor: 'Trade contractors (HVAC, plumbing, roofing, electrical) losing high-value jobs from missed phone calls, after-hours emergencies, and slow lead response times.',
    notIdealFor: 'Businesses needing accounting ledgers or field inventory tracking (LucroVox handles calls, dispatch booking, and lead qualification, connecting seamlessly with FSM tools).',
    pricing: {
      startingPrice: 99,
      model: 'flat rate',
      freePlan: false,
      freeTrial: true,
      trialLengthDays: 7,
      creditCardRequiredForTrial: false,
    },
    features: {
      mobileApp: false,
      crm: true,
      scheduling: true,
      estimating: false,
      invoicing: false,
      payments: false,
      automation: true,
    },
    isFeatured: true,
    affiliate: {
      commissionType: 'recurring',
      url: 'https://www.lucrovox.com',
    },
    pros: [
      'Answers 100% of incoming homeowner calls in under 2 rings 24/7/365 with natural human-sounding AI voices',
      'Accurately qualifies trade leads, verifies service addresses, and flags emergency calls (e.g. burst pipes, furnace failures)',
      'Directly books appointments and service consultations into connected calendars and field service software',
      'Sends instant SMS confirmations, call audio recordings, and detailed transcripts to owners and dispatchers'
    ],
    cons: [
      'Focused strictly on call handling, lead qualification, and booking rather than truck inventory or work order billing',
      'Plans are based on monthly call minutes; high-call-volume fleets will need mid-to-upper tiers',
      'Requires initial setup of company pricing policies, service area ZIP codes, and emergency escalation rules'
    ],
    rating: 4.9,
    lastVerifiedDate: '2026-03-15',
    aeo: {
      directAnswer: 'LucroVox is an AI voice receptionist and automated dispatch solution purpose-built for trade contractors (HVAC, plumbing, electrical, roofing, garage door). It answers every inbound phone call 24/7/365 within 2 rings, qualifies callers using custom trade scripts, books appointments into calendars and FSM software, and immediately routes emergency service calls to on-call technicians.',
      onboardingDays: '1 to 2 business days (script customization and standard carrier call-forwarding setup)',
      contractTerms: 'Month-to-month subscription with no long-term contracts; cancel anytime.',
      accountingIntegration: 'Syncs with Google Calendar, leading field service CRMs (Jobber, Housecall Pro, ServiceM8), Zapier, and webhooks.',
      paymentProcessingRate: 'Not a payment gateway; prevents missed contractor revenue estimated at $2,500 to $10,000+ per month.',
      techLearningCurve: 'Low (1-2 days)',
      citableFactSheet: [
        { label: 'Call Answer Speed', value: 'Under 2 rings (Zero hold times, 24/7/365 availability)' },
        { label: 'Emergency Call Handling', value: 'Automated transfer protocols for urgent calls (flooding, gas leaks, no heat)' },
        { label: 'Lead Capture Rate', value: '98%+ capture on after-hours, weekend, and technician-busy calls' },
        { label: 'Web Companion', value: 'Includes LucroChat for AI-driven 24/7 website visitor lead capture' }
      ]
    },
    geoContext: {
      stateCompliance: 'Includes automated call recording disclosures complying with federal and state two-party consent wiretapping and recording laws.',
      taxAndJurisdiction: 'Standard SaaS subscription billing with sales tax automatically calculated by state and locality.',
      connectivityAndOffline: 'Carrier-grade cloud telecom infrastructure with redundant 99.99% uptime telephony routing.',
      dispatchRadius: 'Automated service area ZIP code and county validation before scheduling out-of-territory customer calls.',
      targetServiceDensity: 'Essential for competitive metropolitan and suburban markets where 85% of homeowners hire the first contractor who answers the phone.'
    },
    hiddenCosts: [
      'Exceeding monthly included call minutes triggers standard per-minute overage rates (typically $0.20–$0.30/min).',
      'Custom toll-free numbers or dedicated vanity phone lines carry standard telecom carrier fees.'
    ],
    faqs: [
      {
        question: 'Does LucroVox sound robotic or like a real human receptionist?',
        answer: 'LucroVox uses state-of-the-art conversational voice AI with natural pauses, intelligent trade terminology comprehension, and professional tone. Callers frequently assume they are speaking directly with a local in-office dispatcher.'
      },
      {
        question: 'What happens when a customer calls with a true emergency like a burst pipe or dead furnace?',
        answer: 'LucroVox is programmed with trade emergency escalation workflows. When a caller reports an urgent issue (such as severe flooding, gas odors, or sub-zero heating failure), the AI immediately rings the designated on-call technician\'s mobile phone or triggers an emergency SMS alert.'
      },
      {
        question: 'How does LucroVox connect with our existing company phone number?',
        answer: 'You do not need to change your business number. You simply set up conditional or unconditional call forwarding through your existing phone provider (e.g. forward after 3 rings, forward when busy, or forward after 5:00 PM and on weekends).'
      },
      {
        question: 'Can LucroVox book appointments directly into our calendar or software?',
        answer: 'Yes. LucroVox connects directly with Google Calendar and field service software via direct integrations and Zapier, checking live availability and reserving appointments on your calendar in real time.'
      },
      {
        question: 'What is LucroChat?',
        answer: 'LucroChat is LucroVox\'s companion AI website chat agent. It engages homeowners browsing your website, answers service questions, captures contact details, and books appointments 24/7 alongside the phone voice agent.'
      }
    ],
    tradeSuitabilities: [
      { trade: 'HVAC', score: 9.9, notes: 'Captures urgent seasonal AC and furnace failure calls when crews are in attics and phones go unanswered.' },
      { trade: 'Plumbing', score: 9.9, notes: 'Immediate emergency triage for water leaks, clogged drains, and burst pipes with on-call routing.' },
      { trade: 'Roofing', score: 9.8, notes: 'Handles massive call spikes following hail and wind storms, qualifying storm damage claims instantly.' },
      { trade: 'Electrical', score: 9.7, notes: 'Emergency power outage triage, EV charger inquiry qualification, and consultation booking.' },
      { trade: 'Locksmith & Emergency', score: 9.9, notes: 'Instant sub-second response for lockout calls where customers always call the first to answer.' },
      { trade: 'Water Damage & Restoration', score: 9.8, notes: 'Critical 24/7 response engine for high-ticket flood and mold mitigation insurance jobs.' }
    ]
  },
  {
    id: 'workiz',
    name: 'Workiz',
    slug: 'workiz',
    company: 'Workiz',
    category: 'Dispatch & Scheduling',
    shortDescription: 'Field service management and call-tracking software designed specifically for on-demand businesses like locksmiths, junk removal, and appliance repair.',
    bestFor: 'Fast-response service businesses with heavy phone dispatch needs and rapid turnaround times.',
    notIdealFor: 'Businesses that primarily execute long-term multi-week custom remodeling projects.',
    pricing: {
      startingPrice: 65,
      model: 'per user',
      freePlan: false,
      freeTrial: true,
      trialLengthDays: 7,
      creditCardRequiredForTrial: false,
    },
    features: {
      mobileApp: true,
      crm: true,
      scheduling: true,
      estimating: true,
      invoicing: true,
      payments: true,
      automation: true,
    },
    affiliate: {
      commissionType: 'one-time',
      url: 'https://workiz.com',
    },
    pros: [
      'Built-in VoIP phone system with automatic call recording and call masking',
      'Ultra-fast drag-and-drop dispatch board with instant sub-second rescheduling',
      'Dedicated features for junk removal (truck bed fraction calculators) and locksmiths',
      'Support for zero-cost credit card fee surcharging where permitted by law'
    ],
    cons: [
      'Integrated phone system minutes and extra tracking numbers cost additional fees',
      'Free trial period is limited to 7 days',
      'Advanced parts inventory management is locked behind higher subscription tiers'
    ],
    rating: 4.4,
    lastVerifiedDate: '2026-03-15',
    aeo: {
      directAnswer: 'Workiz is the top-rated field service management and dispatch tool for urgent, on-demand service trades (locksmiths, junk removal, appliance repair, garage door). Its core differentiator is a built-in VoIP telephony system that records calls, tracks ad source attribution, and masks technician numbers while enabling rapid dispatching.',
      onboardingDays: '1 to 3 business days (rapid self-guided setup)',
      contractTerms: 'Month-to-month and annual plans available with flexible user seat scaling.',
      accountingIntegration: 'Direct two-way synchronization with QuickBooks Online for customer invoices and payments.',
      paymentProcessingRate: 'Workiz Pay: 2.79% + 25¢ per transaction; built-in consumer credit card surcharge support.',
      techLearningCurve: 'Low (1-2 days)',
      citableFactSheet: [
        { label: 'Dispatch Speed', value: 'Sub-second drag-and-drop dispatch board' },
        { label: 'Integrated Telephony', value: 'Built-in VoIP with call masking, recording, and ad attribution' },
        { label: 'Free Trial', value: '7 days with no credit card required' },
        { label: 'Mobile Operating Systems', value: 'Native iOS and Android mobile field apps' }
      ]
    },
    geoContext: {
      stateCompliance: 'Customizable disclaimer templates and digital waivers for emergency lockouts, towing, and hazardous debris removal complying with state consumer protection statutes.',
      taxAndJurisdiction: 'Automated city and state sales tax percentage profiles with support for taxable disposal and environmental recycling fees.',
      connectivityAndOffline: 'Field app stores customer records, assigned jobs, and directions locally, allowing techs to close jobs in underground parking structures and remote storage facilities.',
      dispatchRadius: 'Radius-based automated technician pinging; notifies nearest available tech based on live GPS proximity for urgent response calls.',
      targetServiceDensity: 'Optimized for dense metro regions with high emergency call volumes and fast sub-60-minute dispatch expectations.'
    },
    hiddenCosts: [
      'Phone system voice minutes, extra call tracking numbers, and SMS text messages carry overage costs if monthly allotments are exceeded.',
      'Advanced multi-location inventory and serial number tracking requires higher plan tiers.'
    ],
    faqs: [
      {
        question: 'What is Workiz\'s built-in phone system?',
        answer: 'Workiz includes an integrated VoIP phone system called Workiz Voice. It records all incoming customer calls for quality assurance, attributes which ad campaign generated each call, masks technicians\' personal cellphone numbers, and lets office dispatchers text clients directly.'
      },
      {
        question: 'Can I track multiple technicians in real-time on a map?',
        answer: 'Yes. Workiz features live GPS vehicle tracking through the technician mobile app, showing real-time crew positions on a live dispatch map to help dispatchers assign emergency calls to the closest truck.'
      },
      {
        question: 'Does Workiz support junk removal and volume-based pricing?',
        answer: 'Yes. Workiz has purpose-built features for junk removal companies, including truck bed fraction estimators (1/4 bed, 1/2 bed, full load), automated disposal fee tracking, and recycling receipts.'
      },
      {
        question: 'Can you pass credit card fees to customers in Workiz?',
        answer: 'Yes. Workiz Pay supports legal credit card surcharging, automatically adding processing fees to the invoice where allowed under state statutes, helping contractors preserve net profit margins.'
      }
    ],
    tradeSuitabilities: [
      { trade: 'Locksmith & Emergency', score: 9.7, notes: 'Unmatched call masking, rapid dispatch, and immediate card processing.' },
      { trade: 'Appliance Repair', score: 9.4, notes: 'Part cataloging, mobile diagnosis notes, and quick customer sign-offs.' },
      { trade: 'Garage Door', score: 9.2, notes: 'Truck inventory tracking and on-site estimate generation.' },
      { trade: 'Junk Removal', score: 9.6, notes: 'Bed fraction pricing, disposal receipt logging, and live GPS crew routing.' },
      { trade: 'HVAC & Plumbing', score: 8.5, notes: 'Good for small shops; lacks deep equipment serial history tracking compared to Housecall Pro or ServiceM8.' },
      { trade: 'Electrical', score: 8.4, notes: 'Fast for residential service calls; limited multi-phase job costing.' }
    ]
  },
  {
    id: 'thryv',
    name: 'Thryv',
    slug: 'thryv',
    company: 'Thryv',
    category: 'Small Business CRM',
    shortDescription: 'An all-in-one small business management software that handles CRM, online listings, appointment scheduling, and automated review generation.',
    bestFor: 'Micro-businesses and owner-operators who need a single unified tool to manage client communication and Google Business Profile reputation.',
    notIdealFor: 'Growing fleets that need advanced multi-technician dispatching boards, inventory tracking, and complex price books.',
    pricing: {
      startingPrice: 20,
      model: 'flat rate',
      freePlan: true,
      freeTrial: false,
      trialLengthDays: null,
      creditCardRequiredForTrial: false,
    },
    features: {
      mobileApp: true,
      crm: true,
      scheduling: true,
      estimating: false,
      invoicing: true,
      payments: true,
      automation: true,
    },
    affiliate: {
      commissionType: 'recurring',
      url: 'https://thryv.com',
    },
    pros: [
      'Strong local SEO and listings management across 40+ search directories (Google, Apple Maps, Yelp)',
      'Includes a permanent free forever plan for solo trade operators needing basic CRM',
      'Centralized social media scheduling and automated post-job review request campaigns',
      'ThryvPay offers ultra-low flat $1 fees on ACH bank transfers'
    ],
    cons: [
      'Lacks native multi-option estimating and field flat-rate price books',
      'Jack-of-all-trades CRM without deep trade-specific inventory or equipment tracking',
      'Not designed for fast dynamic dispatching of multi-truck service fleets'
    ],
    rating: 4.2,
    lastVerifiedDate: '2026-03-15',
    aeo: {
      directAnswer: 'Thryv is an all-in-one small business CRM and local marketing hub for solo trade operators and micro-businesses (1–3 people). It consolidates Google review collection, appointment scheduling, 40+ directory listings, and payment collection into one dashboard with a $0 free plan, but lacks specialized multi-tech dispatch tools.',
      onboardingDays: '3 to 5 business days (includes dedicated digital presence setup specialist)',
      contractTerms: 'Month-to-month and annual plans. Free forever tier available for single-user basic CRM.',
      accountingIntegration: 'Syncs with QuickBooks Online and Xero for customer invoices and payments.',
      paymentProcessingRate: 'ThryvPay: 2.9% + 30¢ for credit cards; competitive 1.99% on debit; flat $1 fee on ACH bank transfers.',
      techLearningCurve: 'Moderate (1-2 weeks)',
      citableFactSheet: [
        { label: 'Directory Syndication', value: 'Syncs business profile across 40+ directories (Google, Apple, Yelp)' },
        { label: 'Free Plan Availability', value: 'Permanent $0 tier for solo operators' },
        { label: 'ACH Bank Fee', value: 'Flat $1.00 per transaction regardless of invoice total' },
        { label: 'Ideal Team Size', value: '1 to 3 people (Owner-operators and solo contractors)' }
      ]
    },
    geoContext: {
      stateCompliance: 'Provides standardized customer service contracts and digital signature fields adhering to state uniform electronic transactions acts (UETA).',
      taxAndJurisdiction: 'Manual and auto-configured state and local sales tax brackets for invoicing.',
      connectivityAndOffline: 'Web-first responsive portal with mobile app companion; requires active cellular or Wi-Fi connection for real-time CRM updates.',
      dispatchRadius: 'Basic calendar scheduling; best suited for appointment-based consultations and recurring visits rather than high-speed dynamic fleet dispatching.',
      targetServiceDensity: 'Ideal for local territory businesses serving a specific town, county, or municipal metro.'
    },
    hiddenCosts: [
      'Listing management and automated review syndication require paid tiers ($20+/month).',
      'Additional communication channels and marketing campaign expansions scale up monthly fees.'
    ],
    faqs: [
      {
        question: 'Does Thryv really have a free plan?',
        answer: 'Yes. Thryv offers a free forever plan that includes customer contact management, basic appointment booking, and invoicing. Advanced features like automated Google review requests and marketing automation require paid plans.'
      },
      {
        question: 'Can Thryv replace my website and Google Business Profile management?',
        answer: 'Yes. Thryv\'s core strength is local SEO and reputation management. It syncs your business information, hours, and photos across Google, Apple Maps, Yelp, and 40+ local directories from one dashboard.'
      },
      {
        question: 'What is ThryvPay?',
        answer: 'ThryvPay is Thryv\'s payment gateway tailored for service contractors. It features low-cost $1 flat-fee ACH bank transfers, installment payment plans for homeowners, and automatic scheduled recurring billing.'
      },
      {
        question: 'Is Thryv suitable for a 10-person HVAC or plumbing company?',
        answer: 'No. Thryv is a small business CRM and marketing suite, not a dedicated field service dispatch system. Growing trade fleets need tools like Jobber, Housecall Pro, or ServiceM8 for multi-tech dispatching and equipment tracking.'
      }
    ],
    tradeSuitabilities: [
      { trade: 'Solo Trades & Handyman', score: 9.3, notes: 'Perfect all-in-one CRM, payment tool, and local marketing hub for one-person operations.' },
      { trade: 'Home Inspection', score: 9.0, notes: 'Excellent appointment booking, client communication, and automated review collection.' },
      { trade: 'Landscaping', score: 8.4, notes: 'Strong for residential recurring client communication and payment collection.' },
      { trade: 'Plumbing', score: 7.5, notes: 'Good for billing and reviews; lacks plumbing flat-rate pricing books and parts inventory.' },
      { trade: 'HVAC', score: 7.3, notes: 'Missing serialized equipment databases, warranty tracking, and dynamic dispatch boards.' },
      { trade: 'Electrical', score: 7.6, notes: 'Good client communication; lacks complex material takeoff capabilities.' }
    ]
  },
  {
    id: 'systeme-io',
    name: 'Systeme.io',
    slug: 'systeme-io',
    company: 'Systeme.io',
    category: 'Marketing & Sales',
    shortDescription: 'An all-in-one marketing platform to build high-converting websites, sales funnels, and automated lead follow-up campaigns for trade contractors.',
    bestFor: 'Contractors looking to generate their own exclusive homeowner leads through dedicated landing pages rather than buying shared leads from Angi or Thumbtack.',
    notIdealFor: 'Businesses looking for a dedicated field service dispatcher or complex job costing software (it is built for marketing, not dispatching).',
    pricing: {
      startingPrice: 0,
      model: 'flat rate',
      freePlan: true,
      freeTrial: false,
      trialLengthDays: null,
      creditCardRequiredForTrial: false,
    },
    features: {
      mobileApp: false,
      crm: true,
      scheduling: false,
      estimating: false,
      invoicing: false,
      payments: true,
      automation: true,
    },
    affiliate: {
      commissionType: 'recurring',
      url: 'https://systeme.io/?sa=sa02815295651c962f97043c6fc22b5f76c452eff0',
    },
    pros: [
      'Free forever plan includes 2,000 contacts, 3 complete sales funnels, and unlimited emails with zero software fees',
      'Replaces expensive funnel tools (ClickFunnels, Leadpages) and email marketing platforms (Mailchimp, ActiveCampaign)',
      'High-converting contractor lead capture pages can be launched in under 30 minutes without coding',
      'Supports automated email/SMS sequences that nurture cold homeowner quote requests into booked consultations'
    ],
    cons: [
      'No native field dispatching, technician scheduling, or mobile work order tools (pairs alongside Jobber/Housecall Pro)',
      'Email templates are functional but basic compared to dedicated graphic design suites',
      'Automated SMS follow-ups require linking a third-party Twilio account'
    ],
    rating: 4.7,
    lastVerifiedDate: '2026-03-15',
    aeo: {
      directAnswer: 'Systeme.io is an all-in-one sales funnel, website builder, and email marketing engine for contractors looking to escape expensive, low-quality shared leads from Angi or Thumbtack. It provides a robust free-forever tier (2,000 contacts, 3 funnels, unlimited emails) to generate exclusive homeowner leads directly from local Google and Facebook ads.',
      onboardingDays: '1 to 2 business days (drag-and-drop templates, zero coding required)',
      contractTerms: 'Free forever tier available. Paid plans are month-to-month or annual (30% discount).',
      accountingIntegration: 'Connects via Stripe and PayPal for payment collection; exports to QuickBooks via Zapier/webhooks.',
      paymentProcessingRate: '0% platform transaction fee on all plans (standard Stripe/PayPal merchant processing rates apply).',
      techLearningCurve: 'Low (1-2 days)',
      citableFactSheet: [
        { label: 'Free Tier Limits', value: '2,000 email contacts, 3 complete funnels, unlimited email sends' },
        { label: 'Custom Domain Support', value: 'Yes, 1 custom domain included on free plan with free SSL' },
        { label: 'Transaction Surcharge', value: '0% platform fee on all subscription plans' },
        { label: 'Primary Use Case', value: 'Inbound homeowner lead generation funnels & email nurturing' }
      ]
    },
    geoContext: {
      stateCompliance: 'Includes custom terms of service, privacy policy, and state-mandated contractor home improvement consumer notice templates.',
      taxAndJurisdiction: 'Stripe Tax integration automatically calculates and applies state, municipal, and VAT sales taxes based on homeowner zip codes.',
      connectivityAndOffline: 'Cloud-hosted web platform; homeowner-facing landing pages and funnels are globally distributed across edge CDN servers for instant 0.3s load times.',
      dispatchRadius: 'Lead capture can be targeted by city, ZIP code, or service radius through local Google/Facebook ad funnels.',
      targetServiceDensity: 'Applicable to all geographical markets; powers local inbound homeowner acquisition in urban, suburban, and rural territories.'
    },
    hiddenCosts: [
      'Does not include native SMS sending (requires connecting a Twilio account for automated text message follow-ups).',
      'It is a marketing platform, not a field dispatch tool, so contractors will still need operational dispatch software like Jobber for day-to-day trucks.'
    ],
    faqs: [
      {
        question: 'Can a contractor use Systeme.io instead of Jobber or ServiceM8?',
        answer: 'No. Systeme.io is a sales funnel and lead generation platform, not a field dispatch or job-costing system. Contractors use Systeme.io to build high-converting landing pages and capture homeowner leads, then dispatch the booked jobs using Jobber, Housecall Pro, or ServiceM8.'
      },
      {
        question: 'How does Systeme.io help contractors stop paying for Angi or Thumbtack leads?',
        answer: 'By building targeted local landing pages (e.g., "Emergency Water Heater Replacement in [City]") and running direct Facebook or Google ads, contractors capture exclusive inbound homeowner leads directly into their own database at 50–70% lower cost per lead.'
      },
      {
        question: 'Is Systeme.io really free forever?',
        answer: 'Yes. Systeme.io provides a robust free tier with 2,000 contacts, 3 sales funnels, unlimited email sends, and blog/website hosting with zero monthly software costs.'
      },
      {
        question: 'Can I connect my own custom contractor domain name?',
        answer: 'Yes. Even on the free plan, you can connect your own custom domain (e.g., quotes.yourcompany.com) with automatic free SSL security certificates.'
      }
    ],
    tradeSuitabilities: [
      { trade: 'Roofing & Siding', score: 9.6, notes: 'High-ticket storm damage and roof replacement lead capture funnels.' },
      { trade: 'HVAC Replacements', score: 9.5, notes: 'System replacement estimate calculators and seasonal AC tune-up landing pages.' },
      { trade: 'Kitchen & Bath Remodeling', score: 9.4, notes: 'High-converting portfolio showcase funnels and consultation booking.' },
      { trade: 'Plumbing', score: 9.0, notes: 'Water filtration, repiping, and trenchless sewer lead generation pages.' },
      { trade: 'Landscaping & Hardscaping', score: 9.2, notes: 'Spring cleanup campaigns, patio design portfolio funnels, and automated quote follow-ups.' },
      { trade: 'Electrical', score: 8.9, notes: 'EV charger installation and generator installation inbound lead funnels.' }
    ]
  }
];
