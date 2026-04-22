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

  const [cvText, setCvText] = useState(
    'Alex Morgan - Product Manager with 5 years of experience leading cross-functional teams, improving onboarding, retention, and internal workflows.'
  );
  const [jobDescription, setJobDescription] = useState(
    'Product Manager role focused on onboarding, internal tooling, process improvement, stakeholder communication, prioritisation, and measurable business outcomes.'
  );
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
      <Nav
        right={
          <Button className="btn-outline" onClick={() => { window.location.href = '/dashboard'; }}>
            Dashboard
          </Button>
        }
      />
      <div className="wrap" style={{ padding: '28px 24px 56px' }}>
        <AuthPanel />

        {stage === 'onboarding' && (
          <OnboardingWizard
            onComplete={(data) => {
              setProfile(data);
              setStage('input');
            }}
          />
        )}

        {stage === 'input' && (
          <>
            <ErrorBanner message={error} />

            <div className="notice info" style={{ marginBottom: 16 }}>
              Demo materials are loaded below. You can run the analysis immediately or edit any field first.
            </div>

            <div className="grid-2" style={{ marginBottom: 16 }}>
              <CvInputCard value={cvText} onChange={setCvText} />
              <JdInputCard value={jobDescription} onChange={setJobDescription} />
            </div>

            <JobMetaCard
              company={company}
              interviewDate={interviewDate}
              onCompany={setCompany}
              onInterviewDate={setInterviewDate}
            />

            <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button
                className="btn-rust"
                disabled={cvText.length < 80 || jobDescription.length < 60}
                onClick={analyze}
              >
                Run demo analysis &rarr;
              </Button>

              <Button
                className="btn-outline"
                onClick={() => {
                  setCvText(
                    'Alex Morgan - Product Manager with 5 years of experience leading cross-functional teams, improving onboarding, retention, and internal workflows.'
                  );
                  setJobDescription(
                    'Product Manager role focused on onboarding, internal tooling, process improvement, stakeholder communication, prioritisation, and measurable business outcomes.'
                  );
                  setCompany('Northstar Advisory');
                  setInterviewDate('25 April 2026');
                }}
              >
                Reset demo data
              </Button>
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
              <UpsellPanel onUpgrade={() => { setStage('paywall'); }} />
            </div>
          </div>
        )}

        {stage === 'paywall' && <CheckoutCard onCheckout={beginCheckout} />}
      </div>
    </div>
  );
}