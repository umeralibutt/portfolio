'use client';

import { useEffect, useState } from 'react';

const words = ['Apps.', 'Platforms.', 'Dashboards.', 'Brands.'];

/** All four words stay on screen; the highlight hops to the next one every 2.2s and its letters slide up. */
export default function RotatingWords() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="flex flex-wrap gap-x-[0.5em] gap-y-1 text-[clamp(26px,3vw,44px)] font-normal tracking-[-0.03em]" aria-label={words.join(' ')}>
      {words.map((w, i) => (
        <span key={w} aria-hidden="true" className={`relative inline-flex transition-colors duration-500 ease-brand ${i === active ? 'text-orange' : 'text-[#ABA59B]'}`}>
          {i === active
            ? w.split('').map((ch, j) => (
                <span key={`${active}-${j}`} className="inline-block overflow-clip">
                  <span className="inline-block animate-[letter-up_0.6s_var(--ease-brand)_both]" style={{ animationDelay: `${j * 28}ms` }}>{ch}</span>
                </span>
              ))
            : w}
          <span className={`absolute inset-x-0 -bottom-1 h-[3px] origin-left bg-orange transition-transform duration-500 ease-brand ${i === active ? 'scale-x-100' : 'scale-x-0'}`} />
        </span>
      ))}
    </p>
  );
}
