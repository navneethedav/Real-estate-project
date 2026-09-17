import { Building2, Home as HomeIcon, MapPin, FileText, TrendingUp, Key, MessageSquare, PhoneCall } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

export default function Services({ settings }) {
  const waPhone = settings?.whatsapp_number || '918155050343';

  const serviceList = [
    {
      icon: HomeIcon,
      title: 'Residential Property Dealing',
      desc: 'Assistance in buying, selling, and renting luxury bungalows, 1/2/3 BHK apartments, villas, and residential plots in top Jamnagar localities.',
    },
    {
      icon: Building2,
      title: 'Commercial Space Advisory',
      desc: 'Prime retail shops, office spaces, godowns, and commercial plots near Grain Market, Khodiyar Colony, and Bedeshwar industrial zones.',
    },
    {
      icon: MapPin,
      title: 'Agricultural & Farmland Sales',
      desc: 'High-yield agricultural land and farm plots around Jamnagar highway, Dhichda, and rural outskirts with clear titles.',
    },
    {
      icon: FileText,
      title: 'Property Title Checking & Legal Help',
      desc: 'Expert assistance with land titles, NA status verification, registry documentation, and sale deed agreements.',
    },
    {
      icon: TrendingUp,
      title: 'Property Valuation & Investment',
      desc: 'Market rate estimation, land appreciation advice, and high-ROI investment advisory for NRIs and local investors.',
    },
    {
      icon: Key,
      title: 'Rental & Tenant Management',
      desc: 'Helping landlords find verified tenants, drafting rental agreements, and managing long-term commercial lease agreements.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Comprehensive Real Estate Solutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white">
            Our Services in Jamnagar
          </h1>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed">
            From plot acquisition to registry documentation, Pabari's Real Estate offers end-to-end property brokerage and advisory services.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {serviceList.map((srv, idx) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-8 rounded-2xl transition-all duration-300 shadow-xl group space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-serif group-hover:text-amber-400 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {srv.desc}
                </p>
                <button
                  onClick={() => openWhatsApp({ phone: waPhone, message: `Hello Pabari's Real Estate! I am interested in your service: ${srv.title}` })}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 pt-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-amber-400 text-slate-900" />
                  <span>Inquire on WhatsApp</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA Box */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Need Personal Advisory for Property Purchase or Sale?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              Visit our office at Kadiawad, Grain Market, or connect directly on WhatsApp to get tailored listings matching your budget.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openWhatsApp({ phone: waPhone, message: "Hello Pabari's Real Estate! I need custom property consultation." })}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                <span>Instant WhatsApp Consultation</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
