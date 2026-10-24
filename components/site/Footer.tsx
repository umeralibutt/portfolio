'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { site } from '@/lib/data';
import { socialLinks } from './Socials';
import { fluid } from './type';
import { ArrowUp, ArrowUpRight } from './icons';

/** Figma "Footer — Let’s talk" 213:191 — ink, 140 / 48 padding. TALK fills orange left → right on hover. */
export default function Footer() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const toTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Footer links follow Figma's order: LinkedIn, Dribbble, Upwork, Behance.
  const order = ['linkedin', 'dribbble', 'upwork', 'behance'];
  const links = [...socialLinks].sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));

  return (
    <footer className="bg-ink px-5 py-20 text-bone md:px-12 lg:py-[140px]">
      <p className="text-[13px] font-semibold uppercase leading-[1.21] tracking-[0.12em] text-orange lg:text-[14px]">Got a product that needs fixing?</p>
      <Link href="/contact" data-cursor="Open" aria-label="Let’s talk — go to the contact page" className="group flex flex-wrap items-baseline gap-x-[clamp(16px,2.8vw,40px)] pb-10 pt-6">
        <span className="font-display leading-[0.88]" style={{ fontSize: fluid(300, 96) }}>LET’S</span>
        <span
          className="bg-[linear-gradient(90deg,var(--color-orange)_50%,var(--color-bone)_50%)] bg-[length:200%_100%] bg-[position:100%_0] bg-clip-text font-display leading-[0.88] text-transparent transition-[background-position] duration-700 ease-brand group-hover:bg-[position:0_0] group-focus-visible:bg-[position:0_0]"
          style={{ fontSize: fluid(300, 96) }}
        >
          TALK
        </span>
        <ArrowUpRight className="shrink-0 self-center text-orange transition-transform duration-500 ease-brand group-hover:translate-x-2 group-hover:-translate-y-2" style={{ width: fluid(111, 44), height: fluid(111, 44) }} strokeWidth={2.2} />
      </Link>

      <div className="flex flex-col gap-8 pb-16 lg:flex-row lg:items-center lg:justify-between lg:pb-24">
        <div className="flex flex-wrap items-center gap-[18px]">
          <button
            type="button"
            onClick={copy}
            data-cursor="Copy"
            className="text-left font-medium leading-[1.21] tracking-[-0.03em] underline decoration-[0.05em] underline-offset-[0.18em] transition-colors duration-300 hover:text-orange"
            style={{ fontSize: fluid(44, 24) }}
          >
            {site.email}
          </button>
          <span role="status" className={`rounded-full bg-orange px-[18px] py-2.5 text-[14px] font-semibold leading-none text-ink transition-[opacity,translate] duration-500 ease-brand ${copied ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'}`}>
            {copied ? 'Copied. Don’t be shy.' : ''}
          </span>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[17px] font-medium leading-none">
          {links.map((s) => (
            <li key={s.key}>
              <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-orange">
                {s.label} <ArrowUpRight className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 border-t border-bone/15 pt-7 text-[14px] leading-[1.21] text-bone/55 md:flex-row md:items-start md:justify-between">
        <p>© 2026 {site.name}</p>
        <p>Designed &amp; built in Islamabad, fuelled by chai.</p>
        <button type="button" onClick={toTop} className="inline-flex items-center gap-[5px] self-start transition-colors hover:text-bone md:self-auto">
          Back to top <ArrowUp className="size-[13px]" />
        </button>
      </div>
    </footer>
  );
}
