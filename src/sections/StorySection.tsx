import { Heart, Sparkles, MapPin } from 'lucide-react';
import { siteConfig } from '../config/site';

interface StorySectionProps {
  onExplore: () => void;
}

export default function StorySection({ onExplore }: StorySectionProps) {
  return (
    <section id="story" className="py-16 sm:py-24 bg-cream/50 scroll-mt-12 overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image Side with decorative frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Back decorative layer */}
              <div className="absolute -inset-3 rounded-[var(--radius-xl)] bg-rose/15 -rotate-2 transform" />
              
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-[var(--radius-xl)] overflow-hidden shadow-lg border border-border bg-white">
                <img
                  src="/images/story.jpg"
                  alt="Artisan hands crocheting delicate petals with soft yarn at Knots N Co studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                
                {/* Floating Artisan Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-[var(--radius-md)] bg-white/95 backdrop-blur-md border border-border shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-forest text-white flex items-center justify-center shrink-0">
                      <Heart size={16} />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-charcoal leading-tight">
                        Knots N Co Studio • Surat
                      </p>
                      <p className="text-[11px] text-charcoal/60">
                        Handcrafted by Gujarat’s local women artisans
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-[11px] font-semibold tracking-widest uppercase">
              <Sparkles size={13} />
              <span>Behind the Stitches</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal leading-[1.15]">
              Turning Yarn into Forever Memories.
            </h2>

            <p className="text-[15px] sm:text-[16px] text-charcoal/75 leading-relaxed">
              Born in Surat, Gujarat, {siteConfig.brand.name} began with a simple belief: the most heartfelt gifts are those crafted by patient hands, stitch by mindful stitch.
            </p>

            <p className="text-[14px] sm:text-[15px] text-charcoal/70 leading-relaxed">
              At our flagship studio in Vesu, Surat, we work side-by-side with a dedicated community of local women artisans — including mothers and grandmothers. Each petal is coaxed into shape from premium milk cotton yarn, reinforced with flexible floral wire for realistic arrangement, and assembled into everlasting bouquets, cute plushies, and keepsakes that never fade.
            </p>

            {/* Behind the numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-border/80">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-forest">120+</p>
                <p className="text-[11px] text-charcoal/55 uppercase tracking-wider font-medium mt-0.5">
                  Stitches per Petal
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-forest">4.5 hrs</p>
                <p className="text-[11px] text-charcoal/55 uppercase tracking-wider font-medium mt-0.5">
                  Avg. Craft Time
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-forest">100%</p>
                <p className="text-[11px] text-charcoal/55 uppercase tracking-wider font-medium mt-0.5">
                  Milk Cotton Yarn
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-forest">Surat</p>
                <p className="text-[11px] text-charcoal/55 uppercase tracking-wider font-medium mt-0.5">
                  Vesu Studio
                </p>
              </div>
            </div>

            {/* Signature & Studio Visit note */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <p className="font-serif italic text-[16px] text-charcoal/90">
                  "Flowers that remind you that the best things in life take time."
                </p>
                <p className="text-[12px] text-charcoal/50 mt-1 flex items-center gap-1.5">
                  <MapPin size={13} className="text-forest" />
                  <span>Phoenix Tower, Vesu, Surat • Pan-India Delivery</span>
                </p>
              </div>

              <button
                onClick={onExplore}
                className="btn btn-primary self-start text-[13px] shrink-0"
              >
                Explore the Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
