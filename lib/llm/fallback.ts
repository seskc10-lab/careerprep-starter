import type { Report } from '@/types/report';

export const fallbackReport: Report = {
  match_score: 68,
  match_band: 'Moderate',
  summary_verdict: 'You have relevant experience for this role, but the CV currently undersells your achievements and misses several role-specific signals recruiters screen for.',
  top_strengths: ['Relevant domain experience is visible', 'The CV shows ownership of deliverables', 'Transferable communication and collaboration skills'],
  top_gaps: ['Quantified outcomes are missing', 'Several role-specific keywords are absent', 'The professional summary is too generic'],
  job_requirements: {
    must_have: ['Relevant domain experience', 'Strong communication skills', 'Problem-solving ability', 'Team collaboration'],
    nice_to_have: ['Industry certification', 'Advanced tooling knowledge', 'Leadership exposure'],
    seniority_cues: ['End-to-end ownership', 'Stakeholder management'],
    hidden_expectations: ['Proactive communication', 'Data-informed decisions'],
  },
  cv_critique: {
    strongest_areas: ['Clear role history', 'Relevant titles are visible', 'Education is easy to scan'],
    weakest_areas: ['Bullets lack measurable impact', 'Summary is vague', 'Skills section is generic'],
    missing_evidence: ['No percentages, revenue, volume, or timing metrics', 'Few examples of cross-functional work'],
    weak_phrasing: ['Responsible for…', 'Helped with…'],
  },
  cv_rewrites: [
    {
      section: 'Professional Summary',
      issue: 'Too generic — does not signal fit fast enough.',
      original: 'Experienced professional with a track record across different environments.',
      rewrite: 'Results-driven professional with 5+ years delivering measurable impact in fast-moving teams, with proven ownership of cross-functional work and stakeholder communication.',
      reason: 'It leads with value, gives a clearer level signal, and sounds role-relevant instead of generic.'
    },
    {
      section: 'Work Experience Bullet',
      issue: 'The bullet describes activity, not impact.',
      original: 'Managed a team and improved internal processes.',
      rewrite: 'Led a team of 6 to redesign internal workflows, cutting turnaround time by 30% and improving delivery consistency across two departments.',
      reason: 'This version shows scope, action, and measurable outcome.'
    },
    {
      section: 'Skills Section',
      issue: 'The skills are too broad to help ATS or recruiters.',
      original: 'Communication, teamwork, Microsoft Office.',
      rewrite: 'Stakeholder management · Cross-functional collaboration · Data analysis · Project ownership',
      reason: 'These terms are more specific and more likely to match the job description.'
    }
  ],
  keyword_gaps: ['cross-functional collaboration', 'stakeholder management', 'KPIs', 'continuous improvement', 'ownership', 'data-driven'],
  ats_notes: ['Use the exact job title from the JD in your summary', 'Add hard skills from the JD verbatim where truthful', 'Avoid tables and text boxes in the final CV'],
  interview_questions: [
    { question: 'Tell me about a time you handled competing priorities under pressure.', why_likely: 'The role requires balancing deadlines and judgement.', answer_framework: ['Situation', 'Task', 'Action', 'Result'], risk_level: 'standard' },
    { question: 'Describe influencing without formal authority.', why_likely: 'Stakeholder management is a visible requirement.', answer_framework: ['Context', 'Challenge', 'Approach', 'Outcome'], risk_level: 'standard' },
    { question: 'What is your biggest professional failure and what changed afterwards?', why_likely: 'This tests self-awareness and learning speed.', answer_framework: ['What happened', 'Your role', 'What changed', 'Lesson applied'], risk_level: 'tricky' },
    { question: 'Why are you leaving your current role?', why_likely: 'This is a standard screen for motivation and risk.', answer_framework: ['Positive framing', 'Growth reason', 'Why this role'], risk_level: 'tricky' },
    { question: 'Walk me through a project you are proud of.', why_likely: 'This is often the best window into your real evidence.', answer_framework: ['Scope', 'Your role', 'Execution', 'Outcome'], risk_level: 'standard' },
    { question: 'How do you prioritise when everything feels urgent?', why_likely: 'The role likely involves pressure and trade-offs.', answer_framework: ['Framework', 'Example', 'Outcome'], risk_level: 'standard' },
    { question: 'Tell me about disagreeing with a manager.', why_likely: 'This tests maturity and judgement.', answer_framework: ['Disagreement', 'How you raised it', 'Resolution', 'Learning'], risk_level: 'tricky' },
    { question: 'Where do you see yourself in 3–5 years?', why_likely: 'This tests ambition alignment and retention.', answer_framework: ['Near-term growth', 'Long-term direction', 'Fit with role'], risk_level: 'standard' }
  ],
  questions_to_ask: ['What does success look like after 90 days?', 'What are the biggest challenges the team is facing?', 'How do you support professional development?', 'How does this role usually grow over time?'],
  action_plan: {
    fix_now: ['Add measurable results to your last 3 roles', 'Rewrite your summary for this specific role', 'Add missing JD keywords naturally'],
    fix_today: ['Prepare a 2-minute “tell me about yourself” answer', 'Write 3 STAR examples', 'Research the employer’s recent priorities'],
    fix_this_week: ['Practise the likely interview questions aloud', 'Update LinkedIn to match the revised CV', 'Prepare 4 smart questions for the interviewer'],
  },
};
