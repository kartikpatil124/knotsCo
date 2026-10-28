import { Sparkles, HeartHandshake, Infinity, Gift, Truck } from 'lucide-react';

const valueProps = [
  {
    icon: Infinity,
    title: 'Everlasting Blooms',
    description: 'Flowers that never wilt, drop petals, or need water. A keepsake that lasts for years to come.',
  },
  {
    icon: HeartHandshake,
    title: 'Handmade with Love',
    description: 'Each petal, leaf, and stem is individually crocheted by skilled artisans with utmost patience.',
  },
  {
    icon: Gift,
    title: 'Thoughtfully Packaged',
    description: 'Arrives in signature eco-friendly wrapping with a complimentary handwritten note card.',
  },
  {
    icon: Sparkles,
    title: 'Bespoke Customization',
    description: 'Choose your own color palettes, flower stems, and personal touches for any occasion.',
  },
];

// 4 complete sets (16 cards total) for a mathematically seamless, infinite continuous auto-scroll loop
const marqueeProps = [
  ...valueProps,
  ...valueProps,
  ...valueProps,
  ...valueProps,
];

export default function ValuePropsSection() {
  return (
    <section className="py-7 sm:py-9 bg-ivory border-y border-border overflow-hidden relative select-none">
      <div className="section-container">
        {/* Continuous Infinite Auto-Scrolling Track with Edge Fade Masks */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] py-1.5">
          <div className="animate-marquee-props flex items-center gap-4 sm:gap-5 cursor-grab active:cursor-grabbing">
            {marqueeProps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="value-prop-card flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/90 hover:bg-white backdrop-blur-xs transition-all duration-300 border border-border/80 hover:shadow-md hover:border-forest/25 shrink-0 w-[270px] sm:w-[310px] md:w-[330px]"
                >
                  <div className="w-11 h-11 rounded-full bg-cream/90 flex items-center justify-center shrink-0 text-forest transition-transform duration-300 group-hover:scale-110 shadow-xs">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="font-serif text-[15px] sm:text-[16px] font-semibold text-charcoal mb-1 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[12.5px] sm:text-[13px] text-charcoal/65 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Small trust banner */}
        <div className="mt-5 pt-4 border-t border-border/40">
          {/* Mobile Display Only: 2 points side-by-side on line 1, 3rd point on next line */}
          <div className="sm:hidden flex flex-col items-center gap-1.5 text-[11px] text-charcoal/65">
            <div className="flex items-center justify-center gap-2 max-w-full">
              <div className="inline-flex items-center gap-1.5 shrink-0">
                <Truck size={13} className="text-forest shrink-0" />
                <span>Pan-India Safe Delivery</span>
              </div>
              <span className="text-charcoal/25 select-none shrink-0">•</span>
              <div className="inline-flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" />
                <span>100% Premium Combed Cotton Yarn</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-rose shrink-0" />
              <span>Eco-Friendly & Hypoallergenic</span>
            </div>
          </div>

          {/* Big Displays (sm: and up): Unchanged single horizontal row */}
          <div className="hidden sm:flex items-center justify-center gap-6 sm:gap-10 text-[12px] text-charcoal/60">
            <div className="flex items-center gap-2">
              <Truck size={15} className="text-forest shrink-0" />
              <span>Pan-India Safe Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" />
              <span>100% Premium Combed Cotton Yarn</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose shrink-0" />
              <span>Eco-Friendly & Hypoallergenic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
