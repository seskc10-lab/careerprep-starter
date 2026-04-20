import { Button } from '@/components/shared/Button';

export function UpsellPanel({ onUpgrade }: { onUpgrade: () => void }) {
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  return (
    <div className="card" style={{ position: 'sticky', top: 80 }}>
      <h3 style={{ marginTop: 0 }}>Unlock your full report</h3>
      {demoMode ? <p className="small demo-note">Demo mode — no real payment will be taken.</p> : null}
      <ul className="report-list">
        <li>Complete CV rewrites</li>
        <li>Keyword gaps and ATS notes</li>
        <li>All interview questions with frameworks</li>
        <li>Action plan by urgency</li>
      </ul>
      <Button className="btn-gold" onClick={onUpgrade}>{demoMode ? 'Unlock demo report →' : 'Unlock for GBP 7.99 →'}</Button>
    </div>
  );
}
