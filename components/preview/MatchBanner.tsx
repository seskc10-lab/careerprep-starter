import type { Report } from '@/types/report';
import { bandClass } from '@/lib/utils/format';

export function MatchBanner({ report }: { report: Partial<Report> }) {
  const band = bandClass(report.match_band);
  return (
    <div className="card section">
      <div className={`badge ${band}`}>{report.match_band ?? 'Moderate'} match</div>
      <div className="spaced" style={{ alignItems: 'flex-end', marginTop: 8 }}>
        <div className="score">{report.match_score ?? 0}</div>
        <p style={{ flex: 1 }}>{report.summary_verdict}</p>
      </div>
    </div>
  );
}
