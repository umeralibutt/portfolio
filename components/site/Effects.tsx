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
 * - data-scale-in             grows from 92% to full size as it scrolls in (case study covers)
 * - data-rows                 its children tick in one by one
 * - data-slide-over           slides in from the right while scrolling (the case study "fix" panel)
 * - data-parallax / data-drift / data-drift-out   scrubbed vertical drift / sideways drift / hero pull-apart
 * - data-tilt-in / data-slide-in / data-scale-up  scrubbed entrances (3D tilt, from the side, grow)
 * - data-img-reveal                             image wipes up out of its frame and settles from a zoom
 * - data-deal / data-curtain / data-skew         dealt cards, footer rising from under the page, speed lean
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
          const tween = gsap.to(lines, { yPercent: 0, y: 0, opacity: 1, duration: 1.1, stagger: 0.06, ease, paused: true });
          cleanups.push(whenPreloaded(() => tween.play()));
          return;
        }
        // The fade keeps tall glyphs (which overhang the mask) from peeking out before they slide up.
        gsap.from(lines, {
          yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.06, ease,
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

      // Case study cover grows from 92% to full width as it scrolls in.
      if (!reduced) {
        gsap.utils.toArray<HTMLElement>('[data-scale-in]').forEach((el) => {
          gsap.fromTo(el, { scale: 0.92 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 30%', scrub: 0.6 } });
        });
      }

      // List rows tick in one by one (data-rows="0.08" sets the gap between them, in seconds).
      gsap.utils.toArray<HTMLElement>('[data-rows]').forEach((list) => {
        gsap.from(list.children, {
          opacity: 0, y: reduced ? 0 : 24, duration: reduced ? 0.4 : 0.7, stagger: parseFloat(list.dataset.rows || '') || 0.12, ease,
          scrollTrigger: { trigger: list, start: 'top 85%', once: true },
        });
      });

      // The fix panel slides over toward the problem panel.
      if (!reduced) {
        gsap.utils.toArray<HTMLElement>('[data-slide-over]').forEach((el) => {
          gsap.fromTo(el, { xPercent: 12, rotate: 2 }, { xPercent: 0, rotate: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 45%', scrub: 0.6 } });
        });
      }

      // ---------- Scroll choreography. All of it is skipped with reduced motion. ----------
      if (!reduced) {
        const vw = () => innerWidth / 100;
        const vh = () => innerHeight / 100;

        // Drifts against the scroll; data-parallax is the speed (negative = rises faster than the page).
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const s = parseFloat(el.dataset.parallax || '0.15');
          gsap.fromTo(el, { y: () => -s * 30 * vh() }, {
            y: () => s * 30 * vh(), ease: 'none',
            scrollTrigger: { trigger: el, start: 'clamp(top bottom)', end: 'clamp(bottom top)', scrub: true, invalidateOnRefresh: true },
          });
        });

        // Big lines slide sideways as they pass; data-drift is the direction (1 = right, -1 = left).
        // They sit exactly where Figma has them when the line is mid-screen.
        gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
          const d = parseFloat(el.dataset.drift || '1');
          gsap.fromTo(el, { x: () => -d * 6 * vw() }, {
            x: () => d * 6 * vw(), ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.4, invalidateOnRefresh: true },
          });
        });

        // Hero lines: start in place, then pull apart as you scroll away.
        gsap.utils.toArray<HTMLElement>('[data-drift-out]').forEach((el) => {
          const d = parseFloat(el.dataset.driftOut || '1');
          gsap.to(el, {
            x: () => d * 18 * vw(), opacity: 0.15, ease: 'none',
            scrollTrigger: { trigger: el, start: 'clamp(top 40%)', end: 'clamp(bottom top)', scrub: 0.4, invalidateOnRefresh: true },
          });
        });

        // Rises out of a 3D tilt as it scrolls in.
        gsap.utils.toArray<HTMLElement>('[data-tilt-in]').forEach((el) => {
          gsap.fromTo(el, { rotationX: 22, y: 140, opacity: 0.35, transformPerspective: 1400, transformOrigin: '50% 0%' }, {
            rotationX: 0, y: 0, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 50%', scrub: 0.6 },
          });
        });

        // Slides in from the side while scrolling; data-slide-in="left" | "right".
        gsap.utils.toArray<HTMLElement>('[data-slide-in]').forEach((el) => {
          const from = el.dataset.slideIn === 'right' ? 1 : -1;
          gsap.fromTo(el, { x: () => from * 22 * vw(), opacity: 0 }, {
            x: 0, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 62%', scrub: 0.5, invalidateOnRefresh: true },
          });
        });

        // Big type grows into place.
        gsap.utils.toArray<HTMLElement>('[data-scale-up]').forEach((el) => {
          gsap.fromTo(el, { scale: 0.78, transformOrigin: el.dataset.scaleUp || '0% 100%' }, {
            scale: 1, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 55%', scrub: 0.5 },
          });
        });

        // Images wipe up out of their frame and settle from a zoom (once). The frame must clip.
        gsap.utils.toArray<HTMLElement>('[data-img-reveal]').forEach((el) => {
          const img = el.querySelector('img');
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
          tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut', clearProps: 'clipPath' });
          // Clearing the transform afterwards lets the browser draw the image at full sharpness again.
          if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.6, ease, clearProps: 'transform' }, 0);
        });

        // Children land like dealt cards when the container scrolls in.
        gsap.utils.toArray<HTMLElement>('[data-deal]').forEach((el) => {
          gsap.from(el.children, {
            y: () => -40 * vh(), rotation: () => gsap.utils.random(-28, 28), opacity: 0, scale: 1.1,
            duration: 1, stagger: 0.09, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: el, start: 'top 75%', once: true },
          });
        });

        // The footer rises out from under the page.
        gsap.utils.toArray<HTMLElement>('[data-curtain]').forEach((el) => {
          gsap.fromTo(el, { yPercent: -35, opacity: 0.4 }, {
            yPercent: 0, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'top 15%', scrub: true },
          });
        });

        // Cards lean with scroll speed and spring upright when the page stops.
        const skews = gsap.utils.toArray<HTMLElement>('[data-skew]').map((el) => gsap.quickTo(el, 'skewY', { duration: 0.6, ease: 'power3.out' }));
        if (skews.length) {
          const clamp = gsap.utils.clamp(-7, 7);
          const settle = gsap.delayedCall(0.12, () => skews.forEach((s) => s(0))).pause();
          ScrollTrigger.create({
            onUpdate: (self) => {
              const v = clamp(self.getVelocity() / -320);
              skews.forEach((s) => s(v));
              settle.restart(true);
            },
          });
        }
      }

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
