import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/site';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: 'Care',
    question: 'How do I care for and clean my crochet flowers?',
    answer:
      'Crochet flowers require virtually zero upkeep! To remove household dust, simply use a soft makeup brush, microfiber cloth, or a hairdryer on the cool low setting once every few months. Store them indoors away from direct soaking rain.',
  },
  {
    category: 'Customization',
    question: 'Can I request custom flower varieties or wedding palettes?',
    answer:
      'Yes, absolutely! We specialize in bespoke bridal bouquets, anniversary palettes, and custom arrangements. You can use our "Design Your Bouquet" interactive studio above or chat directly with our head artisan on WhatsApp to choose specific yarn hues.',
  },
  {
    category: 'Shipping',
    question: 'How are the bouquets packaged to avoid damage during transit?',
    answer:
      'Every arrangement is carefully nestled into custom crush-proof corrugated gift boxes with protective kraft paper cushioning. The stems are securely tied so your flowers arrive in pristine, picture-perfect condition right out of the box.',
  },
  {
    category: 'Delivery',
    question: 'How long does handcrafting and delivery take across India?',
    answer:
      'In-stock items ship within 24–48 hours. Made-to-order custom bouquets require 3–5 days of meticulous handcrafting. Pan-India shipping typically takes 3–5 business days, with expedited courier options available upon request.',
  },
  {
    category: 'Materials',
    question: 'What materials and yarn do you craft with?',
    answer:
      'We use 100% premium combed milk cotton yarn, celebrated for its velvety soft texture, vivid colorfast dyes, and resistance to pilling. Stems are reinforced with flexible floral wire, allowing you to gently pose and arrange each bloom in your vase.',
  },
  {
    category: 'Gifting',
    question: 'Can I include a personalized handwritten message?',
    answer:
      'Yes! Every order includes a complimentary handwritten greeting card on textured kraft paper. Type your message in the note box or share it with us on WhatsApp, and we will pen it by hand for your recipient.',
  },
  {
    category: 'Studio',
    question: 'Can I visit the Knots N Co studio in Surat in person?',
    answer:
      'Yes! You are warmly invited to visit our studio at G-50, Phoenix Tower, VIP Road, Opposite Aagam Viviana Mall, Vesu, Surat. Come explore our ready-to-take bouquets, touch the velvety milk cotton yarn, or consult on a bespoke bridal arrangement.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-cream/40 scroll-mt-12">
      <div className="section-container max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-forest mb-2">
            Got Questions?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-[14px] text-charcoal/65">
            Everything you need to know about caring for your blooms, customization, and deliveries.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-[var(--radius-lg)] bg-white border border-border overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-ivory/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-[15px] sm:text-[16px] font-medium text-charcoal leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-cream flex items-center justify-center shrink-0 transition-transform duration-300 text-charcoal/60 ${
                      isOpen ? 'rotate-180 bg-forest text-white' : ''
                    }`}
                  >
                    <ChevronDown size={15} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-[13px] sm:text-[14px] text-charcoal/70 leading-relaxed border-t border-border/40 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 p-6 rounded-[var(--radius-xl)] bg-white border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0">
              <HelpCircle size={20} />
            </div>
            <div>
              <h4 className="font-serif text-[15px] font-medium text-charcoal">
                Have a unique question or custom inquiry?
              </h4>
              <p className="text-[12px] text-charcoal/50">
                Our team is always happy to guide you with bouquet ideas!
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hi%20Petal%20%26%20Thread!%20I%20have%20a%20question%20about%20your%20crochet%20flowers.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-[13px] shrink-0 inline-flex items-center gap-2"
          >
            <MessageCircle size={15} />
            Chat with Us
          </a>
        </div>
      </div>
    </section>
  );
}
