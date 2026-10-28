import { useState, useRef, useEffect } from 'react';
import { Search, X, Flower2 } from 'lucide-react';
import { products } from '../../data/products';
import { formatPrice, cn } from '../../utils/helpers';
import type { Product } from '../../data/types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onProductSelect: (product: Product) => void;
}

export default function SearchOverlay({ isOpen, onClose, onProductSelect }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const results = query.trim().length > 0
    ? products.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags?.some(t => t.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div
      className={cn(
        'fixed inset-0 z-50',
        'transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-overlay transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          'relative bg-white w-full max-h-[85vh] overflow-hidden flex flex-col',
          'transition-transform duration-300 ease-[var(--ease-out-expo)]',
          isOpen ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search size={20} className="text-charcoal/40 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search flowers, bouquets, gifts..."
            className="flex-1 text-[16px] text-charcoal placeholder:text-charcoal/30 outline-none bg-transparent"
            aria-label="Search products"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="w-7 h-7 rounded-full bg-charcoal/5 flex items-center justify-center shrink-0"
              aria-label="Clear search"
            >
              <X size={14} className="text-charcoal/50" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[13px] font-medium text-charcoal/50 hover:text-charcoal shrink-0"
          >
            Cancel
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {query.trim().length === 0 ? (
            <div className="p-8 text-center">
              <Flower2 size={28} className="text-sage/40 mx-auto mb-3" />
              <p className="text-[13px] text-charcoal/40">
                Start typing to search products
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center">
              <Search size={28} className="text-charcoal/15 mx-auto mb-3" />
              <p className="text-[14px] font-medium text-charcoal/50 mb-1">
                No results found
              </p>
              <p className="text-[12px] text-charcoal/35">
                Try searching for "bouquet", "rose", or "keychain"
              </p>
            </div>
          ) : (
            <div className="py-2">
              <p className="px-5 py-2 text-[11px] uppercase tracking-[0.08em] text-charcoal/35 font-medium">
                {results.length} {results.length === 1 ? 'result' : 'results'}
              </p>
              {results.map(product => (
                <button
                  key={product.id}
                  onClick={() => {
                    onProductSelect(product);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3.5 px-5 py-3 hover:bg-cream transition-colors text-left"
                >
                  <div className="w-14 h-14 rounded-[var(--radius-md)] overflow-hidden bg-cream shrink-0">
                    <img
                      src={product.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-charcoal truncate">
                      {product.name}
                    </p>
                    <p className="text-[12px] text-charcoal/40 capitalize">{product.category}</p>
                    <p className="text-[13px] font-semibold text-forest mt-0.5">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
