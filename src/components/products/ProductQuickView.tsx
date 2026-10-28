import { useState } from 'react';
import { X, Minus, Plus, Heart, ShoppingBag, Flower2 } from 'lucide-react';
import type { Product } from '../../data/types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice, cn } from '../../utils/helpers';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const { addItem, isInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor);
    showToast(`${product.name} added to bag`);
    setQuantity(1);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-end sm:items-center justify-center',
        'transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
    >
      {/* Overlay */}
      <div className={cn(
        'absolute inset-0 bg-overlay transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0'
      )} />

      {/* Panel */}
      <div
        className={cn(
          'relative w-full sm:max-w-lg bg-white sm:rounded-[var(--radius-xl)]',
          'max-h-[92vh] overflow-y-auto',
          'rounded-t-[var(--radius-xl)]',
          'transition-transform duration-350 ease-[var(--ease-out-expo)]',
          isOpen ? 'translate-y-0' : 'translate-y-full sm:translate-y-4 sm:scale-95'
        )}
      >
        {/* Drag indicator (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-charcoal/15 rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Close product details"
        >
          <X size={18} className="text-charcoal" />
        </button>

        {/* Product image */}
        <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden sm:rounded-t-[var(--radius-xl)]">
          {!imageError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full img-placeholder">
              <Flower2 size={48} className="text-sage opacity-50" />
            </div>
          )}

          {product.badge && (
            <div className={cn(
              'badge absolute top-4 left-4',
              product.badge === 'new' ? 'badge-new' : 'badge-bestseller'
            )}>
              {product.badge === 'new' ? 'New' : 'Best Seller'}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <p className="text-[11px] text-charcoal/45 uppercase tracking-[0.08em] font-medium mb-1">
            {product.category === 'bouquets' ? 'Crochet Bouquet' :
             product.category === 'flowers' ? 'Individual Flower' :
             product.category === 'keychains' ? 'Keychain' :
             product.category === 'gifts' ? 'Handmade Gift' : 'Custom Order'}
          </p>

          <h2 className="font-serif text-2xl text-charcoal font-medium leading-tight">
            {product.name}
          </h2>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-xl font-semibold text-forest">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-charcoal/35 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-4 text-[14px] text-charcoal/65 leading-relaxed">
            {product.description}
          </p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-5">
              <p className="text-[12px] font-medium text-charcoal/60 uppercase tracking-[0.06em] mb-2">
                Colour
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'px-3.5 py-2 rounded-full text-[13px] font-medium',
                      'border transition-all duration-200',
                      selectedColor === color
                        ? 'border-forest bg-forest/5 text-forest'
                        : 'border-border text-charcoal/60 hover:border-charcoal/25'
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-5">
            <p className="text-[12px] font-medium text-charcoal/60 uppercase tracking-[0.06em] mb-2">
              Quantity
            </p>
            <div className="inline-flex items-center border border-border rounded-[var(--radius-md)]">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center text-charcoal/50 hover:text-charcoal disabled:opacity-30 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center text-[14px] font-medium text-charcoal tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => Math.min(10, q + 1))}
                disabled={quantity >= 10}
                className="w-10 h-10 flex items-center justify-center text-charcoal/50 hover:text-charcoal disabled:opacity-30 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAddToCart}
              className={cn(
                'flex-1 py-3.5 rounded-full font-medium text-[14px]',
                'flex items-center justify-center gap-2',
                'transition-all duration-200 active:scale-[0.97]',
                inCart
                  ? 'bg-sage text-white'
                  : 'bg-forest text-white hover:bg-forest-light'
              )}
            >
              <ShoppingBag size={16} />
              {inCart ? 'Update Bag' : 'Add to Bag'}
            </button>
            <button
              onClick={() => {
                toggleWishlist(product.id);
                showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
              }}
              className={cn(
                'w-[52px] h-[52px] rounded-full border flex items-center justify-center',
                'transition-all duration-200 active:scale-95 shrink-0',
                wishlisted
                  ? 'border-rose bg-rose/5'
                  : 'border-border hover:border-charcoal/25'
              )}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                size={18}
                className={cn(
                  'transition-colors',
                  wishlisted ? 'fill-rose text-rose' : 'text-charcoal/40'
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
