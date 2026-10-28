import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import BubbleMenu, { type MenuItem } from '../navigation/BubbleMenu';
import { cn } from '../../utils/helpers';

interface HeaderProps {
  onSearch: () => void;
  onWishlist: () => void;
}

export default function Header({ onSearch, onWishlist }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === '/';
  const isSolid = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'Categories', path: '/categories' },
    { label: 'Our Story', path: '/story' },
    { label: 'Gifting', path: '/gifting' },
    { label: 'Contact', path: '/contact' },
  ];

  const bubbleMenuItems: MenuItem[] = [
    {
      label: 'home',
      href: '/',
      ariaLabel: 'Return to home',
      rotation: -6,
      hoverStyles: { bgColor: '#294439', textColor: '#ffffff' },
    },
    {
      label: 'shop',
      href: '/shop',
      ariaLabel: 'Shop all blooms',
      rotation: 3,
      hoverStyles: { bgColor: '#D9AAA3', textColor: '#294439' },
    },
    {
      label: 'categories',
      href: '/categories',
      ariaLabel: 'Browse categories',
      rotation: -5,
      hoverStyles: { bgColor: '#A5B5A0', textColor: '#ffffff' },
    },
    {
      label: 'story',
      href: '/story',
      ariaLabel: 'Our story',
      rotation: 6,
      hoverStyles: { bgColor: '#BD745C', textColor: '#ffffff' },
    },
    {
      label: 'gifting',
      href: '/gifting',
      ariaLabel: 'Gifting studio',
      rotation: -4,
      hoverStyles: { bgColor: '#A5B5A0', textColor: '#ffffff' },
    },
    {
      label: 'contact',
      href: '/contact',
      ariaLabel: 'Contact Knots N Co',
      rotation: 5,
      hoverStyles: { bgColor: '#294439', textColor: '#ffffff' },
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Floating Header (Matching Goldsmiths Jewels reference image) */}
      <div className="fixed top-3.5 left-0 right-0 z-40 px-3.5 flex items-center justify-between md:hidden pointer-events-none">
        {/* Left: Brand Pill (Goldsmiths style: Luxury serif + Gold subtitle) */}
        <button
          onClick={() => handleNavigate('/')}
          className="pointer-events-auto flex flex-col items-center justify-center px-5 py-2.5 rounded-full bg-[#F5F3EF] text-charcoal shadow-md border border-white/70 active:scale-95 transition-all duration-200"
          aria-label="Knots N Co Home"
        >
          <span className="font-serif font-bold text-[13px] tracking-[0.2em] uppercase text-charcoal leading-none">
            KNOTS N CO
          </span>
          <span className="text-[8px] font-sans font-bold tracking-[0.3em] uppercase text-[#B89758] leading-none mt-1">
            BOTANICALS
          </span>
        </button>

        {/* Right: Actions Pill (Search, Wishlist, Bag) */}
        <div className="pointer-events-auto flex items-center gap-3.5 px-4 py-2.5 rounded-full bg-[#F5F3EF] text-charcoal shadow-md border border-white/70">
          <button
            onClick={onSearch}
            className="text-charcoal hover:text-forest transition-colors flex items-center justify-center p-0.5"
            aria-label="Search products"
          >
            <Search size={17} strokeWidth={2} />
          </button>

          <button
            onClick={onWishlist}
            className="relative text-charcoal hover:text-forest transition-colors flex items-center justify-center p-0.5"
            aria-label={`Wishlist (${wishlistCount} items)`}
          >
            <Heart size={17} strokeWidth={2} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-rose text-white text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={openCart}
            className="relative text-charcoal hover:text-forest transition-colors flex items-center justify-center p-0.5"
            aria-label={`Shopping bag (${totalItems} items)`}
          >
            <ShoppingBag size={17} strokeWidth={2} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-forest text-white text-[9px] font-bold flex items-center justify-center animate-scale-in">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Floating Circular Menu Button at the Bottom Left (Matching reference image) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-5 left-4 z-40 md:hidden w-12 h-12 rounded-full bg-[#F5F3EF] text-charcoal shadow-xl border border-white/80 flex flex-col items-center justify-center gap-[3.5px] cursor-pointer active:scale-90 transition-all duration-200 hover:shadow-2xl"
        aria-label="Open navigation menu"
      >
        <span className="w-4.5 h-[2px] bg-charcoal rounded-full" />
        <span className="w-4.5 h-[2px] bg-charcoal rounded-full" />
        <span className="w-3.5 h-[2px] bg-charcoal rounded-full" />
      </button>

      {/* Desktop Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 hidden md:block',
          'transition-all duration-300',
          isSolid
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavigate('/')}
                className="flex items-center gap-2 group text-left"
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                  isSolid ? 'bg-forest/10 text-forest' : 'bg-white/15 text-white backdrop-blur-xs'
                )}>
                  <span className="text-sm">🌸</span>
                </div>
                <span className={cn(
                  'font-serif text-lg sm:text-xl font-semibold tracking-tight transition-colors',
                  isSolid ? 'text-forest' : 'text-white'
                )}>
                  {siteConfig.brand.name}
                </span>
              </button>
            </div>

            {/* Center: Nav */}
            <nav className="flex items-center gap-1.5" aria-label="Main navigation">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavigate(link.path)}
                    className={cn(
                      'px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200',
                      isSolid
                        ? isActive
                          ? 'bg-forest text-white'
                          : 'text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5'
                        : isActive
                          ? 'bg-white text-charcoal'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right: Actions + Pill CTA */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={onSearch}
                className={cn(
                  'btn-icon flex items-center justify-center transition-colors',
                  isSolid ? 'text-charcoal/70 hover:text-charcoal' : 'text-white/80 hover:text-white'
                )}
                aria-label="Search products"
              >
                <Search size={18} />
              </button>

              <button
                onClick={onWishlist}
                className={cn(
                  'btn-icon relative flex items-center justify-center transition-colors',
                  isSolid ? 'text-charcoal/70 hover:text-charcoal' : 'text-white/80 hover:text-white'
                )}
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] rounded-full bg-rose text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={openCart}
                className={cn(
                  'btn-icon relative flex items-center justify-center transition-colors',
                  isSolid ? 'text-charcoal/70 hover:text-charcoal' : 'text-white/80 hover:text-white'
                )}
                aria-label={`Shopping bag (${totalItems} items)`}
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] rounded-full bg-forest text-white text-[9px] font-bold flex items-center justify-center animate-scale-in">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Custom Order Pill CTA */}
              <button
                onClick={() => handleNavigate('/gifting')}
                className={cn(
                  'inline-flex items-center px-4 py-2 rounded-full text-[12px] font-medium tracking-wide transition-all duration-200 border ml-1',
                  isSolid
                    ? 'border-forest text-forest hover:bg-forest hover:text-white'
                    : 'border-white/40 text-white hover:bg-white hover:text-charcoal backdrop-blur-xs'
                )}
              >
                Custom Order
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile BubbleMenu from React Bits (Scoped to mobile & tablet display devices) */}
      <div className="md:hidden">
        <BubbleMenu
          items={bubbleMenuItems}
          isOpenControlled={menuOpen}
          onCloseControlled={() => setMenuOpen(false)}
          onItemSelect={(item) => handleNavigate(item.href)}
          menuBg="#ffffff"
          menuContentColor="#294439"
          useFixedPosition={true}
          animationEase="back.out(1.5)"
          animationDuration={0.45}
          staggerDelay={0.08}
        />
      </div>
    </>
  );
}
