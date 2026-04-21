import Link from 'next/link';
import { Button } from '@/components/shared/Button';

export function LandingHero() {
  return (
    <section className="hero wrap">
      <div className="eyebrow">AI Interview Prep</div>
<h1 className="display">Turn your CV into interview answers.</h1>
<p className="hero-sub">Upload your CV, paste the job description, and get a tailored interview report with likely questions, stronger examples, and a clear action plan.</p>
      <Link href="/analyze"><Button className="btn-rust">Start free analysis →</Button></Link>
    </section>
  );
}
