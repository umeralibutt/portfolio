'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Everything here only runs when <html> has the `motion` class, which the inline script in
// layout.tsx adds unless the visitor prefers reduced motion. Without it the page is static.

const SLAP = '.sticky, .stat, .fact, .step, .big-note, .mail-sticky, .card, .polaroid';
const TYPE = '.section-title, .page-title, .about-title, .case-title, .talk-title, .cta-title, .play-title, .about-h2, .contact-title';
const COUNT = '.stat strong';

/** "4 mo" → ['', 4, ' mo', 0]; returns null when there's no number to count. */
function parseCount(text: string): [string, number, string, number] | null {
  const m = text.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0;
  return [m[1], parseFloat(m[2]), m[3], decimals];
}

function countUp(el: HTMLElement) {
  const parsed = parseCount(el.textContent ?? '');
  if (!parsed) return;
  const [pre, target, post, decimals] = parsed;
  const start = performance.now();
  const dur = 1100;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = `${pre}${(target * eased).toFixed(decimals)}${post}`;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function Motion() {
  const path = usePathname();

  useEffect(() => {
    if (!document.documentElement.classList.contains('motion')) return;
    const cleanups: (() => void)[] = [];

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        if (el.matches(COUNT)) countUp(el);
        el.classList.add(el.matches(SLAP) ? 'landed' : 'in');
        io.unobserve(el);
      }
    }, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });
    // Titles start clipped to a 2px sliver, which the observer sees as almost no area, so any overlap counts.
    const typeIo = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        typeIo.unobserve(e.target);
      }
    }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

    const seen = new WeakSet<Element>();
    const setup = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(`${SLAP}, ${TYPE}, ${COUNT}, svg:has([data-draw])`).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.matches(SLAP)) {
          // Stagger siblings that land together.
          const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.matches(SLAP)) : [];
          el.style.setProperty('--i', String(Math.max(0, sibs.indexOf(el)) % 8));
          el.addEventListener('animationend', (e) => { if (e.animationName === 'slap') el.classList.add('settled'); });
        }
        if (el.matches(TYPE)) {
          el.style.setProperty('--n', String(Math.max(4, (el.textContent ?? '').replace(/\s/g, '').length)));
          typeIo.observe(el);
          return;
        }
        io.observe(el);
      });
    };
    setup(document);
    // Content that mounts later (filtered Work cards, a sent contact form) gets the same treatment.
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => { if (n instanceof HTMLElement) setup(n.parentElement ?? n); });
    });
    const main = document.querySelector('main');
    if (main) mo.observe(main, { childList: true, subtree: true });
    cleanups.push(() => { io.disconnect(); typeIo.disconnect(); mo.disconnect(); });

    // Pointer parallax: sections with [data-parallax] get --mx/--my in -1..1.
    if (matchMedia('(pointer: fine)').matches) {
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((sec) => {
        const move = (e: PointerEvent) => {
          const r = sec.getBoundingClientRect();
          sec.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
          sec.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
        };
        const leave = () => { sec.style.setProperty('--mx', '0'); sec.style.setProperty('--my', '0'); };
        sec.addEventListener('pointermove', move);
        sec.addEventListener('pointerleave', leave);
        cleanups.push(() => { sec.removeEventListener('pointermove', move); sec.removeEventListener('pointerleave', leave); });
      });
    }

    return () => cleanups.forEach((c) => c());
  }, [path]);

  return null;
}
