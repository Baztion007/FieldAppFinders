import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  key?: React.Key;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      setPosition({
        top: -tooltipRect.height - 8,
        left: (containerRect.width - tooltipRect.width) / 2
      });
    }
  }, [isVisible]);

  return (
    <div 
      className="relative inline-flex"
      ref={containerRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      onKeyDown={(e) => { if (e.key === 'Escape') setIsVisible(false); }}
    >
      {children}
      
      {isVisible && (
        <div 
          ref={tooltipRef}
          role="tooltip"
          className="absolute z-[100] px-3 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-700 rounded-md shadow-lg pointer-events-none w-max max-w-[200px] text-center leading-tight transition-opacity duration-200"
          style={{ top: position.top, left: position.left }}
        >
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
        </div>
      )}
    </div>
  );
}
