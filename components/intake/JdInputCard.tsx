export function JdInputCard({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="card">
      <strong>Job Description</strong>
      <p className="small muted">Paste the full job posting — role overview, requirements, and responsibilities.</p>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder="Paste the job description here…" />
    </div>
  );
}
