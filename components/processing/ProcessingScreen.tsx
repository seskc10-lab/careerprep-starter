export function ProcessingScreen() {
  return (
    <div className="loading">
      <div className="spinner" />
      <h2 className="h2">Analysing your application</h2>
      <p className="muted">Reading the CV, extracting role signals, comparing fit, and preparing the free preview…</p>
    </div>
  );
}
