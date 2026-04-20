import type { Report } from '@/types/report';

export function InterviewPreviewCard({ report }: { report: Partial<Report> }) {
  return (
    <div className="card section">
      <div className="eyebrow" style={{ marginBottom: 8 }}>Likely interview questions</div>
      {(report.interview_questions ?? []).map((q, index) => (
        <div key={q.question} style={{ marginBottom: 12 }}>
          <strong>{index + 1}. {q.question}</strong>
          <div className="small muted">{q.why_likely}</div>
        </div>
      ))}
      <div className="locked">
        <div className="notice info blur">Unlock the full report for all questions, answer frameworks, keyword gaps, and the action plan.</div>
        <div className="overlay">Full report locked</div>
      </div>
    </div>
  );
}
