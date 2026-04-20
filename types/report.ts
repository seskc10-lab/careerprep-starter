export type ReportBand = 'Weak' | 'Moderate' | 'Strong';
export type RiskLevel = 'standard' | 'tricky';

export interface Report {
  match_score: number;
  match_band: ReportBand;
  summary_verdict: string;
  top_strengths: string[];
  top_gaps: string[];
  job_requirements: {
    must_have: string[];
    nice_to_have: string[];
    seniority_cues: string[];
    hidden_expectations: string[];
  };
  cv_critique: {
    strongest_areas: string[];
    weakest_areas: string[];
    missing_evidence: string[];
    weak_phrasing: string[];
  };
  cv_rewrites: Array<{
    section: string;
    issue: string;
    original: string;
    rewrite: string;
    reason: string;
  }>;
  keyword_gaps: string[];
  ats_notes: string[];
  interview_questions: Array<{
    question: string;
    why_likely: string;
    answer_framework: string[];
    risk_level: RiskLevel;
  }>;
  questions_to_ask: string[];
  action_plan: {
    fix_now: string[];
    fix_today: string[];
    fix_this_week: string[];
  };
}

export interface ReportRecord {
  id: string;
  user_id?: string | null;
  owner_email?: string | null;
  company_name?: string | null;
  interview_date?: string | null;
  cv_text: string;
  job_description: string;
  preview_json: Partial<Report>;
  full_json?: Report | null;
  status: 'preview_ready' | 'payment_pending' | 'paid' | 'full_ready' | 'failed';
  created_at: string;
  updated_at: string;
}
