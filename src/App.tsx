import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CategoriesPage from './pages/CategoriesPage';
import StoryPage from './pages/StoryPage';
import GiftingPage from './pages/GiftingPage';
import ContactPage from './pages/ContactPage';
import CartDrawer from './components/cart/CartDrawer';
import WishlistDrawer from './components/cart/WishlistDrawer';
import ProductQuickView from './components/products/ProductQuickView';
import SearchOverlay from './components/ui/SearchOverlay';
import ToastContainer from './components/ui/ToastContainer';
import FloatingActions from './components/ui/FloatingActions';
import type { Product, CategoryId } from './data/types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col font-sans selection:bg-rose/25">
      {/* Sticky Header with navigation to all pages */}
      <Header
        onSearch={() => setSearchOpen(true)}
        onWishlist={() => setWishlistOpen(true)}
      />

      {/* Main Pages Content with React Router */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onQuickView={setQuickViewProduct}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <ShopPage
                onQuickView={setQuickViewProduct}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <CategoriesPage
                onCategoryChange={setSelectedCategory}
              />
            }
          />
          <Route
            path="/story"
            element={<StoryPage />}
          />
          <Route
            path="/gifting"
            element={<GiftingPage />}
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          {/* Fallback to Home */}
          <Route
            path="*"
            element={
              <HomePage
                onQuickView={setQuickViewProduct}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays, Drawers & Modals */}
      <CartDrawer />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onQuickView={setQuickViewProduct}
      />

      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onProductSelect={(product: Product) => {
          setSearchOpen(false);
          setQuickViewProduct(product);
        }}
      />

      <ToastContainer />
      <FloatingActions />
    </div>
  );
}
