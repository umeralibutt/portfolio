'use client';

import { useEffect, useRef } from 'react';

/** Figma "Reading progress (fills as you scroll)" — a 3px orange rule across the top of the viewport. */
export default function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.current?.style.setProperty('scale', `${max > 0 ? Math.min(scrollY / max, 1) : 0} 1`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-orange" style={{ scale: '0 1' }} />;
}
