import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGridSection from '../sections/ProductGridSection';
import ValuePropsSection from '../sections/ValuePropsSection';
import NewsletterSection from '../sections/NewsletterSection';
import type { Product, CategoryId } from '../data/types';

interface ShopPageProps {
  onQuickView: (product: Product) => void;
  selectedCategory: CategoryId | 'all';
  onCategoryChange: (cat: CategoryId | 'all') => void;
}

export default function ShopPage({
  onQuickView,
  selectedCategory,
  onCategoryChange,
}: ShopPageProps) {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category') as CategoryId | null;
    if (cat && ['bouquets', 'flowers', 'keychains', 'gifts', 'custom'].includes(cat)) {
      onCategoryChange(cat);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, onCategoryChange]);

  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-ivory">
      {/* Page Header */}
      <div className="bg-cream/50 py-10 sm:py-14 border-b border-border text-center">
        <div className="section-container">
          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-forest mb-2">
            Knots N Co Atelier
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-charcoal">
            The Botanical Shop
          </h1>
          <p className="mt-3 text-[14px] sm:text-[15px] text-charcoal/65 max-w-lg mx-auto">
            Explore our complete collection of handmade crochet flower bouquets, single stems, plushies, and gift hampers.
          </p>
        </div>
      </div>

      {/* Main Shop Grid */}
      <ProductGridSection
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        onQuickView={onQuickView}
      />

      {/* Value props */}
      <ValuePropsSection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
