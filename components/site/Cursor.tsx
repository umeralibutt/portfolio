'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * A small dot that follows the pointer and grows into an orange label ("View", "Drag", "Open", "Copy")
 * over anything with `data-cursor`. Mouse/trackpad only; off for touch and reduced motion.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = dot.current;
    if (!el) return;
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setOn(true);
    document.documentElement.classList.add('cursor-on');
    const x = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!shown) { gsap.set(el, { x: e.clientX, y: e.clientY }); el.style.opacity = '1'; shown = true; }
      x(e.clientX);
      y(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>('[data-cursor]');
      setLabel(target?.dataset.cursor || null);
    };
    const leave = () => { el.style.opacity = '0'; shown = false; };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('cursor-on');
    };
  }, []);

  return (
    <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] opacity-0 transition-opacity duration-200" style={{ display: on ? 'block' : 'none' }}>
      <div
        className={`grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-sans text-[16px] font-medium transition-[width,height,background-color] duration-500 ease-brand ${label ? 'size-24 bg-orange text-ink' : 'size-2.5 bg-white mix-blend-difference'}`}
      >
        <span className={`transition-opacity duration-300 ${label ? 'opacity-100 delay-100' : 'opacity-0'}`}>{label}</span>
      </div>
    </div>
  );
}
