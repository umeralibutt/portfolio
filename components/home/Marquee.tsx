'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fluid } from '../site/type';

const items = ['Product design', 'Web3', 'Fintech', 'AI products', 'Dashboards', 'Design systems', 'Brands', 'Prototypes'];

/**
 * Figma "Marquee" 213:68 — ink band, Anton 52 with orange sparkles, 36px apart, 30px tall padding.
 * Speed and direction follow the scroll: down → left, up → right, faster with velocity.
 */
export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    let x = 0;
    let dir = -1;
    let boost = 0;
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        dir = self.direction === 1 ? -1 : 1;
        boost = Math.min(Math.abs(self.getVelocity()) / 260, 10);
      },
    });
    const tick = (_t: number, dt: number) => {
      const half = (el.firstElementChild as HTMLElement).offsetWidth;
      x += dir * (0.7 + boost) * (dt / 16.67);
      boost *= 0.93;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); st.kill(); };
  }, []);

  // Each copy carries its own trailing gap so the two halves are identical and the loop is seamless.
  const row = items.map((t) => (
    <span key={t} className="flex shrink-0 items-center gap-9 pr-9">
      <span className="font-display uppercase leading-[1.5] tracking-[0.01em] whitespace-nowrap" style={{ fontSize: fluid(52, 36) }}>{t}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/home/sparkle.svg" alt="" width={37} height={37} className="size-[clamp(26px,2.6vw,37.33px)]" />
    </span>
  ));

  return (
    <section aria-label="What I design" className="overflow-hidden bg-ink py-[30px] text-bone">
      <p className="sr-only">{items.join(', ')}</p>
      <div ref={track} className="flex w-max will-change-transform pl-edge" aria-hidden="true">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </section>
  );
}
