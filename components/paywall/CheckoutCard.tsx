'use client';

import { useState } from 'react';
import { Button } from '@/components/shared/Button';

export function CheckoutCard({ onCheckout }: { onCheckout: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  return (
    <div className="card wrap-sm" style={{ marginTop: 40 }}>
      <h2 className="h2">Unlock your full report</h2>
      <p className="muted">One-time payment. No subscription. Instant access after checkout.</p>
      {demoMode ? <p className="small demo-note">Demo mode — no real payment will be taken.</p> : null}
      <ul className="report-list">
        <li>Full report sections</li>
        <li>Complete rewrites</li>
        <li>Keyword gaps</li>
        <li>Interview frameworks</li>
      </ul>
      <Button className="btn-gold" disabled={loading} onClick={async () => { setLoading(true); try { await onCheckout(); } finally { setLoading(false); } }}>
        {loading ? 'Redirecting...' : demoMode ? 'Unlock demo report →' : 'Continue to checkout →'}
      </Button>
      <p className="small muted" style={{ marginTop: 12 }}>
        {demoMode ? 'Demo mode — no real payment will be taken.' : 'If Stripe is not configured, checkout runs in demo mode for local testing.'}
      </p>
    </div>
  );
}
