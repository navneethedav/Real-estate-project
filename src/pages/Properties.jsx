import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Building2, MapPin, SlidersHorizontal, RefreshCw } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

export default function Properties({ settings }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'All');
  const [listingFilter, setListingFilter] = useState(searchParams.get('listing') || 'All');
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      setProperties(data || []);
    } catch (err) {
      console.error('Fetch properties error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  const filteredProperties = properties.filter((p) => {
    if (typeFilter !== 'All' && p.property_type.toLowerCase() !== typeFilter.toLowerCase()) return false;
    if (listingFilter !== 'All' && p.listing_type.toLowerCase() !== listingFilter.toLowerCase()) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchDesc) return false;
    }
    return true;
  });

  const resetFilters = () => {
    setTypeFilter('All');
    setListingFilter('All');
    setQuery('');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Jamnagar Real Estate Listings
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white">
            Available Properties for Sale & Rent
          </h1>
          <p className="text-sm text-slate-400 mt-3">
            Browse verified residential plots, 2-3 BHK flats, commercial offices, and agricultural farmlands across Jamnagar.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-10 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Search query */}
            <div className="relative">
              <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search title or area (e.g. Kadiawad)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Property Type */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Property Types</option>
              <option value="Plot">Plot / Land</option>
              <option value="Flat">Apartment / Flat</option>
              <option value="Bungalow">Bungalow / Villa</option>
              <option value="Commercial">Commercial Shop</option>
              <option value="Land">Agricultural Farmland</option>
            </select>

            {/* Listing Type */}
            <select
              value={listingFilter}
              onChange={(e) => setListingFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400"
            >
              <option value="All">Buy & Rent</option>
              <option value="Sale">For Sale</option>
              <option value="Rent">For Rent</option>
            </select>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs py-3 px-4 rounded-xl border border-slate-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span>
              Showing <strong className="text-amber-400">{filteredProperties.length}</strong> properties
            </span>
            <span className="hidden sm:inline">Direct WhatsApp inquiry on all listings</span>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-slate-900 h-96 rounded-2xl animate-pulse border border-slate-800"></div>
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white font-serif">No Matching Properties Found</h3>
            <p className="text-xs text-slate-400 mt-2 mb-6">
              Try adjusting your search keywords or filters to see available listings in Jamnagar.
            </p>
            <button
              onClick={resetFilters}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} settings={settings} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
