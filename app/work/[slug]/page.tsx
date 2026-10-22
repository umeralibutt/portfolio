import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/lib/cases';
import { Sticky, Tape } from '@/components/bits';
import NextUp from '@/components/NextUp';
import Reveal from '@/components/Reveal';

type Props = { params: Promise<{ slug: string }> };

const metaColors = ['var(--yellow)', 'var(--mint)', 'var(--pink)', 'var(--tape1)'];
const statColors = ['var(--yellow)', 'var(--mint)', 'var(--pink)'];
const tapePairs: [string, string][] = [['var(--mint)', 'var(--tape1)'], ['var(--pink)', 'var(--tape1)'], ['var(--tape2)', 'var(--tape1)']];

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = caseStudies[(await params).slug];
  if (!cs) return {};
  const name = cs.titleLines.join(' ');
  return {
    title: `${name} ${cs.kind === 'concept' ? 'concept' : 'case study'} — Umar Ali Butt`,
    description: cs.tagline,
    openGraph: { images: [cs.cover] },
  };
}

function Shot({ src, alt, rot, tapes }: { src: string; alt: string; rot: number; tapes: [string, string] }) {
  return (
    <figure className="shot" style={{ '--rot': `${rot}deg` } as CSSProperties}>
      <Tape color={tapes[0]} rot={-3} style={{ left: 28, top: -12 }} />
      <Tape color={tapes[1]} rot={2} style={{ right: 28, top: -10 }} />
      <img src={src} alt={alt} loading="lazy" />
    </figure>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs) notFound();
  const name = cs.titleLines.join(' ');
  // Projects lead with one wide screen then pairs; concepts with several screens are all pairs.
  const lead = cs.kind === 'project' || cs.screens.length === 1 ? cs.screens[0] : null;
  const pairs = lead ? cs.screens.slice(1) : cs.screens;

  return (
    <>
      <section className="case-head">
        <div className="wrap">
          <Link href="/work" className="hand-note back">← back to all work</Link>
          <p className="case-kicker">{cs.kicker}</p>
          <div className="case-head-grid">
            <h1 className="pixel case-title">{cs.titleLines.map((l) => <span key={l}>{l}</span>)}</h1>
            <div className="case-meta">
              {cs.meta.map(([label, value], i) => (
                <Sticky key={label} color={metaColors[i % 4]} rot={i % 2 ? -2 : 2} className="meta-note">
                  <small>{label}</small>
                  <strong>{value}</strong>
                </Sticky>
              ))}
            </div>
            <p className="case-tagline">{cs.tagline}</p>
            <span className="hand-note receipts">{cs.note}</span>
          </div>
        </div>
      </section>

      <section className="case-cover">
        <div className="wrap">
          <Shot src={cs.cover} alt={`${name} cover`} rot={0.8} tapes={['var(--tape2)', 'var(--tape1)']} />
        </div>
      </section>

      {cs.story && (
        <Reveal className="case-notes">
          <div className="wrap">
            <p className="hand-note kicker">{cs.story.kicker}</p>
            <div className="notes-grid">
              <div className="big-note" style={{ background: 'var(--pink)', '--rot': '1.3deg' } as CSSProperties}>
                <h2 className="pixel">The problem</h2>
                <p>{cs.story.problem}</p>
              </div>
              <div className="big-note" style={{ background: 'var(--mint)', '--rot': '-1.2deg' } as CSSProperties}>
                <h2 className="pixel">The fix</h2>
                <p>{cs.story.fix}</p>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {cs.screens.length > 0 && (
        <section className="case-screens">
          <div className="wrap">
            <Reveal as="div">
              <p className="hand-note kicker">{cs.kind === 'concept' ? 'more from this one →' : 'the good stuff →'}</p>
              <h2 className="pixel section-title">Screens</h2>
            </Reveal>
            {lead && <Shot src={lead} alt={`${name} screens`} rot={-0.4} tapes={['var(--tape2)', 'var(--tape1)']} />}
            {pairs.length > 0 && (
              <div className="shots-row">
                {pairs.map((src, i) => (
                  <Shot key={src} src={src} alt={`${name} screen ${i + (lead ? 2 : 1)}`} rot={i % 2 ? -1.5 : 1.5} tapes={tapePairs[i % 3]} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {cs.stats && (
        <Reveal className="case-stats">
          <div className="wrap">
            <p className="hand-note kicker">about the product</p>
            <div className="case-stat-grid">
              {cs.stats.map(([value, note], i) => (
                <div key={value} className="stat case-stat" style={{ background: statColors[i % 3], '--rot': `${[2, -2, 1][i % 3]}deg` } as CSSProperties}>
                  <Tape color="var(--tape2)" style={{ left: '50%', top: -13, marginLeft: -45 }} />
                  <strong>{value}</strong>
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      <Reveal className="case-next">
        <div className="wrap">
          <p className="hand-note kicker">next up →</p>
          <NextUp next={cs.next} />
        </div>
      </Reveal>
    </>
  );
}
