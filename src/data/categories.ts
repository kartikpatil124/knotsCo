import type { Category } from './types';

export const categories: Category[] = [
  {
    id: 'bouquets',
    name: 'Crochet Flower Bouquets',
    shortName: 'Bouquets',
    description: 'Handcrafted bouquets that last forever',
    image: '/images/categories/bouquets.jpg',
    icon: '💐',
  },
  {
    id: 'flowers',
    name: 'Individual Crochet Flowers',
    shortName: 'Flowers',
    description: 'Single stem beauties for every occasion',
    image: '/images/categories/flowers.jpg',
    icon: '🌸',
  },
  {
    id: 'keychains',
    name: 'Crochet Keychains',
    shortName: 'Keychains',
    description: 'Tiny handmade keepsakes to carry with you',
    image: '/images/categories/keychains.jpg',
    icon: '🔑',
  },
  {
    id: 'gifts',
    name: 'Handmade Gifts',
    shortName: 'Gifts',
    description: 'Thoughtful gifts made with care',
    image: '/images/categories/gifts.jpg',
    icon: '🎁',
  },
  {
    id: 'custom',
    name: 'Custom Gift Sets',
    shortName: 'Custom',
    description: 'Create your perfect personalized gift',
    image: '/images/categories/custom.jpg',
    icon: '✨',
  },
];
