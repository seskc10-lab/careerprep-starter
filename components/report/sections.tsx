import type { Report } from '@/types/report';
import { bandClass } from '@/lib/utils/format';

export function MatchSection({ report }: { report: Report }) {
  return <section id="match" className="report-section"><h2 className="h2">Match score</h2><p className="small muted">How well your CV aligns with this role.</p><div className="card"><div className={`badge ${bandClass(report.match_band)}`}>{report.match_band} match</div><div className="spaced" style={{alignItems:'flex-end',marginTop:8}}><div className="score">{report.match_score}</div><p style={{flex:1}}>{report.summary_verdict}</p></div></div></section>;
}

export function RequirementsSection({ report }: { report: Report }) {
  return <section id="requirements" className="report-section"><h2 className="h2">Job requirements</h2><div className="grid-2"><div className="card"><strong>Must-have</strong><ul>{report.job_requirements.must_have.map((x)=><li key={x}>{x}</li>)}</ul></div><div className="card"><strong>Nice-to-have</strong><ul>{report.job_requirements.nice_to_have.map((x)=><li key={x}>{x}</li>)}</ul></div></div></section>;
}

export function CritiqueSection({ report }: { report: Report }) {
  return <section id="critique" className="report-section"><h2 className="h2">CV critique</h2><div className="grid-2"><div className="card"><strong>Strongest areas</strong><ul>{report.cv_critique.strongest_areas.map((x)=><li key={x}>{x}</li>)}</ul></div><div className="card"><strong>Weakest areas</strong><ul>{report.cv_critique.weakest_areas.map((x)=><li key={x}>{x}</li>)}</ul></div></div></section>;
}

export function RewritesSection({ report }: { report: Report }) {
  return <section id="rewrites" className="report-section"><h2 className="h2">CV rewrites</h2>{report.cv_rewrites.map((rw)=><div className="card" key={rw.section+rw.original} style={{marginBottom:12}}><div className="eyebrow">{rw.section}</div><p><strong>Issue:</strong> {rw.issue}</p><div className="notice error" style={{marginBottom:8}}>{rw.original}</div><div className="notice success">{rw.rewrite}</div><p className="small muted" style={{marginTop:10}}>{rw.reason}</p></div>)}</section>;
}

export function KeywordsSection({ report }: { report: Report }) {
  return <section id="keywords" className="report-section"><h2 className="h2">Keywords & ATS</h2><div className="card"><div style={{marginBottom:8}}>{report.keyword_gaps.map((x)=><span className="tag" key={x}>{x}</span>)}</div><ul>{report.ats_notes.map((x)=><li key={x}>{x}</li>)}</ul></div></section>;
}

export function QuestionsSection({ report }: { report: Report }) {
  return <section id="questions" className="report-section"><h2 className="h2">Interview questions</h2>{report.interview_questions.map((q)=><div className="card" key={q.question} style={{marginBottom:12}}><div className="spaced"><strong>{q.question}</strong><span className={`badge ${q.risk_level==='tricky'?'weak':'strong'}`}>{q.risk_level}</span></div><p className="small muted">{q.why_likely}</p><div className="row">{q.answer_framework.map((x)=><span className="tag" key={x}>{x}</span>)}</div></div>)}<div className="card"><strong>Questions to ask them</strong><ul>{report.questions_to_ask.map((x)=><li key={x}>{x}</li>)}</ul></div></section>;
}

export function ActionPlanSection({ report }: { report: Report }) {
  return <section id="actions" className="report-section"><h2 className="h2">Action plan</h2><div className="grid-3"><div className="card"><strong>Fix now</strong><ul>{report.action_plan.fix_now.map((x)=><li key={x}>{x}</li>)}</ul></div><div className="card"><strong>Fix today</strong><ul>{report.action_plan.fix_today.map((x)=><li key={x}>{x}</li>)}</ul></div><div className="card"><strong>This week</strong><ul>{report.action_plan.fix_this_week.map((x)=><li key={x}>{x}</li>)}</ul></div></div></section>;
}
