import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail, MapPin, Heart } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { categories } from '../../data/categories';
import { getWhatsAppLink } from '../../utils/helpers';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest text-white/80">
      <div className="section-container py-12 sm:py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link to="/" onClick={scrollToTop} className="font-serif text-xl font-semibold text-white block mb-3">
              {siteConfig.brand.name}
            </Link>
            <p className="text-[13px] leading-relaxed text-white/60 max-w-xs">
              {siteConfig.brand.shortDescription}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Pages */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.1em] font-semibold text-white/40 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" onClick={scrollToTop} className="text-[13px] text-white/65 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={scrollToTop} className="text-[13px] text-white/65 hover:text-white transition-colors">
                  Shop All Blooms
                </Link>
              </li>
              <li>
                <Link to="/categories" onClick={scrollToTop} className="text-[13px] text-white/65 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/story" onClick={scrollToTop} className="text-[13px] text-white/65 hover:text-white transition-colors">
                  Our Story & Studio
                </Link>
              </li>
              <li>
                <Link to="/gifting" onClick={scrollToTop} className="text-[13px] text-white/65 hover:text-white transition-colors">
                  Bespoke Gifting Studio
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="text-[13px] text-white/65 hover:text-white transition-colors">
                  Contact & Studio Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.1em] font-semibold text-white/40 mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.id}`}
                    onClick={scrollToTop}
                    className="text-[13px] text-white/65 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Contact */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.1em] font-semibold text-white/40 mb-4">
              Visit Studio
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="shrink-0 mt-0.5 text-white/40" />
                <span className="text-[13px] text-white/65 leading-relaxed">
                  {siteConfig.contact.address}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle size={15} className="shrink-0 mt-0.5 text-white/40" />
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-white/65 hover:text-white transition-colors"
                >
                  WhatsApp: {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="shrink-0 mt-0.5 text-white/40" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-[13px] text-white/65 hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-white/35">
              © {new Date().getFullYear()} {siteConfig.brand.name}. Handcrafted with love in Surat, Gujarat.
            </p>
            <p className="text-[11px] text-white/35 flex items-center gap-1">
              Made with <Heart size={10} className="fill-rose text-rose" /> by Gujarat Women Artisans
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
