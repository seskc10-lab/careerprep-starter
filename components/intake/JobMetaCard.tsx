export function JobMetaCard({ company, interviewDate, onCompany, onInterviewDate }: { company: string; interviewDate: string; onCompany: (value: string) => void; onInterviewDate: (value: string) => void }) {
  return (
    <div className="card">
      <div className="grid-2">
        <div className="field"><label>Company (optional)</label><input type="text" value={company} onChange={(e) => onCompany(e.target.value)} placeholder="Spotify, NHS, Deloitte…" /></div>
        <div className="field"><label>Interview date (optional)</label><input type="text" value={interviewDate} onChange={(e) => onInterviewDate(e.target.value)} placeholder="25 April 2026" /></div>
      </div>
    </div>
  );
}
