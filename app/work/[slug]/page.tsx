import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/lib/cases';
import { projects } from '@/lib/data';
import { Sticky, Tape } from '@/components/bits';
import Folder from '@/components/Folder';
import Reveal from '@/components/Reveal';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = caseStudies[(await params).slug];
  if (!cs) return {};
  const name = cs.titleLines.join(' ');
  return {
    title: `${name} case study — Umar Ali Butt`,
    description: cs.tagline,
    openGraph: { images: [cs.cover] },
  };
}

function Shot({ src, alt, rot, tapes }: { src: string; alt: string; rot: number; tapes: [string, string] }) {
  return (
    <figure className="shot" style={{ '--rot': `${rot}deg` } as React.CSSProperties}>
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
  const index = projects.findIndex((p) => p.slug === slug);
  const nextIndex = projects.findIndex((p) => p.slug === cs.next);
  const [ui, ...rest] = cs.screens;

  return (
    <>
      <section className="case-head">
        <div className="wrap">
          <Link href="/work" className="hand-note back">← back to all work</Link>
          <p className="case-kicker">Project {String(index + 1).padStart(2, '0')} · {cs.status}</p>
          <div className="case-head-grid">
            <h1 className="pixel case-title">{cs.titleLines.map((l) => <span key={l}>{l}</span>)}</h1>
            <div className="case-meta">
              {cs.meta.map((m, i) => (
                <Sticky key={m.label} color={m.color} rot={i % 2 ? -2 : 2} className="meta-note">
                  <small>{m.label}</small>
                  <strong>{m.value}</strong>
                </Sticky>
              ))}
            </div>
            <p className="case-tagline">{cs.tagline}</p>
            <span className="hand-note receipts">↓ the receipts</span>
          </div>
        </div>
      </section>

      <section className="case-cover">
        <div className="wrap">
          <Shot src={cs.cover} alt={`${cs.titleLines.join(' ')} cover`} rot={0.8} tapes={['var(--tape2)', 'var(--tape1)']} />
        </div>
      </section>

      <Reveal className="case-notes">
        <div className="wrap">
          <p className="hand-note kicker">so, what was broken?</p>
          <div className="notes-grid">
            <div className="big-note" style={{ background: 'var(--pink)', '--rot': '1.3deg' } as React.CSSProperties}>
              <h2 className="pixel">The problem</h2>
              <p>{cs.problem}</p>
            </div>
            <div className="big-note" style={{ background: 'var(--mint)', '--rot': '-1.2deg' } as React.CSSProperties}>
              <h2 className="pixel">The fix</h2>
              <p>{cs.fix}</p>
            </div>
          </div>
        </div>
      </Reveal>

      <section className="case-screens">
        <div className="wrap">
          <Reveal as="div">
            <p className="hand-note kicker">the good stuff →</p>
            <h2 className="pixel section-title">Screens</h2>
          </Reveal>
          <Shot src={ui.src} alt={ui.alt} rot={-0.4} tapes={['var(--tape2)', 'var(--tape1)']} />
          <div className="shots-row">
            {rest.map((s, i) => (
              <Shot key={s.src} src={s.src} alt={s.alt} rot={i % 2 ? -1.5 : 1.5} tapes={i % 2 ? ['var(--pink)', 'var(--tape1)'] : ['var(--mint)', 'var(--tape1)']} />
            ))}
          </div>
        </div>
      </section>

      <Reveal className="case-stats">
        <div className="wrap">
          <p className="hand-note kicker">about the product</p>
          <div className="case-stat-grid">
            {cs.stats.map((s, i) => (
              <div key={s.value} className="stat case-stat" style={{ background: s.color, '--rot': `${[2, -2, 1][i % 3]}deg` } as React.CSSProperties}>
                <Tape color="var(--tape2)" style={{ left: '50%', top: -13, marginLeft: -45 }} />
                <strong>{s.value}</strong>
                <p>{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {nextIndex >= 0 && (
        <Reveal className="case-next">
          <div className="wrap">
            <p className="hand-note kicker">next up →</p>
            <Folder project={projects[nextIndex]} index={nextIndex} next />
          </div>
        </Reveal>
      )}
    </>
  );
}
