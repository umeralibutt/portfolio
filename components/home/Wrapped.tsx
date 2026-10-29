'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../site/Container';
import { Line, fluid } from '../site/type';
import { Arrow, Play } from '../site/icons';

type Tone = 'orange' | 'bone' | 'dark';
const stories: { label: string; value: string; word?: boolean; caption: string; tone: Tone; rot: number; x: number; y: number }[] = [
  { label: 'YOUR TOP GENRE', value: 'FINTECH', word: true, caption: 'followed closely by Web3 and AI.', tone: 'orange', rot: 4, x: 10, y: 269 },
  { label: 'YEARS ON REPEAT', value: '5', caption: 'since 2021. Zero skips.', tone: 'bone', rot: -3, x: 38.2, y: 282 },
  { label: 'MOST PLAYED APP', value: 'FIGMA', word: true, caption: 'obviously. Over and over.', tone: 'dark', rot: 2, x: 62.1, y: 265 },
  { label: 'PRODUCTS SHIPPED', value: '10+', caption: 'and counting. Next one could be yours.', tone: 'orange', rot: -4, x: 89.9, y: 280 },
];

const tones: Record<Tone, { card: string; bar: string; barOff: string; logo: string; label: string }> = {
  orange: { card: 'bg-orange text-ink', bar: 'bg-ink/90', barOff: 'bg-ink/25', logo: 'bg-ink text-orange', label: 'text-ink/85' },
  bone: { card: 'bg-bone text-ink', bar: 'bg-ink/90', barOff: 'bg-ink/25', logo: 'bg-ink text-bone', label: 'text-ink/75' },
  dark: { card: 'bg-[#21201e] text-bone', bar: 'bg-bone/90', barOff: 'bg-bone/25', logo: 'bg-bone text-[#21201e]', label: 'text-bone/75' },
};

/**
 * One Wrapped slide, drawn on a 276 × 500 grid in units of --u so the same card works in the row
 * (--u: 1px) and full screen. `filled` is how many progress bars are lit; `playing` animates the
 * current one and calls onDone when it fills.
 */
function Story({ i, filled, playing, onDone }: { i: number; filled: number; playing?: boolean; onDone?: () => void }) {
  const s = stories[i];
  const t = tones[s.tone];
  const u = (n: number) => `calc(${n} * var(--u))`;
  return (
    <div className={`flex flex-col justify-between overflow-hidden shadow-[0_30px_30px_rgb(0_0_0/0.4)] ${t.card}`} style={{ width: u(276), height: u(500), borderRadius: u(24), padding: `${u(22)} ${u(24)} ${u(28)}` }}>
      <div className="flex flex-col" style={{ gap: u(18) }}>
        <div className="flex" style={{ gap: u(4) }}>
          {stories.map((_, j) => (
            <span key={j} className={`relative flex-1 overflow-hidden rounded-full ${t.barOff}`} style={{ height: u(3) }}>
              {(j < filled || (j === filled && playing)) && (
                <span
                  key={playing && j === filled ? `play-${i}` : 'full'}
                  className={`absolute inset-y-0 left-0 ${t.bar} ${playing && j === filled ? 'animate-[story-fill_4s_linear_forwards] motion-reduce:w-full motion-reduce:animate-none' : 'w-full'}`}
                  onAnimationEnd={playing && j === filled ? onDone : undefined}
                />
              )}
            </span>
          ))}
        </div>
        <div className="flex items-center" style={{ gap: u(8) }}>
          <span className={`grid place-items-center font-display ${t.logo}`} style={{ width: u(22), height: u(22), borderRadius: u(6), fontSize: u(14) }}>U</span>
          <span className="font-semibold leading-[1.21] opacity-80" style={{ fontSize: u(12) }}>umar.wrapped</span>
        </div>
      </div>
      <div className="flex flex-col" style={{ gap: u(10) }}>
        <p className={`font-semibold leading-[1.21] tracking-[0.12em] ${t.label}`} style={{ fontSize: u(13) }}>{s.label}</p>
        {/* Word headlines share one size that fits the card; numbers go bigger. */}
        <p className="whitespace-nowrap font-display leading-[0.88]" style={{ fontSize: u(s.word ? 76 : 130) }}>{s.value}</p>
        <p className="font-serif italic leading-[1.15]" style={{ fontSize: u(24) }}>{s.caption}</p>
      </div>
    </div>
  );
}

/**
 * Figma "Umar Wrapped" 294:24. The four cards start as a pile and fan out into a row as the section
 * scrolls in; hovering straightens and lifts a card. Clicking a card (or "Play the full story") opens
 * full-screen story mode. Phones get a swipe carousel instead of the fan.
 */
