'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { getProject, type Project } from '@/content/projects';
import { Line, fluid } from '../site/type';
import { Arrow, ArrowUpRight } from '../site/icons';

type Filter = 'all' | 'fintech' | 'crypto' | 'ai' | 'concept';

const filters: { key: Filter; label: string; caption: string }[] = [
  { key: 'all', label: 'All', caption: 'Showing everything. Bold of you.' },
  { key: 'fintech', label: 'Fintech', caption: 'Money stuff, handled with care.' },
  { key: 'crypto', label: 'Crypto & Web3', caption: 'Wallets, chains and the odd moonshot.' },
  { key: 'ai', label: 'AI', caption: 'Robots, but make them friendly.' },
  { key: 'concept', label: 'Concepts', caption: 'Side quests only. No clients were harmed.' },
];

// Figma "02 Work" 234:24 — card order, number and sub-line are the Work page's own.
const shipped: { slug: string; line: string; tags: Filter[] }[] = [
  { slug: 'youngs-capital', line: 'FinTech · iOS & Android', tags: ['fintech'] },
  { slug: 'prime-traders', line: 'Crypto exchange · 350+ coins', tags: ['fintech', 'crypto'] },
  { slug: 'veyro', line: 'Crypto · Web3', tags: ['fintech', 'crypto'] },
  { slug: 'traqstock', line: 'Product design', tags: ['fintech'] },
  { slug: 'legion', line: 'Product design', tags: ['fintech', 'crypto'] },
  { slug: 'pace-wallet', line: 'Concept · Wallet', tags: ['fintech', 'crypto', 'concept'] },
  { slug: 'pulse-pair', line: 'Product design', tags: ['fintech', 'concept'] },
  { slug: 'ember', line: 'Product design', tags: ['concept'] },
  { slug: 'vion', line: 'Product design', tags: ['crypto'] },
  { slug: 'zkop', line: 'Product design', tags: ['crypto'] },
];

const sideQuests: { slug: string; tags: Filter[] }[] = [
  { slug: 'crypto-wallet', tags: ['crypto', 'concept'] },
  { slug: 'trading-dashboard', tags: ['fintech', 'crypto', 'concept'] },
  { slug: 'wright-ai', tags: ['ai', 'concept'] },
  { slug: 'crypto-swap', tags: ['crypto', 'concept'] },
  { slug: 'nft-crypto-app', tags: ['crypto', 'concept'] },
  { slug: 'crypto-vaults', tags: ['crypto', 'concept'] },
  { slug: 'metaverse-social', tags: ['crypto', 'concept'] },
];

const withProject = <T extends { slug: string }>(list: T[]) => list.map((c, i) => ({ ...c, n: String(i + 1).padStart(2, '0'), p: getProject(c.slug) as Project }));
const shippedCards = withProject(shipped);
const conceptCards = withProject(sideQuests);

