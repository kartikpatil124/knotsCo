import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Clock, Send, Check } from 'lucide-react';
import FaqSection from '../sections/FaqSection';
import NewsletterSection from '../sections/NewsletterSection';
import { useToast } from '../context/ToastContext';
import { getWhatsAppLink } from '../utils/helpers';
import { siteConfig } from '../config/site';

export default function ContactPage() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      showToast('Please fill in your name and message');
      return;
    }

    // Compose inquiry for WhatsApp
    const whatsappText = `Hi Knots N Co! Inquiry from Website:\nName: ${name}\nPhone: ${phone || 'N/A'}\nEmail: ${email || 'N/A'}\nMessage: ${message}`;
    window.open(getWhatsAppLink(whatsappText), '_blank');

    setSubmitted(true);
    showToast('Inquiry sent via WhatsApp! We will get back to you shortly.');
  };

  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-ivory">
      {/* Page Header */}
      <div className="bg-cream/50 py-10 sm:py-14 border-b border-border text-center">
        <div className="section-container">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-[11px] font-semibold tracking-widest uppercase mb-3">
            <MapPin size={13} />
            <span>Surat Studio & Inquiries</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-charcoal">
            Get in Touch
          </h1>
          <p className="mt-3 text-[14px] sm:text-[15px] text-charcoal/65 max-w-lg mx-auto">
            We'd love to welcome you to our Surat studio or assist you with custom orders and nationwide delivery.
          </p>
        </div>
      </div>

      {/* Main Contact Grid */}
      <div className="section-container py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Studio Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-charcoal mb-2">
                Knotsnco Crochet Studio
              </h2>
              <p className="text-[14px] text-charcoal/65 leading-relaxed">
                Visit us in person to see our ready-to-take bouquets, touch the soft milk cotton yarn, and discuss custom designs.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {/* Studio Address */}
              <div className="flex items-start gap-3.5 p-4 rounded-[var(--radius-lg)] bg-white border border-border">
                <div className="w-10 h-10 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-[14px] text-charcoal">Studio Address</h4>
                  <p className="text-[13px] text-charcoal/70 mt-0.5 leading-relaxed">
                    {siteConfig.contact.address}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Phoenix+Tower+VIP+Road+Vesu+Surat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[12px] font-medium text-forest hover:underline mt-1.5"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

              {/* WhatsApp & Phone */}
              <div className="flex items-start gap-3.5 p-4 rounded-[var(--radius-lg)] bg-white border border-border">
                <div className="w-10 h-10 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-[14px] text-charcoal">WhatsApp & Call</h4>
                  <p className="text-[13px] text-charcoal/70 mt-0.5">
                    {siteConfig.contact.phone}
                  </p>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[12px] font-medium text-forest hover:underline mt-1"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-4 rounded-[var(--radius-lg)] bg-white border border-border">
                <div className="w-10 h-10 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-[14px] text-charcoal">Email Inquiries</h4>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-[13px] text-charcoal/70 hover:text-forest transition-colors mt-0.5 block"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3.5 p-4 rounded-[var(--radius-lg)] bg-white border border-border">
                <div className="w-10 h-10 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Instagram size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-[14px] text-charcoal">Instagram DM</h4>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-forest hover:underline mt-0.5 block font-medium"
                  >
                    {siteConfig.social.instagramHandle}
                  </a>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-3.5 p-4 rounded-[var(--radius-lg)] bg-white border border-border">
                <div className="w-10 h-10 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-[14px] text-charcoal">Studio Timings</h4>
                  <p className="text-[13px] text-charcoal/70 mt-0.5">
                    Monday to Saturday: 11:00 AM – 8:00 PM <br />
                    Sunday: 12:00 PM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[var(--radius-xl)] border border-border shadow-xs">
            <div className="mb-6">
              <span className="text-[11px] font-bold text-forest uppercase tracking-wider block mb-1">
                Direct Message
              </span>
              <h3 className="font-serif text-2xl font-medium text-charcoal">
                Send Us a Note
              </h3>
              <p className="text-[13px] text-charcoal/60 mt-1">
                Have a question about a design or delivery time? We respond quickly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-charcoal/70 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Drashti Patel"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-border bg-ivory/30 focus:bg-white focus:outline-none focus:border-forest text-[14px] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-charcoal/70 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-border bg-ivory/30 focus:bg-white focus:outline-none focus:border-forest text-[14px] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-charcoal/70 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-border bg-ivory/30 focus:bg-white focus:outline-none focus:border-forest text-[14px] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-charcoal/70 mb-1">
                  Your Message or Custom Request *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what flowers you're looking for, preferred color palette, or milestone date..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-border bg-ivory/30 focus:bg-white focus:outline-none focus:border-forest text-[14px] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-forest text-white font-medium text-[14px] hover:bg-forest-light transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
              >
                {submitted ? (
                  <>
                    <Check size={16} />
                    <span>Message Sent via WhatsApp!</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Inquiry to Knots N Co</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <FaqSection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
