'use client';

import { createClient } from '@supabase/supabase-js';

let browserClient: ReturnType<typeof createClient> | null = null;

export function getBrowserSupabase() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!browserClient) browserClient = createClient(url, key);
  return browserClient;
}
