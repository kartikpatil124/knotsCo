/**
 * Central configuration file for Knots N Co (@knotsnco._)
 * Handcrafted crochet studio & gifting brand based in Surat, Gujarat.
 */

export const siteConfig = {
  brand: {
    name: 'Knots N Co',
    tagline: 'Handcrafted Crochet Studio & Floral Keepsakes',
    shortDescription: 'Everlasting crochet flower bouquets, cute plushies, keychains, and bespoke gift hampers lovingly handcrafted by women artisans in Surat, Gujarat.',
    foundedYear: 2023,
    logo: null as string | null,
  },

  contact: {
    email: 'contact@knotsnco.in',
    phone: '+91 87804 06864',
    whatsapp: '+918780406864',
    whatsappMessage: 'Hi Knots N Co! I would love to enquire about your crochet flower bouquets and custom gifts.',
    address: 'G-50, Phoenix Tower, VIP Road, Opp. Aagam Viviana Mall, Vesu, Surat, Gujarat 395007',
  },

  social: {
    instagram: 'https://www.instagram.com/knotsnco._',
    instagramHandle: '@knotsnco._',
    whatsapp: 'https://wa.me/918780406864',
    pinterest: 'https://pinterest.com',
    facebook: 'https://facebook.com',
  },

  currency: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
  },

  shipping: {
    freeShippingThreshold: 999,
    estimatedDays: '3-5 business days (Pan-India)',
  },

  features: {
    enableWishlist: true,
    enableSearch: true,
    enableNewsletter: true,
    enableCustomOrders: true,
    showWhatsappCTA: true,
    cartMode: 'enquiry' as 'enquiry' | 'checkout',
  },

  seo: {
    title: 'Knots N Co — Handcrafted Crochet Bouquets, Studio & Keepsakes (Surat)',
    description: 'Surat-based crochet studio crafting everlasting flower bouquets, potted desk blooms, plushies, and custom handmade gifts. Visit us at Vesu, Surat or order pan-India.',
    ogImage: '/images/hero.jpg',
  },
} as const;

export type SiteConfig = typeof siteConfig;
