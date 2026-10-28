import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Check,
  Volume2,
  VolumeX,
  ArrowRight
} from 'lucide-react';
import whyCrochetVideo from '../assets/video/why-crochet.mp4';

interface PillarCard {
  id: string;
  category: string;
  icon: string;
  pillColor: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
}

const PILLARS: PillarCard[] = [
  {
    id: 'quality',
    category: 'Heirloom Quality',
    icon: '🧶',
    pillColor: 'bg-[#E0C097]/25 border-[#E0C097]/50 text-[#E0C097]',
    title: 'Micro-Stitched Cotton',
    tagline: 'Zero synthetic scratch. Zero fraying.',
    description:
      'We obsessively hand-stitch every bloom using 100% premium double-twisted combed cotton yarn. Soft to touch, tension-locked, and dyed with sunlight-safe hues that stay vibrant for a decade.',
    bullets: [
      '100% Combed Cotton (Zero Plastic)',
      'Anti-Pill & Non-Fray Stitching',
      'Fade-Proof In Room Sunlight'
    ]
  },
  {
    id: 'lifespan',
    category: 'Forever Lifespan',
    icon: '🌸',
    pillColor: 'bg-[#E8A598]/25 border-[#E8A598]/50 text-[#E8A598]',
    title: 'The Zero-Wilt Era',
    tagline: '10+ years vs. 5 days of fresh flowers.',
    description:
      'Fresh cut bouquets wilt and turn into brown trash within a week. Our everlasting crochet stems never need watering, trimming, or cleanup, sitting pretty on your vanity year after year.',
    bullets: [
      '10+ Years Lasting Keepsake',
      'Zero Watering or Dropped Petals',
      'Never Replace Weekly Stems'
    ]
  },
  {
    id: 'kindness',
    category: 'Pure Kindness',
    icon: '🤝',
    pillColor: 'bg-[#A3C9A8]/25 border-[#A3C9A8]/50 text-[#A3C9A8]',
    title: 'Women-Led in Surat',
    tagline: 'Empowering local mothers with fair wages.',
    description:
      'Every purchase directly supports our homegrown collective of women artisans in Gujarat. We guarantee dignified fair-trade wages, flexible studio hours, and honest slow craft with soul.',
    bullets: [
      'Dignified Fair-Trade Living Wages',
      'Flexible Home & Studio Hours',
      'Homegrown Gujarat Craft Collective'
    ]
  },
  {
    id: 'safety',
    category: 'Pet & Allergy Safe',
    icon: '🐾',
    pillColor: 'bg-[#98D8D8]/25 border-[#98D8D8]/50 text-[#98D8D8]',
    title: 'Zero Pollen. Zero Toxins.',
    tagline: '100% safe for cats, dogs & hospital rooms.',
    description:
      'Real lilies and cut flowers carry pollen that is lethal to cats and triggers severe sneezing. Our crochet stems are 100% hypoallergenic, thornless, and pet-friendly for total peace of mind.',
    bullets: [
      'Non-Toxic to Curious Cats & Puppies',
      '100% Sneeze-Free & Hypoallergenic',
      'Hospital & Dorm Room Approved'
    ]
  },
  {
    id: 'sentiment',
    category: 'Sentimental Keepsake',
    icon: '💌',
    pillColor: 'bg-[#DDA0DD]/25 border-[#DDA0DD]/50 text-[#DDA0DD]',
    title: 'Memories That Last',
    tagline: 'Wax-sealed notes & bespoke heirloom gifts.',
    description:
      'A permanent physical reminder of your love and milestone celebrations. Each bouquet comes packed with handwritten calligraphy cards, luxury wraps, and keepsake packaging.',
    bullets: [
      'Complimentary Handwritten Card',
      'Signature Kraft & Satin Gift Wrap',
      'Permanent Daily Serotonin Boost'
    ]
  }
];

export default function WhyCrochetSection() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#0A120D] text-white">
      {/* 1. CINEMATIC VIDEO BACKGROUND (Clear and visible, no dark heavy blackout) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          src={whyCrochetVideo || '/images/video/why-crochet.mp4'}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-[1.02]"
        />

        {/* Gentle Translucent Vignette: preserves video clarity while maintaining text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10, 18, 13, 0.45) 0%, rgba(10, 18, 13, 0.12) 25%, rgba(10, 18, 13, 0.1) 75%, rgba(10, 18, 13, 0.55) 100%)'
          }}
        />
      </div>

      {/* Floating Sound Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleSound}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/25 text-xs text-white transition-all cursor-pointer shadow-lg active:scale-95"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#E0C097]" />}
          <span className="hidden sm:inline text-[11px] font-medium">
            {isMuted ? 'Sound Off' : 'Sound On'}
          </span>
        </button>
      </div>

      {/* 2. FOREGROUND CONTENT */}
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto px-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold text-[#E0C097] tracking-widest uppercase mb-3.5 shadow-sm">
            <Sparkles size={13} className="text-[#E0C097]" />
            <span>The Forever Bloom Era</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FDFBF7] tracking-tight leading-[1.14]">
            Why Our Crochet <br className="hidden sm:inline" />
            <span className="italic font-light text-[#E0C097]">Hits Different</span>
          </h2>

          <p className="mt-3.5 text-xs sm:text-base text-white/85 font-sans leading-relaxed max-w-xl mx-auto drop-shadow-xs">
            Zero withering. Zero toxic plastic. Crafted with unmatched stitch quality, 10+ years lifespan, and pure kindness for your space and loved ones.
          </p>
        </div>

        {/* 3. SIDE-BY-SIDE AUTO-SCROLLING GLASS CONTAINERS (Marquee Loop) */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Subtle edge fades to seamlessly blend scrolling cards */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#0A120D]/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#0A120D]/60 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="animate-marquee-smooth flex gap-5 sm:gap-6 px-4">
            {/* Duplicated twice for seamless continuous infinite auto-scrolling */}
            {[...PILLARS, ...PILLARS].map((pillar, index) => (
              <div
                key={`${pillar.id}-${index}`}
                className="w-[285px] sm:w-[340px] shrink-0 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.28)',
                  boxShadow:
                    '0 18px 40px -10px rgba(0, 0, 0, 0.35), inset 0 1px 2px 0 rgba(255, 255, 255, 0.4)'
                }}
              >
                {/* Top Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-semibold uppercase tracking-wider border ${pillar.pillColor}`}
                    >
                      <span>{pillar.category}</span>
                    </span>
                    <span className="text-2xl">{pillar.icon}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-1.5 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-[11.5px] text-[#E0C097] font-medium mb-3">
                    {pillar.tagline}
                  </p>

                  <p className="text-xs text-white/80 leading-relaxed font-sans mb-5">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Bullet Checklist */}
                <div className="pt-4 border-t border-white/15 space-y-2 text-xs text-white/85">
                  {pillar.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#E0C097]/25 text-[#E0C097] flex items-center justify-center shrink-0">
                        <Check size={11} />
                      </div>
                      <span className="text-[11.5px] font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. BOTTOM FLOATING ACTION BAR */}
        <div className="mt-10 sm:mt-14 max-w-xl mx-auto px-4 text-center">
          <div
            className="p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <p className="text-xs sm:text-sm text-white/85 font-medium">
              Hover to pause • Ready for everlasting blooms?
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E0C097] text-[#0A120D] text-xs font-semibold hover:bg-[#edd8be] transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
            >
              <span>Explore Blooms</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
