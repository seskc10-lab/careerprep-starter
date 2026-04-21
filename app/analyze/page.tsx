'use client';

import { useState } from 'react';
import { Nav } from '@/components/shell/Nav';
import { AuthPanel } from '@/components/shared/AuthPanel';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { CvInputCard } from '@/components/intake/CvInputCard';
import { JdInputCard } from '@/components/intake/JdInputCard';
import { JobMetaCard } from '@/components/intake/JobMetaCard';
import { ProcessingScreen } from '@/components/processing/ProcessingScreen';
import { MatchBanner } from '@/components/preview/MatchBanner';
import { StrengthGapCard } from '@/components/preview/StrengthGapCard';
import { SampleRewriteCard } from '@/components/preview/SampleRewriteCard';
import { InterviewPreviewCard } from '@/components/preview/InterviewPreviewCard';
import { UpsellPanel } from '@/components/preview/UpsellPanel';
import { CheckoutCard } from '@/components/paywall/CheckoutCard';
import { Button } from '@/components/shared/Button';
import { ErrorBanner } from '@/components/shared/ErrorBanner';
import { apiFetch } from '@/lib/api/client';
import type { OnboardingProfile } from '@/types/onboarding';
import type { PreviewResponse } from '@/types/api';
import type { Report } from '@/types/report';

export default function AnalyzePage() {
  const [stage, setStage] = useState<'onboarding' | 'input' | 'processing' | 'preview' | 'paywall'>('onboarding');
  const [profile, setProfile] = useState<OnboardingProfile | null>(null);
  const [cvText, setCvText] = useState(`Alex Morgan
Product Manager

Summary
Product manager with 5 years of experience leading cross-functional teams, improving customer journeys, and shipping digital products in fast-moving environments.

Experience
Senior Product Manager | Northstar Digital | 2022–Present
- Led roadmap prioritisation across onboarding and retention flows
- Partnered with design, engineering, and operations to launch process improvements
- Increased activation by 18% through funnel redesign and clearer user journeys

Product Manager | Brightloop | 2020–2022
- Owned discovery and delivery for internal workflow tools
- Reduced manual operational effort by introducing better process tracking
- Improved stakeholder reporting cadence and visibility across teams

Skills
Product strategy, stakeholder management, roadmap planning, process improvement, analytics, cross-functional leadership`);

const [jobDescription, setJobDescription] = useState(`Product Manager

We are looking for a product manager to lead initiatives across customer onboarding, internal tooling, and operational workflow improvement. You will work closely with design, engineering, and commercial stakeholders to identify priorities, improve processes, and deliver measurable business outcomes.

Key responsibilities:
- Own roadmap planning and prioritisation
- Improve internal and customer-facing processes
- Work cross-functionally with stakeholders across the business
- Translate business needs into clear product requirements
- Use data to identify opportunities and measure success

Requirements:
- Experience in product management
- Strong stakeholder communication
- Comfort working in fast-paced environments
- Ability to improve ambiguous or inefficient processes`);

const [company, setCompany] = useState('Northstar Advisory');
const [interviewDate, setInterviewDate] = useState('25 April 2026'); 
  const [reportId, setReportId] = useState<string>('');
  const [preview, setPreview] = useState<Partial<Report> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [storage, setStorage] = useState<string>('');

  async function analyze() {
    if (!profile) return;
    setStage('processing');
    setError(null);
    try {
      const response = await apiFetch<PreviewResponse>('/api/analyze/preview', {
        method: 'POST',
        body: JSON.stringify({ profile, cvText, jobDescription, company, interviewDate }),
      });
      setPreview(response.preview);
      setReportId(response.reportId);
      setStorage(response.storage);
      setStage('preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed.');
      setStage('input');
    }
  }

  async function beginCheckout() {
    const result = await apiFetch<{ url: string }>('/api/checkout/session', {
      method: 'POST',
      body: JSON.stringify({ reportId }),
    });
    window.location.href = result.url;
  }

  return (
    <div>
      <Nav right={<Button className="btn-outline" onClick={() => window.location.href = '/dashboard'}>Dashboard</Button>} />
      <div className="wrap" style={{ padding: '28px 24px 56px' }}>
        <AuthPanel />
        {stage === 'onboarding' && <OnboardingWizard onComplete={(data) => { setProfile(data); setStage('input'); }} />}
        {stage === 'input' && (
          <>
            <ErrorBanner message={error} />
            <div className="grid-2" style={{ marginBottom: 16 }}>
              <CvInputCard value={cvText} onChange={setCvText} />
              <JdInputCard value={jobDescription} onChange={setJobDescription} />
            </div>
            <JobMetaCard company={company} interviewDate={interviewDate} onCompany={setCompany} onInterviewDate={setInterviewDate} />
            <div style={{ marginTop: 16 }}>
              <Button className="btn-rust" disabled={cvText.length < 80 || jobDescription.length < 60} onClick={analyze}>Analyse my application &rarr;</Button>
            </div>
          </>
        )}
        {stage === 'processing' && <ProcessingScreen />}
        {stage === 'preview' && preview && (
          <div className="preview-grid">
            <div>
              <MatchBanner report={preview} />
              <StrengthGapCard report={preview} />
              <SampleRewriteCard report={preview} />
              <InterviewPreviewCard report={preview} />
              <div className="notice info">Report ID: {reportId} · Stored via {storage}</div>
            </div>
            <div>
              <UpsellPanel onUpgrade={() => setStage('paywall')} />
            </div>
          </div>
        )}
        {stage === 'paywall' && <CheckoutCard onCheckout={beginCheckout} />}
      </div>
    </div>
  );
}
