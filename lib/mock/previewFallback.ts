import type { Report } from '@/types/report';

export const previewFallback: Report = {
  match_score: 82,
  match_band: 'Strong',
  summary_verdict: 'Demo mode generated a deterministic sample report. The candidate looks broadly aligned, with the biggest gains coming from clearer evidence, sharper keywords, and stronger interview stories.',
  top_strengths: [
    'Experience appears relevant to the target role',
    'Ownership and delivery themes are already visible',
    'The CV has enough substance to build stronger examples quickly',
  ],
  top_gaps: [
    'Bullets need quantified outcomes',
    'Several hiring-manager keywords are still missing',
    'The summary should signal role fit faster',
  ],
  job_requirements: {
    must_have: ['Relevant functional experience', 'Stakeholder communication', 'Problem solving', 'Execution under deadlines'],
    nice_to_have: ['Leadership exposure', 'Process improvement', 'Industry tooling familiarity'],
    seniority_cues: ['Cross-functional ownership', 'Evidence of decision making'],
    hidden_expectations: ['Calm communication', 'Structured prioritisation'],
  },
  cv_critique: {
    strongest_areas: ['Readable career history', 'Clear role progression', 'Transferable experience is present'],
    weakest_areas: ['Impact metrics are too light', 'Summary is generic', 'Skills section is not tailored enough'],
    missing_evidence: ['Percentages, volumes, and turnaround improvements', 'Concrete examples of stakeholder influence'],
    weak_phrasing: ['Responsible for', 'Assisted with', 'Worked on'],
  },
  cv_rewrites: [
    {
      section: 'Professional Summary',
      issue: 'The opening does not show fit quickly enough.',
      original: 'Experienced professional with a background in collaborative delivery roles.',
      rewrite: 'Outcome-focused professional with experience delivering cross-functional work, improving execution quality, and communicating clearly with stakeholders in fast-moving teams.',
      reason: 'This version leads with value, relevance, and stronger hiring signals.',
    },
    {
      section: 'Experience Bullet',
      issue: 'The bullet describes duties instead of results.',
      original: 'Managed internal reporting and supported project delivery.',
      rewrite: 'Owned internal reporting workflows and improved delivery visibility for stakeholders, helping the team spot risks earlier and respond faster.',
      reason: 'It sounds more senior and highlights impact rather than activity.',
    },
    {
      section: 'Skills',
      issue: 'The current skills list is too broad to help recruiters or ATS screening.',
      original: 'Communication, teamwork, organisation, Microsoft Office.',
      rewrite: 'Stakeholder management, workflow improvement, cross-functional coordination, written communication, reporting.',
      reason: 'These terms are more specific and closer to how hiring teams screen applications.',
    },
  ],
  keyword_gaps: ['stakeholder management', 'prioritisation', 'process improvement', 'cross-functional coordination', 'delivery ownership'],
  ats_notes: [
    'Mirror the target job title where accurate.',
    'Use exact JD wording for truthful hard skills.',
    'Keep the final CV simple and avoid complex layout elements.',
  ],
  interview_questions: [
    {
      question: 'Tell me about a time you improved a process that was slowing the team down.',
      why_likely: 'The role signals ownership and operational judgement.',
      answer_framework: ['Situation', 'Problem', 'Action', 'Result'],
      risk_level: 'standard',
    },
    {
      question: 'Describe a moment when you had to align different stakeholders with competing priorities.',
      why_likely: 'Communication and collaboration are central requirements.',
      answer_framework: ['Context', 'Conflict', 'Approach', 'Outcome'],
      risk_level: 'standard',
    },
    {
      question: 'What is the weakest part of your current application for this role?',
      why_likely: 'This tests self-awareness and how well prepared you are.',
      answer_framework: ['Acknowledge', 'Evidence', 'Improvement plan'],
      risk_level: 'tricky',
    },
    {
      question: 'How do you decide what to do first when several urgent requests arrive together?',
      why_likely: 'The job likely involves prioritisation under pressure.',
      answer_framework: ['Principles', 'Example', 'Outcome'],
      risk_level: 'standard',
    },
  ],
  questions_to_ask: [
    'What outcomes would define a strong first 90 days?',
    'Where does this role create the most leverage for the team?',
    'What tends to separate average performers from strong performers here?',
  ],
  action_plan: {
    fix_now: ['Add measurable outcomes to recent experience bullets', 'Rewrite the summary for the target role', 'Bring missing keywords into the CV naturally'],
    fix_today: ['Prepare two strong STAR stories', 'Draft a sharper answer to tell me about yourself', 'Review the employer and team context'],
    fix_this_week: ['Practise the likely interview questions aloud', 'Update LinkedIn to match the revised positioning', 'Refine examples that prove ownership and judgement'],
  },
};

export function getPreviewFallback() {
  return previewFallback;
}
