import { getServiceSupabase } from '@/lib/supabase/server';

export async function createUnlockRow(input: { reportId: string; userId?: string | null; stripeCheckoutSessionId?: string | null; paymentStatus: string }) {
  const supabase = getServiceSupabase();
  if (!supabase || !input.userId) return null;
  const { data } = await supabase.from('report_unlocks').insert({
    report_id: input.reportId,
    user_id: input.userId,
    payment_status: input.paymentStatus,
    stripe_checkout_session_id: input.stripeCheckoutSessionId ?? null,
  }).select('*').single();
  return data ?? null;
}
