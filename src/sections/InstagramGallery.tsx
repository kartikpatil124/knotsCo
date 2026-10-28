import { Instagram, Heart, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/site';

interface Post {
  id: string;
  image: string;
  likes: number;
  caption: string;
  tag: string;
}

const posts: Post[] = [
  {
    id: '1',
    image: '/images/products/spring-meadow.jpg',
    likes: 428,
    caption: 'Spring wild blooms that will stay forever lively on your coffee table 💐✨',
    tag: '#KnotsNCo',
  },
  {
    id: '2',
    image: '/images/products/mini-tulip.jpg',
    likes: 512,
    caption: 'A desk without a bloom is missing a little joy. Mini tulips freshly crocheted at our Vesu studio 🌷',
    tag: '#KnotsncoStudio',
  },
  {
    id: '3',
    image: '/images/products/anniversary-set.jpg',
    likes: 689,
    caption: 'Anniversary gift set packed with love, handwritten cards, and lasting memories 💌',
    tag: '#SuratCrochet',
  },
  {
    id: '4',
    image: '/images/products/daisy-keychain.jpg',
    likes: 345,
    caption: 'Little daisies to carry wherever your keys wander 🌼🔑',
    tag: '#HandmadeKeychains',
  },
  {
    id: '5',
    image: '/images/products/sunflower-gift.jpg',
    likes: 562,
    caption: 'A sunny bloom ready to brighten someone special’s morning 🌻☀️',
    tag: '#KnotsAndCo',
  },
  {
    id: '6',
    image: '/images/products/lavender-bunch.jpg',
    likes: 431,
    caption: 'Lavender stems tied in satin ribbon. Calming aesthetics for quiet corners 🪻',
    tag: '#EverlastingBouquet',
  },
];

export default function InstagramGallery() {
  return (
    <section className="py-16 sm:py-20 bg-ivory">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-[11px] font-semibold tracking-widest uppercase mb-2">
              <Instagram size={13} />
              <span>Follow Along</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-charcoal">
              Blooms in the Wild
            </h2>
          </div>

          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-forest hover:text-forest-light transition-colors group"
          >
            <span>@knotsnco._</span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map(post => (
            <a
              key={post.id}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-[var(--radius-lg)] overflow-hidden bg-cream border border-border block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white text-center">
                <Instagram size={22} className="mb-2" />
                <div className="flex items-center gap-1 text-[12px] font-semibold mb-1">
                  <Heart size={13} className="fill-white" />
                  <span>{post.likes}</span>
                </div>
                <span className="text-[10px] text-white/80 font-light line-clamp-1">
                  {post.tag}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
