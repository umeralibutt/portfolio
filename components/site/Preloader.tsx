'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/** Signals that the first paint is clear (preloader gone or never shown) — the hero reveal waits on this. */
export const PRELOADER_DONE = 'preloader:done';

export function whenPreloaded(cb: () => void) {
  if (!document.documentElement.classList.contains('preload')) { cb(); return () => {}; }
  window.addEventListener(PRELOADER_DONE, cb, { once: true });
  return () => window.removeEventListener(PRELOADER_DONE, cb);
}

/** Counter 0 → 100 + "Loading pixels…", then the panel wipes up. First visit per session only, ≤ 1.2s. */
export default function Preloader() {
  const panel = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains('preload') || !panel.current || !count.current) return;
    const n = { v: 0 };
    const finish = () => {
      html.classList.remove('preload');
      try { sessionStorage.setItem('seen', '1'); } catch {}
      window.dispatchEvent(new Event(PRELOADER_DONE));
    };
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(n, { v: 100, duration: 0.8, ease: 'power2.inOut', onUpdate: () => { if (count.current) count.current.textContent = String(Math.round(n.v)); } })
      .to(panel.current, { yPercent: -100, duration: 0.4, ease: 'power3.inOut' }, '+=0.05');
    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={panel} className="preloader fixed inset-0 z-[100] flex-col justify-between bg-ink text-bone" aria-hidden="true">
      <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-bone/60">Loading pixels…</p>
      <p className="display text-[clamp(120px,24vw,340px)] leading-[0.8]">
        {/* Fixed three-digit box so the "%" doesn't jump as the count grows (layout shift). */}
        <span ref={count} className="inline-block min-w-[3ch] text-right tabular-nums">0</span><span className="text-orange">%</span>
      </p>
    </div>
  );
}
