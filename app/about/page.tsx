import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import { GoodAt, Plot } from '@/components/about/AboutSections';
import Shortcuts from '@/components/about/Shortcuts';

export const metadata: Metadata = {
  title: 'About — Umar Ali Butt',
  description: 'Self-taught Senior Product Designer from Islamabad — Web3, fintech & AI products, design systems and a lot of dashboards.',
};

export default function AboutPage() {
  return (
    <div className="bg-bone">
      <AboutHero />
      <Plot />
      <GoodAt />
      <Shortcuts />
    </div>
  );
}
