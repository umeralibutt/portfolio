import type { Metadata } from 'next';
import WorkGrid from '@/components/WorkGrid';
import Reveal from '@/components/Reveal';
import { Btn, Sticky } from '@/components/bits';

export const metadata: Metadata = {
  title: 'All work — Umar Ali Butt',
  description: 'Fintech, Web3, trading and AI products — plus concepts and Dribbble shots — designed by Umar Ali Butt.',
};

export default function WorkPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="hand-note kicker">everything i’ve shipped (and a few i dreamt up) ↓</p>
          <div className="page-title-row">
            <h1 className="pixel page-title">All work</h1>
            <Sticky color="var(--yellow)" rot={-6} hand className="pick-one">pick one, any one →</Sticky>
          </div>
        </div>
      </section>

      <section className="work-list">
        <div className="wrap">
          <WorkGrid />
        </div>
      </section>

      <Reveal className="work-cta">
        <div className="wrap">
          <h2 className="pixel cta-title">Got a messy dashboard?</h2>
          <p className="hand-note cta-sub">Send it over — I’ll tell you what I’d fix first.</p>
          <Btn href="/contact">Start a project</Btn>
        </div>
      </Reveal>
    </>
  );
}
