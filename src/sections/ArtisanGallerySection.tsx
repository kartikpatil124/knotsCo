import { Sparkles } from 'lucide-react';
import FlexCarousel, { FlexCarouselItem } from '../components/ui/FlexCarousel';

const GALLERY_ITEMS: FlexCarouselItem[] = [
  {
    src: '/reels/Video-23857.mp4',
    alt: 'Peach Harmony Bouquet hand-crocheted reel',
    title: 'Peach Harmony Bouquet',
    subtitle: '100% Combed Cotton Yarn'
  },
  {
    src: '/reels/Video-29507.mp4',
    alt: 'Wild Meadow Flora bouquet reel',
    title: 'Wild Meadow Flora',
    subtitle: 'Hand-Dyed Lilac & Sage'
  },
  {
    src: '/reels/Video-42635.mp4',
    alt: 'Velvet Crimson Keepsake reel',
    title: 'Velvet Crimson Keepsake',
    subtitle: 'Heirloom Anniversary Edition'
  },
  {
    src: '/reels/Video-83429.mp4',
    alt: 'Radiant Sunflower Stem reel',
    title: 'Radiant Sunflower Stem',
    subtitle: 'Artisan Gold Petals'
  },
  {
    src: '/reels/Video-83683.mp4',
    alt: 'Mini Dutch Tulip desk bloom reel',
    title: 'Mini Dutch Tulip',
    subtitle: 'Desk Companion Bloom'
  },
  {
    src: '/reels/Video-97933.mp4',
    alt: 'Artisan Hands in Motion crochet crafting reel',
    title: 'Artisan Hands in Motion',
    subtitle: 'Hand-Stitched in Surat Atelier'
  }
];

export default function ArtisanGallerySection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] text-charcoal relative overflow-hidden">
      {/* Soft ambient lighting for warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-rose-100/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-[500px] h-[300px] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cream text-forest text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-3.5 border border-border/80 shadow-2xs">
            <Sparkles size={12} className="text-terracotta" />
            <span>Interactive Atelier Gallery</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal tracking-tight leading-tight">
            The Botanical Lens
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-charcoal/70 leading-relaxed font-sans max-w-lg mx-auto">
            Experience our artisanal crochet creations through interactive live atelier reels. Drag horizontally to glide, or tap any card to focus and inspect its micro-stitch details.
          </p>
        </div>

        {/* WebGL FlexCarousel Container - Seamless on cream background, No enclosing box */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: '580px' }}
        >
          <FlexCarousel
            items={GALLERY_ITEMS}
            preset="ribbon"
            intro="rise"
            cardHeight={0.56}
            gap={16}
            radius={16}
            fit="portrait"
            squeeze={0.15}
            focusOnClick={true}
            captions={true}
            showSubtitle={false}
            autoplay={true}
            interval={4.5}
            captureWheel={false}
          />
        </div>
      </div>
    </section>
  );
}
