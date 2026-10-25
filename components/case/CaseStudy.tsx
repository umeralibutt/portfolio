import Image from 'next/image';
import Link from 'next/link';
import { nextProject, projectNumber, type CaseStudy as Case, type Project } from '@/content/projects';
import { Line, fluid } from '../site/type';
import { Arrow, ArrowLeft } from '../site/icons';
import ReadingProgress from './ReadingProgress';

/**
 * Figma "03 Case Study — Youngs Capital" 234:296 and the "Concept — …" frames 252:*.
 * Case studies get the receipts and problem → fix; concepts get the side-quest note and a second screen.
 */
export default function CaseStudy({ project: p }: { project: Project }) {
  return (
    <article className="bg-bone">
      <ReadingProgress />

      <div className="gutter flex pt-[119px] lg:pt-[140px]">
        <Link href="/work" className="group inline-flex items-center gap-2 text-[15px] font-semibold leading-[1.21] transition-colors hover:text-orange">
          <ArrowLeft className="size-4 transition-transform duration-300 ease-brand group-hover:-translate-x-1" /> All work
        </Link>
      </div>

      <header className="gutter flex flex-col items-start gap-7 pb-14 pt-12 lg:pt-16">
        <p className="flex items-center gap-2.5 text-[13px] font-semibold uppercase leading-none tracking-[0.12em] text-mute">
          <span className="size-2 rounded-full bg-orange" aria-hidden="true" />
          {p.label}
        </p>
        <h1 data-lines data-hero>
          <Line driftOut={-1} className="font-display leading-[0.88] tracking-[-0.01em] lg:whitespace-nowrap" style={{ fontSize: fluid(156, 56) }}>{p.name}</Line>
        </h1>
        <p className="max-w-[980px] font-serif italic leading-[1.18]" style={{ fontSize: fluid(40, 26) }}>{p.tagline}</p>
      </header>

      <dl className="gutter grid grid-cols-2 gap-y-8 pb-14 lg:grid-cols-4 lg:gap-y-0">
        {p.meta.map((m, i) => (
          <div key={m.label} className={`flex flex-col gap-2 border-t border-ink/15 pt-5 ${i % 2 ? 'border-l pl-6' : 'pr-6'} ${i === 2 ? 'lg:border-l lg:pl-6' : ''} ${i > 0 ? 'lg:pr-6' : ''}`}>
            <dt className="text-[12px] font-semibold uppercase leading-[1.21] tracking-[0.12em] text-mute">{m.label}</dt>
            <dd className="font-medium leading-[1.21] tracking-[-0.02em]" style={{ fontSize: fluid(22, 18) }}>{m.value}</dd>
          </div>
        ))}
      </dl>

      <div className="gutter">
        <div data-scale-in data-img-parallax className="relative aspect-[1200/893] overflow-hidden rounded-[clamp(16px,1.95vw,28px)]">
          <Image src={p.cover} alt={`${p.name.toLowerCase()} — cover`} fill priority sizes="(min-width: 1440px) 1200px, 100vw" className="object-cover" />
        </div>
      </div>

      {p.kind === 'case' ? <CaseBody p={p} /> : <SideQuest />}

      <section className="gutter flex flex-col gap-10 pb-20 lg:pb-[140px]">
        <h2 data-lines>
          <Line drift={1} className="flex items-baseline gap-x-4 whitespace-nowrap leading-[0.9]">
            <span className="font-display" style={{ fontSize: fluid(96, 52) }}>THE GOOD</span>
            <span className="font-serif italic text-orange" style={{ fontSize: fluid(90, 48) }}>stuff</span>
          </Line>
        </h2>
        {p.screens.map((src, i) => (
          <div key={src} data-img-reveal data-img-parallax className="relative aspect-[1200/723] overflow-hidden rounded-[clamp(16px,1.95vw,28px)]">
            <Image src={src} alt={`${p.name.toLowerCase()} — screens ${i + 1}`} fill sizes="(min-width: 1440px) 1200px, 100vw" className="object-cover" />
          </div>
        ))}
      </section>

      <NextUp from={p} />
    </article>
  );
}

