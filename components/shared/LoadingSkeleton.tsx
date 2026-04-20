export function LoadingSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="card">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{ height: 14, background: '#ece8de', borderRadius: 6, marginBottom: 10, width: `${90 - i * 8}%` }} />
      ))}
    </div>
  );
}
