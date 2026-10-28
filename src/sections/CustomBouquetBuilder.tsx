import { useState } from 'react';
import { Sparkles, MessageCircle, ShoppingBag, Check, Plus, Minus, HeartHandshake } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice, getWhatsAppLink } from '../utils/helpers';
import { siteConfig } from '../config/site';

interface BouquetTier {
  id: 'petite' | 'classic' | 'luxe';
  name: string;
  maxStems: number;
  basePrice: number;
  description: string;
  popular?: boolean;
}

const tiers: BouquetTier[] = [
  {
    id: 'petite',
    name: 'Petite Bloom',
    maxStems: 3,
    basePrice: 799,
    description: 'Charming 3-stem bunch, ideal for small desks & sweet surprises',
  },
  {
    id: 'classic',
    name: 'Classic Harmony',
    maxStems: 6,
    basePrice: 1499,
    description: 'Balanced 6-stem bouquet, our most cherished anniversary pick',
    popular: true,
  },
  {
    id: 'luxe',
    name: 'Grand Botanical',
    maxStems: 10,
    basePrice: 2399,
    description: 'Breathtaking 10-stem showpiece with luxuriant foliage accents',
  },
];

interface StemOption {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgClass: string;
}

const stemOptions: StemOption[] = [
  { id: 'rose', name: 'Velvet Rose', emoji: '🌹', color: 'Classic Crimson', bgClass: 'bg-rose-50 border-rose-200' },
  { id: 'tulip', name: 'Spring Tulip', emoji: '🌷', color: 'Pastel Blush', bgClass: 'bg-pink-50 border-pink-200' },
  { id: 'sunflower', name: 'Sunflower', emoji: '🌻', color: 'Golden Amber', bgClass: 'bg-amber-50 border-amber-200' },
  { id: 'daisy', name: 'Wild Daisy', emoji: '🌼', color: 'Ivory Cream', bgClass: 'bg-yellow-50 border-yellow-200' },
  { id: 'lavender', name: 'Lavender Sprig', emoji: '🪻', color: 'French Lilac', bgClass: 'bg-purple-50 border-purple-200' },
];

interface WrapOption {
  id: string;
  name: string;
  preview: string;
}

const wrappingOptions: WrapOption[] = [
  { id: 'kraft', name: 'Vintage Kraft & Sage Ribbon', preview: '#c2b092' },
  { id: 'blush', name: 'Blush Frosted & Rose Ribbon', preview: '#e8c5c0' },
  { id: 'forest', name: 'Midnight Forest & Gold Twine', preview: '#294439' },
];

