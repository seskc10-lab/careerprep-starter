import { z } from 'zod';

export const reportSchema = z.object({
  match_score: z.number().int().min(0).max(100),
  match_band: z.enum(['Weak', 'Moderate', 'Strong']),
  summary_verdict: z.string(),
  top_strengths: z.array(z.string()),
  top_gaps: z.array(z.string()),
  job_requirements: z.object({
    must_have: z.array(z.string()),
    nice_to_have: z.array(z.string()),
    seniority_cues: z.array(z.string()),
    hidden_expectations: z.array(z.string()),
  }),
  cv_critique: z.object({
    strongest_areas: z.array(z.string()),
    weakest_areas: z.array(z.string()),
    missing_evidence: z.array(z.string()),
    weak_phrasing: z.array(z.string()),
  }),
  cv_rewrites: z.array(z.object({
    section: z.string(),
    issue: z.string(),
    original: z.string(),
    rewrite: z.string(),
    reason: z.string(),
  })),
  keyword_gaps: z.array(z.string()),
  ats_notes: z.array(z.string()),
  interview_questions: z.array(z.object({
    question: z.string(),
    why_likely: z.string(),
    answer_framework: z.array(z.string()),
    risk_level: z.enum(['standard', 'tricky']),
  })),
  questions_to_ask: z.array(z.string()),
  action_plan: z.object({
    fix_now: z.array(z.string()),
    fix_today: z.array(z.string()),
    fix_this_week: z.array(z.string()),
  }),
});

export const previewSchema = reportSchema.pick({
  match_score: true,
  match_band: true,
  summary_verdict: true,
  top_strengths: true,
  top_gaps: true,
  cv_rewrites: true,
  interview_questions: true,
});
