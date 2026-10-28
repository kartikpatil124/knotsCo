import { useState } from 'react';
import { Mail, Check, Copy, Sparkles, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function NewsletterSection() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setIsSubscribed(true);
    showToast('Welcome to the Bloom Club! Here is your 10% discount.');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('BLOOM10');
    setCopied(true);
    showToast('Coupon code BLOOM10 copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-16 sm:py-20 bg-forest text-white relative overflow-hidden">
      {/* Decorative floral background blur circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-light/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose/10 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-light text-[11px] font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
            <Sparkles size={13} />
            <span>The Bloom Club</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-3">
            A Little Sunshine in Your Inbox.
          </h2>

          <p className="text-[14px] sm:text-[15px] text-white/75 max-w-lg mx-auto mb-8 leading-relaxed">
            Join our inner circle for quiet reflections, early access to limited seasonal stems, and an instant 10% welcome gift.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-[14px] focus:outline-none focus:bg-white/15 focus:border-white/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="btn bg-white text-forest hover:bg-ivory px-7 py-3.5 text-[14px] font-semibold tracking-wide shrink-0 shadow-md"
                >
                  Join Club
                  <ArrowRight size={15} />
                </button>
              </div>
              <p className="text-[11px] text-white/45 mt-3">
                No spam, ever. Unsubscribe with one click anytime.
              </p>
            </form>
          ) : (
            <div className="p-6 rounded-[var(--radius-xl)] bg-white/10 backdrop-blur-md border border-white/20 max-w-md mx-auto animate-scale-in">
              <div className="w-10 h-10 rounded-full bg-white text-forest mx-auto flex items-center justify-center mb-3">
                <Check size={20} />
              </div>
              <h3 className="font-serif text-xl font-medium text-white mb-1">
                You're on the list!
              </h3>
              <p className="text-[13px] text-white/80 mb-4">
                Use this coupon code at checkout for 10% off:
              </p>

              <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-white/15 border border-white/25">
                <span className="font-mono text-lg font-bold tracking-widest text-rose-light">
                  BLOOM10
                </span>
                <button
                  onClick={handleCopyCode}
                  className="btn px-3 py-1.5 text-[12px] bg-white text-forest hover:bg-ivory font-medium inline-flex items-center gap-1.5"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
