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

export default function Nav() {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);

  // Hide while scrolling down, come back on any scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 12);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 140);
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
      className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color,box-shadow] duration-500 ease-brand ${hidden && !open ? '-translate-y-full' : ''} ${solid || open ? 'bg-bone/90 shadow-[0_1px_0_rgb(14_13_12/0.08)] backdrop-blur-md' : ''}`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bone">Skip to content</a>
      <div className="gutter flex h-[76px] items-center justify-between lg:h-[97px]">
        <Link href="/" className="group flex items-center gap-3.5" aria-label="Umar Ali Butt — home">
          <span className="block size-10 overflow-hidden rounded-full ring-[2.5px] ring-orange lg:size-11">
            <Image src="/me.jpg" alt="" width={88} height={88} priority className="size-full origin-[50%_80%] object-cover group-hover:animate-[wave_0.9s_var(--ease-brand)]" />
          </span>
          <span className="font-sans text-[22px] font-bold tracking-[-0.04em] lg:text-[26px]">Umar Ali Butt</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-10 text-[16px] font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active(l.href) ? 'page' : undefined}
                  className={`relative py-1 transition-colors duration-300 hover:text-orange ${active(l.href) ? 'text-orange underline decoration-2 underline-offset-[6px]' : ''}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Socials />
          <Link href="/contact" data-magnetic data-cursor="Open" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-bone transition-colors duration-300 hover:bg-orange">
            Let’s talk <Arrow className="size-3.5" />
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

      <div id="mobile-menu" hidden={!open} className="gutter h-[calc(100dvh-76px)] overflow-y-auto bg-bone pb-10 lg:hidden">
        <ul className="pt-6">
          {links.map((l) => (
            <li key={l.href} className="border-b border-ink/10">
              <Link href={l.href} className={`display block py-4 text-[56px] ${active(l.href) ? 'text-orange' : ''}`}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center justify-between">
          <Socials size={36} />
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-bone">
            Let’s talk <Arrow className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
