import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Search, MapPin, Shield, Star, CheckCircle2, ArrowRight, MessageSquare, PhoneCall, Award, Users } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { openWhatsApp } from '../lib/whatsapp';

export default function Home({ settings }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedListingType, setSelectedListingType] = useState('All');

  const waPhone = settings?.whatsapp_number || '918155050343';

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      setProperties(data || []);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const featuredProperties = properties.filter(p => p.featured);
  const displayProperties = featuredProperties.length > 0 ? featuredProperties : properties.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.jpg"
            alt="Jamnagar Real Estate"
            className="w-full h-full object-cover object-center scale-105 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs text-amber-400 font-semibold mb-6 shadow-xl backdrop-blur-md animate-fade-in">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Jamnagar's #1 Rated Real Estate Advisory • Kadiawad, Grain Market</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Find Your Dream Property in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Jamnagar</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Verified Residential Plots, Luxury Bungalows, Commercial Shops & Agricultural Farmlands across Kadiawad, Khodiyar Colony, Patel Colony, and Digvijay Plot.
          </p>

          {/* Search Bar Box */}
          <div className="mt-10 max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              
              {/* Filter Type */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400"
              >
                <option value="All">All Property Types</option>
                <option value="Plot">Residential Plot</option>
                <option value="Flat">Apartment / Flat</option>
                <option value="Bungalow">Bungalow / Villa</option>
                <option value="Commercial">Commercial Shop / Office</option>
                <option value="Land">Agricultural Land</option>
              </select>

              {/* Listing Type */}
              <select
                value={selectedListingType}
                onChange={(e) => setSelectedListingType(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400"
              >
                <option value="All">Buy & Rent</option>
                <option value="Sale">For Sale</option>
                <option value="Rent">For Rent</option>
              </select>

              {/* Location query */}
              <div className="relative">
                <MapPin className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Locality (e.g. Kadiawad)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
              <span className="text-xs text-slate-400">
                Direct WhatsApp consultation available 24/7
              </span>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <Link
                  to={`/properties?type=${selectedType}&listing=${selectedListingType}&q=${searchQuery}`}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Properties</span>
                </Link>

                <button
                  onClick={() => openWhatsApp({ phone: waPhone, message: "Hello Pabari's Real Estate! I want a custom property suggestion in Jamnagar." })}
                  className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                  <span className="hidden sm:inline">Instant WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-4 rounded-xl">
              <div className="text-2xl font-black text-amber-400 font-serif">500+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Properties Deal Success</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-4 rounded-xl">
              <div className="text-2xl font-black text-amber-400 font-serif">4.6★</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Google Rating</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-4 rounded-xl">
              <div className="text-2xl font-black text-amber-400 font-serif">100%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Verified Legal Titles</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-4 rounded-xl">
              <div className="text-2xl font-black text-amber-400 font-serif">Kadiawad</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Prime Jamnagar HQ</div>
            </div>
          </div>

        </div>
      </section>


      {/* FEATURED PROPERTIES SECTION */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
                Handpicked Listings
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
                Featured Properties in Jamnagar
              </h2>
            </div>
            <Link
              to="/properties"
              className="mt-4 md:mt-0 flex items-center space-x-2 text-sm font-semibold text-amber-400 hover:text-amber-300 group"
            >
              <span>Explore All Listings ({properties.length})</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-slate-900 h-96 rounded-2xl animate-pulse border border-slate-800"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProperties.map((property) => (
                <PropertyCard key={property.id} property={property} settings={settings} />
              ))}
            </div>
          )}

        </div>
      </section>


      {/* WHY CHOOSE PABARI'S REAL ESTATE */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Why Pabari's Real Estate
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white leading-snug">
                Your Trusted Property Broker & Advisory Partner in Jamnagar
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Located near Bharat Bakery in Kadiawad, Grain Market, Pabari's Real Estate brings unmatched localized knowledge and transparent property dealing. Whether you want to buy a residential plot in Dhichda or a commercial shop near Grain Market, we handle title checking, valuation, site visits, and negotiation.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct WhatsApp Assistance</h4>
                    <p className="text-xs text-slate-400">Instantly receive photos, layout plans, and pricing on your phone.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Clear Legal Title & Documentation</h4>
                    <p className="text-xs text-slate-400">Every property listing is verified for clear ownership and non-agricultural (NA) permissions.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Best Market Rates & Fair Negotiation</h4>
                    <p className="text-xs text-slate-400">Honest pricing without hidden commissions or inflated margins.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={() => openWhatsApp({ phone: waPhone, message: "Hello Pabari's Real Estate! I want to sell or buy property in Jamnagar." })}
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Inquire via WhatsApp</span>
                </button>

                <a
                  href={`tel:${settings?.phone}`}
                  className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-5 py-3.5 rounded-xl border border-slate-700 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Call Us Directly</span>
                </a>
              </div>
            </div>

            {/* Image & Stats Card */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
                <img
                  src="/images/about.jpg"
                  alt="Real Estate Advisory Jamnagar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-slate-900 border border-amber-500/40 p-5 rounded-2xl shadow-2xl max-w-xs backdrop-blur-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl">
                    4.6★
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white font-serif">Customer Satisfaction</h5>
                    <p className="text-[11px] text-slate-400">Trusted by buyers & sellers across Gujarat</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Want to Sell or Rent Your Property in Jamnagar?
            </h3>
            <p className="text-sm text-slate-900 font-medium mt-1">
              List your plot, bungalow, or commercial space with Pabari's Real Estate for fast buyers and best market rate.
            </p>
          </div>
          <button
            onClick={() => openWhatsApp({ phone: waPhone, message: "Hello Pabari's Real Estate! I want to list my property for sale/rent in Jamnagar." })}
            className="bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-sm px-8 py-4 rounded-xl shadow-xl transition-all shrink-0 flex items-center space-x-2"
          >
            <MessageSquare className="w-4 h-4 fill-amber-400 text-slate-950" />
            <span>List Your Property Now</span>
          </button>
        </div>
      </section>

    </div>
  );
}
