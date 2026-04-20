'use client';

import { getBrowserSupabase } from '@/lib/supabase/client';

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const supabase = getBrowserSupabase();
  const session = supabase ? await supabase.auth.getSession() : null;
  const headers = new Headers(init?.headers ?? {});
  headers.set('content-type', 'application/json');
  if (session?.data.session?.access_token) {
    headers.set('authorization', `Bearer ${session.data.session.access_token}`);
  }
  const response = await fetch(path, { ...init, headers });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }
  return response.json();
}
