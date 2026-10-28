import { ArrowUpRight } from 'lucide-react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import type { CategoryId } from '../data/types';

interface CategorySectionProps {
  onSelectCategory: (categoryId: CategoryId) => void;
}

export default function CategorySection({ onSelectCategory }: CategorySectionProps) {
  // Count items per category
  const getProductCount = (id: CategoryId) => {
    return products.filter(p => p.category === id).length;
  };

  return (
    <section id="categories" className="py-16 sm:py-24 bg-cream/40">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-forest mb-2">
              Curated Collections
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-charcoal">
              Explore by Category
            </h2>
          </div>
          <p className="text-[13px] sm:text-[14px] text-charcoal/60 max-w-sm">
            From single stem roses to grand custom arrangements, discover blooms crafted to brighten every moment.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {categories.map((cat, index) => {
            const count = getProductCount(cat.id);
            const isFeatured = index === 0;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative overflow-hidden rounded-[var(--radius-xl)] bg-white border border-border cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  isFeatured ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                {/* Image */}
                <div className="aspect-[4/5] w-full overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent transition-opacity group-hover:from-charcoal/80" />

                  {/* Icon badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-sm shadow-xs">
                    {cat.icon}
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white text-transparent group-hover:text-forest flex items-center justify-center transition-all duration-300 shadow-xs">
                    <ArrowUpRight size={16} />
                  </div>

                  {/* Card Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 text-white">
                    <h3 className="font-serif text-[15px] sm:text-[17px] font-medium leading-snug group-hover:underline underline-offset-4">
                      {cat.shortName}
                    </h3>
                    <p className="text-[11px] text-white/80 mt-0.5 font-light">
                      {count} {count === 1 ? 'Design' : 'Designs'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
