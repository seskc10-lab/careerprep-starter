import Link from 'next/link';
import { Nav } from '@/components/shell/Nav';
import { Button } from '@/components/shared/Button';

export default function PricingPage() {
  return (
    <div>
      <Nav />
      <div className="wrap-sm" style={{ padding: '56px 24px' }}>
        <div className="card">
          <div className="eyebrow">Pricing</div>
          <h1 className="h1">One payment. Full report.</h1>
          <p className="muted">Unlock the full report for £7.99. No subscription. No upsell maze.</p>
          <ul className="report-list">
            <li>All rewrites</li>
            <li>Keyword gaps and ATS notes</li>
            <li>Likely interview questions and frameworks</li>
            <li>Action plan by urgency</li>
          </ul>
          <Link href="/analyze"><Button className="btn-rust">Start free analysis →</Button></Link>
        </div>
      </div>
    </div>
  );
}
