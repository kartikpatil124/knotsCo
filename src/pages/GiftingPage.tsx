import { useEffect } from 'react';
import { Gift, Sparkles, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';
import CustomBouquetBuilder from '../sections/CustomBouquetBuilder';
import NewsletterSection from '../sections/NewsletterSection';
import { getWhatsAppLink } from '../utils/helpers';
import { siteConfig } from '../config/site';

export default function GiftingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCustomInquiry = () => {
    window.open(
      getWhatsAppLink(
        "Hi Knots N Co! I would like to enquire about bespoke gifting and custom bouquet orders."
      ),
      '_blank'
    );
  };

  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-ivory">
      {/* Page Header */}
      <div className="bg-cream/50 py-10 sm:py-14 border-b border-border text-center">
        <div className="section-container">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-[11px] font-semibold tracking-widest uppercase mb-3">
            <Gift size={13} />
            <span>The Gifting Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-charcoal">
            Custom Keepsakes & Gifting
          </h1>
          <p className="mt-3 text-[14px] sm:text-[15px] text-charcoal/65 max-w-lg mx-auto">
            Design a one-of-a-kind bouquet or choose curated hampers for birthdays, weddings, anniversaries, and personal surprises.
          </p>
        </div>
      </div>

      {/* Flagship Custom Bouquet Builder */}
      <CustomBouquetBuilder />

      {/* Gifting Features Grid */}
      <div className="section-container py-16 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-forest mb-2">
            Signature Touches
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal">
            Included with Every Gift Order
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-[var(--radius-xl)] bg-white border border-border">
            <CheckCircle2 size={24} className="text-forest mb-3" />
            <h3 className="font-serif text-[17px] font-medium text-charcoal mb-1">
              Handwritten Card
            </h3>
            <p className="text-[13px] text-charcoal/60 leading-relaxed">
              Every order includes a textured kraft greeting card handwritten with your personal message.
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-xl)] bg-white border border-border">
            <CheckCircle2 size={24} className="text-forest mb-3" />
            <h3 className="font-serif text-[17px] font-medium text-charcoal mb-1">
              Protective Gift Box
            </h3>
            <p className="text-[13px] text-charcoal/60 leading-relaxed">
              Carefully nested in crush-proof corrugated gift boxes with soft paper cushioning.
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-xl)] bg-white border border-border">
            <CheckCircle2 size={24} className="text-forest mb-3" />
            <h3 className="font-serif text-[17px] font-medium text-charcoal mb-1">
              Pre-Dispatch Photo
            </h3>
            <p className="text-[13px] text-charcoal/60 leading-relaxed">
              We send photo previews on WhatsApp before shipping so you can approve your arrangement.
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-xl)] bg-white border border-border">
            <CheckCircle2 size={24} className="text-forest mb-3" />
            <h3 className="font-serif text-[17px] font-medium text-charcoal mb-1">
              Pan-India Safe Delivery
            </h3>
            <p className="text-[13px] text-charcoal/60 leading-relaxed">
              Fast, insured shipping across India with trackable courier partners.
            </p>
          </div>
        </div>

        {/* Bulk & Wedding Order Banner */}
        <div className="mt-12 p-8 rounded-[var(--radius-xl)] bg-forest text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-2">
              Wedding Favors & Bulk Corporate Gifting
            </h3>
            <p className="text-[14px] text-white/75 max-w-xl leading-relaxed">
              Looking for custom bridal party bouquets, graduation tokens, or aesthetic corporate gifts? We handcraft custom orders tailored to your theme and color palette.
            </p>
          </div>
          <button
            onClick={handleCustomInquiry}
            className="btn bg-white text-forest hover:bg-ivory px-6 py-3.5 text-[13px] font-semibold tracking-wide shrink-0 inline-flex items-center gap-2"
          >
            <MessageCircle size={16} />
            Inquire on WhatsApp
          </button>
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
}