/** Receipts (rows tick in one by one) + problem → fix (the fix panel slides over on scroll). */
function CaseBody({ p }: { p: Case }) {
  return (
    <>
      <section className="bg-beige gutter flex flex-col gap-12 py-20 lg:flex-row lg:gap-20 lg:py-[120px]">
        <div className="flex shrink-0 flex-col items-start gap-5 lg:w-[420px]">
          <h2 data-lines className="whitespace-nowrap leading-[0.88]">
            <Line drift={-1} className="font-display leading-[0.88]" style={{ fontSize: fluid(120, 72) }}>THE</Line>
            <Line drift={1} className="font-serif italic leading-[0.88] text-orange" style={{ fontSize: fluid(110, 66) }}>receipts</Line>
          </h2>
          <p className="text-[18px] font-medium leading-[1.21] text-mute">{p.receipts.sub}</p>
        </div>
        <ol data-rows className="flex min-w-0 flex-1 flex-col">
          {p.receipts.rows.map((r, i) => (
            <li key={r.text} className={`flex items-center gap-4 border-t border-ink/[0.18] py-[30px] sm:gap-6 ${i === p.receipts.rows.length - 1 ? 'border-b' : ''}`}>
              <span className="w-9 shrink-0 text-[14px] font-semibold leading-none tracking-[0.1em] text-orange-deep">{String(i + 1).padStart(2, '0')}</span>
              <span className="min-w-0 flex-1 font-medium leading-[1.3] tracking-[-0.02em]" style={{ fontSize: fluid(24, 18) }}>{r.text}</span>
              <span className={`shrink-0 rounded-full px-4 py-2 font-display leading-[1.1] tracking-[0.01em] ${i === 0 ? 'bg-orange' : 'border-[1.5px] border-ink'}`} style={{ fontSize: fluid(36, 24) }}>{r.value}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="gutter grid gap-6 overflow-x-clip pb-20 pt-6 lg:grid-cols-2 lg:pb-[140px]">
        <Panel tone="ink" kicker={p.problem.label} tag="BEFORE" title="THE PROBLEM" text={p.problem.text} />
        <Panel tone="orange" kicker="and how we fixed it" tag="AFTER" title="THE FIX" text={p.fix} slide />
      </section>
    </>
  );
}

function Panel({ tone, kicker, tag, title, text, slide }: { tone: 'ink' | 'orange'; kicker: string; tag: string; title: string; text: string; slide?: boolean }) {
  const ink = tone === 'ink';
  return (
    <div data-slide-over={slide ? '' : undefined} className={`flex flex-col gap-6 rounded-[clamp(20px,2.2vw,32px)] px-[clamp(24px,3.9vw,56px)] pb-16 pt-14 ${ink ? 'bg-ink text-bone' : 'bg-orange text-ink'}`}>
      <div className="flex items-center justify-between gap-4 leading-[1.21]">
        <p className={`font-serif italic ${ink ? 'text-[#a8a399]' : 'text-ink/75'}`} style={{ fontSize: fluid(30, 24) }}>{kicker}</p>
        <p className={`text-[12px] font-semibold tracking-[0.14em] ${ink ? 'text-bone/60' : 'text-ink/80'}`}>{tag}</p>
      </div>
      <h2 className="font-display leading-[0.92] whitespace-nowrap" style={{ fontSize: fluid(96, 52) }}>{title}</h2>
      <p className={`leading-[1.5] tracking-[-0.01em] ${ink ? 'text-bone/85' : ''}`} style={{ fontSize: fluid(24, 18) }}>{text}</p>
    </div>
  );
}

/** Concepts: Figma "Side quest note". */
function SideQuest() {
  return (
    <section className="gutter flex flex-col gap-4 pb-20 pt-20 sm:flex-row sm:items-end sm:justify-between lg:pt-[110px]">
      <p className="font-serif italic leading-[1.21]" style={{ fontSize: fluid(64, 36) }}>a side quest, not a client brief.</p>
      <p className="text-[18px] font-medium leading-[1.4] text-mute sm:text-right">
        No client, no deadline —<br />just me exploring how this could feel.
      </p>
    </section>
  );
}

/** Figma "Next project" — hover tilts the cover upright and lifts it. */
function NextUp({ from }: { from: Project }) {
  const n = nextProject(from);
  const href = `/work/${n.slug}`;
  const concept = n.kind === 'concept';
  return (
    <section className="bg-orange gutter py-20 text-ink lg:py-[100px]">
      <Link href={href} data-cursor="Next" className="group flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-start gap-4 lg:w-[760px]">
          <p className="text-[14px] font-semibold uppercase leading-[1.21] tracking-[0.12em]">
            {concept ? `Next concept — ${projectNumber(n)}` : `Next up — Project ${projectNumber(n)}`}
          </p>
          <p data-drift="-1" className="font-display leading-[0.9]" style={{ fontSize: fluid(110, 56) }}>{n.name}</p>
          <p className="max-w-[620px] font-serif italic leading-[1.2]" style={{ fontSize: fluid(30, 22) }}>{n.teaser ?? n.tagline}</p>
          <span data-magnetic className="inline-flex items-center gap-2.5 rounded-full bg-ink py-3.5 pl-6 pr-[22px] text-[16px] font-semibold leading-none text-bone transition-colors duration-300 group-hover:bg-ink-2">
            {concept ? 'View concept' : 'View case study'}
            <Arrow className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
          </span>
        </div>
        <div data-parallax="-0.15" className="relative aspect-[460/345] w-full max-w-[460px] shrink-0 -rotate-5 overflow-hidden rounded-[18px] border-[6px] border-white shadow-[0_30px_60px_rgb(0_0_0/0.3)] transition-[rotate,translate] duration-700 ease-brand group-hover:-translate-y-2 group-hover:rotate-0 lg:mx-[14px] lg:my-[19px]">
          <Image src={n.cover} alt="" fill sizes="460px" className="object-cover" />
        </div>
      </Link>
    </section>
  );
}
