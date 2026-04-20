import Link from 'next/link';

export function Nav({ right }: { right?: React.ReactNode }) {
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  return (
    <nav className="topnav">
      <div className="nav-left">
        <Link href="/" className="brand">Career<em>Prep</em></Link>
        {demoMode ? <span className="demo-badge">Demo mode</span> : null}
      </div>
      <div>{right}</div>
    </nav>
  );
}
