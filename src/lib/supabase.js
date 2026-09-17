import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ihryrwkbalonkhaxorac.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_234_gx4K0L6a-oxBnaGPEg_wLOxeM9P';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
