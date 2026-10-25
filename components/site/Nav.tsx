'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Socials from './Socials';
import { Arrow } from './icons';

const links = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/playground', label: 'Playground' },
  { href: '/contact', label: 'Contact' },
];

/** Figma "Nav" 213:25 — 1440 × 97, 28 / 48 padding. Hides on scroll down, returns on scroll up. */
export default function Nav() {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 8);
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 120);
        last = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color,box-shadow] duration-500 ease-brand ${hidden && !open ? '-translate-y-full' : ''} ${solid || open ? 'bg-bone shadow-[0_1px_0_rgb(14_13_12/0.08)]' : 'bg-bone/0'}`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bone">Skip to content</a>
      <div className="flex h-[76px] items-center justify-between gutter lg:h-[97px]">
        <Link href="/" className="group flex items-center gap-4" aria-label="Umar Ali Butt — home">
          <span className="relative block size-9 shrink-0 lg:size-11">
            {/* The Figma photo carries its own orange ring and overhangs the 44px box by 2px. */}
            <Image src="/home/nav-photo.png" alt="" width={48} height={48} priority className="absolute -inset-[4.55%] size-[109.1%] max-w-none origin-[50%_85%] group-hover:animate-[wave_0.9s_var(--ease-brand)]" />
          </span>
          <span className="font-wordmark text-[19px] font-bold leading-none tracking-[-0.8px] text-[#141414] lg:text-[24px]">Umar Ali Butt</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-10 text-[15px] font-medium leading-none">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active(l.href) ? 'page' : undefined}
                  className={`transition-colors duration-300 hover:text-orange-deep ${active(l.href) ? 'text-orange-deep underline decoration-[1.5px] underline-offset-[6px]' : 'text-ink'}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Socials />
          <Link href="/contact" data-magnetic className="inline-flex items-center gap-[5px] rounded-full bg-ink px-5 py-3 text-[14px] font-semibold leading-none text-bone transition-colors duration-300 hover:bg-orange hover:text-ink">
            Let’s talk <Arrow className="size-[13px]" />
          </Link>
        </div>

        <button
          type="button"
          className="relative z-10 grid size-11 place-items-center rounded-full bg-ink text-bone lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform duration-300 ease-brand ${open ? 'top-[5px] rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform duration-300 ease-brand ${open ? 'top-[5px] -rotate-45' : 'top-2.5'}`} />
          </span>
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-76px)] overflow-y-auto bg-bone gutter pb-10 lg:hidden">
        <ul className="pt-4">
          {links.map((l) => (
            <li key={l.href} className="border-b border-ink/10">
              <Link href={l.href} className={`display block py-4 text-[56px] ${active(l.href) ? 'text-orange' : ''}`}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center justify-between">
          <Socials size={36} />
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[14px] font-semibold text-bone">
            Let’s talk <Arrow className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
