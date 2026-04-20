import { Nav } from '@/components/shell/Nav';
import { LandingHero } from '@/components/landing/LandingHero';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { HowItWorks } from '@/components/landing/HowItWorks';

export default function HomePage() {
  return (
    <div>
      <Nav />
      <LandingHero />
      <FeatureGrid />
      <HowItWorks />
    </div>
  );
}
