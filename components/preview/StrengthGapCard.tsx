import type { Report } from '@/types/report';

export function StrengthGapCard({ report }: { report: Partial<Report> }) {
  return (
    <div className="card section">
      <div className="grid-2">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Top strengths</div>
          <ul className="strengths">{report.top_strengths?.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Key gaps</div>
          <ul className="gaps">{report.top_gaps?.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
