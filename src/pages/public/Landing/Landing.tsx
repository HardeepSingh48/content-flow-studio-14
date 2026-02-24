import React, { lazy, Suspense } from 'react';
import { PublicNavbar } from '@/components/public-layout/PublicNavbar';
import { PublicFooter } from '@/components/public-layout/PublicFooter';
import { ScrollytellingHero } from './sections/ScrollytellingHero';

const Features = lazy(() => import('./sections/Features'));
const Showcase = lazy(() => import('./sections/Showcase').then(module => ({ default: module.Showcase })));
const Integrations = lazy(() => import('./sections/Integrations'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const PricingPreview = lazy(() => import('./sections/PricingPreview'));
const FinalCTA = lazy(() => import('./sections/FinalCTA'));

const LoadingFallback = () => (
  <div style={{ padding: '80px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{
      width: 28, height: 28, border: '2px solid rgba(139,92,246,0.3)',
      borderTopColor: '#8B5CF6', borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export const Landing = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0A0E27' }}>
      <PublicNavbar />
      <main style={{ flex: 1 }}>
        <ScrollytellingHero />
        <Suspense fallback={<LoadingFallback />}>
          <Showcase />
          <Features />
          <Integrations />
          {/* <Testimonials /> */}
          <PricingPreview />
          <FinalCTA />
        </Suspense>
      </main>
      <PublicFooter />
    </div>
  );
};

export default Landing;
