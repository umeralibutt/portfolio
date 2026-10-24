'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Line, fluid } from '../site/type';
import { ArrowLeft, Arrow, ArrowUpRight } from '../site/icons';

const cards = [
  { slug: 'traqstock', name: 'Traqstock', sub: 'Product design' },
  { slug: 'legion', name: 'Legion', sub: 'Product design' },
  { slug: 'pace-wallet', name: 'Pace Wallet', sub: 'Concept · Wallet' },
  { slug: 'pulse-pair', name: 'Pulse Pair', sub: 'Product design' },
  { slug: 'ember', name: 'Ember', sub: 'Product design' },
  { slug: 'vion', name: 'VION', sub: 'Product design' },
  { slug: 'zkop', name: 'ZKOP', sub: 'Product design' },
];

/**
 * Figma "Work 2 — More work" 215:83 — 440 × 330 cards, 28px apart, bleeding off the right edge.
 * A native horizontal scroller (touch, trackpad, Tab and the arrow buttons all work); with a mouse
 * you can also grab-drag it and it glides on with inertia. The hovered card tilts 3°.
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

  const step = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 468, behavior: 'smooth' });

  return (
    <section className="overflow-hidden bg-ink py-20 text-bone lg:py-[140px]">
      <div className="flex flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between md:px-12">
        <h2 data-lines className="leading-[0.9]">
          <Line className="flex items-baseline gap-x-5 whitespace-nowrap">
            <span className="font-display" style={{ fontSize: fluid(140, 64) }}>MORE</span>
            <span className="font-serif italic text-orange" style={{ fontSize: fluid(120, 56) }}>bangers</span>
          </Line>
        </h2>
        <div className="flex items-center gap-2.5 text-[17px] font-medium leading-none text-bone/60">
          Drag it
          <span className="flex rounded-full border border-bone/30 px-2">
            <button type="button" onClick={() => step(-1)} aria-label="Previous projects" className="grid h-[38px] w-7 place-items-center text-bone transition-colors hover:text-orange"><ArrowLeft className="size-[18px]" /></button>
            <button type="button" onClick={() => step(1)} aria-label="Next projects" className="grid h-[38px] w-7 place-items-center text-bone transition-colors hover:text-orange"><Arrow className="size-[18px]" /></button>
          </span>
        </div>
      </div>

      <div
        ref={track}
        data-cursor="Drag"
        className="no-scrollbar mt-10 flex gap-7 overflow-x-auto px-5 pb-4 pt-3 select-none md:px-12 lg:mt-14"
        onClickCapture={(e) => { if (dragged.current) { e.preventDefault(); e.stopPropagation(); dragged.current = false; } }}
        onDragStart={(e) => e.preventDefault()}
      >
        {cards.map((c) => (
          <Link key={c.slug} href={`/work/${c.slug}`} className="group flex w-[min(440px,80vw)] shrink-0 flex-col gap-5" draggable={false}>
            <div className="relative aspect-[440/330] overflow-hidden rounded-[20px] transition-[rotate] duration-500 ease-brand group-hover:rotate-3 group-focus-visible:rotate-3">
              <Image src={`/home/bangers-${c.slug}.jpg`} alt={`${c.name} cover`} fill sizes="(min-width:768px) 440px, 80vw" className="pointer-events-none object-cover" draggable={false} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-[40px] uppercase leading-none">{c.name}</h3>
                <p className="text-[14px] font-medium leading-none text-bone/50">{c.sub}</p>
              </div>
              <ArrowUpRight className="size-8 text-bone transition-[color,translate] duration-300 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange" strokeWidth={1.6} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
