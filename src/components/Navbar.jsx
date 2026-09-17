import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Phone, MessageSquare, Menu, X, Shield, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { openWhatsApp } from '../lib/whatsapp';

export default function Navbar({ settings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waPhone = settings?.whatsapp_number || '918155050343';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-amber-500/20 py-3' : 'bg-gradient-to-b from-slate-950/90 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white block leading-none font-serif">
                Pabari's <span className="text-amber-400">Real Estate</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-sans block mt-0.5">
                Jamnagar's Trusted Partner
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-amber-400 relative py-1 ${
                  location.pathname === link.path ? 'text-amber-400 font-semibold' : 'text-slate-200'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </nav>

          {/* Quick CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {settings?.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-amber-400 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 px-3 py-2 rounded-lg transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{settings.phone}</span>
              </a>
            )}

            <button
              onClick={() => openWhatsApp({ phone: waPhone, message: "Hello Pabari's Real Estate! I would like to inquire about properties in Jamnagar." })}
              className="flex items-center space-x-2 text-xs font-bold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-4 py-2.5 rounded-lg shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
              <span>WhatsApp Inquiry</span>
            </button>

            {user ? (
              <Link
                to="/admin"
                className="flex items-center space-x-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-2 rounded-lg transition-all shadow-sm"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-slate-400 hover:text-slate-200 p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                title="Admin Login"
              >
                <Lock className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => openWhatsApp({ phone: waPhone, message: "Hello Pabari's Real Estate! I need property details." })}
              className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              title="Quick WhatsApp"
            >
              <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-amber-400 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/98 border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-3 mt-3 shadow-2xl animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                location.pathname === link.path ? 'bg-amber-500/10 text-amber-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-800 flex flex-col space-y-2">
            <button
              onClick={() => {
                setIsOpen(false);
                openWhatsApp({ phone: waPhone, message: "Hello Pabari's Real Estate, I need property details in Jamnagar." });
              }}
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-bold shadow-md"
            >
              <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
              <span>Connect on WhatsApp</span>
            </button>
            {user ? (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center space-x-2 bg-amber-500 text-slate-950 py-2.5 rounded-lg font-semibold"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-200 py-2"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
