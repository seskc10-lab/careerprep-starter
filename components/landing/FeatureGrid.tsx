const features = [
  { title: 'CV & Job Match', body: 'See how well your CV fits this role, what is missing, and what to fix first.' },
  { title: 'Targeted Rewrites', body: 'Get before-and-after rewrites that turn vague bullets into credible evidence.' },
  { title: 'Interview Prep', body: 'Unlock likely questions, answer frameworks, and a practical action plan.' },
];

export function FeatureGrid() {
  return (
    <section className="wrap" style={{ paddingBottom: 24 }}>
      <div className="grid-3">
        {features.map((feature) => (
          <div className="card feature-card" key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
