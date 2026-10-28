import { useState, useRef } from 'react';
import { MapPin, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { siteConfig } from '../config/site';
import InfiniteSpiral, { type SpiralItem } from '../components/ui/InfiniteSpiral';

interface HeroSectionProps {
  onExplore: () => void;
  onStory?: () => void;
}

const spiralGalleryItems: SpiralItem[] = [
  {
    src: '/images/products/pastel-bouquet.jpg',
    alt: 'Pastel Blossom Bouquet',
    label: 'Pastel Bouquet • ₹1,299',
    href: '/shop',
  },
  {
    src: '/images/products/spring-meadow.jpg',
    alt: 'Spring Meadow Wildflowers',
    label: 'Spring Meadow • ₹1,599',
    href: '/shop',
  },
  {
    src: '/images/products/custom-bouquet.jpg',
    alt: 'Custom Bridal Keepsake',
    label: 'Bridal Keepsake • ₹1,999',
    href: '/shop',
  },
  {
    src: '/images/products/anniversary-set.jpg',
    alt: 'Anniversary Gift Hamper',
    label: 'Anniversary Box • ₹2,499',
    href: '/shop',
  },
  {
    src: '/images/products/sunflower-gift.jpg',
    alt: 'Sunburst Gift Bouquet',
    label: 'Sunburst Gift • ₹899',
    href: '/shop',
  },
  {
    src: '/images/products/mini-tulip.jpg',
    alt: 'Dutch Tulip Stem',
    label: 'Tulip Stem • ₹249',
    href: '/shop',
  },
  {
    src: '/images/products/rose-stem.jpg',
    alt: 'Velvet Scarlet Rose',
    label: 'Scarlet Rose • ₹299',
    href: '/shop',
  },
  {
    src: '/images/products/lavender-bunch.jpg',
    alt: 'Provence Lavender Bunch',
    label: 'Lavender Bunch • ₹699',
    href: '/shop',
  },
  {
    src: '/images/products/daisy-keychain.jpg',
    alt: 'Daisy Blossom Charm',
    label: 'Daisy Charm • ₹199',
    href: '/shop',
  },
  {
    src: '/images/products/flower-keychain.jpg',
    alt: 'Bloom Ring Keychain',
    label: 'Bloom Keychain • ₹229',
    href: '/shop',
  },
  {
    src: '/images/products/heart-keychain.jpg',
    alt: 'Knitted Heart Charm',
    label: 'Heart Charm • ₹189',
    href: '/shop',
  },
  {
    src: '/images/products/thank-you-box.jpg',
    alt: 'Gratitude Keepsake Box',
    label: 'Thank You Box • ₹1,499',
    href: '/shop',
  },
];

export default function HeroSection({ onExplore, onStory }: HeroSectionProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#121B16] text-white pt-20 pb-0"
    >
      {/* Cinematic Looping Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          src="/images/video/IMG_1732.MP4"
          poster="/images/hero.jpg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center scale-[1.03] transition-opacity duration-1000"
        />

        {/* Cinematic Layered Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121B16] via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-[#16211C]/35 mix-blend-multiply" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 section-container flex-1 flex flex-col justify-center pt-2 sm:pt-6 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center flex-1">
          {/* Left Column: Heading, Subtitle, Actions */}
          <div className="lg:col-span-6 xl:col-span-6 max-w-2xl text-left">
            {/* Origin & Studio Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 text-white/90 animate-fade-in shadow-sm">
              <MapPin size={13} className="text-rose-light shrink-0" />
              <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.22em]">
                VESU, SURAT • KNOTSNCO CROCHET STUDIO
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-sans font-extrabold text-4xl sm:text-6xl xl:text-[68px] leading-[1.06] tracking-tight text-white animate-fade-in-up">
              The Bloom Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-light to-white">
                Your Imaginary
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] text-white/80 leading-relaxed max-w-xl animate-fade-in-up stagger-1 font-light">
              Thousands of everlasting crochet flower bouquets, custom bridal keepsakes, and adorable plushies lovingly hand-tied stitch by stitch by local women artisans in Surat, Gujarat.
            </p>

            {/* Action Buttons Row */}
            <div className="mt-7 sm:mt-8 flex items-center gap-3.5 sm:gap-4 animate-fade-in-up stagger-2">
              <button
                onClick={onExplore}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-rose-light text-charcoal font-semibold text-[14px] tracking-wide shadow-2xl transition-all duration-300 active:scale-95 flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Blooms</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Video Audio Toggle (Icon-only circle placed side by side) */}
              <button
                onClick={toggleSound}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-lg group shrink-0"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <VolumeX size={18} className="text-rose-light group-hover:scale-110 transition-transform" />
                ) : (
                  <Volume2 size={18} className="text-sage group-hover:scale-110 transition-transform" />
                )}
              </button>
            </div>
          </div>

          {/* Right Column: 3D Helical Image Scroller (Seamlessly floating without boxy container) */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center pt-0 pb-0 flex-1 w-full">
            {/* The 3D Infinite Spiral Helix Stage (Extends to bottom edge) */}
            <div className="relative w-full h-[580px] sm:h-[600px] lg:h-[680px] flex items-center justify-center overflow-hidden pb-0 mb-0">
              <InfiniteSpiral
                items={spiralGalleryItems}
                animationMode="auto"
                speed={0.45}
                radius={175}
                cardWidth={120}
                cardHeight={140}
                verticalSpacing={72}
                perspective={1000}
                cardRadius={16}
                centerScale={1.22}
                edgeFade={0.1}
                edgeBlur={3}
                cardsPerTurn={6}
                pauseOnHover={false}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
