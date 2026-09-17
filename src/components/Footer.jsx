import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, MessageSquare, ArrowUpRight, ShieldCheck, Star } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

export default function Footer({ settings }) {
  const waPhone = settings?.whatsapp_number || '918155050343';

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold">
                <Building2 className="w-6 h-6 text-slate-950" />
              </div>
              <span className="text-xl font-bold text-white font-serif tracking-tight">
                Pabari's <span className="text-amber-400">Real Estate</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Jamnagar's premier property advisory firm specializing in residential plots, commercial spaces, luxury bungalows, and investment lands since years.
            </p>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full w-fit">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.6★ Rated Property Dealer in Jamnagar</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-base font-serif border-l-2 border-amber-400 pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors flex items-center space-x-1 group">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-amber-400 transition-colors flex items-center space-x-1 group">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  <span>Browse Properties</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-400 transition-colors flex items-center space-x-1 group">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  <span>Real Estate Services</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors flex items-center space-x-1 group">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  <span>About Pabari's</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors flex items-center space-x-1 group">
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Localities */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-base font-serif border-l-2 border-amber-400 pl-3">
              Prime Jamnagar Hubs
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Kadiawad & Grain Market</li>
              <li>Khodiyar Colony & Park Colony</li>
              <li>Gulabnagar & Patel Colony</li>
              <li>Bedeshwar & Digvijay Plot</li>
              <li>Dhichda & Jamnagar Highway</li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-base font-serif border-l-2 border-amber-400 pl-3">
              Office & Reach
            </h3>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings?.address || 'Near Bharat Bakery, Jamnagar Road, Kadiawad, Grain Market, Jamnagar - 361001, Gujarat'}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${settings?.phone}`} className="hover:text-white transition-colors">
                  {settings?.phone || '+91 98765 43210'}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${settings?.email}`} className="hover:text-white transition-colors">
                  {settings?.email || 'pabari.realestate@gmail.com'}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openWhatsApp({ phone: waPhone, message: "Hello Pabari's Real Estate! I found your website and want to connect." })}
                className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-lg shadow-emerald-600/20 text-xs uppercase tracking-wider transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Pabari's Real Estate, Jamnagar. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Verified Local Property Brokers</span>
            </span>
            <Link to="/login" className="hover:text-amber-400 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
