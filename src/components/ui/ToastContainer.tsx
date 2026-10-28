import { Check, Info, AlertCircle, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { cn } from '../../utils/helpers';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto px-4 py-3 rounded-[var(--radius-lg)] shadow-lg',
            'flex items-center gap-2.5 min-w-[200px] max-w-[90vw]',
            'animate-fade-in-up',
            toast.type === 'success' && 'bg-forest text-white',
            toast.type === 'info' && 'bg-charcoal text-white',
            toast.type === 'error' && 'bg-rose-dark text-white'
          )}
        >
          {toast.type === 'success' && <Check size={16} className="shrink-0" />}
          {toast.type === 'info' && <Info size={16} className="shrink-0" />}
          {toast.type === 'error' && <AlertCircle size={16} className="shrink-0" />}
          <p className="text-[13px] font-medium flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            aria-label="Dismiss"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
