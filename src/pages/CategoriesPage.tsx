import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import CategorySection from '../sections/CategorySection';
import NewsletterSection from '../sections/NewsletterSection';
import type { CategoryId } from '../data/types';

interface CategoriesPageProps {
  onCategoryChange: (cat: CategoryId | 'all') => void;
}

export default function CategoriesPage({ onCategoryChange }: CategoriesPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCategory = (catId: CategoryId) => {
    onCategoryChange(catId);
    navigate(`/shop?category=${catId}`);
  };

  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-ivory">
      {/* Page Header */}
      <div className="bg-cream/50 py-10 sm:py-14 border-b border-border text-center">
        <div className="section-container">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-[11px] font-semibold tracking-widest uppercase mb-3">
            <Sparkles size={12} />
            <span>Handmade Collections</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-charcoal">
            Browse All Categories
          </h1>
          <p className="mt-3 text-[14px] sm:text-[15px] text-charcoal/65 max-w-lg mx-auto">
            Find the perfect handcrafted piece, from grand bouquets to charming miniature keychains.
          </p>
        </div>
      </div>

      {/* Main Categories Section */}
      <CategorySection onSelectCategory={handleSelectCategory} />

      {/* Detailed Categories Breakdown */}
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {categories.map(cat => {
            const count = products.filter(p => p.category === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className="p-6 sm:p-8 rounded-[var(--radius-xl)] bg-white border border-border hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{cat.icon}</span>
                    <span className="text-[12px] font-semibold px-3 py-1 rounded-full bg-forest/10 text-forest">
                      {count} {count === 1 ? 'Design' : 'Designs'}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-charcoal group-hover:text-forest transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-[14px] text-charcoal/65 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-forest text-[13px] font-semibold">
                  <span>Explore Collection</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
}
