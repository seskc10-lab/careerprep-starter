import { NextResponse } from 'next/server';
import { getReportById } from '@/lib/db/reports';
import { isDemoMode } from '@/lib/demo';

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const demoMode = isDemoMode();

  if (demoMode) {
    const preview = {
      match_score: 82,
      match_band: 'Strong',
      summary_verdict:
        'This demo candidate looks broadly aligned with the role. The clearest gains would come from sharper quantified achievements, cleaner role targeting, and tighter interview examples.',
      top_strengths: [
        'Relevant experience is visible early',
        'Clear delivery and stakeholder themes',
        'Enough substance for strong STAR stories',
      ],
      top_gaps: [
        'Bullets need more measurable outcomes',
        'Role-specific keywords are still light',
        'Summary could signal fit faster',
      ],
      cv_rewrites: [
        {
          section: 'Professional Summary',
          issue: 'The opening does not show fit quickly enough',
          original:
            'Experienced professional with a background in collaborative delivery roles.',
          rewrite:
            'Outcome-focused professional with experience delivering cross-functional work, improving execution quality, and communicating clearly with stakeholders in fast-moving teams.',
          reason:
            'This version is more specific, more employer-facing, and signals relevance sooner.',
        },
      ],
      interview_questions: [
        {
          question:
            'Tell me about a time you improved a process that was slowing the team down.',
          why_likely: 'The role signals ownership and operational judgement.',
          answer_framework: ['Situation', 'Problem', 'Action', 'Result'],
          risk_level: 'standard',
        },
      ],
    };

    const full = {
      ...preview,
      job_requirements: {
        must_have: [
          'Relevant functional experience',
          'Stakeholder communication',
          'Problem solving',
          'Execution under deadlines',
        ],
        nice_to_have: [
          'Leadership exposure',
          'Process improvement',
          'Industry tooling familiarity',
        ],
        seniority_cues: ['Ownership of workstreams', 'Cross-functional influence'],
        hidden_expectations: ['Clear written communication', 'Commercial awareness'],
      },
      cv_critique: {
        strongest_areas: [
          'Readable career history',
          'Clear role progression',
          'Transferable experience is present',
        ],
        weakest_areas: [
          'Impact metrics are too light',
          'Summary is generic',
          'Skills section is not tailored enough',
        ],
        missing_evidence: ['More quantified outcomes', 'Stronger examples of ownership'],
        weak_phrasing: ['Responsible for', 'Helped with'],
      },
      keyword_gaps: [
        'stakeholder management',
        'project delivery',
        'cross-functional collaboration',
        'prioritisation',
        'process improvement',
        'commercial awareness',
      ],
      ats_notes: [
        'Mirror the target job title in your summary',
        'Use exact keyword phrasing from the job description where truthful',
        'Lead bullets with action and end with outcome',
      ],
      questions_to_ask: [
        'What does success look like in the first 90 days?',
        'What are the biggest priorities for this role this quarter?',
        'How does the team measure strong performance?',
        'What usually separates strong candidates from average ones here?',
      ],
      action_plan: {
        fix_now: [
          'Rewrite the summary for the exact target role',
          'Add measurable outcomes to recent bullets',
          'Tighten the skills section around the job description',
        ],
        fix_today: [
          'Prepare two strong STAR examples',
          'Refine answers for stakeholder and prioritisation questions',
          'Tailor headline language to the target role',
        ],
        fix_this_week: [
          'Run another role-specific mock application review',
          'Improve LinkedIn headline and summary to match',
          'Build a stronger quantified evidence bank',
        ],
      },
    };

    return NextResponse.json({
      report: {
        id,
        status: 'full_ready',
        preview_json: preview,
        full_json: full,
      },
      preview,
      full,
      unlocked: true,
      demoMode: true,
    });
  }

  const report = await getReportById(id);
  if (!report) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }

  const unlocked = report.status === 'paid' || report.status === 'full_ready';

  return NextResponse.json({
    report,
    preview: report.preview_json,
    full: report.full_json,
    unlocked,
    demoMode,
  });
}