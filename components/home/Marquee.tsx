'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkle } from '../site/icons';

const items = ['Product design', 'Web3', 'Fintech', 'AI products', 'Dashboards', 'Design systems', 'Brands', 'Prototypes'];

/** Infinite band whose speed and direction follow the scroll: scroll down → left, up → right, faster with velocity. */
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
        boost = Math.min(Math.abs(self.getVelocity()) / 220, 14);
      },
    });
    const tick = (_t: number, dt: number) => {
      const half = el.scrollWidth / 2;
      x += dir * (0.6 + boost) * (dt / 16.67);
      boost *= 0.92;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); st.kill(); };
  }, []);

  const row = items.map((t) => (
    <span key={t} className="flex shrink-0 items-center gap-[clamp(20px,2.5vw,36px)] pr-[clamp(20px,2.5vw,36px)]">
      <span className="display whitespace-nowrap text-[clamp(44px,5.4vw,78px)] leading-none">{t}</span>
      <Sparkle className="size-[clamp(22px,2.6vw,37px)] text-orange" />
    </span>
  ));

  return (
    <section data-bg="ink" aria-label="What I design" className="overflow-hidden bg-ink py-[clamp(20px,2vw,30px)] text-bone">
      <p className="sr-only">{items.join(', ')}</p>
      <div ref={track} className="flex w-max will-change-transform" aria-hidden="true">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </section>
  );
}
