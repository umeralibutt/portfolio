'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowLeft, Arrow, ArrowUpRight } from '../site/icons';

// The last three subtitles aren't legible in the Figma frame; they follow the project data.
const cards = [
  { slug: 'traqstock', name: 'Traqstock', sub: 'Product design' },
  { slug: 'legion', name: 'Legion', sub: 'Product design' },
  { slug: 'pace-wallet', name: 'Pace Wallet', sub: 'Concept · Wallet' },
  { slug: 'pulse-pair', name: 'Pulse Pair', sub: 'Concept · Trading' },
  { slug: 'ember', name: 'Ember', sub: 'Concept · SaaS' },
  { slug: 'vion', name: 'VION', sub: 'Brand + Web' },
  { slug: 'zkop', name: 'ZKOP', sub: 'Website' },
];

/**
 * Horizontal gallery. It's a native scroller (so touch, trackpads, Tab and the arrow buttons all work);
 * with a mouse you can also grab-drag it, and it keeps gliding with inertia when you let go.
 */
export default function MoreBangers() {
  const track = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let down = false, startX = 0, startLeft = 0, lastX = 0, lastT = 0, v = 0, raf = 0;
    const glide = () => {
      v *= 0.94;
      el.scrollLeft -= v;
      raf = Math.abs(v) > 0.3 ? requestAnimationFrame(glide) : 0;
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; dragged.current = false;
      startX = lastX = e.clientX; startLeft = el.scrollLeft; lastT = performance.now(); v = 0;
      cancelAnimationFrame(raf);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) dragged.current = true;
      el.scrollLeft = startLeft - dx;
      const now = performance.now();
      v = ((e.clientX - lastX) / Math.max(1, now - lastT)) * 16;
      lastX = e.clientX; lastT = now;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(glide);
    };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector('a');
    if (el && card) el.scrollBy({ left: dir * (card.clientWidth + 28), behavior: 'smooth' });
  };

  return (
    <section data-bg="ink" className="section-pad overflow-hidden bg-ink text-bone">
      <div className="gutter flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 data-reveal className="display text-[clamp(64px,8.75vw,126px)]">More <span className="accent text-[0.86em]">bangers</span></h2>
        <div className="flex items-center gap-3 text-[18px] text-bone/60">
          Drag it
          <span className="flex rounded-full border border-bone/30">
            <button type="button" onClick={() => step(-1)} aria-label="Previous projects" className="grid size-10 place-items-center rounded-full hover:text-orange"><ArrowLeft className="size-4" /></button>
            <button type="button" onClick={() => step(1)} aria-label="Next projects" className="grid size-10 place-items-center rounded-full hover:text-orange"><Arrow className="size-4" /></button>
          </span>
        </div>
      </div>

      <div
        ref={track}
        data-cursor="Drag"
        className="no-scrollbar mt-12 flex gap-7 overflow-x-auto px-5 pb-6 select-none md:mt-16 md:px-12"
        onClickCapture={(e) => { if (dragged.current) { e.preventDefault(); e.stopPropagation(); dragged.current = false; } }}
        onDragStart={(e) => e.preventDefault()}
      >
        {cards.map((c) => (
          <Link key={c.slug} href={`/work/${c.slug}`} className="group w-[min(440px,82vw)] shrink-0" draggable={false}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] transition-transform duration-500 ease-brand group-hover:-rotate-3 group-focus-visible:-rotate-3">
              <Image src={`/work/${c.slug}.jpg`} alt={`${c.name} cover`} fill sizes="(min-width:768px) 440px, 82vw" className="pointer-events-none object-cover" draggable={false} />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="display text-[40px] leading-none">{c.name}</h3>
                <p className="mt-1.5 text-[15px] text-bone/55">{c.sub}</p>
              </div>
              <ArrowUpRight className="mt-1 size-6 text-bone/70 transition-[color,translate] duration-300 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
