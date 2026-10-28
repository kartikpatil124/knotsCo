import { siteConfig } from '../config/site';

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(siteConfig.currency.locale, {
    style: 'currency',
    currency: siteConfig.currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getWhatsAppLink(message?: string): string {
  const phone = siteConfig.contact.whatsapp.replace(/[^0-9]/g, '');
  const msg = encodeURIComponent(message || siteConfig.contact.whatsappMessage);
  return `https://wa.me/${phone}?text=${msg}`;
}

export function getWhatsAppOrderLink(items: { name: string; quantity: number; price: number }[], total: number): string {
  const phone = siteConfig.contact.whatsapp.replace(/[^0-9]/g, '');
  let message = `Hi! I'd like to enquire about the following items:\n\n`;
  items.forEach(item => {
    message += `• ${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}\n`;
  });
  message += `\nEstimated Total: ${formatPrice(total)}\n\nPlease let me know about availability and delivery details. Thank you!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
