import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { products } from '../../data/products';
import { formatPrice, cn } from '../../utils/helpers';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView: (product: any) => void;
}

export default function WishlistDrawer({ isOpen, onClose, onQuickView }: WishlistDrawerProps) {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveToBag = (product: any) => {
    addItem(product);
    removeFromWishlist(product.id);
    showToast(`${product.name} moved to bag!`);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Your Wishlist"
    >
      {/* Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-overlay transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Drawer */}
      <div
        className={cn(
          'absolute top-0 right-0 h-full w-full sm:max-w-md bg-white flex flex-col',
          'transition-transform duration-350 ease-[var(--ease-out-expo)]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <Heart size={20} className="text-rose fill-rose" />
            <h2 className="font-serif text-lg font-medium text-charcoal">Your Saved Blooms</h2>
            {wishlistedProducts.length > 0 && (
              <span className="text-[12px] text-charcoal/45 font-medium">
                ({wishlistedProducts.length})
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-charcoal/5 transition-colors"
            aria-label="Close wishlist"
          >
            <X size={18} className="text-charcoal" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {wishlistedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-rose/10 flex items-center justify-center mb-4">
                <Heart size={28} className="text-rose" />
              </div>
              <p className="font-serif text-lg text-charcoal font-medium mb-1">
                Your wishlist is empty
              </p>
              <p className="text-[13px] text-charcoal/50 mb-6">
                Tap the heart on any blossom to save it for later
              </p>
              <button
                onClick={onClose}
                className="btn btn-secondary text-[13px]"
              >
                Browse Flowers
              </button>
            </div>
          ) : (
            <div className="p-5 space-y-4">
              {wishlistedProducts.map(product => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-[var(--radius-lg)] bg-ivory/50 border border-border/70 animate-fade-in"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => { onQuickView(product); onClose(); }}
                    className="w-20 h-24 rounded-[var(--radius-md)] overflow-hidden shrink-0 bg-cream cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => { onQuickView(product); onClose(); }}
                        className="text-[13px] font-medium text-charcoal leading-snug truncate cursor-pointer hover:underline"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[14px] font-semibold text-forest mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-2 mt-2">
                      <button
                        onClick={() => handleMoveToBag(product)}
                        className="btn px-3 py-1.5 text-[12px] bg-forest text-white hover:bg-forest-light inline-flex items-center gap-1.5"
                      >
                        <ShoppingBag size={13} />
                        Move to Bag
                      </button>

                      <button
                        onClick={() => {
                          removeFromWishlist(product.id);
                          showToast('Removed from wishlist');
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-charcoal/30 hover:text-rose hover:bg-rose/5 transition-all"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="border-t border-border p-4 bg-white flex items-center justify-between">
            <button
              onClick={() => {
                clearWishlist();
                showToast('Wishlist cleared');
              }}
              className="text-[12px] text-charcoal/50 hover:text-charcoal font-medium underline"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="btn btn-secondary text-[12px] px-4 py-2"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
