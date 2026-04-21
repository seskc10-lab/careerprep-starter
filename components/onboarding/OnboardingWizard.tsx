'use client';

import { useState } from 'react';
import { Button } from '@/components/shared/Button';
import type { OnboardingProfile } from '@/types/onboarding';

const STAGES = ['Applying now', 'Got an interview', 'Changing careers', 'Just exploring'];
const EXPERIENCE = ['Student / Graduate', 'Early career (1–3 yrs)', 'Mid-level (3–7 yrs)', 'Senior (7+ yrs)'];
const STRUGGLES = ['Not getting interviews', 'Weak CV', 'Unsure what roles fit', 'Interview anxiety', 'Career change', 'Salary negotiation'];
const ROLES = ['Software Engineer', 'Product Manager', 'UX / Product Designer', 'Data Analyst', 'Marketing Manager', 'Operations Manager', 'Finance Analyst', 'HR Manager', 'Sales Executive', 'Project Manager', 'Business Analyst', 'Consultant', 'Other'];

export function OnboardingWizard({ onComplete }: { onComplete: (profile: OnboardingProfile) => void }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<OnboardingProfile>({
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  stage: '',
  targetRole: '',
  experience: '',
  struggle: '',
});

  const update = (key: keyof OnboardingProfile, value: string) => setProfile((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="card">
      <div className="eyebrow">Step {step} of 3</div>
      {step === 1 && (
        <>
          <h2 className="h2" style={{ marginBottom: 16 }}>Tell us about you</h2>
          <div className="field"><label>Name</label><input type="text" value={profile.name} onChange={(e) => update('name', e.target.value)} /></div>
          <div className="field"><label>Email</label><input type="email" value={profile.email} onChange={(e) => update('email', e.target.value)} /></div>
          <Button className="btn-rust" disabled={!profile.name || !profile.email.includes('@')} onClick={() => setStep(2)}>Continue →</Button>
        </>
      )}
      {step === 2 && (
        <>
          <h2 className="h2" style={{ marginBottom: 16 }}>What are you aiming for?</h2>
          <div className="field"><label>Current stage</label><div className="pills">{STAGES.map((s) => <button key={s} type="button" className={`pill ${profile.stage === s ? 'on' : ''}`} onClick={() => update('stage', s)}>{s}</button>)}</div></div>
          <div className="field"><label>Target role</label><select value={profile.targetRole} onChange={(e) => update('targetRole', e.target.value)}><option value="">Choose role…</option>{ROLES.map((r) => <option key={r}>{r}</option>)}</select></div>
          <div className="field"><label>Experience level</label><div className="pills">{EXPERIENCE.map((s) => <button key={s} type="button" className={`pill ${profile.experience === s ? 'on' : ''}`} onClick={() => update('experience', s)}>{s}</button>)}</div></div>
          <div className="row"><Button className="btn-outline" onClick={() => setStep(1)}>← Back</Button><Button className="btn-rust" disabled={!profile.stage || !profile.targetRole || !profile.experience} onClick={() => setStep(3)}>Continue →</Button></div>
        </>
      )}
      {step === 3 && (
        <>
          <h2 className="h2" style={{ marginBottom: 16 }}>What is the biggest challenge right now?</h2>
          <div className="field"><div className="pills">{STRUGGLES.map((s) => <button key={s} type="button" className={`pill ${profile.struggle === s ? 'on' : ''}`} onClick={() => update('struggle', profile.struggle === s ? '' : s)}>{s}</button>)}</div></div>
          <div className="row"><Button className="btn-outline" onClick={() => setStep(2)}>← Back</Button><Button className="btn-rust" onClick={() => onComplete(profile)}>Continue to analysis →</Button></div>
        </>
      )}
    </div>
  );
}
