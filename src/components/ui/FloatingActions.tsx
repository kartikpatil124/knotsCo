import { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { siteConfig } from '../../config/site';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=Hi%20Petal%20%26%20Thread!%20I%20have%20an%20inquiry%20about%20your%20crochet%20flowers.`,
      '_blank'
    );
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-11 h-11 rounded-full bg-white text-charcoal border border-border shadow-md flex items-center justify-center hover:bg-ivory transition-all duration-300 animate-scale-in"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* WhatsApp Floating CTA */}
      <button
        onClick={handleWhatsApp}
        className="pointer-events-auto flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-[#25D366] text-white font-medium text-[13px] shadow-lg hover:bg-[#20ba59] hover:shadow-xl transition-all duration-300 active:scale-95 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          <MessageCircle size={18} className="fill-white" />
          {/* Subtle live indicator dot */}
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 border-2 border-[#25D366] animate-ping" />
        </div>
        <span className="hidden sm:inline">Order via WhatsApp</span>
        <span className="sm:hidden">WhatsApp</span>
      </button>
    </div>
  );
}
