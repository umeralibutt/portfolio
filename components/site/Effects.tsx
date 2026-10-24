'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { whenPreloaded } from './Preloader';

gsap.registerPlugin(ScrollTrigger);

// GSAP's closest match to the site-wide cubic-bezier(0.22, 1, 0.36, 1).
const ease = 'expo.out';

/**
 * Site-wide motion, driven by data attributes so pages stay plain markup:
 * - data-lines (+ data-hero)  its data-line children slide up out of their masks, 60ms apart
 *                             (hero lines wait for the preloader; others start as they scroll in)
 * - data-magnetic             pill CTAs pull up to 12px toward the pointer
 * - data-draw-line            a rule that draws across as you scroll
 * - data-receipt / data-stamp the receipt prints in, then the stamp slams down
 * Reduced motion: no smooth scroll or pointer effects, and reveals become short fades.
 */
export default function Effects() {
  const path = usePathname();

  // Smooth scroll lives for the whole session.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, autoRaf: false });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); delete (window as unknown as { __lenis?: Lenis }).__lenis; };
  }, []);

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(pointer: fine)').matches;
    (window as unknown as { __lenis?: Lenis }).__lenis?.scrollTo(0, { immediate: true });

    const cleanups: (() => void)[] = [];
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-lines]').forEach((group) => {
        const lines = group.querySelectorAll<HTMLElement>('[data-line]');
        const hero = group.hasAttribute('data-hero');
        if (reduced) {
          gsap.from(group, { opacity: 0, duration: 0.5, scrollTrigger: hero ? undefined : { trigger: group, start: 'top 90%', once: true } });
          return;
        }
        if (hero) {
          // CSS already holds hero lines below their masks, so there's no flash before this runs.
          const tween = gsap.to(lines, { yPercent: 0, y: 0, duration: 1.1, stagger: 0.06, ease, paused: true });
          cleanups.push(whenPreloaded(() => tween.play()));
          return;
        }
        gsap.from(lines, {
          yPercent: 110, duration: 0.9, stagger: 0.06, ease,
          scrollTrigger: { trigger: group, start: 'top 88%', once: true },
        });
      });

      // Process rules draw across as you scroll past.
      gsap.utils.toArray<HTMLElement>('[data-draw-line]').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, {
          scaleX: 1, ease: 'none', transformOrigin: 'left center',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 50%', scrub: reduced ? false : 0.6 },
        });
      });

      // The receipt prints top-down, then the stamp lands.
      gsap.utils.toArray<HTMLElement>('[data-receipt]').forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 75%', once: true } });
        if (reduced) { tl.from(el, { opacity: 0, duration: 0.5 }); return; }
        tl.fromTo(el.querySelector('[data-paper]'), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power2.inOut' })
          .from(el.querySelector('[data-stamp]'), { scale: 2.4, opacity: 0, duration: 0.45, ease: 'back.out(2.4)' }, '-=0.05');
      });

      // Magnetic pills: pull up to 12px toward the pointer, spring back on leave.
      if (!reduced && fine) {
        gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
          const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
          const y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            x(gsap.utils.clamp(-12, 12, (e.clientX - (r.left + r.width / 2)) * 0.3));
            y(gsap.utils.clamp(-12, 12, (e.clientY - (r.top + r.height / 2)) * 0.3));
          };
          const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.35)' });
          el.addEventListener('pointermove', move);
          el.addEventListener('pointerleave', leave);
          cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
        });
      }
    });

    // Fonts change section heights; measure again once they're in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cleanups.forEach((c) => c());
      ctx.revert();
    };
  }, [path]);

  return null;
}
