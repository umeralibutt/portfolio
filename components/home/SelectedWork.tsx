'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Arrow, Plus } from '../site/icons';

const panels = [
  {
    slug: 'youngs-capital', name: 'Youngs Capital', img: '/work/youngs-capital.jpg',
    line: 'Making Pakistan’s stock market feel less like a spreadsheet.',
    tags: ['Fintech', 'PSX brokerage', 'Mobile + Web'], meta: 'Fintech · Brokerage · Mobile', tone: 'ink',
  },
  {
    slug: 'veyro', name: 'VEYRO', img: '/work/veyro.jpg',
    // Figma only writes the open-state line for Youngs Capital; the other two reuse their project copy.
    line: 'A smarter crypto wallet — track, send, swap and pay, with full control and none of the complexity.',
    tags: ['Crypto', 'Web3', 'Mobile'], meta: 'Crypto · Web3 · Mobile', tone: 'ink2',
  },
  {
    slug: 'prime-traders', name: 'Prime Traders', img: '/work/prime-traders.jpg',
    line: 'Buy, sell and trade 350+ cryptocurrencies in one fast, secure platform built for serious traders.',
    tags: ['Trading', 'Platform', 'Web + Mobile'], meta: 'Trading · Platform', tone: 'orange',
  },
] as const;

const tone = {
  ink: 'bg-ink text-bone',
  ink2: 'bg-ink-2 text-bone',
  orange: 'bg-orange text-ink',
} as const;

/**
 * Three featured projects as an accordion. Desktop: hovering or focusing a panel widens it (700ms) and the
 * others narrow to labelled spines. Mobile: stacked cards, tap a header to open one.
 */
export default function SelectedWork() {
  const [open, setOpen] = useState(0);

  return (
    <section id="work" data-bg="bone" className="gutter section-pad scroll-mt-20 bg-bone">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 data-reveal className="display text-[clamp(64px,8.3vw,120px)]">Selected <span className="accent text-[0.87em]">work</span></h2>
        <p className="max-w-[230px] text-[18px] leading-snug text-mute lg:text-right">Three I’d frame and hang in my living room.</p>
      </div>

      <div className="mt-12 flex flex-col gap-4 lg:mt-14 lg:h-[640px] lg:flex-row">
        {panels.map((p, i) => {
          const isOpen = open === i;
          const onOrange = p.tone === 'orange';
          return (
            <article
              key={p.slug}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setOpen(i); }}
              onFocusCapture={() => setOpen(i)}
              className={`relative overflow-hidden rounded-[28px] ${tone[p.tone]} transition-[flex-grow] duration-700 ease-brand lg:min-w-0 lg:basis-0 ${isOpen ? 'lg:grow-[3.4]' : 'lg:grow'}`}
            >
              {/* Header: number + open control. On mobile this row is the tap target. */}
              <div className="relative z-10 flex items-center justify-between p-6 lg:p-8">
                <span className={`text-[13px] font-semibold tracking-[0.18em] ${onOrange ? 'text-ink' : 'text-orange'}`}>0{i + 1} / 03</span>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${p.slug}`}
                  aria-label={`Open ${p.name}`}
                  className={`grid size-10 place-items-center rounded-full border transition-[opacity,rotate] duration-500 ease-brand ${onOrange ? 'border-ink/40' : 'border-bone/40'} ${isOpen ? 'pointer-events-none rotate-45 opacity-0' : ''}`}
                >
                  <Plus className="size-4" />
                </button>
                <ul className={`absolute right-8 top-7 hidden gap-2 transition-opacity duration-500 lg:flex ${isOpen ? 'opacity-100 delay-200' : 'pointer-events-none opacity-0'}`}>
                  {p.tags.map((t) => (
                    <li key={t} className={`rounded-full border px-3 py-1.5 text-[14px] ${onOrange ? 'border-ink/30' : 'border-bone/25 bg-bone/5'}`}>{t}</li>
                  ))}
                </ul>
              </div>

              {/* Collapsed spine (desktop only): small shot + vertical title. */}
              <div aria-hidden={isOpen} className={`absolute inset-0 hidden transition-opacity duration-300 lg:block ${isOpen ? 'pointer-events-none opacity-0' : 'opacity-100 delay-300'}`}>
                <div className="absolute left-8 right-6 top-[90px] aspect-[187/144] overflow-hidden rounded-xl border-[5px] border-bone/90 shadow-xl -rotate-2">
                  <Image src={p.img} alt="" fill sizes="200px" className="object-cover" />
                </div>
                <div className="absolute bottom-8 left-8 flex origin-bottom-left -rotate-90 translate-x-[78px] flex-col whitespace-nowrap">
                  <span className="display text-[64px] leading-[0.85]">{p.name}</span>
                  <span className={`mt-1.5 text-[14px] ${onOrange ? 'text-ink/70' : 'text-bone/60'}`}>{p.meta}</span>
                </div>
              </div>

              {/* Open state. */}
              <div
                id={`panel-${p.slug}`}
                className={`grid transition-[grid-template-rows,opacity] duration-700 ease-brand lg:absolute lg:inset-0 lg:block ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 lg:pointer-events-none'}`}
              >
                <div className="min-h-0 overflow-hidden lg:overflow-visible">
                  <Link
                    href={`/work/${p.slug}`}
                    tabIndex={isOpen ? 0 : -1}
                    data-cursor="View"
                    className="group mx-6 mb-6 block lg:absolute lg:right-[3.6%] lg:top-[82px] lg:m-0 lg:w-[45%]"
                    aria-label={`View ${p.name} case study`}
                  >
                    <div data-parallax className="overflow-hidden rounded-2xl border-[6px] border-bone/90 shadow-2xl rotate-[2deg] transition-transform duration-700 ease-brand group-hover:rotate-0">
                      <div className="relative aspect-[368/284]">
                        <Image src={p.img} alt={`${p.name} screens`} fill sizes="(min-width:1024px) 380px, 90vw" className="object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]" />
                      </div>
                    </div>
                  </Link>
                  <div className="px-6 pb-7 lg:absolute lg:bottom-8 lg:left-8 lg:right-[52%] lg:p-0 xl:right-[40%]">
                    <h3 className="display text-[clamp(44px,6.1vw,88px)] lg:whitespace-nowrap">{p.name}</h3>
                    <p className={`mt-4 font-serif text-[clamp(22px,2.1vw,30px)] italic leading-[1.15] ${onOrange ? 'text-ink/80' : 'text-bone/80'}`}>{p.line}</p>
                    <Link
                      href={`/work/${p.slug}`}
                      tabIndex={isOpen ? 0 : -1}
                      data-magnetic
                      className={`group mt-7 inline-flex items-center gap-3 rounded-full py-2.5 pl-5 pr-2.5 text-[16px] font-semibold transition-colors duration-300 ${onOrange ? 'bg-ink text-bone hover:bg-ink-2' : 'bg-orange text-ink hover:bg-bone'}`}
                    >
                      Read the case study
                      <span className={`grid size-8 place-items-center rounded-full ${onOrange ? 'bg-orange text-ink' : 'bg-ink text-bone'}`}><Arrow className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" /></span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <p className="hidden font-serif text-[24px] italic text-mute lg:block">Hover a panel to open it.</p>
        <p className="font-serif text-[22px] italic text-mute lg:hidden">Tap a project to open it.</p>
        <Link href="/work" data-magnetic className="group inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-6 py-3 text-[16px] font-semibold transition-colors duration-300 hover:bg-ink hover:text-bone">
          All case studies <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
