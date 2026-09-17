import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, MessageSquare, ArrowRight, Tag } from 'lucide-react';
import { openWhatsApp, buildPropertyInquiryMessage } from '../lib/whatsapp';

export default function PropertyCard({ property, settings, onInquire }) {
  const waPhone = settings?.whatsapp_number || '918155050343';

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    const msg = buildPropertyInquiryMessage(property);
    openWhatsApp({ phone: waPhone, message: msg });
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-500/40 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col group">
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={property.image_url || '/images/hero.jpg'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md ${
            property.listing_type === 'Sale' ? 'bg-amber-500 text-slate-950' : 'bg-blue-600 text-white'
          }`}>
            For {property.listing_type}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-700">
            {property.property_type}
          </span>
        </div>

        {property.featured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-300 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-lg flex items-center space-x-1">
            <Tag className="w-3 h-3 fill-slate-950" />
            <span>Featured</span>
          </div>
        )}

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <span className="text-2xl font-black text-amber-400 font-serif drop-shadow-md">
              {property.price}
            </span>
          </div>
          {property.reference_code && (
            <span className="text-[10px] text-slate-400 font-mono bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
              Ref: #{property.reference_code}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white font-serif line-clamp-1 group-hover:text-amber-400 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center space-x-1 text-xs text-slate-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="line-clamp-1">{property.location}, Jamnagar</span>
          </div>
          <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-300">
          {property.bedrooms ? (
            <div className="flex items-center space-x-1.5 justify-center">
              <Bed className="w-3.5 h-3.5 text-amber-400" />
              <span>{property.bedrooms} Beds</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 justify-center text-slate-500">
              <span>N/A</span>
            </div>
          )}

          {property.bathrooms ? (
            <div className="flex items-center space-x-1.5 justify-center border-x border-slate-800">
              <Bath className="w-3.5 h-3.5 text-amber-400" />
              <span>{property.bathrooms} Baths</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 justify-center border-x border-slate-800 text-slate-500">
              <span>N/A</span>
            </div>
          )}

          <div className="flex items-center space-x-1.5 justify-center">
            <Maximize className="w-3.5 h-3.5 text-amber-400" />
            <span>{property.area_sqft || '—'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-1 grid grid-cols-2 gap-2">
          <Link
            to={`/properties/${property.id}`}
            className="flex items-center justify-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 rounded-xl border border-slate-700/60 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs font-bold py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all transform active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white text-emerald-600" />
            <span>WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
}
