import { CTASection } from '@components/landing/CTASection.jsx';
import { ExperienceSection } from '@components/landing/ExperienceSection.jsx';
import { FeatureSection } from '@components/landing/FeatureSection.jsx';
import { HeroSection } from '@components/landing/HeroSection.jsx';
import { Navbar } from '@components/landing/Navbar.jsx';
import { PreviewSection } from '@components/landing/PreviewSection.jsx';

export function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <HeroSection />
        <PreviewSection />
        <FeatureSection />
        <ExperienceSection />
        <CTASection />
      </main>
    </div>
  );
}
