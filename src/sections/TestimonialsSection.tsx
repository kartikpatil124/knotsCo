import React from 'react';

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  avatar: string;
  quote: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Drashti Patel',
    location: 'Vesu, Surat',
    rating: 5,
    avatar: '/images/avatars/avatar-1.jpg',
    quote:
      'Visited the Knots N Co studio in Vesu and was completely charmed by their craft! Seeing their local artisan team work was inspiring. The bouquet looks sensational on my living room mantel and brings permanent sunshine into our home.',
  },
  {
    id: '2',
    name: 'Ananya Sharma',
    location: 'Bandra, Mumbai',
    rating: 5,
    avatar: '/images/avatars/avatar-2.jpg',
    quote:
      'I ordered sunflowers and lavender on WhatsApp from Knots N Co for my sister’s convocation. Safe dispatch from Surat to Mumbai — the flowers arrived in immaculate condition without a single crease! Absolutely breathtaking craftsmanship.',
  },
  {
    id: '3',
    name: 'Rohan Mehta',
    location: 'Indiranagar, Bengaluru',
    rating: 5,
    avatar: '/images/avatars/avatar-3.jpg',
    quote:
      'The custom anniversary gift box was beyond perfection. My partner was deeply touched by the handwritten note card and signature kraft packaging. Supporting authentic homegrown artisans has never felt so rewarding!',
  },
  {
    id: '4',
    name: 'Khushboo Shah',
    location: 'Navrangpura, Ahmedabad',
    rating: 5,
    avatar: '/images/avatars/avatar-4.jpg',
    quote:
      'The mini tulips and daisies look so cheerful next to my laptop! Everyone visiting my desk asks where I got them. Plus, being allergic to real pollen, this is the most thoughtful botanical joy I could ever ask for.',
  },
  {
    id: '5',
    name: 'Pooja Desai',
    location: 'Koregaon Park, Pune',
    rating: 5,
    avatar: '/images/avatars/avatar-1.jpg',
    quote:
      'Our peach and ivory wedding keepsake bouquet made our celebration so dreamy. It was so special knowing these handcrafted petals will stay just as vibrant on our 20th anniversary as they were today.',
  },
  {
    id: '6',
    name: 'Vikram Iyer',
    location: 'Alwarpet, Chennai',
    rating: 5,
    avatar: '/images/avatars/avatar-3.jpg',
    quote:
      'Ordered personalized pastel flower keychains as favors for my daughter’s birthday. The packaging, handwritten notes, and soft yarn stitches blew everyone away. Truly world-class handmade art.',
  },
];

export default function TestimonialsSection() {
  // Duplicate reviews array for a mathematically seamless, infinite scrolling loop
  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section className="relative w-full flex flex-col select-none overflow-hidden">
      {/* Top Brown Accent Frame */}
      <div className="w-full h-3 sm:h-4 md:h-5 bg-[#522509] shadow-xs" />

      {/* Main Showcase with Handcrafted Crochet Background and Fixed Position (Parallax) */}
      <div
        className="relative w-full py-16 sm:py-20 md:py-24 bg-cover bg-center bg-fixed overflow-hidden flex flex-col items-center justify-center min-h-[580px] sm:min-h-[640px]"
        style={{
          backgroundImage: "url('/images/crochet-reviews-bg.jpg')",
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Soft Contrast Overlay for Crisp Frosted Glass Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/50 backdrop-blur-[0.5px] pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal text-white tracking-wide drop-shadow-md">
            Enjoyed by Many
          </h2>
          {/* Elegant Underline */}
          <div className="h-[1.5px] bg-white/90 w-48 sm:w-64 md:w-80 mx-auto mt-2.5 mb-3 shadow-xs" />
          <p className="text-white text-xs sm:text-sm md:text-[15px] font-normal tracking-wide drop-shadow-sm max-w-2xl mx-auto px-2 opacity-95">
            Real Stories, Real Blooms, Real Love — Hear from Those Who Cherish Handcrafted Keepsakes
          </p>
        </div>

        {/* Infinite Auto-Scrolling Reviews Track (No buttons, smooth animation, pauses on hover) */}
        <div className="relative z-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="animate-marquee-smooth flex items-center gap-6 sm:gap-8 py-4 px-4 cursor-grab active:cursor-grabbing">
            {marqueeReviews.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="w-[320px] sm:w-[420px] md:w-[480px] shrink-0 bg-white/20 backdrop-blur-xl border border-white/40 rounded-[28px] sm:rounded-[36px] px-6 py-7 sm:px-8 sm:py-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)] text-white hover:bg-white/25 hover:border-white/60 hover:scale-[1.02] hover:shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-all duration-300"
              >
                {/* Top Row: Left (Name/Loc), Center (Avatar), Right (Rating) */}
                <div className="flex items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-5">
                  {/* Left Column: Reviewer Name & Location */}
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-serif text-base sm:text-xl font-normal text-white leading-tight truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-1 font-light truncate">
                      {item.location}
                    </p>
                  </div>

                  {/* Center Column: Circular Avatar */}
                  <div className="shrink-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white/80 shadow-md ring-2 ring-black/15"
                      loading="lazy"
                    />
                  </div>

                  {/* Right Column: 5 Stars & Rating Label */}
                  <div className="flex-1 text-right min-w-0">
                    <div className="flex items-center justify-end text-white text-sm sm:text-base tracking-widest gap-0.5">
                      ★★★★★
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 mt-1 font-light">
                      Rating
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Centered Testimonial Quote */}
                <div className="pt-3 border-t border-white/15">
                  <p className="text-white/95 text-xs sm:text-[13.5px] leading-relaxed text-center font-normal line-clamp-4">
                    "{item.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Pause Hint */}
        <p className="relative z-10 text-[11px] uppercase tracking-widest text-white/50 text-center mt-6 font-light">
          • Hover to pause & read •
        </p>
      </div>

      {/* Bottom Brown Accent Frame */}
      <div className="w-full h-3 sm:h-4 md:h-5 bg-[#522509] shadow-xs" />
    </section>
  );
}
