import { Building2, Award, ShieldCheck, MapPin, Phone, MessageSquare, Users, CheckCircle2, Star } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

export default function About({ settings }) {
  const waPhone = settings?.whatsapp_number || '918155050343';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs text-amber-400 font-semibold mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>4.6★ Rated Property Advisory Firm</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white">
            About Pabari's Real Estate
          </h1>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed">
            Jamnagar's premier real estate consultancy firm based in Kadiawad, Grain Market. We specialize in buying, selling, renting, and leasing residential, commercial, and agricultural properties across Gujarat.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white border-l-4 border-amber-400 pl-4">
              Building Trust in Jamnagar's Real Estate Market
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              At Pabari's Real Estate, we believe property decisions are among the most significant investments in our clients' lives. From first-time homebuyers searching for a budget flat in Gulabnagar to investors securing prime commercial land near Khodiyar Colony, we provide transparent guidance and complete documentation support.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our office near Bharat Bakery in Kadiawad serves as a central hub for property buyers and sellers. With extensive networks across Jamnagar, we guarantee clear legal titles, fair pricing, and direct owner discussions.
            </p>

            <div className="pt-2 flex items-center space-x-4">
              <button
                onClick={() => openWhatsApp({ phone: waPhone, message: "Hello Pabari's Real Estate! I would like to learn more about your services." })}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="/images/about.jpg"
                alt="Pabari's Real Estate Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-serif">100% Legal Transparency</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Thorough verification of 7/12 land extract documents, Non-Agricultural (NA) permissions, and title deeds before any listing.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-serif">Localized Market Expertise</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              In-depth knowledge of land values, municipal developments, and prime commercial zones in Jamnagar.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white font-serif">Fast WhatsApp Response</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get instant photos, videos, site visit locations, and pricing options right on WhatsApp without waiting.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
