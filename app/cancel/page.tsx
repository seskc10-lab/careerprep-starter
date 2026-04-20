import Link from 'next/link';
import { Nav } from '@/components/shell/Nav';
import { Button } from '@/components/shared/Button';

export default function CancelPage() {
  return (
    <div>
      <Nav />
      <div className="wrap-sm" style={{ padding: '56px 24px' }}>
        <div className="card">
          <h1 className="h1">Checkout cancelled</h1>
          <p className="muted">No charge was made. You can return to the preview whenever you want.</p>
          <Link href="/analyze"><Button className="btn-outline">Back to analysis</Button></Link>
        </div>
      </div>
    </div>
  );
}
