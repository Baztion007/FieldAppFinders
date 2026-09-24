import React from 'react';

// A stylistic representation of software density across trades.
// Larger/brighter circles represent more saturated categories.
export function TradeIndustryMap() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 my-12 border border-slate-800 overflow-hidden relative shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/0 to-slate-900/0 pointer-events-none" />
      
      <div className="mb-8 relative z-10 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Trade Industry Map</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Software saturation and density by trade. Larger clusters indicate more specialized solutions available.
        </p>
      </div>

      <div className="relative w-full aspect-[4/3] md:aspect-video flex items-center justify-center max-w-4xl mx-auto">
        <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-hvac" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="grad-landscaping" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="grad-cleaning" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="grad-contracting" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0.8" />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Connection Lines */}
          <path d="M400,250 L250,150" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" fill="none" className="opacity-50" />
          <path d="M400,250 L550,150" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" fill="none" className="opacity-50" />
          <path d="M400,250 L250,350" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" fill="none" className="opacity-50" />
          <path d="M400,250 L550,350" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" fill="none" className="opacity-50" />

          {/* Central Hub */}
          <circle cx="400" cy="250" r="40" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <text x="400" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle" fontWeight="bold">General</text>
          
          {/* Group 1: HVAC & Plumbing (High Density) */}
          <g className="group transition-transform hover:scale-105 origin-center cursor-pointer" transform="translate(250, 150)">
            <circle cx="0" cy="0" r="80" fill="url(#grad-hvac)" stroke="#60a5fa" strokeWidth="2" filter="url(#glow)"/>
            <circle cx="-30" cy="-20" r="15" fill="#fff" opacity="0.2" />
            <circle cx="20" cy="-10" r="25" fill="#fff" opacity="0.1" />
            <circle cx="-10" cy="30" r="20" fill="#fff" opacity="0.15" />
            <text x="0" y="5" fill="#fff" fontSize="16" textAnchor="middle" fontWeight="bold">HVAC & Plumbing</text>
            <text x="0" y="25" fill="#93c5fd" fontSize="12" textAnchor="middle">High Density</text>
          </g>

          {/* Group 2: Contracting (Medium Density) */}
          <g className="group transition-transform hover:scale-105 origin-center cursor-pointer" transform="translate(550, 150)">
            <circle cx="0" cy="0" r="60" fill="url(#grad-contracting)" stroke="#fbbf24" strokeWidth="2" filter="url(#glow)"/>
            <circle cx="-15" cy="-15" r="15" fill="#fff" opacity="0.2" />
            <circle cx="15" cy="15" r="20" fill="#fff" opacity="0.1" />
            <text x="0" y="5" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="bold">Contracting</text>
            <text x="0" y="25" fill="#fde68a" fontSize="10" textAnchor="middle">Medium Density</text>
          </g>

          {/* Group 3: Cleaning (Growing Density) */}
          <g className="group transition-transform hover:scale-105 origin-center cursor-pointer" transform="translate(250, 350)">
            <circle cx="0" cy="0" r="55" fill="url(#grad-cleaning)" stroke="#38bdf8" strokeWidth="2" filter="url(#glow)"/>
            <circle cx="-10" cy="-10" r="12" fill="#fff" opacity="0.2" />
            <text x="0" y="5" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="bold">Cleaning</text>
            <text x="0" y="22" fill="#bae6fd" fontSize="10" textAnchor="middle">Growing Market</text>
          </g>

          {/* Group 4: Landscaping (Medium Density) */}
          <g className="group transition-transform hover:scale-105 origin-center cursor-pointer" transform="translate(550, 350)">
            <circle cx="0" cy="0" r="65" fill="url(#grad-landscaping)" stroke="#34d399" strokeWidth="2" filter="url(#glow)"/>
            <circle cx="-15" cy="-10" r="18" fill="#fff" opacity="0.15" />
            <circle cx="20" cy="10" r="14" fill="#fff" opacity="0.1" />
            <text x="0" y="5" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="bold">Landscaping</text>
            <text x="0" y="22" fill="#a7f3d0" fontSize="10" textAnchor="middle">Medium Density</text>
          </g>
        </svg>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-slate-300 text-xs uppercase tracking-wider">High Options</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span className="text-slate-300 text-xs uppercase tracking-wider">Medium Options</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="text-slate-300 text-xs uppercase tracking-wider">Specialized Options</span>
        </div>
      </div>
    </div>
  );
}
