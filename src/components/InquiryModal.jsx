import { useState } from 'react';
import { X, Send, MessageSquare, Building2, MapPin, Tag } from 'lucide-react';
import { openWhatsApp, buildPropertyInquiryMessage } from '../lib/whatsapp';

export default function InquiryModal({ property, settings, isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !property) return null;

  const waPhone = settings?.whatsapp_number || '918155050343';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Save inquiry into backend database
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_id: property.id,
          property_title: property.title,
          client_name: name,
          client_phone: phone,
          client_email: email,
          message: message,
        }),
      });

      setSubmitted(true);

      // 2. Open WhatsApp with formatted inquiry text
      const waMsg = buildPropertyInquiryMessage(property, { name, phone, message });
      openWhatsApp({ phone: waPhone, message: waMsg });

    } catch (err) {
      console.error('Inquiry submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-amber-500/30 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
              Property Inquiry
            </span>
            <h3 className="text-lg font-bold text-white font-serif line-clamp-1">
              {property.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Property Summary Pill */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-300">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>{property.location}, Jamnagar</span>
          </div>
          <div className="font-bold text-amber-400 text-sm font-serif">
            {property.price}
          </div>
        </div>

        {/* Form or Confirmation */}
        <div className="p-6 space-y-4">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-serif">Inquiry Sent!</h4>
              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                Your request has been recorded and WhatsApp has been opened to connect directly with Pabari's Real Estate.
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="e.g. client@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Message / Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Ask about site visit timing, price negotiations, documentation, etc."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all transform active:scale-95 disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                  <span>{submitting ? 'Connecting...' : 'Send & Chat on WhatsApp'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
