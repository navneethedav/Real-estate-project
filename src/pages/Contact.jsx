import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Building2, CheckCircle2 } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

export default function Contact({ settings }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const waPhone = settings?.whatsapp_number || '918155050343';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Store in backend inquiries table
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: name,
          client_phone: phone,
          client_email: email,
          message: `[Subject: ${subject}] ${message}`,
        }),
      });

      setSubmitted(true);

      // 2. Open WhatsApp with message
      let waText = `Hello Pabari's Real Estate,\n\nI submitted a contact form on your website:\n`;
      waText += `👤 Name: ${name}\n`;
      waText += `📞 Phone: ${phone}\n`;
      if (subject) waText += `📌 Subject: ${subject}\n`;
      if (message) waText += `💬 Message: ${message}\n`;
      waText += `\nPlease reach out to me. Thank you!`;

      openWhatsApp({ phone: waPhone, message: waText });

    } catch (err) {
      console.error('Contact form submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white">
            Contact Pabari's Real Estate
          </h1>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed">
            Have questions about buying, selling, or renting property in Jamnagar? Reach out to us via WhatsApp, phone, or visit our Kadiawad office.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          
          {/* Left Col: Contact Cards */}
          <div className="space-y-6">
            
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">Office Location</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {settings?.address || 'Near Bharat Bakery, Jamnagar Road, Kadiawad, Grain Market, Jamnagar - 361001, Gujarat'}
                </p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 fill-emerald-400 text-slate-900" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">WhatsApp Support</h4>
                <p className="text-xs text-slate-400 mt-1">
                  +{waPhone} (Instant Property Photos & Pricing)
                </p>
                <button
                  onClick={() => openWhatsApp({ phone: waPhone, message: "Hello Pabari's Real Estate! I want to chat about properties in Jamnagar." })}
                  className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  Click to Chat on WhatsApp →
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">Phone & Email</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Phone: {settings?.phone || '+91 98765 43210'}<br />
                  Email: {settings?.email || 'pabari.realestate@gmail.com'}
                </p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">Working Hours</h4>
                <p className="text-xs text-slate-400 mt-1">
                  {settings?.business_hours || 'Mon - Sat: 9:30 AM - 8:30 PM (Sunday Closed)'}
                </p>
              </div>
            </div>

          </div>

          {/* Right 2 Cols: Form */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <h3 className="text-xl font-bold text-white font-serif mb-2">Send an Inquiry Message</h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill out the form below to register your requirement. Submitting will also connect you directly with our WhatsApp team.
            </p>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white font-serif">Thank You! Message Received.</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your details have been saved and WhatsApp has opened to start your real estate conversation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nilesh Pabari"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Inquiry Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Looking for 2 BHK Flat in Khodiyar Colony"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Message / Property Details</label>
                  <textarea
                    rows={4}
                    placeholder="Provide details like budget range, preferred location in Jamnagar, size requirements, etc."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all transform active:scale-95 disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                  <span>{submitting ? 'Submitting...' : 'Send & Chat on WhatsApp'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Embedded Google Map */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-white">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Google Maps Location: Pabari's Real Estate, Kadiawad, Jamnagar</span>
            </div>
            <a
              href="https://maps.app.goo.gl/Rj5PL4pzQ7fwab8H6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>
          <div className="w-full h-96 bg-slate-950">
            <iframe
              title="Pabari's Real Estate Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.828238641974!2d70.07483121500001!3d22.4688109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39576b00636fbacb%3A0x79cd444b89dd7f30!2sPabari&#39;s%20Real%20Estate!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}
