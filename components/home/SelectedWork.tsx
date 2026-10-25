'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Line, fluid } from '../site/type';
import { Arrow, Plus } from '../site/icons';

// Figma writes the open-state line for Youngs Capital only; VEYRO and Prime Traders use the lines
// from their "next up" folders in the Figma case studies.
const panels = [
  {
    slug: 'youngs-capital', name: 'Youngs Capital', shot: '/home/shot-youngs-capital.png', tilt: 3,
    line: 'Making Pakistan’s stock market feel less like a spreadsheet.',
    tags: ['Fintech', 'PSX brokerage', 'Mobile + Web'], meta: 'Fintech · Brokerage · Mobile', tone: 'ink',
  },
  {
    slug: 'veyro', name: 'VEYRO', shot: '/home/shot-veyro.jpg', tilt: -3,
    line: 'A smarter crypto wallet: track, send, swap and pay with full control.',
    tags: ['Crypto', 'Web3', 'Mobile'], meta: 'Crypto · Web3 · Mobile', tone: 'ink2',
  },
  {
    slug: 'prime-traders', name: 'Prime Traders', shot: '/home/shot-prime-traders.jpg', tilt: 3,
    line: 'Buy, sell and trade 350+ cryptocurrencies in one fast, secure platform.',
    tags: ['Trading', 'Platform', 'Web + Mobile'], meta: 'Trading · Platform', tone: 'orange',
  },
] as const;

const tone = { ink: 'bg-ink text-bone', ink2: 'bg-[#1c1b1a] text-bone', orange: 'bg-orange text-ink' } as const;

/**
 * Figma "Work 1 — Featured spreads" 215:24. Desktop: a 640px accordion; hovering or focusing a panel
 * widens it to 824px (700ms) while the others narrow to 244px spines. Mobile: stacked, tap to open.
 */
