'use client';

const sections = [
  ['match', 'Match score'],
  ['requirements', 'Requirements'],
  ['critique', 'CV critique'],
  ['rewrites', 'Rewrites'],
  ['keywords', 'Keywords'],
  ['questions', 'Questions'],
  ['actions', 'Action plan'],
] as const;

export function ReportSidebar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand" style={{ color: '#fff', padding: '0 20px 14px' }}>Career<em>Prep</em></div>
      <h4>Sections</h4>
      {sections.map(([id, label]) => (
        <button key={id} className={`sidebtn ${active === id ? 'active' : ''}`} onClick={() => onSelect(id)}>{label}</button>
      ))}
    </aside>
  );
}
