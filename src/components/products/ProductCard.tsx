import { useState, useRef, useEffect } from 'react';
import { Heart, Flower2, RotateCw, Eye, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../../data/types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice, cn } from '../../utils/helpers';
import FlipCard from '../ui/FlipCard';

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    showToast(`${product.name} added to bag`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const delay = Math.min(index * 0.05, 0.3);

  // FRONT FACE: Only product image + badges + flip hint
  const FrontFace = (
    <div className="relative w-full h-full overflow-hidden rounded-[20px] bg-cream select-none">
      {/* Product Image */}
      {!imageError ? (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300 pointer-events-none',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-cream/70">
          <Flower2 size={36} className="text-sage opacity-50" />
        </div>
      )}

      {/* Shimmer loading */}
      {!imageLoaded && !imageError && (
        <div
          className="absolute inset-0 bg-cream"
          style={{
            background: 'linear-gradient(90deg, #F2EADF 0%, #FBF8F3 50%, #F2EADF 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}

      {/* Badge (New / Best Seller) */}
      {product.badge && (
        <div
          className={cn(
            'badge absolute top-2.5 left-2.5 z-10 pointer-events-none shadow-xs',
            product.badge === 'new' ? 'badge-new' : 'badge-bestseller'
          )}
        >
          {product.badge === 'new' ? 'New' : 'Best Seller'}
        </div>
      )}

      {/* Wishlist Button (data-no-flip prevents flip on click) */}
      <button
        onClick={handleWishlist}
        data-no-flip
        className={cn(
          'absolute top-2.5 right-2.5 z-10 w-8.5 h-8.5 rounded-full',
          'flex items-center justify-center cursor-pointer',
          'transition-all duration-200',
          'bg-white/85 backdrop-blur-md shadow-xs',
          'hover:bg-white hover:scale-110 active:scale-90'
        )}
        aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      >
        <Heart
          size={15}
          className={cn(
            'transition-all duration-200',
            wishlisted ? 'fill-rose text-rose' : 'text-charcoal/60'
          )}
        />
      </button>

      {/* Subtle Flip hint pill */}
      <div className="absolute bottom-2.5 right-2.5 z-10 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-medium flex items-center gap-1 pointer-events-none shadow-xs">
        <RotateCw size={10} />
        <span>Flip</span>
      </div>
    </div>
  );

  // BACK FACE: Short details like name, category, price, and view detail
  const BackFace = (
    <div className="relative w-full h-full p-3.5 sm:p-4 flex flex-col justify-between bg-[#FCFAF7] border border-border/80 rounded-[20px] text-charcoal select-none">
      {/* Top Header: Category & Flip icon */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B89758]">
          {product.category === 'bouquets' ? '💐 Bouquet' :
           product.category === 'flowers' ? '🌸 Flower' :
           product.category === 'keychains' ? '🔑 Keychain' :
           product.category === 'gifts' ? '🎁 Gift' : '✨ Custom'}
        </span>
        <span className="p-1 text-charcoal/40 hover:text-charcoal transition-colors">
          <RotateCw size={12} />
        </span>
      </div>

      {/* Middle: Title, Price, Description, Color Badges */}
      <div className="my-auto py-1">
        <h3 className="font-serif text-[14.5px] sm:text-[16px] font-semibold text-charcoal leading-snug line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-[15.5px] sm:text-[16.5px] font-bold text-forest">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[11.5px] text-charcoal/40 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap mt-2">
            {product.colors.slice(0, 3).map(color => (
              <span
                key={color}
                className="text-[9px] sm:text-[9.5px] px-2 py-0.5 rounded-full bg-cream text-charcoal/70 border border-border/60"
              >
                {color}
              </span>
            ))}
            {product.colors.length > 3 && (
              <span className="text-[9px] text-charcoal/50">+{product.colors.length - 3}</span>
            )}
          </div>
        )}

        <p className="text-[11px] sm:text-[11.5px] text-charcoal/65 leading-relaxed line-clamp-2 mt-2">
          {product.description}
        </p>
      </div>

      {/* Bottom Actions: View Details & Add to Bag */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-border/50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          data-no-flip
          className="w-full py-1.5 rounded-xl text-[11px] sm:text-[11.5px] font-medium border border-border hover:border-charcoal/30 bg-white text-charcoal flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs"
        >
          <Eye size={12} />
          <span>View Details</span>
        </button>

        <button
          onClick={handleAddToCart}
          data-no-flip
          className={cn(
            'w-full py-2 rounded-xl text-[11.5px] sm:text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs',
            inCart
              ? 'bg-sage text-white'
              : 'bg-forest text-white hover:bg-forest-light'
          )}
        >
          {inCart ? (
            <>
              <Check size={13} />
              <span>In Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag size={13} />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative w-full h-[310px] xs:h-[320px] sm:h-[350px] md:h-[380px]',
        'transition-all duration-500 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: isVisible ? `${delay}s` : '0s' }}
    >
      <FlipCard
        front={FrontFace}
        back={BackFace}
        axis="y"
        flipOnClick={true}
        draggable={true}
        tilt={true}
        tiltMax={10}
        glare={true}
        glareOpacity={0.18}
        hoverScale={1.02}
        perspective={1000}
        stiffness={180}
        damping={22}
        width="100%"
        height="100%"
        radius={20}
        background="#ffffff"
        color="#292A27"
        shadow={true}
        shadowColor="#000000"
        shadowOpacity={0.12}
        ariaLabel={product.name}
        className="w-full h-full"
      />
    </div>
  );
}
