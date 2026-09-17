import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('business_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      // Default fallback
      const defaultSettings = {
        whatsapp_number: '918155050343',
        phone: '+91 81550 50343',
        email: 'pabari.realestate@gmail.com',
        email: 'pabari.realestate@gmail.com',
        address: 'Near Bharat Bakery, Jamnagar Road, Kadiawad, Grain Market, Jamnagar - 361001, Gujarat',
        business_hours: 'Mon - Sat: 9:30 AM - 8:30 PM (Sunday Closed)'
      };

      return res.status(200).json(data || defaultSettings);
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const { whatsapp_number, phone, email, address, business_hours } = req.body;

      // Check if existing record
      const { data: existing } = await supabase.from('business_settings').select('id').limit(1);

      let result;
      if (existing && existing.length > 0) {
        result = await supabase
          .from('business_settings')
          .update({ whatsapp_number, phone, email, address, business_hours })
          .eq('id', existing[0].id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('business_settings')
          .insert([{ whatsapp_number, phone, email, address, business_hours }])
          .select()
          .single();
      }

      if (result.error) throw result.error;
      return res.status(200).json(result.data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Settings Error:', err);
    res.status(500).json({ error: err.message });
  }
}
