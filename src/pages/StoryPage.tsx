import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, MapPin, Users, Award, ShieldCheck } from 'lucide-react';
import StorySection from '../sections/StorySection';
import WhyCrochetSection from '../sections/WhyCrochetSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import NewsletterSection from '../sections/NewsletterSection';
import { siteConfig } from '../config/site';

export default function StoryPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-ivory">
      {/* Page Header */}
      <div className="bg-cream/50 py-10 sm:py-14 border-b border-border text-center">
        <div className="section-container">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-[11px] font-semibold tracking-widest uppercase mb-3">
            <Heart size={12} className="fill-rose text-rose" />
            <span>The Artisan Journey</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-charcoal">
            Our Story & Craft
          </h1>
          <p className="mt-3 text-[14px] sm:text-[15px] text-charcoal/65 max-w-lg mx-auto">
            How a love for slow craftsmanship and women empowerment gave birth to Knots N Co in Surat, Gujarat.
          </p>
        </div>
      </div>

      {/* Main Story Section */}
      <StorySection onExplore={() => navigate('/shop')} />

      {/* Deep Dive Pillars */}
      <div className="section-container py-16 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-forest mb-2">
            Our Core Values
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-charcoal">
            Why Every Stitch Matters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 rounded-[var(--radius-xl)] bg-white border border-border">
            <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-4">
              <Users size={22} />
            </div>
            <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
              Women Empowerment
            </h3>
            <p className="text-[13px] text-charcoal/65 leading-relaxed">
              Knots N Co partners with local homemakers, mothers, and grandmothers across Surat, providing dignified creative livelihood and honoring traditional hand-weaving skills.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-[var(--radius-xl)] bg-white border border-border">
            <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-4">
              <Award size={22} />
            </div>
            <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
              Uncompromising Quality
            </h3>
            <p className="text-[13px] text-charcoal/65 leading-relaxed">
              We exclusively craft with combed milk cotton yarn and flexible wire stems. Every single petal and leaf is shaped by hand with microscopic attention to detail.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-[var(--radius-xl)] bg-white border border-border">
            <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-4">
              <ShieldCheck size={22} />
            </div>
            <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
              Zero Waste Everlasting
            </h3>
            <p className="text-[13px] text-charcoal/65 leading-relaxed">
              Traditional fresh bouquets wilt in under a week. Our crochet florals stay vibrant for years without water, floral foam, or environmental waste.
            </p>
          </div>
        </div>
      </div>

      {/* Why Crochet Section */}
      <WhyCrochetSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
