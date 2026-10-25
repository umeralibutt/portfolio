'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type Mode = 'dot' | 'link' | 'label' | 'hidden';

/**
 * A small dot that glides after the pointer. It grows a little over links and buttons, becomes the
 * orange label ("View", "Drag", "Open"…) over anything with `data-cursor`, and steps aside in text fields.
 * Mouse/trackpad only; off for touch and reduced motion.
 */
export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('dot');
  const [label, setLabel] = useState('');
  const [on, setOn] = useState(false);

  useEffect(() => {
    const c = el.current;
    if (!c) return;
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setOn(true);
    document.documentElement.classList.add('cursor-on');
    const x = gsap.quickTo(c, 'x', { duration: 0.25, ease: 'power3.out' });
    const y = gsap.quickTo(c, 'y', { duration: 0.25, ease: 'power3.out' });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!shown) { gsap.set(c, { x: e.clientX, y: e.clientY }); gsap.to(c, { opacity: 1, duration: 0.2 }); shown = true; }
      x(e.clientX);
      y(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target instanceof Element ? e.target : null;
      if (!t) return;
      if (t.closest('input, textarea, select, [contenteditable="true"]')) return setMode('hidden');
      const labelled = t.closest<HTMLElement>('[data-cursor]');
      if (labelled?.dataset.cursor) { setLabel(labelled.dataset.cursor); return setMode('label'); }
      setMode(t.closest('a, button, [role="button"], summary') ? 'link' : 'dot');
    };
    const leave = () => { gsap.to(c, { opacity: 0, duration: 0.2 }); shown = false; };

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

  const size = mode === 'label' ? 'size-24' : mode === 'link' ? 'size-10' : mode === 'hidden' ? 'size-0' : 'size-3';
  return (
    // The blend sits on the fixed layer itself so it reaches the page; the orange label keeps its real colour.
    <div
      ref={el}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[90] opacity-0 ${mode === 'label' ? '' : 'mix-blend-difference'}`}
      style={{ display: on ? 'block' : 'none' }}
    >
      <div className={`grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-[width,height,background-color] duration-300 ease-brand ${size} ${mode === 'label' ? 'bg-orange' : 'bg-white'}`}>
        <span className={`font-sans text-[16px] font-semibold text-ink transition-opacity duration-200 ${mode === 'label' ? 'opacity-100 delay-100' : 'opacity-0'}`}>{label}</span>
      </div>
    </div>
  );
}
