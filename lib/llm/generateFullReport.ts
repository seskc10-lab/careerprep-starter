import type { ReportRecord } from '@/types/report';
import { isDemoMode } from '@/lib/demo';
import { getFullReportFallback } from '@/lib/mock/fullReportFallback';
import { fallbackReport } from './fallback';

export async function generateFullReport(report: ReportRecord) {
  if (isDemoMode()) return getFullReportFallback(report);

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) return fallbackReport;

  const prompt = `Return valid JSON only. Create a full interview-prep report for this CV and job description. CV: ${report.cv_text}. Job description: ${report.job_description}. Preview: ${JSON.stringify(report.preview_json)}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': anthropicKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 2600,
      system: 'You are a blunt senior recruiter and interview coach. Return strict JSON only using the full report schema.',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const json = await response.json();
  const text = json?.content?.map((b: { text?: string }) => b.text ?? '').join('') ?? '';
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}
