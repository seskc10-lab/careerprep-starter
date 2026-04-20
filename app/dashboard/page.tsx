'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Nav } from '@/components/shell/Nav';
import type { ReportRecord } from '@/types/report';
import { apiFetch } from '@/lib/api/client';

export default function DashboardPage() {
  const [reports, setReports] = useState<ReportRecord[]>([]);

  useEffect(() => {
    apiFetch<{ reports: ReportRecord[] }>('/api/me/reports').then((data) => setReports(data.reports)).catch(() => setReports([]));
  }, []);

  return (
    <div>
      <Nav right={<Link href="/analyze">New analysis</Link>} />
      <div className="wrap" style={{ padding: '40px 24px' }}>
        <h1 className="h1">Your reports</h1>
        <p className="muted">Saved previews and unlocked reports.</p>
        <div style={{ marginTop: 20 }}>
          {reports.length === 0 ? <div className="card">No saved reports yet.</div> : reports.map((report) => (
            <Link key={report.id} href={`/report/${report.id}`} className="list-card">
              <div className="spaced"><strong>{report.company_name || 'Untitled report'}</strong><span className={`badge ${report.status === 'full_ready' ? 'strong' : report.status === 'paid' ? 'moderate' : 'weak'}`}>{report.status}</span></div>
              <div className="small muted">{new Date(report.created_at).toLocaleString()}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