export default function SelectedWork() {
  const [open, setOpen] = useState(0);

  return (
    <section id="work" className="scroll-mt-24 bg-bone gutter py-20 lg:py-[120px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 data-lines className="leading-[0.9]">
          <Line drift={1} className="flex items-baseline gap-x-5 whitespace-nowrap">
            <span className="font-display" style={{ fontSize: fluid(120, 60) }}>SELECTED</span>
            <span className="font-serif italic text-orange" style={{ fontSize: fluid(105, 52) }}>work</span>
          </Line>
        </h2>
        <p className="text-[16px] font-medium leading-[1.4] text-mute lg:text-right lg:text-[18px]">Three I’d frame and hang<br className="hidden lg:block" /> in my living room.</p>
      </div>

      <div data-tilt-in className="mt-10 flex flex-col gap-4 lg:mt-14 lg:h-[640px] lg:flex-row">
        {panels.map((p, i) => {
          const isOpen = open === i;
          const onOrange = p.tone === 'orange';
          return (
            <article
              key={p.slug}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setOpen(i); }}
              onFocusCapture={() => setOpen(i)}
              className={`relative overflow-hidden rounded-[24px] ${tone[p.tone]} transition-[flex-grow] duration-700 ease-brand lg:min-w-0 lg:basis-0 ${isOpen ? 'lg:grow-[3.377]' : 'lg:grow'}`}
            >
              <div className="relative z-10 flex h-[88px] items-start justify-between px-6 pt-[30px] lg:px-8">
                <span className={`text-[13px] font-semibold leading-none tracking-[0.1em] ${onOrange ? 'text-ink' : isOpen ? 'text-orange' : 'text-bone'}`}>0{i + 1} / 03</span>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${p.slug}`}
                  aria-label={`Open ${p.name}`}
                  className={`-mt-1.5 grid size-10 place-items-center rounded-full border transition-[opacity,rotate] duration-500 ease-brand ${onOrange ? 'border-ink/50' : 'border-bone/50'} ${isOpen ? 'pointer-events-none rotate-45 opacity-0' : ''}`}
                >
                  <Plus className="size-4" />
                </button>
                <ul className={`absolute right-8 top-6 hidden gap-2 transition-opacity duration-500 lg:flex ${isOpen ? 'opacity-100 delay-200' : 'pointer-events-none opacity-0'}`}>
                  {p.tags.map((t) => (
                    <li key={t} className={`rounded-full border px-[13px] py-[7px] text-[13px] font-medium leading-none ${onOrange ? 'border-ink/25 bg-ink/10' : 'border-bone/25 bg-bone/[0.12]'}`}>{t}</li>
                  ))}
                </ul>
              </div>

              {/* Collapsed spine (desktop): small tilted shot + title and meta reading bottom-to-top. */}
              <div aria-hidden={isOpen} className={`absolute inset-0 hidden transition-opacity duration-300 lg:block ${isOpen ? 'pointer-events-none opacity-0' : 'opacity-100 delay-300'}`}>
                <div className="absolute left-8 top-[84px] w-[180px] overflow-hidden rounded-[14px] border-4 border-bone/90 shadow-[0_30px_60px_rgb(0_0_0/0.35)]" style={{ rotate: `${p.tilt}deg` }}>
                  <div className="relative aspect-[180/135]"><Image src={p.shot} alt="" fill sizes="180px" className="object-cover" /></div>
                </div>
                <span className="absolute bottom-8 left-8 rotate-180 font-display text-[64px] uppercase leading-none whitespace-nowrap [writing-mode:vertical-rl]">{p.name}</span>
                <span className={`absolute bottom-8 left-[100px] rotate-180 text-[13px] font-medium leading-none whitespace-nowrap [writing-mode:vertical-rl] ${onOrange ? 'text-ink/70' : 'text-bone/70'}`}>{p.meta}</span>
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
                    aria-label={`View ${p.name} case study`}
                    className="group mx-6 mb-6 block lg:absolute lg:left-[51.2%] lg:top-[90px] lg:m-0 lg:w-[43%]"
                  >
                    <div className="overflow-hidden rounded-[14px] border-4 border-bone/90 shadow-[0_30px_60px_rgb(0_0_0/0.35)] transition-[rotate] duration-700 ease-brand group-hover:rotate-0" style={{ rotate: '3deg' }}>
                      <div className="relative aspect-[354.667/266]">
                        <Image src={p.shot} alt={`${p.name} screens`} fill sizes="(min-width:1024px) 360px, 90vw" className="object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]" />
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col items-start gap-4 px-6 pb-7 lg:absolute lg:left-8 lg:top-[356px] lg:p-0">
                    <h3 className="font-display uppercase leading-[0.92] lg:whitespace-nowrap" style={{ fontSize: fluid(96, 44) }}>{p.name}</h3>
                    <p className={`max-w-[520px] font-serif italic leading-[1.15] ${onOrange ? 'text-ink/90' : 'text-bone/90'}`} style={{ fontSize: fluid(30, 22) }}>{p.line}</p>
                    <Link
                      href={`/work/${p.slug}`}
                      tabIndex={isOpen ? 0 : -1}
                      data-magnetic
                      className={`group mt-2.5 inline-flex items-center gap-2.5 rounded-full py-3 pl-[22px] pr-3 text-[15px] font-semibold leading-none transition-colors duration-300 ${onOrange ? 'bg-ink text-bone' : 'bg-orange text-ink hover:bg-bone'}`}
                    >
                      Read the case study
                      <span className={`grid size-[30px] place-items-center rounded-full ${onOrange ? 'bg-orange text-ink' : 'bg-ink text-bone'}`}>
                        <Arrow className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 lg:mt-14">
        <p className="font-serif text-[20px] italic text-mute lg:text-[22px]"><span className="hidden lg:inline">Hover a panel to open it.</span><span className="lg:hidden">Tap a project to open it.</span></p>
        <Link href="/work" data-magnetic className="group inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-5 py-3 text-[15px] font-semibold leading-none transition-colors duration-300 hover:bg-ink hover:text-bone">
          All case studies <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
