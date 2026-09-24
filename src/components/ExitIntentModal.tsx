import React, { useState, useEffect, useRef } from 'react';
import { NewsletterForm } from './NewsletterForm';
import { X } from 'lucide-react';

export function ExitIntentModal() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only trigger once per session
    if (sessionStorage.getItem('exitIntentShown')) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowModal(true);
        sessionStorage.setItem('exitIntentShown', 'true');
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (showModal && modalRef.current) {
      // Focus first input when modal opens
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setShowModal(false);
        }
        
        // Focus trap
        if (e.key === 'Tab') {
          const first = focusableElements[0] as HTMLElement;
          const last = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (e.shiftKey) {
            if (document.activeElement === first) {
              last.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div 
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm print:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div ref={modalRef} className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg relative p-8">
        <button 
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close dialog"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 id="modal-title" className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Don't leave empty-handed!</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Get our <strong>Free Industry-Specific Software Checklist</strong>. Make sure you don't miss any critical features before buying your next CRM or dispatch tool.
        </p>
        <NewsletterForm buttonText="Get the Checklist" successMessage="Success! The checklist is on its way to your inbox." eventName="checklist_download" />
        <button 
          onClick={() => setShowModal(false)}
          className="w-full text-center mt-4 py-3 min-h-[44px] text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors underline flex items-center justify-center"
        >
          No thanks, I'm good for now
        </button>
      </div>
    </div>
  );
}