export default function Wrapped() {
  const row = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-story]', el);
      cards.forEach((c, k) => {
        // Pile them in the middle, then deal them out to their spots.
        gsap.fromTo(c, { x: () => el.offsetWidth / 2 - c.offsetLeft, y: () => 270 - c.offsetTop + k * 6, rotation: (k - 1.5) * 3 }, {
          x: 0, y: 0, rotation: 0, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 35%', scrub: 0.6, invalidateOnRefresh: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="bg-ink py-20 text-bone lg:py-[140px]">
      <Container className="flex flex-col gap-12 lg:gap-[72px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="text-[14px] font-semibold leading-[1.21] tracking-[0.14em] text-orange">2021 → 2026</p>
            <h2 data-lines>
              <Line drift={-1} className="flex items-baseline gap-x-4 whitespace-nowrap leading-[0.88]">
                <span className="font-display" style={{ fontSize: fluid(150, 76) }}>UMAR</span>
                <span className="font-serif italic text-orange" style={{ fontSize: fluid(140, 70) }}>wrapped</span>
              </Line>
            </h2>
          </div>
          <p className="text-[18px] font-medium leading-[1.4] text-[#a8a399] sm:text-right">Five years of design,<br />summed up in four slides.</p>
        </div>

        <div ref={row} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 [--u:1px] md:-mx-12 md:px-12 lg:relative lg:mx-0 lg:block lg:h-[560px] lg:overflow-visible lg:px-0 lg:pb-0">
          {stories.map((s, i) => (
            <button
              key={s.label}
              type="button"
              data-story
              onClick={() => setOpen(i)}
              aria-label={`Play Umar Wrapped from “${s.label.toLowerCase()}”`}
              className="group shrink-0 snap-center text-left lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:-translate-x-1/2 lg:-translate-y-1/2"
              style={{ '--x': `${s.x}%`, '--y': `${s.y}px` } as CSSProperties}
            >
              <span className="block transition-[rotate,translate] duration-500 ease-brand group-hover:-translate-y-3 group-hover:rotate-0 group-focus-visible:rotate-0 lg:rotate-[var(--r)]" style={{ '--r': `${s.rot}deg` } as CSSProperties}>
                <Story i={i} filled={i + 1} />
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-[clamp(24px,2.08vw,30px)] italic leading-[1.21]">Share your Wrapped? Nah. Hire the guy instead.</p>
          <button type="button" onClick={() => setOpen(0)} data-magnetic className="group inline-flex items-center gap-2.5 self-start rounded-full bg-orange py-3.5 pl-6 pr-[22px] text-[16px] font-semibold leading-[1.21] text-ink transition-colors duration-300 hover:bg-bone sm:self-auto">
            Play the full story <Play className="size-4" />
          </button>
        </div>
      </Container>

      {open !== null && <StoryMode start={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

/** Full-screen story mode: auto-advances every 4s; click/tap right for next, left for back; Esc or swipe down closes. */
function StoryMode({ start, onClose }: { start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const dialog = useRef<HTMLDivElement>(null);
  const downY = useRef<number | null>(null);
  const last = i === stories.length - 1;

  const next = useCallback(() => setI((k) => Math.min(k + 1, stories.length - 1)), []);
  const prev = useCallback(() => setI((k) => Math.max(k - 1, 0)), []);

  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    dialog.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    addEventListener('keydown', key);
    return () => {
      removeEventListener('keydown', key);
      document.documentElement.style.overflow = '';
      lenis?.start();
      before?.focus();
    };
  }, [onClose, next, prev]);

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label="Umar Wrapped, full story"
      tabIndex={-1}
      className="fixed inset-0 z-[85] grid place-items-center bg-ink/95 outline-none backdrop-blur-sm [--u:min(1.6px,calc((100dvh-140px)/500))]"
      onPointerDown={(e) => { downY.current = e.clientY; }}
      onPointerUp={(e) => {
        const dy = downY.current === null ? 0 : e.clientY - downY.current;
        downY.current = null;
        if (dy > 80) return onClose();
        // Tap/click: right half goes forward, left half goes back.
        if (e.target instanceof Element && e.target.closest('[data-keep]')) return;
        if (e.clientX > innerWidth / 2) { if (!last) next(); } else prev();
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <Story i={i} filled={i} playing onDone={last ? undefined : next} />
        <div data-keep className="flex h-12 items-center gap-3">
          {last ? (
            <Link href="/contact" onClick={onClose} className="group inline-flex items-center gap-2.5 rounded-full bg-orange py-3.5 pl-6 pr-[22px] text-[16px] font-semibold leading-[1.21] text-ink">
              Hire the guy <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <p className="text-[13px] font-medium text-bone/50">Tap right for next, left to go back</p>
          )}
        </div>
      </div>
      <button data-keep type="button" onClick={onClose} aria-label="Close story" className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-bone/30 text-[22px] leading-none text-bone transition-colors hover:border-bone">
        ×
      </button>
    </div>
  );
}
