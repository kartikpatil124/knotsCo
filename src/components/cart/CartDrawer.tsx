import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice, getWhatsAppOrderLink, cn } from '../../utils/helpers';
import { siteConfig } from '../../config/site';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeCart();
  };

  const handleEnquiry = () => {
    const orderItems = items.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));
    window.open(getWhatsAppOrderLink(orderItems, subtotal), '_blank');
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50',
        'transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
    >
      {/* Overlay */}
      <div className={cn(
        'absolute inset-0 bg-overlay transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0'
      )} />

      {/* Drawer */}
      <div
        className={cn(
          'absolute top-0 right-0 h-full w-full sm:max-w-md',
          'bg-white flex flex-col',
          'transition-transform duration-350 ease-[var(--ease-out-expo)]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-forest" />
            <h2 className="font-serif text-lg font-medium text-charcoal">Your Bag</h2>
            {totalItems > 0 && (
              <span className="text-[12px] text-charcoal/45 font-medium">
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-charcoal/5 transition-colors"
            aria-label="Close shopping bag"
          >
            <X size={18} className="text-charcoal" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mb-4">
                <ShoppingBag size={28} className="text-sage" />
              </div>
              <p className="font-serif text-lg text-charcoal font-medium mb-1">
                Your bag is empty
              </p>
              <p className="text-[13px] text-charcoal/50 mb-6">
                Add something beautiful to get started
              </p>
              <button
                onClick={closeCart}
                className="btn btn-secondary text-[13px]"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-5 space-y-4">
              {items.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 animate-fade-in"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-[var(--radius-md)] overflow-hidden shrink-0 bg-cream">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-medium text-charcoal leading-snug truncate">
                      {item.product.name}
                    </h3>
                    {item.selectedColor && (
                      <p className="text-[11px] text-charcoal/45 mt-0.5">{item.selectedColor}</p>
                    )}
                    <p className="text-[14px] font-semibold text-forest mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center border border-border rounded-[var(--radius-sm)]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-charcoal/40 hover:text-charcoal transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center text-[13px] font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                          className="w-8 h-8 flex items-center justify-center text-charcoal/40 hover:text-charcoal disabled:opacity-30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-charcoal/30 hover:text-rose hover:bg-rose/5 transition-all"
                        aria-label={`Remove ${item.product.name}`}
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
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-4 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-charcoal/60">Subtotal</span>
              <span className="text-lg font-semibold text-charcoal">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[11px] text-charcoal/40">
              Shipping calculated at checkout
            </p>

            {/* CTA */}
            {siteConfig.features.cartMode === 'enquiry' ? (
              <button
                onClick={handleEnquiry}
                className="w-full py-3.5 rounded-full bg-forest text-white font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-forest-light transition-colors active:scale-[0.97]"
              >
                <MessageCircle size={16} />
                Enquire on WhatsApp
              </button>
            ) : (
              <button
                className="w-full py-3.5 rounded-full bg-forest text-white font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-forest-light transition-colors active:scale-[0.97]"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>
            )}

            <button
              onClick={closeCart}
              className="w-full py-2.5 text-[13px] text-charcoal/50 hover:text-charcoal font-medium transition-colors"
            >
              Continue Shopping
            </button>

            <p className="text-[10px] text-center text-charcoal/30">
              This is a demo storefront. No real transactions will be processed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
