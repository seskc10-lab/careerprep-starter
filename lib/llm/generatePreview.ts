import type { IntakeSchema } from '@/lib/validation/intakeSchema';
import { isDemoMode } from '@/lib/demo';
import { getPreviewFallback } from '@/lib/mock/previewFallback';
import { fallbackReport } from './fallback';

export async function generatePreview(input: IntakeSchema) {
  if (isDemoMode()) {
    return getPreviewFallback();
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return {
      match_score: fallbackReport.match_score,
      match_band: fallbackReport.match_band,
      summary_verdict: fallbackReport.summary_verdict,
      top_strengths: fallbackReport.top_strengths,
      top_gaps: fallbackReport.top_gaps,
      cv_rewrites: [fallbackReport.cv_rewrites[0]],
      interview_questions: fallbackReport.interview_questions.slice(0, 3),
    };
  }

  const prompt = `Return valid JSON only. Create a preview report for this candidate. Profile: ${JSON.stringify(input.profile)}. Company: ${input.company ?? ''}. Interview date: ${input.interviewDate ?? ''}. CV: ${input.cvText}. Job description: ${input.jobDescription}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': anthropicKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 1400,
      system: 'You are a senior recruiter. Return strict JSON preview only with keys: match_score, match_band, summary_verdict, top_strengths, top_gaps, cv_rewrites (first item only), interview_questions (3 items only).',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const json = await response.json();
  const text = json?.content?.map((b: { text?: string }) => b.text ?? '').join('') ?? '';
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}
