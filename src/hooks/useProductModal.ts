import { useState, useCallback } from 'react';
import type { Product } from '../data/types';

/**
 * Hook for managing the product quick-view modal state.
 */
export function useProductModal() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    // Delay clearing the product so close animation can play
    setTimeout(() => setSelectedProduct(null), 300);
  }, []);

  return { selectedProduct, isOpen, openModal, closeModal };
}
