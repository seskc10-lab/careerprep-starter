const steps = [
  'Paste or upload your CV',
  'Paste the full job description',
  'Get a free preview and unlock the full report',
];

export function HowItWorks() {
  return (
    <section className="wrap" style={{ paddingBottom: 56 }}>
      <div className="card">
        <div className="eyebrow" style={{ marginBottom: 12 }}>How it works</div>
        <div className="grid-3">
          {steps.map((step, index) => (
            <div key={step}>
              <div className="badge moderate" style={{ marginBottom: 8 }}>{index + 1}</div>
              <div>{step}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
