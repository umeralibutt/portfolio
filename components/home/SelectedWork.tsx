'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Line, fluid } from '../site/type';
import { Arrow } from '../site/icons';

const cards = [
  {
    slug: 'youngs-capital', name: 'Youngs Capital', title: 'YOUNGS CAPITAL', size: 80, shot: '/home/shot-youngs-capital.png',
    line: 'Making Pakistan’s stock market feel less like a spreadsheet.', tags: ['Fintech', 'PSX brokerage', 'Mobile'], tone: 'ink',
  },
  {
    slug: 'veyro', name: 'VEYRO', title: 'VEYRO', size: 96, shot: '/home/shot-veyro.jpg',
    line: 'Crypto that doesn’t make you feel stupid.', tags: ['Crypto', 'Web3', 'Mobile'], tone: 'ink2',
  },
  {
    slug: 'prime-traders', name: 'Prime Traders', title: 'PRIME TRADERS', size: 80, shot: '/home/shot-prime-traders.jpg',
    line: 'Pro-grade trading without the panic-inducing UI.', tags: ['Crypto exchange', 'Web + App'], tone: 'orange',
  },
] as const;

const tones = {
  ink: { card: 'bg-ink text-bone', num: 'text-orange', chip: 'border-bone/30', cta: 'bg-orange text-ink' },
  ink2: { card: 'bg-[#1c1b1a] text-bone', num: 'text-orange', chip: 'border-bone/30', cta: 'bg-orange text-ink' },
  orange: { card: 'bg-orange text-ink', num: 'text-ink', chip: 'border-ink/30', cta: 'bg-ink text-bone' },
} as const;

/**
 * Figma "Work 1 — Featured spreads" 215:24: sticky stacking cards. Each card pins 120px from the top;
 * as the next one slides over, the one underneath scales to 0.92 and dims 30%. The pills follow along.
 * Phones and reduced motion get plain stacked cards (no pinning).
 */
export default function SelectedWork() {
  const stack = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = stack.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-card]', el);
      items.forEach((card, i) => {
        // Which card is on top.
        ScrollTrigger.create({ trigger: card, start: 'top 121px', onEnter: () => setActive(i), onLeaveBack: () => setActive(Math.max(0, i - 1)) });
        const next = items[i + 1];
        if (!next) return;
        // Recede as the next card covers this one (scale only: dimming read as the card going black).
        gsap.to(card.firstElementChild, {
          scale: 0.94, ease: 'none', transformOrigin: '50% 0%',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 120px', scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="work" className="scroll-mt-24 bg-bone container-site py-20 lg:py-[140px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 data-lines className="leading-[0.9]">
          <Line drift={1} className="flex items-baseline gap-x-5 whitespace-nowrap">
            <span className="font-display" style={{ fontSize: fluid(120, 60) }}>SELECTED</span>
            <span className="font-serif italic text-orange" style={{ fontSize: fluid(105, 52) }}>work</span>
          </Line>
        </h2>
        <p className="text-[16px] font-medium leading-[1.4] text-mute lg:text-right lg:text-[18px]">Keep scrolling.<br className="hidden lg:block" /> They stack.</p>
      </div>

      <div ref={stack} className="mt-10 flex flex-col gap-6 lg:mt-16 lg:gap-10">
        {cards.map((c, i) => {
          const t = tones[c.tone];
          return (
            // The sticky wrapper pins; the article inside is what scales and dims.
            <div key={c.slug} data-card className="motion-safe:lg:sticky motion-safe:lg:top-[120px]">
              {/* Two flexible columns; the image fills its side so there is no empty gap on the right. */}
              <article className={`flex flex-col gap-8 overflow-hidden rounded-[32px] p-6 shadow-[0_-12px_20px_rgb(0_0_0/0.18)] sm:p-10 lg:grid lg:h-[clamp(540px,41.67vw,600px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14 lg:py-12 lg:pl-14 lg:pr-12 ${t.card}`}>
                <div className="flex flex-col items-start justify-between gap-8 lg:h-full">
                  <div className="flex flex-col items-start gap-[22px]">
                    <p className={`text-[13px] font-semibold leading-[1.21] tracking-[0.12em] ${t.num}`}>0{i + 1} / 03</p>
                    <h3 className="font-display leading-[0.92] lg:whitespace-nowrap" style={{ fontSize: fluid(c.size, 44) }}>{c.title}</h3>
                    <p className="max-w-[460px] font-serif italic leading-[1.18] opacity-90" style={{ fontSize: fluid(30, 22) }}>{c.line}</p>
                    <ul className="flex flex-wrap gap-2">
                      {c.tags.map((tag) => (
                        <li key={tag} className={`rounded-full border px-[13px] py-[7px] text-[13px] font-medium leading-[1.21] ${t.chip}`}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                  <Link href={`/work/${c.slug}`} data-magnetic className={`group inline-flex items-center gap-2.5 rounded-full py-3 pl-[22px] pr-3 text-[15px] font-semibold leading-[1.21] ${t.cta}`}>
                    Read the case study
                    <span className={`grid size-[30px] place-items-center rounded-full ${c.tone === 'orange' ? 'bg-orange text-ink' : 'bg-ink text-bone'}`}>
                      <Arrow className="size-3.5 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
                <Link href={`/work/${c.slug}`} data-cursor="View" tabIndex={-1} className="relative block aspect-[560/420] w-full overflow-hidden rounded-[20px] border-[5px] border-bone/90 lg:aspect-auto lg:h-full">
                  <Image quality={90} src={c.shot} alt={`${c.name} screens`} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                </Link>
              </article>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 lg:mt-16">
        <ol className="hidden items-center gap-2.5 lg:flex" aria-label="Case studies in this stack">
          {cards.map((c, i) => (
            <li
              key={c.slug}
              aria-current={i === active ? 'step' : undefined}
              className={`rounded-full border px-3.5 py-2 text-[13px] font-semibold leading-[1.21] transition-colors duration-300 ${i === active ? 'border-ink bg-ink text-bone' : 'border-ink/20 text-ink'}`}
            >
              {c.name}
            </li>
          ))}
        </ol>
        <Link href="/work" data-magnetic className="group inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-5 py-3 text-[15px] font-semibold leading-[1.21] transition-colors duration-300 hover:bg-ink hover:text-bone">
          All case studies <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
