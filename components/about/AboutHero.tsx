'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { site } from '@/lib/data';
import { Line, fluid } from '../site/type';
import { ArrowUpRight } from '../site/icons';

/** Figma "About hero" 235:74 — the photo tilts toward the cursor. */
export default function AboutHero() {
  const photo = useRef<HTMLDivElement>(null);

  const tilt = (e: React.PointerEvent) => {
    const el = photo.current;
    if (!el || e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  };
  const reset = () => { if (photo.current) photo.current.style.transform = ''; };

  return (
    <section className="gutter flex flex-col gap-16 pb-20 pt-[124px] lg:flex-row lg:items-center lg:justify-between lg:pb-[120px] lg:pt-[193px]">
      <div className="flex flex-col items-start gap-8">
        <p className="text-[14px] font-semibold uppercase leading-[1.21] tracking-[0.12em] text-orange-deep">About</p>
        <h1 data-lines data-hero className="whitespace-nowrap">
          <Line driftOut={-1} className="font-display leading-[0.86]" style={{ fontSize: fluid(200, 96) }}>I’M</Line>
          <Line driftOut={1} className="font-serif italic leading-[0.8] text-orange" style={{ fontSize: fluid(211, 100) }}>Umar.</Line>
        </h1>
        <p className="max-w-[600px] leading-[1.5] tracking-[-0.01em]" style={{ fontSize: fluid(22, 18) }}>
          Self-taught product designer from Islamabad. No design degree - just a high-school diploma, a lot of YouTube, and a mildly concerning relationship with Figma.
        </p>
        <a href={site.cv} download="Umar_Ali_Butt_CV.pdf" data-magnetic className="group inline-flex items-center gap-2.5 rounded-full bg-ink py-3.5 pl-6 pr-[22px] text-[16px] font-semibold leading-[1.21] text-bone transition-colors duration-300 hover:bg-ink-2">
          Download my CV <ArrowUpRight className="size-4 transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="relative mx-auto aspect-[500/620] w-full max-w-[500px] shrink-0 lg:mx-0" onPointerMove={tilt} onPointerLeave={reset}>
        <div ref={photo} className="absolute left-[6.9%] top-[1.2%] w-[92%] transition-transform duration-500 ease-brand">
          <div className="relative aspect-[460/560] -rotate-3 overflow-hidden rounded-[24px] border-8 border-white bg-white shadow-[0_24px_56px_rgb(0_0_0/0.2)]">
            <Image src="/home/polaroid-umar.png" alt="Umar Ali Butt" fill priority sizes="(min-width: 1024px) 460px, 90vw" className="object-cover" />
          </div>
        </div>
        <p className="absolute left-[-7%] top-[84%] rotate-[8deg] whitespace-nowrap rounded-full bg-orange px-5 py-3 font-display leading-[1.21] tracking-[0.02em] text-ink" style={{ fontSize: fluid(22, 16) }}>
          SELF-TAUGHT, SELF-STARTED
        </p>
      </div>
    </section>
  );
}
