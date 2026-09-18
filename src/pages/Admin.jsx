import { useState, useEffect } from 'react';
import { Building2, Plus, Edit, Trash2, Check, X, Shield, Phone, MessageSquare, MapPin, Eye, LogOut } from 'lucide-react';
import supabase from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Admin({ settings, onSettingsUpdated }) {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('properties'); // 'properties' | 'inquiries' | 'settings'
  const [loading, setLoading] = useState(true);

  // Form State for Property Create/Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    property_type: 'Plot',
    listing_type: 'Sale',
    location: '',
    area_sqft: '',
    bedrooms: '',
    bathrooms: '',
    image_url: '/images/property-plot.jpg',
    featured: false,
    reference_code: '',
  });

  // Form State for Settings
  const [settingsForm, setSettingsForm] = useState({
    whatsapp_number: settings?.whatsapp_number || '918155050343',
    phone: settings?.phone || '+91 81550 50343',
    email: settings?.email || 'pabari.realestate@gmail.com',
    address: settings?.address || 'Near Bharat Bakery, Jamnagar Road, Kadiawad, Grain Market, Jamnagar - 361001, Gujarat',
    business_hours: settings?.business_hours || 'Mon - Sat: 9:30 AM - 8:30 PM',
  });
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Synchronize form values whenever settings are loaded from the database
  useEffect(() => {
    if (settings) {
      setSettingsForm({
        whatsapp_number: settings.whatsapp_number || '',
        phone: settings.phone || '',
        email: settings.email || '',
        address: settings.address || '',
        business_hours: settings.business_hours || '',
      });
    }
  }, [settings]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProp, resInq] = await Promise.all([
        fetch('/api/properties'),
        fetch('/api/inquiries'),
      ]);
      const dataProp = await resProp.json();
      const dataInq = await resInq.json();

      setProperties(dataProp || []);
      setInquiries(dataInq || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Handle Property Save
  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch('/api/properties', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setIsFormOpen(false);
        setEditingId(null);
        resetPropertyForm();
        fetchData();
      }
    } catch (err) {
      console.error('Save property error:', err);
    }
  };

  const resetPropertyForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      property_type: 'Plot',
      listing_type: 'Sale',
      location: '',
      area_sqft: '',
      bedrooms: '',
      bathrooms: '',
      image_url: '/images/property-plot.jpg',
      featured: false,
      reference_code: '',
    });
  };

  const handleEditProperty = (prop) => {
    setEditingId(prop.id);
    setFormData({
      title: prop.title || '',
      description: prop.description || '',
      price: prop.price || '',
      property_type: prop.property_type || 'Plot',
      listing_type: prop.listing_type || 'Sale',
      location: prop.location || '',
      area_sqft: prop.area_sqft || '',
      bedrooms: prop.bedrooms || '',
      bathrooms: prop.bathrooms || '',
      image_url: prop.image_url || '/images/property-plot.jpg',
      featured: prop.featured || false,
      reference_code: prop.reference_code || '',
    });
    setIsFormOpen(true);
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property listing?')) return;
    try {
      const res = await fetch('/api/properties', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error('Delete property error:', err);
    }
  };

  // Handle Settings Save
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSettingsSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm),
      });
      if (res.ok) {
        setSettingsSuccess(true);
        if (onSettingsUpdated) onSettingsUpdated();
        setTimeout(() => setSettingsSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Save settings error:', err);
    } finally {
      setSettingsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif text-white">Admin Dashboard</h1>
              <p className="text-xs text-slate-400">
                Logged in as: <span className="text-amber-400 font-mono">{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                resetPropertyForm();
                setEditingId(null);
                setIsFormOpen(true);
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Property Listing</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-3 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'properties' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            Property Listings ({properties.length})
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'inquiries' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            Inquiries Received ({inquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            Business & WhatsApp Settings
          </button>
        </div>

        {/* TAB 1: PROPERTIES */}
        {activeTab === 'properties' && (
          <div>
            {loading ? (
              <div className="text-center py-12 text-slate-400 text-xs">Loading listings...</div>
            ) : properties.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center">
                <p className="text-slate-400 text-sm">No properties in database yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Property</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Featured</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {properties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-4 flex items-center space-x-3">
                          <img src={prop.image_url} alt="" className="w-12 h-10 object-cover rounded-lg shrink-0" />
                          <div>
                            <span className="font-bold text-white block">{prop.title}</span>
                            <span className="text-[10px] text-slate-500 font-mono">Ref: #{prop.reference_code || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-slate-950 px-2 py-1 rounded text-[11px] border border-slate-800">
                            {prop.property_type} ({prop.listing_type})
                          </span>
                        </td>
                        <td className="p-4 font-bold text-amber-400 font-serif">{prop.price}</td>
                        <td className="p-4">{prop.location}</td>
                        <td className="p-4">
                          {prop.featured ? (
                            <span className="text-amber-400 font-bold">Yes ⭐</span>
                          ) : (
                            <span className="text-slate-500">No</span>
                          )}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleEditProperty(prop)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(prop.id)}
                            className="p-1.5 bg-slate-800 hover:bg-red-500 text-slate-300 hover:text-white rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div>
            {inquiries.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center">
                <p className="text-slate-400 text-sm">No client inquiries received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">{inq.client_name}</h4>
                        <p className="text-xs text-amber-400 font-mono">📞 {inq.client_phone} {inq.client_email ? `| ✉️ ${inq.client_email}` : ''}</p>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {new Date(inq.created_at).toLocaleString()}
                      </span>
                    </div>

                    {inq.property_title && (
                      <div className="text-xs text-slate-300 font-semibold bg-slate-950 p-2 rounded-lg border border-slate-800">
                        Inquiry Property: {inq.property_title}
                      </div>
                    )}

                    <p className="text-xs text-slate-400 whitespace-pre-line leading-relaxed">
                      {inq.message || 'No additional note provided.'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl max-w-2xl space-y-6">
            <h3 className="text-lg font-bold text-white font-serif border-l-2 border-amber-400 pl-3">
              Configure Business & WhatsApp API Contact Info
            </h3>

            {settingsSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3 rounded-xl">
                Settings saved successfully! WhatsApp integration updated across website.
              </div>
            )}

            <form onSubmit={handleSettingsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  WhatsApp Business API Number (Format: 919876543210 without +)
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.whatsapp_number}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number Display</label>
                <input
                  type="text"
                  required
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Business Email</label>
                <input
                  type="email"
                  required
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Office Address</label>
                <textarea
                  rows={2}
                  required
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Business Hours</label>
                <input
                  type="text"
                  required
                  value={settingsForm.business_hours}
                  onChange={(e) => setSettingsForm({ ...settingsForm, business_hours: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={settingsSaving}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition-all"
              >
                {settingsSaving ? 'Saving Settings...' : 'Save Settings'}
              </button>
            </form>
          </div>
        )}

      </div>

      {/* CREATE / EDIT PROPERTY MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/30 w-full max-w-2xl rounded-2xl shadow-2xl p-6 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white font-serif">
                {editingId ? 'Edit Property Listing' : 'Add New Property Listing'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePropertySubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Property Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1200 Sq Ft NA Residential Plot"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Price *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹28,00,000 or ₹18,000/mo"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Property Type</label>
                  <select
                    value={formData.property_type}
                    onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Plot">Plot</option>
                    <option value="Flat">Flat / Apartment</option>
                    <option value="Bungalow">Bungalow / Villa</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Agricultural Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Listing Type</label>
                  <select
                    value={formData.listing_type}
                    onChange={(e) => setFormData({ ...formData, listing_type: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Sale">Sale</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Reference Code</label>
                  <input
                    type="text"
                    placeholder="e.g. PBR-101"
                    value={formData.reference_code}
                    onChange={(e) => setFormData({ ...formData, reference_code: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Location / Area *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kadiawad or Khodiyar Colony"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Area SqFt / Vigha</label>
                  <input
                    type="text"
                    placeholder="e.g. 1500 Sq Ft"
                    value={formData.area_sqft}
                    onChange={(e) => setFormData({ ...formData, area_sqft: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Bedrooms (If applicable)</label>
                  <input
                    type="number"
                    placeholder="e.g. 3"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Bathrooms (If applicable)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Property Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide detailed information regarding location advantage, legal permissions, road width, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                />
                <label htmlFor="featured" className="text-slate-300 font-semibold cursor-pointer">
                  Mark as Featured Property on Homepage
                </label>
              </div>

              <div className="pt-3 flex justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2 rounded-xl"
                >
                  {editingId ? 'Update Listing' : 'Create Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
