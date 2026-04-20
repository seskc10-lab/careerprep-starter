import Link from 'next/link';
import { Button } from '@/components/shared/Button';

export function LandingHero() {
  return (
    <section className="hero wrap">
      <div className="eyebrow">AI Interview Prep</div>
      <h1 className="display">Get interview-ready in minutes.</h1>
      <p className="hero-sub">Upload your CV, paste the job description, and get instant fit analysis, targeted rewrites, and tailored interview prep.</p>
      <Link href="/analyze"><Button className="btn-rust">Start free analysis →</Button></Link>
    </section>
  );
}
