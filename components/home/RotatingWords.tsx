'use client';

import { useEffect, useState } from 'react';
import { fluid } from '../site/type';

const words = ['Apps.', 'Platforms.', 'Dashboards.', 'Brands.'];

/** All four words stay put; the orange underline hops to the next one every 2.2s and its letters slide up. */
export default function RotatingWords() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="flex flex-wrap gap-x-5 gap-y-1 font-medium leading-tight tracking-[-0.03em]" style={{ fontSize: fluid(34, 24) }}>
      <span className="sr-only">{words.join(' ')}</span>
      {words.map((w, i) => (
        <span
          key={w}
          aria-hidden="true"
          className={`relative inline-flex transition-colors duration-500 ease-brand ${i === active ? 'text-orange' : 'text-ink/30'}`}
        >
          {i === active
            ? w.split('').map((ch, j) => (
                <span key={`${active}-${j}`} className="inline-block overflow-clip pb-[0.06em]">
                  <span className="inline-block animate-[letter-up_0.6s_var(--ease-brand)_both]" style={{ animationDelay: `${j * 28}ms` }}>{ch}</span>
                </span>
              ))
            : w}
          {/* Underline as a bar: text-decoration doesn't reach the inline-block letters. */}
          <span className={`absolute inset-x-0 bottom-[0.02em] h-[0.07em] origin-left bg-orange transition-transform duration-500 ease-brand ${i === active ? 'scale-x-100' : 'scale-x-0'}`} />
        </span>
      ))}
    </p>
  );
}