export default function WorkIndex() {
  const [filter, setFilter] = useState<Filter>('all');
  const reduced = useReducedMotion();
  const show = (tags: Filter[]) => filter === 'all' || tags.includes(filter);
  const a = shippedCards.filter((c) => show(c.tags));
  const b = conceptCards.filter((c) => show(c.tags));
  const caption = filters.find((f) => f.key === filter)!.caption;

  // Cards reveal as they scroll in, reflow with FLIP (layout) and fade out as the filter changes.
  const card = {
    layout: !reduced,
    initial: { opacity: 0, y: reduced ? 0 : 32 },
    exit: { opacity: 0, scale: reduced ? 1 : 0.96, transition: { duration: 0.25 } },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <div className="bg-bone">
      <header className="gutter flex flex-col gap-6 pb-12 pt-[124px] lg:flex-row lg:items-end lg:justify-between lg:pt-[193px]">
        <h1 data-lines data-hero>
          <Line driftOut={-1} className="flex items-baseline gap-x-5 whitespace-nowrap leading-[0.88]">
            <span className="font-display" style={{ fontSize: fluid(200, 88) }}>ALL</span>
            <span className="font-serif italic text-orange" style={{ fontSize: fluid(176, 78) }}>work</span>
            <span className="self-baseline text-[clamp(16px,1.67vw,24px)] font-medium leading-[1.21] text-mute" aria-label={`${a.length + b.length} projects`}>({a.length + b.length})</span>
          </Line>
        </h1>
        <p className="text-[18px] font-medium leading-[1.4] text-mute lg:text-right">
          10 shipped products, 7 concepts.<br />Filter it, hover it, steal nothing.
        </p>
      </header>

      <div className="gutter flex flex-col gap-5 pb-14 md:flex-row md:items-center md:justify-between">
        <LayoutGroup id="work-filters">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const on = f.key === filter;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.key)}
                  className={`relative rounded-full border px-5 py-[11px] text-[15px] font-semibold leading-[1.21] transition-colors duration-300 ${on ? 'border-transparent text-bone' : 'border-ink/20 hover:border-ink'}`}
                >
                  {/* The dark pill slides between chips. */}
                  {on && <motion.span layoutId="work-pill" className="absolute inset-[-1px] rounded-full bg-ink" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                  <span className="relative">{f.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <p aria-live="polite" className="font-serif text-[22px] italic leading-[1.21] text-mute">{caption}</p>
      </div>

      {a.length > 0 && (
        <motion.ul layout={!reduced} className="gutter grid gap-x-8 gap-y-14 pb-20 md:grid-cols-2 lg:gap-y-20 lg:pb-[120px]">
          <AnimatePresence mode="popLayout">
            {a.map(({ p, line, n }, i) => (
              <motion.li key={p.slug} {...card} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }} transition={{ ...card.transition, delay: (i % 2) * 0.08 }}>
                <Link href={`/work/${p.slug}`} data-cursor="View" className="group flex flex-col gap-[18px]">
                  <span data-img-reveal data-img-parallax className="relative block aspect-[584/438] overflow-hidden rounded-[22px]">
                    <Image src={p.cover} alt="" fill priority={n === '01' || n === '02'} sizes="(min-width: 768px) 584px, 100vw" className="object-cover transition-[scale] duration-700 ease-brand group-hover:scale-[1.04]" />
                  </span>
                  <span className="flex items-center justify-between gap-4">
                    <span className="flex min-w-0 items-baseline gap-4 transition-colors duration-300 group-hover:text-orange">
                      <span className="text-[14px] font-semibold leading-[1.21] text-mute transition-colors duration-300 group-hover:text-orange-deep">{n}</span>
                      <span className="truncate font-display leading-none" style={{ fontSize: fluid(48, 34) }}>{p.name}</span>
                    </span>
                    <span className="relative size-[26px] shrink-0 text-ink">
                      <ArrowUpRight className="absolute inset-0 size-full transition-opacity duration-300 group-hover:opacity-0" strokeWidth={1.8} />
                      <Arrow className="absolute inset-0 size-full text-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100" strokeWidth={1.8} />
                    </span>
                  </span>
                  <span className="text-[15px] font-medium leading-[1.21] text-mute">{line}</span>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {b.length > 0 && (
        <>
          <div className="gutter flex flex-col gap-4 pb-12 lg:flex-row lg:items-end lg:justify-between">
            <h2 data-lines>
              <Line drift={1} className="flex flex-wrap items-baseline gap-x-4 leading-[0.9]">
                <span className="font-display" style={{ fontSize: fluid(110, 60) }}>CONCEPTS</span>
                <span className="font-serif italic text-orange" style={{ fontSize: fluid(90, 48) }}>&amp; side quests</span>
              </Line>
            </h2>
            <p className="text-[18px] font-medium leading-[1.4] text-mute lg:text-right">
              Unpaid. Unsupervised.<br />Unreasonably fun.
            </p>
          </div>
          <motion.ul layout={!reduced} className="gutter grid gap-x-7 gap-y-14 pb-20 sm:grid-cols-2 lg:grid-cols-3 lg:pb-[140px]">
            <AnimatePresence mode="popLayout">
              {b.map(({ p }, i) => (
                <motion.li key={p.slug} {...card} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }} transition={{ ...card.transition, delay: (i % 3) * 0.08 }}>
                  <Link href={`/work/${p.slug}`} data-cursor="View" className="group flex flex-col gap-3.5">
                    <span data-img-reveal className="relative block aspect-[381/286] overflow-hidden rounded-[18px]">
                      <Image src={p.cover} alt="" fill sizes="(min-width: 1024px) 381px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-[scale] duration-700 ease-brand group-hover:scale-[1.04]" />
                    </span>
                    <span className="flex items-center gap-2.5">
                      <span className="font-display text-[30px] leading-none transition-colors duration-300 group-hover:text-orange">{p.name}</span>
                      <span className="text-[13px] font-medium leading-[1.21] text-mute">Concept</span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </>
      )}

      <section className="flex flex-col gap-10 bg-beige gutter py-20 lg:flex-row lg:items-center lg:justify-between lg:py-[100px]">
        <h2 data-lines>
          <Line drift={-1} className="font-display leading-[0.92]" style={{ fontSize: fluid(84, 48) }}>DIDN’T SEE YOUR INDUSTRY?</Line>
          <Line drift={1} className="font-serif italic leading-none text-orange" style={{ fontSize: fluid(72, 42) }}>Good. I learn fast.</Line>
        </h2>
        <Link href="/contact" data-magnetic className="group inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-ink py-3.5 pl-6 pr-[22px] text-[16px] font-semibold leading-none text-bone transition-colors duration-300 hover:bg-ink-2 lg:self-auto">
          Start a project <Arrow className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
        </Link>
      </section>
    </div>
  );
}
