'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { whenPreloaded } from './Preloader';

gsap.registerPlugin(ScrollTrigger, SplitText);

// GSAP's closest match to the site-wide cubic-bezier(0.22, 1, 0.36, 1).
const ease = 'expo.out';

const BG: Record<string, string> = {
  bone: '#F4F0E9',
  beige: '#ECE7DE',
  ink: '#0E0D0C',
  orange: '#FF4D00',
};

/**
 * Site-wide motion, driven by data attributes so pages stay plain markup:
 * - data-reveal / data-reveal="hero"  headline lines slide up (hero waits for the preloader)
 * - data-bg="ink|bone|beige|orange"   body colour tweens between sections
 * - data-magnetic                      pill CTAs pull toward the pointer
 * - data-draw-line                     a rule that draws across as you scroll
 * - data-parallax                      a cover drifts 60px across its scroll
 * - data-receipt / data-stamp          the receipt prints in, the stamp slams down
 * Reduced motion: no smooth scroll, parallax or pointer effects, and reveals become fades.
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
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    lenis?.scrollTo(0, { immediate: true });

    const cleanups: (() => void)[] = [];
    const ctx = gsap.context(() => {
      // Headlines: split by line, slide each up out of its mask with a 60ms stagger.
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        const hero = el.dataset.reveal === 'hero';
        if (reduced) {
          gsap.from(el, { opacity: 0, duration: 0.6, scrollTrigger: hero ? undefined : { trigger: el, start: 'top 88%' } });
          return;
        }
        const split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'line',
          autoSplit: true,
          onSplit: (self) => {
            const tween = gsap.from(self.lines, {
              yPercent: 105,
              duration: hero ? 1.1 : 0.9,
              stagger: 0.06,
              ease,
              paused: hero,
              scrollTrigger: hero ? undefined : { trigger: el, start: 'top 88%', once: true },
            });
            if (hero) cleanups.push(whenPreloaded(() => tween.play()));
            return tween;
          },
        });
        cleanups.push(() => split.revert());
      });

      // Section colour shift: whichever section holds the middle of the viewport sets the body colour.
      gsap.utils.toArray<HTMLElement>('[data-bg]').forEach((sec) => {
        const color = BG[sec.dataset.bg ?? ''] ?? BG.bone;
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) gsap.to(document.body, { backgroundColor: color, duration: reduced ? 0 : 0.7, ease, overwrite: true });
          },
        });
      });

      // Rules that draw across as you scroll past.
      gsap.utils.toArray<HTMLElement>('[data-draw-line]').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, {
          scaleX: 1, ease: 'none', transformOrigin: 'left center',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 45%', scrub: reduced ? false : 0.6 },
        });
      });

      // The receipt prints top-down, then the stamp lands.
      gsap.utils.toArray<HTMLElement>('[data-receipt]').forEach((el) => {
        const stamp = el.querySelector('[data-stamp]');
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 72%', once: true } });
        if (reduced) {
          tl.from(el, { opacity: 0, duration: 0.6 });
          return;
        }
        tl.fromTo(el.querySelector('[data-paper]'), { clipPath: 'inset(0 0 100% 0)', y: -60 }, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.4, ease: 'steps(14)' })
          .from(stamp, { scale: 2.6, opacity: 0, rotate: -28, duration: 0.45, ease: 'back.out(2.6)' }, '+=0.1');
      });

      if (reduced) return;

      // Featured covers drift 60px through their scroll.
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.fromTo(el, { y: 30 }, { y: -30, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      // Magnetic pills: pull up to 12px toward the pointer, spring back on leave.
      if (fine) {
        gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
          const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
          const y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            x(gsap.utils.clamp(-12, 12, dx * 0.3));
            y(gsap.utils.clamp(-12, 12, dy * 0.3));
          };
          const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.35)' });
          el.addEventListener('pointermove', move);
          el.addEventListener('pointerleave', leave);
          cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
        });
      }
    });

    // Fonts change line breaks and section heights; measure again once they're in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cleanups.forEach((c) => c());
      ctx.revert();
      gsap.set(document.body, { clearProps: 'backgroundColor' });
    };
  }, [path]);

  return null;
}
