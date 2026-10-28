export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: CategoryId;
  description: string;
  image: string;
  images?: string[];
  colors?: string[];
  badge?: 'new' | 'bestseller';
  inStock: boolean;
  tags?: string[];
}

export type CategoryId = 'bouquets' | 'flowers' | 'keychains' | 'gifts' | 'custom';

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
  image: string;
  icon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface WishlistItem {
  productId: string;
}
