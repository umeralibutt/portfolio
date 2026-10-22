import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { site } from '@/lib/data';
import { Polaroid, Tape } from '@/components/bits';
import Torn from '@/components/Torn';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About — Umar Ali Butt',
  description: 'Product designer in Islamabad who designs apps, platforms, dashboards and brands — 5+ years across fintech, Web3 and AI.',
};

const steps = [
  { title: 'Untangle it', body: 'I map the messy flow first — every screen, state and dead end.', color: 'var(--yellow)', rot: 2 },
  { title: 'Sketch it ugly', body: 'Wireframes fast and rough, so we argue about ideas, not pixels.', color: 'var(--mint)', rot: -1.5 },
  { title: 'Make it obvious', body: 'Hi-fi UI where the important number is the first thing you see.', color: 'var(--pink)', rot: 1.5 },
  { title: 'Ship it together', body: 'Prototypes, specs and components developers actually enjoy.', color: 'var(--tape1)', rot: -2 },
];

const experience = [
  { role: 'Freelance Product Designer', where: 'Youngs Capital · Prime Traders · Traqstock · VEYRO · Legion & more', when: '2022 — Now', rot: 0.5 },
  { role: 'Senior Product Designer', where: 'Quecko Inc', when: 'Sep 2021 — Now', rot: -0.5 },
];

const tools = [
  { name: 'Figma', color: 'var(--yellow)', rot: 2 },
  { name: 'FigJam', color: 'var(--mint)', rot: -3 },
  { name: 'Framer', color: 'var(--blue)', text: '#fff', rot: 1 },
  { name: 'Protopie', color: 'var(--pink)', rot: 2 },
  { name: 'Claude', color: 'var(--tape2)', rot: -2 },
  { name: 'Notion', color: 'var(--tape1)', rot: 1.5 },
  { name: 'Jitter', color: 'var(--green)', text: '#fff', rot: 1 },
];

const facts = [
  { text: 'Based in Islamabad, PK (GMT+5)', color: 'var(--yellow)', rot: 2 },
  { text: '5+ years designing products', color: 'var(--mint)', rot: -2 },
  { text: '12 products & counting', color: 'var(--pink)', rot: 1 },
  { text: 'Has designed more trading screens than he’s made trades', color: 'var(--tape1)', rot: -2 },
];

const rot = (deg: number) => ({ '--rot': `${deg}deg` }) as CSSProperties;

export default function AboutPage() {
  return (
    <>
      <section className="about-intro">
        <div className="wrap about-intro-grid">
          <div>
            <p className="hand-note kicker">the long version ↓</p>
            <h1 className="pixel about-title">About</h1>
            <p className="about-lead">
              I’m a product designer who gets a little too excited about turning complex ideas into calm, clear products.{' '}
              <svg className="lead-spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill="var(--ink)" /></svg>
            </p>
            <div className="about-body">
              <p>For 5+ years I’ve designed web and mobile products for trading platforms, prediction markets, crypto wallets, brokerages and AI tools. My favourite briefs are the ones that start with “it works, but nobody gets it.”</p>
              <p>I work closely with founders, PMs and developers — from the first user flow to the last edge case — and I care as much about the handoff as the hero shot. Based in Islamabad, working with teams everywhere.</p>
            </div>
            <p className="hand-note signature">— Umar</p>
          </div>
          <Polaroid src="/me.jpg" alt={site.name} caption="that’s me, 2026" rot={-5} className="about-pol" />
        </div>
      </section>

      <Reveal className="about-process">
        <div className="wrap">
          <p className="hand-note kicker">how i work</p>
          <h2 className="pixel about-h2">The process</h2>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title} className="step" style={{ background: s.color, ...rot(s.rot) }}>
                <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal className="about-exp">
        <div className="wrap exp-grid">
          <div className="exp-head">
            <p className="hand-note kicker">where i’ve been</p>
            <h2 className="pixel about-h2">Experience</h2>
          </div>
          <p className="hand-note toolbox-label">my toolbox</p>
          <div className="exp-rows">
            {experience.map((e) => (
              <div key={e.role} className="exp-row" style={rot(e.rot)}>
                <strong>{e.role}</strong>
                <span className="exp-where">{e.where}</span>
                <span className="exp-when">{e.when}</span>
              </div>
            ))}
          </div>
          <div className="tool-tags">
            {tools.map((t) => (
              <span key={t.name} style={{ transform: `rotate(${t.rot}deg)` }}>
                <Torn color={t.color} text={t.text} edge="top">{t.name}</Torn>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="about-facts">
        <div className="wrap">
          <p className="hand-note kicker">random facts, for the curious</p>
          <div className="facts">
            {facts.map((f) => (
              <div key={f.text} className="fact" style={{ background: f.color, ...rot(f.rot) }}>
                <Tape color="var(--tape2)" rot={-4} style={{ left: 100, top: -12 }} />
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}
