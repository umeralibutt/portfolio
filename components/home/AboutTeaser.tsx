'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../site/Container';
import { Arrow } from '../site/icons';

// The ring reads clockwise from the top; the dots are orange.
const ring = ['SELF-TAUGHT', 'SENIOR PRODUCT DESIGNER', 'ISLAMABAD', 'SINCE 2021'];
const R = 188;
const circle = `M 220 ${220 - R} a ${R} ${R} 0 1 1 0 ${2 * R} a ${R} ${R} 0 1 1 0 ${-2 * R}`;

// Statement words, filled in one by one on scroll; `orange` marks "self-taught".
const statement: { w: string; orange?: boolean }[][] = [
  'I’m Umar, a'.split(' ').map((w) => ({ w })),
  [{ w: 'self-taught', orange: true }],
  'Senior Product Designer from Islamabad. I turn messy fintech, Web3 and AI products into things people actually enjoy using, and I sweat the details nobody notices until they’re gone.'.split(' ').map((w) => ({ w })),
];

/**
 * Figma "About teaser" 303:24: the photo sits in a ring of mono text that spins (faster while you scroll),
 * and the statement fills in word by word as it scrolls through the screen. Reduced motion: still ring,
 * statement fully filled.
 */
export default function AboutTeaser() {
  const section = useRef<HTMLElement>(null);
  const spinner = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const spin = gsap.to(spinner.current, { rotation: 360, duration: 24, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
      ScrollTrigger.create({
        trigger: el, start: 'top bottom', end: 'bottom top',
        onUpdate: (self) => {
          const boost = Math.min(Math.abs(self.getVelocity()) / 250, 8);
          gsap.to(spin, { timeScale: 1 + boost, duration: 0.25, overwrite: true, onComplete: () => { gsap.to(spin, { timeScale: 1, duration: 1.2 }); } });
        },
      });
      gsap.fromTo(el.querySelectorAll('[data-word]'), { opacity: 0.22 }, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: el.querySelector('[data-statement]'), start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="bg-bone py-20 lg:py-[140px]">
      <Container className="flex flex-col items-center gap-14 lg:flex-row lg:gap-[clamp(48px,6.67vw,96px)]">
        <div className="relative aspect-square w-full max-w-[440px] shrink-0 lg:w-[clamp(340px,30.56vw,440px)]">
          <div className="absolute inset-[15.9%] overflow-hidden rounded-full">
            <Image quality={90} src="/home/about-umar.png" alt="Umar Ali Butt" fill sizes="(min-width: 1024px) 300px, 70vw" className="object-cover" />
          </div>
          <svg ref={spinner} viewBox="0 0 440 440" aria-label={ring.join(', ')} className="absolute inset-0 size-full">
            <path id="about-ring" d={circle} fill="none" />
            <text className="font-mono text-[17px] font-semibold" fill="currentColor">
              <textPath href="#about-ring" textLength={2 * Math.PI * R - 4} lengthAdjust="spacing">
                {ring.map((t) => (
                  <Fragment key={t}>{t} <tspan fill="var(--color-orange)">•</tspan> </Fragment>
                ))}
              </textPath>
            </text>
          </svg>
          <span className="absolute left-[57.3%] top-[60.3%] grid aspect-square w-[19.1%] rotate-12 place-items-center rounded-full bg-orange font-display text-[clamp(20px,2vw,28px)] leading-none transition-transform duration-500 ease-brand hover:rotate-[-8deg] hover:scale-110">
            HI!
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-10">
          <p className="text-[14px] font-semibold leading-[1.21] tracking-[0.14em] text-orange">About</p>
          <p data-statement className="font-medium leading-[1.28] tracking-[-0.03em]" style={{ fontSize: 'clamp(28px, 3.06vw, 44px)' }}>
            {statement.flat().map(({ w, orange }, i) => (
              <Fragment key={i}>
                <span data-word className={orange ? 'text-orange' : undefined}>{w}</span>{' '}
              </Fragment>
            ))}
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/about" data-magnetic className="group inline-flex items-center gap-2.5 rounded-full bg-ink py-3.5 pl-6 pr-[22px] text-[16px] font-semibold leading-[1.21] text-bone">
              More about me <Arrow className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
            </Link>
            <p className="text-[16px] font-medium text-mute">5 years · 10+ products · 5 countries</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
