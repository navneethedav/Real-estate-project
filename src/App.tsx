import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';

import { handleGoogleRedirect } from './lib/googleAuth';

// Initialize Google OAuth redirect handler
handleGoogleRedirect();

export default function App() {
  const [settings, setSettings] = useState(null);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-950">
          <Navbar settings={settings} />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home settings={settings} />} />
              <Route path="/properties" element={<Properties settings={settings} />} />
              <Route path="/properties/:id" element={<PropertyDetail settings={settings} />} />
              <Route path="/about" element={<About settings={settings} />} />
              <Route path="/services" element={<Services settings={settings} />} />
              <Route path="/contact" element={<Contact settings={settings} />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin settings={settings} onSettingsUpdated={fetchSettings} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <WhatsAppButton settings={settings} />
          <Footer settings={settings} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
