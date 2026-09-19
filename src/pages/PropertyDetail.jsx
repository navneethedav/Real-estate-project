import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, MessageSquare, Phone, ArrowLeft, Check, ShieldCheck, Share2, Tag, Building2 } from 'lucide-react';
import supabase from '../lib/supabase';
import { openWhatsApp, buildPropertyInquiryMessage } from '../lib/whatsapp';
import InquiryModal from '../components/InquiryModal';

export default function PropertyDetail({ settings }) {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const waPhone = settings?.whatsapp_number || '918155050343';

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setProperty(data);
    } catch (err) {
      console.error('Error fetching property detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-amber-400">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 text-center px-4">
        <Building2 className="w-16 h-16 text-slate-700 mx-auto mb-4" />
        <h2 className="text-2xl font-bold font-serif">Property Not Found</h2>
        <p className="text-xs text-slate-400 mt-2">The property listing you are looking for does not exist or has been removed.</p>
        <Link to="/properties" className="inline-block mt-6 bg-amber-500 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl">
          Back to All Properties
        </Link>
      </div>
    );
  }

  const waMessage = buildPropertyInquiryMessage(property);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20">
      
      <InquiryModal
        property={property}
        settings={settings}
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/properties"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-amber-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Listings</span>
        </Link>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md ${
                property.listing_type === 'Sale' ? 'bg-amber-500 text-slate-950' : 'bg-blue-600 text-white'
              }`}>
                For {property.listing_type}
              </span>
              <span className="bg-slate-900 text-slate-300 text-xs font-semibold px-3 py-1 rounded-md border border-slate-800">
                {property.property_type}
              </span>
              {property.reference_code && (
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  Ref #{property.reference_code}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              {property.title}
            </h1>
            <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{property.location}, Jamnagar, Gujarat</span>
            </div>
          </div>

          <div className="md:text-right">
            <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Listed Price</span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-serif">
              {property.price}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Image & Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Hero Property Image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
              <img
                src={property.image_url || '/images/hero.jpg'}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl backdrop-blur-md border border-slate-700 flex items-center space-x-2 shadow-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Link Copied!' : 'Share Listing'}</span>
              </button>
            </div>

            {/* Quick Overview Specs */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Property Type</span>
                <span className="text-sm font-bold text-white font-serif">{property.property_type}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1">Bedrooms</span>
                <div className="flex items-center justify-center space-x-1.5 text-sm font-bold text-white font-serif">
                  <Bed className="w-4 h-4 text-amber-400" />
                  <span>{property.bedrooms ? `${property.bedrooms} Beds` : 'N/A'}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1">Bathrooms</span>
                <div className="flex items-center justify-center space-x-1.5 text-sm font-bold text-white font-serif">
                  <Bath className="w-4 h-4 text-amber-400" />
                  <span>{property.bathrooms ? `${property.bathrooms} Baths` : 'N/A'}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1">Area Size</span>
                <div className="flex items-center justify-center space-x-1.5 text-sm font-bold text-white font-serif">
                  <Maximize className="w-4 h-4 text-amber-400" />
                  <span>{property.area_sqft || 'On Request'}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white font-serif border-l-2 border-amber-400 pl-3">
                Property Overview & Features
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Highlights Checklist */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white font-serif border-l-2 border-amber-400 pl-3">
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center space-x-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified Ownership Documents</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Prime Jamnagar Locality Access</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Site Visit Scheduled via WhatsApp</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fair Pricing & Deal Negotiation Support</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Col: Contact & Action Panel */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl sticky top-28 space-y-5">
              
              <div className="text-center pb-4 border-b border-slate-800">
                <ShieldCheck className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                <h4 className="text-base font-bold text-white font-serif">Interested in this property?</h4>
                <p className="text-xs text-slate-400 mt-1">Connect directly with Pabari's Real Estate broker team in Jamnagar.</p>
              </div>

              {/* Primary WhatsApp CTA */}
              <button
                onClick={() => openWhatsApp({ phone: waPhone, message: waMessage })}
                className="w-full flex items-center justify-center space-x-2.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-sm py-4 rounded-xl shadow-xl shadow-emerald-600/30 transition-all transform active:scale-95"
              >
                <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
                <span>Chat on WhatsApp Now</span>
              </button>

              {/* Website Inquiry Form Modal Launcher */}
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs py-3.5 rounded-xl border border-slate-700 transition-colors"
              >
                <span>Request Callback / Site Visit</span>
              </button>

              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="w-full flex items-center justify-center space-x-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 py-3 rounded-xl border border-slate-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call {settings.phone}</span>
                </a>
              )}

              <div className="pt-2 text-[11px] text-slate-500 text-center leading-relaxed">
                Office: Near Bharat Bakery, Jamnagar Road, Kadiawad, Grain Market, Jamnagar - 361001.
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}