'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiFetch } from '@/lib/api/client';
import { Nav } from '@/components/shell/Nav';

export default function SuccessPage() {
  const params = useSearchParams();
  const reportId = params.get('reportId');
  const router = useRouter();
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
  const [message, setMessage] = useState(demoMode ? 'Demo mode active. Opening your report...' : 'Finalising your report...');

  useEffect(() => {
    if (!reportId) return;
    if (demoMode) {
      router.replace(`/report/${reportId}`);
      return;
    }

    apiFetch(`/api/report/${reportId}/full`, { method: 'POST' })
      .then(() => router.replace(`/report/${reportId}`))
      .catch(() => setMessage('Payment succeeded, but the full report is still being prepared. Refresh shortly.'));
  }, [demoMode, reportId, router]);

  return (
    <div>
      <Nav />
      <div className="wrap-sm" style={{ padding: '56px 24px' }}>
        <div className="card">
          <h1 className="h1">{demoMode ? 'Demo mode success' : 'Thanks - payment received'}</h1>
          <p className="muted">{message}</p>
        </div>
      </div>
    </div>
  );
}
