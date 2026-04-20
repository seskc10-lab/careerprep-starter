import type { Report } from '@/types/report';

export function SampleRewriteCard({ report }: { report: Partial<Report> }) {
  const rewrite = report.cv_rewrites?.[0];
  if (!rewrite) return null;
  return (
    <div className="card section">
      <div className="eyebrow" style={{ marginBottom: 8 }}>Sample CV rewrite</div>
      <div style={{ marginBottom: 8, fontWeight: 700 }}>{rewrite.section}</div>
      <div className="notice error" style={{ marginBottom: 8 }}>{rewrite.original}</div>
      <div className="locked">
        <div className="notice success blur">{rewrite.rewrite}</div>
        <div className="overlay">Unlock to see the rewrite</div>
      </div>
    </div>
  );
}
