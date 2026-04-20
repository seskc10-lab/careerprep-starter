import { getServiceSupabase } from '@/lib/supabase/server';
import type { OnboardingProfile } from '@/types/onboarding';

export async function upsertProfile(userId: string, profile: OnboardingProfile) {
  const supabase = getServiceSupabase();
  if (!supabase) return null;
  const payload = {
    id: userId,
    email: profile.email,
    name: profile.name,
    stage: profile.stage,
    target_role: profile.targetRole,
    experience_level: profile.experience,
    biggest_struggle: profile.struggle ?? null,
  };
  const { data } = await supabase.from('profiles').upsert(payload).select('*').single();
  return data ?? null;
}
