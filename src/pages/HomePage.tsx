import { useNavigate } from 'react-router-dom';
import HeroSection from '../sections/HeroSection';
import ValuePropsSection from '../sections/ValuePropsSection';
import CategorySection from '../sections/CategorySection';
import ProductGridSection from '../sections/ProductGridSection';
import HappyCustomersSection from '../sections/HappyCustomersSection';
import WhyCrochetSection from '../sections/WhyCrochetSection';
import StorySection from '../sections/StorySection';
import ArtisanGallerySection from '../sections/ArtisanGallerySection';
import TestimonialsSection from '../sections/TestimonialsSection';
import FaqSection from '../sections/FaqSection';
import InstagramGallery from '../sections/InstagramGallery';
import NewsletterSection from '../sections/NewsletterSection';
import type { Product, CategoryId } from '../data/types';

interface HomePageProps {
  onQuickView: (product: Product) => void;
  selectedCategory: CategoryId | 'all';
  onCategoryChange: (cat: CategoryId | 'all') => void;
}

export default function HomePage({
  onQuickView,
  selectedCategory,
  onCategoryChange,
}: HomePageProps) {
  const navigate = useNavigate();

  const handleSelectCategory = (catId: CategoryId) => {
    onCategoryChange(catId);
    navigate(`/shop?category=${catId}`);
  };

  return (
    <div>
      {/* 1. Cinematic Hero Section */}
      <HeroSection
        onExplore={() => navigate('/shop')}
        onStory={() => navigate('/story')}
      />

      {/* 2. Value Propositions Bar */}
      <ValuePropsSection />

      {/* 3. Category Showcase Grid */}
      <CategorySection onSelectCategory={handleSelectCategory} />

      {/* 4. Complete Botanical Shop / Products Grid */}
      <ProductGridSection
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        onQuickView={onQuickView}
      />

      {/* 5. Happy Customers of Customisation: 3D DriftWall Showcase */}
      <HappyCustomersSection />

      {/* 6. Why Everlasting Crochet? Comparison */}
      <WhyCrochetSection />

      {/* 7. Brand Story & Artisanal Craft */}
      <StorySection onExplore={() => navigate('/shop')} />

      {/* 7.5. Interactive WebGL FlexCarousel Gallery */}
      <ArtisanGallerySection />

      {/* 8. Loved By Our Community: Customer Reviews */}
      <TestimonialsSection />

      {/* 9. Care Guide & FAQs */}
      <FaqSection />

      {/* 10. Instagram Community Gallery */}
      <InstagramGallery />

      {/* 11. VIP Bloom Club Newsletter */}
      <NewsletterSection />
    </div>
  );
}
