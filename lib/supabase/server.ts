import { createClient } from '@supabase/supabase-js';
import { isDemoMode } from '@/lib/demo';

export function getServiceSupabase() {
  if (isDemoMode()) return null;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
