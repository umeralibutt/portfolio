'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { site } from '@/lib/data';
import { socialLinks } from './Socials';
import { ArrowUp, ArrowUpRight } from './icons';

/** Global "Let’s talk" footer: big CTA, click-to-copy email, socials, back to top. */
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

  return (
    <footer data-bg="ink" className="gutter bg-ink pt-24 pb-10 text-bone lg:pt-[140px]">
      <p className="eyebrow text-orange">Got a product that needs fixing?</p>
      <Link href="/contact" data-cursor="Open" className="group mt-3 flex items-end gap-6" aria-label="Let’s talk — go to the contact page">
        <span className="display text-[clamp(84px,18.4vw,264px)]">
          Let’s{' '}
          {/* TALK fills orange left → right on hover. */}
          <span className="bg-[linear-gradient(90deg,var(--color-orange)_50%,var(--color-bone)_50%)] bg-[length:200%_100%] bg-[position:100%_0] bg-clip-text text-transparent transition-[background-position] duration-700 ease-brand group-hover:bg-[position:0_0] group-focus-visible:bg-[position:0_0]">
            Talk
          </span>
        </span>
        <ArrowUpRight className="mb-[3%] size-[clamp(48px,7.7vw,111px)] shrink-0 text-orange transition-transform duration-500 ease-brand group-hover:translate-x-2 group-hover:-translate-y-2" strokeWidth={2.4} />
      </Link>

      <div className="mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <button type="button" onClick={copy} data-cursor="Copy" className="text-left text-[clamp(26px,3.7vw,53px)] leading-none underline decoration-2 underline-offset-[10px] transition-colors duration-300 hover:text-orange">
            {site.email}
          </button>
          <span
            role="status"
            className={`rounded-full bg-orange px-4 py-2 text-[14px] font-semibold text-ink transition-[opacity,translate] duration-500 ease-brand ${copied ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
          >
            {copied ? 'Copied. Don’t be shy.' : ''}
          </span>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[18px]">
          {socialLinks.map((s) => (
            <li key={s.key}>
              <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-orange">
                {s.label} <ArrowUpRight className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-bone/15 pt-7 text-[14px] text-bone/60 md:flex-row md:items-center md:justify-between">
        <p>© 2026 {site.name}</p>
        <p>Designed &amp; built in Islamabad, fuelled by chai.</p>
        <button type="button" onClick={toTop} className="inline-flex items-center gap-1.5 self-start transition-colors hover:text-bone md:self-auto">
          Back to top <ArrowUp className="size-3.5" />
        </button>
      </div>
    </footer>
  );
}
