import { MessageSquare } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

export default function WhatsAppButton({ settings }) {
  const waPhone = settings?.whatsapp_number || '918155050343';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip hint on desktop */}
      <span className="hidden sm:inline-block mr-3 bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-2xl border border-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with Pabari's Real Estate 💬
      </span>

      <button
        onClick={() => openWhatsApp({ phone: waPhone, message: "Hello Pabari's Real Estate! I am visiting your website and need property help in Jamnagar." })}
        className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-white rounded-full shadow-2xl shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
        aria-label="Contact us on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
        </span>
        <MessageSquare className="w-7 h-7 fill-white text-emerald-600" />
      </button>
    </div>
  );
}
