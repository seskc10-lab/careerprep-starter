'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiFetch } from '@/lib/api/client';
import type { ReportResponse } from '@/types/api';
import type { Report } from '@/types/report';
import { ReportSidebar } from '@/components/report/ReportSidebar';
import { MatchSection, RequirementsSection, CritiqueSection, RewritesSection, KeywordsSection, QuestionsSection, ActionPlanSection } from '@/components/report/sections';
import { Nav } from '@/components/shell/Nav';
import { MatchBanner } from '@/components/preview/MatchBanner';
import { StrengthGapCard } from '@/components/preview/StrengthGapCard';
import { InterviewPreviewCard } from '@/components/preview/InterviewPreviewCard';
import { UpsellPanel } from '@/components/preview/UpsellPanel';

export default function ReportPage() {
  const params = useParams<{ id: string }>();
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
  const [data, setData] = useState<ReportResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState('match');

  useEffect(() => {
    apiFetch<ReportResponse>(`/api/report/${params.id}`).then(setData).catch((err) => setError(err.message));
  }, [params.id]);

  const fullReport = useMemo(() => (data?.report.full_json ?? null) as Report | null, [data]);

  useEffect(() => {
    if (!demoMode || !data?.unlocked || fullReport) return;
    apiFetch<ReportResponse>(`/api/report/${params.id}/full`, { method: 'POST' })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [data?.unlocked, demoMode, fullReport, params.id]);

  useEffect(() => {
    function onScroll() {
      const ids = ['match', 'requirements', 'critique', 'rewrites', 'keywords', 'questions', 'actions'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 140) setActive(id);
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (error) return <div><Nav /><div className="wrap-sm" style={{ padding: '40px 24px' }}><div className="card">{error}</div></div></div>;
  if (!data) return <div><Nav /><div className="loading"><div className="spinner" /><div>Loading report...</div></div></div>;

  if (!data.unlocked || !fullReport) {
    return (
      <div>
        <Nav />
        <div className="wrap" style={{ padding: '28px 24px 56px' }}>
          <div className="preview-grid">
            <div>
              <MatchBanner report={data.report.preview_json} />
              <StrengthGapCard report={data.report.preview_json} />
              <InterviewPreviewCard report={data.report.preview_json} />
            </div>
            <div><UpsellPanel onUpgrade={() => { window.location.href = '/analyze'; }} /></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-layout">
      <ReportSidebar active={active} onSelect={(id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
      <main className="report-body">
        <MatchSection report={fullReport} />
        <RequirementsSection report={fullReport} />
        <CritiqueSection report={fullReport} />
        <RewritesSection report={fullReport} />
        <KeywordsSection report={fullReport} />
        <QuestionsSection report={fullReport} />
        <ActionPlanSection report={fullReport} />
      </main>
    </div>
  );
}
