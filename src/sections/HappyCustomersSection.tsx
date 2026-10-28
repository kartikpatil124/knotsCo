import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DriftWall, { DriftWallItem } from '../components/ui/DriftWall';

const CUSTOMER_CREATIONS: DriftWallItem[] = [
  {
    image: '/images/products/custom-bouquet.jpg',
    title: 'Aarav & Meera’s 5th Anniversary',
    subtitle: '7 Bespoke Pastel Stems • Surat'
  },
  {
    image: '/images/products/anniversary-set.jpg',
    title: 'Crimson Rose & Cream Keepsake',
    subtitle: 'Hand-stitched with love • Mumbai'
  },
  {
    image: '/images/products/spring-meadow.jpg',
    title: 'Pooja’s Meadow Wildflower Mix',
    subtitle: 'Lilac, Chamomile & Sage • Bengaluru'
  },
  {
    image: '/images/products/sunflower-gift.jpg',
    title: 'Aditi’s Convocation Giant Sunflower',
    subtitle: 'Custom Gold Ribbon Wrap • Pune'
  },
  {
    image: '/images/products/pastel-bouquet.jpg',
    title: 'Kavya’s Peach Harmony Centerpiece',
    subtitle: 'Dining table forever blooms • Jaipur'
  },
  {
    image: '/images/products/mini-tulip.jpg',
    title: 'Ria’s Desk Sunshine Companion',
    subtitle: 'Mini Dutch Tulip • New Delhi'
  },
  {
    image: '/images/products/lavender-bunch.jpg',
    title: 'Aanya’s Calming Lavender Stems',
    subtitle: 'Infused with gentle lavender oil • Ahmedabad'
  },
  {
    image: '/images/products/daisy-keychain.jpg',
    title: 'Bridesmaid Favors (Set of 6)',
    subtitle: 'Personalized pastel tags • Vadodara'
  },
  {
    image: '/images/products/heart-keychain.jpg',
    title: 'Rohan & Simran’s Promise Charms',
    subtitle: 'Matching Rose Quartz hearts • Surat'
  },
  {
    image: '/images/products/flower-keychain.jpg',
    title: 'Sakura Blossom Bag Charms',
    subtitle: 'Custom birthday return gifts • Chennai'
  },
  {
    image: '/images/products/rose-stem.jpg',
    title: 'Forever Velvet Red Rose',
    subtitle: 'First Valentine’s Day stem • Kolkata'
  },
  {
    image: '/images/products/thank-you-box.jpg',
    title: 'Teacher Gratitude Keepsake Box',
    subtitle: 'Handwritten calligraphy card • Surat'
  },
  {
    image: '/images/hero.jpg',
    title: 'Destination Wedding Stage Blooms',
    subtitle: 'Bespoke custom floral accents • Goa'
  },
  {
    image: '/images/story.jpg',
    title: 'Artisan Workshop Hand-Stitched Detail',
    subtitle: 'Crafted with 100% premium cotton yarn'
  }
];

export default function HappyCustomersSection() {
  const navigate = useNavigate();

  // Responsive column and tile sizing for background DriftWall
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const columns = isMobile ? 3 : isTablet ? 4 : 6;
  const tileWidth = isMobile ? 150 : isTablet ? 190 : 230;
  const tileHeight = isMobile ? 105 : isTablet ? 135 : 155;
  const gap = isMobile ? 12 : 16;
  const sectionHeight = isMobile ? '520px' : '620px';

  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center bg-[#FAF7F2]"
      style={{ height: sectionHeight }}
      aria-label="Custom Bouquet Showcase"
    >
      {/* 1. DRIFT WALL AS FULL CRISP BACKGROUND (No blur, no dark color overlay, full opacity) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto">
        <DriftWall
          items={CUSTOMER_CREATIONS}
          columns={columns}
          tileWidth={tileWidth}
          tileHeight={tileHeight}
          gap={gap}
          radius={16}
          tilt={14}
          turn={-12}
          perspective={1200}
          depth={90}
          speed={32}
          direction="up"
          variance={0.4}
          parallax={0.5}
          lift={45}
          fade={0}
          dim={1}
          overlayColor="transparent"
          grayscale={false}
          className="w-full h-full"
        />
      </div>

      {/* 2. FLOATING CENTER CARD WITH AUTHENTIC GLASS EFFECT */}
      <div
        className="relative z-10 pointer-events-auto max-w-lg mx-4 text-center rounded-3xl p-6 sm:p-9 transition-all duration-300 hover:scale-[1.01]"
        style={{
          background: 'rgba(255, 255, 255, 0.42)',
          backdropFilter: 'blur(20px) saturate(190%)',
          WebkitBackdropFilter: 'blur(20px) saturate(190%)',
          border: '1px solid rgba(255, 255, 255, 0.65)',
          boxShadow:
            '0 20px 45px -12px rgba(33, 43, 36, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.5) inset, 0 2px 4px 0 rgba(255, 255, 255, 0.9) inset'
        }}
      >
        {/* Heading */}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-charcoal tracking-tight leading-snug">
          Customised With Love
        </h2>

        {/* Minimal Information */}
        <p className="mt-2.5 text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans max-w-md mx-auto font-normal">
          Every custom bouquet tells a unique story. Handcrafted petal by petal with premium cotton yarn for your special moments.
        </p>

        {/* CTA Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/gifting')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-forest text-white text-xs sm:text-sm font-semibold hover:bg-forest-light transition-all shadow-lg shadow-forest/25 active:scale-95 cursor-pointer"
          >
            <span>Design Your Custom Bouquet</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Subtle Hint */}
        <p className="mt-3.5 text-[11px] text-charcoal/60 font-medium tracking-wide">
          Move your cursor or touch to explore real custom orders
        </p>
      </div>
    </section>
  );
}
