'use client';

import { useEffect, useRef } from 'react';

/** Figma-style "YOU" cursor that lazily trails the mouse around its section, then drifts home. */
export default function YouCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const area = el?.closest('section');
    const box = el?.offsetParent as HTMLElement | null;
    if (!el || !area || !box) return;
    if (!document.documentElement.classList.contains('motion') || !matchMedia('(pointer: fine)').matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const move = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      // Sit just below-right of the real pointer so it reads as a second person.
      tx = e.clientX - r.left - el.offsetLeft + 26;
      ty = e.clientY - r.top - el.offsetTop + 22;
      kick();
    };
    const leave = () => { tx = 0; ty = 0; kick(); };
    area.addEventListener('pointermove', move);
    area.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      area.removeEventListener('pointermove', move);
      area.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div ref={ref} className="you" aria-hidden="true">
      <svg width="16" height="18" viewBox="0 0 16 18"><path d="M1 1l13 7-6 1.5L5 16z" fill="var(--ink)" /></svg>
      <span>YOU</span>
    </div>
  );
}
