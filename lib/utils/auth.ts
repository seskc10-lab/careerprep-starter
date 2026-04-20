import { getServiceSupabase } from '@/lib/supabase/server';
import { isDemoMode } from '@/lib/demo';

export async function getOptionalUserFromRequest(request: Request) {
  if (isDemoMode()) return null;
  const auth = request.headers.get('authorization');
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return null;
  const supabase = getServiceSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}
