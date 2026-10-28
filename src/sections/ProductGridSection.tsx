import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SlidersHorizontal, Heart, RotateCcw, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import type { Product, CategoryId } from '../data/types';
import ProductCard from '../components/products/ProductCard';
import { useWishlist } from '../context/WishlistContext';

interface ProductGridSectionProps {
  selectedCategory: CategoryId | 'all';
  onCategoryChange: (category: CategoryId | 'all') => void;
  onQuickView: (product: Product) => void;
}

export default function ProductGridSection({
  selectedCategory,
  onCategoryChange,
  onQuickView,
}: ProductGridSectionProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isShopPage = location.pathname === '/shop';

  const { wishlist, wishlistCount } = useWishlist();
  const [showOnlyWishlist, setShowOnlyWishlist] = useState(false);

  // Filter products by category and wishlist
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Wishlist filter
    if (showOnlyWishlist) {
      list = list.filter(p => wishlist.includes(p.id));
    }

    return list;
  }, [selectedCategory, showOnlyWishlist, wishlist]);

  const handleResetFilters = () => {
    onCategoryChange('all');
    setShowOnlyWishlist(false);
  };

  return (
    <section id="shop" className="py-16 sm:py-24 bg-ivory scroll-mt-12">
      <div className="section-container">
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-forest mb-2">
            The Botanical Collection
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal">
            Lovingly Handcrafted
          </h2>
          <p className="mt-3 text-[14px] sm:text-[15px] text-charcoal/65">
            Every stitch tells a story. Explore our complete gallery of flowers, bouquets, keychains, and gift boxes.
          </p>
        </div>

        {/* Filter Bar (Category Tabs only) */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
            <button
              onClick={() => { onCategoryChange('all'); setShowOnlyWishlist(false); }}
              className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === 'all' && !showOnlyWishlist
                  ? 'bg-forest text-white shadow-xs'
                  : 'bg-white text-charcoal/70 border border-border hover:border-charcoal/30'
              }`}
            >
              All Designs ({products.length})
            </button>

            {categories.map(cat => {
              const count = products.filter(p => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => { onCategoryChange(cat.id); setShowOnlyWishlist(false); }}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    selectedCategory === cat.id && !showOnlyWishlist
                      ? 'bg-forest text-white shadow-xs'
                      : 'bg-white text-charcoal/70 border border-border hover:border-charcoal/30'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.shortName}</span>
                  <span className="text-[11px] opacity-60">({count})</span>
                </button>
              );
            })}

            {/* Wishlist quick filter */}
            <button
              onClick={() => setShowOnlyWishlist(!showOnlyWishlist)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                showOnlyWishlist
                  ? 'bg-rose text-white shadow-xs'
                  : 'bg-white text-charcoal/70 border border-border hover:border-rose/40'
              }`}
            >
              <Heart size={14} className={showOnlyWishlist ? 'fill-white' : 'text-rose'} />
              <span>Saved</span>
              {wishlistCount > 0 && <span className="text-[11px] font-bold">({wishlistCount})</span>}
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/70 rounded-[var(--radius-xl)] border border-border">
            <div className="w-16 h-16 rounded-full bg-cream mx-auto flex items-center justify-center text-forest mb-4">
              <SlidersHorizontal size={24} />
            </div>
            <h3 className="font-serif text-xl font-medium text-charcoal mb-1">
              No matching flowers found
            </h3>
            <p className="text-[13px] text-charcoal/60 max-w-sm mx-auto mb-6">
              We couldn't find any items matching your active filters. Try resetting to view all available designs.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn btn-primary text-[13px] inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw size={15} />
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}

        {/* See More on Shop Page Button */}
        {!isShopPage && (
          <div className="mt-12 sm:mt-14 text-center">
            <button
              onClick={() => {
                navigate('/shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-forest text-white text-sm font-semibold hover:bg-forest-light transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>See More on Shop Page</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