export default function CustomBouquetBuilder() {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [selectedTier, setSelectedTier] = useState<BouquetTier>(tiers[1]!);
  const [stems, setStems] = useState<Record<string, number>>({
    rose: 2,
    tulip: 2,
    sunflower: 1,
    lavender: 1,
    daisy: 0,
  });
  const [selectedWrap, setSelectedWrap] = useState<WrapOption>(wrappingOptions[0]!);
  const [recipientName, setRecipientName] = useState('');
  const [noteMessage, setNoteMessage] = useState('');

  const currentStemCount = Object.values(stems).reduce((acc, curr) => acc + curr, 0);
  const remainingStems = selectedTier.maxStems - currentStemCount;

  const handleUpdateStem = (id: string, delta: number) => {
    const current = stems[id] || 0;
    if (delta > 0 && currentStemCount >= selectedTier.maxStems) {
      showToast(`Maximum ${selectedTier.maxStems} stems for ${selectedTier.name}`);
      return;
    }
    if (delta < 0 && current <= 0) return;

    setStems(prev => ({
      ...prev,
      [id]: Math.max(0, current + delta),
    }));
  };

  const handleSelectTier = (tier: BouquetTier) => {
    setSelectedTier(tier);
    // adjust stems if over limit
    let count = 0;
    const adjusted: Record<string, number> = {};
    for (const [key, val] of Object.entries(stems)) {
      if (count + val <= tier.maxStems) {
        adjusted[key] = val;
        count += val;
      } else {
        adjusted[key] = Math.max(0, tier.maxStems - count);
        count = tier.maxStems;
      }
    }
    setStems(adjusted);
  };

  const bouquetDescription = [
    `${selectedTier.name} (${selectedTier.maxStems} Stems)`,
    `Flowers: ${Object.entries(stems)
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => `${count}x ${stemOptions.find(s => s.id === id)?.name}`)
      .join(', ')}`,
    `Wrapping: ${selectedWrap.name}`,
    recipientName ? `For: ${recipientName}` : '',
    noteMessage ? `Card: "${noteMessage}"` : '',
  ].filter(Boolean).join(' | ');

  const handleAddToCart = () => {
    if (currentStemCount === 0) {
      showToast('Please add at least 1 flower stem to your bouquet');
      return;
    }

    const customProduct = {
      id: `custom-${Date.now()}`,
      name: `Custom Bouquet (${selectedTier.name})`,
      price: selectedTier.basePrice,
      category: 'custom' as const,
      description: bouquetDescription,
      image: '/images/products/custom-bouquet.jpg',
      colors: [selectedWrap.name],
      inStock: true,
      tags: ['custom', 'builder', selectedTier.id],
    };

    addItem(customProduct, 1, selectedWrap.name);
    showToast('Your custom bouquet was added to the bag!');
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi ${siteConfig.brand.name}! I would love to order a Custom Crochet Bouquet:\n\n` +
      `🌿 Tier: ${selectedTier.name} (₹${selectedTier.basePrice})\n` +
      `🌸 Stems:\n${Object.entries(stems)
        .filter(([_, count]) => count > 0)
        .map(([id, count]) => `  - ${count}x ${stemOptions.find(s => s.id === id)?.name}`)
        .join('\n')}\n` +
      `🎀 Wrapping: ${selectedWrap.name}\n` +
      (recipientName ? `🎁 Recipient: ${recipientName}\n` : '') +
      (noteMessage ? `💌 Note Card: "${noteMessage}"\n` : '') +
      `\nPlease let me know the turnaround time and payment steps! ✨`
    );

    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <section id="custom-builder" className="py-16 sm:py-24 bg-cream/30 border-y border-border scroll-mt-12">
      <div className="section-container">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-[11px] font-semibold tracking-widest uppercase mb-3">
            <Sparkles size={13} />
            <span>Interactive Studio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal">
            Design Your Custom Bouquet
          </h2>
          <p className="mt-3 text-[14px] sm:text-[15px] text-charcoal/65">
            Pick your favourite blooms, choose your wrapping aesthetic, and personalize your gift message. Hand-stitched to your exact preference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Interactive Steps */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-[var(--radius-xl)] border border-border shadow-xs">
            {/* Step 1: Tier Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-bold text-forest uppercase tracking-wider">
                  Step 1 • Choose Size
                </span>
                <span className="text-[12px] text-charcoal/50">
                  {selectedTier.maxStems} stems capacity
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {tiers.map(tier => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => handleSelectTier(tier)}
                      className={`relative p-4 rounded-[var(--radius-lg)] border-2 cursor-pointer transition-all duration-200 text-left ${
                        isSelected
                          ? 'border-forest bg-forest/5 shadow-xs'
                          : 'border-border/80 hover:border-charcoal/30 bg-white'
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2.5 right-3 bg-terracotta text-white text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
                          Most Loved
                        </span>
                      )}
                      <h4 className="font-serif text-[15px] font-medium text-charcoal">
                        {tier.name}
                      </h4>
                      <p className="text-[11px] text-charcoal/55 mt-0.5 line-clamp-2">
                        {tier.description}
                      </p>
                      <div className="mt-3 flex items-baseline justify-between">
                        <span className="text-[14px] font-bold text-forest">
                          {formatPrice(tier.basePrice)}
                        </span>
                        <span className="text-[11px] text-charcoal/40 font-medium">
                          {tier.maxStems} stems
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Flower Stems */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-bold text-forest uppercase tracking-wider">
                  Step 2 • Pick Your Blooms
                </span>
                <span className={`text-[12px] font-semibold ${remainingStems === 0 ? 'text-forest' : 'text-terracotta'}`}>
                  {remainingStems === 0 ? '✓ Capacity reached' : `${remainingStems} stems left to choose`}
                </span>
              </div>

              <div className="space-y-2.5">
                {stemOptions.map(stem => {
                  const qty = stems[stem.id] || 0;
                  return (
                    <div
                      key={stem.id}
                      className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-ivory/60 border border-border/70 hover:bg-ivory transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{stem.emoji}</span>
                        <div>
                          <p className="text-[14px] font-medium text-charcoal leading-tight">
                            {stem.name}
                          </p>
                          <p className="text-[11px] text-charcoal/50">
                            {stem.color}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateStem(stem.id, -1)}
                          disabled={qty <= 0}
                          className="w-8 h-8 rounded-full border border-border bg-white flex items-center justify-center text-charcoal hover:bg-cream disabled:opacity-30 transition-all active:scale-95"
                          aria-label={`Decrease ${stem.name}`}
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-6 text-center text-[13px] font-bold tabular-nums text-charcoal">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleUpdateStem(stem.id, 1)}
                          disabled={currentStemCount >= selectedTier.maxStems}
                          className="w-8 h-8 rounded-full border border-border bg-white flex items-center justify-center text-charcoal hover:bg-cream disabled:opacity-30 transition-all active:scale-95"
                          aria-label={`Increase ${stem.name}`}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Wrapping Style */}
            <div>
              <span className="text-[12px] font-bold text-forest uppercase tracking-wider block mb-3">
                Step 3 • Signature Wrapping & Ribbon
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {wrappingOptions.map(wrap => {
                  const isSelected = selectedWrap.id === wrap.id;
                  return (
                    <button
                      key={wrap.id}
                      type="button"
                      onClick={() => setSelectedWrap(wrap)}
                      className={`flex items-center gap-2.5 p-3 rounded-[var(--radius-md)] border text-left transition-all ${
                        isSelected
                          ? 'border-forest bg-forest/5 font-medium'
                          : 'border-border bg-white hover:border-charcoal/30'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: wrap.preview }}
                      />
                      <span className="text-[12px] text-charcoal leading-snug">
                        {wrap.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Personalization Note */}
            <div>
              <span className="text-[12px] font-bold text-forest uppercase tracking-wider block mb-3">
                Step 4 • Complimentary Handwritten Card
              </span>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Recipient's Name (optional)"
                  value={recipientName}
                  onChange={e => setRecipientName(e.target.value)}
                  className="w-full px-4 py-2.5 text-[13px] rounded-[var(--radius-md)] border border-border bg-ivory/40 focus:bg-white focus:outline-none focus:border-forest transition-colors"
                />
                <textarea
                  placeholder="Your personal message to be handwritten on our kraft greeting card..."
                  rows={2}
                  value={noteMessage}
                  onChange={e => setNoteMessage(e.target.value)}
                  className="w-full px-4 py-2.5 text-[13px] rounded-[var(--radius-md)] border border-border bg-ivory/40 focus:bg-white focus:outline-none focus:border-forest transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Summary & Action Card */}
          <div className="lg:col-span-5 bg-white rounded-[var(--radius-xl)] border border-border p-6 shadow-md sticky top-20">
            {/* Visual Thumbnail */}
            <div className="relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden bg-cream mb-5">
              <img
                src="/images/products/custom-bouquet.jpg"
                alt="Custom bouquet preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 badge badge-new">
                Bespoke Creation
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-semibold text-charcoal shadow-xs">
                {currentStemCount}/{selectedTier.maxStems} Stems
              </div>
            </div>

            {/* Price & Summary */}
            <div className="flex items-baseline justify-between border-b border-border pb-4 mb-4">
              <div>
                <h3 className="font-serif text-xl font-medium text-charcoal">
                  {selectedTier.name}
                </h3>
                <p className="text-[12px] text-charcoal/50">
                  Custom handcrafted bouquet
                </p>
              </div>
              <span className="text-2xl font-bold text-forest">
                {formatPrice(selectedTier.basePrice)}
              </span>
            </div>

            {/* Selected Breakdown */}
            <div className="space-y-2 mb-6 text-[13px]">
              <div className="flex justify-between text-charcoal/70">
                <span>Selected Blooms:</span>
                <span className="font-medium text-charcoal">
                  {Object.entries(stems).filter(([_, c]) => c > 0).length === 0
                    ? 'None yet'
                    : Object.entries(stems)
                        .filter(([_, c]) => c > 0)
                        .map(([id, c]) => `${c} ${stemOptions.find(s => s.id === id)?.name}`)
                        .join(', ')}
                </span>
              </div>
              <div className="flex justify-between text-charcoal/70">
                <span>Wrapping Style:</span>
                <span className="font-medium text-charcoal text-right text-[12px]">
                  {selectedWrap.name}
                </span>
              </div>
              {recipientName && (
                <div className="flex justify-between text-charcoal/70">
                  <span>Gift For:</span>
                  <span className="font-medium text-charcoal">{recipientName}</span>
                </div>
              )}
              {noteMessage && (
                <div className="p-2.5 rounded-[var(--radius-md)] bg-cream/70 text-[11px] text-charcoal/75 italic border border-border/50">
                  "{noteMessage}"
                </div>
              )}
            </div>

            {/* Dual Actions */}
            <div className="space-y-2.5">
              <button
                onClick={handleAddToCart}
                disabled={currentStemCount === 0}
                className="w-full py-3.5 rounded-full bg-forest text-white font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-forest-light transition-all disabled:opacity-40 active:scale-[0.98] shadow-sm"
              >
                <ShoppingBag size={16} />
                Add Custom Bouquet to Bag
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 rounded-full border border-forest text-forest hover:bg-forest/5 font-medium text-[13px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <MessageCircle size={15} />
                Enquire & Order via WhatsApp
              </button>
            </div>

            {/* Guarantee Note */}
            <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2 text-[11px] text-charcoal/50">
              <HeartHandshake size={14} className="text-forest shrink-0" />
              <span>We share photo updates of your arrangement before dispatch!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
