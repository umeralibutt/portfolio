'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Fades/slides its children up 16px the first time they scroll into view. */
export default function Reveal({ children, className = '', as: Tag = 'section', id }: { children: ReactNode; className?: string; as?: 'section' | 'div'; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <Tag ref={ref as never} id={id} className={`reveal${shown ? ' in' : ''} ${className}`}>{children}</Tag>;
}
